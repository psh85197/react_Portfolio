export interface RequestSupply {
  envGen: number;
  envEtc: number;
  paper: number;
  posGen: number;
  posPda: number;
  stiFree: number;
  stiShop: number;
  popFree: number;
  popShop: number;
  tabImm: number;
  tabGen: number;
  tabHimt: number;
  alipay: number;

  [key: string]: unknown;
}

export interface RequestSupplyResponse {
  params: RequestSupplyResult
}

export interface RequestSupplyHistoryResponse {
  requestBody: string
}

export interface RequestSupplyResult {
  alipay: string;
  envEtc: string;
  envGen: string;
  paper: string;
  popFree: string;
  popShop: string;
  posGen: string;
  posPda: string;
  resultCode: string;
  rspCode: string;
  stiFree: string;
  stiShop: string;
  tabGen: string;
  tabHimt: string;
  tabImm: string;
}
