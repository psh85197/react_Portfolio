import {useApiStore} from '@/stores/api-store';
import {ApiResponse, ErrorResponse} from "@/types/api.ts";
import {ReportAnonymousUpdateDTO, ReportDTO, ReportResultConfirmDTO, ReportUpdateDTO} from "@/types/report.ts";

const api = useApiStore.getState().createApiClient('v1/front/footer/report');

// 익명 제보 등록
export const createAnonymousReport = async (params: ReportAnonymousUpdateDTO): Promise<ApiResponse<number>> => {
  return api.submit<number>('post', '', params);
}

// 실명 제보 등록
export const createReport = async (params: ReportUpdateDTO): Promise<ApiResponse<number>> => {
  return api.submit<number>('post', '', params);
}

//  아이디 검색
export const checkExistsReporterId = async (reporterId: string): Promise<ApiResponse<boolean>> => {
  return api.submit<boolean>('get',`${reporterId}`);
}
// 처리결과 검색
export const reportResultConfirm = async (params: ReportResultConfirmDTO): Promise<ApiResponse<ReportDTO|ErrorResponse>> => {
  return api.submit<ReportDTO|ErrorResponse>('post', 'verify', params);
}
