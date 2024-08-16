import React, { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';

import { Sidenav, Nav } from 'rsuite';
import DashboardIcon from '@rsuite/icons/legacy/Dashboard';
import GroupIcon from '@rsuite/icons/legacy/Group';
import GearCircleIcon from '@rsuite/icons/legacy/GearCircle';
import UserChangeIcon from '@rsuite/icons/UserChange';
import SearchIcon from '@rsuite/icons/Search';
import PageIcon from '@rsuite/icons/Page';

import 'rsuite/dist/rsuite.min.css';
import './styles/Sidebar.css'

import { useNavigate } from 'react-router-dom';

const Sidebar = () => {

    const navigate = useNavigate();

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (!user || user.role !== 'admin') {
            navigate('/login'); // Redirect to login if not an admin
        }
    }, [navigate]);

    const [currentDateTime, setCurrentDate] = useState('');
    const location = useLocation(); // Get the current location

    useEffect(() => {
        const date = new Date();
        const formattedDate = formatDate(date);
        setCurrentDate(formattedDate);
    }, []);

    const formatDate = (date) => {
        const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const dayOfWeek = daysOfWeek[date.getDay()];
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
        const year = date.getFullYear();
        return `${dayOfWeek}, ${day}/${month}/${year}`;
    };

    // Determine the activeKey based on the current location
    const getActiveKey = (pathname) => {
        switch (pathname) {
            case '/home':
                return '1';
            case '/users':
                return '2';
            case '/addperipheral':
                return '3';
            case '/peripherallist':
                return '4';
            default:
                return '1';
        }
    };

    const [activeKey, setActiveKey] = useState(getActiveKey(location.pathname));

    useEffect(() => {
        // Update activeKey whenever the location changes
        setActiveKey(getActiveKey(location.pathname));

    }, [location.pathname]);

    const handleLogout = () => {
        localStorage.removeItem('user');
        window.location.href = '/login';
    };

    return (
        <div id="Sidenav">
            <Sidenav appearance="subtle">
                <h3>Admin - Rent IT</h3>
                <Sidenav.Body>
                    <Nav activeKey={activeKey} onSelect={setActiveKey}>
                        <Nav.Item eventKey="1" icon={<DashboardIcon />} as={NavLink} to="/requests">
                            Requests
                        </Nav.Item>
                        <Nav.Item eventKey="2" icon={<GroupIcon />} as={NavLink} to="/users">
                            View Users
                        </Nav.Item>
                        <Nav.Item eventKey="3" icon={<PageIcon />} as={NavLink} to="/addperipheral">
                            Add Peripheral
                        </Nav.Item>
                        <Nav.Item eventKey="4" icon={<GearCircleIcon />} as={NavLink} to="/peripherallist">
                            Peripheral List
                        </Nav.Item>
                        <Nav.Item eventKey="6" icon={<UserChangeIcon />} onClick={handleLogout}>
                            Logout
                        </Nav.Item>
                    </Nav>
                </Sidenav.Body>
                <hr />
                <p>{currentDateTime}</p>
            </Sidenav>
        </div>
    );
};

export default Sidebar;
