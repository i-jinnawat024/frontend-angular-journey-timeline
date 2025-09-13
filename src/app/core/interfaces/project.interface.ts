export interface Project {
  id: string;
  title: string;
  description: string;
  company: string;
  role: string;
  technologies: string[];
  startDate: Date;
  endDate?: Date;
  status: ProjectStatus;
  category: ProjectCategory;
  achievements: string[];
  challenges: string[];
  teamSize?: number;
  projectUrl?: string;
  repositoryUrl?: string;
  images?: string[];
  tags: string[];
}

export enum ProjectStatus {
  COMPLETED = 'completed',
  IN_PROGRESS = 'in_progress',
  ON_HOLD = 'on_hold',
  CANCELLED = 'cancelled'
}

export enum ProjectCategory {
  WEB_DEVELOPMENT = 'web_development',
  MOBILE_DEVELOPMENT = 'mobile_development',
  DESKTOP_APPLICATION = 'desktop_application',
  API_DEVELOPMENT = 'api_development',
  DATA_ANALYSIS = 'data_analysis',
  DEVOPS = 'devops',
  UI_UX_DESIGN = 'ui_ux_design',
  RESEARCH = 'research',
  OTHER = 'other'
}

export interface TimelineEvent {
  id: string;
  projectId: string;
  title: string;
  description: string;
  date: Date;
  type: TimelineEventType;
  milestone?: boolean;
}

export enum TimelineEventType {
  PROJECT_START = 'project_start',
  PROJECT_END = 'project_end',
  MILESTONE = 'milestone',
  DEPLOYMENT = 'deployment',
  RELEASE = 'release',
  MEETING = 'meeting',
  ACHIEVEMENT = 'achievement',
  CHALLENGE = 'challenge'
}