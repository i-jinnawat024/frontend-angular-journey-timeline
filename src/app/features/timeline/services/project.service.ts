import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import {
  Project,
  ProjectStatus,
  ProjectCategory,
} from '../../../core/interfaces/project.interface';
import {
  ApiResponse,
  PaginatedResponse,
  FilterOptions,
  SortOptions,
} from '../../../core/interfaces/api.interface';
import { ApiService } from '../../../core/services/api.service';
import { MockDataService } from '../../../core/services/mock-data.service';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  private readonly useApi = !environment.useMockData;

  constructor(private apiService: ApiService, private mockDataService: MockDataService) {}

  getAllProjects(): Observable<ApiResponse<Project[]>> {
    if (this.useApi) {
      return this.apiService.getAllProjects().pipe(
        catchError((error) => {
          console.warn('API call failed, falling back to mock data:', error);
          return this.mockDataService.getProjects();
        })
      );
    }
    return this.mockDataService.getProjects();
  }

  getProjectById(id: string): Observable<ApiResponse<Project>> {
    if (this.useApi) {
      return this.apiService.getProjectById(id).pipe(
        catchError((error) => {
          console.warn('API call failed, falling back to mock data:', error);
          return this.mockDataService.getProjects().pipe(
            map((response) => {
              if (response.success && response.data) {
                const project = response.data.find((p) => p.id === id);
                if (project) {
                  return { success: true, data: project };
                }
              }
              return { success: false, message: 'Project not found' };
            })
          );
        })
      );
    }
    return this.mockDataService.getProjects().pipe(
      map((response) => {
        if (response.success && response.data) {
          const project = response.data.find((p) => p.id === id);
          if (project) {
            return { success: true, data: project };
          }
        }
        return { success: false, message: 'Project not found' };
      })
    );
  }

  getProjects(page: number = 1, limit: number = 10): Observable<PaginatedResponse<Project[]>> {
    if (this.useApi) {
      return this.apiService.getProjects(page, limit).pipe(
        catchError((error) => {
          console.warn('API call failed, falling back to mock data:', error);
          return this.mockDataService.getProjectsPaginated(page, limit);
        })
      );
    }
    return this.mockDataService.getProjectsPaginated(page, limit);
  }

  getProjectsWithFilters(
    filters?: FilterOptions,
    sort?: SortOptions,
    page: number = 1,
    limit: number = 10
  ): Observable<PaginatedResponse<Project[]>> {
    if (this.useApi) {
      return this.apiService.getProjectsWithFilters(filters, sort, page, limit).pipe(
        catchError((error) => {
          console.warn('API call failed, falling back to mock data:', error);
          const defaultFilters: FilterOptions = filters || {};
          return this.mockDataService.getProjectsFiltered(defaultFilters, sort, page, limit);
        })
      );
    }
    const defaultFilters: FilterOptions = filters || {};
    return this.mockDataService.getProjectsFiltered(defaultFilters, sort, page, limit);
  }

  searchProjects(
    query: string,
    page: number = 1,
    limit: number = 10
  ): Observable<PaginatedResponse<Project[]>> {
    if (this.useApi) {
      return this.apiService.searchProjects(query, page, limit).pipe(
        catchError((error) => {
          console.warn('API call failed, falling back to mock data:', error);
          return this.mockDataService.searchProjects(query, page, limit);
        })
      );
    }
    return this.mockDataService.searchProjects(query, page, limit);
  }

  getAllTechnologies(): string[] {
    return this.mockDataService.getAllTechnologies();
  }

  getAllCompanies(): string[] {
    return this.mockDataService.getAllCompanies();
  }

  getFilteredProjects(
    filters?: FilterOptions,
    sort?: SortOptions
  ): Observable<ApiResponse<Project[]>> {
    return this.getAllProjects();
  }

  createProject(project: Omit<Project, 'id'>): Observable<ApiResponse<Project>> {
    if (this.useApi) {
      return this.apiService.createProject(project);
    }
    throw new Error('Create project not available with mock data');
  }

  updateProject(id: string, project: Partial<Project>): Observable<ApiResponse<Project>> {
    if (this.useApi) {
      return this.apiService.updateProject(id, project);
    }
    throw new Error('Update project not available with mock data');
  }

  deleteProject(id: string): Observable<ApiResponse<void>> {
    if (this.useApi) {
      return this.apiService.deleteProject(id);
    }
    throw new Error('Delete project not available with mock data');
  }
}

