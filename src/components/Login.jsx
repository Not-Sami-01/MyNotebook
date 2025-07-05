import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from "react-router-dom";
import NoteContext from '../context/notes/NoteContext';
import API_BASE_URL from '../config';

const Login = (props) => {
  let {loginCheck} = props;
  const navigate = useNavigate();
  useEffect(()=>{
    if(loginCheck()){
      navigate('/')
    }
  },[loginCheck, navigate]);
  const {setAlert} = props;
  const context = useContext(NoteContext);
  const [login, setLogin] = useState({ username: '', password: '' });
  const handleChange = (e) => {
    setLogin({ ...login, [e.target.name]: e.target.value });
  }
  const [passwordType, setPasswordType] = useState(false);
  const handleShowPassword = () => {
    setPasswordType(!passwordType);
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
      // Replace the fetch URL in handleSubmit function:
const response = await fetch(`${API_BASE_URL}/auth/login`,{
  headers: {
    'Content-Type': 'application/json'
  },
  method: 'POST',
  body: JSON.stringify(login),
}).catch(err => {console.log('Error is coming')});
      const data = await response.json();
      if(data.success){
        localStorage.setItem('authToken', data.authtoken);
        localStorage.setItem('username', login.username);
        context.setLogin(true);
        navigate('/')
        setAlert('success', 'Logged in successfully')
      }else{
        setAlert('warning', 'Invalid credentials')
        
      }
    setLogin({username: '', password: ''});
  }
  return (
    <div className='container my-4' >
      <h1 className='text-center'>Login to continue</h1>
      <form action="" onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Username</label>
          <input required className="form-control" onChange={handleChange} name='username' value={login.username} type='text' />
        </div>
        <div className="mb-3">
          <label className="form-label">Password</label>
          <input required className="form-control" onChange={handleChange} name='password' autoComplete='false' value={login.password} type={passwordType ? 'text' : 'password'} />
        </div>
        <div className="mt-1 mb-3 form-check">
          <input className="form-check-input" type="checkbox" onChange={handleShowPassword} />
          <label className="form-check-label" >Show password </label>
        </div>
        <div className="form-submit">
        <button disabled={!login.username || !login.password} type="submit" className="btn btn-primary container-fluid rounded-0" > Login </button>
        <p className="form-text">Don't have an account? <Link to="/signup">Click to signup</Link></p>
        </div>
      </form>
    </div>
  )
}

export default Login
