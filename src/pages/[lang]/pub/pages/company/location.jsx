import React from "react";
import map_images from "@/assets/images/contents/company/map_images.png";
import { Link } from "react-router-dom";

const Location = () => {
  return (
    <div className="location-wrap">
      <section>
        <div className="hgroup-wrap">
          <h2 className="f48-700-140">오시는 길</h2>
        </div>
      </section>
      <section>
        <div className="map-wrap">
          {/* 지도 영역 */}
          <img
            src={map_images}
            alt="큐브리펀드 본사 위치"
            className="w-full h-full object-cover"
          />
        </div>
        {/* map-info */}
        <div className="map-info">
          <div className="info-tit">
            <h3 className="f40-700-130">큐브리펀드 본사</h3>
          </div>
          <ul className="info-wrap">
            <li>
              <div className="tit f24-700-160">
                <i className="ico ico-place"></i>
                주소
              </div>
              <div className="desc">
                <p>서울시 금천구 가산디지털2로 187, 2층</p>
                <p>2nd floor, 187 Gasan Digital 2-ro, Geumcheon-gu, Seoul</p>
              </div>
            </li>
            <li>
              <div className="tit f24-700-160">
                <i className="ico ico-call"></i>
                대표번호
              </div>
              <div className="desc">
                <Link to="tel:+82269252033" aria-label="대표번호로 전화 걸기">
                  <span>02-6925-2033</span>
                </Link>
              </div>
            </li>
            {/* 퍼블수정 : 20250516 이메일 추가 */}
            <li>
              <div className="tit f24-700-160">
                <i className="ico ico-email"></i>
                이메일
              </div>
              <div className="desc">
                <p>cube@cuberefund.com</p>
              </div>
            </li>
            <li>
              <div className="tit f24-700-160">
                <i className="ico ico-fax"></i>
                팩스
              </div>
              <div className="desc">
                <p>02-2038-2193</p>
              </div>
            </li>
          </ul>
        </div>
        <ul className="go-link-wrap">
          <li>
            <p className="link-tit f20-700-140">영업 사무실</p>
            <p className="link-desc f16-400-160">
              서울시 중구 을지로 264, 11층
            </p>
            <a href="https://maps.app.goo.gl/ZWLzdHzFB9tNSQcz5" target="_blank" className="link-btn">
              <span className="f18-500-160">지도 보기</span>
              <i className="ico ico-top-right-arrow"></i>
            </a>
          </li>
          <li>
            <p className="link-tit f20-700-140">환급 위치 안내</p>
            <p className="link-desc f16-400-160">도심 / 출국항 / 모바일</p>
            <Link to="" className="link-btn">
              <span className="f18-500-160">안내 바로가기</span>
              <i className="ico ico-top-right-arrow"></i>
            </Link>
          </li>
        </ul>
      </section>
    </div>
  );
};

export default Location;
