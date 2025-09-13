import { Injectable, signal } from '@angular/core';

export type Theme = 'light' | 'dark';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private readonly THEME_KEY = 'app-theme';
  
  // Signal สำหรับ current theme
  currentTheme = signal<Theme>('light');
  
  constructor() {
    this.initializeTheme();
  }

  /**
   * เริ่มต้น theme จาก localStorage หรือใช้ system preference
   */
  private initializeTheme(): void {
    const savedTheme = localStorage.getItem(this.THEME_KEY) as Theme;
    
    if (savedTheme) {
      this.setTheme(savedTheme);
    } else {
      // ตรวจสอบ system preference
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      this.setTheme(prefersDark ? 'dark' : 'light');
    }
  }

  /**
   * เปลี่ยน theme
   */
  setTheme(theme: Theme): void {
    this.currentTheme.set(theme);
    
    // เพิ่ม/ลบ class จาก html element
    const htmlElement = document.documentElement;
    htmlElement.className = theme;
    
    // บันทึกใน localStorage
    localStorage.setItem(this.THEME_KEY, theme);
  }

  /**
   * สลับระหว่าง light และ dark theme
   */
  toggleTheme(): void {
    const newTheme = this.currentTheme() === 'light' ? 'dark' : 'light';
    this.setTheme(newTheme);
  }

  /**
   * ตรวจสอบว่าเป็น dark theme หรือไม่
   */
  isDarkMode(): boolean {
    return this.currentTheme() === 'dark';
  }

  /**
   * ตรวจสอบว่าเป็น light theme หรือไม่
   */
  isLightMode(): boolean {
    return this.currentTheme() === 'light';
  }
}