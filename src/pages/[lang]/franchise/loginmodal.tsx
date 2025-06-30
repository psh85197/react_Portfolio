import { FC, useState, useEffect } from "react";
import "@/assets/scss/style.scss";
import { Modal } from "@/components/ui/modal";
import ico_close from "@/assets/images/icon/ico_modal_close.png";
import login_logo from "@/assets/images/contents/login_logo.png";
import { Input as ShadcnInput } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { login } from "@/api/services/auth.ts";
import { useAuthStore } from '@/stores/auth-store.ts';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: () => void;
}

const LoginModal: FC<LoginModalProps> = ({ isOpen, onClose, onLoginSuccess }) => {
  // username과 password를 string 타입으로 초기화 (빈 문자열)
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loginError, setLoginError] = useState<string | null>(null);

  const { setTokens } = useAuthStore();

  const preventPageScroll = () => {
    if (typeof window !== 'undefined') {
      document.documentElement.style.setProperty('--scrollbar-offset', '0px');
      document.documentElement.classList.add('modal-open');
    }
  };

  const allowPageScroll = () => {
    if (typeof window !== 'undefined') {
      document.documentElement.classList.remove('modal-open');
      document.documentElement.style.removeProperty('--scrollbar-offset');
    }
  };

  useEffect(() => {
    if (isOpen) {
      // 모달이 열릴 때 username과 password를 빈 문자열로 초기화
      setUsername("");
      setPassword("");
      preventPageScroll();
    } else {
      allowPageScroll();
    }

    return () => {
      allowPageScroll();
    };
  }, [isOpen]);

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoginError(null);

    try {
      const response = await login({ username, password });
      if (response?.data.jwtToken && response?.data.mbrName) {
        localStorage.setItem("authToken", response.data.jwtToken);
        localStorage.setItem("mbrName", response.data.mbrName);
        localStorage.setItem("mbrAddr", response.data.mbrAddr);
        localStorage.setItem("rptAuthFlag", response.data.rptAuthFlag);
        localStorage.setItem("userId", response.data.userId);

        setTokens(response.data.jwtToken, null);

        console.log("로그인 성공:", response);
        onClose();
        onLoginSuccess();
      } else {
        setLoginError("아이디 또는 패스워드를 잘못 입력하셨습니다. 다시 확인해 주세요.");
        console.error("로그인 실패:", response);
      }
    } catch (error: any) {
      setLoginError("아이디 또는 패스워드를 잘못 입력하셨습니다. 다시 확인해 주세요.");
      console.error("로그인 오류:", error);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="small"
      className="login"
      title={
        <div className="modal-title-wrap">
          <div className="logo-bx">
            <img src={login_logo} alt="큐브 리펀드 로고" />
          </div>
          <h2 className="f32-700-140 tit">가맹점 로그인</h2>
          <p className="f16-400-160 desc">
            해당 서비스는 가맹점 고객을 위한 서비스로 로그인이 필요합니다.
          </p>
          <button className="modal-close" onClick={onClose}>
            <img src={ico_close} alt="닫기" />
          </button>
        </div>
      }
    >
      <div className="modal-content">
        <form onSubmit={handleLogin}>
          <div className="from-group">
            <label htmlFor="username" className="input-label">
              <span className="label-txt">
                아이디
                <i className="ico-required-mark" role="img" aria-label="필수">*</i>
              </span>
            </label>
            <div className="input-group">
              <ShadcnInput
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)} // 타입 오류 수정
                placeholder="아이디를 입력해주세요."
              />
            </div>
          </div>

          <div className="from-group">
            <label htmlFor="password" className="input-label">
              <span className="label-txt">
                비밀번호
                <i className="ico-required-mark" role="img" aria-label="필수">*</i>
              </span>
            </label>
            <div className="input-group">
              <ShadcnInput
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)} // 타입 오류 수정
                placeholder="비밀번호를 입력해주세요."
              />
            </div>
          </div>

          {loginError && <p className="error-message" style={{ color: "red" }}>{loginError}</p>}

          <div className="btn-wrap">
            <Button type="submit" className="btn btn-primary">
              로그인
            </Button>
          </div>

          <div className="alert-box">
            <p className="alert-text">
              <i className="icon"></i>가맹점 로그인에 대한 문의는 대표전화로 문의해주세요.
              <br />
              (대표전화 02-6925-2033)
            </p>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default LoginModal;