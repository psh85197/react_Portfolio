import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

import {toast} from "@/hooks/use-toast";
import dompurify from "dompurify";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const formatDateTime = (isoString: string): string => {
  if (!isoString) return "";

  const [date, timeWithMs] = isoString.split("T");
  const time = timeWithMs?.split(".")[0]; // 마이크로초 제거
  return `${date} ${time}`;
};

/**
 * BASE_API와 상대 경로를 안전하게 이어주는 함수
 * 
 * - 중복 슬래시 (//) 방지
 * - base가 '/'로 끝나고, path가 '/'로 시작하는 경우 대비
 */
export const joinUrl = (base: string, path: string): string => {
  return `${base.replace(/\/+$/, "")}/${path.replace(/^\/+/, "")}`;
}

/**
 * HTML 이스케이프 문자열을 디코딩
 * 
 * 예: "&lt;p&gt;" → "<p>"
 */
export const unescapeHtml = (escapedStr: string): string => {
  if (!escapedStr) return "";

  const textarea = document.createElement("textarea");
  textarea.innerHTML = escapedStr; // HTML 엔티티 디코딩: &lt;p&gt; -> <p>
  let decodedStr = textarea.value;

  // 빈 <p></p> 태그를 <br> 태그로 변환 (전역 검색)
  // 예: <p></p><p></p> -> <br><br>
  decodedStr = decodedStr.replace(/<p><\/p>/g, '<br>');

  return decodedStr;
};

/**
 * 공통 alert 창
 */
export const showToast = (variant: "default" | "destructive", title: string, description: string) => {
  toast({
    variant,
    title,
    description,
  });
};

/**
 * HTML 문자열에서 태그를 제거하여 순수 텍스트를 반환
 *
 * 예: stripHtml('<p class="text-node">가맹점 공지사항 테스트</p>') -> "가맹점 공지사항 테스트"
 */

export function stripHtml(html: string): string {
  const sanitizedHtml = dompurify.sanitize(html);
  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = sanitizedHtml;
  return tempDiv.textContent || tempDiv.innerText || '';
}

export const dateStrText=(dateStr:string) => {
  const year = dateStr.slice(0, 4);
  const month = dateStr.slice(4, 6);
  const day = dateStr.slice(6, 8);
  const date = new Date(`${year}-${month}-${day}`);
  const formattedDate = date.toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).replace(/(\d{4})\. (\d{2})\. (\d{2})\./, '$1.$2.$3');
  return formattedDate;
}
