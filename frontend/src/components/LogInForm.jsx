import { Button, TextField, Box, FormGroup } from "@mui/material"
import "../css/LogInForm.css"

const LogInForm = () => {
    return (
        <form onSubmit={e => registerUser(e)}>
            <TextField fullWidth="true" variant="outlined"  label="Name" id="name"></TextField>
            <Button sx={{ mt: 3 }} variant="contained" type="submit">Join</Button>
        </form>
    )
}

let registerUser = (e) => {
    e.preventDefault()
    const xhr = new XMLHttpRequest()
    xhr.open("POST", "http://localhost:3000/register")
    xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded;charset=UTF-8');
    xhr.send("username=" + document.getElementById("name").value)
}

export default LogInForm