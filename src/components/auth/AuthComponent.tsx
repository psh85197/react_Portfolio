// src/components/auth/AuthComponent.tsx

import LoginModal from '@/pages/[lang]/franchise/loginmodal';
import { useLoadingStore } from '@/stores/loading-store.ts';

const AuthComponent = () => {
  const { isLoginModalOpen, setLoginModalOpen, loginSuccessCallback } = useLoadingStore();

  // LoginModal에서 로그인 성공 시 호출될 함수
  const handleLoginSuccess = () => {
    // DashboardHeader에서 전달된 콜백 함수를 실행합니다.
    if (loginSuccessCallback) {
      loginSuccessCallback();
      // 콜백 실행 후에는 스토어에서 콜백 함수를 null로 초기화하여 중복 실행을 방지합니다.
      useLoadingStore.setState({ loginSuccessCallback: null });
    }
  };

  return (
    <LoginModal
      isOpen={isLoginModalOpen}
      onClose={() => setLoginModalOpen(false)} // 모달 닫기 시 useLoadingStore 업데이트
      onLoginSuccess={handleLoginSuccess} // 로그인 성공 시 호출될 함수 전달
    />
  );
};

export default AuthComponent;