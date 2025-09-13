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
      title: 'ระบบจัดการคลังสินค้า WMS',
      description: 'พัฒนาระบบจัดการคลังสินค้าแบบครบวงจร รองรับการติดตาม inventory real-time',
      company: 'บริษัท โลจิสติกส์ เอ็กซ์เพรส จำกัด',
      role: 'Senior Full-Stack Developer',
      technologies: ['Angular', 'Node.js', 'PostgreSQL', 'Redis', 'Docker'],
      startDate: new Date('2023-01-15'),
      endDate: new Date('2023-08-30'),
      status: ProjectStatus.COMPLETED,
      category: ProjectCategory.WEB_DEVELOPMENT,
      achievements: [
        'ลดเวลาการจัดการสินค้าได้ 40%',
        'เพิ่มความแม่นยำในการติดตาม inventory เป็น 99.5%',
        'รองรับการใช้งานพร้อมกันได้มากกว่า 100 users',
      ],
      challenges: [
        'การ sync ข้อมูล real-time ระหว่างหลาย warehouse',
        'การออกแบบ UI ที่ใช้งานง่ายสำหรับพนักงานทุกระดับ',
      ],
      teamSize: 8,
      tags: ['Enterprise', 'Real-time', 'Logistics'],
    },
    {
      id: '2',
      title: 'แอปพลิเคชัน E-Learning Platform',
      description:
        'พัฒนาแพลตฟอร์มการเรียนรู้ออนไลน์ รองรับ video streaming และ interactive content',
      company: 'สถาบันการศึกษาดิจิทัล',
      role: 'Frontend Lead Developer',
      technologies: ['React', 'TypeScript', 'WebRTC', 'Socket.io', 'AWS'],
      startDate: new Date('2022-09-01'),
      endDate: new Date('2023-02-28'),
      status: ProjectStatus.COMPLETED,
      category: ProjectCategory.WEB_DEVELOPMENT,
      achievements: [
        'รองรับผู้เรียนพร้อมกันได้มากกว่า 5,000 คน',
        'ลดต้นทุนการจัดการเรียนการสอนได้ 60%',
        'ได้รับรางวัล Best Educational Platform 2023',
      ],
      challenges: [
        'การจัดการ bandwidth สำหรับ video streaming',
        'การออกแบบ UX ที่เหมาะสำหรับทุกช่วงวัย',
      ],
      teamSize: 12,
      projectUrl: 'https://learning.example.com',
      tags: ['Education', 'Streaming', 'Interactive'],
    },
    {
      id: '3',
      title: 'Mobile Banking Application',
      description: 'พัฒนาแอปพลิเคชันธนาคารบนมือถือ รองรับการทำธุรกรรมทางการเงินครบวงจร',
      company: 'ธนาคารดิจิทัล แบงก์',
      role: 'Mobile Developer',
      technologies: ['Flutter', 'Dart', 'Firebase', 'Biometric Auth', 'Encryption'],
      startDate: new Date('2023-09-01'),
      endDate: undefined,
      status: ProjectStatus.IN_PROGRESS,
      category: ProjectCategory.MOBILE_DEVELOPMENT,
      achievements: [
        'ผ่านการตรวจสอบความปลอดภัยระดับธนาคาร',
        'รองรับการยืนยันตัวตนด้วย biometric',
        'ได้รับการรับรองมาตรฐาน ISO 27001',
      ],
      challenges: [
        'การรักษาความปลอดภัยข้อมูลทางการเงิน',
        'การออกแบบ UX ที่ใช้งานง่ายแต่ปลอดภัย',
        'การ integrate กับระบบ core banking เดิม',
      ],
      teamSize: 15,
      tags: ['FinTech', 'Security', 'Biometric', 'Real-time'],
    },
    {
      id: '4',
      title: 'IoT Dashboard สำหรับโรงงาน',
      description: 'พัฒนา dashboard สำหรับติดตามและควบคุมเครื่องจักรในโรงงานผ่าง IoT sensors',
      company: 'บริษัท สมาร์ท แมนูแฟคเจอริ่ง จำกัด',
      role: 'IoT Developer',
      technologies: ['Vue.js', 'Python', 'MQTT', 'InfluxDB', 'Grafana'],
      startDate: new Date('2022-03-01'),
      endDate: new Date('2022-11-15'),
      status: ProjectStatus.COMPLETED,
      category: ProjectCategory.WEB_DEVELOPMENT,
      achievements: [
        'ลดเวลา downtime ของเครื่องจักรได้ 35%',
        'เพิ่มประสิทธิภาพการผลิตได้ 25%',
        'ประหยัดค่าใช้จ่ายในการบำรุงรักษาได้ 50%',
      ],
      challenges: [
        'การจัดการข้อมูลจาก sensors จำนวนมาก',
        'การแสดงผลข้อมูล real-time ที่เข้าใจง่าย',
      ],
      teamSize: 6,
      tags: ['IoT', 'Manufacturing', 'Real-time', 'Analytics'],
    },
    {
      id: '5',
      title: 'API Gateway สำหรับ Microservices',
      description: 'พัฒนา API Gateway เพื่อจัดการและรักษาความปลอดภัยของ microservices',
      company: 'บริษัท คลาวด์ โซลูชั่น จำกัด',
      role: 'Backend Architect',
      technologies: ['Node.js', 'Express', 'Kong', 'JWT', 'Kubernetes'],
      startDate: new Date('2023-03-01'),
      endDate: new Date('2023-07-15'),
      status: ProjectStatus.COMPLETED,
      category: ProjectCategory.API_DEVELOPMENT,
      achievements: [
        'รองรับ traffic ได้มากกว่า 10,000 requests/second',
        'ลดเวลา response time เฉลี่ย 40%',
        'เพิ่มความปลอดภัยด้วย rate limiting และ authentication',
      ],
      challenges: [
        'การจัดการ load balancing ระหว่าง services',
        'การออกแบบ monitoring และ logging ที่มีประสิทธิภาพ',
      ],
      teamSize: 5,
      repositoryUrl: 'https://github.com/company/api-gateway',
      tags: ['Microservices', 'API', 'Security', 'Performance'],
    },
  ];

  getProjects(): Observable<ApiResponse<Project[]>> {
    return of({
      data: this.mockProjects,
      success: true,
      timestamp: new Date(),
      message: 'Projects retrieved successfully',
    }).pipe(delay(500)); // Simulate network delay
  }

  getProjectById(id: string): Observable<ApiResponse<Project | null>> {
    const project = this.mockProjects.find((p) => p.id === id) || null;
    return of({
      data: project,
      success: !!project,
      timestamp: new Date(),
      message: project ? 'Project found' : 'Project not found',
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

    return of(response).pipe(delay(500));
  }

  getProjectsFiltered(
    filters: FilterOptions,
    sort?: SortOptions,
    page: number = 1,
    limit: number = 10
  ): Observable<PaginatedResponse<Project[]>> {
    let filteredProjects = [...this.mockProjects];

    // Apply filters
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

    // Apply sorting
    if (sort) {
      filteredProjects.sort((a, b) => {
        const aValue = (a as any)[sort.field];
        const bValue = (b as any)[sort.field];
        const comparison = aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
        return sort.direction === 'desc' ? -comparison : comparison;
      });
    }

    // Apply pagination
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

    return of(response).pipe(delay(500));
  }

  getProjectsByCategory(category: ProjectCategory): Observable<ApiResponse<Project[]>> {
    const filteredProjects = this.mockProjects.filter((p) => p.category === category);
    return of({
      data: filteredProjects,
      success: true,
      timestamp: new Date(),
      message: `Projects in ${category} category retrieved`,
    }).pipe(delay(300));
  }

  getProjectsByStatus(status: ProjectStatus): Observable<ApiResponse<Project[]>> {
    const filteredProjects = this.mockProjects.filter((p) => p.status === status);
    return of({
      data: filteredProjects,
      success: true,
      timestamp: new Date(),
      message: `Projects with ${status} status retrieved`,
    }).pipe(delay(300));
  }

  searchProjects(
    query: string,
    page: number = 1,
    limit: number = 10
  ): Observable<PaginatedResponse<Project[]>> {
    const filteredProjects = this.mockProjects.filter(
      (project) =>
        project.title.toLowerCase().includes(query.toLowerCase()) ||
        project.description.toLowerCase().includes(query.toLowerCase())
    );

    // Apply pagination
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

  getAllTechnologies(): string[] {
    const allTech = this.mockProjects.flatMap((p) => p.technologies);
    return [...new Set(allTech)].sort();
  }

  getAllCompanies(): string[] {
    const allCompanies = this.mockProjects.map((p) => p.company);
    return [...new Set(allCompanies)].sort();
  }
}
