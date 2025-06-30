import { useFileUploadStore } from "@/stores/file-store";
import {useApiStore} from "@/stores/api-store.ts";
import {deletedFile} from "@/types/file.ts";
import {ApiResponse, ErrorResponse} from "@/types/api.ts";

// 요청 파라미터 타입 정의
interface CreateFileParams extends Record<string, unknown> {
  fileUploadType: string;
  file: File;
}

// 응답 객체 타입 정의
interface CreateFileResVO {
  createFile: CreateFile;
}

// 생성된 파일 응답 객체 정의
interface CreateFile {
  id: string;
  type: string;
  path: string;
  name: string;
  originName: string;
  fileLength: number;
  referURL: string;
  attachmentURL: string;
}

const api = useFileUploadStore.getState().createFileUploadClient('v1/front/file/create');

// 파일 업로드
export const createFile = (params: CreateFileParams) => {
  const formData = new FormData();

  formData.append("fileUploadType", params.fileUploadType);
  formData.append("file", params.file);

  return api.upload<CreateFileResVO|ErrorResponse>(formData);
};

const deleteApi = useApiStore.getState().createApiClient('v1/front/file');

export const deleteFile = (params: deletedFile) : Promise<ApiResponse<number>> => {
  return deleteApi.submit<number>('put', 'delete', params);
}