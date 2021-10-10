import { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import Message from './Message'
import "../css/ChatBox.css"
import io from 'socket.io-client'

let socket = io('/')

const ChatBox = (props) => {

    const [messages, setMessages] = useState([])

    useEffect(() => {
        axios.post('/messages')
            .then(res => {
                console.log(res)
                setMessages(res.data)
            })
    }, [])

    const messagesEndRef = useRef(null)

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }

    useEffect(() => {
        scrollToBottom()
    }, [messages]) 

    socket.on('message', () => {
        axios.post('messages')
            .then(res => {
                setMessages(res.data)
            })
    })

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
    
export default ChatBox