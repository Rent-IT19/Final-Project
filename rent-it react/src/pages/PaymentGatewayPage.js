import React, { useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const PaymentGateway = ({ server }) => {
    const { requestId } = useParams();
    const [isProcessing, setIsProcessing] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState('ccard');
    const [cardNumber, setCardNumber] = useState('');
    const [expiryDate, setExpiryDate] = useState('');
    const [cvv, setCvv] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handlePayment = async () => {
        if (paymentMethod === 'ccard') {
            // Basic validation for card details
            if (!cardNumber || !expiryDate || !cvv) {
                setError('Please fill in all card details.');
                return;
            }
        }

        setIsProcessing(true);
        setError('');

        try {
            // Update payment status to "Paid" in the backend
            await axios.put(`${server}/api/rentalRequests/pay/${requestId}`, {
                paymentStatus: 'Paid'
            });
            navigate('/orders');
        } catch (error) {
            console.error('Payment failed', error);
            setError('Payment failed. Please try again.' + error);
        } finally {
            setIsProcessing(false);
        }
    };

    const handlePaymentMethodChange = (e) => {
        setPaymentMethod(e.target.value);
    };

    return (
        <div className="container mt-4">
            <div className="card">
                <div className="card-header">
                    Payment Details
                </div>
                <div className="card-body">
                    {/* Payment Method Selection */}
                    <div className="mb-3">
                        <label htmlFor="paymentMethod">Payment Method</label>
                        <select className="form-select" id="paymentMethod" value={paymentMethod} onChange={handlePaymentMethodChange}>
                            <option value="ccard">Credit Card/Debit Card</option>
                            <option value="upi">UPI</option>
                        </select>
                    </div>

                    {/* Card Details (shown if Credit/Debit Card option is selected) */}
                    {paymentMethod === 'ccard' && (
                        <div id="cardDetails" className="mb-3">
                            <div className="mb-3">
                                <label htmlFor="cardNumber">Card Number</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="cardNumber"
                                    placeholder="XXXX XXXX XXXX XXXX"
                                    value={cardNumber}
                                    onChange={(e) => setCardNumber(e.target.value)}
                                />
                            </div>
                            <div className="row">
                                <div className="col-md-4">
                                    <label htmlFor="expiryDate">Expiry Date</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="expiryDate"
                                        placeholder="MM/YY"
                                        value={expiryDate}
                                        onChange={(e) => setExpiryDate(e.target.value)}
                                    />
                                </div>
                                <div className="col-md-4">
                                    <label htmlFor="cvv">CVV</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="cvv"
                                        placeholder="CVV"
                                        value={cvv}
                                        onChange={(e) => setCvv(e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Error Message */}
                    {error && (
                        <div className="alert alert-danger">
                            {error}
                        </div>
                    )}

                    {/* Button to trigger payment */}
                    <button
                        className="btn btn-primary mt-3"
                        onClick={handlePayment}
                        disabled={isProcessing}
                    >
                        {isProcessing ? 'Processing...' : 'Pay Now'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PaymentGateway;
