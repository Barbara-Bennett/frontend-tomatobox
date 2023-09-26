import React from 'react';
import {Navbar} from 'react-bootstrap';
import logo from "../static/logo.png";
import "../App.css";

const Navigation = ( ) => {
  return(
    <div>
      <Navbar className="navbar" data-bs-theme="dark" expand="lg">
        <Navbar.Brand className="app-logo" href="/">
          <img className="d-inline-block align-top img-logo" alt="app logo: red tomato" src={logo} />{' '}
          <span className="text-logo">Tomato Box</span>
        </Navbar.Brand>
      </Navbar>
    </div>
  );
};

export default Navigation;


