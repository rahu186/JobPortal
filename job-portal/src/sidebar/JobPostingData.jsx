import React from 'react'
import InputField from '../component/InputField'
const JobPostingData = ({handleChange}) => {
    const now = new Date();
   
    let twentyFourHoursAgo = new Date(now - 24 * 60 * 60 * 1000);
    let sevenDaysAgo = new Date(now - 7 * 24 * 60 * 60 * 1000);
    let thirtyDaysAgo = new Date(now - 30 * 24 * 60 * 60 * 1000);
    // console.log(now);
    // convert date to string
    twentyFourHoursAgo = twentyFourHoursAgo.toISOString().slice(0,10);
    sevenDaysAgo = sevenDaysAgo.toISOString().slice(0,10);
    thirtyDaysAgo = thirtyDaysAgo.toISOString().slice(0,10);
    // console.log(twentyFourHoursAgo)
  return (
    <div>
      <h4 className="text-lg font-medium mb-2">Date of Posting</h4>
      <div>
        <label className="sidebar-label-container">
          <input type="radio" name="test3" value="" onChange={handleChange} />
          <span className="checkmark"></span>All Date
        </label>
        <InputField
          handleChange={handleChange}
          value={twentyFourHoursAgo}
          title="Last 24 Hours"
          name="test3"
        />
        <InputField
         handleChange={handleChange}
         value={sevenDaysAgo}
         title="Last 7 Days"
         name="test3"
        />

          <InputField
          handleChange={handleChange}
          value={thirtyDaysAgo}
          title="Last 30 Days"
          name="test3"
        />

        
      </div>
      </div>
  )
}

export default JobPostingData