import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-light navbar-light text-dark  py-4 mt-5">
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <h5>MyNotebook</h5>
            <p className="mb-0">A secure and intuitive note-taking application built with the MERN stack.</p>
          </div>
          <div className="col-md-6 text-md-end">
            <h6>Connect with the Developer</h6>
            <div className="d-flex justify-content-md-end gap-3 mt-2">
              <a 
                href="https://github.com/not-sami-01" 
                target="_blank" 
                rel="noopener noreferrer"
                className=" text-decoration-none"
              >
                <i className="fab fa-github me-1"></i>
                GitHub
              </a>
              <a 
                href="https://www.linkedin.com/in/sami-ur-rehman-safdar-98271b334/" 
                target="_blank" 
                rel="noopener noreferrer"
                className=" text-decoration-none"
              >
                <i className="fab fa-linkedin me-1"></i>
                LinkedIn
              </a>
            </div>
          </div>
        </div>
        <hr className="my-3" />
        <div className="row">
          <div className="col-12 text-center">
            <p className="mb-0">
              © 2024 MyNotebook. Made with ❤️ by Sami Ul Rehman
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 