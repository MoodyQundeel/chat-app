import json
from flask import Flask, render_template, redirect, request, session
from flask.json import jsonify
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__, static_folder="frontend/build/",
            static_url_path='', template_folder="frontend/build")
app.secret_key = "123"
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///main.db'
db = SQLAlchemy(app)


class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(20), nullable=False)


class Message(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    message = db.Column(db.Text, nullable=False)
    user = db.relationship("User", backref="user", lazy=True, uselist=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)


@app.route('/')
def index():
    return render_template("index.html")


@app.route('/register', methods=["POST"])
def register():
    name = request.form["name"]
    if (name != None):
        user = User(name=name)
        db.session.add(user)
        db.session.commit()
        session['user'] = name
        return "registered"


@app.route('/message', methods=["POST"])
def message():
    message = request.form["message"]
    user = session['user']
    if (message != None):
        newMessage = Message(
            message=message, user=User.query.filter_by(name=user).first())
        db.session.add(newMessage)
        db.session.commit()
        return "message receieved"


@app.route('/messages', methods=["POST"])
def fetch_messages():
    messages = Message.query.all()
    messagesArray = []
    i = 0
    for msg in messages:
        i += 1
        msgDict = dict()
        msgDict['id'] = i
        msgDict['message'] = msg.message
        msgDict['user'] = msg.user.name
        messagesArray.append(msgDict)

    print(messagesArray)

    return json.dumps(messagesArray)


if __name__ == '__main__':
    app.run(debug=True, port="5000")
