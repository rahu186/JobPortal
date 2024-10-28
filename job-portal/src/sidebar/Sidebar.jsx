import React, { useState } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa'; // Import icons
import Location from './Location';
import Salary from './Salary';
import JobPostingData from './JobPostingData';
import WorkExperience from './WorkExperience';
import EmploymentType from './EmploymentType';

const Sidebar = ({ handleChange, handleClick }) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    // Toggle the dropdown visibility
    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    return (
        <div className='p-2 md:p-0 space-y-5'>
            <div className='flex justify-between items-center mb-2'>
                <h3 className='text-lg font-bold'>Filters</h3>
                {/* Dropdown arrow button */}
                <button
                    onClick={toggleDropdown}
                    className='md:hidden text-blue-500 focus:outline-none'
                >
                    {isDropdownOpen ? <FaChevronUp /> : <FaChevronDown />}
                </button>
            </div>

            {/* Filters content, visible on larger screens or when dropdown is open */}
            <div
                className={`mt-2 space-y-4 ${isDropdownOpen ? 'block' : 'hidden'} md:block`}
            >
                <div className='border border-gray-300 rounded-md p-2'> {/* Adjusted filter container */}
                    <Location handleChange={handleChange} />
                </div>
                <div className='border border-gray-300 rounded-md p-2'>
                    <Salary handleChange={handleChange} handleClick={handleClick} />
                </div>
                <div className='border border-gray-300 rounded-md p-2'>
                    <JobPostingData handleChange={handleChange} />
                </div>
                <div className='border border-gray-300 rounded-md p-2'>
                    <WorkExperience handleChange={handleChange} />
                </div>
                <div className='border border-gray-300 rounded-md p-2'>
                    <EmploymentType handleChange={handleChange} />
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
