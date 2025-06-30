import {SearchOption} from '@/components/ui/search-box';
import {useApiStore} from '@/stores/api-store';
import {ApiResponse} from '@/types/api';
import {FaqData} from "@/types/customer.ts";

const customerApi = useApiStore.getState().createApiClient('customer-center')

export const getFaq = async (params: SearchOption): Promise<ApiResponse<FaqData>> => {
    return customerApi.submit<FaqData>('get', 'faq-list', params)
}