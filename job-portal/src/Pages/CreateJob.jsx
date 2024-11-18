import React, { useState } from "react";
import { useForm } from "react-hook-form";
import ReactQuill from 'react-quill';
import Creatable from 'react-select/creatable';
// import ReactQuill from "react-quill";
// import "react-quill/dist/quill.snow.css";

const CreateJob = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [jobDescription, setJobDescription] = useState(""); // State for rich text editor

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    data.skills = selectedOption;
    data.description = jobDescription; // Adding jobDescription to the data
    fetch("https://jobportal-slg2.onrender.com/post-job", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.acknowledged === true) {
          alert("Job Posted Successfully!!!");
          reset(); // Reset form fields after successful submission
          setJobDescription(""); // Reset jobDescription
        }
      });
  };

  const options = [
    { value: "JavaScript", label: "JavaScript" },
    { value: "C++", label: "C++" },
    { value: "HTML", label: "HTML" },
    { value: "CSS", label: "CSS" },
    { value: "React", label: "React" },
    { value: "MongoDB", label: "MongoDB" },
    { value: "Python", label: "Python" },
  ];

  return (
    <div className="max-w-screen-2xl container mx-auto xl:px-24 px-4">
      {/* Form */}
      <div className="bg-[#f4f1f1] py-10 px-4 lg:px-16">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* First row */}
          <div className="create-job-flex">
            <div className="lg:w-1/2 w-full">
              <label className="block mb-2 text-lg sm:text-xl">Job Title</label>
              <input
                type="text"
                placeholder="Web Developer"
                {...register("jobTitle", { required: "Job title is required" })}
                className="create-job-input"
              />
              {errors.jobTitle && (
                <span className="text-red-500">{errors.jobTitle.message}</span>
              )}
            </div>
            <div className="lg:w-1/2 w-full">
              <label className="block mb-2 text-lg sm:text-xl">Company Name</label>
              <input
                type="text"
                placeholder="Microsoft"
                {...register("companyName", { required: "Company name is required" })}
                className="create-job-input"
              />
              {errors.companyName && (
                <span className="text-red-500">{errors.companyName.message}</span>
              )}
            </div>
          </div>

          {/* Second row */}
          <div className="create-job-flex">
            <div className="lg:w-1/2 w-full">
              <label className="block mb-2 text-lg sm:text-xl">Minimum Salary</label>
              <input
                type="text"
                placeholder="20k"
                {...register("minPrice", { required: "Minimum salary is required" })}
                className="create-job-input"
              />
              {errors.minPrice && (
                <span className="text-red-500">{errors.minPrice.message}</span>
              )}
            </div>
            <div className="lg:w-1/2 w-full">
              <label className="block mb-2 text-lg sm:text-xl">Maximum Salary</label>
              <input
                type="text"
                placeholder="80k"
                {...register("maxPrice", { required: "Maximum salary is required" })}
                className="create-job-input"
              />
              {errors.maxPrice && (
                <span className="text-red-500">{errors.maxPrice.message}</span>
              )}
            </div>
          </div>

          {/* Third row */}
          <div className="create-job-flex">
            <div className="lg:w-1/2 w-full">
              <label className="block mb-2 text-lg sm:text-xl">Salary Type</label>
              <select
                {...register("salaryType", { required: "Salary type is required" })}
                className="create-job-input"
              >
                <option value="">Choose your salary</option>
                <option value="Hourly">Hourly</option>
                <option value="Monthly">Monthly</option>
                <option value="Yearly">Yearly</option>
              </select>
              {errors.salaryType && (
                <span className="text-red-500">{errors.salaryType.message}</span>
              )}
            </div>
            <div className="lg:w-1/2 w-full">
              <label className="block mb-2 text-lg sm:text-xl">Job Location</label>
              <input
                type="text"
                placeholder="Ex: New York"
                {...register("jobLocation", { required: "Job location is required" })}
                className="create-job-input"
              />
              {errors.jobLocation && (
                <span className="text-red-500">{errors.jobLocation.message}</span>
              )}
            </div>
          </div>

          {/* Fourth row */}
          <div className="create-job-flex">
            <div className="lg:w-1/2 w-full">
              <label className="block mb-2 text-lg sm:text-xl">Job Posting Date</label>
              <input
                type="date"
                {...register("postingDate", { required: "Posting date is required" })}
                className="create-job-input"
              />
              {errors.postingDate && (
                <span className="text-red-500">{errors.postingDate.message}</span>
              )}
            </div>
            <div className="lg:w-1/2 w-full">
              <label className="block mb-2 text-lg sm:text-xl">Experience Level</label>
              <select
                {...register("experienceLevel", { required: "Experience level is required" })}
                className="create-job-input"
              >
                <option value="">Choose your experience</option>
                <option value="Fresher">Fresher</option>
                <option value="0-1 Yrs">0-1 Yrs</option>
                <option value="Any Experience">Any Experience</option>
              </select>
              {errors.experienceLevel && (
                <span className="text-red-500">{errors.experienceLevel.message}</span>
              )}
            </div>
          </div>

          {/* Fifth row */}
          <div>
            <label className="block mb-2 text-lg sm:text-xl">Required Skill Sets</label>
            <Creatable
              defaultValue={selectedOption}
              onChange={setSelectedOption}
              options={options}
              isMulti
              className="create-job-input py-4"
            />
          </div>

          {/* Sixth row */}
          <div className="create-job-flex">
            <div className="lg:w-1/2 w-full">
              <label className="block mb-2 text-lg sm:text-xl">Company Logo</label>
              <input
                type="url"
                placeholder="Paste your company logo URL"
                {...register("companyLogo")}
                className="create-job-input"
              />
            </div>
            <div className="lg:w-1/2 w-full">
              <label className="block mb-2 text-lg sm:text-xl">Employment Type</label>
              <select
                {...register("employmentType", { required: "Employment type is required" })}
                className="create-job-input"
              >
                <option value="">Choose Employment Type</option>
                <option value="Full-time">Full-time</option>
                <option value="Internship">Internship</option>
                <option value="Part-Time">Part-time/Contractual</option>
              </select>
              {errors.employmentType && (
                <span className="text-red-500">{errors.employmentType.message}</span>
              )}
            </div>
          </div>

          {/* Job Description */}
          <div>
            <label className="block mb-2 text-lg sm:text-xl">Job Description</label>
            <ReactQuill
              value={jobDescription}
              onChange={setJobDescription}
              placeholder="Write the job description here"
              className="create-job-input"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="bg-[#7C4DFF] text-white py-2 px-6 rounded-xl font-medium text-lg w-full"
          >
            Post Job
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateJob;
