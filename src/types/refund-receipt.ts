
export interface RefundReceiptDTO {
  customerName:string;
  passportNo:string;
  customerCountry: string;
  customerSex:string;
  birthDate:string;
  phoneNo: string;
  customerEmail:string;
  termAgreement:number[];
  tranRefNo:string[];
  reqCnt:number;
  refundInfo:string;
  refundType:number;
  [key: string]: unknown;
}

export interface RefundTransRefDTO {
  tranRefNo:string;
  amount:string;
  [key: string]: unknown;
}

export interface RefundTransRefResultDTO {
  rspCode: string;
  amount: string;
  tranRefNo: string;
  resultCode: string;
  tranDate: string;
  refundAmt:string;
  status:string;
}
export  interface RefundTermAgreementDTO{
  termAgreement:number[];
  selectGender:boolean;
}
export interface ResultParam {
  params:ResultDTO;
}
export  interface ResultDTO {
  rspCode: string;
  records: RecordDTO[]
}
export interface RecordDTO {
  tranRefNo : string;
  resultCode : string;
  resultMsg : string;
}