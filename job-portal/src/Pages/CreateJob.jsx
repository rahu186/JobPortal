import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Creatable from "react-select/creatable";

const CreateJob = () => {
  const [selectedOption, setSelectedOption] = useState(null);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    data.skills = selectedOption;
    fetch("https://jobportal-slg2.onrender.com/post-job", {
      method: "POST",
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(data)
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.acknowledged === true) {
          alert("Job Posted Successfully!!!");
        }
        reset();
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
      <div className="bg-[#f4f1f1] py-10 px-4 lg:px-16">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/*first row */}
          <div className="create-job-flex">
            <div className="lg:w-1/2 w-full">
              <label className="block mb-2 text-lg sm:text-xl">Job Title</label>
              <input
                type="text"
                placeholder="Web Developer"
                {...register("jobTitle")}
                className="create-job-input"
              />
            </div>
            <div className="lg:w-1/2 w-full">
              <label className="block mb-2 text-lg sm:text-xl">Company Name</label>
              <input
                type="text"
                placeholder="Microsoft"
                {...register("companyName")}
                className="create-job-input"
              />
            </div>
          </div>

          {/*second row*/}
          <div className="create-job-flex">
            <div className="lg:w-1/2 w-full">
              <label className="block mb-2 text-lg sm:text-xl">Minimum Salary</label>
              <input
                type="text"
                placeholder="20k"
                {...register("minPrice")}
                className="create-job-input"
              />
            </div>
            <div className="lg:w-1/2 w-full">
              <label className="block mb-2 text-lg sm:text-xl">Maximum Salary</label>
              <input
                type="text"
                placeholder="80k"
                {...register("maxPrice")}
                className="create-job-input"
              />
            </div>
          </div>

          {/*third row*/}
          <div className="create-job-flex">
            <div className="lg:w-1/2 w-full">
              <label className="block mb-2 text-lg sm:text-xl">Salary Type</label>
              <select {...register("salaryType")} className="create-job-input">
                <option value="">Choose your salary</option>
                <option value="Hourly">Hourly</option>
                <option value="Monthly">Monthly</option>
                <option value="Yearly">Yearly</option>
              </select>
            </div>
            <div className="lg:w-1/2 w-full">
              <label className="block mb-2 text-lg sm:text-xl">Job Location</label>
              <input
                type="text"
                placeholder="Ex : New York"
                {...register("jobLocation")}
                className="create-job-input"
              />
            </div>
          </div>

          {/*Fourth row*/}
          <div className="create-job-flex">
            <div className="lg:w-1/2 w-full">
              <label className="block mb-2 text-lg sm:text-xl">Job Posting Date</label>
              <input
                type="date"
                placeholder="Ex : 2023-11-28"
                {...register("postingDate")}
                className="create-job-input"
              />
            </div>
            <div className="lg:w-1/2 w-full">
              <label className="block mb-2 text-lg sm:text-xl">Experience Level</label>
              <select
                {...register("experienceLevel")}
                className="create-job-input"
              >
                <option value="">Choose your experience</option>
                <option value="Fresher">Fresher</option>
                <option value="0-1 Yrs">0-1 Yrs</option>
                <option value="Any Experience">Any Experience</option>
              </select>
            </div>
          </div>

          {/*Additional Row */}
          <div className="create-job-flex">
            <div className="lg:w-1/2 w-full">
              <label className="block mb-2 text-lg sm:text-xl">Qualification</label>
              <input
                type="text"
                placeholder="BE/BTECH/MCA"
                {...register("qualification")}
                className="create-job-input"
              />
            </div>

            <div className="lg:w-1/2 w-full">
              <label className="block mb-2 text-lg sm:text-xl">Batch</label>
              <input
                type="text"
                placeholder="2023"
                {...register("batch")}
                className="create-job-input"
              />
            </div>
          </div>

          {/*Fifth row*/}
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

          {/*Sixth row*/}
          <div className="create-job-flex">
            <div className="lg:w-1/2 w-full">
              <label className="block mb-2 text-lg sm:text-xl">Company Logo</label>
              <input
                type="url"
                placeholder="Paste your company logo URL: https://www.google.com"
                {...register("companyLogo")}
                className="create-job-input"
              />
            </div>
            <div className="lg:w-1/2 w-full">
              <label className="block mb-2 text-lg sm:text-xl">Employment Type</label>
              <select
                {...register("employmentType")}
                className="create-job-input"
              >
                <option value="">Choose Employment Type</option>
                <option value="Full-time">Full-time</option>
                <option value="Internship">Internship</option>
                <option value="Part-Time">Part-time/Contractual</option>
              </select>
            </div>
          </div>

          {/*Seventh row*/}
          <div className="create-job-flex">
            <div className="lg:w-1/2 w-full">
              <label className="block mb-2 text-lg sm:text-xl">Last Date to Apply</label>
              <input
                type="date"
                placeholder="Ex : 2023-11-28"
                {...register("lastDate")}
                className="create-job-input"
              />
            </div>
            <div className="lg:w-1/2 w-full">
              <label className="block mb-2 text-lg sm:text-xl">Apply Link</label>
              <input
                type="url"
                placeholder="Paste your apply link: https://www.google.com"
                {...register("applyLink")}
                className="create-job-input"
              />
            </div>
          </div>

          {/*Eighth row*/}
          <div>
            <label className="block mb-2 text-lg sm:text-xl">Job Description</label>
            <textarea
              className="w-full pl-3 py-1.5 focus:outline-none"
              rows={6}
              placeholder="Job Description"
              {...register("description")}
            />
          </div>

          {/*Last row*/}
          <div>
            <label className="block mb-2 text-lg sm:text-xl">Job Posted By</label>
            <input
              type="email"
              placeholder="your email"
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
  );
};

export default CreateJob;
