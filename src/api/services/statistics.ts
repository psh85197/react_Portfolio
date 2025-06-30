// src/services/member.ts
import { useApiStore } from '@/stores/api-store';
import { ApiResponse } from '@/types/api';
import { MemberData, SearchParam } from '@/types/statistics';


const memberApi = useApiStore.getState().createApiClient('statistics')

export const getStatMember = async (params: SearchParam): Promise<ApiResponse<MemberData>> => {
  return memberApi.submit<MemberData>('get', 'join-secession', params)
}
