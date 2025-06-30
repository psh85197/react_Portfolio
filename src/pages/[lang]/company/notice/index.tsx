
import {FC, useCallback, useEffect, useState} from 'react';
import {convertToTableDataList} from '@/utils/company-notice.ts';
import {useParams} from "react-router-dom";
import {TranslationDTO} from "@/types/translation.ts";
import {getCompanyNotices} from "@/api/services/company-notice.ts";
import {NoticeList} from "@/pages/[lang]/company/notice/notice-list.tsx";
import {TableNotice} from "@/types/company-notice.ts";
import {Form, FormControl, FormField, FormItem, FormMessage} from "@/components/ui/form.tsx";
import {Input as ShadcnInput} from "@/components/ui/input.tsx";
import { z } from 'zod';
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {useLoadingStore} from "@/stores/loading-store.ts";
import {useTranslation} from "react-i18next";

const CompanyNoticePage: FC = () => {
  const {t} = useTranslation();
  const { setLoading } = useLoadingStore();
  const [notices, setNotices] = useState<TableNotice[]>([]);
  const { lang } = useParams<{ lang: keyof TranslationDTO }>();
  const trans = lang && ["ko", "en", "zh", "ja"].includes(lang) ? lang : "ko";
  const noticeFormSchema = z.object({
    keyword: z.string().optional(),
  });

  type noticeFormData = z.infer<typeof noticeFormSchema>;
  const form = useForm<noticeFormData>({
    resolver: zodResolver(noticeFormSchema),
    defaultValues: {
      keyword: "",
    },
  });

  const fetchNotices = useCallback(async (keyword:string) => {
    try {
      setLoading(true);
      const response = await getCompanyNotices(keyword); // api 호출

      if (response.code === 200) {
        const noticeList = convertToTableDataList(response.data);
        setNotices(noticeList);
      }
    } catch (error) {
      console.error('Error fetching notices:', error);
    } finally {
      setLoading(false);
    }

  }, []);

  useEffect(() => {
    fetchNotices('');
  }, []);

  const handleSearch = () => {
    const keyword = form.getValues('keyword') || '';
    onSubmit({ keyword });
  };
  const onSubmit = async (values: noticeFormData) => {
    fetchNotices(String(values.keyword) || '');
  }
  useEffect(() => {
    fetchNotices('');
  }, []);

  return (
    <div className="flex flex-col bg-white rounded-lg">
      <section>
        <div className="hgroup-wrap">
          <h2 className="f48-700-140">{t("notice.pageTitle")}</h2>
        </div>
      </section>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}
        >
          <div className="table-search-bx">
            <div className="component-group">
              <div className="from-group">
                <div className="input-group">
                  <FormField
                    control={form.control}
                    name="keyword"
                    render={({field}) => (
                      <FormItem >
                        <FormControl>
                          <ShadcnInput type="text" placeholder={t("notice.searchPlaceholder")} {...field} search onSearch={handleSearch}/>
                        </FormControl>
                        <FormMessage/>
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </div>
          </div>
        </form>
      </Form>
      <NoticeList data={notices} lang={trans}/>
    </div>
  );
}

export default CompanyNoticePage