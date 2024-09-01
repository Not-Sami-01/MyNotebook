import React, { useContext } from 'react'


import NoteContext from '../context/notes/NoteContext'
const NoteItem = (props) => {
  const context = useContext(NoteContext);
  const {deleteNote, editNote} = context;
  const { note, updateNote } = props;
  return (
    <>
    <div className="container col-md-4 my-2">
      <div className="card mx-auto" style={{
        width: '16rem'
      }}>
        <div className="card-body">
          <h4 className="card-title d-flex justify-content-between">{note.title}
            <div className="">
            <i className="fa-solid fa-trash mx-1 fs-6" onClick={()=>{deleteNote(note._id)}} style={{
              cursor: 'pointer'
            }}></i>
            <i className="fa-solid fa-edit mx-1 fs-6" onClick={()=> updateNote(note)} style={{
              cursor: 'pointer'
            }}></i>
            </div>
          </h4>
          <p className="card-text">{note.description}</p>
          <div key={note._id}>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}

export default NoteItem
