import React, { useState, useEffect } from 'react';
import axios from 'axios';
import HeaderBar from '../components/Header';
import Sidebar from './Sidebar';

const Requests = ({ server }) => {
    const [requests, setRequests] = useState([]);
    const [alertMessage, setAlertMessage] = useState('');
    const [alertType, setAlertType] = useState('');

    useEffect(() => {
        // Fetch rental requests from the server
        const fetchRequests = async () => {
            try {
                const response = await axios.get(`${server}/api/rentalRequests`);
                const sortedRequests = response.data.sort((a, b) => new Date(b.requestDate) - new Date(a.requestDate));
                setRequests(sortedRequests);
            } catch (error) {
                console.error(error);
                setAlertMessage('Failed to fetch rental requests');
                setAlertType('danger');
            }
        };

        fetchRequests();
    }, [server]);

    // Function to update request status
    const updateStatus = (requestId, newStatus) => {
        axios.put(`${server}/api/rentalRequests/${requestId}`, { status: newStatus })
            .then(() => {
                setRequests(requests.map(request =>
                    request.requestId === requestId ? { ...request, status: newStatus } : request
                ));
                setAlertMessage(`Request ${newStatus}`);
                setAlertType('success');
            })
            .catch(error => {
                console.error(error);
                setAlertMessage('Failed to update status');
                setAlertType('danger');
            });
    };

    // Group requests by status
    const groupedRequests = requests.reduce((acc, request) => {
        if (!acc[request.status]) {
            acc[request.status] = [];
        }
        acc[request.status].push(request);
        return acc;
    }, {});

    return (
        <div className="d-flex">
            <Sidebar />
            <div className="container mt-5">
                {alertMessage && (
                    <div className={`alert alert-${alertType}`} role="alert">
                        {alertMessage}
                    </div>
                )}

                {Object.keys(groupedRequests).map((status) => (
                    <div key={status} className="mb-5">
                        <h3 className="text-capitalize">{status} Requests</h3>
                        <div className="row">
                            {groupedRequests[status].map(request => (
                                <div className="col-md-6 mb-4" key={request.requestId}>
                                    <div className="card shadow-sm">
                                        <div className="card-body">
                                            <h5 className="card-title">{request.pcModel}</h5>
                                            <p className="card-text">
                                                <strong>Client Email:</strong> {request.clientEmail} <br />
                                                <strong>From Date:</strong> {request.fromDate} <br />
                                                <strong>To Date:</strong> {request.toDate} <br />
                                                <strong>Quantity:</strong> {request.quantity} <br />
                                                <strong>Total Price:</strong> {request.totalPrice}/- <br />
                                                <strong>Request Date:</strong> {new Date(request.requestDate).toLocaleString()} <br />
                                                <strong>Status:</strong> <span className={`badge bg-${status === 'Approved' ? 'success' : status === 'Rejected' ? 'danger' : 'warning'}`}>{status}</span>
                                            </p>
                                            {status === 'Pending' && (
                                                <div className="d-flex justify-content-end">
                                                    <button
                                                        className="btn btn-success me-2"
                                                        onClick={() => updateStatus(request.requestId, 'Approved')}
                                                    >
                                                        Approve
                                                    </button>
                                                    <button
                                                        className="btn btn-danger"
                                                        onClick={() => updateStatus(request.requestId, 'Rejected')}
                                                    >
                                                        Reject
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Requests;
