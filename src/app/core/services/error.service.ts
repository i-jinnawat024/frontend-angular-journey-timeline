import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface ErrorMessage {
  id: string;
  message: string;
  type: 'error' | 'warning' | 'info' | 'success';
  timestamp: Date;
  autoHide?: boolean;
  duration?: number; // milliseconds
}

@Injectable({
  providedIn: 'root'
})
export class ErrorService {
  private errorsSubject = new BehaviorSubject<ErrorMessage[]>([]);
  public errors$: Observable<ErrorMessage[]> = this.errorsSubject.asObservable();

  /**
   * แสดง error message
   */
  showError(message: string, autoHide: boolean = true, duration: number = 5000): string {
    const error: ErrorMessage = {
      id: this.generateId(),
      message,
      type: 'error',
      timestamp: new Date(),
      autoHide,
      duration
    };

    this.addError(error);
    return error.id;
  }

  /**
   * แสดง warning message
   */
  showWarning(message: string, autoHide: boolean = true, duration: number = 5000): string {
    const warning: ErrorMessage = {
      id: this.generateId(),
      message,
      type: 'warning',
      timestamp: new Date(),
      autoHide,
      duration
    };

    this.addError(warning);
    return warning.id;
  }

  /**
   * แสดง info message
   */
  showInfo(message: string, autoHide: boolean = true, duration: number = 3000): string {
    const info: ErrorMessage = {
      id: this.generateId(),
      message,
      type: 'info',
      timestamp: new Date(),
      autoHide,
      duration
    };

    this.addError(info);
    return info.id;
  }

  /**
   * แสดง success message
   */
  showSuccess(message: string, autoHide: boolean = true, duration: number = 3000): string {
    const success: ErrorMessage = {
      id: this.generateId(),
      message,
      type: 'success',
      timestamp: new Date(),
      autoHide,
      duration
    };

    this.addError(success);
    return success.id;
  }

  /**
   * ลบ error message ตาม ID
   */
  removeError(id: string): void {
    const currentErrors = this.errorsSubject.value;
    const updatedErrors = currentErrors.filter(error => error.id !== id);
    this.errorsSubject.next(updatedErrors);
  }

  /**
   * ลบ error messages ทั้งหมด
   */
  clearAll(): void {
    this.errorsSubject.next([]);
  }

  /**
   * ลบ error messages ตาม type
   */
  clearByType(type: ErrorMessage['type']): void {
    const currentErrors = this.errorsSubject.value;
    const updatedErrors = currentErrors.filter(error => error.type !== type);
    this.errorsSubject.next(updatedErrors);
  }

  /**
   * เพิ่ม error message
   */
  private addError(error: ErrorMessage): void {
    const currentErrors = this.errorsSubject.value;
    const updatedErrors = [...currentErrors, error];
    this.errorsSubject.next(updatedErrors);

    // Auto hide if specified
    if (error.autoHide && error.duration) {
      setTimeout(() => {
        this.removeError(error.id);
      }, error.duration);
    }
  }

  /**
   * สร้าง unique ID
   */
  private generateId(): string {
    return `error_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }
}