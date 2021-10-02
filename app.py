from flask import Flask, send_from_directory, request, redirect
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__, static_folder="frontend/build", static_url_path='')
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
    return send_from_directory(app.static_folder, "index.html")


@app.route('/register', methods=["POST"])
def register():
    name = request.form.get("username")
    if (name != None):
        user = User(name=name)
        db.session.add(user)
        db.session.commit()
        return "You are logged In"


if __name__ == '__main__':
    app.run(host='localhost', port=3000, debug=True)
