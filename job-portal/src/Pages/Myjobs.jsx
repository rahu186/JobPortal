import { Link } from "react-router-dom";
import React, { useEffect, useState } from 'react';

const Myjobs = () => {
    const [jobs, setJobs] = useState([]);
    const [filteredJobs, setFilteredJobs] = useState([]);
    const [searchText, setSearchText] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [visibleJobsCount, setVisibleJobsCount] = useState(5); // Initial number of jobs to display
   


    useEffect(() => {
        setIsLoading(true);
        fetch(`https://jobportal-slg2.onrender.com/myjobs/rahulyadav42j@gmail.com`)
            .then(res => res.json())
            .then(data => {
                setJobs(data);
                setFilteredJobs(data);
                setIsLoading(false);
            })
            .catch(error => {
                console.error('Error fetching jobs:', error);
                setIsLoading(false);
            });
    }, [searchText]);

    const handleSearch = () => {
        const filtered = jobs.filter(job =>
            job.jobTitle.toLowerCase().includes(searchText.toLowerCase())
        );
        setFilteredJobs(filtered);
    };

    const handleDelete = (_id) => {
        fetch(`https://jobportal-slg2.onrender.com/job/${_id}`, {
            method: "DELETE",
        })
        .then(res => res.json()) // Corrected: Added parentheses to call res.json()
        .then(data => {
            if (data.acknowledged === true) {
                alert("Job Deleted Successfully!");
                // Update the state to remove the deleted job from the list
                setJobs(jobs.filter(job => job._id !== _id));
                setFilteredJobs(filteredJobs.filter(job => job._id !== _id));
            } else {
                alert("Failed to delete the job. Try again.");
            }
        })
        .catch(error => {
            console.error('Error deleting job:', error);
            alert("An error occurred. Please try again.");
        });
    };

    const handleShowMore = () => {
        setVisibleJobsCount(visibleJobsCount + 5); // Increase the number of visible jobs by 5
    };
    

    return (
        <div className='max-w-screen-2xl container mx-auto xl:px-24 px-4'>
            <div className='my-jobs-container'>
                <h1 className='text-center p-4'>All My Jobs</h1>
                <div className='search-box p-2 text-center mb-2'>
                    <input
                        onChange={(e) => setSearchText(e.target.value)}
                        type='text'
                        name='search'
                        id='search'
                        className='py-2 pl-3 border focus:outline-none lg:w-6/12 mb-4 w-full'
                        placeholder='Search by job title'
                    />
                    <button
                        className='bg-blue text-white font-semibold px-8 py-2 rounded-sm mb-4'
                        onClick={handleSearch}
                    >
                        Search
                    </button>
                </div>
            </div>

            {/* Posted job table */}
            <section className="py-1 bg-blueGray-50">
                <div className="w-full xl:w-8/12 mb-12 xl:mb-0 px-4 mx-auto mt-5">
                    <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded ">
                        <div className="rounded-t mb-0 px-4 py-3 border-0">
                            <div className="flex flex-wrap items-center">
                                <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                                    <h3 className="font-semibold text-base text-blueGray-700">All Jobs</h3>
                                </div>
                                <div className="relative w-full px-4 max-w-full flex-grow flex-1 text-right">
                                    <Link to="/post-job">
                                        <button className="bg-indigo-500 text-white active:bg-indigo-600 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button">
                                            Post A New Job
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        </div>

                        <div className="block w-full overflow-x-auto">
                            {isLoading ? (
                                <p className="text-center p-4">Loading...</p>
                            ) : filteredJobs.length === 0 ? (
                                <p className="text-center p-4">No jobs found.</p>
                            ) : (
                                <table className="items-center bg-transparent w-full border-collapse ">
                                    <thead>
                                        <tr>
                                            <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                                No.
                                            </th>
                                            <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                                Job Title
                                            </th>
                                            <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                                Company Name
                                            </th>
                                            <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                                Salary
                                            </th>
                                            <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                                Edit
                                            </th>
                                            <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                                Delete
                                            </th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {filteredJobs.slice(0, visibleJobsCount).map((job, index) => (
                                            <tr key={index}>
                                                <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left text-blueGray-700 ">
                                                    {index+1}
                                                </th>
                                                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">
                                                    {job.jobTitle}
                                                </td>
                                                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">
                                                    {job.companyName}
                                                </td>
                                                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">
                                                    ${job.minPrice} - ${job.maxPrice}
                                                </td>
                                                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">
                                                    <button><Link to={`/edit-job/${job._id}`}>Edit</Link></button>
                                                </td>
                                                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">
                                                <button onClick={() => handleDelete(job._id)} className="bg-red-700 py-2 px-6 text-white rounded-sm">Delete</button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                    
                                </table>
                                
                            )}

{visibleJobsCount < filteredJobs.length && (
    <div className="text-center mt-4">
        <button onClick={handleShowMore} className="bg-blue-500 text-black py-2 px-4 rounded-sm">
            Show More
        </button>
    </div>
)}
                        </div>
                    </div>
                </div>
                <footer className="relative pt-8 pb-6 mt-16">
                    <div className="container mx-auto px-4">
                        <div className="flex flex-wrap items-center md:justify-between justify-center">
                            <div className="w-full md:w-6/12 px-4 mx-auto text-center">
                                {/* <div className="text-sm text-blueGray-500 font-semibold py-1">
                                    Made with <a href="https://www.creative-tim.com/product/notus-js" className="text-blueGray-500 hover:text-gray-800" target="_blank" rel="noopener noreferrer">Notus JS</a> by <a href="https://www.creative-tim.com" className="text-blueGray-500 hover:text-blueGray-800" target="_blank" rel="noopener noreferrer">Creative Tim</a>.
                                </div> */}
                            </div>
                        </div>
                    </div>
                </footer>
            </section>
        </div>
    );
};

export default Myjobs;
