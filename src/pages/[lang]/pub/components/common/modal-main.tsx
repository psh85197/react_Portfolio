import { FC, useState } from "react";
import { Modal } from "@/components/ui/modal";
import { Checkbox } from "@/components/ui/checkbox";
import "@/assets/scss/style.scss";

type CheckedItemsKeys = 'terms1' | 'terms2' | 'terms3' | 'terms4';

const ModalDemo: FC = () => {
  const [checkedItems, setCheckedItems] = useState({
    terms1: false,
    terms2: false,
    terms3: false,
    terms4: false,
  });

  const handleCheckboxChange = (id: CheckedItemsKeys) => {
    setCheckedItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };
  const [openSmall, setOpenSmall] = useState(false);

  return (
    <div>
      <div className="hgroup-wrap">
        <h2 className="f40-700-130">Modal-main</h2>
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
        className="modal-main"
        isOpen={openSmall}
        onClose={() => setOpenSmall(false)}
        size="small"
        title={
          <div className="modal-title-wrap">
            <h3 className="modal-title">큐브리펀드 RENEWAL OPEN</h3>
          </div>
        }
      >
        <div className="modal-cont">
          <div className="info-wrap">
            <p>
              큐브리펀드 홈페이지가 고객님께 더 편리하고 유용한 서비스로
              개편되었습니다. 앞으로도 많은 방문 부탁드리며, 항상 고객님들께
              최선을 다하고 보다 나은 서비스 이용을 위해 최선을 다하겠습니다.
            </p>
            <div className="notice-bx">
              <p>
                홈페이지 개편 작업으로 일시적으로 이용이 중단됩니다.
                2025.06.02(월) AM 02:00 - 09:00{" "}
              </p>
            </div>
          </div>
          <div className="btn-wrap">
            <div className="checkbox-wrap">
              <Checkbox
                className="checkbox-input"
                id="checkbox-1"
                checked={checkedItems.terms1}
                onCheckedChange={() => handleCheckboxChange("terms1")}
              />
              <label htmlFor="checkbox-1" className="">
              오늘 하루 보지않기
              </label>
            </div>
            <button className="btn" onClick={() => setOpenSmall(false)}>
              닫기
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ModalDemo;
