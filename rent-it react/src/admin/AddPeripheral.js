import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from './Sidebar';

const AddPeripheral = ({ server }) => {

    const [alertMessage, setAlertMessage] = useState('');
    const [alertType, setAlertType] = useState('');

    useEffect(() => {
        fetch(`${server}/api/users`)
            .then(response => response.json())
            .then(data => {
                setAlertMessage('Connected to the Database successfully');
                setAlertType('success');
            })
            .catch(error => {
                console.error(error);
                setAlertMessage('Failed to connect to the database');
                setAlertType('danger');
            });
    }, [server]);

    const [formData, setFormData] = useState({
        name: '',
        quantity: '',
        image: null,
        type: '',
        price: '',
        description: '',
    });

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === 'image') {
            setFormData({ ...formData, image: files[0] });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = new FormData();
        data.append('name', formData.name);
        data.append('quantity', formData.quantity);
        data.append('type', formData.type);
        data.append('price', formData.price);
        data.append('description', formData.description);
        if (formData.image) {
            data.append('image', formData.image);
        }

        try {
            const response = await axios.post(`${server}/api/peripherals`, data);
            setAlertMessage('Peripheral added successfully!');
            setAlertType('success');

            setFormData({
                name: '',
                quantity: '',
                image: null,
                type: '',
                price: '',
                description: '',
            });
        } catch (error) {
            console.log(`Error adding peripheral: ${error.response?.data || error.message}`);
            setAlertMessage(`Error adding peripheral: ${error.response?.data || error.message}`);
            setAlertType('danger');
        }
    };

    return (
        <div className="d-flex" data-bs-spy="scroll">
            <Sidebar />

            <div className="container mt-4">

                {alertMessage && (
                    <div className={`alert alert-${alertType}`} role="alert" data-aos="fade-up" data-delay="600">
                        {alertMessage}
                    </div>
                )}

                <div className="card">
                    <div className="card-header">
                        Add Peripheral
                    </div>
                    <div className="card-body">

                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label htmlFor="name" className="form-label">Name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="Enter product name"
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="quantity" className="form-label">Quantity</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    id="quantity"
                                    name="quantity"
                                    value={formData.quantity}
                                    onChange={handleChange}
                                    placeholder="Enter quantity"
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="image" className="form-label">Image</label>
                                <input
                                    type="file"
                                    className="form-control"
                                    id="image"
                                    name="image"
                                    onChange={handleChange}
                                    placeholder="Upload image"
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="type" className="form-label">Type</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="type"
                                    name="type"
                                    value={formData.type}
                                    onChange={handleChange}
                                    placeholder="Enter product type"
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="price" className="form-label">Price</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    id="price"
                                    name="price"
                                    value={formData.price}
                                    onChange={handleChange}
                                    step="0.01"
                                    placeholder="Enter price"
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="description" className="form-label">Description</label>
                                <textarea
                                    className="form-control"
                                    id="description"
                                    name="description"
                                    rows="3"
                                    value={formData.description}
                                    onChange={handleChange}
                                    placeholder="Enter product description"
                                ></textarea>
                            </div>
                            <button type="submit" className="btn btn-primary">Add Peripheral</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddPeripheral;
