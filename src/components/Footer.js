import React from 'react';

const Footer = () => {
  return (
    <section>
      {/* Footer */}
      <footer className="text-center text-white" style={{ backgroundColor: '#0a4275' }}>
        {/* Grid container */}
        <div className="container p-4 pb-0">
          {/* Section: CTA */}
          <section>
            <p className="d-flex justify-content-center align-items-center">
            
              Rent IT Systems
            </p>
          </section>
          {/* Section: CTA */}
        </div>
        {/* Grid container */}

        {/* Copyright */}
        <div className="text-center p-3" style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
         
          <a className="text-white"> RentIt.com</a>
        </div>
        {/* Copyright */}
      </footer>
      {/* Footer */}
    </section>
  );
};

export default Footer;
