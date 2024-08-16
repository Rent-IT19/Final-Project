import React, { useEffect, useState } from 'react';
import axios from 'axios';
import HeaderBar from '../components/Header';
import { useNavigate } from 'react-router-dom';

const Orders = ({ server }) => {

    const [user2, setUser] = useState(null);
    const [rentalRequests, setRentalRequests] = useState([]);
    const [alertMessage, setAlertMessage] = useState('');
    const [alertType, setAlertType] = useState('success');
    const navigate = useNavigate();

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        } else {
            window.location.href = '/login';
        }
    }, []);

    const user = JSON.parse(localStorage.getItem('user'));
    const userEmail = user ? user.email : '';

    useEffect(() => {
        const fetchRentalRequests = async () => {
            try {
                const response = await axios.get(`${server}/api/rental-requests/${userEmail}`);
                setRentalRequests(response.data);
            } catch (error) {
                console.error(`Error fetching rental requests: ${error.response?.data || error.message}`);
                setAlertMessage(`Error fetching rental requests: ${error.response?.data || error.message}`);
                setAlertType('danger');
            }
        };

        fetchRentalRequests();
    }, [userEmail]);

    const handlePayment = (requestId) => {
        navigate(`/payment/${requestId}`);
    };

    return (
        <>
            <HeaderBar />
            <div className="container mt-5">
                {alertMessage && (
                    <div className={`alert alert-${alertType} text-center`} role="alert">
                        {alertMessage}
                    </div>
                )}
                <div className="card shadow-sm border-0">
                    <div className="card-header bg-primary text-white text-center">
                        <h4 className="mb-0">My Rental Requests</h4>
                    </div>
                    <div className="card-body p-4">
                        <div className="table-responsive">
                            <table className="table table-hover">
                                <thead className="table-light">
                                    <tr>
                                        <th>PC Model</th>
                                        <th>Quantity</th>
                                        <th>Total Price</th>
                                        <th>Request Date</th>
                                        <th>From Date</th>
                                        <th>To Date</th>
                                        <th>Status</th>
                                        <th>Payment Status</th>
                                        <th>Terms & Conditions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {rentalRequests.length > 0 ? (
                                        rentalRequests.map((request) => (
                                            <tr key={request.id}>
                                                <td>{request.pcModel}</td>
                                                <td>{request.quantity}</td>
                                                <td>${request.totalPrice.toFixed(2)}</td>
                                                <td>{new Date(request.requestDate).toLocaleDateString()}</td>
                                                <td>{new Date(request.fromDate).toLocaleDateString()}</td>
                                                <td>{new Date(request.toDate).toLocaleDateString()}</td>
                                                <td>
                                                    <span
                                                        className={`badge bg-${request.status === 'Approved' ? 'success' : request.status === 'Pending' ? 'warning' : 'secondary'}`}
                                                    >
                                                        {request.status}
                                                    </span>
                                                </td>
                                                <td>
                                                    <span
                                                        className={`badge bg-${request.paymentStatus === 'Paid' ? 'success' : 'danger'}`}
                                                    >
                                                        {request.paymentStatus}
                                                    </span>
                                                </td>
                                                <td>
                                                    <a href='/terms' className="btn btn-link">View</a>
                                                </td>
                                                <td>
                                                    {request.status === 'Approved' && request.paymentStatus !== 'Paid' && (
                                                        <button
                                                            className="btn btn-primary btn-sm"
                                                            onClick={() => handlePayment(request.requestId)}
                                                        >
                                                            Pay Now
                                                        </button>
                                                    )}
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="10" className="text-center">No rental requests found.</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Orders;
