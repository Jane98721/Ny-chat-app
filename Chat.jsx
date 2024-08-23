import React, {useState, useEffect} from "react";
import { TextField, Button} from '@mui/material'
import { useNavigate } from "react-router-dom";
import './App.css'
import SideBar from './Sidebar'

const BASEURL = "https://chatify-api.up.railway.app"


const Chat = () => {
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState('');
    const [createdBy, setCreatedBy] = useState ('')
    const navigate = useNavigate()
    const [username, setUsername] = useState();
    const [avatar, setAvatar] = useState('');

    useEffect (() => {

        const fetchMessages = async () => {
            const token = localStorage.getItem('authToken')
            if(!token) {
                console.error('error')
                navigate('/login')
                return
            }
    
            try {
     const response = await fetch(`${ 'https://chatify-api.up.railway.app/conversations'}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        }
     })
        
            if (response.ok) {

            const result = await response.json();
            setMessages(result)
            } else {
                console.error('error', response.statusText)
            }
          } catch (error) {
            console.error('Error:', error);
          }
    }

   
    const storedUsername = localStorage.getItem('username')
    const storedAvatar = localStorage.getItem('avatar')
    if(storedUsername) setUsername(storedUsername)
    if(storedAvatar) setAvatar(storedAvatar)
    
 fetchMessages ()
        },[navigate])

    const handleSubmit = async(e) => {
        e.preventDefault ()
        
        const token = localStorage.getItem('authToken')
        

        if (!token)
        {
          console.error('No token found')
          navigate ('./login')
          return
        }
    
            const newMessage = {
                content: message,
                createdBy: username,
                createdAt: new Date().toISOString () 
            }

    
                try {
                    const response = await fetch(`${ 'https://chatify-api.up.railway.app/messages'}`, {
                      method: 'POST',
                      headers: {
                        'Content-Type': 'application/json',
                       'Authorization':`Bearer ${token}`
                     }, 
                     body: JSON.stringify(newMessage),
                    });
              
                    if (response.ok) {
                        const savedMessage = await response.json()
                    setMessages ([...messages, savedMessage])
                    setMessage ('')
                    }  else{
                      const error = await response.json()
                      console.error('Error', error)
                    }
                  } catch (error) {
                    console.error('Error:', error);
                  }
                }

                    
return (

    <div>
      
<SideBar/>
<div className="user-info">
  <img src= "./pic/avatar.png" alt="Avatar" className="avatar"></img>
  <h2> Welcome, {username} </h2>
</div>
<br></br>
<br></br>
    <form onSubmit={handleSubmit}>
      <TextField className="myText"
        label="Message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      /> 
<br></br>
<br></br>

<Button type="submit">
        Send message
      </Button>


      </form>

      <ul>
        {messages.map((msg) =>  (
            <li key = {msg.id}> {msg.content} - <em> {msg.createdBy} </em> </li>
        ))}
      </ul>
     
      </div>
)

    }

export default Chat