export interface ApiResponse<T> {
  data?: T;
  message?: string;
  success: boolean;
  timestamp?: Date;
  errors?: ApiError[];
}

export interface ApiError {
  code: string;
  message: string;
  field?: string;
}

export interface PaginatedResponse<T> extends ApiResponse<T> {
  pagination: PaginationInfo;
}

export interface PaginationInfo {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  hasNext?: boolean;
  hasPrevious?: boolean;
}

export interface DateRange {
  start: Date;
  end: Date;
}

export interface FilterOptions {
  category?: string;
  status?: string;
  dateRange?: DateRange;
  tags?: string[];
}

export interface SortOptions {
  field: string;
  direction: 'asc' | 'desc';
}