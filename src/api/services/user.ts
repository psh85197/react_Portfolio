import {useApiStore} from "@/stores/api-store.ts";

const api = useApiStore.getState().createApiClient('v1/admin/users');

// 사용자 목록 요청 파라미터 타입 정의
interface GetUsersParams extends Record<string, unknown> {
  searchField: string;
  searchValue: string;
  searchRole: string;
  page: number;
  size: number;
  sort: string;
};

// 사용자 목록 응답 객체 타입 정의
interface GetUsersRes {
  users: GetUsers[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
}

// 사용자 목록 타입 정의
interface GetUsers {
  id: number;
  email: string;
  passwordUpdatedAt: string;
  accountDisabled: boolean;
  loginFailCnt: number;
  accountLocked: boolean;
  createdAt: string;
  createdBy: string;
  updatedAt: string;
  updatedBy: string;
  roles: GetUsersRole[];
};

interface GetUsersRole {
  id: string;
  description: string;
  privileges: GetUsersPrivileges[];
};

interface GetUsersPrivileges {
  id: string;
  description: string;
};

// 사용자 상세 타입 정의
interface GetUser {
  id: string;
  password: string;
  email: string;
  passwordUpdatedAt: string;
  accountDisabled: boolean;
  loginFailCnt: number;
  accountLocked: boolean;
  createdAt: string;
  createdBy: string;
  updatedAt: string;
  updatedBy: string;
  roles: CoreRole[];
}

interface CoreRole {
  id: string;
  description: string;
  privileges: GetUsersPrivileges[];
};

// 사용자 정보 수정 요청 데이터
interface UpdateUserReq extends Record<string, unknown> {
  id: string;
  email: string;
  accountDisabled: boolean;
  loginFailCnt: number;
  accountLocked: boolean;
  roles: string[];
}

// 사용자 정보 수정 응답 객체 타입 정의
interface UpdateUserRes {
  id: string;
  email: string;
  accountDisabled: boolean;
  loginFailCnt: number;
  accountLocked: boolean;
  roles: string[];
}

// 사용자 리스트(페이징)
export const getUsers = (params: GetUsersParams) => {
  return api.submit<GetUsersRes>('get', '', params);
};

// 사용자 상세
export const getUser = (id: string) => {
  return api.submit<GetUser>('get', `${id}`);
};

// 사용자 수정
export const updateUser = (params: UpdateUserReq) => {
  return api.submit<UpdateUserRes>('patch', 'update', params);
};