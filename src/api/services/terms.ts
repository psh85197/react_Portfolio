import {useApiStore} from '@/stores/api-store';
import {ApiResponse} from '@/types/api';
import {TermsTranslationDTO, TermsTranslationListDTO} from "@/types/terms.ts";



const api = useApiStore.getState().createApiClient('v1/front/terms');
// 약관 목록
export const getTermTypeList = async (termType:string): Promise<ApiResponse<TermsTranslationListDTO>> => {
  return api.submit<TermsTranslationListDTO>('get', '', {termType:termType});
}

// 최근 약관
export const getTermTypeLast = async (termType: string): Promise<ApiResponse<TermsTranslationDTO>> => {
  return api.submit<TermsTranslationDTO>('get', `${termType}`);
}

// 환급신청 최근 약관
export const getRefundTermLast = async (termType: string): Promise<ApiResponse<TermsTranslationDTO>> => {
  return api.submit<TermsTranslationDTO>('get','refund',{termType:termType});
}