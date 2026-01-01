
import { UserProfile, SkillLevel, Group } from './types';

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
  },
  {
    id: 'g3',
    name: 'AI Ethicists',
    description: 'Discussing the future of LLMs and responsible AI deployment in student projects.',
    memberCount: 420,
    tags: ['AI', 'Philosophy', 'Machine Learning'],
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=250&fit=crop'
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
    bio: 'Passionate about full-stack development and open source. Building the next gen of dev tools.',
    offeredSkills: [
      { name: 'React', level: SkillLevel.ADVANCED, category: 'Software Development' },
      { name: 'Node.js', level: SkillLevel.INTERMEDIATE, category: 'Software Development' }
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
      { title: 'TaskMaster Pro', description: 'A productivity app built with React and Firebase.', imageUrl: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=400&h=250&fit=crop' },
      { title: 'DevFlow', description: 'Real-time collaborative code editor with WebSocket support.', imageUrl: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=250&fit=crop' }
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
    bio: 'Digital illustrator and UX enthusiast working as a Junior Designer. Passionate about color theory.',
    offeredSkills: [
      { name: 'Figma', level: SkillLevel.EXPERT, category: 'Design & Creative' },
      { name: 'Graphic Design', level: SkillLevel.ADVANCED, category: 'Design & Creative' }
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
      { title: 'Brand Identity: EcoRoots', description: 'Complete branding package for a sustainable startup focusing on organic materials.', imageUrl: 'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=400&h=250&fit=crop' },
      { title: 'Mobile App Concept', description: 'A health-tracking app UI/UX design with dark mode support.', imageUrl: 'https://images.unsplash.com/photo-1551288049-bbbda536639a?w=400&h=250&fit=crop' }
    ]
  },
  {
    id: '3',
    name: 'Jordan Smith',
    major: 'Marketing',
    university: 'Westside College',
    graduationYear: '2025',
    status: 'Student',
    source: 'Instagram',
    bio: 'Growth hacker in the making. Community building is my superpower.',
    offeredSkills: [
      { name: 'Digital Marketing', level: SkillLevel.ADVANCED, category: 'Marketing & Business' },
      { name: 'Content Writing', level: SkillLevel.INTERMEDIATE, category: 'Communication & Languages' }
    ],
    desiredSkills: ['Video Editing', 'Python'],
    credits: 5,
    rating: 4.7,
    totalSwaps: 6,
    avatar: 'https://i.pravatar.cc/150?u=jordan',
    instagramUrl: 'https://instagram.com/jordan_marketing',
    education: [
      { school: 'Westside College', degree: 'B.A.', field: 'Marketing & Comm', startYear: '2021', endYear: '2025' }
    ],
    portfolio: [
      { title: 'SEO Case Study', description: 'How I increased organic traffic by 200% for a local non-profit within 6 months.', imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=250&fit=crop' }
    ]
  }
];
