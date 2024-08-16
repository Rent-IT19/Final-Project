import React, { useState } from 'react';
import axios from 'axios';
import HeaderBar from '../components/Header';
import { Message, useToaster } from 'rsuite';

const Login = ({ server }) => {

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

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleUserLogin = async () => {
        try {
            const response = await axios.post(`${server}/api/login`, {
                email,
                password
            });

            if (response.status === 200) {
                // Assuming the response contains user data
                const user = response.data;
                localStorage.setItem('user', JSON.stringify(user));
                window.location.href = '/profile'; // Redirect to user home page
            } else {
                showMessage('error', 'Invalid email or password');
            }
        } catch (error) {
            showMessage('error', `Error during login: ${error.response?.data || error.message}`);
        }
    };

    const handleAdminLogin = () => {
        // Static credentials for admin
        const adminEmail = 'admin@gmail.com';
        const adminPassword = 'admin@123';

        if (email === adminEmail && password === adminPassword) {
            const admin = { role: 'admin', email: adminEmail };
            localStorage.setItem('user', JSON.stringify(admin));
            window.location.href = '/requests'; // Redirect to admin dashboard
        } else {
            showMessage('error', 'Invalid admin credentials');
        }
    };

    return (
        <>
            <HeaderBar />

            <div className="container mt-5">
                <div className="row justify-content-center">
                    <div className="col-md-6 col-lg-4">
                        <div className="card shadow-sm border-0 rounded">
                            <div className="card-body p-4">
                                <h2 className="text-center mb-4">Login</h2>
                                <form>
                                    <div className="form-floating mb-3">
                                        <input
                                            type="email"
                                            className="form-control"
                                            id="floatingEmail"
                                            placeholder="Enter your email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            required
                                        />
                                        <label htmlFor="floatingEmail">Email Address</label>
                                    </div>
                                    <div className="form-floating mb-4">
                                        <input
                                            type="password"
                                            className="form-control"
                                            id="floatingPassword"
                                            placeholder="Enter your password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            required
                                        />
                                        <label htmlFor="floatingPassword">Password</label>
                                    </div>
                                    <div className="d-grid">
                                        <button
                                            type="button"
                                            className="btn btn-primary btn-lg"
                                            onClick={handleUserLogin}
                                        >
                                            Login as User
                                        </button>
                                        <button
                                            type="button"
                                            className="btn btn-outline-secondary btn-lg mt-3"
                                            onClick={handleAdminLogin}
                                        >
                                            Login as Admin
                                        </button>
                                    </div>
                                    <div className="d-grid">
                                        <a href='#'><i>Forgot password?</i></a>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Login;
