import React from 'react';
import './Header.css';
import logo from './logo.png'; 
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <div>
    <header className="text-light p-3 d-flex justify-content-between align-items-center">
      {/* Logo and title */}
      <div className="logo-title-container d-flex align-items-center">
        <img src={logo} alt="Rent IT logo" className="logo" />
        <h1 className="mb-0">Rent IT</h1>
      </div>

      {/* Navigation Links */}
      <nav className="my-2">
        <ul className="list-inline mb-0">
         
        <li>
            <Link to="/ ">Home </Link>
          </li>
        {/* <li className="list-inline-item"><a href="#home">Home</a></li> */}
          
          {/* <li className="list-inline-item"><a href="#about">About</a></li> */}

          <li>
            <Link to="/about ">About </Link>
          </li>

          <li className="list-inline-item"><a href="#services">Services</a></li>
          <li>
            <Link to="/contact ">Contact Us</Link>
          </li>

          {/* <li className="list-inline-item"><a href="#contact">Contact</a></li> */}
      


          <li>
            <Link to="/Login ">Login </Link>
          </li>


        </ul>
      </nav>
    </header>


    </div>
  );
};

export default Header;
