import React, { useContext, useEffect, useRef, useState } from 'react'
import NoteContext from '../context/notes/NoteContext'
import NoteItem from './NoteItem';
const Notes = (props) => {
  const {setAlert} = props;
  const state = useContext(NoteContext);
  const { notes, getNotes, editNote } = state;
  const [note, setNote] = useState({id: '', etitle: '', edescription: '', etag: '' });
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    getNotes().then(() => setLoading(false));
  }, [getNotes]);
  const ref = useRef(null);
  const refClose = useRef(null);
  const updateNote = (currNote) => {
    setNote({id: currNote._id, etitle: currNote.title, edescription: currNote.description, etag: currNote.tag });
    ref.current.click();
  }
  let handleChange = (event) => {
    event.preventDefault();
    setNote({ ...note, [event.target.name]: event.target.value });
  }
  let handleClick = (e) => {
    e.preventDefault();
    editNote(note.id, note.etitle, note.edescription, note.etag);
    refClose.current.click();
    setAlert('success', 'Note updated successfully');
  }

  if(loading)
    return (<div className=''  style={{
      width:'100%',
      display:'flex',
      flexDirection: 'column',
      justifyContent: "center",
      alignItems: "center"
    }}>
              <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              Loading Notes
            </div>)
  return (
    <>
      <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#modalId">
      </button>
      <div className="modal fade" id="modalId" tabIndex="-1" data-bs-backdrop="static" data-bs-keyboard="false" role="dialog" aria-labelledby="modalTitleId" aria-hidden="true">
        <div className="modal-dialog" role="document" >
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="modalTitleId">
                Update Note
              </h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" ></button>
            </div>
            <div className="modal-body">
              <div className="mb-3">
                <label htmlFor="" className="form-label">Title</label>
                <input name='etitle' id='etitle' value={note.etitle} onChange={handleChange} type="text" className="form-control" />
              </div>
              <div className="mb-3">
                <label htmlFor="" className="form-label">Description</label>
                <textarea name='edescription' id='edescription' onChange={handleChange} className="form-control" value={note.edescription} rows="3"></textarea>
              </div>
              <div className="mb-3">
                <label htmlFor="" className="form-label">Tag</label>
                <input type="text" name='etag' value={note.etag} className="form-control" id='etag' onChange={handleChange} />
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" ref={refClose} className="btn btn-secondary" data-bs-dismiss="modal" >
                Cancel
              </button>
              <button type="button" disabled={note.etitle.length < 5 || note.edescription.length < 3} onClick={handleClick} className="btn btn-primary">Save Changes</button>
            </div>
          </div>
        </div>
      </div>

      <h1 className="text-center mt-4">Notes</h1>
      <div className="container mx-auto" style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '10px'
      }}>
        {notes?.length === 0 && <p className="text-center fs-4 mt-1">No notes to display!</p>}
        {notes && notes?.map((note) => {
          return (
            <NoteItem key={note._id} note={note} updateNote={updateNote} />
          )
        })}
      </div>
    </>
  )
}

export default Notes
