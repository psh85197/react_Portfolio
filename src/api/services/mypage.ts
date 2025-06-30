import { useApiStore } from '@/stores/api-store';
import { ApiResponse } from '@/types/api';
import {AdminUserDTO} from "@/types/mypage.ts";



const api = useApiStore.getState().createApiClient('mypage')

export const postAdminUser = async (): Promise<ApiResponse<AdminUserDTO>> => {
  return api.submit<AdminUserDTO>('post','')
}