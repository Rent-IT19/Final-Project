import React from 'react';
import './ContactComponent.css'; // Ensure to create this file for styling
import contact from './contact.png';
const ContactComponent = () => {
  return (
    <div className="contact-container">
      <img src={contact} alt="Rent IT Image" className="about-image" />
      <p className="contact-text">
        Flexible renting has never been easier. Our goal is to provide you with the best Computers on rental service for your business convenience and comfort.
      </p>
      <p className="contact-info">
        Email: contact@RentIt.com<br />
        Phone: +91 998767890<br />
        Address: 123 ManikChand Gallaria, Pune, Maharashtra
      </p>
    </div>
  );
};

export default ContactComponent;
