import { FC } from "react";
import "@/assets/scss/style.scss";

const Loading: FC = () => {
  return (
    <div className="loading-wrap">
      <div className="spinner-container">
        <svg className="spinner-circle" xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 80 80" fill="none">
          <circle className="circle" cx="40" cy="40" r="37" stroke="#259ABD" fill="none" />
        </svg>
      </div>
    </div>
  );
};

export default Loading;
