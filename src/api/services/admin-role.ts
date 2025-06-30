import { useApiStore } from "@/stores/api-store";
import {GetRolesResponse, RemoveAdminsRequest, RemoveAdminsResponse} from "@/types/admin-role.ts";

const api = useApiStore.getState().createApiClient('v1/admin/roles');

export const GetRoles = () => {
  return api.submit<GetRolesResponse>('get', '');
}

export const removeAdmins = (params: RemoveAdminsRequest) => {
  return api.submit<RemoveAdminsResponse>('delete', 'remove', params)
}
