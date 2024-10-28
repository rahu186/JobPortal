import React from 'react'
import { useLoaderData, useParams } from 'react-router-dom'
import { useState } from "react";
import { useForm } from "react-hook-form";
import Creatable from "react-select/creatable";

const UpdateJob = () => {
    const {id} = useParams();
    // console.log(id)
    const {_id,jobTitle,companyName,minPrice,maxPrice,
      salaryType,jobLocation,postingDate,experienceLevel,
      companyLogo,employmentType,description,postedBy,skills} = useLoaderData();

      const [selectedOption, setSelectedOption] = useState(null);

  const {
    register,
    handleSubmit,
    watch,reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    data.skills = selectedOption;
    // console.log(data);
    fetch(`https://jobportal-slg2.onrender.com/update-job/${id}`, {
      method : "PATCH",
      headers : {'content-type': 'application/json'},
      body : JSON.stringify(data)  
      
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        if(result.acknowledged === true){
          alert("Job Updated Successfully!!!")
        }
        reset()
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
      {/*form*/}
      <div className=" bg-[#f4f1f1] py-10 px-4 lg:px-16">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/*first row */}
          <div className="create-job-flex">
            <div className="lg:w-1/2 w-full">
              <label className="block mb-2 text-lg">Job Title</label>
              <input
                type="text"
                defaultValue={jobTitle}
                placeholder="Web Developer"
                {...register("jobTitle")}
                className="create-job-input"
              />
            </div>
            <div className="lg:w-1/2 w-full">
              <label className="block mb-2 text-lg">Company Name</label>
              <input
                type="text"
                defaultValue={companyName}
                placeholder="Microsoft"
                {...register("companyName")}
                className="create-job-input"
              />
            </div>
          </div>

          {/*second row*/}
          <div className="create-job-flex">
            <div className="lg:w-1/2 w-full">
              <label className="block mb-2 text-lg">Minimum Salary</label>
              <input
                type="text"
                placeholder="20k"
                defaultValue={minPrice}
                {...register("minPrice")}
                className="create-job-input"
              />
            </div>
            <div className="lg:w-1/2 w-full">
              <label className="block mb-2 text-lg">Maximum Salary</label>
              <input
                type="text"
                defaultValue={maxPrice}
                placeholder="80k"
                {...register("maxPrice")}
                className="create-job-input"
              />
            </div>
          </div>
          {/*third row*/}
          <div className="create-job-flex">
            <div className="lg:w-1/2 w-full">
              <label className="block mb-2 text-lg">Salary Type</label>
              <select {...register("salaryType")} className="create-job-input">
                <option value={salaryType}>{salaryType}</option>
                <option value="Hourly">Hourly</option>
                <option value="Monthly">Monthly</option>
                <option value="Yearly">Yearly</option>
              </select>
            </div>
            <div className="lg:w-1/2 w-full">
              <label className="block mb-2 text-lg">Job Location</label>
              <input
                type="text"
                defaultValue={jobLocation}
                placeholder="Ex : New York"
                {...register("jobLocation")}
                className="create-job-input"
              />
            </div>
          </div>

          {/*Forth row*/}
          <div className="create-job-flex">
            <div className="lg:w-1/2 w-full">
              <label className="block mb-2 text-lg">Job Posting Date</label>
              <input
                type="date"
                defaultValue={postingDate}
                placeholder="Ex : 2023-11-28"
                {...register("postingDate")}
                className="create-job-input"
              />
            </div>
            <div className="lg:w-1/2 w-full">
              <label className="block mb-2 text-lg">Experience Level</label>
              <select
                {...register("experienceLevel")}
                className="create-job-input"
              >
                <option value={experienceLevel}>{experienceLevel}</option>
                <option value="NoExperience">Fresher</option>
                <option value="Internship">0-1 Yrs</option>
                <option value="Any Experience">Any Experience</option>
              </select>
            </div>
          </div>

          {/*Fifth row*/}
          <div>
            <label className="block mb-2 text-lg">Required Skill Sets</label>
            <Creatable
              defaultValue={skills}
              onChange={setSelectedOption}
              options={options}
              isMulti
              className="create-job-input py-4"
            />
          </div>

          {/*Sixth row*/}
          <div className="create-job-flex">
            <div className="lg:w-1/2 w-full">
              <label className="block mb-2 text-lg">Company Logo</label>
              <input
                type="url"
                defaultValue={companyLogo}
                placeholder="Paste your company logo URL:https:/www.google.com"
                {...register("companyLogo")}
                className="create-job-input"
              />
            </div>
            <div className="lg:w-1/2 w-full">
              <label className="block mb-2 text-lg">Employment Type</label>
              <select
                {...register("employmentType")}
                className="create-job-input"
              >
                <option value={employmentType}>{employmentType}</option>
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Internship</option>
                <option value="Temporary">Part-time/Contractual</option>
              </select>
            </div>
          </div>

          {/*Seventh row*/}
          <div>
            <label className="block mb-2 text-lg">Job Description</label>
            <textarea
              className="w-full pl-3 py-1.5 focus:outline-none"
              rows={6}
              defaultValue={description}
              placeholder="Job Description"
              {...register("description")}
            />
          </div>

          {/*Last row*/}
          <div>
            <label className="block mb-2 text-lg">Job Posted By</label>
            <input
              type="email"
              placeholder="your email"
              defaultValue={postedBy}
              {...register("postedBy")}
              className="create-job-input"
            />
          </div>
          <input
            type="submit"
            className="block mt-12 bg-blue text-white font-semibold px-8 py-2 rounded-sm cursor-pointer"
          />
        </form>
      </div>
    </div>
  )
}

export default UpdateJob