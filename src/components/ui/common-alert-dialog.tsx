"use client"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
} from "@/components/ui/alert-dialog";
import {AlertDialogTitle} from "@radix-ui/react-alert-dialog";

export interface CommonAlertDialogProps {
  isOpen: boolean;
  type?: 'normal'|'destructive'
  title?: string | React.ReactNode;
  description?: string | React.ReactNode;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel?: () => void;
}

export function CommonAlertDialog({
  isOpen = false,
  type = 'normal',
  description,
  confirmText = '확인',
  cancelText = '취소',
  onConfirm,
  onCancel,
}: CommonAlertDialogProps) {
  return (
    <AlertDialog open={isOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle >
            </AlertDialogTitle>
        <AlertDialogDescription>
            {description}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <div className="btn-wrap">
            <div className="btn-inner two-btn">
          {onCancel && (
            <AlertDialogCancel onClick={onCancel}>
              {cancelText}
            </AlertDialogCancel>
          )}
          <AlertDialogAction onClick={onConfirm} className={`${type==='destructive'?'bg-red-600 hover:bg-red-400':'bg-main'}`}>
            {confirmText}
          </AlertDialogAction>
            </div>
          </div>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}