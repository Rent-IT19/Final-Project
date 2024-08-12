import React from 'react';
import { Link } from 'react-router-dom';
import './Login.css'; // Add your custom CSS if necessary
import loginImage from './img4.jpg'; // Import your image

const Login = () => {
  return (
    <div className="centered">
      <section className="text-center text-lg-start">
        <div className="card mb-3">
          <div className="row g-0 d-flex align-items-center">
            <div className="col-lg-4 d-none d-lg-flex">
              <img
                src={loginImage} // Use the imported image
                alt="Login Visual"
                className="w-100 rounded-t-5 rounded-tr-lg-0 rounded-bl-lg-5 login-image"
              />
            </div>
            <div className="col-lg-8">
              <div className="card-body py-5 px-md-5">
                <form>
                  {/* Username input */}
                  <div data-mdb-input-init className="form-outline mb-4">
                    <input type="text" id="form2Example1" className="form-control" />
                    <label className="form-label" htmlFor="form2Example1">Username</label>
                  </div>

                  {/* Password input */}
                  <div data-mdb-input-init className="form-outline mb-4">
                    <input type="password" id="form2Example2" className="form-control" />
                    <label className="form-label" htmlFor="form2Example2">Password</label>
                  </div>

                  {/* 2 column grid layout for inline styling */}
                  <div className="row mb-4">
                    <div className="col d-flex justify-content-center">
                      {/* Checkbox */}
                      <div className="form-check">
                        <input className="form-check-input" type="checkbox" value="" id="form2Example31" />
                        <label className="form-check-label" htmlFor="form2Example31"> Remember me </label>
                      </div>
                    </div>

                    <div className="col">
                      {/* Simple link */}
                      <a href="#!">Forgot password?</a>
                    </div>
                  </div>

                  {/* Submit button */}
                  <button type="button" data-mdb-button-init data-mdb-ripple-init className="btn btn-primary btn-block mb-4">Sign in</button>
                  
                  {/* Sign up link */}
                  <div className="text-center">
                    <p>Not a member? <Link to="/registration">Register</Link></p>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Login;
