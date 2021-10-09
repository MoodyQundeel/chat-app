import { Button, TextField, Box, FormGroup } from "@mui/material"
import "../css/LogInPage.css"

const MessageBox = (props) => {
    return (
        <form method="POST" onSubmit={e => handleSubmit(e)}>
            <TextField fullWidth="true" variant="outlined" label="Message" id="message"></TextField>
            <Button sx={{ mt: 3 }} variant="contained" type="submit">Send</Button>
        </form>
    )
}

const handleSubmit = (e) => {
    e.preventDefault()
    const message = document.getElementById("message").value
    let xhr = new XMLHttpRequest()
    xhr.open("POST", "/message")
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

    xhr.onreadystatechange = function() {
    if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
        window.location.reload()
    }
}
    xhr.send("message=" + message);
}

export default MessageBox