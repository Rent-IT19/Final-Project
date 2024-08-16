import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';

import { Table } from 'rsuite';
import 'rsuite/dist/rsuite.min.css';

const { Column, HeaderCell, Cell } = Table;

const Users = ({ server }) => {

    const [alertMessage, setAlertMessage] = useState('');
    const [alertType, setAlertType] = useState('');

    useEffect(() => {
        fetch(`${ server }/api/users`)
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
        fetch(`${ server }/api/users`)
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
                    <div className={`alert alert-${alertType}`} role="alert"  data-aos="fade-up" data-delay="600">
                        {alertMessage}
                    </div>
                )}

                <div className="card">
                    <div className="card-header">
                        Customer List
                    </div>
                    <div className="card-body">
                        <Table virtualized height={500} data={customers}>
                            <Column>
                                <HeaderCell>Name</HeaderCell>
                                <Cell dataKey="name" />
                            </Column>

                            <Column width={300}>
                                <HeaderCell>Email</HeaderCell>
                                <Cell dataKey="email" />
                            </Column>

                            <Column width={300}>
                                <HeaderCell>Phone</HeaderCell>
                                <Cell dataKey="phone" />
                            </Column>

                            <Column>
                                <HeaderCell>Address</HeaderCell>
                                <Cell dataKey="password" />
                            </Column>

                            <Column>
                                <HeaderCell>Pincode</HeaderCell>
                                <Cell dataKey="pincode" />
                            </Column>
                        </Table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Users;
