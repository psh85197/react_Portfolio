// API 응답의 내부 타입들
interface UserInfo {
  id: number;
  username: string;
  email: string;
  phone: string;
  firstName: string;
  lastName: string;
  createdAt: string;
  lastLoginAt: string;
}

export interface InternDTO {
  id: number;
  user: UserInfo;
  birthday: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  createdAt: string;
  updatedAt: string | null;
  resumeStatus: 'UNWRITTEN' | 'DRAFT' | 'COMPLETE';
}

// API data 응답 타입
export interface AdminUserDTO {
  name: string;
  nickname: string;
  email: string;
  phoneNumber: string;
}

// 테이블에 표시할 데이터 타입
export interface TableAdminUser {
  name: string;
  nickname: string;
  email: string;
  phoneNumber: string;
}