export interface UploadedFile {
  id: string;
  originName: string;
  fileLength: number;
  referURL: string;
  attachmentURL: string;
  name: string;
}

export interface UploadFile {
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

export interface deletedFile {
  fileMappingId: string[];
  [key: string]: any;
}