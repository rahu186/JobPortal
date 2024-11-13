// src/components/ForgotPassword.jsx
import React, { useState } from 'react';
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import app from '../firebase/firebase.config';
import { useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
    const auth = getAuth(app);
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleResetPassword = (e) => {
        e.preventDefault();
        
        // Construct the continue URL (your custom reset page URL)
        const continueUrl = window.location.origin + "/reset-password";  // Adjust the URL to match your app's structure

        sendPasswordResetEmail(auth, email, {
            url: continueUrl,  // Redirect to your custom reset page after clicking the reset link
        })
            .then(() => {
                setMessage('Password reset email sent! Please check your inbox.');
                setError('');
                setEmail('');
                setTimeout(() => navigate('/login'), 5000);  // Redirect to login page after 5 seconds
            })
            .catch((error) => {
                setError('Error sending password reset email: ' + error.message);
                setMessage('');
            });
    };

    return (
        <div className="h-screen w-full flex items-center justify-center">
            <div className="text-center max-w-md w-full">
                <h2 className="text-2xl mb-4 font-semibold">Forgot Password</h2>

                {/* Password Reset Form */}
                <form onSubmit={handleResetPassword}>
                    <input
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-2 mb-2 border rounded"
                        required
                    />
                    <button type="submit" className="bg-blue px-8 py-2 text-white w-full">
                        Send Reset Link
                    </button>
                </form>

                {/* Message or Error */}
                {message && <p className="text-green-500 mt-2">{message}</p>}
                {error && <p className="text-red-500 mt-2">{error}</p>}

                {/* Link to go back to login */}
                <div className="mt-4">
                    <a href="/login" className="text-sm text-blue-500">Back to Login</a>
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;
