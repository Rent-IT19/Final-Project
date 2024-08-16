// TermsAndConditions.js

import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import HeaderBar from "../components/Header";

const TermsAndConditions = () => {
    return (
        <>
            <HeaderBar />
            <div className="container mt-5">
                <h1 className="text-center mb-4">Terms and Conditions</h1>

                <div className="mb-4">
                    <h3>General Conditions</h3>
                    <p>
                        By renting any product through our platform, you agree to abide by
                        these general terms and conditions. Our goal is to provide you with
                        the best rental experience, but certain rules apply to maintain the
                        integrity of the rental process. Ensure you have thoroughly read and
                        understood the terms below.
                    </p>
                </div>

                <div className="mb-4">
                    <h3>Damages</h3>
                    <p>
                        All equipment rented is your responsibility during the rental period.
                        In case of any damage to the equipment, the renter will be liable for
                        the repair or replacement costs. It's important to inspect the product
                        before usage and report any issues within 24 hours of receiving the
                        item. Failure to do so will imply acceptance of the item's condition.
                    </p>
                </div>

                <div className="mb-4">
                    <h3>Due Dates</h3>
                    <p>
                        The rental period is specified at the time of agreement. Products
                        should be returned by the specified due date. Late returns will
                        attract an additional fee based on the number of overdue days. The
                        renter is responsible for ensuring the product is returned in a timely
                        manner.
                    </p>
                </div>

                <div className="mb-4">
                    <h3>Payment Information</h3>
                    <p>
                        Payment is required upfront to confirm your rental. We accept various
                        payment methods including credit cards, debit cards, and online
                        payment platforms. In case of cancellation, the refund policy will
                        depend on the time of cancellation relative to the start of the rental
                        period. Please refer to the refund section for more details.
                    </p>
                </div>

                <div className="mb-4">
                    <h3>Acceptance of Terms</h3>
                    <p className="fw-bold text-danger">
                        By proceeding with the payment, you confirm that you have read, understood,
                        and agree to the terms and conditions stated on this page. Your payment serves
                        as your consent to all the terms outlined above.
                    </p>
                </div>
            </div>
        </>
    );
};

export default TermsAndConditions;
