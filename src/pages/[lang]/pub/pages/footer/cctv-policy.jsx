import React from "react";
import { Select } from "@/components/ui/select-custom";
const CctvPolicy = () => {
  const firstOptions = [
    { value: "option1", label: "2025.04.01 영상정보처리기기 운영 관리 지침" },
    { value: "option2", label: "2025.04.01 영상정보처리기기 운영 관리 지침" },
    { value: "option3", label: "2025.04.01 영상정보처리기기 운영 관리 지침" },
  ];
  return (
    <>
      <section>
        <div className="hgroup-wrap more-type">
          <p className="f40-700-140">영상정보처리기기 운영 관리 지침</p>
          <Select
            options={firstOptions}
            title="첫 번째 선택"
            onChange={(value) => console.log("First Selected:", value)}
            onConfirm={() => console.log("First Confirmed")}
          />
        </div>
      </section>
      <section>
        <div className="temp-bx">에디터영역</div>
      </section>
    </>
  );
};

export default CctvPolicy;
