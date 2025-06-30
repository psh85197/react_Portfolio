import { LucideIcon } from "lucide-react";
import {HeaderMenuItem} from "@/components/layout/default/header.tsx";
import {FooterMenuItem} from "@/components/layout/default/footer.tsx";

export interface MenuItem {
  title: string;
  path?: string;
  icon?: LucideIcon;
  type?: string;
  active?: boolean;
  children?: MenuItem[];
}
export interface MenuItemBread {
  title: string;
  path: string;
  type?: string;
  active?: boolean;
  id?: string; // API 호출용 MenuItem id
  ko: string;
  en: string;
  zh: string;
  ja: string;
  children?: MenuItemBread[];
}
// 언어 키 타입 정의
export type LanguageKey = 'ko' | 'en' | 'zh' | 'ja';
export type CommonMenuItem = HeaderMenuItem | FooterMenuItem;