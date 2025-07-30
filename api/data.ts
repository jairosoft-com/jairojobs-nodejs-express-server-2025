import { Job, Company, JobFilters } from '@/types';

export const mockCompanies: Company[] = [
  {
    id: '1',
    name: 'TechCorp Solutions',
    logo: '/companies/techcorp.png',
    description:
      'Leading technology solutions provider specializing in cloud infrastructure and enterprise software.',
    website: 'https://techcorp.example.com',
    industry: 'technology',
    size: 'large',
    founded: 2010,
    headquarters: 'San Francisco, CA',
    locations: ['San Francisco, CA', 'New York, NY', 'Austin, TX', 'Remote'],
    employees: {
      min: 1000,
      max: 5000,
    },
    culture:
      'Innovation-driven culture with focus on work-life balance and continuous learning.',
    benefits: [
      'Comprehensive health insurance',
      'Unlimited PTO',
      '401(k) matching',
      'Remote work options',
      'Professional development budget',
      'Stock options',
    ],
    techStack: [
      'React',
      'Node.js',
      'AWS',
      'Python',
      'Kubernetes',
      'TypeScript',
    ],
    socialLinks: {
      linkedin: 'https://linkedin.com/company/techcorp',
      twitter: 'https://twitter.com/techcorp',
    },
    verified: true,
    featured: true,
  },
  {
    id: '2',
    name: 'StartupHub',
    logo: '/companies/startuphub.png',
    description:
      'Fast-growing fintech startup revolutionizing digital payments.',
    website: 'https://startuphub.example.com',
    industry: 'finance',
    size: 'startup',
    founded: 2021,
    headquarters: 'New York, NY',
    locations: ['New York, NY', 'Remote'],
    employees: {
      min: 50,
      max: 100,
    },
    culture:
      'Fast-paced, collaborative environment with entrepreneurial spirit.',
    benefits: [
      'Health insurance',
      'Flexible hours',
      'Equity compensation',
      'Remote-first',
      'Learning stipend',
    ],
    techStack: ['React Native', 'Go', 'PostgreSQL', 'Docker', 'TypeScript'],
    socialLinks: {
      linkedin: 'https://linkedin.com/company/startuphub',
    },
    verified: true,
    featured: false,
  },
  {
    id: '3',
    name: 'Global Health Systems',
    logo: '/companies/globalhealth.png',
    description:
      'Healthcare technology company improving patient care through innovative solutions.',
    website: 'https://globalhealth.example.com',
    industry: 'healthcare',
    size: 'medium',
    founded: 2015,
    headquarters: 'Boston, MA',
    locations: ['Boston, MA', 'Chicago, IL', 'Remote'],
    employees: {
      min: 300,
      max: 500,
    },
    culture:
      'Mission-driven organization focused on making healthcare accessible.',
    benefits: [
      'Excellent health coverage',
      'Parental leave',
      'Retirement planning',
      'Wellness programs',
      'Volunteer time off',
    ],
    techStack: ['Java', 'Spring Boot', 'Angular', 'MySQL', 'AWS', 'FHIR'],
    socialLinks: {
      linkedin: 'https://linkedin.com/company/globalhealth',
      facebook: 'https://facebook.com/globalhealth',
    },
    verified: true,
    featured: false,
  },
];

