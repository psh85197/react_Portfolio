// API data 응답 타입
export interface CommonCode {
  code: string;
  ko: string;
  en: string;
  zh: string;
  ja: string;
  value: number;
}

export interface SelectCommon{
  label: string;
  ko?: string;
  en?: string;
  zh?: string;
  ja?: string;
  value: string;
}


export interface NationalityCode {
  code: string;
  name: string;
}