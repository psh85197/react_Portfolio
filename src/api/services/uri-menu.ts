import {useApiStore} from '@/stores/api-store';
import {ApiResponse} from '@/types/api';

const api = useApiStore.getState().createApiClient('v1/front/uris');

export interface MenuUri {
  id: string;
  uri: string;
  ko: string;
  en: string;
  zh: string;
  ja: string;
  sub?: { id: string; uri: string; ko: string; en: string; zh: string; ja: string }[];
}
export interface MenuVO {
  id: string;
  uri: string;
  ko: string;
  en: string;
  zh: string;
  ja: string;
}

export const getMenuUriList = async (): Promise<ApiResponse<MenuUri[]>> => {
  return api.submit<MenuUri[]>('get','menu');
}

export const getFooterFirstUriList = async (): Promise<ApiResponse<MenuVO[]>> => {
  return api.submit<MenuVO[]>('get','footerFirst');
}

export const getFooterSecondUriList = async (): Promise<ApiResponse<MenuVO[]>> => {
  return api.submit<MenuVO[]>('get','footerSecond');
}

export const getSecondDepthMenu = async (id:string): Promise<ApiResponse<MenuVO>> => {
  return api.submit<MenuVO>('get',`${id}`);
}