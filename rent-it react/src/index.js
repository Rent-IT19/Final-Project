import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Login from './pages/LoginPage';
import Register from './pages/RegisterPage';
import AdminDashboard from './admin/AdminDashboard';
import Users from './admin/Users';
import AddPeripheral from './admin/AddPeripheral';
import Home from './admin/Home';
import PeripheralList from './admin/PeripheralList';
import Products from './pages/ProductPage';
import Profile from './pages/ProfilePage';
import Orders from './pages/OdersPage';
import Requests from './admin/Requests';
import TermsAndConditions from './pages/TermsAndConditionsPage';
import PaymentGateway from './pages/PaymentGatewayPage';
import About from './pages/AboutPage';

const root = ReactDOM.createRoot(document.getElementById('root'));
const backendServer = "http://localhost:8081";
root.render(
  <BrowserRouter>
      <Routes>
        <Route path="/" element={<Products server={backendServer} />} />
        <Route path="/login" element={<Login server={backendServer} />} />
        <Route path="/register" element={<Register server={backendServer}/>} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/orders" element={<Orders server={backendServer}/>} />
        <Route path="/terms" element={<TermsAndConditions />} />
        <Route path="/payment/:requestId" element={<PaymentGateway server={backendServer}/>} />
        <Route path="/about" element={<About />} />
        <Route path="/admindashboard" element={<AdminDashboard />} />
        
        <Route path="/requests" element={<Requests server={backendServer}/>} />
        <Route path="/users" element={<Users server={backendServer}/>} />
        <Route path="/addperipheral" element={<AddPeripheral server={backendServer} />} />
        <Route path="/peripherallist" element={<PeripheralList server={backendServer} />} />
      </Routes>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
