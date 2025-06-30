import { FC } from "react";
import { Select } from "@/components/ui/select-custom";
import "@/assets/scss/style.scss";

const Selectwrap: FC = () => {
  const firstOptions = [
    { value: "option1", label: "한국" },
    { value: "option2", label: "중국" },
    { value: "option3", label: "미국" },
    { value: "option4", label: "일본" },
  ];

  return (
    <>
      <div className="hgroup-wrap">
        <h2 className="f40-700-130">select-wrap</h2>
      </div>
      <div className="select-wrapper">
        <Select
          options={firstOptions}
          title="첫 번째 선택"
          onChange={(value) => console.log("First Selected:", value)}
          onConfirm={() => console.log("First Confirmed")}
        />
      </div>
    </>
  );
};

export default Selectwrap;
