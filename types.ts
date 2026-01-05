
export enum SkillLevel {
  BEGINNER = 'Beginner',
  INTERMEDIATE = 'Intermediate',
  ADVANCED = 'Advanced',
  EXPERT = 'Expert'
}

export interface Skill {
  name: string;
  level: SkillLevel;
  category: string;
  isVerified?: boolean;
  endorsements?: number;
}

export interface PortfolioItem {
  title: string;
  description: string;
  link?: string;
  imageUrl?: string;
  date?: string;
  tags?: string[];
}

export interface Education {
  school: string;
  degree: string;
  field: string;
  startYear: string;
  endYear: string;
  description?: string;
}

export interface ProjectBrief {
  id: string;
  title: string;
  description: string;
  ownerId: string;
  neededSkills: string[];
  status: 'open' | 'in-progress' | 'completed';
  category: string;
  image?: string;
}

export interface Group {
  id: string;
  name: string;
  description: string;
  memberCount: number;
  tags: string[];
  image: string;
}

export type SocialSource = 'LinkedIn' | 'GitHub' | 'Discord' | 'Instagram' | 'SkillSwap Native';

export interface UserActivity {
  id: string;
  type: 'swap_completed' | 'project_joined' | 'skill_verified' | 'credit_earned';
  title: string;
  timestamp: string;
  meta?: string;
}

export interface CourseTime {
  skillName: string;
  hours: number;
  color: string;
}

export interface SwapNotification {
  id: string;
  from: string;
  avatar: string;
  message: string;
  time: string;
  isRead: boolean;
  type: 'request' | 'message' | 'rating';
}

export interface UserProfile {
  id: string;
  name: string;
  major: string;
  university: string;
  graduationYear?: string;
  status: 'Student' | 'Professional';
  source: SocialSource;
  bio: string;
  offeredSkills: Skill[];
  desiredSkills: string[];
  credits: number; 
  rating: number;
  totalSwaps: number;
  avatar: string;
  linkedInUrl?: string;
  githubUrl?: string;
  instagramUrl?: string;
  portfolio: PortfolioItem[];
  education: Education[];
  isAmbassador?: boolean;
  isFacultyEndorsed?: boolean;
  activeProjects?: string[]; 
  
  // Tracking fields
  timeSpentTotal: number; // in hours
  courseBreakdown: CourseTime[];
  activityHistory: UserActivity[];
  notifications: SwapNotification[];
}

export interface SkillMatch {
  user: UserProfile;
  matchScore: number;
  matchReason: string;
  commonGround: string[];
}

export interface LearningPathStep {
  title: string;
  description: string;
  suggestedUserId?: string;
}
