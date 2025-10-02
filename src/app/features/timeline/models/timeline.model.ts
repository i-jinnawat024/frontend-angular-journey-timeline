import { Project, TimelineEvent, ProjectStatus, ProjectCategory } from '../../../core/interfaces/project.interface';

export class ProjectModel implements Project {
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

  constructor(data: Partial<Project>) {
    this.id = data.id || '';
    this.title = data.title || '';
    this.description = data.description || '';
    this.company = data.company || '';
    this.role = data.role || '';
    this.technologies = data.technologies || [];
    this.startDate = data.startDate ? new Date(data.startDate) : new Date();
    this.endDate = data.endDate ? new Date(data.endDate) : undefined;
    this.status = data.status || ProjectStatus.COMPLETED;
    this.category = data.category || ProjectCategory.WEB_DEVELOPMENT;
    this.achievements = data.achievements || [];
    this.challenges = data.challenges || [];
    this.teamSize = data.teamSize;
    this.projectUrl = data.projectUrl;
    this.repositoryUrl = data.repositoryUrl;
    this.images = data.images || [];
    this.tags = data.tags || [];
  }

  get duration(): number {
    const end = this.endDate || new Date();
    const start = this.startDate;
    return Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
  }

  get isActive(): boolean {
    return this.status === ProjectStatus.IN_PROGRESS;
  }

  get formattedDuration(): string {
    const days = this.duration;
    if (days < 30) {
      return `${days} day${days === 1 ? '' : 's'}`;
    } else if (days < 365) {
      const months = Math.floor(days / 30);
      return `${months} month${months === 1 ? '' : 's'}`;
    } else {
      const years = Math.floor(days / 365);
      const remainingMonths = Math.floor((days % 365) / 30);
      const yearLabel = `${years} year${years === 1 ? '' : 's'}`;
      if (remainingMonths > 0) {
        return `${yearLabel} ${remainingMonths} month${remainingMonths === 1 ? '' : 's'}`;
      }
      return yearLabel;
    }
  }
}

export interface TimelineViewOptions {
  groupBy: 'year' | 'company' | 'category';
  sortBy: 'date' | 'title' | 'company';
  sortDirection: 'asc' | 'desc';
  showCompleted: boolean;
  showInProgress: boolean;
  showOnHold: boolean;
  selectedCategories: ProjectCategory[];
  selectedTechnologies: string[];
}



