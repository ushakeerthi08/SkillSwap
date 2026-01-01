
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
}

export interface PortfolioItem {
  title: string;
  description: string;
  link?: string;
  imageUrl?: string;
}

export type SocialSource = 'LinkedIn' | 'GitHub' | 'Discord' | 'SkillSwap Native';

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
  portfolio: PortfolioItem[];
}

export interface Group {
  id: string;
  name: string;
  description: string;
  memberCount: number;
  tags: string[];
  image: string;
}

export interface SkillMatch {
  user: UserProfile;
  matchScore: number;
  matchReason: string;
  commonGround: string[];
}
