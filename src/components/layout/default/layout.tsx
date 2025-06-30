import { Button } from '@/components/ui/button'
import { Header } from '@/components/ui/header'
import { Toaster } from '@/components/ui/toaster'
import { TooltipProvider } from '@/components/ui/tooltip'
import { useAuth } from '@/hooks/use-auth'
import { FC } from "react"
import { Outlet } from 'react-router-dom'
import DashboardHeader from './header'
import DefaultFooter from "@/components/layout/default/footer";
import {LoadingOverlay} from "@/components/ui/loading-overlay.tsx";
import {useLoadingStore} from "@/stores/loading-store.ts";

const DefaultLayout: FC = () => {
  const { logout } = useAuth()
  const {isLoading} = useLoadingStore()

  return (
    <>
      <LoadingOverlay loading={isLoading}>
      {/* ===== Top Heading ===== */}
      <Header className='w-full justify-between'>
        <DashboardHeader />
        <div className='flex w-full justify-end space-x-4'>
          <Button 
            variant={'ghost'} 
            className='bg-primary-foreground'
            onClick={()=>logout()}
            >
          </Button>
        </div>
      </Header>
      <div className="w-full p-10 max-w-screen-2xl mx-auto component-layout">
        <TooltipProvider>
          <Outlet />
        </TooltipProvider>
        <Toaster />
      </div>
      <DefaultFooter />
      </LoadingOverlay>
    </>
  )
}

export default DefaultLayout;

