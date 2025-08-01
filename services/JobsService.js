/* eslint-disable no-unused-vars */
const Service = require('./Service');
const fs = require('fs');
const path = require('path');

/**
* Get Job Details
* Retrieves the full details for a specific job posting.
*
* jobId String ID of the job to retrieve.
* returns JobDetail
* */
const getJobDetails = ({ jobId }) => new Promise(
  async (resolve, reject) => {
    
    console.log('getJobDetails', jobId);
    
    try {
      // Load job details data from JSON file
      const jobDetailsPath = path.join(__dirname, '..', 'data', 'job-details.json');
      let jobDetails = [];
      
      try {
        const jobDetailsData = JSON.parse(fs.readFileSync(jobDetailsPath, 'utf8'));
        jobDetails = jobDetailsData.jobDetails || [];
      } catch (error) {
        console.error('Error loading job details data:', error.message);
        // Fallback to empty array if file cannot be loaded
        jobDetails = [];
      }

      // Find the job by ID
      const jobDetail = jobDetails.find(job => job.id === jobId);
      
      if (!jobDetail) {
        reject(Service.rejectResponse(
          'Job not found',
          404,
        ));
        return;
      }

      console.log('jobDetail', jobDetail);

      resolve(Service.successResponse(jobDetail));
    } catch (e) {
      reject(Service.rejectResponse(
        e.message || 'Invalid input',
        e.status || 405,
      ));
    }
  },
);

/**
* Search and List Jobs
* Retrieves a paginated list of job postings, with optional filters for search query and location.
*
* q String A search query to filter jobs by title, company, or description. (optional)
* location String A location to filter jobs by. (optional)
* page Integer The page number to retrieve. (optional)
* limit Integer The number of jobs to return per page. (optional)
* returns SearchAndListJobsResponse200Json
* */
const searchAndListJobs = ({ q, location, page = 1, limit = 10 }) => new Promise(
  async (resolve, reject) => {
    try {
      // Load jobs data from JSON file
      const jobsDataPath = path.join(__dirname, '..', 'data', 'jobs.json');
      let allJobs = [];
      
      try {
        const jobsData = JSON.parse(fs.readFileSync(jobsDataPath, 'utf8'));
        allJobs = jobsData.jobs || [];
      } catch (error) {
        console.error('Error loading jobs data:', error.message);
        // Fallback to empty array if file cannot be loaded
        allJobs = [];
      }

      // Apply filters if provided
      let filteredJobs = allJobs;
      
      if (q) {
        const query = q.toLowerCase();
        filteredJobs = filteredJobs.filter(job => 
          job.title.toLowerCase().includes(query) ||
          job.company.toLowerCase().includes(query) ||
          job.location.toLowerCase().includes(query)
        );
      }
      
      if (location) {
        const locationQuery = location.toLowerCase();
        filteredJobs = filteredJobs.filter(job => 
          job.location.toLowerCase().includes(locationQuery)
        );
      }

      // Calculate pagination
      const total = filteredJobs.length;
      const totalPages = Math.ceil(total / limit);
      const startIndex = (page - 1) * limit;
      const endIndex = startIndex + limit;
      const paginatedJobs = filteredJobs.slice(startIndex, endIndex);

      // Create pagination object matching the Pagination schema
      const pagination = {
        total,
        page,
        limit,
        totalPages
      };

      // Return the response matching SearchAndListJobsResponse200Json schema
      resolve(Service.successResponse({
        jobs: paginatedJobs,
        pagination
      }));

    } catch (e) {
      reject(Service.rejectResponse(
        e.message || 'Invalid input',
        e.status || 405,
      ));
    }
  },
);

module.exports = {
  getJobDetails,
  searchAndListJobs,
};
