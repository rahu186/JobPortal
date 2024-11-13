import React, { useContext, useState } from 'react';
import { getAuth, signInWithPopup, GoogleAuthProvider, signInWithEmailAndPassword } from "firebase/auth";
import app from '../firebase/firebase.config';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Login = () => {
    const auth = getAuth(app);
    const { setUser } = useContext(AuthContext);
    const navigate = useNavigate();
    const googleProvider = new GoogleAuthProvider();
    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleGoogleLogin = () => {
        signInWithPopup(auth, googleProvider)
            .then((result) => {
                const user = result.user;
                setUser(user);
                navigate('/');  // Navigate to homepage or dashboard after successful login
            })
            .catch((error) => {
                setError(error.message);  // Display error message if login fails
            });
    };

    const handleEmailLogin = (e) => {
        e.preventDefault();
        signInWithEmailAndPassword(auth, email, password)
            .then((result) => {
                const user = result.user;
                setUser(user);
                navigate('/');  // Navigate to homepage or dashboard after successful login
            })
            .catch((error) => {
                setError(error.message);  // Display error message if login fails
            });
    };

    return (
        <div className='h-screen w-full flex items-center justify-center bg-gray-100'>
            <div className='text-center w-full max-w-md p-6 bg-white shadow-md rounded-lg'>
                <h2 className="text-2xl mb-4 font-semibold">Login</h2>
                
                {/* Email/Password Login Form */}
                <form onSubmit={handleEmailLogin} className="space-y-4">
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-2 mb-2 border rounded-md"
                        required
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-4 py-2 mb-4 border rounded-md"
                        required
                    />
                    <button type="submit" className='w-full bg-blue text-white px-4 py-2 rounded-md'>
                        Login
                    </button>
                </form>

                {/* OR Divider */}
                <div className="my-2 text-gray-500">or</div>

                {/* Google Login Button */}
                <div className="mt-4">
                    <button className='w-full bg-blue text-white px-4 py-2 rounded-md' onClick={handleGoogleLogin}>
                        Login with Google
                    </button>
                </div>

                {/* Error Message */}
                {error && <p className="bg-blue mt-2">{error}</p>}

                {/* Links to Sign Up or Forgot Password */}
                <div className="flex justify-between mt-4 text-sm">
                    <a href="/forgot-password" className="text-blue">Forgot Password?</a>
                    <a href="/sign-up" className="text-blue-500">Sign up</a>
                </div>
            </div>
        </div>
    );
};

export default Login;
