import React from 'react'
import InputField from '../component/InputField'

const WorkExperience = ({handleChange}) => {
  return (
    <div>
    <h4 className="text-lg font-medium mb-2">Work Experience</h4>
    <div>
      <label className="sidebar-label-container">
        <input type="radio" name="test" value="" onChange={handleChange} />
        <span className="checkmark"></span>Any experience
      </label>
      <InputField
        handleChange={handleChange}
        value="0-1 Yrs"
        title="0-1 Yrs"
        name="test"
      />
      <InputField
        handleChange={handleChange}
        value="Fresher"
        title="Fresher"
        name="test"
      />

    </div>
  </div>
  )
}

export default WorkExperience