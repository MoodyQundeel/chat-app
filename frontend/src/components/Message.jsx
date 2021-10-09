import { Chip, Avatar } from "@mui/material"
import "../css/Message.css"

const Message = (props) => {
    let user = localStorage.getItem('user')
    console.log(user)
    return (
    <div className="message">
        <Chip avatar={<Avatar>{props.user[0]}</Avatar>}label={props.text} color="primary" />
    </div>
    );
}

export default Message