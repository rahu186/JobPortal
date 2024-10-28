// src/components/Login.jsx
import React, { useContext, useState } from 'react';
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import app from '../firebase/firebase.config';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Login = () => {
    const auth = getAuth();  
    const { setUser } = useContext(AuthContext);
    const navigate = useNavigate(); // Initialize useNavigate
    const googleProvider = new GoogleAuthProvider();
    
    const [error, setError] = useState(''); // State for error message

    const handleLogin = () => {
        signInWithPopup(auth, googleProvider).then((result) => {
            const user = result.user;
            
            // Replace this with your actual authorized email
            const authorizedEmail = "rahulyadav42j@gmail.com"; // Change this to your email

            // Check if the user's email is the authorized email
            if (user.email === authorizedEmail) {
                setUser(user); 
                navigate('/'); // Navigate to the main page
            } else {
                setUser(null); // Reset user context if not authorized
                setError("You are not authorized by the admin."); // Set error message
            }

        }).catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            // The email of the user's account used.
            const email = error.customData.email;
            // The AuthCredential type that was used.
            const credential = GoogleAuthProvider.credentialFromError(error);
            // Handle any errors related to authentication
            setError(errorMessage); // Set error message on authentication failure
        });
    }

    return (
        <div className='h-screen w-full flex items-center justify-center'>
            <div className='text-center'>
                <button className='bg-blue px-8 py-2 text-white' onClick={handleLogin}>Login with Google</button>
                {error && <p className="text-red-500 mt-2">{error}</p>} {/* Display error message */}
            </div>
        </div>
    )
}

export default Login;
