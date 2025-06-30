export interface ReportAnonymousUpdateDTO {
  isAnonymous:boolean;
  targetCompanyType:string;
  targetDepartment:string;
  targetName:string;
  title: string;
  content: string;
  reporterId?: string;
  password:string;
  fileMappingId?: string[];
  [key: string]: unknown;
}

export interface ReportUpdateDTO {
  isAnonymous:boolean;
  companyType?: string;
  department?:string;
  name:string;
  phone?:string;
  email:string;
  targetCompanyType:string;
  targetDepartment:string;
  targetName:string;
  title: string;
  content: string;
  reporterId?: string;
  password:string;
  fileMappingId?: string[];
  lang:string;
  [key: string]: unknown;
}
export interface ReportResultConfirmDTO{
  reporterId: string;
  password:string;
  [key: string]: unknown;
}

export interface ReportDTO {
  id: number;
  isAnonymous: boolean;
  name: string;
  phone: string;
  email: string;
  companyTypeText: string;
  department: string;
  targetCompanyTypeText: string;
  targetDepartment: string;
  targetName: string;
  title: string;
  content: string;
  statusType: string;
  statusTypeText: string;
  uploadFiles: UploadFile[];
  answer: Answer;
}
interface Answer {
  id: number;
  answer: string;
  memo: string;
  answerCreatedAt: string;
  answerCompletedBy: string;
}

interface UploadFile {
  createdAt: string;
  createdBy: string;
  updatedAt: string;
  updatedBy: string;
  id: string;
  type: {
    acceptableFileTypes: string[];
    fileStorageType: string;
    name: string;
    subPath: string;
  }
  path: string;
  name: string;
  originName: string;
  fileLength: number;
  referURL: string;
  attachmentURL: string;
}
