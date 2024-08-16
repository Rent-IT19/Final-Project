import React, { useState } from 'react';
import axios from 'axios';
import './styles/RegisterPage.css';
import HeaderBar from '../components/Header';
import { Message, useToaster } from 'rsuite';

function Register({ server }) {

    const [placement] = useState('topEnd');  // Placement doesn't need to change, so no need for useState here.
    const toaster = useToaster();

    // Function to create and push the message to the toaster
    const showMessage = (type, message) => {
        toaster.push(
            <Message showIcon type={type} closable>
                <strong>{type}!</strong> {message}
            </Message>,
            { placement, duration: 3000 }
        );
    };

    const initialFormData = {
        email: '',
        name: '',
        phone: '',
        add1: '',
        add2: '',
        state: '',
        district: '',
        pincode: '',
        password: ''
    };

    const [formData, setFormData] = useState(initialFormData);

    const [errors, setErrors] = useState({});

    const validateForm = () => {
        let formErrors = {};

        // Email validation
        if (!/\S+@\S+\.\S+/.test(formData.email)) {
            formErrors.email = "Invalid email format";
        }

        // Phone validation
        if (!/^\d{10}$/.test(formData.phone)) {
            formErrors.phone = "Phone number must be 10 digits";
        }

        // Pincode validation
        if (!/^\d{6}$/.test(formData.pincode)) {
            formErrors.pincode = "Pincode must be 6 digits";
        }

        // Name validation
        if (!/^[a-zA-Z\s]+$/.test(formData.name)) {
            formErrors.name = "Name can only contain letters and spaces";
        }

        // Address Line 1 validation
        if (formData.add1.trim() === '') {
            formErrors.add1 = "Address Line 1 is required";
        }

        // State validation
        if (!/^[a-zA-Z\s]+$/.test(formData.state)) {
            formErrors.state = "State can only contain letters and spaces";
        }

        // District validation
        if (!/^[a-zA-Z\s]+$/.test(formData.district)) {
            formErrors.district = "District can only contain letters and spaces";
        }

        // Password validation
        if (formData.password.length < 8) {
            formErrors.password = "Password must be at least 8 characters long";
        }

        // Check for special characters in the password
        if (!/[!@#$%^&*(),.?":{}|<>]/.test(formData.password)) {
            formErrors.password = "Password must contain at least one special character";
        }

        setErrors(formErrors);

        // Return true if there are no errors
        return Object.keys(formErrors).length === 0;
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateForm()) {
            try {
                await axios.post(`${server}/api/register`, formData);
                showMessage("success", "Registration successful! Kindly Login");
                setFormData(initialFormData);
                setErrors({});
            } catch (error) {
                console.error("There was an error registering!", error);
                showMessage('error', "Registration failed. Please try again.");
                setFormData(initialFormData);
                setErrors({});
            }
        } else {
            showMessage("error", "Please correct the errors in the form.");
        }
    };

    return (
        <>
            <HeaderBar />
            <div className="registration-form-container mx-auto my-5 p-4 rounded shadow" style={{ maxWidth: "1000px", backgroundColor: "#f8f9fa" }}>
                <h2 className="text-center mb-4">Registration Form</h2>
                <p className="text-center mb-4">Please note: Your email will be used as your username.</p>
                <form onSubmit={handleSubmit}>
                    <div className="form-group mb-3">
                        <label className="form-label">Email</label>
                        <input
                            type="email"
                            className="form-control"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Enter your email"
                            required
                        />
                        {errors.email && <span className="error-text text-danger">{errors.email}</span>}
                    </div>
                    <div className="form-group mb-3">
                        <label className="form-label">Name</label>
                        <input
                            type="text"
                            className="form-control"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Enter your full name"
                            required
                        />
                        {errors.name && <span className="error-text text-danger">{errors.name}</span>}
                    </div>
                    <div className="form-group mb-3">
                        <label className="form-label">Phone</label>
                        <input
                            type="text"
                            className="form-control"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder="Enter your phone number"
                            required
                        />
                        {errors.phone && <span className="error-text text-danger">{errors.phone}</span>}
                    </div>
                    <div className="form-group mb-3">
                        <label className="form-label">Address Line 1</label>
                        <input
                            type="text"
                            className="form-control"
                            name="add1"
                            value={formData.add1}
                            onChange={handleChange}
                            placeholder="Enter your address line 1"
                            required
                        />
                        {errors.add1 && <span className="error-text text-danger">{errors.add1}</span>}
                    </div>
                    <div className="form-group mb-3">
                        <label className="form-label">Address Line 2</label>
                        <input
                            type="text"
                            className="form-control"
                            name="add2"
                            value={formData.add2}
                            onChange={handleChange}
                            placeholder="Enter your address line 2"
                        />
                    </div>
                    <div className="form-group mb-3">
                        <label className="form-label">State</label>
                        <input
                            type="text"
                            className="form-control"
                            name="state"
                            value={formData.state}
                            onChange={handleChange}
                            placeholder="Enter your state"
                            required
                        />
                        {errors.state && <span className="error-text text-danger">{errors.state}</span>}
                    </div>
                    <div className="form-group mb-3">
                        <label className="form-label">District</label>
                        <input
                            type="text"
                            className="form-control"
                            name="district"
                            value={formData.district}
                            onChange={handleChange}
                            placeholder="Enter your district"
                            required
                        />
                        {errors.district && <span className="error-text text-danger">{errors.district}</span>}
                    </div>
                    <div className="form-group mb-3">
                        <label className="form-label">Pincode</label>
                        <input
                            type="text"
                            className="form-control"
                            name="pincode"
                            value={formData.pincode}
                            onChange={handleChange}
                            placeholder="Enter your pincode"
                            required
                        />
                        {errors.pincode && <span className="error-text text-danger">{errors.pincode}</span>}
                    </div>
                    <div className="form-group mb-3">
                        <label className="form-label">Password</label>
                        <input
                            type="password"
                            className="form-control"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Enter your password"
                            required
                        />
                        {errors.password && <span className="error-text text-danger">{errors.password}</span>}
                    </div>
                    <button type="submit" className="btn btn-primary w-100">Register</button>
                </form>
            </div>
        </>
    );
}

export default Register;
