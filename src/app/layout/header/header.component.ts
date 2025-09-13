import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ThemeService } from '../../core/services/theme.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatTooltipModule,
  ],
  template: `
    <mat-toolbar color="primary" class="header-toolbar">
      <div class="header-container">
        <div class="header-left">
          <button mat-icon-button class="menu-button" (click)="toggleSidebar()">
            <mat-icon>menu</mat-icon>
          </button>
          <a routerLink="/timeline" class="logo-container">
            <mat-icon class="logo-icon">timeline</mat-icon>
            <span class="logo-text">Journey Timeline</span>
          </a>
        </div>

        <div class="header-center">
          <nav class="nav-links">
            <a mat-button routerLink="/timeline" routerLinkActive="active-link">
              <mat-icon>timeline</mat-icon>
              <span>Timeline</span>
            </a>
            <a mat-button routerLink="/projects" routerLinkActive="active-link">
              <mat-icon>work</mat-icon>
              <span>Projects</span>
            </a>
            <a mat-button routerLink="/about" routerLinkActive="active-link">
              <mat-icon>person</mat-icon>
              <span>About</span>
            </a>
          </nav>
        </div>

        <div class="header-right">
          <!-- Theme Toggle Button -->
          <!-- <button 
            mat-icon-button 
            (click)="toggleTheme()"
            [attr.aria-label]="'Switch to ' + (currentTheme() === 'light' ? 'dark' : 'light') + ' theme'"
            matTooltip="Toggle theme"
          >
            <mat-icon>{{ currentTheme() === 'light' ? 'dark_mode' : 'light_mode' }}</mat-icon>
          </button> -->

          <button mat-icon-button [matMenuTriggerFor]="settingsMenu">
            <mat-icon>more_vert</mat-icon>
          </button>
          <mat-menu #settingsMenu="matMenu">
            <button mat-menu-item>
              <mat-icon>settings</mat-icon>
              <span>Settings</span>
            </button>
            <button mat-menu-item>
              <mat-icon>help</mat-icon>
              <span>Help</span>
            </button>
          </mat-menu>
        </div>
      </div>
    </mat-toolbar>
  `,
  styles: [
    `
      .header-toolbar {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        z-index: 1000;
        height: 64px;
        padding: 0;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      }

      .header-container {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
        max-width: 1200px;
        margin: 0 auto;
        padding: 0 16px;
        height: 100%;
      }

      .header-left {
        display: flex;
        align-items: center;
        gap: 16px;
      }

      .menu-button {
        display: none;
      }

      .logo-container {
        display: flex;
        align-items: center;
        gap: 8px;
        text-decoration: none;
        color: inherit;
        font-weight: 500;
        font-size: 1.2rem;
      }

      .logo-icon {
        font-size: 28px;
        width: 28px;
        height: 28px;
      }

      .header-center {
        flex: 1;
        display: flex;
        justify-content: center;
      }

      .nav-links {
        display: flex;
        gap: 8px;
      }

      .nav-links a {
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 8px 16px;
        border-radius: 8px;
        transition: all 0.2s ease;
      }

      .nav-links a:hover {
        background-color: rgba(255, 255, 255, 0.1);
      }

      .nav-links a.active-link {
        background-color: rgba(255, 255, 255, 0.2);
        font-weight: 500;
      }

      .header-right {
        display: flex;
        align-items: center;
      }

      /* Mobile Responsive */
      @media (max-width: 768px) {
        .menu-button {
          display: flex;
        }

        .header-center {
          display: none;
        }

        .logo-text {
          display: none;
        }
      }

      @media (max-width: 480px) {
        .header-container {
          padding: 0 8px;
        }
      }
    `,
  ],
})
export class HeaderComponent {
  private themeService = inject(ThemeService);

  // // Expose theme service signals
  currentTheme = this.themeService.currentTheme;

  toggleSidebar() {
    // TODO: Implement sidebar toggle functionality
    console.log('Toggle sidebar');
  }

  toggleTheme() {
    this.themeService.toggleTheme();
  }
}
