import { FC, useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import "@/assets/scss/style.scss";

type CheckboxId = 'terms1' | 'terms2' | 'terms3' | 'terms4';

interface CheckedItems {
  terms1: boolean;
  terms2: boolean;
  terms3: boolean;
  terms4: boolean;
}

const Checkboxwrap: FC = () => {
  const [checkedItems, setCheckedItems] = useState<CheckedItems>({
    terms1: false,
    terms2: false,
    terms3: false,
    terms4: false,
  });
  const handleCheckboxChange = (id: CheckboxId) => {
    setCheckedItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };
  return (
    <div className="component-wrap">
      <div className="hgroup-wrap">
        <h2 className="f40-700-130">Checkbox</h2>
      </div>
      <div className="component-group">
        <div className="from-group">
          <div className="checkbox-wrap">
            <Checkbox
              className="checkbox-input"
              id="checkbox-1"
              checked={checkedItems.terms1}
              onCheckedChange={() => handleCheckboxChange("terms1")}
            />
            <label htmlFor="checkbox-1" className="">
              위 고유 식별 정보의 수집 이용에 동의합니다.
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkboxwrap;
