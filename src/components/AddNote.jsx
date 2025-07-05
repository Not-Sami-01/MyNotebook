import React, { useContext, useState } from 'react'
import NoteContext from '../context/notes/NoteContext'

const AddNote = (props) => {
  const context = useContext(NoteContext);
  const {setAlert} = props;
  const { addNote } = context;
  const [note, setNote] = useState({ title: '', description: '', tag: '' });
  const handleChange = (event) => {
    event.preventDefault();
    setNote({ ...note, [event.target.name]: event.target.value });
  }
  let handleClick = (e) => {
    e.preventDefault();
    addNote(note.title, note.description, note.tag);
    setNote({ title: '', description: '', tag: '' })
    setAlert('success', 'Added note successfully');
  }
  return (
    <div>
      <h1 className='text-center mt-3'>Add Note</h1>
      <div className="container p-3">
        <form action="" onSubmit={handleClick}>
          <div className="mb-3">
            <label htmlFor="" className="form-label">Title</label>
            <input name='title' onChange={handleChange} type="text" className="form-control" value={note.title} />
          </div>
          <div className="mb-3">
            <label htmlFor="" className="form-label">Content</label>
            <textarea name='description' onChange={handleChange} className="form-control" value={note.description} rows="3"></textarea>
          </div>
          <div className="mb-3">
            <label htmlFor="" className="form-label" >Tag</label>
            <input type="text" name='tag' value={note.tag}  className="form-control" onChange={handleChange} /> 
          </div>
          <div className="mb-3">
            <button type="submit" disabled={note.title.length < 5 || note.description.length < 3}className="btn btn-primary my-2" >
              Add Note
            </button>
          </div>

        </form>
      </div>
    </div>
  )
}

export default AddNote
