// src/components/ResetPassword.jsx
import React, { useState, useEffect } from 'react';
import { getAuth, confirmPasswordReset } from "firebase/auth";
import app from '../firebase/firebase.config';
import { useNavigate, useLocation } from 'react-router-dom';

const ResetPassword = () => {
    const auth = getAuth(app);
    const navigate = useNavigate();
    const location = useLocation();

    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');

    // Extract the oobCode (reset link code) from the URL
    const queryParams = new URLSearchParams(location.search);
    const oobCode = queryParams.get('oobCode');  // Get the oobCode from the query parameters

    useEffect(() => {
        if (!oobCode) {
            setError('Invalid or expired password reset link.');
        }
    }, [oobCode]);

    const handleResetPassword = (e) => {
        e.preventDefault();

        // Check if the passwords match
        if (newPassword !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        // Confirm password reset using Firebase
        confirmPasswordReset(auth, oobCode, newPassword)
            .then(() => {
                setMessage('Your password has been successfully reset!');
                setError('');
                setTimeout(() => navigate('/login'), 3000);  // Redirect to login page after 3 seconds
            })
            .catch((error) => {
                setError('Error resetting password: ' + error.message);
                setMessage('');
            });
    };

    return (
        <div className="h-screen w-full flex items-center justify-center">
            <div className="text-center max-w-md w-full">
                <h2 className="text-2xl mb-4 font-semibold">Reset Password</h2>

                {/* Password Reset Form */}
                <form onSubmit={handleResetPassword}>
                    <input
                        type="password"
                        placeholder="New Password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className="w-full px-4 py-2 mb-2 border rounded"
                        required
                    />
                    <input
                        type="password"
                        placeholder="Confirm New Password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="w-full px-4 py-2 mb-4 border rounded"
                        required
                    />
                    <button type="submit" className="bg-blue px-8 py-2 text-white w-full">
                        Reset Password
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

export default ResetPassword;
