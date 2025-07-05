import React, { useEffect } from 'react'
import AddNote from './AddNote';
import Notes from './Notes';
import { useNavigate } from 'react-router-dom';
const Home = (props) => {
  let {loginCheck} = props;
  const navigate = useNavigate();
  useEffect(()=>{
    if(!loginCheck()){
      navigate('/login');
    }
  },[loginCheck,navigate]);
  return (
    <>
      <AddNote setAlert={props.setAlert} />
      <Notes setAlert={props.setAlert} />
    </>
  )
}

export default Home
