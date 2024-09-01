import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

const About = (props) => {
  let {loginCheck} = props;
  const navigate = useNavigate();
  useEffect(()=>{
    if(!loginCheck()){
      navigate('/login')
    }
  },[]);
  return (
    <>
      <h1>
        This is about
      </h1>
    </>
  )
}

export default About
