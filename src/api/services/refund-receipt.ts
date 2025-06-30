import {useApiStore} from '@/stores/api-store';
import {ApiResponse} from "@/types/api.ts";
import {
  RefundReceiptDTO,
  RefundTransRefDTO,
  RefundTransRefResultDTO,
  ResultParam
} from "@/types/refund-receipt.ts";

const api = useApiStore.getState().createApiClient('v1/front/traveler');

// 문의 등록
export const getRefundReceipt = async (params: RefundReceiptDTO): Promise<ApiResponse<ResultParam>> => {
  return api.submit<ResultParam>('post', 'request-tax-refund', params);
}

// 환급 전표 조회 등록
export const getRefundReceiptTransRef = async (params: RefundTransRefDTO): Promise<ApiResponse<RefundTransRefResultDTO>> => {
  return api.submit<RefundTransRefResultDTO>('post', 'check-voucher-refund-status', params);
}
