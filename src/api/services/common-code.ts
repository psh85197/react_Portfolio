import {useApiStore} from '@/stores/api-store';
import {ApiResponse} from '@/types/api';
import {CommonCode, NationalityCode} from "@/types/common-code.ts";

const api = useApiStore.getState().createApiClient('v1/front/commonCode');

export const getCommonCodeList = async (type: string): Promise<ApiResponse<CommonCode[]>> => {
  return api.submit<CommonCode[]>('get', `${type}`);
};

export const getCommonCodeNationalityList = async (): Promise<ApiResponse<NationalityCode[]>> => {
  return api.submit<NationalityCode[]>('get', `nationality`);
};
