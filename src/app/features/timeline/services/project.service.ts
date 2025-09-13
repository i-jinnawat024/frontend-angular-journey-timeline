import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Project, ProjectStatus, ProjectCategory } from '../../../core/interfaces/project.interface';
import { ApiResponse, PaginatedResponse, FilterOptions, SortOptions } from '../../../core/interfaces/api.interface';
import { MockDataService } from '../../../core/services/mock-data.service';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  constructor(private mockDataService: MockDataService) {}

  /**
   * ดึงข้อมูลโปรเจคทั้งหมด
   */
  getAllProjects(): Observable<ApiResponse<Project[]>> {
    return this.mockDataService.getProjects();
  }

  /**
   * ดึงข้อมูลโปรเจคตาม ID
   */
  getProjectById(id: string): Observable<ApiResponse<Project>> {
    return this.mockDataService.getProjects().pipe(
      map(response => {
        if (response.success && response.data) {
          const project = response.data.find(p => p.id === id);
          if (project) {
            return { success: true, data: project };
          }
        }
        return { success: false, message: 'Project not found' };
      })
    );
  }

  /**
   * ดึงข้อมูลโปรเจคแบบแบ่งหน้า
   */
  getProjects(page: number = 1, limit: number = 10): Observable<PaginatedResponse<Project[]>> {
    return this.mockDataService.getProjectsPaginated(page, limit);
  }

  /**
   * ดึงข้อมูลโปรเจคพร้อมการกรองและเรียงลำดับ
   */
  getProjectsWithFilters(filters?: FilterOptions, sort?: SortOptions, page: number = 1, limit: number = 10): Observable<PaginatedResponse<Project[]>> {
    const defaultFilters: FilterOptions = filters || {};
    return this.mockDataService.getProjectsFiltered(defaultFilters, sort, page, limit);
  }

  /**
   * ค้นหาโปรเจค
   */
  searchProjects(
    query: string,
    page: number = 1,
    limit: number = 10
  ): Observable<PaginatedResponse<Project[]>> {
    return this.mockDataService.searchProjects(query, page, limit);
  }

  /**
   * ดึงรายการเทคโนโลยีทั้งหมด
   */
  getAllTechnologies(): string[] {
    return this.mockDataService.getAllTechnologies();
  }

  /**
   * ดึงรายการบริษัททั้งหมด
   */
  getAllCompanies(): string[] {
    return this.mockDataService.getAllCompanies();
  }

  /**
   * กรองและเรียงลำดับโปรเจค (สำหรับใช้ในอนาคต)
   */
  getFilteredProjects(
    filters?: FilterOptions,
    sort?: SortOptions
  ): Observable<ApiResponse<Project[]>> {
    // ในอนาคตจะเชื่อมต่อกับ API จริง
    // ตอนนี้ใช้ mock data ก่อน
    return this.getAllProjects();
  }

  /**
   * สร้างโปรเจคใหม่ (สำหรับใช้ในอนาคต)
   */
  createProject(project: Omit<Project, 'id'>): Observable<ApiResponse<Project>> {
    // TODO: Implement when backend API is ready
    throw new Error('Not implemented yet');
  }

  /**
   * อัพเดทโปรเจค (สำหรับใช้ในอนาคต)
   */
  updateProject(id: string, project: Partial<Project>): Observable<ApiResponse<Project>> {
    // TODO: Implement when backend API is ready
    throw new Error('Not implemented yet');
  }

  /**
   * ลบโปรเจค (สำหรับใช้ในอนาคต)
   */
  deleteProject(id: string): Observable<ApiResponse<void>> {
    // TODO: Implement when backend API is ready
    throw new Error('Not implemented yet');
  }
}