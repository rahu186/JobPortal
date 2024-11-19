import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaGithub, FaYoutube } from 'react-icons/fa';

const JobDetails = () => {
  const { id } = useParams(); // Get job ID from URL parameters
  const [job, setJob] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch job details from the API
    fetch(`https://jobportal-slg2.onrender.com/all-jobs/${id}`)
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
        <div className="bg-blue text-white p-4 mb-6">
          <h3 className="text-xl sm:text-2xl font-bold">{job.jobTitle}</h3>
          <p className="text-lg sm:text-xl mt-2">{job.company}</p>
        </div>

        {/* Company Logo Section */}
        <div className="flex justify-center mb-6 p-4">       
          <img
            src={job.jobBanner || "/images/JobDetailsBanner.png"}
            alt={job.company}
            className="w-full object-cover h-45 sm:h-64 md:h-80 lg:h-90"
          />
        </div>

          {/* Job Description Section */}
<div id="job-description" className="bg-white p-6 rounded shadow-md mb-8">
  <h2 className="text-lg sm:text-xl font-semibold mb-4">Job Description</h2>
  <div className="mb-6">
    {/* Check if job description exists */}
    {job.description ? (
      // Check if the description already contains HTML tags or if it's plain text
      job.description.includes("<") ? (
        // If it's HTML, render it directly
        <div className="text-base sm:text-lg" dangerouslySetInnerHTML={{ __html: job.description }} />
      ) : (
        // If it's plain text, wrap it in paragraph tags and bold titles
        <div className="text-base sm:text-lg">
          {job.description.split("\n").map((item, index) => (
            <p key={index}>
              {/* Regex to find and bold potential titles */}
              {item.split(/(\b[A-Z][a-z]*\b)/g).map((part, idx) => (
                <span key={idx}>
                  {part.match(/\b[A-Z][a-z]*\b/) ? <strong>{part}</strong> : part}
                </span>
              ))}
            </p>
          ))}
        </div>
      )
    ) : (
      // Fallback message if description is not available
      <div className="text-base sm:text-lg">
        <p>No job description available. Please check back later.</p>
      </div>
    )}
  </div>
</div>

       {/* Table of Contents for Small Screens */}
       <div className="lg:hidden bg-gray-100 p-4 rounded shadow-md mb-8">
  <h2 className="text-lg sm:text-xl font-semibold mb-4">Table of Contents</h2>
  <table className="min-w-full border-collapse border border-gray-300 mb-4">
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

  {/* Video Section */}
  <div className="mt-6">
    <h2 className="text-lg sm:text-xl font-semibold mb-4">Related Video</h2>
    <div className="aspect-w-16 aspect-h-9">
      <iframe
        className="w-full h-full rounded border border-gray-300"
        src="https://www.youtube.com/embed/dQw4w9WgXcQ"
        title="Related Video"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>
  </div>
</div>


        {/* Job Details Section */}
        <div id="job-details" className="bg-white p-6 rounded shadow-md mb-8">
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
        <div className="text-center mt-6 mb-8">
          <button
            className="bg-blue text-white py-2 px-4 lg:px-6 rounded hover:bg-blue transition w-full sm:w-auto"
            onClick={handleApply}
          >
            Apply Now
          </button>
        </div>
      </div>

      
      {/* Right Column: Table of Contents and Video for larger screens */}
<div className="hidden lg:block bg-white p-4 rounded shadow-md col-span-1">
  <h2 className="text-lg sm:text-xl font-semibold mb-4">Table of Contents</h2>
  <table className="min-w-full border-collapse border border-gray-300 mb-4">
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

  {/* Video Section */}
  <div className="bg-gray-100 p-4 rounded shadow-md">
    <h2 className="text-lg sm:text-xl font-semibold mb-4">Related Video</h2>
    <div className="aspect-w-16 aspect-h-9 mb-4">
      <iframe
        src="https://www.youtube.com/embed/dQw4w9WgXcQ" // Replace with your video link
        title="Related Video"
        className="w-full h-full rounded"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
    <p className="text-sm text-gray-600">Watch this video to learn more about the job role and its responsibilities.</p>
  </div>
</div>

    </div>
  );
};

export default JobDetails;
