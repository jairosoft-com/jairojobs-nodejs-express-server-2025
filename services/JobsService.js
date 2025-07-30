/* eslint-disable no-unused-vars */
const Service = require('./Service');

/**
* Get Job Details
* Retrieves the full details for a specific job posting.
*
* jobId String ID of the job to retrieve.
* returns JobDetail
* */
const getJobDetails = ({ jobId }) => new Promise(
  async (resolve, reject) => {
    try {
      // Mock job detail data matching the JobDetail schema
      const jobDetail = {
        id: jobId,
        title: 'Senior Software Engineer - Backend',
        company: 'InnovateTech Inc.',
        companyId: 'comp-789',
        companyLogo: 'https://via.placeholder.com/200x80/28A745/FFFFFF?text=InnovateTech',
        location: 'Austin, TX',
        type: 'full-time',
        experienceLevel: 'senior',
        remoteOption: 'remote',
        salary: {
          min: 140000,
          max: 200000,
          currency: 'USD',
          period: 'yearly'
        },
        description: 'Join our dynamic backend engineering team to build scalable, high-performance systems that power our platform serving millions of users. You\'ll work with cutting-edge technologies and contribute to architectural decisions that shape our technical future.',
        requirements: [
          '7+ years of backend development experience',
          'Expert knowledge of Python, Go, or Java',
          'Strong experience with microservices architecture',
          'Proficiency with containerization (Docker, Kubernetes)',
          'Experience with cloud platforms (AWS preferred)',
          'Knowledge of distributed systems and message queues',
          'Strong database design skills (PostgreSQL, Redis)',
          'Experience with monitoring and observability tools'
        ],
        responsibilities: [
          'Design and implement robust backend services and APIs',
          'Lead technical discussions and architectural decisions',
          'Mentor junior engineers and conduct code reviews',
          'Optimize system performance and scalability',
          'Collaborate with frontend and DevOps teams',
          'Participate in on-call rotation for production support',
          'Drive adoption of best practices and new technologies'
        ],
        benefits: [
          'Competitive salary with performance bonuses',
          'Comprehensive health, dental, vision, and mental health coverage',
          '100% remote work with flexible hours',
          '$5,000 annual learning and development budget',
          'Stock options with high growth potential',
          'Unlimited PTO and sabbatical program',
          'Top-tier equipment and home office setup allowance',
          'Annual company retreats and team building events'
        ],
        tags: [
          'Python',
          'Go',
          'Microservices',
          'AWS',
          'Kubernetes',
          'Backend',
          'Senior',
          'Remote',
          'API Design'
        ],
        postedAt: '2025-07-20T14:30:00Z',
        applicationDeadline: '2025-08-20T23:59:59Z',
        applicants: 78,
        featured: true,
        active: true
      };

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
      // Mock jobs data matching the JobSummary schema
      const allJobs = [
        {
          id: '1',
          title: 'Senior Full Stack Developer',
          company: 'TechCorp Solutions',
          location: 'San Francisco, CA',
          type: 'full-time',
          remoteOption: 'hybrid',
          postedAt: '2025-01-15T00:00:00.000Z'
        },
        {
          id: '2',
          title: 'Frontend Engineer',
          company: 'StartupHub',
          location: 'New York, NY',
          type: 'full-time',
          remoteOption: 'remote',
          postedAt: '2025-01-20T00:00:00.000Z'
        },
        {
          id: '3',
          title: 'DevOps Engineer',
          company: 'Global Health Systems',
          location: 'Boston, MA',
          type: 'full-time',
          remoteOption: 'hybrid',
          postedAt: '2025-01-18T00:00:00.000Z'
        },
        {
          id: '4',
          title: 'Junior Backend Developer',
          company: 'TechCorp Solutions',
          location: 'Austin, TX',
          type: 'full-time',
          remoteOption: 'on-site',
          postedAt: '2025-01-22T00:00:00.000Z'
        },
        {
          id: '5',
          title: 'Product Designer',
          company: 'StartupHub',
          location: 'Remote',
          type: 'full-time',
          remoteOption: 'remote',
          postedAt: '2025-01-19T00:00:00.000Z'
        },
        {
          id: '6',
          title: 'Backend Engineer',
          company: 'TechCorp Solutions',
          location: 'Austin, TX',
          type: 'full-time',
          remoteOption: 'on-site',
          postedAt: '2025-01-20T00:00:00.000Z'
        },
        {
          id: '7',
          title: 'Product Manager',
          company: 'InnovateTech',
          location: 'Seattle, WA',
          type: 'full-time',
          remoteOption: 'hybrid',
          postedAt: '2025-01-21T00:00:00.000Z'
        },
        {
          id: '8',
          title: 'DevOps Engineer',
          company: 'CloudScale',
          location: 'Denver, CO',
          type: 'full-time',
          remoteOption: 'remote',
          postedAt: '2025-01-22T00:00:00.000Z'
        },
        {
          id: '9',
          title: 'Data Scientist',
          company: 'DataInsights',
          location: 'Boston, MA',
          type: 'full-time',
          remoteOption: 'hybrid',
          postedAt: '2025-01-18T00:00:00.000Z'
        },
        {
          id: '10',
          title: 'QA Engineer',
          company: 'TechCorp Solutions',
          location: 'Portland, OR',
          type: 'full-time',
          remoteOption: 'on-site',
          postedAt: '2025-01-19T00:00:00.000Z'
        },
        {
          id: '11',
          title: 'Mobile Developer',
          company: 'StartupHub',
          location: 'San Francisco, CA',
          type: 'full-time',
          remoteOption: 'remote',
          postedAt: '2025-01-20T00:00:00.000Z'
        },
        {
          id: '12',
          title: 'Security Engineer',
          company: 'SecureNet',
          location: 'Washington, DC',
          type: 'full-time',
          remoteOption: 'hybrid',
          postedAt: '2025-01-17T00:00:00.000Z'
        },
        {
          id: '13',
          title: 'Technical Writer',
          company: 'TechCorp Solutions',
          location: 'Remote',
          type: 'full-time',
          remoteOption: 'remote',
          postedAt: '2025-01-21T00:00:00.000Z'
        },
        {
          id: '14',
          title: 'Cloud Architect',
          company: 'CloudScale',
          location: 'Chicago, IL',
          type: 'full-time',
          remoteOption: 'hybrid',
          postedAt: '2025-01-16T00:00:00.000Z'
        },
        {
          id: '15',
          title: 'Marketing Manager',
          company: 'StartupHub',
          location: 'Miami, FL',
          type: 'full-time',
          remoteOption: 'hybrid',
          postedAt: '2025-01-18T00:00:00.000Z'
        },
        {
          id: '16',
          title: 'Frontend Developer',
          company: 'InnovateTech',
          location: 'Phoenix, AZ',
          type: 'full-time',
          remoteOption: 'on-site',
          postedAt: '2025-01-19T00:00:00.000Z'
        },
        {
          id: '17',
          title: 'Data Engineer',
          company: 'DataInsights',
          location: 'Atlanta, GA',
          type: 'full-time',
          remoteOption: 'remote',
          postedAt: '2025-01-20T00:00:00.000Z'
        },
        {
          id: '18',
          title: 'Sales Engineer',
          company: 'TechCorp Solutions',
          location: 'Dallas, TX',
          type: 'full-time',
          remoteOption: 'hybrid',
          postedAt: '2025-01-21T00:00:00.000Z'
        },
        {
          id: '19',
          title: 'AI/ML Engineer',
          company: 'InnovateTech',
          location: 'San Francisco, CA',
          type: 'full-time',
          remoteOption: 'hybrid',
          postedAt: '2025-01-22T00:00:00.000Z'
        },
        {
          id: '20',
          title: 'HR Manager',
          company: 'GlobalHealth',
          location: 'Nashville, TN',
          type: 'full-time',
          remoteOption: 'on-site',
          postedAt: '2025-01-19T00:00:00.000Z'
        },
        {
          id: '21',
          title: 'Systems Administrator',
          company: 'TechCorp Solutions',
          location: 'San Francisco, CA',
          type: 'full-time',
          remoteOption: 'hybrid',
          postedAt: '2025-01-23T00:00:00.000Z'
        },
        {
          id: '22',
          title: 'Database Administrator',
          company: 'DataInsights',
          location: 'Remote',
          type: 'full-time',
          remoteOption: 'remote',
          postedAt: '2025-01-24T00:00:00.000Z'
        },
        {
          id: '23',
          title: 'Junior Developer',
          company: 'StartupHub',
          location: 'New York, NY',
          type: 'full-time',
          remoteOption: 'hybrid',
          postedAt: '2025-01-25T00:00:00.000Z'
        }
      ];

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
