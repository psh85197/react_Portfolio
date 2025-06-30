import { FC, useEffect, useMemo, useState, useCallback } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { SelectLink } from "@/components/ui/select-footer.tsx";
import { MenuItems } from "@/data/menu.ts";
import logo from "@/assets/images/contents/logo.png";
import {
  getFooterFirstUriList,
  getFooterSecondUriList,
  MenuVO,
} from "@/api/services/uri-menu.ts";
import { useMenuContext } from "@/pages/[lang]/pub/components/layouts/menu_provider.tsx";
import { HeaderMenuItem } from "@/components/layout/default/header.tsx";

export interface FooterMenuItem {
  id: string;
  title: string;
  type: string;
  path: string;
  ko: string;
  en: string;
  zh: string;
  ja: string;
}

const DashboardFooter: FC = () => {
  const { lang } = useParams<{ lang: string }>();
  const { t } = useTranslation();
  const [activeFooter, setActiveFooter] = useState<string>("");
  const navigate = useNavigate();
  const location = useLocation();
  const { setSelectedMenuPath } = useMenuContext(); // Context 훅 사용
  const [firstFooter, setFirstFooter] = useState<MenuVO[] | null>(null);
  const [secondFooter, setSecondFooter] = useState<MenuVO[] | null>(null);
  const currentLang =
    lang && ["ko", "en", "zh", "ja"].includes(lang) ? lang : "ko";

  // Family Site Options
  const familySiteOptions = [
    {
      value: "https://www.lotte.co.kr/main.do",
      label: t("footer.familySite.lotteHoldings"),
    },
    {
      value: "https://www.lotte.co.kr/business/compDetail.do?compCd=L418",
      label: t("footer.familySite.lotteInnovate"),
    },
    {
      value: "https://www.planetpayment.com/",
      label: t("footer.familySite.planet"),
    },
  ];

  const fetchFirstFooter = async () => {
    try {
      const response = await getFooterFirstUriList();
      setFirstFooter(response.data);
    } catch (error) {
      console.error("Failed to fetch firstFooter:", error);
      setFirstFooter([]);
    }
  };

  const fetchSecondFooter = async () => {
    try {
      const response = await getFooterSecondUriList();
      setSecondFooter(response.data);
    } catch (error) {
      console.error("Failed to fetch secondFooter:", error);
      setSecondFooter([]);
    }
  };

  useEffect(() => {
    fetchFirstFooter();
    fetchSecondFooter();
  }, []);

  // Footer 메뉴 필터링 및 매핑
  const footerMenu = useMemo(
    () => MenuItems.find((menu) => menu.id === "footer"),
    []
  );
  const footerItems = useMemo(() => footerMenu?.children || [], [footerMenu]);

  // firstFooter와 매핑된 메뉴
  const filteredFirstFooterItems: FooterMenuItem[] = useMemo(() => {
    return firstFooter
      ? footerItems
        .filter((item) => firstFooter.some((footer) => footer.id === item.id))
        .map((item) => {
          const matchingFooter = firstFooter.find(
            (footer) => footer.id === item.id
          );
          return {
            id: item.id!,
            title: item.title,
            type: item.type || "link",
            path: item.path || "#",
            ko: matchingFooter?.ko || t(item.title),
            en: matchingFooter?.en || t(item.title),
            zh: matchingFooter?.zh || t(item.title),
            ja: matchingFooter?.ja || t(item.title),
          };
        })
      : [];
  }, [firstFooter, footerItems, t]);

  // secondFooter와 매핑된 메뉴
  const filteredSecondFooterItems: FooterMenuItem[] = useMemo(() => {
    return secondFooter
      ? footerItems
        .filter((item) => secondFooter.some((footer) => footer.id === item.id))
        .map((item) => {
          const matchingFooter = secondFooter.find(
            (footer) => footer.id === item.id
          );
          return {
            id: item.id!,
            title: item.title,
            type: item.type || "link",
            path: item.path || "#",
            ko: matchingFooter?.ko || t(item.title),
            en: matchingFooter?.en || t(item.title),
            zh: matchingFooter?.zh || t(item.title),
            ja: matchingFooter?.ja || t(item.title),
          };
        })
      : [];
  }, [secondFooter, footerItems, t]);

  // 메뉴 선택 로직
  const updateFooterSelection = useCallback(() => {
    const currentPath = location.pathname;
    let newActiveFooter: string = "";
    let newMenuPath: HeaderMenuItem[] = [];

    // filteredFirstFooterItems에서 현재 경로와 일치하는 항목 찾기
    for (const item of filteredFirstFooterItems) {
      if (item.path.replace("[lang]", currentLang) === currentPath) {
        newActiveFooter = item.path;
        newMenuPath = [item];
        break;
      }
    }

    // filteredSecondFooterItems에서 현재 경로와 일치하는 항목 찾기
    if (!newActiveFooter) {
      for (const item of filteredSecondFooterItems) {
        if (item.path.replace("[lang]", currentLang) === currentPath) {
          newActiveFooter = item.path;
          newMenuPath = [item];
          break;
        }
      }
    }

    // 조건적 상태 업데이트로 무한 루프 방지
    if (newActiveFooter !== activeFooter) {
      setActiveFooter(newActiveFooter);
    }
    if (JSON.stringify(newMenuPath) !== JSON.stringify([])) {
      setSelectedMenuPath(newMenuPath);
    }
  }, [
    location.pathname,
    currentLang,
    filteredFirstFooterItems,
    filteredSecondFooterItems,
    setSelectedMenuPath
  ]);

  // filteredFirstFooterItems와 filteredSecondFooterItems 생성 후 실행
  useEffect(() => {
    updateFooterSelection();
  }, [updateFooterSelection]);

  // 메뉴 클릭 핸들러
  const handleFooterMenuClick = (item: FooterMenuItem) => {
    setActiveFooter(item.path);
    setSelectedMenuPath([item]); // Footer는 단일 메뉴이므로 배열에 단일 항목만 저장
    navigate(item.path.replace("[lang]", currentLang));
  };

  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-logo">
          <Link to={`/${currentLang}/`} className="footer-logo-img">
            <img src={logo} alt={t("common.logoAltText")} />
          </Link>
        </div>
        <div className="footer-info">
          {/* Footer 1Dep 메뉴 */}
          <ul className="privacy-list">
            {filteredFirstFooterItems.map((item) => (
              <li key={`${item.id}-${item.path}`}>
                <Link
                  to={item.path.replace("[lang]", currentLang)}
                  className={activeFooter === item.path ? "active" : ""}
                  onClick={() => handleFooterMenuClick(item)}
                >
                  <span>{item[currentLang as keyof FooterMenuItem]}</span>
                </Link>
              </li>
            ))}
          </ul>
          {/* Footer 2Dep 메뉴 */}
          <ul className="privacy-list">
            {filteredSecondFooterItems
              .filter(
                (item) =>
                  item.id !== "footer-term-video-privacy" ||
                  currentLang === "ko"
              )
              .map((item, idx) => (
                <li key={`${item.id}-${item.path}`}>
                  <Link
                    to={item.path.replace("[lang]", currentLang)}
                    state={{
                      ko: item.ko,
                      en: item.en,
                      zh: item.zh,
                      ja: item.ja,
                    }}
                    className={idx === 0 ? "active" : ""}
                    onClick={() => handleFooterMenuClick(item)}
                  >
                    <span>{item[currentLang as keyof FooterMenuItem]}</span>
                  </Link>
                </li>
              ))}
          </ul>
          <address>
            <dl>
              <dt>{t("footer.addressTitle")}</dt>
              <dd>{t("footer.addressValue")}</dd>
            </dl>
            <div className="footer-group">
              <dl>
                <dt>{t("footer.telTitle")}</dt>
                <dd>02-6925-2033</dd>
              </dl>
              <dl>
                <dt>{t("footer.fax")}</dt>
                <dd>02-2038-2193</dd>
              </dl>
              <dl className="email-label">
                <dt>{t("footer.emailTitle")}</dt>
                <dd>cube@cuberefund.com</dd>
              </dl>
            </div>
          </address>
          <p className="copyright">{t("footer.copyright")}</p>
        </div>
        <div className="footer-select">
          <SelectLink
            title={t("footer.familySiteTitle")}
            options={familySiteOptions}
          />
        </div>
      </div>
    </footer>
  );
};

export default DashboardFooter;