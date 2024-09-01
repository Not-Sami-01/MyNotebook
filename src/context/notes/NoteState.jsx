import { useState } from 'react';
import NoteContext from './NoteContext';


const NoteState = (props) => {
  const [login, setLogin] = useState(localStorage.getItem('authToken') && localStorage.getItem('username')? true : false);
  let host = 'http://localhost:5000'
  // Fetch All Notes
  const [notes, setNotes] = useState([]);
  const getNotes = async ()=>{
    let response = await fetch(`${host}/api/notes/fetchnotes`, {
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
    // TODO: API call
    let response = await fetch(`${host}/api/notes/addnote`, {
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
    let response = await fetch(`${host}/api/notes/deletenote/${id}`, {
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
    // let noteToEdit = notes.filter(note => {return note._id == id});
    let response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: 'PUT',
      headers: { 
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('authToken'),
      },
      body: JSON.stringify({title, description, tag})
    });
    const json = await response.json();
    getNotes();
  }

  return (
    <NoteContext.Provider value={{notes, deleteNote, editNote, addNote, getNotes, login, setLogin}}>
      {props.children}
    </NoteContext.Provider>
  )
}

export default NoteState;
