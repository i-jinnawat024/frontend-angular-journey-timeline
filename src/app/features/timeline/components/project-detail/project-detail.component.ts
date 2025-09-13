import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDividerModule } from '@angular/material/divider';
import { MatTabsModule } from '@angular/material/tabs';

import { Project, ProjectStatus } from '../../../../core/interfaces/project.interface';
import { ProjectService } from '../../services/project.service';
import { ProjectModel } from '../../models/timeline.model';

@Component({
  selector: 'app-project-detail',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
    MatProgressSpinnerModule,
    MatDividerModule,
    MatTabsModule
  ],
  template: `
    <div class="project-detail-container">
      <!-- Loading State -->
      <div *ngIf="loading()" class="loading-container">
        <mat-spinner></mat-spinner>
        <p>กำลังโหลดข้อมูลโปรเจค...</p>
      </div>

      <!-- Project Not Found -->
      <div *ngIf="!loading() && !project()" class="not-found-container">
        <mat-icon class="not-found-icon">error_outline</mat-icon>
        <h2>ไม่พบโปรเจคที่ต้องการ</h2>
        <p>โปรเจคที่คุณค้นหาอาจถูกลบหรือไม่มีอยู่ในระบบ</p>
        <button mat-raised-button color="primary" (click)="goBack()">
          <mat-icon>arrow_back</mat-icon>
          กลับไปหน้าหลัก
        </button>
      </div>

      <!-- Project Detail Content -->
      <div *ngIf="!loading() && project()" class="project-content">
        <!-- Header Section -->
        <div class="project-header">
          <button mat-icon-button (click)="goBack()" class="back-button">
            <mat-icon>arrow_back</mat-icon>
          </button>
          
          <div class="header-content">
            <div class="title-section">
              <h1 class="project-title">{{project()?.title}}</h1>
              <p class="project-company">
                <mat-icon>business</mat-icon>
                {{project()?.company}}
              </p>
            </div>
            
            <div class="status-section">
              <mat-chip [class]="getStatusClass(project()?.status!)">
                {{getStatusLabel(project()?.status!)}}
              </mat-chip>
            </div>
          </div>
        </div>

        <!-- Quick Info Cards -->
        <div class="info-cards">
          <mat-card class="info-card">
            <mat-icon>person</mat-icon>
            <div class="info-content">
              <span class="info-label">บทบาท</span>
              <span class="info-value">{{project()?.role}}</span>
            </div>
          </mat-card>
          
          <mat-card class="info-card">
            <mat-icon>schedule</mat-icon>
            <div class="info-content">
              <span class="info-label">ระยะเวลา</span>
              <span class="info-value">{{formatProjectDuration(project()!)}}</span>
            </div>
          </mat-card>
          
          <mat-card class="info-card" *ngIf="project()?.teamSize">
            <mat-icon>group</mat-icon>
            <div class="info-content">
              <span class="info-label">ขนาดทีม</span>
              <span class="info-value">{{project()?.teamSize}} คน</span>
            </div>
          </mat-card>
          
          <mat-card class="info-card">
            <mat-icon>category</mat-icon>
            <div class="info-content">
              <span class="info-label">หมวดหมู่</span>
              <span class="info-value">{{getCategoryLabel(project()?.category!)}}</span>
            </div>
          </mat-card>
        </div>

        <!-- Main Content Tabs -->
        <mat-card class="main-content">
          <mat-tab-group>
            <!-- Overview Tab -->
            <mat-tab label="ภาพรวม">
              <div class="tab-content">
                <div class="description-section">
                  <h3>รายละเอียดโปรเจค</h3>
                  <p class="project-description">{{project()?.description}}</p>
                </div>
                
                <mat-divider></mat-divider>
                
                <div class="technologies-section">
                  <h3>เทคโนโลยีที่ใช้</h3>
                  <div class="technologies-grid">
                    <mat-chip *ngFor="let tech of project()?.technologies" class="tech-chip">
                      <mat-icon>code</mat-icon>
                      {{tech}}
                    </mat-chip>
                  </div>
                </div>
                
                <mat-divider *ngIf="project()?.tags?.length"></mat-divider>
                
                <div class="tags-section" *ngIf="project()?.tags?.length">
                  <h3>แท็ก</h3>
                  <div class="tags-grid">
                    <mat-chip *ngFor="let tag of project()?.tags" class="tag-chip">
                      <mat-icon>label</mat-icon>
                      {{tag}}
                    </mat-chip>
                  </div>
                </div>
              </div>
            </mat-tab>

            <!-- Achievements Tab -->
            <mat-tab label="ผลสำเร็จ" *ngIf="project()?.achievements?.length">
              <div class="tab-content">
                <div class="achievements-section">
                  <h3>ผลสำเร็จที่ได้รับ</h3>
                  <div class="achievement-list">
                    <div *ngFor="let achievement of project()?.achievements" class="achievement-item">
                      <mat-icon class="achievement-icon">check_circle</mat-icon>
                      <span>{{achievement}}</span>
                    </div>
                  </div>
                </div>
              </div>
            </mat-tab>

            <!-- Challenges Tab -->
            <mat-tab label="ความท้าทาย" *ngIf="project()?.challenges?.length">
              <div class="tab-content">
                <div class="challenges-section">
                  <h3>ความท้าทายที่เผชิญ</h3>
                  <div class="challenge-list">
                    <div *ngFor="let challenge of project()?.challenges" class="challenge-item">
                      <mat-icon class="challenge-icon">warning</mat-icon>
                      <span>{{challenge}}</span>
                    </div>
                  </div>
                </div>
              </div>
            </mat-tab>

            <!-- Timeline Tab -->
            <mat-tab label="ไทม์ไลน์">
              <div class="tab-content">
                <div class="timeline-section">
                  <h3>ไทม์ไลน์โปรเจค</h3>
                  <div class="project-timeline">
                    <div class="timeline-item">
                      <div class="timeline-marker start"></div>
                      <div class="timeline-content">
                        <h4>เริ่มโปรเจค</h4>
                        <p>{{formatDate(project()?.startDate!)}}</p>
                      </div>
                    </div>
                    
                    <div class="timeline-item" *ngIf="project()?.endDate">
                      <div class="timeline-marker end"></div>
                      <div class="timeline-content">
                        <h4>สิ้นสุดโปรเจค</h4>
                        <p>{{formatDate(project()?.endDate!)}}</p>
                      </div>
                    </div>
                    
                    <div class="timeline-item" *ngIf="!project()?.endDate && project()?.status === 'in_progress'">
                      <div class="timeline-marker current"></div>
                      <div class="timeline-content">
                        <h4>ปัจจุบัน</h4>
                        <p>โปรเจคยังคงดำเนินการอยู่</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </mat-tab>
          </mat-tab-group>
        </mat-card>

        <!-- Action Buttons -->
        <div class="action-buttons">
          <button mat-raised-button color="primary" (click)="goBack()">
            <mat-icon>arrow_back</mat-icon>
            กลับไปหน้าหลัก
          </button>
          
          <button mat-raised-button *ngIf="project()?.projectUrl" (click)="openUrl(project()?.projectUrl!)">
            <mat-icon>launch</mat-icon>
            เยี่ยมชมโปรเจค
          </button>
          
          <button mat-raised-button *ngIf="project()?.repositoryUrl" (click)="openUrl(project()?.repositoryUrl!)">
            <mat-icon>code</mat-icon>
            ดู Source Code
          </button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .project-detail-container {
      max-width: 1000px;
      margin: 0 auto;
      padding: 24px;
      padding-top: 88px;
    }
    
    .loading-container,
    .not-found-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 48px;
      text-align: center;
    }
    
    .not-found-icon {
      font-size: 4rem;
      width: 4rem;
      height: 4rem;
      color: #f44336;
      margin-bottom: 16px;
    }
    
    .project-header {
      display: flex;
      align-items: flex-start;
      gap: 16px;
      margin-bottom: 24px;
    }
    
    .back-button {
      margin-top: 8px;
    }
    
    .header-content {
      flex: 1;
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
    }
    
    .project-title {
      font-size: 2.2rem;
      font-weight: 400;
      margin: 0;
      color: #1976d2;
      line-height: 1.2;
    }
    
    .project-company {
      display: flex;
      align-items: center;
      gap: 8px;
      margin: 8px 0 0 0;
      color: #666;
      font-size: 1.1rem;
    }
    
    .info-cards {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 16px;
      margin-bottom: 24px;
    }
    
    .info-card {
      display: flex;
      align-items: center;
      gap: 16px;
      padding: 20px;
      background: linear-gradient(135deg, #f5f5f5 0%, #ffffff 100%);
      border-left: 4px solid #1976d2;
    }
    
    .info-card mat-icon {
      color: #1976d2;
      font-size: 1.5rem;
      width: 1.5rem;
      height: 1.5rem;
    }
    
    .info-content {
      display: flex;
      flex-direction: column;
    }
    
    .info-label {
      font-size: 0.8rem;
      color: #666;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    
    .info-value {
      font-size: 1rem;
      font-weight: 500;
      color: #333;
      margin-top: 2px;
    }
    
    .main-content {
      margin-bottom: 24px;
    }
    
    .tab-content {
      padding: 24px;
    }
    
    .tab-content h3 {
      margin: 0 0 16px 0;
      color: #1976d2;
      font-weight: 500;
    }
    
    .project-description {
      line-height: 1.7;
      color: #444;
      font-size: 1rem;
      margin-bottom: 24px;
    }
    
    .technologies-grid,
    .tags-grid {
      display: flex;
      flex-wrap: wrap;
      gap: 12px;
      margin-bottom: 24px;
    }
    
    .tech-chip {
      background: #e3f2fd;
      color: #1976d2;
      display: flex;
      align-items: center;
      gap: 6px;
    }
    
    .tag-chip {
      background: #f3e5f5;
      color: #7b1fa2;
      display: flex;
      align-items: center;
      gap: 6px;
    }
    
    .achievement-list,
    .challenge-list {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }
    
    .achievement-item,
    .challenge-item {
      display: flex;
      align-items: flex-start;
      gap: 12px;
      padding: 16px;
      border-radius: 8px;
      background: #f9f9f9;
    }
    
    .achievement-icon {
      color: #4caf50;
      margin-top: 2px;
    }
    
    .challenge-icon {
      color: #ff9800;
      margin-top: 2px;
    }
    
    .project-timeline {
      position: relative;
      padding-left: 24px;
    }
    
    .timeline-item {
      display: flex;
      align-items: flex-start;
      gap: 16px;
      margin-bottom: 24px;
      position: relative;
    }
    
    .timeline-marker {
      width: 16px;
      height: 16px;
      border-radius: 50%;
      border: 3px solid #e0e0e0;
      background: white;
      position: relative;
      z-index: 2;
    }
    
    .timeline-marker.start {
      border-color: #4caf50;
      background: #4caf50;
    }
    
    .timeline-marker.end {
      border-color: #1976d2;
      background: #1976d2;
    }
    
    .timeline-marker.current {
      border-color: #ff9800;
      background: #ff9800;
      animation: pulse 2s infinite;
    }
    
    .timeline-item:not(:last-child)::before {
      content: '';
      position: absolute;
      left: 7px;
      top: 20px;
      width: 2px;
      height: calc(100% + 8px);
      background: #e0e0e0;
      z-index: 1;
    }
    
    .timeline-content h4 {
      margin: 0 0 4px 0;
      color: #333;
      font-weight: 500;
    }
    
    .timeline-content p {
      margin: 0;
      color: #666;
      font-size: 0.9rem;
    }
    
    .action-buttons {
      display: flex;
      gap: 16px;
      flex-wrap: wrap;
      justify-content: center;
    }
    
    .status-section mat-chip.completed {
      background: #e8f5e8;
      color: #2e7d32;
    }
    
    .status-section mat-chip.inprogress {
      background: #fff3e0;
      color: #f57c00;
    }
    
    .status-section mat-chip.onhold {
      background: #ffebee;
      color: #c62828;
    }
    
    @keyframes pulse {
      0% { box-shadow: 0 0 0 0 rgba(255, 152, 0, 0.7); }
      70% { box-shadow: 0 0 0 10px rgba(255, 152, 0, 0); }
      100% { box-shadow: 0 0 0 0 rgba(255, 152, 0, 0); }
    }
    
    /* Mobile Responsive */
    @media (max-width: 768px) {
      .project-detail-container {
        padding: 16px;
        padding-top: 80px;
      }
      
      .project-title {
        font-size: 1.8rem;
      }
      
      .header-content {
        flex-direction: column;
        gap: 16px;
      }
      
      .info-cards {
        grid-template-columns: 1fr;
      }
      
      .action-buttons {
        flex-direction: column;
      }
      
      .technologies-grid,
      .tags-grid {
        gap: 8px;
      }
    }
  `]
})
export class ProjectDetailComponent implements OnInit {
  project = signal<ProjectModel | null>(null);
  loading = signal(true);
  projectId: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private projectService: ProjectService
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.projectId = params.get('id');
      if (this.projectId) {
        this.loadProject(this.projectId);
      }
    });
  }

  loadProject(id: string) {
    this.loading.set(true);
    this.projectService.getProjectById(id).subscribe({
      next: (response) => {
        if (response.success && response.data) {
          this.project.set(new ProjectModel(response.data));
        } else {
          this.project.set(null);
        }
        this.loading.set(false);
      },
      error: (error) => {
        console.error('Error loading project:', error);
        this.project.set(null);
        this.loading.set(false);
      }
    });
  }

  getStatusClass(status: ProjectStatus): string {
    return status.replace('_', '');
  }

  getStatusLabel(status: ProjectStatus): string {
    const statusMap = {
      [ProjectStatus.COMPLETED]: 'เสร็จสิ้น',
      [ProjectStatus.IN_PROGRESS]: 'กำลังดำเนินการ',
      [ProjectStatus.ON_HOLD]: 'หยุดชั่วคราว',
      [ProjectStatus.CANCELLED]: 'ยกเลิก'
    };
    return statusMap[status] || status;
  }

  getCategoryLabel(category: string): string {
    const categoryMap: { [key: string]: string } = {
      'web_development': 'Web Development',
      'mobile_development': 'Mobile Development',
      'api_development': 'API Development',
      'desktop_application': 'Desktop Application',
      'data_analysis': 'Data Analysis',
      'devops': 'DevOps',
      'ui_ux_design': 'UI/UX Design',
      'research': 'Research',
      'other': 'อื่นๆ'
    };
    return categoryMap[category] || category;
  }

  formatProjectDuration(project: ProjectModel): string {
    return project.formattedDuration;
  }

  formatDate(date: Date): string {
    return new Intl.DateTimeFormat('th-TH', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(new Date(date));
  }

  goBack() {
    this.router.navigate(['/timeline']);
  }

  openUrl(url: string) {
    window.open(url, '_blank');
  }
}