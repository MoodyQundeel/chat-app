import { Button, TextField, Box, FormGroup } from "@mui/material"
import "../css/LogInPage.css"
import axios from 'axios'

const LogInPage = (props) => {
    return (
        <form method="POST" id="loginform" onSubmit={e => handleSubmit(e)}>
            <TextField fullWidth="true" variant="outlined" label="Name" id="name"></TextField>
            <Button sx={{ mt: 3 }} variant="contained" type="submit">Join</Button>
        </form>
    )
}

const handleSubmit = (e) => {
    e.preventDefault()
    const name = document.getElementById("name").value
    axios.post('/login', {
        name: name
      }).then(res => {
        sessionStorage.setItem('id', res.data.id)
        sessionStorage.setItem('user', res.data.user)
      }).then(() => {
          window.location.reload()
      })
    
}

export default LogInPage