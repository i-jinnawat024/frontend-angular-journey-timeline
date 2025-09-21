import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  private loadingSubject = new BehaviorSubject<boolean>(false);
  private loadingCountSubject = new BehaviorSubject<number>(0);

  public loading$: Observable<boolean> = this.loadingSubject.asObservable();
  public loadingCount$: Observable<number> = this.loadingCountSubject.asObservable();

  /**
   * เริ่ม loading
   */
  show(): void {
    const currentCount = this.loadingCountSubject.value + 1;
    this.loadingCountSubject.next(currentCount);
    this.loadingSubject.next(true);
  }

  /**
   * หยุด loading
   */
  hide(): void {
    const currentCount = Math.max(0, this.loadingCountSubject.value - 1);
    this.loadingCountSubject.next(currentCount);
    
    if (currentCount === 0) {
      this.loadingSubject.next(false);
    }
  }

  /**
   * รีเซ็ต loading state
   */
  reset(): void {
    this.loadingCountSubject.next(0);
    this.loadingSubject.next(false);
  }

  /**
   * ตรวจสอบสถานะ loading
   */
  isLoading(): boolean {
    return this.loadingSubject.value;
  }
}