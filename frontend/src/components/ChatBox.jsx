import { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import Message from './Message'
import "../css/ChatBox.css"
import io from 'socket.io-client'

let socket = io('/')
let fetchMessages;

const ChatBox = (props) => {

    const [messages, setMessages] = useState([])

    useEffect(() => {
        fetchMessages()
    }, [])

    const messagesEndRef = useRef(null)

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }

    useEffect(() => {
        scrollToBottom()
    }, [messages]) 

    fetchMessages = () => {
        axios.post('messages', {room: sessionStorage.getItem("room")})
        .then(res => {
            setMessages(res.data)
        })
    }

    return (
        <div className="messages">
                {
                    messages.map(message =>
                        <Message data={message} />
                    )
                }
                <div ref={messagesEndRef} />
            </div>  
      )
}

socket.on('messageReceived', () => {
    fetchMessages()
})

export default ChatBox