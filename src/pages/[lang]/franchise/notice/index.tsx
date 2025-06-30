import { useLoadingStore } from '@/stores/loading-store.ts';
import { FC, useCallback, useEffect, useState } from 'react';
import { getFranchiseNotices, SearchParams } from '@/api/services/franchise-notice.ts';
import { convertToTableDataList } from '@/utils/franchiseNotice.ts';
import { TableFranchiseNotice } from '@/types/franchiseNotice.ts';
import { FranchiseNoticeList } from './notice-list';
import { useParams} from "react-router-dom";
import { TranslationDTO } from "@/types/translation.ts";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form.tsx";
import { Input as ShadcnInput } from "@/components/ui/input.tsx";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from 'zod';

const FranchiseNotice: FC = () => {
  const [searchParams, setSearchParams] = useState<SearchParams>({ searchTitle: '' });
  // setExpiredSessionOpen, setLoginModalOpen은 API 응답 에러 처리용으로 유지
  const { setLoading, setExpiredSessionOpen, setLoginModalOpen } = useLoadingStore();
  const [notices, setNotices] = useState<TableFranchiseNotice[]>([]);
  const { lang } = useParams<{ lang: keyof TranslationDTO }>();
  const trans = lang && ["ko", "en", "zh", "ja"].includes(lang) ? lang : "ko";

  const noticeFormSchema = z.object({
    searchTitle: z.string().optional(),
  });
  type noticeFormData = z.infer<typeof noticeFormSchema>;
  const form = useForm<noticeFormData>({
    resolver: zodResolver(noticeFormSchema),
    defaultValues: {
      searchTitle: "",
    },
  });

  const fetchNotices = useCallback(async (param: SearchParams) => {
    try {
      setLoading(true);
      const response = await getFranchiseNotices(param);

      if (response.code === 200) {
        if ('notices' in response.data) {
          const noticeList = convertToTableDataList(response.data);
          setNotices(noticeList);
        }else {
          console.error("Unexpected response data:", response.data);
          throw new Error(`공지사항 조회에 실패했습니다. (코드: ${response.code})`);
        }
      } else {
        // API 응답 코드가 200이 아닐 경우 (예: 400, 500 등)
        console.error("API call failed with code:", response.code);
        setLoginModalOpen(true, () => fetchNotices(param)); // 로그인 모달 띄우기
      }
    } catch (error) {
      console.error('Error fetching notices:', error);
      // 네트워크 오류 등 예외 발생 시 로그인 모달 띄우기
      setLoginModalOpen(true, () => fetchNotices(param));
    } finally {
      setLoading(false);
    }
  }, [setLoading, setExpiredSessionOpen, setLoginModalOpen]);

  const handleSearch = () => {
    const searchTitle = form.getValues('searchTitle') || '';
    onSubmit({ searchTitle });
  };

  const onSubmit = async (values: noticeFormData) => {
    setSearchParams(values);
    fetchNotices(values);
  };

  useEffect(() => {
    // 페이지가 마운트될 때 데이터를 가져옵니다.
    // 인증 확인은 이제 DashboardHeader의 메뉴 클릭 시점에서 이루어집니다.
    fetchNotices(searchParams);
  }, [fetchNotices, searchParams]);

  return (
    <>
      <div className="flex flex-col bg-white rounded-lg">
        <section>
          <div className="hgroup-wrap">
            <h2 className="f48-700-140">가맹점 공지사항</h2>
          </div>
        </section>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="table-search-bx">
              <div className="component-group">
                <div className="from-group">
                  <div className="input-group">
                    <FormField
                      control={form.control}
                      name="searchTitle"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <ShadcnInput type="text" placeholder="검색어를 입력해 주세요." {...field} search
                                         onSearch={handleSearch} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )} />
                  </div>
                </div>
              </div>
            </div>
          </form>
        </Form>
        <FranchiseNoticeList data={notices} lang={trans} />
      </div>
      {/* AuthComponent는 App.tsx와 같은 최상위 컴포넌트에서 렌더링해야 합니다. */}
      {/* <AuthComponent /> */}
    </>
  );
}

export default FranchiseNotice;