import React from 'react';
import './about.css';
import about from './about.png';
const About = () => {
  return (
    <div className="about-container">
      <img src={about} alt="Rent IT Image" className="about-image" />
      <p>Welcome to RENT IT, your number one source for renting computers . We're dedicated to giving you the very best of rental services, with a focus on reliability, customer service, and uniqueness.</p>
      <p>Founded in 2024, RENT IT has come a long way from its beginnings. When we first started out, our passion for providing the best rental experience drove us to do intense research, and gave us the impetus to turn hard work and inspiration into a booming online rental system. We now serve customers all over the place, and are thrilled to be a part of the wing of the rental industry.</p>
      <p>We hope you enjoy our products as much as we enjoy offering them to you. If you have any questions or comments, please don't hesitate to contact us.</p>
      <p>Sincerely, The RENT IT Team</p>
    </div>
  );
};

export default About;
