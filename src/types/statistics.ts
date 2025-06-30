// 조회 파라미터
export interface SearchParam extends Record<string, unknown> {
  type: string
  format: string
  startAt: string
  endAt: string
}

// API data 응답 타입
export interface MemberData {
  count: number;
  items: MemberChartData[];
}

// 차트에 표시할 데이터 타입
export interface MemberChartData {
  selectedData: string
  count1: number
  count2: number
  countSum: number
}