import React from "react";
import { Link } from "react-router-dom";
import { FiCalendar, FiClock, FiDollarSign, FiMapPin } from "react-icons/fi";

export const Card = ({ data }) => {
  const {
    _id,
    companyName,
    jobTitle,
    companyLogo,
    minPrice,
    maxPrice,
    salaryType,
    jobLocation,
    employmentType,
    postingDate,
    description,
  } = data;

  // Function to truncate the description
  const truncateDescription = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.slice(0, maxLength) + "...";
    }
    return text;
  };

  return (
    <div>
      <section className="card bg-white shadow rounded p-4">
        <Link to={`/job/${_id}`} className="flex gap-4 flex-col sm:flex-row items-start">
          <img 
            src={companyLogo} 
            alt={`${companyName} Logo`} 
            onError={(e) => { e.target.onerror = null; e.target.src = "/images/alternate.jpg"; }} 
            className="w-10 h-10 rounded-lg object-cover" // Changed to square with rounded corners
          />
          <div>
            <h4 className="text-primary mb-1 text-base sm:text-lg font-semibold">{companyName}</h4>
            <h3 className="text-lg sm:text-xl font-semibold mb-2">{jobTitle}</h3>

            <div className="text-primary/70 text-sm sm:text-base flex flex-wrap gap-2 mb-2">
              <span className="flex items-center gap-2"><FiMapPin />{jobLocation}</span>
              <span className="flex items-center gap-2"><FiClock/>{employmentType}</span>
              <span className="flex items-center gap-2"><FiDollarSign />{minPrice}-{maxPrice}</span>
              <span className="flex items-center gap-2"><FiCalendar />{postingDate}</span>
            </div>
            <p className="text-sm sm:text-base text-primary/70">
              {truncateDescription(description, 100)}
            </p>
          </div>
        </Link>
      </section>
    </div>
  );
};
