import { Button, TextField, Box, FormGroup } from "@mui/material"
import "../css/MessageBox.css"
import axios from 'axios'

const MessageBox = (props) => {
    return (
        <form method="POST" id="messageForm" onSubmit={e => handleSubmit(e)}>
            <TextField variant="outlined" label="Message" id="message"></TextField>
            <Button sx={{ ml: 2 }} variant="contained" type="submit" className="sendBtn">Send</Button>
        </form>
    )
}

const handleSubmit = (e) => {
    e.preventDefault()
    const message = document.getElementById("message").value
    axios.post('/message', {
        message: message,
        user: sessionStorage.getItem("user")
      });
    document.getElementById('message').value = ""
}

export default MessageBox