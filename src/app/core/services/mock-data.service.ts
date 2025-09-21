import { Injectable } from '@angular/core';
import { Observable, of, delay } from 'rxjs';
import { Project, ProjectStatus, ProjectCategory } from '../interfaces/project.interface';
import {
  ApiResponse,
  FilterOptions,
  PaginatedResponse,
  SortOptions,
} from '../interfaces/api.interface';

@Injectable({
  providedIn: 'root',
})
export class MockDataService {
  private mockProjects: Project[] = [
    {
      id: '1',
      title: 'Popup สินค้าใหม่',
      description:
        'API แสดงรายการสินค้าย้อนหลัง 7 วันโดยจะแสดงทั้งหมด 3 วัน ที่หน้าแรกของแอพพลิเคชัน ',
      company: 'Dplus Intertrade',
      role: 'Junior Backend Engineer',
      technologies: ['NestJs', 'MSSQL'],
      startDate: new Date('2025-05-30'),
      endDate: new Date('2025-06-06'),
      status: ProjectStatus.COMPLETED,
      category: ProjectCategory.API_DEVELOPMENT,
      achievements: [
        'การใช้งาน Redis สำหรับเก็บข้อมูล cache ของ API เพื่อเพิ่มความเร็วในการตอบสนอง',
      ],
      challenges: [
        'การเขียน NestJs ครั้งแรกซึ่งไม่เคยเขียนมาก่อน',
        'เรื่อง Performance ของ API ให้ใช้เวลาไม่เกิน 2 วินาที',
      ],
      teamSize: 2,
      projectUrl: 'https://acme.example.com',
      repositoryUrl: 'https://github.com/acme/web-redesign',
      images: [
        'https://lh3.googleusercontent.com/aida-public/AB6AXuAydvJGBCLUjjPNKfrOsB2m2rXIn3zorO5eZvQ6keCI1iWKcoO6B_HmANjv8db4JLFyPPn3r4XsIzFEUI5ghiG9nz-C3ZE7p8LcVDKj9IQWdqfZnP43oePalzrZyTtqO_gaMGWVfELf0ovl2tSaqfqwoFHJ6w9xkxrdx7r4qmbyE0X5crOQ2_jt4Q-hXNFREOkiD2fquOiaGA05lZWW36JXyD6Z0lY8FO0Zd_f0Cs2vF7cGF7vnr5FUluf1KvELVCvAjppec9JdynAP',
        'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=400&q=80',
      ],
    },
    {
      id: '2',
      title: 'Web สำหรับ Generate Tag',
      description: 'Web Generate Tag เหลืองของโปรโมชัน และอัพโหลดไปที่ Digital Ocean',
      company: 'Dplus Intertrade',
      role: 'Full-Stack Engineer',
      technologies: ['HTML', 'CSS', 'Javascript', 'DigitalOcean'],
      startDate: new Date('2025-06-09'),
      endDate: new Date('2025-06-13'),
      status: ProjectStatus.COMPLETED,
      category: ProjectCategory.WEB_DEVELOPMENT,
      achievements: ['ลดเวลาการทำงานของเดิม'],
      challenges: [],
      teamSize: 2,
      images: [],
    },
    {
      id: '3',
      title: 'Web Application อัปโหลด รุ่น UTYPE',
      description: 'ระบบอัพโหลด รุ่น UTYPE',
      company: 'Dplus Intertrade',
      role: 'Full-Stack Engineer',
      technologies: ['React.js', 'TypeScript', 'NestJs'],
      startDate: new Date('2025-06-16'),
      endDate: new Date('2025-06-27'),
      status: ProjectStatus.COMPLETED,
      category: ProjectCategory.WEB_DEVELOPMENT,
      achievements: ['ลดเวลาการทำงานของเดิม'],
      challenges: ['การเขียน React ครั้งแรก'],
      teamSize: 2,
    },
    {
      id: '4',
      title: 'Lucky gold',
      description: 'ระบบให้ร้านค้าสแกน QR code เพื่อได้รับสิทธิ์ลุ้นทอง',
      company: 'Dplus Intertrade',
      role: 'Junior Backend Engineer',
      technologies: ['NestJs', 'TypeScript', 'CQRS Pattern'],
      startDate: new Date('2025-07-01'),
      endDate: new Date('2025-07-31'),
      status: ProjectStatus.COMPLETED,
      category: ProjectCategory.API_DEVELOPMENT,
      achievements: ['Bug มีน้อย', 'การเรียนรู้ CQRS Pattern'],
      challenges: ['ไม่เคยเขียน CQRS Pattern มาก่อน'],
      teamSize: 8,
    },
    {
      id: '5',
      title: 'Promotion ให้สิทธิรายรหัสร้านค้า',
      description: 'Promotion สามารถเลือกได้ว่า ร้านไหนได้รับ ร้านไหนไม่ได้รับ',
      company: 'Dplus Intertrade',
      role: 'Junior Backend Engineer',
      technologies: ['NestJs', 'DigitalOcean', 'CQRS Pattern'],
      startDate: new Date('2025-08-01'),
      endDate: new Date('2025-08-15'),
      status: ProjectStatus.COMPLETED,
      category: ProjectCategory.API_DEVELOPMENT,
      achievements: [],
      challenges: [],
      teamSize: 4,
    },

    {
      id: '6',
      title: 'container + ci/cd',
      description: 'เขียน Dockerfile CI/CD',
      company: 'Dplus Intertrade',
      role: 'Junior Backend Engineer',
      technologies: ['DevOps'],
      startDate: new Date('2025-08-18'),
      endDate: new Date('2025-08-20'),
      status: ProjectStatus.COMPLETED,
      category: ProjectCategory.DEVOPS,
      achievements: [],
      challenges: [],
      teamSize: 4,
    },
    {
      id: '7',
      title: 'โปรเจคติดอาวุธ สำหรับแจกโปร QR',
      description: 'โปรเจคติดอาวุธ สำหรับแจกโปร QR',
      company: 'Dplus Intertrade',
      role: 'Junior Backend Engineer',
      technologies: ['NestJs', 'TypeScript', 'CQRS Pattern'],
      startDate: new Date('2025-08-25'),
      endDate: new Date('2025-08-29'),
      status: ProjectStatus.COMPLETED,
      category: ProjectCategory.DEVOPS,
      achievements: [],
      challenges: [],
      teamSize: 4,
    },
    {
      id: '8',
      title: 'Script Runner',
      description: 'ผู้ใช้งานทั่วไปสามารถเลือกคำสั่งและกดใช้งานได้เลย',
      company: 'Dplus Intertrade',
      role: 'Junior Backend Engineer',
      technologies: ['React.js', 'NestJs', 'TypeScript', 'CQRS Pattern'],
      startDate: new Date('2025-09-01'),
      endDate: undefined,
      status: ProjectStatus.IN_PROGRESS,
      category: ProjectCategory.WEB_DEVELOPMENT,
      achievements: [],
      challenges: [],
      teamSize: 4,
    },
  ];

