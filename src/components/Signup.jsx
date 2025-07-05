import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';

const Signup = (props) => {
  let {loginCheck} = props;
  const navigate = useNavigate();
  useEffect(()=>{
    if(loginCheck()){
      navigate('/')
    }
  },[loginCheck, navigate]);

  let {setAlert} = props;
  // Input validation handlers
  const [signup, setSignup] = useState({ username: '', password: '', confirmPassword: '' });
  const handleChange = (e) => {
    setSignup({ ...signup, [e.target.name]: e.target.value });
  }

  // Password visibility toggle handler
  const [passwordType, setPasswordType] = useState(false);
  const handleShowPassword = () => {
    setPasswordType(!passwordType);
  }
  // Form actions handlers
  const handleSubmit = async (e) => {
    e.preventDefault();
    if(signup.password === signup.confirmPassword){
      const response = await fetch('http://localhost:5000/api/auth/createuser', {
        headers: {
          'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(signup)
      })
      setSignup({ username: '', password: '', confirmPassword: ''});
      const data = await response.json();
      if(data.success){
        navigate('/login')
        setAlert('success', 'Account created successfully, now you can login with your account')
      }else{
        setAlert('warning', data.message)
      }
    }else {
      setAlert('warning', 'Passwords do not match')
      setSignup({username: signup.username, password: '', confirmPassword: ''});
    }
  }


  return (
    <div className='container my-4' >
      <h1 className='text-center'>Signup</h1>
      <form action="" onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Username</label>
          <input required className="form-control" onChange={handleChange} name='username' value={signup.username} type='text' />
        </div>
        <div className="mb-3">
          <label className="form-label">Password</label>
          <input required className="form-control" onChange={handleChange} name='password' autoComplete='false' value={signup.password} type={passwordType ? 'text' : 'password'} />
        </div>
        <div className="mb-3">
          <label className="form-label">Confirm password</label>
          <input required className="form-control" onChange={handleChange} name='confirmPassword' autoComplete='false' value={signup.confirmPassword} type={passwordType ? 'text' : 'password'} />
        </div>
        <div className="mt-1 mb-3 form-check">
          <input className="form-check-input" type="checkbox" onChange={handleShowPassword} />
          <label className="form-check-label" >Show password </label>
        </div>
        <div className="form-submit">
          <button disabled={!signup.username || ! signup.password || !signup.confirmPassword} type="submit" className="btn btn-primary container-fluid rounded-0" > Singup </button>
        <p className="form-text">Already have an account? <Link to="/login">Click to Login</Link></p>

        </div>
      </form>

    </div>
  )
}


export default Signup
