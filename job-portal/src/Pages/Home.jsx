import React, { useState, useEffect } from "react";
import { Banner } from "../component/Banner";
import Jobs from "./Jobs";
import Sidebar from "../sidebar/Sidebar";
import Newsletter from "../component/Newsletter";
import { Card } from "../component/Card";

export const Home = () => {
  const [jobs, setJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [query, setQuery] = useState(""); // For job title
  const [location, setLocation] = useState(""); // For job location
  const [selected, setSelected] = useState(""); // Selected filter value
  const [sidebarLocation, setSidebarLocation] = useState(""); // For sidebar location filter
  const [currentPage, setCurrentPage] = useState(1);
  const itemPerPage = 8;

  // Fetch jobs
  useEffect(() => {
    fetch("https://jobportal-slg2.onrender.com/all-jobs")
      .then((res) => res.json())
      .then((data) => {
        const sortedJobs = data.sort((a, b) => new Date(b.postingDate) - new Date(a.postingDate));
        setJobs(sortedJobs);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching jobs:", error);
        setIsLoading(false);
      });
  }, []);

  // Handle input change for both job title and location
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "title") {
      setQuery(value); // Update job title
    } else if (name === "location") {
      setLocation(value); // Update location
    }
    setCurrentPage(1); // Reset page to 1 when a new filter is applied
  };

   // Handle sidebar location change
   const handleSidebarLocationChange = (value) => {
    setSidebarLocation(value);
    setCurrentPage(1); // Reset page to 1 when location is updated
  };

  const applyFilters = (job) => {
    // First, check for job title match if query is not empty
    const jobTitleMatch = query ? job.jobTitle.toLowerCase().includes(query.toLowerCase()) : true;
  
    // Then, check for location match if location is not empty
    const locationMatch = location ? job.jobLocation.toLowerCase().includes(location.toLowerCase()) : true;


    // Sidebar location filter
    const sidebarLocationMatch = sidebarLocation
      ? job.jobLocation.toLowerCase().includes(sidebarLocation.toLowerCase())
      : true;
  
    // Return true if both conditions match (or if they are not set)
    return (jobTitleMatch && locationMatch && sidebarLocationMatch);
  };


  

  const filteredJobs = jobs.filter(applyFilters);

  const calculatePageRange = () => {
    const startIndex = (currentPage - 1) * itemPerPage;
    const endIndex = startIndex + itemPerPage;
    return { startIndex, endIndex };
  };

  const { startIndex, endIndex } = calculatePageRange();
  const paginatedJobs = filteredJobs.slice(startIndex, endIndex);

  const totalPages = Math.ceil(filteredJobs.length / itemPerPage);

  return (
    <div>
      <Banner query={query} location={location} handleInputChange={handleInputChange} />
      <div className="bg-[#706767] md:grid grid-cols-4 gap-8 lg:px-24 px-4 py-12">
        <div className="bg-white p-2 md:p-4 mb-4 rounded">
          <Sidebar handleChange={setSelected} />
        </div>

        <div className="col-span-2 bg-white p-4 mb-4 rounded">
          {isLoading ? (
            <p className="font-medium">Loading....</p>
          ) : paginatedJobs.length > 0 ? (
            <Jobs result={paginatedJobs.map((data, i) => <Card key={i} data={data} />)} />
          ) : (
            <p>No Data Found</p>
          )}

          {paginatedJobs.length > 0 && (
            <div className="flex justify-center mt-4 space-x-8">
              <button onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>
                Previous
              </button>
              <span>
                Page {currentPage} of {totalPages}
              </span>
              <button onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === totalPages}>
                Next
              </button>
            </div>
          )}
        </div>

        <div className="bg-white p-4 mb-4 rounded">
          <Newsletter />
        </div>
      </div>
    </div>
  );
};
