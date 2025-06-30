import {useApiStore} from '@/stores/api-store';
import {ApiResponse, ErrorResponse} from '@/types/api';
import {FranchiseNotice, FranchiseNoticeRes} from "@/types/franchiseNotice.ts";
// 검색 옵션 타입 정의
export interface SearchParams extends Record<string, unknown> {
  searchTitle?: string;
}

const api = useApiStore.getState().createApiClient('v1/front/franchise/notices');

// 가맹정 공지사항 목록
export const getFranchiseNotices = async (params: SearchParams): Promise<ApiResponse<FranchiseNoticeRes | ErrorResponse>> => {
  return api.submit<FranchiseNoticeRes | ErrorResponse>('get', '', params);
}

//가맹점 공지사항 상세
export const getFranchiseNotice = async (id: number): Promise<ApiResponse<FranchiseNotice | ErrorResponse>> => {
  return api.submit<FranchiseNotice | ErrorResponse>('get', `${id}`);
};

