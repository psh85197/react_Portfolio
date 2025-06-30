import { FC, useEffect, useState, useCallback } from 'react';
import { getFranchiseNotice } from '@/api/services/franchise-notice';
import { Button } from '@/components/ui/button.tsx';
import { showToast, unescapeHtml } from '@/lib/utils.ts';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { TranslationDTO } from "@/types/translation.ts";
import { useLoadingStore } from "@/stores/loading-store.ts";
import { FranchiseNotice } from "@/types/franchiseNotice.ts";
import dompurify from "dompurify";
import { UploadedFile } from "@/types/file.ts";
import AuthComponent from "@/components/auth/AuthComponent.tsx";
import axios from "axios";
import envConfig from "@/env-config.ts";
import { format } from "date-fns";
import NoContentCase from "@/pages/[lang]/pub/components/layouts/nocontent-case.tsx";

const FranchiseNoticDetailPage: FC = () => {
  const params = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [multiFiles, setMultiFiles] = useState<UploadedFile[]>();
  const { lang } = useParams<{ lang: keyof TranslationDTO }>();
  const trans = lang && ["ko", "en", "zh", "ja"].includes(lang) ? lang : "ko";
  const [notice, setNotice] = useState<FranchiseNotice>();
  const { setLoading, setLoginModalOpen, setExpiredSessionOpen } = useLoadingStore();
  const BASE_API = envConfig.BASE_API;

  // 공지사항 상세 조회
  const fetchFranchiseNoticeDetail = useCallback(async () => {
    if (!params?.id) return;

    try {
      setLoading(true);
      const token = localStorage.getItem("authToken");
      if (!token) {
        setLoginModalOpen(true, () => fetchFranchiseNoticeDetail());
        console.log("FranchiseNoticDetailPage: setLoginModalOpen with callback", useLoadingStore.getState().loginSuccessCallback);
        return;
      }

      const response = await getFranchiseNotice(Number(params.id));

      if (response.code === 200) {
        if (!('code' in response.data)) {
          setNotice(response.data);
          setMultiFiles(response.data?.uploadFiles);
        } else {
          console.error("Unexpected response data:", response.data);
        }
      } else {
        setLoginModalOpen(true, () => fetchFranchiseNoticeDetail());
      }
    } catch (error) {
      console.error('공지사항 데이터 조회 중 오류 발생:', error);
      showToast("destructive", "API 오류", "공지사항 데이터를 로드하는 중 문제가 발생했습니다.");
      setNotice(undefined);
      setLoginModalOpen(true, () => fetchFranchiseNoticeDetail());
    } finally {
      setLoading(false);
    }
  }, [params?.id, setLoading, setLoginModalOpen, setExpiredSessionOpen]);

  const handleFileDownload = async (file: UploadedFile) => {
    try {
      setLoading(true);
      const response = await axios.get(`${BASE_API}v1/front/file/download/${file.id}`, {
        responseType: 'blob',
      });

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
    const token = localStorage.getItem("authToken");
    if (!token) {
      setLoginModalOpen(true, () => fetchFranchiseNoticeDetail());
      console.log("FranchiseNoticDetailPage: setLoginModalOpen with callback", useLoadingStore.getState().loginSuccessCallback);
      return;
    }
    fetchFranchiseNoticeDetail();
  }, [fetchFranchiseNoticeDetail]);

  return (
    <div className="notice-details-wrap">
      {notice ? (
        <>
          <section>
            {notice.isTopNotice && (
              <div className="badge-group">
                <span className="badge badge-skyprimary">공지</span>
              </div>
            )}
            <div className="hgroup-wrap line-type">
              <h2 className="f32-700-140">{notice.title}</h2>
              <p className="desc-txt f16-400-160">등록일 {format(notice.createdAt, 'yyyy-MM-dd')}</p>
            </div>
          </section>
          <section>
            <div className="editor-bx">
              <div
                style={{ whiteSpace: "pre-line" }}
                dangerouslySetInnerHTML={{
                  __html: dompurify.sanitize(unescapeHtml(notice?.content) || ""),
                }}
              />
            </div>
            {(multiFiles ?? []).length > 0 && (
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
              ))
            )}
            <div className="notice-details-bx">
              <ul className="notice-details-list">
                {notice.prevId && (
                  <li className="notice-details-item">
                    <Link to={`/${trans}/franchise/notice/${notice.prevId}`}>
                      <span>이전</span>
                      <span className="txt">{notice.prevTitle}</span>
                    </Link>
                  </li>
                )}
                {notice.nextId && (
                  <li className="notice-details-item">
                    <Link to={`/${trans}/franchise/notice/${notice.nextId}`}>
                      <span>다음</span>
                      <span className="txt">{notice.nextTitle}</span>
                    </Link>
                  </li>
                )}
              </ul>
            </div>
            <div className="btn-wrap">
              <div className="btn-inner">
                <Button className="btn btn-default" onClick={() => navigate(`/${trans}/franchise/notice`)}>
                  목록
                </Button>
              </div>
            </div>
          </section>
        </>
      ) : (
        <>
          <NoContentCase />
        </>
      )}
      <AuthComponent /> {/* AuthComponent 추가 */}
    </div>
  );
};

export default FranchiseNoticDetailPage;