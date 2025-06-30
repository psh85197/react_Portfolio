import { TopNav } from '@/components/layout/default/top-nav'
import { Button } from '@/components/ui/button'
import { Header } from '@/components/ui/header'
import { useAuth } from '@/hooks/use-auth'
import { FC } from "react"
import {Outlet, useNavigate} from 'react-router-dom'

const MypageLayout: FC = () => {
  const { logout } = useAuth()
  const navigate = useNavigate()

  const mypage = () => {
    navigate("/mypage")
  }

  return (
    <>
      {/* ===== Top Heading ===== */}
      <Header className='w-full justify-between'>
        <TopNav />
        <div className='flex w-full justify-end space-x-4'>
          <Button
              variant={'ghost'}
              className='bg-primary-foreground'
              onClick={mypage}
          >
            마이페이지
          </Button>
          <Button 
            variant={'ghost'} 
            className='bg-primary-foreground'
            onClick={()=>logout()}
            >
          </Button>
        </div>
      </Header>
      <div className="w-full p-4">
        <Outlet />
      </div>
    </>
  )
}

export default MypageLayout;

