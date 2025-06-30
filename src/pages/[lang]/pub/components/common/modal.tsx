import { FC, useState } from "react";
import "@/assets/scss/style.scss";
import { Modal } from "@/components/ui/modal";
import ico_close from "@/assets/images/icon/ico_modal_close.png";

const ModalDemo: FC = () => {
  const [openLarge, setOpenLarge] = useState(false);
  const [openMedium, setOpenMedium] = useState(false);
  const [openSmall, setOpenSmall] = useState(false);

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
                  onClick={() => setOpenLarge(true)}
                >
                  Large Modal
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="from-group">
          <div className="modal-demo">
            <div className="btn-wrap">
              <div className="btn-inner">
                <button
                  className="btn btn-primary"
                  onClick={() => setOpenMedium(true)}
                >
                  Medium Modal
                </button>
              </div>
            </div>
          </div>
        </div>
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
        isOpen={openLarge}
        onClose={() => setOpenLarge(false)}
        size="large"
        title={
          <div className="modal-title-wrap">
            <h3 className="modal-title">Large Modal</h3>
            <button className="modal-close" onClick={() => setOpenLarge(false)}>
              <img src={ico_close} alt="닫기" />
            </button>
          </div>
        }
      >
        <p>This is a large modal (996px)</p>
      </Modal>

      <Modal
        isOpen={openMedium}
        onClose={() => setOpenMedium(false)}
        size="medium"
        title={
          <div className="modal-title-wrap">
            <h3 className="modal-title">Medium Modal</h3>
            <button className="modal-close" onClick={() => setOpenMedium(false)}>
              <img src={ico_close} alt="닫기" />
            </button>
          </div>
        }
      >
        <p>This is a medium modal (792px)</p>
      </Modal>

      <Modal
        isOpen={openSmall}
        onClose={() => setOpenSmall(false)}
        size="small"
        title={
          <div className="modal-title-wrap">
            <h3 className="modal-title">Small Modal</h3>
            <button className="modal-close" onClick={() => setOpenSmall(false)}>
              <img src={ico_close} alt="닫기" />
            </button>
          </div>
        }
      >
        <p>This is a small modal (588px)</p>
      </Modal>
    </div>
  );
};

export default ModalDemo;
