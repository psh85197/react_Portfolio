export interface TermsDTO {
  id: number;
  langArr: number;
  termType: string;
  termText: string;
  effectiveDate: string | undefined;
  visible: string | undefined;
  content: string;
  createdAt: string;
  createdBy: string;
  lastUpdatedAt: string;
  lastUpdatedBy: string;
}
export interface TermsTranslationDTO {
  ko:TermsDTO;
  en:TermsDTO;
  zh:TermsDTO;
  ja:TermsDTO;
}

export interface TermsTranslationListDTO {
  ko:TermsDTO[];
  en:TermsDTO[];
  zh:TermsDTO[];
  ja:TermsDTO[];
}

export interface TermOption {
  value: string;
  label: string;
}