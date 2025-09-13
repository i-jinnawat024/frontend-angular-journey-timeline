import { Component, OnInit, signal, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { ThemeService } from '../../../../core/services/theme.service';

import { ProjectStatus, ProjectCategory } from '../../../../core/interfaces/project.interface';
import { ProjectService } from '../../services/project.service';
import { ProjectModel } from '../../models/timeline.model';

@Component({
  selector: 'app-timeline-page',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
    MatProgressSpinnerModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
  ],
  templateUrl: './timeline-page.component.html',
  styleUrls: ['./timeline-page.component.scss', '../../../../../styles.scss'],
})
export class TimelinePageComponent implements OnInit {
  private themeService = inject(ThemeService);
  currentTheme = this.themeService.currentTheme;
  projects = signal<ProjectModel[]>([]);
  loading = signal(true);
  searchTerm = '';
  selectedCategory = '';
  selectedStatus = '';
  
  // View mode state
  viewMode = signal<'monthly' | 'annual'>('monthly');

  categories = [
    { value: ProjectCategory.WEB_DEVELOPMENT, label: 'Web Development' },
    { value: ProjectCategory.MOBILE_DEVELOPMENT, label: 'Mobile Development' },
    { value: ProjectCategory.API_DEVELOPMENT, label: 'API Development' },
    { value: ProjectCategory.DESKTOP_APPLICATION, label: 'Desktop Application' },
    { value: ProjectCategory.DATA_ANALYSIS, label: 'Data Analysis' },
    { value: ProjectCategory.DEVOPS, label: 'DevOps' },
    { value: ProjectCategory.UI_UX_DESIGN, label: 'UI/UX Design' },
    { value: ProjectCategory.RESEARCH, label: 'Research' },
    { value: ProjectCategory.OTHER, label: 'อื่นๆ' },
  ];

  statuses = [
    { value: ProjectStatus.COMPLETED, label: 'เสร็จสิ้น' },
    { value: ProjectStatus.IN_PROGRESS, label: 'กำลังดำเนินการ' },
    { value: ProjectStatus.ON_HOLD, label: 'หยุดชั่วคราว' },
    { value: ProjectStatus.CANCELLED, label: 'ยกเลิก' },
  ];

  filteredProjects = computed(() => {
    let filtered = this.projects();

    if (this.searchTerm) {
      const term = this.searchTerm.toLowerCase();
      filtered = filtered.filter(
        (project) =>
          project.title.toLowerCase().includes(term) ||
          project.description.toLowerCase().includes(term) ||
          project.company.toLowerCase().includes(term) ||
          project.technologies.some((tech) => tech.toLowerCase().includes(term))
      );
    }

    if (this.selectedCategory) {
      filtered = filtered.filter((project) => project.category === this.selectedCategory);
    }

    if (this.selectedStatus) {
      filtered = filtered.filter((project) => project.status === this.selectedStatus);
    }

    return filtered.sort(
      (a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime()
    );
  });

  uniqueCompanies = computed(() => {
    const companies = this.projects().map((p) => p.company);
    return [...new Set(companies)];
  });

  uniqueTechnologies = computed(() => {
    const technologies = this.projects().flatMap((p) => p.technologies);
    return [...new Set(technologies)];
  });

  constructor(private projectService: ProjectService) {}

  ngOnInit() {
    this.loadProjects();
  }

  loadProjects() {
    this.loading.set(true);
    this.projectService.getAllProjects().subscribe({
      next: (response) => {
        if (response.success) {
          const projectModels = response.data
            ? response.data.map((project) => new ProjectModel(project))
            : [];
          this.projects.set(projectModels);
        }
        this.loading.set(false);
      },
      error: (error) => {
        console.error('Error loading projects:', error);
        this.loading.set(false);
      },
    });
  }

  onSearchChange() {
    // Trigger computed signal update
  }

  onFilterChange() {
    // Trigger computed signal update
  }

  trackByProjectId(index: number, project: ProjectModel): string {
    return project.id;
  }

  getStatusClass(status: ProjectStatus): string {
    return status.replace('_', '');
  }

  getStatusLabel(status: ProjectStatus): string {
    const statusMap = {
      [ProjectStatus.COMPLETED]: 'เสร็จสิ้น',
      [ProjectStatus.IN_PROGRESS]: 'กำลังดำเนินการ',
      [ProjectStatus.ON_HOLD]: 'หยุดชั่วคราว',
      [ProjectStatus.CANCELLED]: 'ยกเลิก',
    };
    return statusMap[status] || status;
  }

  formatProjectDuration(project: ProjectModel): string {
    return project.formattedDuration;
  }

  isLastProject(project: ProjectModel): boolean {
    const projects = this.filteredProjects();
    return projects[projects.length - 1]?.id === project.id;
  }

  viewProjectDetail(projectId: string) {
    // TODO: Navigate to project detail page
    console.log('View project detail:', projectId);
  }

  openProjectUrl(url: string, event: Event) {
    event.stopPropagation();
    window.open(url, '_blank');
  }

  toggleTheme() {
    this.themeService.toggleTheme();
  }

  setViewMode(mode: 'monthly' | 'annual') {
    this.viewMode.set(mode);
  }

  isActiveViewMode(mode: 'monthly' | 'annual'): boolean {
    return this.viewMode() === mode;
  }
}
