import {useApiStore} from '@/stores/api-store';
import {ApiResponse} from '@/types/api';
import {
  RefundCounterListData,
} from "@/types/refund-counter.ts";


const api = useApiStore.getState().createApiClient('v1/front/traveler/refund-counter');

// 목록
export const getRefundCounterList = async (cityType : string): Promise<ApiResponse<RefundCounterListData>> => {
  return api.submit<RefundCounterListData>('get', '', {searchCityType: cityType});
}
