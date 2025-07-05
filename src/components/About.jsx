import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

const About = (props) => {
  let {loginCheck} = props;
  const navigate = useNavigate();
  useEffect(()=>{
    if(!loginCheck()){
      navigate('/login')
    }
  },[loginCheck, navigate]);
  
  return (
    <div className="container py-5">
      <div className="row">
        <div className="col-lg-8 mx-auto">
          <div className="text-center mb-5">
            <h1 className="display-4 text-primary mb-3">About MyNotebook</h1>
            <p className="lead">A modern, secure note-taking application built with the MERN stack</p>
          </div>

          <div className="card shadow-sm mb-4">
            <div className="card-body">
              <h3 className="card-title text-primary">📝 What is MyNotebook?</h3>
              <p className="card-text">
                MyNotebook is a full-stack web application that allows users to create, manage, and organize their personal notes. 
                Built with modern web technologies, it provides a secure and intuitive platform for digital note-taking.
              </p>
            </div>
          </div>

          <div className="row mb-4">
            <div className="col-md-6">
              <div className="card h-100 shadow-sm">
                <div className="card-body">
                  <h4 className="card-title text-success">✨ Features</h4>
                  <ul className="list-unstyled">
                    <li className="mb-2">✅ User authentication and authorization</li>
                    <li className="mb-2">✅ Create, edit, and delete notes</li>
                    <li className="mb-2">✅ Real-time updates and alerts</li>
                    <li className="mb-2">✅ Responsive design for all devices</li>
                    <li className="mb-2">✅ Secure data storage</li>
                    <li className="mb-2">✅ Clean and intuitive interface</li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="card h-100 shadow-sm">
                <div className="card-body">
                  <h4 className="card-title text-info">🛠️ Technology Stack</h4>
                  <ul className="list-unstyled">
                    <li className="mb-2">🔹 Frontend: React.js with Bootstrap</li>
                    <li className="mb-2">🔹 Backend: Node.js with Express.js</li>
                    <li className="mb-2">🔹 Database: MongoDB</li>
                    <li className="mb-2">🔹 Authentication: JWT tokens</li>
                    <li className="mb-2">🔹 State Management: React Context</li>
                    <li className="mb-2">🔹 Routing: React Router</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* <div className="card shadow-sm mb-4">
            <div className="card-body">
              <h3 className="card-title text-warning">👨‍💻 About the Developer</h3>
              <div className="row align-items-center">
                <div className="col-md-8">
                  <h5>Sami Ul Rehman</h5>
                  <p className="mb-3">
                    A passionate full-stack developer with expertise in modern web technologies. 
                    This project demonstrates proficiency in building complete web applications 
                    with user authentication, database management, and responsive design.
                  </p>
                  <div className="d-flex gap-3">
                    <a 
                      href="https://github.com/samiulrehman" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="btn btn-outline-dark"
                    >
                      <i className="fab fa-github me-2"></i>
                      GitHub Profile
                    </a>
                    <a 
                      href="https://linkedin.com/in/samiulrehman" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="btn btn-outline-primary"
                    >
                      <i className="fab fa-linkedin me-2"></i>
                      LinkedIn Profile
                    </a>
                  </div>
                </div>
                <div className="col-md-4 text-center">
                  <div className="bg-light rounded-circle d-inline-flex align-items-center justify-content-center" style={{width: '100px', height: '100px'}}>
                    <i className="fas fa-user fa-3x text-muted"></i>
                  </div>
                </div>
              </div>
            </div>
          </div> */}

          <div className="card shadow-sm">
            <div className="card-body">
              <h3 className="card-title text-secondary">🚀 Getting Started</h3>
              <p className="card-text">
                To start using MyNotebook, simply create an account or log in if you already have one. 
                You can then create, edit, and manage your notes with ease. All your data is securely 
                stored and protected with modern authentication methods.
              </p>
              <div className="text-center">
                <a href="/" className="btn btn-primary btn-lg">
                  Start Taking Notes
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About
