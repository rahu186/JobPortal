import React, { useState, useContext } from 'react';
import { getAuth, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore"; // Firestore imports
import app from '../firebase/firebase.config';
import { useNavigate,Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const SignUp = () => {
  const auth = getAuth(app);
  const db = getFirestore(app); // Firestore database reference
  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const googleProvider = new GoogleAuthProvider();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSignUp = async (e) => {
    e.preventDefault();

    // Check if the email is provided
    if (!email) {
      setError("Email is required.");
      return;
    }

    // Check if passwords match
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      const result = await createUserWithEmailAndPassword(auth, email, password);
      const user = result.user;

      // Store additional user data in Firestore
      await setDoc(doc(db, "users", user.uid), {
        name,
        email: user.email,
        uid: user.uid,
      });

      setUser(user);
      setSuccess("Account created successfully!");
      navigate('/'); // Navigate to home page
    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        setError('A user with this email already exists. Please try another email or log in.');
      } else {
        setError(error.message);
      }
    }
  };

  const handleGoogleSignUp = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      // Store Google user data in Firestore
      await setDoc(doc(db, "users", user.uid), {
        name: user.displayName,
        email: user.email,
        uid: user.uid,
      });

      setUser(user);
      navigate('/'); // Navigate to home page
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="h-screen w-full flex items-center justify-center">
      <div className="bg-white p-6 rounded-md shadow-md w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center mb-4">Sign Up</h2>
        
        <form onSubmit={handleSignUp} className="space-y-4">
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2 border rounded-md"
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border rounded-md"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border rounded-md"
            required
          />
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full px-4 py-2 border rounded-md"
            required
          />
          <button type="submit" className="w-full bg-blue text-white py-2 rounded-md font-semibold">
            Create Account
          </button>
          
        </form>

        {error && <p className="text-red-500 text-sm mt-2 text-center">{error}</p>}
        {success && <p className="text-green-500 text-sm mt-2 text-center">{success}</p>}
         {/* OR Divider */}
         <div className="my-2 text-gray-500 text-center">or</div>
        <div className="text-center mt-4">
          <button 
            onClick={handleGoogleSignUp} 
            className="w-full bg-red-500 text-white py-2 rounded-md font-semibold">
            Sign Up with Google
          </button>
        </div>

        <p className="text-center mt-4 text-sm">
          Already have an account? <Link to="/login" className="text-blue-500">Log in</Link>
        </p>
      </div>
    </div>
  );
}

export default SignUp;
