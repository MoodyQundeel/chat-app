import { Button, TextField, Icon } from "@mui/material"
import "../css/MessageBox.css"
import axios from 'axios'
import io from 'socket.io-client'

let socket = io('/')

const MessageBox = (props) => {
    return (
        <form method="POST" id="messageForm" onSubmit={e => handleSubmit(e)}>
            <TextField fullWidth="true" autoComplete="off" variant="outlined" label="Message" id="message"></TextField>
            <Button sx={{ ml: 2 }} variant="contained" size="small" type="submit" className="sendBtn"><Icon>send</Icon></Button>
        </form>
    )
}

const handleSubmit = (e) => {
    e.preventDefault()
    const message = document.getElementById("message").value
    axios.post('/message', {
        message: message,
        user: sessionStorage.getItem("user"),
        room: sessionStorage.getItem("room")
      }).then(() => {
            document.getElementById('message').value = "";
            socket.emit('message')
      })
    
}

export default MessageBox