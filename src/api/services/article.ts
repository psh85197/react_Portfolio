import { useApiStore } from "@/stores/api-store";

// 게시물 전체 목록 요청 파라미터 타입 정의
interface GetArticlesListParams extends Record<string, unknown> {
  searchField: string;
  searchValue: string;
  searchOpen: string;
};

// 게시물 전체 목록 응답 객체 타입 정의
interface GetArticlesListRes {
  articles: GetArticles[];
};

// 게시물 목록(페이징) 요청 파라미터 타입 정의
interface GetArticlesParams extends Record<string, unknown> {
  searchField: string;
  searchValue: string;
  searchOpen: string;
  page: number;
  size: number;
  sort: string;
};

// 게시물 목록(페이징) 응답 객체 타입 정의
interface GetArticlesRes {
  articles: GetArticles[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
}

// 게시물 목록 타입 정의
interface GetArticles {
  id: number;
  updatedBy: string;
  updatedAt: string;
  title: string;
  content: string;
  visible: boolean;
  startDate: string;
  endDate: string; 
  orderNo: number;
  uploadFile: GetArticleFiles;
};

// 게시물 목록 업로드 파일 타입 정의
interface GetArticleFiles {
  id: number;
  type: fileType;
  path: string;
  name: string;
  originName: string;
  fileLength: number;
}

// 게시물 상세 업로드 파일타입 정의
interface GetArticleFile {
  id: number;
  type: fileType;
  path: string;
  name: string;
  originName: string;
  fileLength: number;
  referURL: string;
  attachmentURL: string;
}

// 파일 타입 정의
interface fileType {
  acceptableFileTypes: string[];
  fileStorageType: string;
  name: string;
  subPath: string;
}

// 게시물 상세 타입 정의
interface GetArticle {
  id: number;
  updatedBy: string;
  updatedAt: string;
  createdAt: string;
  createdBy: string;
  title: string;
  content: string;
  visible: boolean;
  startDate: string;
  endDate: string; 
  orderNo: number;
  uploadFiles: GetArticleFile[];
}

// 게시물 등록 요청 데이터
interface CreateArticleReq extends Record<string, unknown> {
  title: string;
  visible: boolean;
  content: string;
  startDate: string;
  endDate: string;
  fileMappingId: number[];
}

// 게시물 등록 응답 데이터
interface CreateArticleRes {
  id: number;
  title: string;
}

// 게시물 수정 요청 데이터
interface UpdateArticleReq extends Record<string, unknown> {
  id: number;
  title: string;
  visible: boolean;
  content: string;
  startDate: string;
  endDate: string;
  orderNo: number;
  fileMappingId: number[];
}

// 게시물 수정 응답 데이터
interface UpdateArticleRes {
  id: number;
  title: string;
}

// 게시물 삭제 요청 데이터
interface RemoveArticlesReq extends Record<string, unknown> {
  selectIds: (number | string)[];
}

// 게시물 삭제 응답 데이터
interface RemoveArticlesRes {
  selectIds: number[];
}

// 정렬 변경 요청 객체
interface SortArticles {
  id: number;
  orderNo: number;
}

// 정렬 변경 응답 데이터
interface SortArticlesRes {
  sorted: boolean;
}

const api = useApiStore.getState().createApiClient('v1/admin/board/articles');

// 게시물 전체 리스트
export const getArticlesList = (params: GetArticlesListParams) => {
  return api.submit<GetArticlesListRes>('get', 'list', params);
};

// 게시물 리스트(페이징)
export const getArticles = (params: GetArticlesParams) => {
  return api.submit<GetArticlesRes>('get', '', params);
};

// 게시물 상세
export const getArticle = (id: number) => {
  return api.submit<GetArticle>('get', `${id}`);
}

// 게시물 등록
export const createArticle = (params: CreateArticleReq) => {
  return api.submit<CreateArticleRes>('post', 'create', params);
}

// 게시물 수정
export const updateArticle = (params: UpdateArticleReq) => {
  return api.submit<UpdateArticleRes>('put', 'update', params);
}

// 게시물 삭제
export const removeArticles = (params: RemoveArticlesReq) => {
  return api.submit<RemoveArticlesRes>('delete', 'remove', params);
}

// 게시물 정렬 변경
export const sortArticles = (params: SortArticles[]) => {
  return api.submit<SortArticlesRes>('patch', 'sort', params as any);
};