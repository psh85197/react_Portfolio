
export interface ContactUpdateDTO {
  contactType: string;
  franchiseName?: string;
  name: string;
  phoneNumber: string;
  email: string;
  title: string;
  content: string;
  termId?: number;
  fileMappingId?: string[];
  lang:string;
  [key: string]: unknown;
}
