import { create } from "zustand";

interface LoadingStore {
  isLoading: boolean;
  isExpiredSessionOpen: boolean;
  isLoginModalOpen: boolean;
  loginSuccessCallback: (() => void) | null;
  setLoading: (isLoading: boolean) => void;
  setExpiredSessionOpen: (isOpen: boolean, callback?: () => void) => void;
  setLoginModalOpen: (isOpen: boolean, callback?: () => void) => void;
}

export const useLoadingStore = create<LoadingStore>((set) => ({
  isLoading: false,
  isExpiredSessionOpen: false,
  isLoginModalOpen: false,
  loginSuccessCallback: null,
  setLoading: (isLoading) => set({isLoading}),
  setExpiredSessionOpen:(isOpen, callback) =>
    set((state) => {
      return {
        isExpiredSessionOpen: isOpen,
        loginSuccessCallback:  callback || state.loginSuccessCallback ,
      };
    }),
  setLoginModalOpen: (isOpen, callback) =>
    set((state) => ({
      isLoginModalOpen: isOpen,
      loginSuccessCallback: callback || state.loginSuccessCallback , // 콜백 유지 또는 초기화
    })),
}));