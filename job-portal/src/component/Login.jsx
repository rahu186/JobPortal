import React, { useContext, useState, useEffect } from 'react';
import { getAuth, signInWithPopup, GoogleAuthProvider, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import app from '../firebase/firebase.config';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Login = () => {
    const auth = getAuth(app);
    const { setUser } = useContext(AuthContext);
    const navigate = useNavigate();
    const googleProvider = new GoogleAuthProvider();
    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    // Handle Google Login
    const handleGoogleLogin = () => {
        signInWithPopup(auth, googleProvider)
            .then((result) => {
                const user = result.user;
                setUser(user);
                navigate('/'); // Navigate to homepage or dashboard
            })
            .catch((error) => {
                setError(error.message); // Display error message if login fails
            });
    };

    // Handle Email/Password Login
    const handleEmailLogin = (e) => {
        e.preventDefault();
        signInWithEmailAndPassword(auth, email, password)
            .then((result) => {
                const user = result.user;
                setUser(user);
                navigate('/'); // Navigate to homepage or dashboard
            })
            .catch((error) => {
                setError(error.message); // Display error message if login fails
            });
    };

    // Automatically log the user in on page load
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user); // Automatically set the user in context
                navigate('/'); // Redirect to dashboard/homepage
            }
        });

        return () => unsubscribe(); // Cleanup subscription on unmount
    }, [auth, setUser, navigate]);

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
                    <Link to="/forgot-password" className="text-blue">Forgot Password?</Link>
                    <Link to="/sign-up" className="text-blue">Sign up</Link>
                </div>
            </div>
        </div>
    );
};

export default Login;
