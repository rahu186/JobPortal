import React, { useState } from 'react';
import InputField from '../component/InputField';

const JobPostingData = ({ handleChange }) => {
  const [selectedDate, setSelectedDate] = useState("");  // Store the selected date

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);  // Update selected date
    handleChange(e.target.value);     // Pass selected date up to parent component
  };

  return (
    <div>
      <h4 className="text-lg font-medium mb-2">Date of Posting</h4>
      <div>
        {/* Date Picker to select a custom date */}
        <label className="sidebar-label-container">
          <span>Select a Date</span>
          <input 
            type="date" 
            name="selectedDate" 
            value={selectedDate} 
            onChange={handleDateChange}
            className="sidebar-date-picker"
          />
        </label>

        {/* Other filters for last 24 hours, 7 days, etc. */}
        <InputField
          handleChange={handleChange}
          value="last24"  // Example of filter value
          title="Last 24 Hours"
          name="test3"
        />
        <InputField
          handleChange={handleChange}
          value="last7"  // Example of filter value
          title="Last 7 Days"
          name="test3"
        />
        <InputField
          handleChange={handleChange}
          value="last30"  // Example of filter value
          title="Last 30 Days"
          name="test3"
        />
      </div>
    </div>
  );
};

export default JobPostingData;
