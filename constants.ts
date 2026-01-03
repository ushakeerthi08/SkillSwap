
import { UserProfile, SkillLevel, Group, ProjectBrief } from './types';

export const SKILL_CATEGORIES = [
  'Software Development',
  'Design & Creative',
  'Marketing & Business',
  'Communication & Languages',
  'Academics & Science',
  'Lifestyle & Practical'
];

export const AVAILABLE_SKILLS = [
  'React', 'Node.js', 'Python', 'UI/UX Design', 'Figma', 'Video Editing', 
  'Digital Marketing', 'Data Structures', 'Public Speaking', 'Spanish', 
  'Photography', 'Business Strategy', 'Content Writing', 'Java', 'Machine Learning',
  'Graphic Design', 'Project Management', 'Financial Modeling'
];

export const MOCK_PROJECTS: ProjectBrief[] = [
  {
    id: 'p1',
    title: 'EcoTrack Mobile App',
    description: 'Building a community-driven app to track local carbon footprints. Looking for a UI Designer to teach me Figma while I build the backend.',
    ownerId: '1',
    neededSkills: ['UI/UX Design', 'Figma'],
    status: 'open',
    category: 'Software Development',
    image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=400&h=250&fit=crop'
  },
  {
    id: 'p2',
    title: 'Student Wellness Portal',
    description: 'A resource hub for mental health. Need a content strategist to help with messaging while I handle the React architecture.',
    ownerId: '2',
    neededSkills: ['Content Writing', 'Digital Marketing'],
    status: 'open',
    category: 'Software Development',
    image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=400&h=250&fit=crop'
  }
];

export const MOCK_USERS: UserProfile[] = [
  {
    id: '1',
    name: 'Alex Rivera',
    major: 'Computer Science',
    university: 'Tech State University',
    graduationYear: '2024',
    status: 'Student',
    source: 'GitHub',
    isAmbassador: true,
    bio: 'Passionate about full-stack development and open source. Building the next gen of dev tools. I serve as a Student Ambassador to help freshmen get into web dev.',
    offeredSkills: [
      { name: 'React', level: SkillLevel.ADVANCED, category: 'Software Development', isVerified: true, endorsements: 24 },
      { name: 'Node.js', level: SkillLevel.INTERMEDIATE, category: 'Software Development', isVerified: true, endorsements: 12 }
    ],
    desiredSkills: ['UI/UX Design', 'Figma'],
    credits: 12,
    rating: 4.9,
    totalSwaps: 15,
    avatar: 'https://i.pravatar.cc/150?u=alex',
    linkedInUrl: 'https://linkedin.com/in/alexrivera',
    githubUrl: 'https://github.com/alexrivera',
    instagramUrl: 'https://instagram.com/alex_dev',
    education: [
      { school: 'Tech State University', degree: 'B.S.', field: 'Computer Science', startYear: '2020', endYear: '2024' }
    ],
    portfolio: [
      { 
        title: 'TaskMaster Pro', 
        description: 'A productivity app built with React and Firebase. Featured in the University App Showcase.', 
        imageUrl: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=400&h=250&fit=crop',
        tags: ['React', 'Firebase', 'SAAS']
      },
      { 
        title: 'DevFlow', 
        description: 'Real-time collaborative code editor with WebSocket support. Used by 50+ students in my cohort.', 
        imageUrl: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=250&fit=crop',
        tags: ['WebSockets', 'Node.js']
      }
    ]
  },
  {
    id: '2',
    name: 'Sarah Chen',
    major: 'Visual Arts',
    university: 'Academy of Art',
    graduationYear: '2022',
    status: 'Professional',
    source: 'LinkedIn',
    isFacultyEndorsed: true,
    bio: 'Digital illustrator and UX enthusiast working as a Junior Designer. Passionate about color theory. Endorsed by Professor Miller for Design Systems.',
    offeredSkills: [
      { name: 'Figma', level: SkillLevel.EXPERT, category: 'Design & Creative', isVerified: true, endorsements: 45 },
      { name: 'Graphic Design', level: SkillLevel.ADVANCED, category: 'Design & Creative', isVerified: true, endorsements: 31 }
    ],
    desiredSkills: ['React', 'Web Development'],
    credits: 8,
    rating: 4.8,
    totalSwaps: 10,
    avatar: 'https://i.pravatar.cc/150?u=sarah',
    linkedInUrl: 'https://linkedin.com/in/sarahchen',
    instagramUrl: 'https://instagram.com/sarah_draws',
    education: [
      { school: 'Academy of Art', degree: 'M.F.A.', field: 'Visual Arts & UX Design', startYear: '2018', endYear: '2022' }
    ],
    portfolio: [
      { 
        title: 'Brand Identity: EcoRoots', 
        description: 'Complete branding package for a sustainable startup focusing on organic materials.', 
        imageUrl: 'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=400&h=250&fit=crop',
        tags: ['Branding', 'Vector Art']
      },
      { 
        title: 'Mobile App Concept', 
        description: 'A health-tracking app UI/UX design with dark mode support. Case study published on Medium.', 
        imageUrl: 'https://images.unsplash.com/photo-1551288049-bbbda536639a?w=400&h=250&fit=crop',
        tags: ['UX Case Study', 'Mobile']
      }
    ]
  },
  {
    id: '3',
    name: 'Prof. David Vance',
    major: 'Applied Mathematics',
    university: 'Central University',
    status: 'Professional',
    source: 'SkillSwap Native',
    isFacultyEndorsed: true,
    bio: 'Department Head and Lead Tutor. Offering advanced math coaching in exchange for basic tech automation help for the lab.',
    offeredSkills: [
      { name: 'Linear Algebra', level: SkillLevel.EXPERT, category: 'Academics & Science', isVerified: true, endorsements: 120 },
      { name: 'Calculus', level: SkillLevel.EXPERT, category: 'Academics & Science', isVerified: true, endorsements: 95 }
    ],
    desiredSkills: ['Python Automation', 'Data Visualization'],
    credits: 50,
    rating: 5.0,
    totalSwaps: 89,
    avatar: 'https://i.pravatar.cc/150?u=prof_vance',
    education: [
      { school: 'MIT', degree: 'Ph.D.', field: 'Applied Mathematics', startYear: '2010', endYear: '2015' }
    ],
    portfolio: [
      { 
        title: 'Geometric Theory Paper', 
        description: 'Research into non-Euclidean spaces.', 
        imageUrl: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?w=400&h=250&fit=crop',
        tags: ['Academic', 'Math']
      }
    ]
  }
];

export const MOCK_GROUPS: Group[] = [
  {
    id: 'g1',
    name: 'Open Source Pioneers',
    description: 'A hub for students contributing to major OS projects. Python, Rust, and Go lovers welcome.',
    memberCount: 1240,
    tags: ['GitHub', 'Backend', 'Collaboration'],
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400&h=250&fit=crop'
  },
  {
    id: 'g2',
    name: 'Product Design Circle',
    description: 'Weekly Figma challenges and UI/UX critiques for aspiring product designers.',
    memberCount: 850,
    tags: ['Figma', 'UX', 'Aesthetics'],
    image: 'https://images.unsplash.com/photo-1558655146-d09347e92766?w=400&h=250&fit=crop'
  }
];
