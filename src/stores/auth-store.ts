// src/stores/auth-store.ts

import { User } from '@/types/user';
import { create } from 'zustand';

interface AuthState {
  token: string | null;
  refreshToken: string | null;
  user: User | null;
  setTokens: (access: string, refresh: string | null) => void;
  clearAuth: () => void;
  isAuthenticated: () => boolean;
  initializeAuth: () => void;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  token: null, // 초기값은 null로 설정 (initializeAuth에서 로드)
  refreshToken: null, // 초기값은 null로 설정 (initializeAuth에서 로드)
  user: null,

  setTokens: (authToken: string, refreshToken: string | null) => {
    // 핵심: localStorage 뿐만 아니라 Zustand 상태도 함께 업데이트
    localStorage.setItem('authToken', authToken);
    if (refreshToken) {
      localStorage.setItem('refreshToken', refreshToken);
    } else {
      localStorage.removeItem('refreshToken');
    }
    set({ token: authToken, refreshToken: refreshToken }); // 여기서 Zustand 상태가 업데이트되어야 함
  },

  clearAuth: () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('mbrAddr');
    localStorage.removeItem('mbrName');
    localStorage.removeItem('rptAuthFlag');
    localStorage.removeItem('userId');
    localStorage.removeItem('refreshToken');
    set({ token: null, refreshToken: null, user: null });
  },

  // 핵심: get().token을 사용하여 현재 Zustand 상태의 token 값을 확인
  isAuthenticated: () => {
    return !!get().token
  },

  initializeAuth: () => {
    const authToken = localStorage.getItem('authToken');
    const refreshToken = localStorage.getItem('refreshToken');
    set({ token: authToken, refreshToken: refreshToken });
  },
}));