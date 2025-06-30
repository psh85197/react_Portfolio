import { FC, useState } from "react";
import {Link, useParams} from "react-router-dom";
import { useNavigate } from "react-router";
import { 
  Select as ShadcnSelect,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { MenuItems } from '@/data/menu';
import { MenuItem } from "@/types/menu";

const DashboardHeader: FC = () => {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const { lang } = useParams<{ lang: string }>();
  const navigate = useNavigate();
  const handleMenuClick = (menuName: string) => {
    setActiveMenu(activeMenu === menuName ? null : menuName);
  };

  const handleMenuHover = (menuName: string) => {
    setActiveMenu(menuName);
  };

  const handleMenuLeave = () => {
    setActiveMenu(null);
  };
  const handleLanguageChange = (newLang: string) => {
    const currentPath = window.location.pathname;
    const newPath = currentPath.replace(/^\/[^/]+/, `/${newLang}`);
    navigate(newPath);
  };

  const currentLang = lang && ["ko", "en", "zh", "ja"].includes(lang) ? lang : "ko";


  return (
    <header className="header">
      <ul className="skipnav">
        <li>
          <a href="#content" className="hide-txt">컨텐츠 바로가기</a>
        </li>
      </ul>
      <div className="header-inner">
        <div className="header-content">
          <div className="gnb-wrap">
            <div className="gnb-logo">
              <h1>
                <Link to="/home" className="logo">
                  <span className="hide-txt">Logo</span>
                </Link>
              </h1>
            </div>
            {/* Gnb */}
            <nav className="gnb-area">
              <ul className="gnb-list">
              {MenuItems.map((menu: MenuItem)=>
                menu.type==='sub'&& menu.title != 'Footer'&&(
                  <li
                    key={`${menu.title}-${menu.path}`}
                    className={`one-depth ${activeMenu === menu.path?.replace("/","") ? 'active' : ''}`}
                    onClick={() => handleMenuClick(menu.path? menu.path.replace("/",""):"#")}
                    onMouseEnter={() => handleMenuHover(menu.path?menu.path.replace("/",""):"#")}
                    onMouseLeave={handleMenuLeave}
                  >
                    <Link to="/">
                      <span>{menu.title}</span>
                    </Link>
                    <ul className="gnb-sub">
                      {/* 서브메뉴1 */}
                      {menu.children?.map((submenu) => (
                        <li className="two-depth" key={`${submenu.title}-${submenu.path}`}>
                          <Link to={submenu.path?submenu.path?.replace("[lang]",currentLang):"#"}>
                            <span>{submenu.title}</span>
                          </Link>
                        </li>
                      ))}
                      </ul>
                  </li>
                )
              )}
              </ul>
            </nav>
            <div className="language-select">
              <ShadcnSelect value={currentLang} onValueChange={handleLanguageChange}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select a Language" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Language</SelectLabel>
                    <SelectItem value="ko">KO</SelectItem>
                    <SelectItem value="en">EN</SelectItem>
                    <SelectItem value="zh">CN</SelectItem>
                    <SelectItem value="ja">JP</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </ShadcnSelect>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default DashboardHeader;

