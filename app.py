import json
from flask import Flask, render_template, request
from flask_sqlalchemy import SQLAlchemy
from flask_socketio import SocketIO, emit

app = Flask(__name__, static_folder="frontend/build/",
            static_url_path='', template_folder="frontend/build")
app.secret_key = "123"
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///main.db'
db = SQLAlchemy(app)
socketio = SocketIO(app)


class Message(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    message = db.Column(db.Text, nullable=False)
    user = db.Column(db.Text, nullable=False)


db.drop_all()
db.create_all()


@app.route('/')
def index():
    return render_template("index.html")


@app.route('/login', methods=["POST"])
def login():
    name = request.json['name']
    if (name != None):
        dic = dict()
        dic['user'] = name
        return json.dumps(dic)


@app.route('/message', methods=["POST"])
def message():
    message = request.json["message"]
    user = request.json["user"]
    if (message != None and user != None):
        newMessage = Message(
            message=message, user=user)
        db.session.add(newMessage)
        db.session.commit()
        socketio.emit('message')
        return 'message recieved'


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
        msgDict['user'] = msg.user
        messagesArray.append(msgDict)

    return json.dumps(messagesArray)


@socketio.on('connect')
def connected():
    print('Connected')


@socketio.on('disconnect')
def disconnected():
    print("Disconnected")


if __name__ == '__main__':
    app.run(port="0.0.0.0", debug="false")
