import React from 'react';
import './Testimonials.css';

const Testimonials = () => {
  return (
    <div className="testimonials-container">
      <h2>Testimonials</h2>
      <div className="testimonial">
        <p>"Lorem ipsum dolor sit amet, consectetur adipiscing elit."</p>
        <p>- John Doe</p>
      </div>
      <div className="testimonial">
        <p>"Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."</p>
        <p>- Jane Smith</p>
      </div>
      <div className="testimonial">
        <p>"Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."</p>
        <p>- Michael Johnson</p>
      </div>
    </div>
  );
};

export default Testimonials;
