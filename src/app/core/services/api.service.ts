import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map, finalize } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { ApiResponse, PaginatedResponse, FilterOptions, SortOptions } from '../interfaces/api.interface';
import { Project } from '../interfaces/project.interface';
import { LoadingService } from './loading.service';
import { ErrorService } from './error.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private readonly baseUrl = environment.apiBaseUrl;

  constructor(
    private http: HttpClient,
    private loadingService: LoadingService,
    private errorService: ErrorService
  ) {}


  getAllProjects(): Observable<ApiResponse<Project[]>> {
    const url = `${this.baseUrl}${environment.apiEndpoints.projects}`;
    this.loadingService.show();
    
    return this.http.get<ApiResponse<Project[]>>(url)
      .pipe(
        catchError((error) => this.handleError(error, 'ไม่สามารถดึงข้อมูลโปรเจคได้')),
        finalize(() => this.loadingService.hide())
      );
  }

  getProjectById(id: string): Observable<ApiResponse<Project>> {
    const url = `${this.baseUrl}${environment.apiEndpoints.project}/${id}`;
    this.loadingService.show();
    
    return this.http.get<ApiResponse<Project>>(url)
      .pipe(
        catchError((error) => this.handleError(error, 'ไม่สามารถดึงข้อมูลโปรเจคได้')),
        finalize(() => this.loadingService.hide())
      );
  }

  /**
   * ดึงข้อมูลโปรเจคแบบแบ่งหน้า
   */
  getProjects(page: number = 1, limit: number = 10): Observable<PaginatedResponse<Project[]>> {
    const url = `${this.baseUrl}${environment.apiEndpoints.projects}`;
    const params = new HttpParams()
      .set('page', page.toString())
      .set('limit', limit.toString());

    return this.http.get<PaginatedResponse<Project[]>>(url, { params })
      .pipe(
        catchError((error) => this.handleError(error, 'Failed to fetch projects'))
      );
  }

  /**
   * ดึงข้อมูลโปรเจคพร้อมการกรองและเรียงลำดับ
   */
  getProjectsWithFilters(
    filters?: FilterOptions,
    sort?: SortOptions,
    page: number = 1,
    limit: number = 10
  ): Observable<PaginatedResponse<Project[]>> {
    const url = `${this.baseUrl}${environment.apiEndpoints.projects}`;
    let params = new HttpParams()
      .set('page', page.toString())
      .set('limit', limit.toString());

    // เพิ่ม filters
    if (filters) {
      if (filters.category) {
        params = params.set('category', filters.category);
      }
      if (filters.status) {
        params = params.set('status', filters.status);
      }
      if (filters.tags && filters.tags.length > 0) {
        params = params.set('tags', filters.tags.join(','));
      }
      if (filters.dateRange) {
        params = params.set('startDate', filters.dateRange.start.toISOString());
        params = params.set('endDate', filters.dateRange.end.toISOString());
      }
    }

    // เพิ่ม sorting
    if (sort) {
      params = params.set('sortBy', sort.field);
      params = params.set('sortOrder', sort.direction);
    }

    return this.http.get<PaginatedResponse<Project[]>>(url, { params })
      .pipe(
        catchError((error) => this.handleError(error, 'Failed to fetch projects with filters'))
      );
  }

  /**
   * ค้นหาโปรเจค
   */
  searchProjects(
    query: string,
    page: number = 1,
    limit: number = 10
  ): Observable<PaginatedResponse<Project[]>> {
    const url = `${this.baseUrl}${environment.apiEndpoints.search}`;
    const params = new HttpParams()
      .set('q', query)
      .set('page', page.toString())
      .set('limit', limit.toString());

    return this.http.get<PaginatedResponse<Project[]>>(url, { params })
      .pipe(
        catchError((error) => this.handleError(error, 'Failed to search projects'))
      );
  }

  /**
   * สร้างโปรเจคใหม่
   */
  createProject(project: Omit<Project, 'id'>): Observable<ApiResponse<Project>> {
    const url = `${this.baseUrl}${environment.apiEndpoints.projects}`;
    return this.http.post<ApiResponse<Project>>(url, project)
      .pipe(
        catchError((error) => this.handleError(error, 'Failed to create project'))
      );
  }

  /**
   * อัพเดทโปรเจค
   */
  updateProject(id: string, project: Partial<Project>): Observable<ApiResponse<Project>> {
    const url = `${this.baseUrl}${environment.apiEndpoints.project}/${id}`;
    return this.http.put<ApiResponse<Project>>(url, project)
      .pipe(
        catchError((error) => this.handleError(error, 'Failed to update project'))
      );
  }

  /**
   * ลบโปรเจค
   */
  deleteProject(id: string): Observable<ApiResponse<void>> {
    const url = `${this.baseUrl}${environment.apiEndpoints.project}/${id}`;
    return this.http.delete<ApiResponse<void>>(url)
      .pipe(
        catchError((error) => this.handleError(error, 'Failed to delete project'))
      );
  }

  /**
   * จัดการ error
   */
  private handleError = (error: HttpErrorResponse, customMessage?: string): Observable<never> => {
    let errorMessage = customMessage || 'เกิดข้อผิดพลาดในการเชื่อมต่อ API';

    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Client Error: ${error.error.message}`;
    } else {
      // Server-side error
      switch (error.status) {
        case 0:
          errorMessage = 'ไม่สามารถเชื่อมต่อกับเซิร์ฟเวอร์ได้';
          break;
        case 400:
          errorMessage = 'ข้อมูลที่ส่งไม่ถูกต้อง';
          break;
        case 401:
          errorMessage = 'ไม่มีสิทธิ์เข้าถึง กรุณาเข้าสู่ระบบใหม่';
          break;
        case 403:
          errorMessage = 'ไม่มีสิทธิ์ในการดำเนินการนี้';
          break;
        case 404:
          errorMessage = 'ไม่พบข้อมูลที่ต้องการ';
          break;
        case 500:
          errorMessage = 'เกิดข้อผิดพลาดภายในเซิร์ฟเวอร์';
          break;
        default:
          errorMessage = `Server Error: ${error.status} - ${error.message}`;
          if (error.error && error.error.message) {
            errorMessage = error.error.message;
          }
      }
    }

    console.error('API Error:', errorMessage, error);
    this.errorService.showError(errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}