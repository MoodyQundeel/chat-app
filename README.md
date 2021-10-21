# CS50 Final Project || Chat App

### created by: Ahmed Alaa

#### Description: It is a real time chat application with rooms feature.

#### Frontend: the frontend is built with React. I used functional components with useState and useEffect hooks to manage and update the state based on user intercation with the site and messages recieved through the socket from the server. The App.js file returns either a join page or the main chat page using an if statement to check if there is a username stored in the session. the login page contain a basic form that send a POST request to the server to notify it that a user has joined. The chat page is where most of the code is found. When a user sends a message a POST request is send to the server to log the message in the database and the socket on the server's side emits a message to all users to notify them that the server has just recieved a message. When the socket on the client's side recieves this message it triggers a new POST request to the server asking for the new messages in the database and updating the state with these new messages thus rendering any new messages on the screen of the user. The styling of the frontend is mostly done using MaterialUI. It has many nice ready to use components and with slight custom styling it allowed me to make a clean and simple looking site.

#### Backend: the backend is built with Flask. the server doesn't serve any templates. It acts as an API through which the user can interact with the database and also through socket io notify the users when it receives a new messages.

#### Here are the API endpoints:

#### "/join" makes sure that the user typed a name and a room and then responds with "joined"

#### "/message" updates the database with the new message the user has sent

#### "/messages" responds with all the messages in the database

#### Database: the database is built with SQLAlchemy. I only have one model called Message. Each message has an id, message it self, user who sent it and the room it was sent to. Through this creative but I would say not so efficient design. I eliminated the need for more models by storing all the data in the message itself. When the user sends a message throuhg "/message" he also sends with it his name and the room to be stored in the database. When a user requests messages through "/messages" he sends the room in the POST request so the server only responds with the messages in the database which have a room column that equals to the room the user is in. All this eliminates the need to use a server side session and a model of users in the database since all the data is stored in the session on the client's side and in the messages themselves.

#### Video demo: https://youtu.be/uRvo0ofESXY
