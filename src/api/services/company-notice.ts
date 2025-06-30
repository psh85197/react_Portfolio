import {useApiStore} from '@/stores/api-store';
import {ApiResponse} from '@/types/api';
import {NoticeFrontListDTO } from "@/types/company-notice.ts";


// 검색 옵션 타입 정의
export interface SearchParams extends Record<string, unknown> {
  searchKeyword?: string;
}

const api = useApiStore.getState().createApiClient('v1/front/company/notices');

// 공지사항 목록
export const getCompanyNotices = async (keyword: string): Promise<ApiResponse<NoticeFrontListDTO[]>> => {
  return api.submit<NoticeFrontListDTO[]>('get', '', {keyword:keyword});
}

// 공지사항 상세
export const getCompanyNotice = async (id: number): Promise<ApiResponse<NoticeFrontListDTO>> => {
  return api.submit<NoticeFrontListDTO>('get', `${id}`);
};

