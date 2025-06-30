import {useApiStore} from '@/stores/api-store';
import {ContactUpdateDTO} from "@/types/contact.ts";
import {ApiResponse} from "@/types/api.ts";

const api = useApiStore.getState().createApiClient('v1/front/contact');

// 문의 등록
export const createContact = async (params: ContactUpdateDTO): Promise<ApiResponse<number>> => {
  return api.submit<number>('post', '', params);
}
