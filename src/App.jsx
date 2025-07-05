import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  BrowserRouter as Router,
  Routes as Switch,
  Route,
} from "react-router-dom";
import Home from './components/Home';
import NoteState from './context/notes/NoteState';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import About from './components/About';
import Alert from './components/Alert';
import Login from './components/Login';
import Signup from './components/Signup';

const App = () => {

  const [showAlert, setShowAlert] = useState({alert: false, type: 'success', message: 'Operation was successfull'});
  const setAlert = async (type, message) => {
    setShowAlert({alert: true, type, message});
    setTimeout(() => setShowAlert({alert: false, type: '', message: ''}), 2000);
  } 
  const loginCheck = () =>{
    if(localStorage.getItem('authToken') && localStorage.getItem('username')){
      return true;
    }else{
      localStorage.clear();
      return false;
    }
  }
  return (
    <NoteState>
      <Router>
        <div className="d-flex flex-column min-vh-100">
          <Navbar/>
          <main className="flex-grow-1">
            {showAlert.alert && <Alert type={showAlert.type} message={showAlert.message} />}
            {!showAlert.alert && <div className="container-fluid py-3"></div>}
            <Switch>
              <Route exact path="/" element={<Home setAlert={setAlert} loginCheck={loginCheck} />} />
              <Route exact path="/about" element={<About loginCheck={loginCheck} />} />
              <Route exact path="/login" element={<Login setAlert={setAlert} loginCheck={loginCheck} />}  />
              <Route exact path="/signup" element={<Signup setAlert={setAlert} loginCheck={loginCheck} />} />
            </Switch>
          </main>
          <Footer />
        </div>
      </Router>
    </NoteState>

  )
}

export default App;
