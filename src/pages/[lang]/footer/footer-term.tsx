import {FC, useEffect, useState} from "react";
import {getTermTypeList} from "@/api/services/terms.ts";
import {toast} from "@/hooks/use-toast.ts";
import {TermsDTO, TermsTranslationListDTO, TermOption} from "@/types/terms.ts";
import {useLocation, useParams} from "react-router-dom";
import {TranslationDTO} from "@/types/translation.ts";
import dompurify from "dompurify";
import {unescapeHtml} from "@/lib/utils.ts";
import { Select } from "@/components/ui/select-custom";
import Loading from "@/pages/[lang]/pub/components/common/loading.tsx";
import NoContentCase from "@/pages/[lang]/pub/components/layouts/nocontent-case.tsx";
const FooterTermPage: FC = () => {
  const [allTermList, setAllTermList] = useState<TermsTranslationListDTO>();
  const [termTypeList, setTermTypeList] = useState<TermsDTO[]>();
  const [termOptionList, setTermOptionList] = useState<TermOption[]>([]);
  const [selectTerm, setSelectTerm] = useState<TermsDTO>();
  const { lang,termType } = useParams<{ lang: keyof TranslationDTO,termType:string }>();
  const trans = lang && ["ko", "en", "zh", "ja"].includes(lang) ? lang : "ko";
  const termTypeTxt = termType || "";
  const { state } = useLocation();
  const [title, setTitle] = useState<{ ko: string; en: string; zh: string; ja: string }>({
    ko: "",
    en: "",
    zh: "",
    ja: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  
  const fetchTermTypeList = async (termTypeTxt:string) => {
    try {
      setIsLoading(true);
      const response = await getTermTypeList(termTypeTxt);
      if (response.code === 200 && !("code" in response.data)) {
        setAllTermList(response.data);
        const terms = response.data[trans].length > 0 ? response.data[trans] : response.data.en.length > 0 ? response.data.en : response.data.ko;
        setTermTypeList(terms);
        termTypeToSelect(terms);
        setSelectTerm(terms[0] || null);
      }else{
        console.error('공지사항 데이터를 가져오지 못했습니다.');
      }
    } catch {
      toast({
        variant: "destructive",
        title: "약관 로드 실패",
        description: "약관을 불러오지 못했습니다.",
      });
    }finally {
      setIsLoading(false); // 로딩바 세팅
    }
  };

  const termTypeToSelect = (termList : TermsDTO[]) => {
    if (termList && termList.length > 0) {
      const options = termList.map((term) => ({
        value: String(term.id),
        label: term.effectiveDate?.replace(/-/gi, ".") + " " + term.termText,
      }));
      setTermOptionList(options);
    }
  }

  const handleSelectChange = (value: string) => {
    const selected = termTypeList?.find((t) => String(t.id) === value);
    if (selected) {
      setSelectTerm(selected);
    }
  };

  useEffect(() => {
    if (state) {
      setTitle({
        ko: state.ko || state.title || "",
        en: state.en || state.title || "",
        zh: state.zh || state.title || "",
        ja: state.ja || state.title || "",
      });
    }
    fetchTermTypeList(termTypeTxt);
  }, [termTypeTxt, state]);

  useEffect(() => {
    if( allTermList ) {
      const terms = allTermList[trans].length > 0 ? allTermList[trans] : allTermList.en.length>0?allTermList.en:allTermList.ko;
      setTermTypeList(terms);
      termTypeToSelect(terms);
      setSelectTerm(terms[0] || null);
    }
  }, [trans,allTermList]);

  return (
    <div className="temp-wrap">
      <section>
        <div className='hgroup-wrap more-type flex-wrap'>
          <p className='f40-700-140'>{title[trans] || title.ko}</p>
          {isLoading ?
            (
              <Loading/>
            ) :
            Number(termOptionList?.length) > 0 &&(
              <Select
                value={selectTerm ? String(selectTerm.id) : undefined}
                options={termOptionList}
                onChange={handleSelectChange}
              />
              /*<ShadcnSelect onValueChange={handleSelectChange} value={selectTerm ? String(selectTerm.id) : undefined}>
                <SelectTrigger className="select-wrap type01">
                  <SelectValue placeholder={selectTerm?.effectiveDate}>{selectTerm?.effectiveDate}</SelectValue>
                </SelectTrigger>
                <SelectContent className="rounded-lg">
                  <SelectGroup>
                    {termTypeList?.map((t)=>(
                      <SelectItem
                        className="select-item"
                        value={String(t.id)}
                        key={t.id}
                      >
                        {t.effectiveDate} {t.termTypeText}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </ShadcnSelect>*/
            )
          }
        </div>
      </section>
      <section>
        <div className="temp-bx">
          {selectTerm?(
            <div
              style={{ whiteSpace: "pre-line" }}
              dangerouslySetInnerHTML={{
                __html: dompurify.sanitize(unescapeHtml(selectTerm?.content) || ""),
              }}
            />
            ) :(
            <NoContentCase />
            )
          }
        </div>
      </section>
    </div>
  );
};

export default FooterTermPage;
