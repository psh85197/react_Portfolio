import { useApiStore } from "@/stores/api-store";
import {ApiResponse, ErrorResponse} from "@/types/api.ts";

// 타입 정의
export type LoginParams = Record<string, unknown> & {
  username?: string;
  password?: string;
};

// 타입 정의
export type LogoutParams = Record<string, unknown> & {
  userId: string;
  token: string;
};

type UserInfo = Record<string, unknown> & {
  id: number;
  username: string;
  email: string;
};

// API 응답에 맞게 타입 수정
type MbrInfo = {
  mbrName: string
  mbrAddr: string
  rptAuthFlag: string
  jwtToken: string
  userId: string
};

type LoginResponse = Record<string, unknown> & MbrInfo;

const authApi = useApiStore.getState().createApiClient('v1/front/auth')
const checkApi = useApiStore.getState().createApiClient('v1/front')

// submit 메서드 사용
export const login = (params: LoginParams) => {
  return authApi.submit<LoginResponse, LoginParams>('post', 'login', params);
};

// submit 메서드 사용
export const logoutFranchise = (params: LogoutParams) => {
  return authApi.submit<LoginResponse, LoginParams>('post', 'logout', params);
};

export const getUserInfo = () => {
  return authApi.submit<UserInfo>('get', 'info');
};

export const logout = () => {
  return authApi.submit<{ success: boolean }>('post', 'logout');
};

export const refreshToken = () => {
  return authApi.submit<LoginResponse>('post', 'refresh-token');
};

export const checkToken =  (): Promise<ApiResponse<{ success: boolean }|ErrorResponse>> => {
  return checkApi.submit<{ success: boolean } | ErrorResponse>('post', 'check');
};
