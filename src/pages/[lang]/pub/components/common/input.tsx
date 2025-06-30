import { FC } from "react";
import { Input as ShadcnInput } from "@/components/ui/input";
import { Select } from "@/components/ui/select-custom";
import { Button } from "@/components/ui/button";
import "@/assets/scss/style.scss";

const Inputwrap: FC = () => {
  const firstOptions = [
    { value: "option1", label: "2025.04.01 개인정보처리방침" },
    { value: "option2", label: "2025.04.01 개인정보처리방침" },
    { value: "option3", label: "2025.04.01 개인정보처리방침" },
  ];
  return (
    <div className="component-wrap">
      <div className="hgroup-wrap">
        <h2 className="f40-700-130">Input</h2>
      </div>
      <div className="component-group">
        <div className="from-group grid-type">
          <div className="from-group-grid">
            <label htmlFor="test1" className="input-label">
              <span className="label-txt">
                가맹점명
                <i className="ico-required-mark" role="img" aria-label="필수">
                  *
                </i>
              </span>
            </label>
            <div className="input-group">
              <ShadcnInput type="text" id="test1" placeholder="" search />
            </div>
          </div>
        </div>
        <div className="from-group grid-type">
          <div className="from-group-grid">
            <label htmlFor="test1" className="input-label">
              <span className="label-txt">
                성명
                <i className="ico-required-mark" role="img" aria-label="필수">
                  *
                </i>
              </span>
            </label>
            <div className="input-group">
              <ShadcnInput type="text" id="test1" placeholder="" clearable />
            </div>
          </div>
          <div className="from-group-grid">
            <label htmlFor="test1" className="input-label">
              <span className="label-txt">전화번호</span>
            </label>
            <div className="input-group">
              <ShadcnInput
                type="number"
                id="test1"
                placeholder="-제외하고 숫자만 입력"
                clearable
              />
            </div>
          </div>
        </div>
        <div className="from-group">
          <div className="from-group-grid">
            <label htmlFor="test1" className="input-label">
              <span className="label-txt">
                이메일
                <i className="ico-required-mark" role="img" aria-label="필수">
                  *
                </i>
              </span>
            </label>
            <div className="input-group email-type">
              <div className="email-type-input">
                <ShadcnInput type="text" id="test1" placeholder="" clearable />
                <span>@</span>
                <ShadcnInput type="text" id="test1" placeholder="" clearable />
              </div>
              <Select
            options={firstOptions}
            title="첫 번째 선택"
            onChange={(value) => console.log("First Selected:", value)}
            onConfirm={() => console.log("First Confirmed")}
          />
            </div>
          </div>
        </div>
        <div className="from-group">
          <label htmlFor="test1" className="input-label">
            <span className="label-txt">
              내용
              <i className="ico-required-mark" role="img" aria-label="필수">
                *
              </i>
            </span>
          </label>
          <div className="input-group">
            <ShadcnInput type="text" id="test1" placeholder="" clearable />
          </div>
        </div>

        <div className="from-group">
          <label htmlFor="test1" className="input-label">
            <span className="label-txt">파일첨부</span>
          </label>
          <div className="input-group file-type">
            <ShadcnInput type="text" id="test1" placeholder="" disabled />
            <Button className="btn file-btn" type="submit">
              파일 찾기
            </Button>
          </div>
          <p className="error-txt">
            최대 1개만 등록 가능하며, 20Mb 미만의 문서, 그림, 압축 파일만 등록할
            수 있습니다.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Inputwrap;
