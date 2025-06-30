import {useApiStore} from "@/stores/api-store.ts";

const api = useApiStore.getState().createApiClient('v1/admin/userRoles');

// 사용자 역할 목록 응답 객체 타입 정의
export interface GetUserRolesRes {
  userRoles: GetUserRoles[];
}

export interface GetUserRoles {
  id: string;
  description: string;
  orderNo: number;
  privilegeIds: string[];
};

// 사용자 역할 리스트
export const getUserRoles = () => {
  return api.submit<GetUserRolesRes>('get', '');
}