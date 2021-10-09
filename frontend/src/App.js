import { React } from 'react'
import LogInPage from './components/LogInPage';
import ChatPage from './components/ChatPage'

const App = (props) => {
    if (localStorage.getItem("user")) return <ChatPage />
    else return <LogInPage />;
}

export default App;