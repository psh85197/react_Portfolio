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

interface AffiliatedUniversity {
  id: number;
  name: string;
  grade: string;
  major: string;
}

export interface InternDTO {
  id: number;
  user: UserInfo;
  affiliatedUniversity: AffiliatedUniversity;
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
export interface InternData {
  totalCount: number;
  items: InternDTO[];
}

// 테이블에 표시할 데이터 타입
export interface TableIntern {
  id: string;
  username: string;  // email
  name: string;      // firstName + lastName
  phone: string;
  birthday: string;
  affiliatedUniversityName: string;
  createdAt: string;
  lastLoginAt: string;
  test?: string;
}