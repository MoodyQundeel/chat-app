import { Chip, Avatar } from "@mui/material"
import "../css/Message.css"

const Message = (props) => {
    if (props.user == sessionStorage.getItem('user')) {
        return (
            <div className="message-current-user">
                <Avatar>{props.message.user[0]}</Avatar>
                <p>{props.message.message}</p>
            </div>
        );
    }
    else {
        return (
            <div className="message-different-user">
                <Avatar className="message-avatar" sx={{width:35, height:35, mr:2}}>{props.data.user[0] + props.data.user[1]}</Avatar>
                <p>{props.data.message}</p>
            </div>
        );    
    }
}

export default Message