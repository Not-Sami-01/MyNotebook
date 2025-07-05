import { useState } from 'react';
import NoteContext from './NoteContext';
import API_BASE_URL from '../../config';

const NoteState = (props) => {
  const [login, setLogin] = useState(localStorage.getItem('authToken') && localStorage.getItem('username')? true : false);
  
  // Fetch All Notes
  const [notes, setNotes] = useState([]);
  const getNotes = async ()=>{
    let response = await fetch(`${API_BASE_URL}/notes/fetchnotes`, {
      method: 'GET',
      headers: { 
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('authToken'),
      }
    });
    let fetchedNotes = await response.json();
    setNotes(fetchedNotes)
  }

  const addNote = async (title, description, tag=null)=>{
    await fetch(`${API_BASE_URL}/notes/addnote`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('authToken'),
      },
      body: JSON.stringify({title, description, tag})
    });
    getNotes();
  }
  
  const deleteNote =async (id)=>{
    await fetch(`${API_BASE_URL}/notes/deletenote/${id}`, {
      method: 'DELETE',
      headers: { 
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('authToken'),
      },
      body: JSON.stringify({id:id})
    });
    getNotes();
  }
  
  const editNote = async (id, title, description, tag) => {
    await fetch(`${API_BASE_URL}/notes/updatenote/${id}`, {
      method: 'PUT',
      headers: { 
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('authToken'),
      },
      body: JSON.stringify({title, description, tag})
    });
    getNotes();
  }

  return (
    <NoteContext.Provider value={{notes, deleteNote, editNote, addNote, getNotes, login, setLogin}}>
      {props.children}
    </NoteContext.Provider>
  )
}

export default NoteState;