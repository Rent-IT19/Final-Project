import React from 'react';
import './Registration.css';

const Registration = () => {
  return (
    <div className="container register">
      <div className="register-heading">
        <h3>Registration</h3>
      </div>
      <div className="register-form">
        <div className="form-group">
          <div className="placeholder-with-color">
            <input type="text" className="form-control" placeholder="First Name" />
            <span className="red-asterisk">*</span>
          </div>
        </div>
        <div className="form-group">
          <div className="placeholder-with-color">
            <input type="text" className="form-control" placeholder="Last Name" />
            <span className="red-asterisk">*</span>
          </div>
        </div>
        <div className="form-group">
          <div className="placeholder-with-color">
            <input type="password" className="form-control" placeholder="Password" />
            <span className="red-asterisk">*</span>
          </div>
        </div>
        <div className="form-group">
          <div className="placeholder-with-color">
            <input type="password" className="form-control" placeholder="Confirm Password" />
            <span className="red-asterisk">*</span>
          </div>
        </div>
        <div className="form-group">
          <div className="placeholder-with-color">
            <input type="email" className="form-control" placeholder="Your Email" />
            <span className="red-asterisk">*</span>
          </div>
        </div>
        <div className="form-group">
          <div className="placeholder-with-color">
            <input type="text" minLength="10" maxLength="10" name="txtEmpPhone" className="form-control" placeholder="Your Phone" />
            <span className="red-asterisk">*</span>
          </div>
        </div>
        <div className="form-group">
          <div className="placeholder-with-color">
            <input type="text" className="form-control" placeholder="Company Name" />
            <span className="red-asterisk">*</span>
          </div>
        </div>
        <div className="form-buttons">
          <input type="submit" className="btnRegister" value="Register" />
          <a href="/login" className="btnLogin">Login</a>
          
        </div>

      </div>
    </div>
  );
};

export default Registration;