export const mockJobs: Job[] = [
  {
    id: '1',
    title: 'Senior Full Stack Developer',
    company: 'TechCorp Solutions',
    companyId: '1',
    companyLogo: '/companies/techcorp.png',
    location: 'San Francisco, CA',
    type: 'full-time',
    experienceLevel: 'senior',
    remoteOption: 'hybrid',
    salary: {
      min: 150000,
      max: 200000,
      currency: 'USD',
      period: 'yearly',
    },
    description: `We are looking for a Senior Full Stack Developer to join our growing engineering team. You will be responsible for designing and implementing scalable web applications using modern technologies.

    As a senior member of the team, you'll mentor junior developers, participate in architectural decisions, and help shape our engineering culture.`,
    requirements: [
      '5+ years of experience in full-stack development',
      'Strong proficiency in React, Node.js, and TypeScript',
      'Experience with cloud platforms (AWS preferred)',
      'Solid understanding of database design and optimization',
      'Experience with microservices architecture',
      'Excellent communication and leadership skills',
    ],
    responsibilities: [
      'Design and develop scalable web applications',
      'Lead technical projects from conception to deployment',
      'Mentor junior developers and conduct code reviews',
      'Collaborate with product managers and designers',
      'Participate in on-call rotation for production support',
      'Contribute to architectural decisions and technical strategy',
    ],
    benefits: [
      'Competitive salary and equity',
      'Comprehensive health, dental, and vision insurance',
      'Unlimited PTO policy',
      '401(k) with company matching',
      'Professional development budget',
      'Flexible work arrangements',
    ],
    tags: ['React', 'Node.js', 'TypeScript', 'AWS', 'Full Stack'],
    postedAt: new Date('2025-01-15'),
    applicationDeadline: new Date('2025-02-28'),
    applicants: 42,
    featured: true,
    active: true,
  },
  {
    id: '2',
    title: 'Frontend Engineer',
    company: 'StartupHub',
    companyId: '2',
    companyLogo: '/companies/startuphub.png',
    location: 'New York, NY',
    type: 'full-time',
    experienceLevel: 'mid',
    remoteOption: 'remote',
    salary: {
      min: 100000,
      max: 140000,
      currency: 'USD',
      period: 'yearly',
    },
    description: `Join our dynamic team as a Frontend Engineer and help build the future of digital payments. You'll work on cutting-edge fintech products used by millions of users worldwide.`,
    requirements: [
      '3+ years of experience in frontend development',
      'Expert knowledge of React and React Native',
      'Strong understanding of JavaScript/TypeScript',
      'Experience with state management (Redux, MobX, or similar)',
      'Knowledge of responsive design and cross-browser compatibility',
      'Passion for creating exceptional user experiences',
    ],
    responsibilities: [
      'Build and maintain responsive web applications',
      'Collaborate with designers to implement pixel-perfect UIs',
      'Optimize applications for maximum speed and scalability',
      'Write clean, maintainable, and testable code',
      'Participate in agile development processes',
    ],
    benefits: [
      'Competitive salary with equity',
      'Health, dental, and vision insurance',
      'Flexible working hours',
      'Remote-first culture',
      'Learning and development stipend',
    ],
    tags: ['React', 'React Native', 'TypeScript', 'Fintech', 'Remote'],
    postedAt: new Date('2025-01-20'),
    applicants: 28,
    featured: false,
    active: true,
  },
  {
    id: '3',
    title: 'DevOps Engineer',
    company: 'Global Health Systems',
    companyId: '3',
    companyLogo: '/companies/globalhealth.png',
    location: 'Boston, MA',
    type: 'full-time',
    experienceLevel: 'senior',
    remoteOption: 'hybrid',
    salary: {
      min: 130000,
      max: 170000,
      currency: 'USD',
      period: 'yearly',
    },
    description: `We're seeking a DevOps Engineer to help us scale our healthcare platform. You'll work on critical infrastructure that powers applications used by healthcare providers nationwide.`,
    requirements: [
      '5+ years of DevOps/SRE experience',
      'Strong experience with AWS and cloud architecture',
      'Proficiency in Infrastructure as Code (Terraform, CloudFormation)',
      'Experience with container orchestration (Kubernetes)',
      'Knowledge of CI/CD pipelines and automation',
      'Understanding of HIPAA compliance and security best practices',
    ],
    responsibilities: [
      'Design and maintain scalable cloud infrastructure',
      'Implement and manage CI/CD pipelines',
      'Monitor system performance and ensure high availability',
      'Automate deployment and operational processes',
      'Ensure security and compliance standards are met',
      'Collaborate with development teams to improve deployment processes',
    ],
    benefits: [
      'Competitive compensation',
      'Excellent health coverage',
      '4 weeks PTO',
      'Parental leave policy',
      'Professional development opportunities',
      'Mission-driven work environment',
    ],
    tags: ['AWS', 'Kubernetes', 'Terraform', 'DevOps', 'Healthcare'],
    postedAt: new Date('2025-01-18'),
    applicants: 15,
    featured: true,
    active: true,
  },
  {
    id: '4',
    title: 'Junior Backend Developer',
    company: 'TechCorp Solutions',
    companyId: '1',
    companyLogo: '/companies/techcorp.png',
    location: 'Austin, TX',
    type: 'full-time',
    experienceLevel: 'entry',
    remoteOption: 'onsite',
    salary: {
      min: 70000,
      max: 90000,
      currency: 'USD',
      period: 'yearly',
    },
    description: `Start your career with TechCorp as a Junior Backend Developer. This is an excellent opportunity for recent graduates or early-career developers to learn from experienced engineers and work on impactful projects.`,
    requirements: [
      "Bachelor's degree in Computer Science or related field",
      'Understanding of programming fundamentals',
      'Knowledge of at least one backend language (Python, Java, or Node.js)',
      'Familiarity with databases and SQL',
      'Strong problem-solving skills',
      'Eagerness to learn and grow',
    ],
    responsibilities: [
      'Assist in developing and maintaining backend services',
      'Write unit tests and documentation',
      'Participate in code reviews and team meetings',
      'Learn and apply best practices in software development',
      'Collaborate with senior developers on feature implementation',
    ],
    benefits: [
      'Competitive entry-level salary',
      'Comprehensive benefits package',
      'Mentorship program',
      'Education reimbursement',
      'Clear career progression path',
      'Modern office with free meals',
    ],
    tags: ['Python', 'Node.js', 'Entry Level', 'Backend'],
    postedAt: new Date('2025-01-22'),
    applicants: 89,
    featured: false,
    active: true,
  },
  {
    id: '5',
    title: 'Product Designer',
    company: 'StartupHub',
    companyId: '2',
    companyLogo: '/companies/startuphub.png',
    location: 'Remote',
    type: 'full-time',
    experienceLevel: 'mid',
    remoteOption: 'remote',
    salary: {
      min: 90000,
      max: 130000,
      currency: 'USD',
      period: 'yearly',
    },
    description: `We're looking for a talented Product Designer to shape the user experience of our fintech products. You'll work closely with product managers and engineers to create intuitive, beautiful interfaces.`,
    requirements: [
      '3+ years of product design experience',
      'Strong portfolio demonstrating UI/UX skills',
      'Proficiency in Figma or similar design tools',
      'Understanding of design systems and component libraries',
      'Experience with user research and testing',
      'Excellent communication and presentation skills',
    ],
    responsibilities: [
      'Design user interfaces for web and mobile applications',
      'Create and maintain design systems',
      'Conduct user research and usability testing',
      'Collaborate with cross-functional teams',
      'Present design concepts to stakeholders',
      'Iterate on designs based on feedback and data',
    ],
    benefits: [
      'Remote work from anywhere',
      'Competitive compensation',
      'Health insurance stipend',
      'Home office setup budget',
      'Annual company retreats',
      'Equity compensation',
    ],
    tags: ['UI/UX', 'Product Design', 'Figma', 'Remote', 'Fintech'],
    postedAt: new Date('2025-01-19'),
    applicants: 56,
    featured: true,
    active: true,
  },
  {
    id: '6',
    title: 'Backend Engineer',
    company: 'TechCorp Solutions',
    companyId: '1',
    companyLogo: '/companies/techcorp.png',
    location: 'Austin, TX',
    type: 'full-time',
    experienceLevel: 'senior',
    remoteOption: 'onsite',
    salary: {
      min: 140000,
      max: 180000,
      currency: 'USD',
      period: 'yearly',
    },
    description:
      'Join our backend team to build scalable microservices and APIs that power our enterprise applications.',
    requirements: [
      '5+ years of backend development experience',
      'Expert in Python or Java',
      'Experience with microservices architecture',
      'Strong knowledge of databases and caching',
      'Experience with message queues and event-driven systems',
    ],
    responsibilities: [
      'Design and implement RESTful APIs',
      'Build scalable microservices',
      'Optimize database queries and system performance',
      'Implement security best practices',
      'Collaborate with frontend and DevOps teams',
    ],
    benefits: [
      'Competitive salary and equity',
      'Health insurance',
      '401(k) matching',
      'Relocation assistance',
      'Professional development budget',
    ],
    tags: ['Python', 'Java', 'Microservices', 'AWS', 'Backend'],
    postedAt: new Date('2025-01-20'),
    applicants: 38,
    featured: false,
    active: true,
  },
  {
    id: '7',
    title: 'Product Manager',
    company: 'InnovateTech',
    companyId: '3',
    companyLogo: '/companies/innovate.png',
    location: 'Seattle, WA',
    type: 'full-time',
    experienceLevel: 'mid',
    remoteOption: 'hybrid',
    salary: {
      min: 120000,
      max: 160000,
      currency: 'USD',
      period: 'yearly',
    },
    description:
      'Lead product development for our AI-powered analytics platform.',
    requirements: [
      '3+ years of product management experience',
      'Experience with B2B SaaS products',
      'Strong analytical and problem-solving skills',
      'Excellent communication skills',
      'Technical background preferred',
    ],
    responsibilities: [
      'Define product vision and strategy',
      'Work closely with engineering and design teams',
      'Conduct user research and gather feedback',
      'Prioritize features and manage roadmap',
      'Track product metrics and KPIs',
    ],
    benefits: [
      'Competitive compensation',
      'Stock options',
      'Flexible work schedule',
      'Health and wellness benefits',
      'Learning stipend',
    ],
    tags: ['Product Management', 'B2B', 'SaaS', 'Analytics', 'AI'],
    postedAt: new Date('2025-01-21'),
    applicants: 45,
    featured: false,
    active: true,
  },
  {
    id: '8',
    title: 'DevOps Engineer',
    company: 'CloudScale',
    companyId: '1',
    companyLogo: '/companies/cloudscale.png',
    location: 'Denver, CO',
    type: 'full-time',
    experienceLevel: 'senior',
    remoteOption: 'remote',
    salary: {
      min: 135000,
      max: 175000,
      currency: 'USD',
      period: 'yearly',
    },
    description: 'Help us build and maintain world-class cloud infrastructure.',
    requirements: [
      '5+ years of DevOps experience',
      'Expert in Kubernetes and Docker',
      'Strong knowledge of AWS or GCP',
      'Experience with Infrastructure as Code',
      'Proficient in scripting (Python, Bash)',
    ],
    responsibilities: [
      'Design and implement CI/CD pipelines',
      'Manage Kubernetes clusters',
      'Implement monitoring and alerting',
      'Automate infrastructure provisioning',
      'Ensure security and compliance',
    ],
    benefits: [
      'Remote-first culture',
      'Competitive salary',
      'Equity package',
      'Health insurance',
      'Conference budget',
    ],
    tags: ['DevOps', 'Kubernetes', 'AWS', 'Docker', 'CI/CD'],
    postedAt: new Date('2025-01-22'),
    applicants: 52,
    featured: true,
    active: true,
  },
  {
    id: '9',
    title: 'Data Scientist',
    company: 'DataInsights',
    companyId: '2',
    companyLogo: '/companies/datainsights.png',
    location: 'Boston, MA',
    type: 'full-time',
    experienceLevel: 'mid',
    remoteOption: 'hybrid',
    salary: {
      min: 110000,
      max: 150000,
      currency: 'USD',
      period: 'yearly',
    },
    description:
      'Join our data science team to build ML models and derive insights from large datasets.',
    requirements: [
      '3+ years of data science experience',
      'Strong knowledge of Python and R',
      'Experience with machine learning frameworks',
      'Proficient in SQL and data visualization',
      'MS in Computer Science or related field',
    ],
    responsibilities: [
      'Build and deploy machine learning models',
      'Analyze large datasets for insights',
      'Create data visualizations and reports',
      'Collaborate with product teams',
      'Present findings to stakeholders',
    ],
    benefits: [
      'Competitive salary',
      'Flexible work arrangements',
      'Health benefits',
      'Professional development',
      'Stock options',
    ],
    tags: ['Data Science', 'Machine Learning', 'Python', 'R', 'SQL'],
    postedAt: new Date('2025-01-18'),
    applicants: 67,
    featured: false,
    active: true,
  },
  {
    id: '10',
    title: 'QA Engineer',
    company: 'TechCorp Solutions',
    companyId: '1',
    companyLogo: '/companies/techcorp.png',
    location: 'Portland, OR',
    type: 'full-time',
    experienceLevel: 'entry',
    remoteOption: 'onsite',
    salary: {
      min: 70000,
      max: 90000,
      currency: 'USD',
      period: 'yearly',
    },
    description: 'Start your career in QA with our experienced team.',
    requirements: [
      '1+ years of QA experience',
      'Knowledge of testing methodologies',
      'Basic programming skills',
      'Attention to detail',
      'Good communication skills',
    ],
    responsibilities: [
      'Write and execute test cases',
      'Report and track bugs',
      'Perform regression testing',
      'Collaborate with developers',
      'Improve testing processes',
    ],
    benefits: [
      'Mentorship program',
      'Health insurance',
      'PTO',
      'Career growth opportunities',
      'Team events',
    ],
    tags: ['QA', 'Testing', 'Quality Assurance', 'Junior', 'Entry Level'],
    postedAt: new Date('2025-01-19'),
    applicants: 28,
    featured: false,
    active: true,
  },
  {
    id: '11',
    title: 'Mobile Developer',
    company: 'StartupHub',
    companyId: '2',
    companyLogo: '/companies/startuphub.png',
    location: 'San Francisco, CA',
    type: 'full-time',
    experienceLevel: 'mid',
    remoteOption: 'remote',
    salary: {
      min: 105000,
      max: 145000,
      currency: 'USD',
      period: 'yearly',
    },
    description: 'Build innovative mobile apps for iOS and Android platforms.',
    requirements: [
      '3+ years of mobile development',
      'Experience with React Native or Flutter',
      'Knowledge of iOS and Android platforms',
      'Understanding of mobile UI/UX',
      'App Store deployment experience',
    ],
    responsibilities: [
      'Develop cross-platform mobile apps',
      'Implement responsive UI designs',
      'Optimize app performance',
      'Integrate with backend APIs',
      'Maintain app store listings',
    ],
    benefits: [
      'Remote work',
      'Equity compensation',
      'Health benefits',
      'Equipment budget',
      'Flexible hours',
    ],
    tags: ['Mobile', 'React Native', 'Flutter', 'iOS', 'Android'],
    postedAt: new Date('2025-01-20'),
    applicants: 41,
    featured: false,
    active: true,
  },
  {
    id: '12',
    title: 'Security Engineer',
    company: 'SecureNet',
    companyId: '3',
    companyLogo: '/companies/securenet.png',
    location: 'Washington, DC',
    type: 'full-time',
    experienceLevel: 'senior',
    remoteOption: 'hybrid',
    salary: {
      min: 145000,
      max: 185000,
      currency: 'USD',
      period: 'yearly',
    },
    description: 'Lead security initiatives for our enterprise clients.',
    requirements: [
      '5+ years of security experience',
      'Security certifications (CISSP, CEH)',
      'Experience with penetration testing',
      'Knowledge of compliance frameworks',
      'Strong analytical skills',
    ],
    responsibilities: [
      'Conduct security assessments',
      'Implement security controls',
      'Respond to security incidents',
      'Develop security policies',
      'Train team on security practices',
    ],
    benefits: [
      'High compensation',
      'Security clearance sponsorship',
      'Professional certifications',
      'Health and dental',
      'Retirement plan',
    ],
    tags: [
      'Security',
      'Cybersecurity',
      'CISSP',
      'Penetration Testing',
      'Compliance',
    ],
    postedAt: new Date('2025-01-17'),
    applicants: 33,
    featured: false,
    active: true,
  },
  {
    id: '13',
    title: 'Technical Writer',
    company: 'TechCorp Solutions',
    companyId: '1',
    companyLogo: '/companies/techcorp.png',
    location: 'Remote',
    type: 'full-time',
    experienceLevel: 'mid',
    remoteOption: 'remote',
    salary: {
      min: 85000,
      max: 115000,
      currency: 'USD',
      period: 'yearly',
    },
    description: 'Create clear and comprehensive technical documentation.',
    requirements: [
      '3+ years of technical writing',
      'Experience with developer documentation',
      'Understanding of APIs and SDKs',
      'Excellent writing skills',
      'Basic programming knowledge',
    ],
    responsibilities: [
      'Write API documentation',
      'Create user guides and tutorials',
      'Maintain documentation standards',
      'Work with engineering teams',
      'Review and edit content',
    ],
    benefits: [
      'Fully remote',
      'Flexible schedule',
      'Health insurance',
      'Professional development',
      'Equipment allowance',
    ],
    tags: ['Technical Writing', 'Documentation', 'Remote', 'APIs', 'Content'],
    postedAt: new Date('2025-01-21'),
    applicants: 24,
    featured: false,
    active: true,
  },
  {
    id: '14',
    title: 'Cloud Architect',
    company: 'CloudScale',
    companyId: '3',
    companyLogo: '/companies/cloudscale.png',
    location: 'Chicago, IL',
    type: 'full-time',
    experienceLevel: 'senior',
    remoteOption: 'hybrid',
    salary: {
      min: 155000,
      max: 195000,
      currency: 'USD',
      period: 'yearly',
    },
    description: 'Design and implement cloud solutions for enterprise clients.',
    requirements: [
      '7+ years of cloud architecture experience',
      'AWS or Azure certifications',
      'Experience with large-scale systems',
      'Strong leadership skills',
      'Enterprise architecture knowledge',
    ],
    responsibilities: [
      'Design cloud architectures',
      'Lead migration projects',
      'Define best practices',
      'Mentor engineering teams',
      'Client consultations',
    ],
    benefits: [
      'Top-tier compensation',
      'Stock options',
      'Executive health plan',
      'Annual bonus',
      'Conference speaking opportunities',
    ],
    tags: ['Cloud', 'Architecture', 'AWS', 'Azure', 'Enterprise'],
    postedAt: new Date('2025-01-16'),
    applicants: 29,
    featured: true,
    active: true,
  },
  {
    id: '15',
    title: 'Marketing Manager',
    company: 'StartupHub',
    companyId: '2',
    companyLogo: '/companies/startuphub.png',
    location: 'Miami, FL',
    type: 'full-time',
    experienceLevel: 'mid',
    remoteOption: 'hybrid',
    salary: {
      min: 95000,
      max: 125000,
      currency: 'USD',
      period: 'yearly',
    },
    description:
      'Lead our marketing efforts to drive growth and brand awareness.',
    requirements: [
      '4+ years of marketing experience',
      'Experience with digital marketing',
      'Strong analytical skills',
      'Creative mindset',
      'Team leadership experience',
    ],
    responsibilities: [
      'Develop marketing strategies',
      'Manage marketing campaigns',
      'Analyze marketing metrics',
      'Lead marketing team',
      'Collaborate with sales',
    ],
    benefits: [
      'Competitive salary',
      'Performance bonus',
      'Health benefits',
      'Creative freedom',
      'Growth opportunities',
    ],
    tags: [
      'Marketing',
      'Digital Marketing',
      'Strategy',
      'Leadership',
      'Growth',
    ],
    postedAt: new Date('2025-01-18'),
    applicants: 58,
    featured: false,
    active: true,
  },
  {
    id: '16',
    title: 'Frontend Developer',
    company: 'InnovateTech',
    companyId: '3',
    companyLogo: '/companies/innovate.png',
    location: 'Phoenix, AZ',
    type: 'full-time',
    experienceLevel: 'entry',
    remoteOption: 'onsite',
    salary: {
      min: 65000,
      max: 85000,
      currency: 'USD',
      period: 'yearly',
    },
    description:
      'Join our frontend team as a junior developer and grow your skills.',
    requirements: [
      '1+ years of frontend experience',
      'Knowledge of React or Vue',
      'HTML, CSS, JavaScript skills',
      'Eager to learn',
      'Team player',
    ],
    responsibilities: [
      'Build user interfaces',
      'Implement designs',
      'Write clean code',
      'Fix bugs',
      'Learn from senior developers',
    ],
    benefits: [
      'Mentorship program',
      'Learning budget',
      'Health insurance',
      'Gym membership',
      'Team lunches',
    ],
    tags: ['Frontend', 'React', 'Junior', 'JavaScript', 'Entry Level'],
    postedAt: new Date('2025-01-19'),
    applicants: 72,
    featured: false,
    active: true,
  },
  {
    id: '17',
    title: 'Data Engineer',
    company: 'DataInsights',
    companyId: '2',
    companyLogo: '/companies/datainsights.png',
    location: 'Atlanta, GA',
    type: 'full-time',
    experienceLevel: 'senior',
    remoteOption: 'remote',
    salary: {
      min: 130000,
      max: 170000,
      currency: 'USD',
      period: 'yearly',
    },
    description:
      'Build and maintain data pipelines for our analytics platform.',
    requirements: [
      '5+ years of data engineering',
      'Experience with Apache Spark',
      'Strong SQL and Python skills',
      'Cloud platform experience',
      'ETL/ELT expertise',
    ],
    responsibilities: [
      'Design data pipelines',
      'Optimize data processing',
      'Maintain data quality',
      'Build data infrastructure',
      'Support data scientists',
    ],
    benefits: [
      'Remote work',
      'Competitive pay',
      'Stock options',
      'Healthcare',
      'Parental leave',
    ],
    tags: ['Data Engineering', 'Spark', 'Python', 'SQL', 'ETL'],
    postedAt: new Date('2025-01-20'),
    applicants: 44,
    featured: false,
    active: true,
  },
  {
    id: '18',
    title: 'Sales Engineer',
    company: 'TechCorp Solutions',
    companyId: '1',
    companyLogo: '/companies/techcorp.png',
    location: 'Dallas, TX',
    type: 'full-time',
    experienceLevel: 'mid',
    remoteOption: 'hybrid',
    salary: {
      min: 100000,
      max: 140000,
      currency: 'USD',
      period: 'yearly',
    },
    description: 'Bridge the gap between sales and engineering teams.',
    requirements: [
      '3+ years technical sales experience',
      'Engineering background',
      'Excellent presentation skills',
      'Customer-focused mindset',
      'Travel flexibility',
    ],
    responsibilities: [
      'Conduct technical demos',
      'Support sales team',
      'Understand customer needs',
      'Provide technical solutions',
      'Build customer relationships',
    ],
    benefits: [
      'Base + commission',
      'Travel expenses',
      'Health benefits',
      'Car allowance',
      'Sales incentives',
    ],
    tags: ['Sales', 'Engineering', 'Technical Sales', 'B2B', 'SaaS'],
    postedAt: new Date('2025-01-21'),
    applicants: 31,
    featured: false,
    active: true,
  },
  {
    id: '19',
    title: 'AI/ML Engineer',
    company: 'InnovateTech',
    companyId: '3',
    companyLogo: '/companies/innovate.png',
    location: 'San Francisco, CA',
    type: 'full-time',
    experienceLevel: 'senior',
    remoteOption: 'hybrid',
    salary: {
      min: 150000,
      max: 190000,
      currency: 'USD',
      period: 'yearly',
    },
    description: 'Lead AI/ML initiatives for our next-generation products.',
    requirements: [
      '5+ years ML experience',
      'PhD or MS in Computer Science',
      'Deep learning expertise',
      'Published research preferred',
      'Production ML experience',
    ],
    responsibilities: [
      'Design ML systems',
      'Train and deploy models',
      'Research new techniques',
      'Mentor junior engineers',
      'Present to stakeholders',
    ],
    benefits: [
      'Top compensation',
      'Research budget',
      'Conference attendance',
      'Stock options',
      'Sabbatical option',
    ],
    tags: ['AI', 'Machine Learning', 'Deep Learning', 'Python', 'Research'],
    postedAt: new Date('2025-01-22'),
    applicants: 27,
    featured: true,
    active: true,
  },
  {
    id: '20',
    title: 'HR Manager',
    company: 'GlobalHealth',
    companyId: '4',
    companyLogo: '/companies/globalhealth.png',
    location: 'Nashville, TN',
    type: 'full-time',
    experienceLevel: 'mid',
    remoteOption: 'onsite',
    salary: {
      min: 80000,
      max: 110000,
      currency: 'USD',
      period: 'yearly',
    },
    description: 'Lead HR initiatives for our growing healthcare organization.',
    requirements: [
      '4+ years HR experience',
      'SHRM certification preferred',
      'Healthcare industry knowledge',
      'Strong interpersonal skills',
      'Employment law knowledge',
    ],
    responsibilities: [
      'Manage HR operations',
      'Recruit and onboard',
      'Handle employee relations',
      'Develop HR policies',
      'Ensure compliance',
    ],
    benefits: [
      'Healthcare benefits',
      'Professional development',
      'Work-life balance',
      'Retirement plan',
      'Employee assistance program',
    ],
    tags: ['HR', 'Human Resources', 'Healthcare', 'Management', 'SHRM'],
    postedAt: new Date('2025-01-19'),
    applicants: 36,
    featured: false,
    active: true,
  },
  {
    id: '21',
    title: 'Systems Administrator',
    company: 'TechCorp Solutions',
    companyId: '1',
    companyLogo: '/companies/techcorp.png',
    location: 'San Francisco, CA',
    type: 'full-time',
    experienceLevel: 'mid',
    remoteOption: 'hybrid',
    salary: {
      min: 90000,
      max: 120000,
      currency: 'USD',
      period: 'yearly',
    },
    description: 'Manage and maintain our IT infrastructure.',
    requirements: [
      '3+ years of sysadmin experience',
      'Linux and Windows expertise',
      'Networking knowledge',
      'Security best practices',
      'Problem-solving skills',
    ],
    responsibilities: [
      'Manage servers and networks',
      'Implement security policies',
      'Monitor system performance',
      'Handle user support',
      'Document procedures',
    ],
    benefits: [
      'Health insurance',
      'PTO',
      '401(k)',
      'Training budget',
      'On-call compensation',
    ],
    tags: ['SysAdmin', 'Linux', 'Windows', 'Networking', 'IT'],
    postedAt: new Date('2025-01-23'),
    applicants: 19,
    featured: false,
    active: true,
  },
  {
    id: '22',
    title: 'Database Administrator',
    company: 'DataInsights',
    companyId: '2',
    companyLogo: '/companies/datainsights.png',
    location: 'Remote',
    type: 'full-time',
    experienceLevel: 'senior',
    remoteOption: 'remote',
    salary: {
      min: 120000,
      max: 160000,
      currency: 'USD',
      period: 'yearly',
    },
    description: 'Manage and optimize our database infrastructure.',
    requirements: [
      '5+ years DBA experience',
      'PostgreSQL and MySQL expertise',
      'Performance tuning skills',
      'Backup and recovery',
      'High availability setup',
    ],
    responsibilities: [
      'Database administration',
      'Performance optimization',
      'Backup strategies',
      'Security implementation',
      'Monitoring and alerts',
    ],
    benefits: [
      'Remote work',
      'Competitive salary',
      'Stock options',
      'Healthcare',
      'Learning budget',
    ],
    tags: ['DBA', 'PostgreSQL', 'MySQL', 'Database', 'Remote'],
    postedAt: new Date('2025-01-24'),
    applicants: 15,
    featured: false,
    active: true,
  },
  {
    id: '23',
    title: 'Junior Developer',
    company: 'StartupHub',
    companyId: '2',
    companyLogo: '/companies/startuphub.png',
    location: 'New York, NY',
    type: 'full-time',
    experienceLevel: 'entry',
    remoteOption: 'hybrid',
    salary: {
      min: 60000,
      max: 80000,
      currency: 'USD',
      period: 'yearly',
    },
    description: 'Start your development career with our mentorship program.',
    requirements: [
      'CS degree or bootcamp',
      'Basic programming skills',
      'Eager to learn',
      'Good communication',
      'Team player',
    ],
    responsibilities: [
      'Write clean code',
      'Learn from seniors',
      'Fix bugs',
      'Write tests',
      'Participate in reviews',
    ],
    benefits: [
      'Mentorship program',
      'Health insurance',
      'Learning budget',
      'Flexible hours',
      'Career growth',
    ],
    tags: ['Junior', 'Entry Level', 'JavaScript', 'React', 'Node.js'],
    postedAt: new Date('2025-01-25'),
    applicants: 89,
    featured: false,
    active: true,
  },
];

