// 기본 타입 정의
export interface ApiResponse<T> {
  code: number;
  msg: string;
  data: T;
}

export interface ErrorResponse {
  code: string;
  message: string;
  success: boolean;
}