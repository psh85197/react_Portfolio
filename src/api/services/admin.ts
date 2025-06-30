import { useApiStore } from "@/stores/api-store";
import {
  GetAdminResponse,
  CreateAdminRequest, CreateAdminResponse,
  GetAdminsParams,
  GetAdminsResponse,
  RemoveAdminsRequest,
  RemoveAdminsResponse,
  UpdateAdminRequest, UpdateAdminResponse
} from "@/types/admins.ts";

const api = useApiStore.getState().createApiClient('v1/admin/admins');

export const getAdmins = (params: GetAdminsParams) => {
  return api.submit<GetAdminsResponse>('get', '', {...params, page: 0, size: 10, sort: 'createdAt,DESC'});
}

export const removeAdmins = (params: RemoveAdminsRequest) => {
  return api.submit<RemoveAdminsResponse>('delete', 'remove', params)
}

export const createAdmin = (params: CreateAdminRequest) => {
  return api.submit<CreateAdminResponse>('post', 'create', params);
}

export const getAdmin = (id: string | undefined) => {
  return api.submit<GetAdminResponse>('get', `${id}`);
}

export const updateAdmin = (params: UpdateAdminRequest) => {
  return api.submit<UpdateAdminResponse>('put', 'update', params);
}