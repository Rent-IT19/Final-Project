import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';

import { Table } from 'rsuite';
import 'rsuite/dist/rsuite.min.css';

const { Column, HeaderCell, Cell } = Table;

const Home = ({ server }) => {

    const [alertMessage, setAlertMessage] = useState('');
    const [alertType, setAlertType] = useState('');

    useEffect(() => {
        fetch(`http://localhost:8080/api/users`)
            .then(data => {
                setAlertMessage('Connected to the Database successfully');
                setAlertType('success');
            })
            .catch(error => {
                console.error(error);
                setAlertMessage('Failed to connect to the PostgreSQL database');
                setAlertType('danger');
            });
    }, []);

    const [customers, setCustomers] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:8080/api/users`)
            .then(response => response.json())
            .then(data => {
                setCustomers(data);
            })
            .catch(error => {
                console.error('Error fetching customers:', error);
            });
    }, []);

    return (
        <div className="d-flex" data-bs-spy="scroll">
            <Sidebar />
            <div className="container mt-5">

                {alertMessage && (
                    <div className={`alert alert-${alertType}`} role="alert">
                        {alertMessage}
                    </div>
                )}

                <div className="card">
                    <div className="card-header">
                        Admin Dashboard
                    </div>
                    <div className="card-body">
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
