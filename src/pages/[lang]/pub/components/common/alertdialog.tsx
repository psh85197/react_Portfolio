import { FC } from 'react';
import { AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger, } from '@/components/ui/alert-dialog';
import '@/assets/scss/style.scss';

const AlertDialogwrap: FC = () => {

  
  return (
    <div>
      <div className="hgroup-wrap">
        <h2 className='f40-700-130'>Alert</h2>
      </div>
      <AlertDialog>
        <AlertDialogTrigger>알럿창 공통</AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>alert타이틀</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your account
              and remove your data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <div className="btn-wrap">
              <div className="btn-inner two-btn">
                <AlertDialogCancel>링크이동</AlertDialogCancel>
                <AlertDialogAction>확인</AlertDialogAction>
              </div>
            </div>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default AlertDialogwrap;
