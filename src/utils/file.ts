import { createFile } from "@/api/services/file";
import envConfig from "@/env-config";
import { joinUrl } from "@/lib/utils";
import { UploadedFile } from "@/types/file";
import {ErrorResponse} from "@/types/api.ts";

// 파일 참조 URL 생성 함수
export const getFileReferURL = (
referType: 'inline' | 'attachment',
  uploadFile: {
    id: number;
    type: {fileStorageType: string}; // "S3" | "LOCAL"
    path: string;
    name: string;
  }
) : string => {
  const storageType = uploadFile.type.fileStorageType;
  let path = '';

  if(referType === 'inline') {
    if(storageType === 'S3') {
      path = `${process.env.NEXT_PUBLIC_S3_URL}${uploadFile.path}/${uploadFile.name}`;
    } else if(storageType === 'LOCAL') {
      path = `/content-disposition/inline${uploadFile.path}/${uploadFile.name}`;
    }
  }

  if(referType == 'attachment') {
    path = `/content-disposition/attachment/${uploadFile.id}`;
  }

  return joinUrl(envConfig.BASE_API, path);
};


/**
 * 파일 업로드 함수
 *
 * @param e input change 이벤트
 * @param fileUploadType 서버에 지정한 업로드 타입
 * @param _lang
 * @param onSuccess 업로드 성공 시 콜백 (UploadedFile 반환)
 * @param onError 업로드 실패 시 콜백
 */
export const handleUploadFile = async (
  e: React.ChangeEvent<HTMLInputElement>,
  fileUploadType: string,
  onSuccess: (file: UploadedFile) => void,
  onError: (err: Error) => void,
  t: (key: string, options?: any) => string
) => {
  const file = e.target.files?.[0];
  if (!file) {
    onError(new Error(t('exception.file.no.file')));
    return;
  }

  try {
    const res = await createFile({ fileUploadType, file });
    if (res.code === 200 && 'createFile' in res.data) {
      console.log("업로드 성공:", res);
      onSuccess(res.data.createFile);
    } else {
      let errorMessage: string;
      if (typeof res.data === 'string') {
        errorMessage = t('exception.generic', { msg: res.data });
      } else if ('code' in res) {
        const errorResponse = res as unknown as ErrorResponse;
        switch (errorResponse.code) {
          case 'MissingFileUploadType':
            errorMessage = t('file.exception.no.fileUploadType');
            break;
          case 'MissingFile':
            errorMessage = t('file.exception.no.file');
            break;
          case 'InvalidFileUploadType':
            errorMessage = t('file.exception.invalid.fileUploadType', {
              type: fileUploadType,
            });
            break;
          case 'NoExtension':
            errorMessage = t('file.exception.no.extension', { msg: errorResponse.message });
            break;
          case 'InvalidExtension':
            errorMessage = t('file.exception.invalid.extension', { msg: errorResponse.message });
            break;
          case 'InvalidMimeType':
            errorMessage = t('file.exception.invalid.mime', { msg: errorResponse.message });
            break;
          case 'NoFileStorageStrategy':
            errorMessage = t('file.exception.no.storageStrategy', { msg: errorResponse.message });
            break;
          case 'IOException':
            errorMessage = t('file.exception.generic', { msg: errorResponse.message });
            break;
          case 'UnexpectedError':
            errorMessage = t('file.exception.generic', { msg: errorResponse.message });
            break;
          default:
            errorMessage = t('file.exception.generic', { msg: errorResponse.message });
        }
        console.debug("Translated error message:", errorMessage);
      } else {
        errorMessage = t('file.exception.generic', { msg: 'Unknown error' });
      }
      throw new Error(errorMessage);
    }
  } catch (err) {
    console.error("업로드 실패:", err);
    onError(err instanceof Error ? err : new Error(t('file.exception.generic')));
    throw err;
  }
};