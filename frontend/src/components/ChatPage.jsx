import ChatBox from "./ChatBox"
import MessageBox from "./MessageBox"
import "../css/ChatPage.css"
import { useEffect } from "react"


const ChatPage = (props) => {
    return (
        <div className="chatPage">
            <ChatBox />
            <MessageBox />
        </div>
    );             
}

export default ChatPage