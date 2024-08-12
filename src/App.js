import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import 'bootstrap/dist/js/bootstrap.bundle.min';

// Components
import Header from './components/header';
import Main from './components/Main';
import Footer from './components/Footer';
import Registration from './components/Registration';
import About from './components/about';
import ImageSlider from './components/ImageSlider';
import ContactComponent from './components/ContactComponent';
import Testimonials from './components/Testimonials';
import Login from './components/Login';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        
        <Routes>
          {/* Default route for Home */}
          <Route path="/" element={
            <>
              <Main />
              <ImageSlider />
              <Footer />
            </>
          } />

          {/* Route for About */}
          <Route path="/about" element={<About />} />

          {/* Route for Features */}
          <Route path="/services" element={
            <>
              <Main />
              <ImageSlider />
              <Footer />
            </>
          } />

          {/* Route for Contact */}
          <Route path="/contact" element={<ContactComponent />} />

          {/* Route for Registration */}
          <Route path="/registration" element={<Registration />} />

          <Route path="/testimonials" element={<Testimonials />} />

          <Route path="/Login" element={<Login />} /> {/* Add this line */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
