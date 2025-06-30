export interface FaqDTO {
    id: string;
    category_code: string;
    title: string;
    contents: string;
    createdAt: string;
    createdBy: string;
    lastUpdatedAt: string;
    lastUpdatedBy: string;
    deletedAt: string;
    deletedBy: string;
}

// API data 응답 타입
export interface FaqData {
    totalCount: number,
    items: FaqDTO[];
}

// 테이블에 표시할 데이터 타입
export interface TableFaq {
    id: string;
    category_code: string;
    title: string;
    createdBy: string;
    createdAt: string;
    // test?: string;
}