export interface ApiResponse<T> {
  status: number;
  message: string;
  result?: T;
  error?: string;
}

export interface ApiErrorResponse {
  status: number;
  message: string;
  error: string;
}
