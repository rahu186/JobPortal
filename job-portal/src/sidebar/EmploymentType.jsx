import React from 'react'
import InputField from '../component/InputField'

const EmploymentType = ({handleChange}) => {
  return (
    <div>
    <h4 className="text-lg font-medium mb-2">Employment Type</h4>
    <div>
      <label className="sidebar-label-container">
        <input type="radio" name="test" value="" onChange={handleChange} />
        <span className="checkmark"></span>Any Type
      </label>
      <InputField
        handleChange={handleChange}
        value="Full-time"
        title="Full-time"
        name="test"
      />
      <InputField
        handleChange={handleChange}
        value="Internship"
        title="Internship"
        name="test"
      />

<InputField
        handleChange={handleChange}
        value="Part-time"
        title="Part-time"
        name="test"
      />

    </div>
  </div>
  )
}

export default EmploymentType