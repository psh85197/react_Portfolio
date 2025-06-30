import { useState } from "react";
import { ConfirmDialogState, DialogType } from "@/components/ui/confirm-dialog";

export const useConfirmDialog = () => {
  const [dialog, setDialog] = useState<Omit<ConfirmDialogState, 'onClose'>>({
    type: null,
    isOpen: false,
    onConfirm: undefined,
  });

  const openDialog = (type: DialogType, onConfirm?: () => void) => {
    setDialog({ type, isOpen: true, onConfirm });
  };

  const closeDialog = () => {
    setDialog({ type: null, isOpen: false });
  };

  return {
    dialog: { ...dialog, onClose: closeDialog },
    openDialog,
  };
};