import React, { useContext, useEffect } from 'react'
import NoteContext from '../context/notes/NoteContext'
import AddNote from './AddNote';
import Notes from './Notes';
import { useNavigate } from 'react-router-dom';
const Home = (props) => {
  const state = useContext(NoteContext);
  const { notes, setNotes } = state;
  let {loginCheck} = props;
  const navigate = useNavigate();
  useEffect(()=>{
    if(!loginCheck()){
      navigate('/login');
    }
  },[]);
  return (
    <>
      <AddNote setAlert={props.setAlert} />
      <Notes setAlert={props.setAlert} />
    </>
  )
}

export default Home
