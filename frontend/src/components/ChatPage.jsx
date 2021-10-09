import { useState, useEffect } from 'react'
import axios from 'axios'
import Message from './Message'

const ChatPage = (props) => {

    const [messages, setMessages] = useState([])

    useEffect(() => {
        axios.post('/messages')
            .then(res => {
                console.log(res)
                setMessages(res.data)
            })
    }, [])

    return (
        <div>
            {
                messages.map(message => (
                    <Message text={message.message} />
                ))
            }
        </div>
            
      )
}
    
export default ChatPage