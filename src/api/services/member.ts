// src/services/member.ts
import { SearchOption } from '@/components/ui/search-box';
import { useApiStore } from '@/stores/api-store';
import { ApiResponse } from '@/types/api';
import { InternData } from '@/types/intern';


const memberApi = useApiStore.getState().createApiClient('member')

export const getIntern = async (params: SearchOption): Promise<ApiResponse<InternData>> => {
  return memberApi.submit<InternData>('get', 'interns', params)
}