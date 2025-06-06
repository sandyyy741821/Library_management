import React from 'react'
import './login.css'
const login_page = ({sendData,setUser,setpass,message}) => {
  return (
    <div className='rot'>
    <div className='login-container'>
    <h1>Login :</h1>
    <div className='login-div'>
      <form onSubmit={sendData}>
        <label>email</label>
        <input 
        type="text" 
        placeholder='EmailID'
        onChange={(e)=>setUser(e.target.value)}
        />
        <label>Password</label>
        <input 
        type="password" 
        placeholder='password'
        onChange={(e)=>setpass(e.target.value)}
        />
        <button type='submit'>Submit</button>
      </form>
      {message && <div className="message">{message}</div>}
    </div>
    </div>
    </div> 
  )
}

export default login_page;
