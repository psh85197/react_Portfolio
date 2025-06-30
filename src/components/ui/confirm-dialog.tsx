import { FC } from "react";
import { CommonAlertDialog, CommonAlertDialogProps } from "./common-alert-dialog";

export type DialogType = 'cancel' | 'insert' | 'insert-complete' | 'update' | 'update-complete' | 'remove' | 'remove-complete';

export interface ConfirmDialogState {
  type: DialogType | null;
  isOpen: boolean;
  onConfirm?: () => void;
  onClose: () => void;
}

/**
 * 공통 Confirm 용 AlertDialog 컴포넌트
 *
 * 중복되는 다이얼로그 코드 제거를 위해 공통 컴포넌트로 제작
 * 각 케이스는 DialogType으로 정의되며, useConfirmDialog 훅과 함께 사용
 *
 * 
 * 참고 페이지 : src\pages\franchise\notice\detail.tsx
 * 사용 예시 :
 *  const { dialog, openDialog } = useConfirmDialog();
 *
 *  <ConfirmDialog dialog={dialog} />
 *
 *  <Button
 *    onClick={() =>
 *      openDialog('insert', () => form.handleSubmit(onSubmit)())
 *    }
 *  >
 *    저장
 *  </Button>
 *
 *  // 저장 성공 시
 *  openDialog('insert-complete', () => navigate('/your/path'));
 */
const ConfirmDialog: FC<{ dialog: ConfirmDialogState }> = ({ dialog }) => {
  const getDialogProps = (): Omit<CommonAlertDialogProps, "isOpen" | "onConfirm" | "onCancel"> | null => {
    switch (dialog.type) {
      case 'cancel':
        return {
          type: 'destructive',
          title: '취소',
          description: (
            <>
              취소하시겠습니까?<br />
              취소 시 입력한 내용은 저장되지 않습니다.
            </>
          ),
          confirmText: '확인',
          cancelText: '취소',
        };
      case 'insert':
        return {
          type: 'normal',
          title: '저장',
          description: '저장하시겠습니까?',
          confirmText: '저장',
          cancelText: '취소',
        };
      case 'insert-complete':
        return {
          title: '저장 완료',
          description: '저장 완료 되었습니다.',
          confirmText: '확인',
        };
      case 'update':
        return {
          type: 'normal',
          title: '수정',
          description: '수정 하시겠습니까?',
          confirmText: '수정',
          cancelText: '취소',
        };
      case 'update-complete':
        return {
          title: '수정 완료',
          description: '수정 완료 되었습니다.',
          confirmText: '확인',
        };
      case 'remove':
        return {
          type: 'destructive',
          title: '삭제',
          description: (
            <>
              삭제하시겠습니까?<br />
              삭제된 데이터는 복구되지 않습니다.
            </>
          ),
          confirmText: '삭제',
          cancelText: '취소',
        };
      case 'remove-complete':
        return {
          title: '삭제 완료',
          description: '삭제 완료 되었습니다.',
          confirmText: '확인',
        };
      default:
        return null;
    }
  };

  const props = getDialogProps();
  if (!dialog.isOpen || !props) return null;

  return (
    <CommonAlertDialog
      {...props}
      isOpen={dialog.isOpen}
      onConfirm={() => {
        dialog.onConfirm?.();
        dialog.onClose();
      }}
      onCancel={dialog.onClose}
    />
  );
};

export default ConfirmDialog;
