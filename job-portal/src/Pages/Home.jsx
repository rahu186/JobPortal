import React, { useEffect, useState } from "react";
import { Banner } from "../component/Banner";
import { Card } from "../component/Card";
import Jobs from "./Jobs";
import Sidebar from "../sidebar/Sidebar";
import Newsletter from "../component/Newsletter";

export const Home = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemPerPage = 8;

  useEffect(() => {
    fetch("https://jobportal-slg2.onrender.com/all-jobs")
      .then((res) => res.json())
      .then((data) => {
        // Sort jobs by postingDate in descending order (newest first)
        const sortedJobs = data.sort(
          (a, b) => new Date(b.postingDate) - new Date(a.postingDate)
        );
        setJobs(sortedJobs);
        setIsLoading(false);
      });
  }, []);

  const [query, setQuery] = useState("");
  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };

  const filteredItems = jobs.filter(
    (job) => job.jobTitle.toLowerCase().indexOf(query.toLowerCase()) !== -1
  );

  //-----------------Radio based filtering-----------------------------
  const handleChange = (event) => {
    setSelectedCategory(event.target.value);
    setCurrentPage(1); // Reset to initial page
  };

  //-----------------Click based filtering-----------------------------
  const handleClick = (event) => {
    setSelectedCategory(event.target.value);
    setCurrentPage(1); // Reset to initial page
  };

  //calculate the index range
  const calculatePageRange = () => {
    const startIndex = (currentPage - 1) * itemPerPage;
    const endIndex = startIndex + itemPerPage;
    return { startIndex, endIndex };
  };

  //function for the next page
  const nextPage = () => {
    if (currentPage < Math.ceil(filteredItems.length / itemPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  //function for the previous page
  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  //main functions
  const filterData = (jobs, selected, query) => {
    let filteredJobs = jobs;
    if (query) {
      filteredJobs = filteredItems;
    }
    
    if (selected) {
      filteredJobs = filteredJobs.filter((job) => {
        const { jobLocation, maxPrice, salaryType, employmentType, postingDate, experienceLevel } = job;
        const selectedValue = parseInt(selected);
        return (
          jobLocation.toLowerCase() === selected.toLowerCase() ||
          parseInt(maxPrice) <= selectedValue ||
          salaryType.toLowerCase() === selected.toLowerCase() ||
          experienceLevel.toLowerCase() === selected.toLowerCase() ||
          employmentType.toLowerCase() === selected.toLowerCase()
        );
      });
    }

    //slice the data based on current Page
    const { startIndex, endIndex } = calculatePageRange();
    filteredJobs = filteredJobs.slice(startIndex, endIndex);
    return filteredJobs.map((data, i) => <Card key={i} data={data} />);
  };

  const result = filterData(jobs, selectedCategory, query);

  return (
    <div>
      <Banner query={query} handleInputChange={handleInputChange} />

      {/*main content*/}
      <div className="bg-[#706767] md:grid grid-cols-4 gap-8 lg:px-24 px-4 py-12">
        {/*left side */}
        <div className="bg-white p-2 md:p-4 mb-4 rounded">
          <Sidebar handleChange={handleChange} handleClick={handleClick} />
        </div>

        {/*center job part side */}
        <div className="col-span-2 bg-white p-4 rounded">
          {isLoading ? (
            <p className="font-medium">Loading....</p>
          ) : result.length > 0 ? (
            <Jobs result={result} />
          ) : (
            <>
              <h3 className="text-lg font-bold mb-2">{result.length} Jobs</h3>
              <p>No Data Found</p>
            </>
          )}

          {/*pagination here */}
          {result.length > 0 ? (
            <div className="flex justify-center mt-4 space-x-8">
              <button onClick={prevPage} disabled={currentPage === 1}>
                Previous
              </button>
              <span>
                Page {currentPage} of {Math.ceil(filteredItems.length / itemPerPage)}
              </span>
              <button
                onClick={nextPage}
                disabled={currentPage === Math.ceil(filteredItems.length / itemPerPage)}
                className="hover:underline"
              >
                Next
              </button>
            </div>
          ) : (
            ""
          )}
        </div>

        {/*right side */}
        <div className="bg-white p-4 rounded"><Newsletter/></div>
      </div>
    </div>
  );
};
