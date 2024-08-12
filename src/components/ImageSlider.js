import React from 'react';
import './ImageSlider.css'; // Import the CSS file for styling
import image1 from './6.jpg';
import image2 from './2.jpg';

const ImageSlider = () => {
  return (
    <div className="image-slider">
      {/* First item: Image on the left, description on the right */}
      <div className="image-slider-item">
        <div className="image-slider-image">
          <img src={image1} alt="Image 1" />
        </div>
        <div className="image-slider-description">
          <h3>Long Term Rentals</h3>
          <p>Rent IT offers cost-effective and flexible rental solutions for businesses, freelancers, and individuals. We provide a wide range of computer equipment to meet your needs. Our rental plans cater to both short-term and long-term requirements, helping you save on upfront investments while enjoying hassle-free end-to-end rental services, including delivery.</p>
        </div>
      </div>

      {/* Second item: Image on the right, description on the left */}
      <div className="image-slider-item reverse">
        <div className="image-slider-description">
          <h3>Short Term Rentals</h3>
          <p>Choose Rent IT for top-notch short-term rental solutions, ideal for events, projects, and remote work. We provide an extensive selection of computer equipment to meet your needs. Opt for our tailored rental services to fulfill your temporary requirements, whether for events, travel, or working from home.</p>
        </div>
        <div className="image-slider-image">
          <img src={image2} alt="Image 2" />
        </div>
      </div>
    </div>
  );
};

export default ImageSlider;
