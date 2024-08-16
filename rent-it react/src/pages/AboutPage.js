import React, { useState } from 'react';
import HeaderBar from '../components/Header';
import { Message, useToaster } from 'rsuite';

const About = () => {
  const [placement, setPlacement] = useState('topEnd');
  const toaster = useToaster();

  const showMessage = (type, message) => {
    toaster.push(
      <Message showIcon type={type} closable>
        <strong> {message} </strong>
      </Message>,
      { placement }
    );
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Display the thank you message using toaster
    showMessage('success', 'Thank you for your feedback!');

    event.target.reset(); // Clear the form fields
  };

  return (
    <>
      <HeaderBar />
      <div className="container mt-4">
        <div className="mt-5">
          <div className='row'>
            <div className='md-12'>
              <h1 className="text-center mb-4">About Us</h1>
              <div className="draft">
                <h2>Welcome to Our Peripheral Rental Service!</h2>
                <p className="lead">
                  At our company, we specialize in providing high-quality computer peripherals for rent. Whether you need a mouse, keyboard, monitor, or any other accessory, we have a wide selection available to meet your needs. Our goal is to offer flexible rental options that cater to both short-term and long-term requirements, ensuring you have the right equipment for your projects or events.
                </p>
                <p>
                  We understand that finding the right peripherals can be challenging, especially if you're in need of specific features or high-performance gear. That's why we strive to provide detailed information about each product in our inventory, so you can make an informed decision. Our team is dedicated to offering excellent customer service and support throughout your rental period.
                </p>
                <p>
                  Renting peripherals from us is easy and convenient. Simply browse our catalog, select the items you need, and choose a rental period that works best for you. Our straightforward rental process and competitive pricing make it simple to get the equipment you need without the hassle of purchasing outright.
                </p>
                <p>
                  If you have any questions or need assistance, please don't hesitate to reach out to our friendly support team. We're here to help you get the most out of your rental experience and ensure that you have the peripherals you need to succeed.
                </p>
              </div>
            </div>
          </div>
          <div className='row'>
            <div className='md-12'>
              <h2 className="text-center mb-4">Feedback Form</h2>
              <form onSubmit={handleSubmit} className="border p-4 rounded">
                <div className="mb-3">
                  <label htmlFor="formName" className="form-label">Name</label>
                  <input type="text" id="formName" className="form-control" placeholder="Enter your name" required />
                </div>
                <div className="mb-3">
                  <label htmlFor="formEmail" className="form-label">Email</label>
                  <input type="email" id="formEmail" className="form-control" placeholder="Enter your email" required />
                </div>
                <div className="mb-3">
                  <label htmlFor="formMessage" className="form-label">Message</label>
                  <textarea id="formMessage" className="form-control" rows="3" placeholder="Your feedback" required></textarea>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default About;
