import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger
} from "@/components/ui/navigation-menu";
import { MenuItems } from '@/data/menu';
import { MenuItem } from "@/types/menu";
import { ChevronRight } from "lucide-react"; // > 아이콘 추가


export function TopNav() {
  return (
    <>
      {/* <div className='min-w-[200px] max-w-[200px] h-auto'>
        <Link to="/home" className="logo-main">
          <img
            src={'/logo.png'}
            alt="로고"
          />
        </Link>
      </div> */}
      <NavigationMenu>
        <NavigationMenuList>
          {MenuItems.map((menu: MenuItem)=>            
              menu.type==='sub'?(
                <NavigationMenuItem key={`${menu.title}-${menu.path}`}>
                  <NavigationMenuTrigger
                    className={'hover:text-third '+(location.pathname.includes(menu.path?menu.path:"#") ? "text-main font-bold":'text-secondary-foreground')}
                  >
                    {menu.icon&&(<menu.icon className="mr-1" size={20}/>)}
                    {menu.title}
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[200px] gap-2 p-2 grid-cols-1">
                      {/* 서브메뉴1 */}
                      {menu.children?.map((submenu) => (
                          <li key={`${submenu.title}-${submenu.path}`}>
                            <NavigationMenuLink asChild>
                              <a
                                className="flex items-center justify-between w-full block select-none rounded-md p-1 leading-none no-underline outline-none transition-colors text-secondary-foreground hover:bg-main hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground relative group"
                                href={submenu.path}
                              >
                                <div className="text-sm font-medium leading-none">{submenu.title}</div>
                                {submenu.type === "sub" && <ChevronRight className="w-4 h-4 shrink-0" />}
                              </a>
                            </NavigationMenuLink>

                            {/* 서브메뉴2 */}
                            {submenu.type === "sub" && (
                              <ul className="">
                                {submenu.children?.map((subSubmenu) => (
                                  <li key={`${subSubmenu.title}-${subSubmenu.path}`}>
                                    <NavigationMenuLink asChild>
                                      <a
                                        className="block select-none space-y-1 rounded-md p-1 leading-none no-underline outline-none transition-colors text-secondary-foreground hover:bg-main hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground"
                                        href={subSubmenu.path}
                                      >
                                        <div className="text-sm font-medium leading-none">{subSubmenu.title}</div>
                                      </a>
                                    </NavigationMenuLink>
                                  </li>
                                ))}
                              </ul>
                            )}
                          </li>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              ):(
                <NavigationMenuItem key={`${menu.title}-${menu.path}`}>
                  <NavigationMenuLink 
                    href={menu.path}
                    className={'group inline-flex h-9 w-max items-center justify-center py-2 px-4 '+(location.pathname.includes(menu.path?menu.path:"#") ? "text-main font-bold":'text-secondary-foreground')}
                  >
                    {menu.icon&&(<menu.icon className="mr-1" size={20}/>)}
                    {menu.title}
                  </NavigationMenuLink>
                </NavigationMenuItem>
              )
          )}
        </NavigationMenuList>
      </NavigationMenu>
    </>
  )
}
//TODO 서브메뉴 위치 조정