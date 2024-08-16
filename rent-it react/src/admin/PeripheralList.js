import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from './Sidebar';

const PeripheralList = ({ server }) => {
    const [peripherals, setPeripherals] = useState([]);
    const [alertMessage, setAlertMessage] = useState('');
    const [alertType, setAlertType] = useState('');

    // Fetch peripherals from the server
    useEffect(() => {
        const fetchPeripherals = async () => {
            try {
                const response = await axios.get(`${server}/api/peripherals`);
                setPeripherals(response.data);
                setAlertMessage('Data fetched successfully');
                setAlertType('success');
            } catch (error) {
                console.error(error);
                setAlertMessage('Failed to fetch data');
                setAlertType('danger');
            }
        };

        fetchPeripherals();
    }, [server]);

    // Handle delete operation
    const handleDelete = async (id) => {
        try {
            await axios.delete(`${server}/api/peripherals/${id}`);
            setPeripherals(peripherals.filter(p => p.id !== id));
            setAlertMessage('Peripheral deleted successfully');
            setAlertType('success');
        } catch (error) {
            console.error(error);
            setAlertMessage('Failed to delete peripheral' + error);
            setAlertType('danger');
        }
    };

    const [isEditing, setIsEditing] = useState(null);
    const [editValues, setEditValues] = useState({
        quantity: '',
        type: '',
        price: '',
        description: ''
    });

    const handleEditClick = (peripheral) => {
        setIsEditing(peripheral.id);
        setEditValues({
            quantity: peripheral.quantity,
            type: peripheral.type,
            price: peripheral.price,
            description: peripheral.description
        });
    };

    const handleSaveClick = async (id) => {
        try {
            // Make sure the data is sent as form data, if required by your backend
            const response = await axios.put(`${server}/api/peripherals/${id}`, null, {
                params: {
                    quantity: editValues.quantity,
                    type: editValues.type,
                    price: editValues.price,
                    description: editValues.description
                }
            });

            // Update state
            setPeripherals(peripherals.map(p => (p.id === id ? { ...p, ...editValues } : p)));
            setIsEditing(null);
            setAlertMessage('Peripheral updated successfully');
            setAlertType('success');
        } catch (error) {
            console.error(error);
            setAlertMessage('Failed to update peripheral');
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
                        Peripheral List
                    </div>
                    <div className="card-body">
                        <table className="table table-striped">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Name</th>
                                    <th>Quantity</th>
                                    <th>Type</th>
                                    <th>Price</th>
                                    <th>Description</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {peripherals.map(peripheral => (
                                    <tr key={peripheral.id}>
                                        <td>{peripheral.id}</td>
                                        <td>{peripheral.name}</td>
                                        <td>
                                            {isEditing === peripheral.id ? (
                                                <input
                                                    type="number"
                                                    className="form-control form-control-sm"
                                                    value={editValues.quantity}
                                                    onChange={(e) => setEditValues({ ...editValues, quantity: e.target.value })}
                                                />
                                            ) : (
                                                peripheral.quantity
                                            )}
                                        </td>
                                        <td>
                                            {isEditing === peripheral.id ? (
                                                <input
                                                    type="text"
                                                    className="form-control form-control-sm"
                                                    value={editValues.type}
                                                    onChange={(e) => setEditValues({ ...editValues, type: e.target.value })}
                                                />
                                            ) : (
                                                peripheral.type
                                            )}
                                        </td>
                                        <td>
                                            {isEditing === peripheral.id ? (
                                                <input
                                                    type="number"
                                                    className="form-control form-control-sm"
                                                    value={editValues.price}
                                                    onChange={(e) => setEditValues({ ...editValues, price: e.target.value })}
                                                />
                                            ) : (
                                                peripheral.price
                                            )}
                                        </td>
                                        <td>
                                            {isEditing === peripheral.id ? (
                                                <input
                                                    type="text"
                                                    className="form-control form-control-sm"
                                                    value={editValues.description}
                                                    onChange={(e) => setEditValues({ ...editValues, description: e.target.value })}
                                                />
                                            ) : (
                                                peripheral.description
                                            )}
                                        </td>
                                        <td>
                                            {isEditing === peripheral.id ? (
                                                <button className="btn btn-primary btn-sm" onClick={() => handleSaveClick(peripheral.id)}>
                                                    Save
                                                </button>
                                            ) : (
                                                <>
                                                    <button className="btn btn-warning btn-sm" onClick={() => handleEditClick(peripheral)}>
                                                        Edit
                                                    </button>
                                                    <button className="btn btn-danger btn-sm" onClick={() => handleDelete(peripheral.id)}>
                                                        Delete
                                                    </button>
                                                </>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default PeripheralList;
