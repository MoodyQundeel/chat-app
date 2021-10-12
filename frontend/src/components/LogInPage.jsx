import { Button, TextField, Box, FormGroup } from "@mui/material"
import "../css/LogInPage.css"
import axios from 'axios'

const LogInPage = (props) => {
    return (
        <form method="POST" id="loginform" onSubmit={e => handleSubmit(e)}>
            <TextField required sx={{ mb: 2 }}fullWidth="true" variant="outlined" label="Name" id="name"></TextField>
            <TextField required fullWidth="true" variant="outlined" label="Room" id="room"></TextField>
            <Button sx={{ mt: 3 }} variant="contained" type="submit">Join</Button>
        </form>
    )
}

const handleSubmit = (e) => {
    e.preventDefault()
    const name = document.getElementById("name").value
    const room = document.getElementById("room").value
    axios.post('/login', {
        name: name,
        room: room
      }).then(res => {
        sessionStorage.setItem('user', name)
        sessionStorage.setItem('room', room)
      }).then(() => {
          window.location.reload()
      })
    
}

export default LogInPage