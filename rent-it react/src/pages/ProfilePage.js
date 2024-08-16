import React, { useState, useEffect } from 'react';
import HeaderBar from '../components/Header';

const Profile = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        // Retrieve user data from local storage
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        } else {
            window.location.href = '/login'; // Redirect to login page if no user data
        }
    }, []);

    if (!user) {
        return <div>Loading...</div>; // Show loading indicator while fetching data
    }

    return (
        <>
            <HeaderBar />
            <div className="container mt-5">
                <div className="card">
                    <div className="card-header">User Profile</div>
                    <div className="card-body">
                        <h5 className="card-title">Profile Information</h5>
                        <p className="card-text"><strong>Name :</strong> {user.name}</p>
                        <p className="card-text"><strong>Email :</strong> {user.email}</p>
                        <p className="card-text"><strong>Phone :</strong> {user.phone}</p>
                        <p className="card-text"><strong>Address :</strong> {user.add1} <br /> {user.add2}</p>
                        <p className="card-text"><strong>State :</strong> {user.state}</p>
                        <p className="card-text"><strong>City :</strong> {user.district}</p>
                        <p className="card-text"><strong>Pincode :</strong> {user.pincode}</p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Profile;
