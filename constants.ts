
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
  'Graphic Design', 'Project Management', 'Financial Modeling', 'Web Designing', 
  'App Developer', 'Designer', 'Content Creation'
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
    bio: 'Passionate about full-stack development and open source. Building the next gen of dev tools.',
    offeredSkills: [
      { name: 'React', level: SkillLevel.ADVANCED, category: 'Software Development', isVerified: true, endorsements: 24 },
      { name: 'Node.js', level: SkillLevel.INTERMEDIATE, category: 'Software Development', isVerified: true, endorsements: 12 },
      { name: 'Java', level: SkillLevel.ADVANCED, category: 'Software Development', isVerified: true }
    ],
    desiredSkills: ['UI/UX Design', 'Figma', 'Photography'],
    credits: 12,
    rating: 4.9,
    totalSwaps: 15,
    avatar: 'https://i.pravatar.cc/150?u=alex',
    githubUrl: 'https://github.com/arivera-dev',
    linkedInUrl: 'https://linkedin.com/in/alexrivera',
    education: [
      { 
        school: 'Tech State University', 
        degree: 'Bachelor of Science', 
        field: 'Computer Science', 
        startYear: '2020', 
        endYear: '2024',
        description: 'Focused on distributed systems and cryptography. Lead developer for the university\'s open-source club.'
      }
    ],
    portfolio: [
      { title: 'OS Kernel Mod', description: 'Contributor to a custom Linux kernel optimization project.', imageUrl: 'https://images.unsplash.com/photo-1518433278993-0a7df1849bc2?w=400&h=250&fit=crop', tags: ['C++', 'Kernel'] }
    ],
    timeSpentTotal: 45,
    courseBreakdown: [
      { skillName: 'React', hours: 25, color: 'bg-blue-500' },
      { skillName: 'Java', hours: 20, color: 'bg-orange-500' }
    ],
    activityHistory: [],
    notifications: []
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
    bio: 'Digital illustrator and UX enthusiast. I love teaching Figma and color theory to developers.',
    offeredSkills: [
      { name: 'Figma', level: SkillLevel.EXPERT, category: 'Design & Creative', isVerified: true, endorsements: 45 },
      { name: 'Graphic Design', level: SkillLevel.ADVANCED, category: 'Design & Creative', isVerified: true },
      { name: 'Designer', level: SkillLevel.EXPERT, category: 'Design & Creative' }
    ],
    desiredSkills: ['React', 'Web Designing'],
    credits: 8,
    rating: 4.8,
    totalSwaps: 10,
    avatar: 'https://i.pravatar.cc/150?u=sarah',
    linkedInUrl: 'https://linkedin.com/in/schen-art',
    instagramUrl: 'https://instagram.com/sarahchen_pixels',
    education: [
      { 
        school: 'Academy of Art', 
        degree: 'Master of Fine Arts', 
        field: 'Digital Media', 
        startYear: '2018', 
        endYear: '2022',
        description: 'Thesis focused on accessible design for neurodivergent users. Awarded "Best Graduate Portfolio" in 2022.'
      }
    ],
    portfolio: [
      { title: 'EcoRoots Branding', description: 'Brand identity for a sustainable farming collective.', imageUrl: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=400&h=250&fit=crop', tags: ['Branding', 'Figma'] }
    ],
    timeSpentTotal: 30,
    courseBreakdown: [
      { skillName: 'Figma', hours: 20, color: 'bg-purple-500' },
      { skillName: 'Graphic Design', hours: 10, color: 'bg-pink-500' }
    ],
    activityHistory: [],
    notifications: []
  },
  {
    id: '3',
    name: 'Marcus Thorne',
    major: 'Marketing',
    university: 'Global Business School',
    status: 'Student',
    source: 'Instagram',
    bio: 'Content creator and social media strategist. I can help you build your personal brand.',
    offeredSkills: [
      { name: 'Content Creation', level: SkillLevel.ADVANCED, category: 'Marketing & Business', isVerified: true },
      { name: 'Photography', level: SkillLevel.INTERMEDIATE, category: 'Design & Creative' }
    ],
    desiredSkills: ['Video Editing', 'App Developer'],
    credits: 22,
    rating: 4.7,
    totalSwaps: 5,
    avatar: 'https://i.pravatar.cc/150?u=marcus',
    instagramUrl: 'https://instagram.com/marcusthorne_vlogs',
    education: [
      { 
        school: 'Global Business School', 
        degree: 'BBA', 
        field: 'Marketing', 
        startYear: '2021', 
        endYear: '2025',
        description: 'Minor in psychology. President of the Digital Marketing Association.'
      }
    ],
    portfolio: [],
    timeSpentTotal: 12,
    courseBreakdown: [
      { skillName: 'Content Creation', hours: 8, color: 'bg-rose-500' },
      { skillName: 'Photography', hours: 4, color: 'bg-teal-500' }
    ],
    activityHistory: [],
    notifications: []
  },
  {
    id: '4',
    name: 'Elena Rodriguez',
    major: 'Software Engineering',
    university: 'Tech State University',
    status: 'Student',
    source: 'GitHub',
    bio: 'Mobile-first developer. I build iOS and Android apps using React Native.',
    offeredSkills: [
      { name: 'App Developer', level: SkillLevel.ADVANCED, category: 'Software Development', isVerified: true },
      { name: 'Web Designing', level: SkillLevel.INTERMEDIATE, category: 'Software Development' }
    ],
    desiredSkills: ['Java', 'UI/UX Design'],
    credits: 15,
    rating: 4.9,
    totalSwaps: 12,
    avatar: 'https://i.pravatar.cc/150?u=elena',
    githubUrl: 'https://github.com/elena-codes',
    education: [
      { 
        school: 'Tech State University', 
        degree: 'B.S.', 
        field: 'Software Engineering', 
        startYear: '2022', 
        endYear: '2026',
        description: 'Focusing on cross-platform frameworks and UX research. Active contributor to 3 major mobile OS libraries.'
      }
    ],
    portfolio: [
      { title: 'FitPulse App', description: 'A mobile fitness tracker with social features.', imageUrl: 'https://images.unsplash.com/photo-1510070112810-d4e9a46d9e91?w=400&h=250&fit=crop', tags: ['React Native', 'Mobile'] }
    ],
    timeSpentTotal: 40,
    courseBreakdown: [
      { skillName: 'App Development', hours: 30, color: 'bg-indigo-500' },
      { skillName: 'Web Design', hours: 10, color: 'bg-blue-400' }
    ],
    activityHistory: [],
    notifications: []
  }
];

export const MOCK_GROUPS: Group[] = [
  {
    id: 'g1',
    name: 'Open Source Pioneers',
    description: 'A hub for students contributing to major OS projects.',
    memberCount: 1240,
    tags: ['GitHub', 'Backend'],
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400&h=250&fit=crop'
  }
];
