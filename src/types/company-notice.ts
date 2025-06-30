import { UploadFile } from "./file";

export interface Notices {
  id: number;
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
  ko:NoticeTranslationDTO;
  en:NoticeTranslationDTO;
  zh:NoticeTranslationDTO;
  ja:NoticeTranslationDTO;
}

// 공지사항 상세
export interface Notice {
  id: number;
  title: string;
  content: string;
  isTopNotice: boolean;
  visible: boolean;
  startDate: string;
  endDate: string;
  viewCount: number;
  createdBy: string;
  createdByNm: string;
  createdAt: string;
  previousId:number;
  nextId:number;
  langArr: number;
  langText: string;
  uploadFiles: UploadFile[];
}

export interface NoticeFrontListDTO {
  id: number;
  isTopNotice: boolean;
  startDate: string;
  endDate: string;
  viewCount: number;
  createdBy: string;
  createdAt: string;
  createdByNm: string;
  previous:{
    id:number;
    ko:string;
    en:string;
    zh:string;
    ja:string;
  };
  next:{
    id:number;
    ko:string;
    en:string;
    zh:string;
    ja:string;
  };
  ko:NoticeTranslationDTO;
  en:NoticeTranslationDTO;
  zh:NoticeTranslationDTO;
  ja:NoticeTranslationDTO;
  uploadFiles: UploadFile[];
}

export interface NoticeTranslationDTO {
  title: string;
  content: string;
}

// 테이블에 표시할 데이터 타입
export interface TableNotice {
  id: number;
  title: string;
  koTitle: string;
  enTitle: string;
  zhTitle: string;
  jaTitle: string;
  createdAt: string;
  createdBy: string;
  isTopNotice: boolean;
}
