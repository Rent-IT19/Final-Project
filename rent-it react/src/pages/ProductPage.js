import React, { useState, useEffect } from 'react';
import axios from 'axios';
import HeaderBar from '../components/Header';
import { Message, useToaster } from 'rsuite';

import banner from './images/banner.png';
import banner2 from './images/banner2.webp';
import back from './images/back.jpg';

const Products = ({ server }) => {
    const [peripherals, setPeripherals] = useState([]);
    const [placement] = useState('topEnd');  // Placement doesn't need to change, so no need for useState here.
    const toaster = useToaster();

    // Function to create and push the message to the toaster
    const showMessage = (type, message) => {
        toaster.push(
            <Message showIcon type={type} closable>
                <strong>{type}!</strong> {message}
            </Message>,
            { placement, duration: 3000}
        );
    };

    // Function to shuffle an array
    const shuffleArray = (array) => array.sort(() => Math.random() - 0.5);

    // Fetch peripherals from the server
    useEffect(() => {
        const fetchPeripherals = async () => {
            try {
                const response = await axios.get(`${server}/api/peripherals`);
                if (Array.isArray(response.data)) {
                    const shuffledData = shuffleArray(response.data); // Shuffle the data
                    setPeripherals(shuffledData);
                } else {
                    showMessage('error', 'Unexpected data format');
                }
            } catch (error) {
                console.error(error);
                showMessage('error', 'Failed to fetch data');
            }
        };

        fetchPeripherals();
    }, [server]);

    const handlePurchase = async (id, quantity, fromDate, toDate) => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (!user) {
            showMessage('error', 'Please login first');
            return;
        }

        const peripheral = peripherals.find(p => p.id === id);
        if (!peripheral) {
            showMessage('error', 'Product not found');
            return;
        }

        if (quantity > peripheral.quantity) {
            showMessage('error', 'Requested quantity exceeds available stock');
            return;
        }

        if (!fromDate || !toDate) {
            showMessage('error', 'Please select both From Date and To Date');
            return;
        }

        if (new Date(fromDate) > new Date(toDate)) {
            showMessage('error', 'From Date cannot be later than To Date');
            return;
        }

        if (window.confirm('Do you really want to rent this item?')) {
            try {
                await axios.post(`${server}/api/rental-requests`, {
                    clientName: user.name,
                    clientEmail: user.email,
                    clientPhone: user.phone,
                    pcModel: peripheral.name,
                    quantity: quantity,
                    totalPrice: peripheral.price * quantity,
                    fromDate: fromDate,
                    toDate: toDate,
                    status: 'Pending',
                    paymentStatus: 'Not Paid',
                    requestDate: new Date().toISOString()
                });
                showMessage('success', 'Rental request submitted successfully!');
            } catch (error) {
                console.error(error);
                showMessage('error', 'Failed to submit rental request');
            }
        }
    };

    return (
        <>
            <HeaderBar /> {/* Assuming HeaderBar is a separate component */}

            <div className="container mt-4">
                <marquee>
                <img src={banner} style={{width: "auto", height: "300px"}} />
                <img src={banner2} style={{width: "auto", height: "300px"}} />
                </marquee>


                <div style={{background:'#f7dedc',padding:'16px',borderRadius:'20px',marginTop:'4em'}}>
                    <h1 style={{marginLeft:'38%',fontSize:'2.5rem'}}>Rent-IT services</h1>
                    <p style={{fontFamily:'cursive',fontSize:'20px'}}>Rent IT offers cost-effective and flexible rental solutions for businesses, freelancers, and individuals. We provide a wide range of computer equipment to meet your needs. Our rental plans cater to both short-term and long-term requirements, helping you save on upfront investments while enjoying hassle- free end-to-end rental services, including delivery.</p>
                </div>

                
                
                <div className="row" style={{marginTop:'12em'}}>
                    {peripherals.map((peripheral) => (
                        <div className="col-12 mb-4" key={peripheral.id}>
                            <div className="d-flex flex-row align-items-start p-3 border rounded">
                                <img
                                    src={`data:image/jpeg;base64,${peripheral.image || 'fallback-image-base64'}`}
                                    className="img"
                                    alt={peripheral.name}
                                    style={{ width: '200px', height: 'auto' }} // Adjust image size
                                />
                                <div className="ms-3 flex-grow-1">
                                    <h5 className="mb-1">{peripheral.name}</h5>
                                    <p className="mb-1">{peripheral.description}</p>
                                    <p className="mb-1">
                                        <h3>{peripheral.price}/-</h3>
                                        <strong>Type:</strong> {peripheral.type} <br />
                                        <strong>Available Stock:</strong> {peripheral.quantity} <br />
                                    </p>

                                    <div className="d-flex flex-row mb-3">
                                        <div className="me-3">
                                            <label htmlFor={`from-date-${peripheral.id}`} className="form-label mb-0">
                                                From Date
                                            </label>
                                            <input
                                                type="date"
                                                id={`from-date-${peripheral.id}`}
                                                className="form-control"
                                            />
                                        </div>

                                        <div className="me-3">
                                            <label htmlFor={`to-date-${peripheral.id}`} className="form-label mb-0">
                                                To Date
                                            </label>
                                            <input
                                                type="date"
                                                id={`to-date-${peripheral.id}`}
                                                className="form-control"
                                            />
                                        </div>

                                        <div>
                                            <label htmlFor={`quantity-${peripheral.id}`} className="form-label mb-0">
                                                Quantity
                                            </label>
                                            <input
                                                type="number"
                                                id={`quantity-${peripheral.id}`}
                                                className="form-control"
                                                min="1"
                                                max={peripheral.quantity}
                                                defaultValue="1"
                                            />
                                        </div>
                                    </div>

                                    <button
                                        className="btn btn-primary"
                                        onClick={() => {
                                            const quantity = parseInt(document.getElementById(`quantity-${peripheral.id}`).value, 10);
                                            const fromDate = document.getElementById(`from-date-${peripheral.id}`).value;
                                            const toDate = document.getElementById(`to-date-${peripheral.id}`).value;
                                            handlePurchase(peripheral.id, quantity, fromDate, toDate);
                                        }}
                                    >
                                        Purchase on Rent
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default Products;