  getProjects(): Observable<ApiResponse<Project[]>> {
    return of({
      data: this.mockProjects,
      success: true,
      timestamp: new Date(),
      message: 'Mock projects retrieved successfully',
    }).pipe(delay(300));
  }

  getProjectsPaginated(
    page: number = 1,
    limit: number = 10
  ): Observable<PaginatedResponse<Project[]>> {
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedProjects = this.mockProjects.slice(startIndex, endIndex);

    const response: PaginatedResponse<Project[]> = {
      success: true,
      data: paginatedProjects,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(this.mockProjects.length / limit),
        totalItems: this.mockProjects.length,
        itemsPerPage: limit,
      },
    };

    return of(response).pipe(delay(300));
  }

  getProjectsFiltered(
    filters: FilterOptions,
    sort?: SortOptions,
    page: number = 1,
    limit: number = 10
  ): Observable<PaginatedResponse<Project[]>> {
    let filteredProjects = [...this.mockProjects];

    if (filters.category) {
      filteredProjects = filteredProjects.filter((p) => p.category === filters.category);
    }

    if (filters.status) {
      filteredProjects = filteredProjects.filter((p) => p.status === filters.status);
    }

    if (filters.dateRange) {
      filteredProjects = filteredProjects.filter((p) => {
        const projectDate = new Date(p.startDate);
        return projectDate >= filters.dateRange!.start && projectDate <= filters.dateRange!.end;
      });
    }

    if (filters.tags && filters.tags.length) {
      filteredProjects = filteredProjects.filter((project) =>
        filters.tags!.every((tag) => project.tags?.includes(tag) || false)
      );
    }

    if (sort) {
      filteredProjects.sort((a, b) => {
        const aValue = (a as Record<string, any>)[sort.field];
        const bValue = (b as Record<string, any>)[sort.field];
        const comparison = aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
        return sort.direction === 'desc' ? -comparison : comparison;
      });
    }

    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedProjects = filteredProjects.slice(startIndex, endIndex);

    const response: PaginatedResponse<Project[]> = {
      success: true,
      data: paginatedProjects,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(filteredProjects.length / limit),
        totalItems: filteredProjects.length,
        itemsPerPage: limit,
      },
    };

    return of(response).pipe(delay(300));
  }

  getProjectsByCategory(category: ProjectCategory): Observable<ApiResponse<Project[]>> {
    const filteredProjects = this.mockProjects.filter((p) => p.category === category);
    return of({
      data: filteredProjects,
      success: true,
      timestamp: new Date(),
      message: `Projects in ${category} category retrieved`,
    }).pipe(delay(250));
  }

  getProjectsByStatus(status: ProjectStatus): Observable<ApiResponse<Project[]>> {
    const filteredProjects = this.mockProjects.filter((p) => p.status === status);
    return of({
      data: filteredProjects,
      success: true,
      timestamp: new Date(),
      message: `Projects with ${status} status retrieved`,
    }).pipe(delay(250));
  }

  searchProjects(
    query: string,
    page: number = 1,
    limit: number = 10
  ): Observable<PaginatedResponse<Project[]>> {
    const normalizedQuery = query.toLowerCase();
    const filteredProjects = this.mockProjects.filter((project) => {
      const haystack = [
        project.title,
        project.description,
        project.company,
        project.role,
        ...(project.tags || []),
      ]
        .join(' ')
        .toLowerCase();

      return haystack.includes(normalizedQuery);
    });

    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedProjects = filteredProjects.slice(startIndex, endIndex);

    const response: PaginatedResponse<Project[]> = {
      success: true,
      data: paginatedProjects,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(filteredProjects.length / limit),
        totalItems: filteredProjects.length,
        itemsPerPage: limit,
      },
    };

    return of(response).pipe(delay(250));
  }

  getAllTechnologies(): string[] {
    const allTech = this.mockProjects.flatMap((p) => p.technologies);
    return [...new Set(allTech)].sort();
  }

  getAllCompanies(): string[] {
    const allCompanies = this.mockProjects.map((p) => p.company);
    return [...new Set(allCompanies)].sort();
  }
}
