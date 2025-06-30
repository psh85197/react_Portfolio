import { FC } from "react";
import { Label } from "@/components/ui/label";
import { ShadcnRadio, RadioItem } from "@/components/ui/radio-group";
import "@/assets/scss/style.scss";

const Radiowrap: FC = () => {
  return (
    <div className="component-wrap">
      <div className="hgroup-wrap">
        <h2 className="f40-700-130">Radio-wrap</h2>
      </div>
      <div className="component-group">
        <div className="from-group">
          <div className="radio-group">
            <label htmlFor="test1" className="input-label">
              <span className="label-txt">
                문의 유형
                <i className="ico-required-mark" role="img" aria-label="필수">
                  *
                </i>
              </span>
            </label>
            <ShadcnRadio defaultValue="가맹 문의">
              <div className="radio-item">
                <RadioItem value="가맹 문의" id="r1" />
                <Label htmlFor="r1">가맹 문의</Label>
              </div>
              <div className="radio-item">
                <RadioItem value="일반 문의" id="r2" />
                <Label htmlFor="r2">일반 문의</Label>
              </div>
              <div className="radio-item">
                <RadioItem value="환급 문의" id="r3" />
                <Label htmlFor="r3">환급 문의</Label>
              </div>
            </ShadcnRadio>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Radiowrap;
