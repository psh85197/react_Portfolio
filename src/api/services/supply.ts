import {useApiStore} from '@/stores/api-store';
import {ApiResponse, ErrorResponse} from "@/types/api.ts";
import {RequestSupply, RequestSupplyHistoryResponse, RequestSupplyResponse} from "@/types/supply.ts";

const api = useApiStore.getState().createApiClient('v1/front/franchise/supply');

// 소모품신청 등록
export const requestSupply = async (params: RequestSupply): Promise<ApiResponse<RequestSupplyResponse | ErrorResponse>> => {
  return api.submit<RequestSupplyResponse | ErrorResponse>('post', '', params);
}

// 소모품신청이력 조회
export const getSupplyRequestHistory = async (): Promise<ApiResponse<RequestSupplyHistoryResponse | ErrorResponse>> => {
  return api.submit<RequestSupplyHistoryResponse | ErrorResponse>('get', 'history');
}
