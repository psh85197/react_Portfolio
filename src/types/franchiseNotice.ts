import {UploadedFile} from "./file";

//가맹점 공지사항 list
export interface FranchiseNotices {
  id: number;
  title: string;
  content: string;
  isTopNotice: boolean;
  visible: boolean;
  startDate: string;
  endDate: string;
  viewCount: number;
  createdBy: string;
  createdAt: string;
  updatedBy: string;
  updatedAt: string;
  prevId:number;    // 이전글 ID
  nextId:number;    // 다음글 ID
  createdByNm: string;
}

//가맹점 공지사항 상세
export interface FranchiseNotice {
  id: number;
  title: string;
  content: string;
  isTopNotice: boolean;
  visible: boolean;
  startDate: string;
  endDate: string;
  viewCount: number;
  createdBy: string;
  createdAt: string;
  updatedBy: string;
  updatedAt: string;
  createdByNm: string;
  prevId:number;    // 이전글 ID
  prevTitle:string;    // 이전글 ID
  nextId:number;    // 다음글 ID
  nextTitle:string;    // 다음글 ID
  uploadFiles: UploadedFile[];
}

// API data 응답 타입
export interface FranchiseNoticeRes {
  notices: FranchiseNotices[];
}

// 테이블에 표시할 데이터 타입
export interface TableFranchiseNotice {
  id: number;
  title: string;
  visible: boolean;
  createdAt: string;
  createdBy: string;
  viewCount: number;
  isTopNotice: boolean;
}




