import React from 'react';
import { Carousel } from 'react-bootstrap';
import './Main.css'; // Assuming you have styles defined in Main.css
import image1 from './img1.jpg'; // Adjust path as per your exact folder structure
import image2 from './1.jpg';
import image3 from './img3.jpg';

const Main = () => {
  return (
    <main className="py-5">
      <div className="container">
        {/* Bootstrap Carousel */}
        <Carousel>
          {/* First Carousel Item */}
          <Carousel.Item>
            <img
              className="d-block w-100"
              src={image1}
              alt="First slide"
            />
          <Carousel.Caption>
              <h3>Empowering Your Business with Seamless IT Rentals</h3>
            </Carousel.Caption>
          </Carousel.Item>

          {/* Second Carousel Item */}
          <Carousel.Item>
            <img
              className="d-block w-100"
              src={image2}
              alt="Second slide"
            />
           
          </Carousel.Item>

          <Carousel.Item>
            <img
              className="d-block w-100"
              src={image3}
              alt="Third slide"
            />
           
          </Carousel.Item>

          {/* Add more Carousel.Items for additional slides */}
        </Carousel>
      </div>
    </main>
  );
};

export default Main;
