
import React from 'react';
import { Link } from 'react-router-dom';
import reg from "../../assets/images/reg.jpg";
import { FaCheckCircle } from 'react-icons/fa';
const CheckoutSuccessPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-100 to-blue-300">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center max-w-lg">
        <div className="flex flex-col items-center">
          <FaCheckCircle className="text-green-500 text-6xl mb-4 animate-pulse" />
          <h2 className="text-4xl font-bold text-gray-800 mb-2">Payment Successful!</h2>
          <p className="text-gray-600 mb-6">Thank you for booking an appointment with us. Your payment has been processed successfully.</p>
          <img
            src={reg}
            alt="Success"
            className="mx-auto mb-6 w-48 h-48 rounded-full shadow-md"
          />
          <Link to="/" className="inline-block px-8 py-3 bg-blue-600 text-white font-semibold rounded-full shadow-md hover:bg-blue-700 transition duration-300">
            Go to Home
          </Link>
        </div>
      </div>
    </div>
  );
}

export default CheckoutSuccessPage;