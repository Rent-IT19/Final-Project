import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user || user.role !== 'admin') {
      navigate('/login'); // Redirect to login if not an admin
    }
  }, [navigate]);

  return <div>Welcome to the Admin Dashboard</div>;
};

export default AdminDashboard;
