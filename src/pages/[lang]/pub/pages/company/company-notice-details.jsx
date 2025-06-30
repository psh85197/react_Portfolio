import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const NoticeDetailsPage = () => {
  return (
    <div className="notice-details-wrap">
      <section>
        <div className="badge-group">
          <span className="badge badge-skyprimary">공지</span>
        </div>
        <div className="hgroup-wrap line-type">
          <h2 className="f32-700-140">[공고] 외부감사인 선임 공고</h2>
          <p className="desc-txt f16-400-160">등록일 2025.03.14</p>
        </div>
      </section>
      <section>
        <div className="editor-bx">에디터 영역입니다.</div>
        <div className="notice-details-bx">
          <ul className="notice-details-list">
            <li className="notice-details-item">
              <Link to="/">
                <span>이전</span>
                <span className="txt">[일정] 롯데 이노베이트 보안 작업 안내</span>
              </Link>
            </li>
            <li className="notice-details-item">
              <Link to="/">
                <span>다음</span>
                <span className="txt">[공지] 가맹점 서비스 오픈 안내</span>
              </Link>
            </li>
          </ul>
        </div>
        <div className="btn-wrap">
          <div className="btn-inner">
          <Button className="btn btn-default">목록</Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default NoticeDetailsPage;
