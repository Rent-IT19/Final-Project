import React, { useState, useEffect } from 'react';
import { Header, Navbar } from 'rsuite';
import { NavLink, useLocation } from 'react-router-dom';
import { Sidenav, Nav } from 'rsuite';
import DashboardIcon from '@rsuite/icons/legacy/Dashboard';
import GroupIcon from '@rsuite/icons/legacy/Group';
import GearCircleIcon from '@rsuite/icons/legacy/GearCircle';
import UserIcon from '@rsuite/icons/legacy/User';
import ListIcon from '@rsuite/icons/List';
import UserChangeIcon from '@rsuite/icons/UserChange';

import './Header.css'

function HeaderBar() {
    const location = useLocation(); // Get the current location
    const [activeKey, setActiveKey] = useState(getActiveKey(location.pathname));
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    // Determine the activeKey based on the current location
    function getActiveKey(pathname) {
        switch (pathname) {
            case '/':
                return '1';
            case '/login':
                return '2';
            case '/register':
                return '3';
            case '/profile':
                return '4';
            case '/orders':
                return '5';
            case '/about':
                return '7';
            default:
                return '1';
        }
    }

    useEffect(() => {
        // Update activeKey whenever the location changes
        setActiveKey(getActiveKey(location.pathname));
    }, [location.pathname]);

    useEffect(() => {
        // Check if the user is logged in
        const user = localStorage.getItem('user');
        setIsLoggedIn(!!user);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('user');
        window.location.href = '/login';
    };

    return (
        <Header>
            <Navbar appearance="inverse">
                <Navbar.Brand>RENT IT</Navbar.Brand>
                <Nav activeKey={activeKey} onSelect={setActiveKey} pullRight>
                    <Nav.Item eventKey="1" icon={<DashboardIcon />} as={NavLink} to="/">
                        Home
                    </Nav.Item>
                    {!isLoggedIn ? (
                        <>
                            <Nav.Item eventKey="2" icon={<GroupIcon />} as={NavLink} to="/login">
                                Login
                            </Nav.Item>
                            <Nav.Item eventKey="3" icon={<GroupIcon />} as={NavLink} to="/register">
                                Register
                            </Nav.Item>
                        </>
                    ) : (
                        <>
                            <Nav.Item eventKey="4" icon={<UserIcon />} as={NavLink} to="/profile">
                                Profile
                            </Nav.Item>
                            <Nav.Item eventKey="5" icon={<ListIcon />} as={NavLink} to="/orders">
                                Orders
                            </Nav.Item>
                            <Nav.Item eventKey="6" icon={<UserChangeIcon />} onClick={handleLogout}>
                                Logout
                            </Nav.Item>
                        </>
                    )}
                    <Nav.Item eventKey="7" icon={<GroupIcon />} as={NavLink} to="/about">
                        About
                    </Nav.Item>
                </Nav>
            </Navbar>
        </Header>
    );
}

export default HeaderBar;
