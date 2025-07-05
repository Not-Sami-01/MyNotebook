import React, { useContext } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import NoteContext from '../context/notes/NoteContext';


const Navbar = () => {
  const context = useContext(NoteContext);
  const {login, setLogin} = context;
  const navigate = useNavigate();
  let location = useLocation();
  const logout = () => {
    navigate('/login');
    localStorage.clear();
    setLogin(false);
  }
  return (
    <>
      <nav className="navbar navbar-expand-sm navbar-light bg-light border-bottom">
        <div className="container-fluid">
          <button className="navbar-toggler d-lg-none" type="button" data-bs-toggle="collapse" data-bs-target="/collapsibleNavId" aria-controls="collapsibleNavId" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="collapsibleNavId">
            <ul className="navbar-nav me-auto mt-2 mt-lg-0">
              <li className="nav-item">
                <Link className={`nav-link ${location.pathname === '/' ? 'active fw-bold' : null}`} to="/" aria-current="page">Home
                  <span className="visually-hidden">(current)</span></Link>
              </li>
              <li className="nav-item">
                <Link className={`nav-link ${location.pathname === '/about' ? 'active fw-bold' : null}`} to="/about">About</Link>
              </li>
            </ul>
            <div className="d-flex justify-content-end">
              {
                localStorage.getItem('authToken') && localStorage.getItem('username') && login &&
                  <><button onClick={logout} className="btn btn-outline-danger btn-sm m-1"> Logout </button> <strong className='text-capitalize fs-6 py-2'>&nbsp;| {localStorage.getItem('username')}</strong></> 
              }
            </div>
          </div>
        </div>
      </nav>

    </>
  )
}

export default Navbar