// Helper functions to filter and search jobs
export function searchJobs(query: string, location?: string): Job[] {
  return mockJobs.filter(job => {
    const matchesQuery =
      query === '' ||
      job.title.toLowerCase().includes(query.toLowerCase()) ||
      job.company.toLowerCase().includes(query.toLowerCase()) ||
      job.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase()));

    const matchesLocation =
      !location ||
      job.location.toLowerCase().includes(location.toLowerCase()) ||
      job.remoteOption === 'remote';

    return matchesQuery && matchesLocation;
  });
}

// Enhanced filter function with JobFilters support
export function filterJobs(filters: JobFilters): Job[] {
  return mockJobs.filter(job => {
    // Active jobs only
    if (!job.active) return false;

    // Search query
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      const matchesSearch =
        job.title.toLowerCase().includes(searchLower) ||
        job.company.toLowerCase().includes(searchLower) ||
        job.description.toLowerCase().includes(searchLower) ||
        job.tags.some(tag => tag.toLowerCase().includes(searchLower));
      if (!matchesSearch) return false;
    }

    // Location
    if (filters.location) {
      const locationLower = filters.location.toLowerCase();
      const matchesLocation =
        job.location.toLowerCase().includes(locationLower) ||
        job.remoteOption === 'remote';
      if (!matchesLocation) return false;
    }

    // Job type
    if (filters.type && filters.type.length > 0) {
      if (!filters.type.includes(job.type)) return false;
    }

    // Experience level
    if (filters.experienceLevel && filters.experienceLevel.length > 0) {
      if (!filters.experienceLevel.includes(job.experienceLevel)) return false;
    }

    // Remote option
    if (filters.remoteOption && filters.remoteOption.length > 0) {
      if (!filters.remoteOption.includes(job.remoteOption)) return false;
    }

    // Salary range
    if (filters.salaryMin !== undefined || filters.salaryMax !== undefined) {
      // Convert to yearly for comparison
      let yearlyMin = job.salary.min;
      let yearlyMax = job.salary.max;

      if (job.salary.period === 'hourly') {
        yearlyMin = job.salary.min * 2080; // 40 hours/week * 52 weeks
        yearlyMax = job.salary.max * 2080;
      } else if (job.salary.period === 'monthly') {
        yearlyMin = job.salary.min * 12;
        yearlyMax = job.salary.max * 12;
      }

      if (filters.salaryMin !== undefined && yearlyMax < filters.salaryMin)
        return false;
      if (filters.salaryMax !== undefined && yearlyMin > filters.salaryMax)
        return false;
    }

    // Tags
    if (filters.tags && filters.tags.length > 0) {
      const hasMatchingTag = filters.tags.some(tag =>
        job.tags.some(jobTag => jobTag.toLowerCase() === tag.toLowerCase()),
      );
      if (!hasMatchingTag) return false;
    }

    return true;
  });
}

