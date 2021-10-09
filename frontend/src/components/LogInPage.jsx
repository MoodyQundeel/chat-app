import { Button, TextField, Box, FormGroup } from "@mui/material"
import "../css/LogInPage.css"

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
    let xhr = new XMLHttpRequest()
    xhr.open("POST", "/register")
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

    xhr.onreadystatechange = function() {
    if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
        localStorage.setItem("user", name);
        window.location.reload()
    }
}
    xhr.send("name=" + name);
}

export default LogInPage