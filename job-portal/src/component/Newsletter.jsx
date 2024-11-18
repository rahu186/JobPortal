import React, { useState } from 'react';
import { FaEnvelopeOpenText, FaRocket } from "react-icons/fa6";
import { db } from '../firebase/firebase.config'; // Import Firebase config
import { doc, setDoc } from 'firebase/firestore'; // Firebase Firestore functions

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  // Handle email subscription
  const handleSubscribe = async (e) => {
    e.preventDefault();

    // Email validation
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!email) {
      setError("Please enter an email.");
      return;
    } else if (!emailRegex.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    setLoading(true);
    setError(''); // Clear any previous errors

    try {
      // Create a reference to the Firestore document using the email as the document ID
      const emailRef = doc(db, "subscribers", email); // 'subscribers' is the collection name, and email is the document ID

      // Set the document with the email as a field
      await setDoc(emailRef, { email });

      setSuccess("You have successfully subscribed!");
      setEmail(''); // Clear the input field after successful submission
    } catch (error) {
      setError("Failed to subscribe. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {/* 1st part - Subscribe to Job Alerts */}
      <div>
        <h3 className="text-lg font-bold mb-2 flex items-center gap-2">
          <FaEnvelopeOpenText />
          Email me for Jobs
        </h3>
        <p className="text-primary/75 text-base mb-4">
          Stay updated with the latest job postings. Subscribe to get notified via email.
        </p>
        <div className="w-full space-y-4">
          <input
            type="email"
            name="email"
            id="email"
            placeholder="name@gmail.com"
            className="w-full block py-2 pl-3 border focus:outline-none"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          
          <input
            type="submit"
            value={loading ? "Subscribing..." : "Subscribe"}
            className="w-full block py-2 pl-3 border focus:outline-none bg-blue rounded-sm text-white cursor-pointer font-semibold"
            onClick={handleSubscribe}
            disabled={loading}
          />
        </div>

        {/* Error and Success Messages */}
        {error && <p className="text-red-500 mt-2">{error}</p>}
        {success && <p className="text-green-500 mt-2">{success}</p>}
      </div>

      {/* 2nd part - Upload Resume */}
      <div className="mt-20">
        <h3 className="text-lg font-bold mb-2 flex items-center gap-2">
          <FaRocket />
          Get noticed faster
        </h3>
        <p className="text-primary/75 text-base mb-4">
          Upload your resume to boost your chances of getting hired faster.
        </p>
        <div className="w-full space-y-4">
          <input
            type="submit"
            value={"Upload Resume"}
            className="w-full block py-2 pl-3 border focus:outline-none bg-blue rounded-sm text-white cursor-pointer font-semibold"
            // You can add functionality for uploading resume here
          />
        </div>
      </div>
    </div>
  );
};

export default Newsletter;
