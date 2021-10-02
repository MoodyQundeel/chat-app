const LogInForm = () => {
    return (
        <form onSubmit={e => registerUser(e)}>
            <input type="text" placeholder="Username" id="name"></input>
            <input type="submit" value="Join"></input>
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