export type SortOption = 'relevance' | 'date' | 'salary';

export function sortJobs(jobs: Job[], sortBy: SortOption = 'relevance'): Job[] {
  const sorted = [...jobs];

  switch (sortBy) {
    case 'date':
      return sorted.sort((a, b) => b.postedAt.getTime() - a.postedAt.getTime());

    case 'salary':
      return sorted.sort((a, b) => {
        // Convert to yearly for comparison
        const getYearlySalary = (job: Job) => {
          const avg = (job.salary.min + job.salary.max) / 2;
          if (job.salary.period === 'hourly') return avg * 2080;
          if (job.salary.period === 'monthly') return avg * 12;
          return avg;
        };
        return getYearlySalary(b) - getYearlySalary(a);
      });

    case 'relevance':
    default:
      // Featured jobs first, then by date
      return sorted.sort((a, b) => {
        if (a.featured && !b.featured) return -1;
        if (!a.featured && b.featured) return 1;
        return b.postedAt.getTime() - a.postedAt.getTime();
      });
  }
}

export function getJobById(id: string): Job | undefined {
  return mockJobs.find(job => job.id === id);
}

export function getCompanyById(id: string): Company | undefined {
  return mockCompanies.find(company => company.id === id);
}

export function getFeaturedJobs(): Job[] {
  return mockJobs.filter(job => job.featured && job.active);
}

