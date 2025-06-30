import { FC, useState } from "react";
import "@/assets/scss/style.scss";
import { Modal } from "@/components/ui/modal";
import ico_close from "@/assets/images/icon/ico_modal_close.png";
import login_logo from "@/assets/images/contents/login_logo.png";
import { Input as ShadcnInput } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const LoginModal: FC = () => {
  const [openSmall, setOpenSmall] = useState(false);
  const [storeNumber, setStoreNumber] = useState(""); // 가맹점 번호
  const [authCode, setAuthCode] = useState(""); // 확인 코드

  return (
    <div>
      <div className="hgroup-wrap">
        <h2 className="f40-700-130">Modal</h2>
      </div>

      <div className="component-group">
        <div className="from-group">
          <div className="modal-demo">
            <div className="btn-wrap">
              <div className="btn-inner">
                <button
                  className="btn btn-primary"
                  onClick={() => setOpenSmall(true)}
                >
                  Small Modal
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Modal
        isOpen={openSmall}
        onClose={() => setOpenSmall(false)}
        size="small"
        className="login"
        title={
          <div className="modal-title-wrap">
            <div className="logo-bx">
              <img src={login_logo} alt="키오스크 텐페이" />
            </div>
            <h2 className="f32-700-140 tit">가맹점 로그인</h2>
            <p className="f16-400-160 desc">
            해당 서비스는 가맹점 고객을 위한 서비스로 로그인이 필요합니다.
            </p>
            <button className="modal-close" onClick={() => setOpenSmall(false)}>
              <img src={ico_close} alt="닫기" />
            </button>
          </div>
        }
      >
        {/* 퍼블수정 : 20250520 인풋입력값 및 텍스트 수정 */}
        <div className="modal-content">
          {/* 아이디 */}
          <div className="from-group">
            <label htmlFor="storeNumber" className="input-label">
              <span className="label-txt">
                아이디
                <i className="ico-required-mark" role="img" aria-label="필수">*</i>
              </span>
            </label>
            <div className="input-group">
              <ShadcnInput
                type="text"
                id="storeNumber"
                value={storeNumber}
                onChange={(e) => setStoreNumber(e.target.value)}
                clearable
              />
            </div>
          </div>
        {/* 퍼블수정 : 20250520 인풋입력값 및 텍스트 수정 */}
          {/* 패스워드 */}
          <div className="from-group">
            <label htmlFor="authCode" className="input-label">
              <span className="label-txt">
                패스워드
                <i className="ico-required-mark" role="img" aria-label="필수">*</i>
              </span>
            </label>
            <div className="input-group">
              <ShadcnInput
                type="password"
                id="authCode"
                value={authCode}
                onChange={(e) => setAuthCode(e.target.value)}
                clearable
              />
            </div>
          </div>

          <div className="btn-wrap">
            <Button className="btn btn-primary">로그인</Button>
          </div>

          <div className="alert-box">
            <p className="alert-text">
              <i className="icon"></i>가맹점 로그인에 대한 문의는 대표전화로 문의해주세요.
              <br />
              (대표전화 02-6925-2033)
            </p>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default LoginModal;
