import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaGithub, FaYoutube} from 'react-icons/fa';


const JobDetails = () => {
  const { id } = useParams(); // Get job ID from URL parameters
  const [job, setJob] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch job details from the API
    fetch(`http://localhost:5000/all-jobs/${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch job details');
        }
        return response.json();
      })
      .then((data) => {
        setJob(data);
        setIsLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setIsLoading(false);
      });
  }, [id]);

  // Function to handle the "Apply Now" button click
  const handleApply = () => {
    if (job && job.applyLink) {
      window.open(job.applyLink, '_blank'); // Open the application link in a new tab
    } else {
      alert('Application link is not available');
    }
  };

  if (isLoading) {
    return <p className="text-center py-8">Loading...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500 py-8">Error: {error}</p>;
  }

  if (!job) {
    return <p className="text-center py-8">No job details found.</p>;
  }

  return (
    <div className="max-w-screen-2xl container mx-auto xl:px-24 px-4 py-8 bg-black grid grid-cols-1 lg:grid-cols-4 gap-6">
      {/* Left Column: Job Details */}
      <div className="col-span-3 bg-white">
        {/* Header Section */}
        <div className="bg-blue text-white p-4  mb-6">
          <h3 className="text-xl sm:text-2xl font-bold">{job.jobTitle}</h3>
          <p className="text-lg sm:text-xl mt-2">{job.company}</p>
        </div>

        {/* Company Logo Section */}
        <div className="flex justify-center mb-6 p-4">
          {job.companyLogo ? (
            <img
              src={job.companyLogo}
              alt={job.company}
              className="h-50 w-50 object-cover"
            />
          ) : (
            <div className="w-full h-40 bg-gray flex items-center justify-center">
              <span>No Logo Available</span>
            </div>
          )}
        </div>

        {/* Job Description Section */}
<div id="job-description" className="bg-white p-6 rounded shadow-md mb-6">
  <h2 className="text-lg sm:text-xl font-semibold mb-4">Job Description</h2>
  <div className="mb-6">
    {job.description && job.description.split('\n').map((paragraph, index) => {
      // Check for a colon in the paragraph
      const colonIndex = paragraph.indexOf(':');
      
      // If there's a colon, we separate the heading and the rest of the text
      if (colonIndex !== -1) {
        const heading = paragraph.slice(0, colonIndex + 1); // Include colon in heading
        const content = paragraph.slice(colonIndex + 1).trim(); // Get the content after the colon

        return (
          <div key={index} className="mb-4">
            <h3 className="text-xl font-bold mb-1">{heading}</h3>
            <p className="text-base sm:text-lg">{content}</p>
          </div>
        );
      }

      // If no colon is found, render it as a normal paragraph
      return (
        <p 
          key={index} 
          className={`mb-4 ${index % 4 === 3 ? 'mt-4' : ''} text-base sm:text-lg`}
        >
          {paragraph}
        </p>
      );
    })}
  </div>
</div>


        {/* Right Column: Table of Contents (Conditionally Rendered) */}
        <div className="block lg:hidden bg-white p-4 rounded shadow-md mb-6">
          <h2 className="text-lg sm:text-xl font-semibold mb-4">Table of Contents</h2>
          <table className="min-w-full border-collapse border border-gray-300">
            <thead>
              <tr>
                <th className="border border-gray-300 px-4 py-2 bg-gray-200">Section</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-300 px-4 py-2">
                  <a href="#job-description" className="text-blue-500 hover:underline">Job Description</a>
                </td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2">
                  <a href="#job-details" className="text-blue-500 hover:underline">Job Details</a>
                </td>
              </tr>
            </tbody>
          </table>

          

        </div>

        {/* Job Details Section */}
        <div id="job-details" className="bg-white p-6 rounded shadow-md">
          <h3 className="text-lg sm:text-xl font-semibold">{job.companyName} Hiring {job.batch} Detailed Information:</h3>
          <table className="min-w-full mt-4 border-collapse border border-gray-300">
            <thead>
              <tr>
                <th className="border border-gray-300 px-4 py-2 bg-gray-200 text-sm sm:text-base">Parameter</th>
                <th className="border border-gray-300 px-4 py-2 bg-gray-200 text-sm sm:text-base">Details</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-300 px-4 py-2 text-sm sm:text-base">Location</td>
                <td className="border border-gray-300 px-4 py-2 text-sm sm:text-base">{job.jobLocation}</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2 text-sm sm:text-base">Qualification</td>
                <td className="border border-gray-300 px-4 py-2 text-sm sm:text-base">{job.qualification}</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2 text-sm sm:text-base">Batch</td>
                <td className="border border-gray-300 px-4 py-2 text-sm sm:text-base">{job.batch}</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2 text-sm sm:text-base">Experience Level</td>
                <td className="border border-gray-300 px-4 py-2 text-sm sm:text-base">{job.experienceLevel}</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2 text-sm sm:text-base">Skills Required</td>
                <td className="border border-gray-300 px-4 py-2 text-sm sm:text-base">
                  {job.skills && job.skills.length > 0
                    ? job.skills.map(skill => skill.value).join(', ')
                    : 'Not mentioned'}
                </td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2 text-sm sm:text-base">Salary</td>
                <td className="border border-gray-300 px-4 py-2 text-sm sm:text-base">{job.salary ? `${job.salary}` : 'Not specified'}</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2 text-sm sm:text-base">Posted On</td>
                <td className="border border-gray-300 px-4 py-2 text-sm sm:text-base">{new Date(job.postingDate).toLocaleDateString()}</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2 text-sm sm:text-base">End Date</td>
                <td className="border border-gray-300 px-4 py-2 text-sm sm:text-base">{job.lastDate ? `${job.lastDate}` : 'ASAP'}</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Apply Button */}
        <div className="text-center mt-3">
          <button
            className="bg-blue text-white py-2 px-4 lg:px-6 rounded hover:bg-blue transition w-full sm:w-auto"
            onClick={handleApply}
          >
            Apply Now
          </button>
        </div>
      </div>

      {/* Right Column: Table of Contents for larger screens */}
      <div className="hidden lg:block bg-white p-4 rounded shadow-md col-span-1">
        <h2 className="text-lg sm:text-xl font-semibold mb-4">Table of Contents</h2>
        <table className="min-w-full border-collapse border border-gray-300">
          <thead>
            <tr>
              <th className="border border-gray-300 px-4 py-2 bg-gray-200">Section</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-gray-300 px-4 py-2">
                <a href="#job-description" className="text-blue-500 hover:underline">Job Description</a>
              </td>
            </tr>
            <tr>
              <td className="border border-gray-300 px-4 py-2">
                <a href="#job-details" className="text-blue-500 hover:underline">Job Details</a>
              </td>
            </tr>
          </tbody>
        </table>

           {/* Social Media Links Section */}
        <div className="social-media-links mt-6">
          <h2 className="text-lg sm:text-xl font-semibold mb-4">Follow Us</h2>
          <div className="flex space-x-4">
            <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
              <FaFacebook size={24} color="#4267B2" />
            </a>
            <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
              <FaTwitter size={24} color="#1DA1F2" />
            </a>
            <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
              <FaInstagram size={24} color="#C13584" />
            </a>
            <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">
              <FaLinkedin size={24} color="#0077B5" />
            </a>
            <a href="https://www.github.com" target="_blank" rel="noopener noreferrer">
              <FaGithub size={24} color="#333" />
            </a>
            <a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer">
              <FaYoutube size={24} color="#FF0000" />
            </a>
          </div>
        </div>

      </div>
    </div>
  );
};

export default JobDetails;
