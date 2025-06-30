
export interface RefundCounterDTO {
  id?: number;
  counterType: string;
  counterText: string;
  cityType: string;
  cityText: string;
  latitude: number;
  longitude: number;
  franchiseName: string;
  address: string;
  businessHours:string;
  phoneNumber: string;
}

// API data 응답 타입
export interface RefundCounterListData {
  ko:RefundCounterDTO[];
  en:RefundCounterDTO[];
  zh:RefundCounterDTO[];
  ja:RefundCounterDTO[];
}