export function getJobsByCompany(companyId: string): Job[] {
  return mockJobs.filter(job => job.companyId === companyId && job.active);
}

// Get related jobs based on tags, company, or location
export function getRelatedJobs(jobId: string, limit: number = 4): Job[] {
  const currentJob = getJobById(jobId);
  if (!currentJob) return [];

  // Score each job based on similarity
  const scoredJobs = mockJobs
    .filter(job => job.id !== jobId && job.active)
    .map(job => {
      let score = 0;

      // Same company (highest weight)
      if (job.companyId === currentJob.companyId) score += 5;

      // Same location
      if (job.location === currentJob.location) score += 3;

      // Same job type
      if (job.type === currentJob.type) score += 2;

      // Same experience level
      if (job.experienceLevel === currentJob.experienceLevel) score += 2;

      // Matching tags
      const matchingTags = job.tags.filter(tag =>
        currentJob.tags.includes(tag),
      ).length;
      score += matchingTags;

      return { job, score };
    })
    .filter(item => item.score > 0)
    .sort((a, b) => b.score - a.score);

  return scoredJobs.slice(0, limit).map(item => item.job);
}

// Job categories for browsing
export const jobCategories = [
  { name: 'Engineering', icon: '💻', count: 142 },
  { name: 'Design', icon: '🎨', count: 38 },
  { name: 'Product', icon: '📱', count: 27 },
  { name: 'Marketing', icon: '📣', count: 45 },
  { name: 'Sales', icon: '💼', count: 63 },
  { name: 'Operations', icon: '⚙️', count: 31 },
  { name: 'HR', icon: '👥', count: 19 },
  { name: 'Finance', icon: '💰', count: 24 },
];

// Pagination helper
export function paginateJobs(
  jobs: Job[],
  page: number,
  itemsPerPage: number = 10,
) {
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedJobs = jobs.slice(startIndex, endIndex);

  return {
    jobs: paginatedJobs,
    totalPages: Math.ceil(jobs.length / itemsPerPage),
    totalJobs: jobs.length,
    currentPage: page,
    hasNextPage: endIndex < jobs.length,
    hasPrevPage: page > 1,
  };
}