import {showToast, unescapeHtml} from '@/lib/utils.ts';
import { FC, useEffect, useState } from 'react';

import {Link, useNavigate, useParams} from 'react-router-dom';

import {getCompanyNotice} from "@/api/services/company-notice.ts";
import {NoticeFrontListDTO} from "@/types/company-notice.ts";
import {TranslationDTO} from "@/types/translation.ts";
import {Button} from "@/components/ui/button.tsx";
import dompurify from "dompurify";
import {UploadedFile} from "@/types/file.ts";
import axios from "axios";
import envConfig from "@/env-config.ts";
import {useLoadingStore} from "@/stores/loading-store.ts";
import {format} from "date-fns";
import { useTranslation } from 'react-i18next';
import NoContentCase from "@/pages/[lang]/pub/components/layouts/nocontent-case.tsx";

const CompanyNoticeDetailPage: FC = () => {
  const { t } = useTranslation();
  const { setLoading } = useLoadingStore();
  const params = useParams();
  const { lang } = useParams<{ lang: keyof TranslationDTO }>();
  const trans = lang && ["ko", "en", "zh", "ja"].includes(lang) ? lang : "ko";
  const [notice,setNotice]= useState<NoticeFrontListDTO>();
  const [transTitle,setTransTitle]= useState('');
  const [transContent,setTransContent]= useState('');
  const navigate = useNavigate();
  const [multiFiles, setMultiFiles] = useState<UploadedFile[]>(); // 다건첨부파일
  const BASE_API  = envConfig.BASE_API;

  // 공지사항(가맹점) 데이터 상세 조회
  const fetchNoticeDetail = async () => {
    if (!params?.id) return;
    try {
      setLoading(true);
      // API 호출
      const response = await getCompanyNotice(Number(params.id));
      if (response.code === 200 && !("code" in response.data)) {
        const data = response.data;
        setNotice(data);
        setTransTitle(data[trans].title==""?data.en.title == ""?data.ko.title:data.en.title:data[trans].title);
        setTransContent(data[trans].content==""?data.en.content == ""?data.ko.content:data.en.content:data[trans].content);
        setMultiFiles(data.uploadFiles);

      } else {
        console.error('공지사항 데이터를 가져오지 못했습니다.');
        showToast("destructive", "데이터 로드 실패", "공지사항 정보를 가져오지 못했습니다.");
      }
    } catch (error) {
      console.error('공지사항 데이터 조회 중 오류 발생:', error);
      showToast("destructive", "API 오류", "공지사항 데이터를 로드하는 중 문제가 발생했습니다.");
    }finally {
      setLoading(false);
    }
  };

  const handleFileDownload = async (file: UploadedFile) => {
    try {
      setLoading(true);
      const response = await axios.get(BASE_API+`v1/front/file/download/${file.id}`, {
        responseType: 'blob', // 파일 다운로드를 위해 blob 타입 지정
      });

      // Blob 데이터를 다운로드 가능한 링크로 변환
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', file.originName);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('파일 다운로드 중 오류 발생:', error);
      showToast("destructive", "다운로드 오류", "파일을 다운로드하는 중 문제가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!params?.id) return;
    fetchNoticeDetail(); // 상세 데이터 조회
  }, [params?.id]);

  useEffect(() => {
    if(notice) {
      setTransTitle(notice[trans].title==""?notice.en.title == ""?notice.ko.title:notice.en.title:notice[trans].title);
      setTransContent(notice[trans].content==""?notice.en.title == ""?notice.ko.title:notice.en.title:notice[trans].title);
    }
  }, [trans]);

  return (
    <div className="notice-details-wrap">
      {notice &&
        <>
          <section>
            {notice.isTopNotice &&
              <div className="badge-group">
                <span className="badge badge-skyprimary">{t("notice.badge")}</span>
              </div>
            }
            <div className="hgroup-wrap line-type">
              <h2 className="f32-700-140">{transTitle}</h2>
              <p className="desc-txt f16-400-160">{t("notice.registrationDateLabel")} {format(notice.createdAt, 'yyyy-MM-dd')}</p>
            </div>
          </section>
          <section>
            <div className="editor-bx">
              <div
                style={{ whiteSpace: "pre-line" }}
                dangerouslySetInnerHTML={{
                  __html: dompurify.sanitize(unescapeHtml(transContent) || ""),
                }}
              />
            </div>
            {/* 20250527 퍼블수정 */}
            {(multiFiles?? []).length > 0 && (
              multiFiles?.map((file, index) => (
                <div key={index}>
                  <Button
                    variant="link"
                    className="text-blue-600 underline text-sm hover:text-blue-800 detail-file"
                    onClick={() => handleFileDownload(file)}
                  >
                    {file.originName}
                  </Button>
                </div>
              )))}
            <div className="notice-details-bx">
              <ul className="notice-details-list">
                {notice.previous.id &&
                  <li className="notice-details-item">
                    <Link to={`/${trans}/company/notice/${notice.previous.id}`}>
                      <span>{t("notice.prev")}</span>
                      <span className="txt">{notice.previous[trans]==""?notice.previous.en == ""?notice.previous.ko:notice.previous.en:notice.previous[trans]}</span>
                    </Link>
                  </li>
                }
                {notice.next.id &&
                  <li className="notice-details-item">
                    <Link to={`/${trans}/company/notice/${notice.next.id}`}>
                      <span>{t("notice.next")}</span>
                      <span className="txt">{notice.next[trans]==""?notice.next.en == ""?notice.next.ko:notice.next.en:notice.next[trans]}</span>
                    </Link>
                  </li>
                }
              </ul>
            </div>
            <div className="btn-wrap">
              <div className="btn-inner">
                <Button className="btn btn-default" onClick={() => navigate(`/${trans}/company/notice`)}>{t("notice.list")}</Button>
              </div>
            </div>
          </section>
        </>
      }
      {!notice &&(
        <>
          <NoContentCase />
        </>
      )}
    </div>
  )
}

export default CompanyNoticeDetailPage