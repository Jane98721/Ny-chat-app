import React, { useState} from 'react'
import { useNavigate } from 'react-router-dom'

const BASEURL = "https://chatify-api.up.railway.app"

const Login = () => {
const [email, setEmail] = useState ("")
const [password, setPassword] = useState ("")
const [error, setError] = useState (false)
const navigate = useNavigate()
const [submitted, setSubmitted] = useState (false)


const handleEmail =(e) => {
    setEmail(e.target.value)
}

const handlePassword = (e) => {
    setPassword(e.target.value)
}


const handleSubmit = async (e) => {
    e.preventDefault ()

        const data = {
            username:email,
            password: password
        }


    try {
        const response = await fetch(`${'https://chatify-api.up.railway.app/auth/token'
            
        }`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data)
          })
  
          if (response.ok) {
            const result = await response.json()
            const {token,username} = result
  
           localStorage.setItem ('authToken', token)
           localStorage.setItem ('username', username)

           setSubmitted (true)
           setError ("")  
           navigate('/Chat')

        } else {
          const errorData = await response.json();
          setError(errorData.message || 'Invalid credentials') 
          } 
  
        } catch (error) {
          console.error('Error:', error);
          setError('Login failed')
        }
      } 
      

return (

    <div className = "forms">
    <form onSubmit = {handleSubmit}>
<label className='Emaillabel'> Email </label>

<br></br>
<br></br>

        <input
        onChange = {handleEmail}
        className = "input"
        value = {email}
        type = "email"
        placeholder = "Enter your email"
        />
<br></br>
<br/><br/>

<label className='Passwordlabel'>  Password </label>
<br></br>
<br></br>
        <input
        onChange = {handlePassword}
        className = "input"
        value = {password}
        type = "password"
        placeholder ="Enter your password"
        />

<br></br>
<br></br>
<br></br>
<button  className = "btn" type= "submit"> Login

</button>

<br></br>
</form>
    {error && (

    <h1 className="RegMsg"> {error} </h1>
)}


</div>
)
}

export default Login

