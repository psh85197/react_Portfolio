import React from "react";
import { Link } from "react-router-dom";
import { Select } from "@/components/ui/select-custom";
import conditions_01 from "@/assets/images/contents/footer/conditions_01.png";
import conditions_02 from "@/assets/images/contents/footer/conditions_02.png";
import conditions_03 from "@/assets/images/contents/footer/conditions_03.png";
import conditions_04 from "@/assets/images/contents/footer/conditions_04.png";
import conditions_05 from "@/assets/images/contents/footer/conditions_05.png";
import conditions_06 from "@/assets/images/contents/footer/conditions_06.png";


const PrivacyPolicy = () => {
  const firstOptions = [
    { value: "option1", label: "2025.04.01 개인정보처리방침" },
    { value: "option2", label: "2025.04.01 개인정보처리방침" },
    { value: "option3", label: "2025.04.01 개인정보처리방침" },
  ];
  return (
    <div className="privacy-policy-wrap">
      <section>
        <div className="hgroup-wrap more-type">
          <p className="f40-700-140">개인정보처리방침</p>
          <Select
            options={firstOptions}
            title="첫 번째 선택"
            onChange={(value) => console.log("First Selected:", value)}
            onConfirm={() => console.log("First Confirmed")}
          />
        </div>
      </section>
      <section>
        <p className="f20-700-140">주요 개인정보처리방침</p>
        <div className="conditions-grid-wrap">
          <div className="conditions-grid">
            <div className="conditions-grid-item">
              <div className="img-bx">
                <img src={conditions_01} alt="" />
              </div>
              <div className="info-bx">
                <strong className="f16-600-160">일반 개인정보 수집</strong>
                <p className="f16-400-160">제보자 성명, 이메일, 연락처 등</p>
                <span className="f14-400-140">
                  &#8251; 세부 항목은 개인정보처리방침 본문 확인
                </span>
              </div>
            </div>
            <div className="conditions-grid-item">
              <div className="img-bx">
                <img src={conditions_02} alt="" />
              </div>
              <div className="info-bx">
                <strong className="f16-600-160">개인정보 처리 목적</strong>
                <p className="f16-400-160">
                  고객문의, 신문고, 안전신문고, 하도급 분쟁조정, IR 미팅 예약
                </p>
                <span className="f14-400-140">
                  &#8251; 세부 항목은 개인정보처리방침 본문 확인
                </span>
              </div>
            </div>
            <div className="conditions-grid-item">
              <div className="img-bx">
                <img src={conditions_03} alt="" />
              </div>
              <div className="info-bx">
                <strong className="f16-600-160">보유 기간</strong>
                <p className="f16-400-160">
                  수집 동의에 따른 3개월 보유 <br></br> 단, 불만 또는 분쟁처리에
                  관한 기록 3년 보유
                </p>
              </div>
            </div>
            <div className="conditions-grid-item">
              <div className="img-bx">
                <img src={conditions_04} alt="" />
              </div>
              <div className="info-bx">
                <strong className="f16-600-160">파기절차</strong>
                <p className="f16-400-160">
                  수집 동의에 따른 보유 기간 이후 즉시 파기
                </p>
              </div>
            </div>
            <div className="conditions-grid-item">
              <div className="img-bx">
                <img src={conditions_05} alt="" />
              </div>
              <div className="info-bx">
                <strong className="f16-600-160">안전성 확보조치</strong>
                <p className="f16-400-160">
                  개인정보 취급 직원 교육, 보안프로그램 설치 등
                </p>
              </div>
            </div>
            <div className="conditions-grid-item">
              <div className="img-bx">
                <img src={conditions_06} alt="" />
              </div>
              <div className="info-bx">
                <strong className="f16-600-160">고충사항 처리부서</strong>
                <p className="f16-400-160">
                  정보보호실 security@cuberefund.com
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section>
        <p className="f20-700-140">큐브리펀드 홈페이지 인터넷 서비스의 개인정보 처리방침은 다음과 같습니다.</p>
        <div className="conditions-notice">
          <div>1. 개인정보 수집 항목 및 수집 방법</div>
          <div>2. 개인정보 수집 및 이용목적</div>
          <div>3. 개인정보 처리 및 보유 기간</div>
          <div>4. 개인정보 파기</div>
          <div>5. 개인정보 제3자 제공</div>
          <div>6. 개인정보처리 위탁</div>
          <div>7. 쿠키(cookie)의 사용 및 그 거부에 관한 사항</div>
          <div>8. 쿠키(cookie)의 운용</div>
          <div>9. 정보주체의 권리, 의무 및 그 행사방법</div>
          <div>10. 개인정보 안전성 확보 조치</div>
          <div>11. 개인정보 보호 책임자</div>
          <div>12. 권익침해 구제방법</div>
          <div>13. 개인정보 처리방침 변경</div>
        </div>
      </section>
      <section>
        <div className="txt-list-bx">
          <div className="block-bx">
            <p className="f20-700-140">1. 개인정보 수집 항목 및 수집 방법</p>
            <p>
              큐브리펀드는 회원가입, 서비스 내역 조회 및 처리 등을 위해 아래와
              같은 개인정보를 수집하고 있습니다.
            </p>
            <strong className="number-1">개인정보 수집 항목</strong>
            <ul>
              <li>가. 필수 수집 항목 - 이메일주소, 성명, 전화번호</li>
              <li>
                나. 선택 수집 항목 - 여권번호, 여권성명, 국적, 성별, 생년월일,
                여권만료일자, 주소
              </li>
            </ul>
            <strong className="number-2">개인정보 수집 방법</strong>
            <ul>
              <li>가. 웹사이트&#40;회원가입, 고객센터&#41;를 통한 수집</li>
            </ul>
          </div>
          <div className="block-bx">
            <p className="f20-700-140">2. 개인정보 수집 및 이용목적</p>
            <strong className="number-1">
              서비스 제공에 관한 계약 이행 및 서비스 내역 조회 및 처리에
              따른 요금정산, 콘텐츠 제공, 공지사항 전달
            </strong>
            <strong className="number-2">
              회원제 서비스 이용에 따른 본인확인, 민원처리, 공지사항 전달
            </strong>
          </div>
          <div className="block-bx">
            <p className="f20-700-140">3. 개인정보 처리 및 보유 기간</p>
            <strong className="number-1">
              큐브리펀드는 정보주체로부터 개인정보를 수집할 때 동의 받은
              개인정보 보유ㆍ이용기간 또는 법령에 따른 개인정보 보유ㆍ이용기간
              내에서 개인정보를 처리ㆍ보유합니다.
            </strong>
            <strong className="number-2">
              구체적인 개인정보 처리 및 보유 기간은 다음과 같습니다.
            </strong>
            <span>
              아래 예시를 참고하여 개인정보 처리업무와 개인정보 처리업무에 대한
              보유기간 및 관련 법령, 근거 등을 기재합니다.
            </span>
            <ul>
              <li>
                <p>[예시]</p>
              </li>
              <li>
                가. 고객 가입 및 관리 : 서비스 이용계약 또는 회원가입
                해지시까지, 다만 채권ㆍ채무관계 잔존시에는 해당 채권ㆍ채무관계
                정산시까지
              </li>
              <li>
                나. 전자상거래에서의 계약ㆍ청약철회, 대금결제, 재화 등 공급기록
                : 5년
              </li>
            </ul>
          </div>
          <div className="block-bx">
            <p className="f20-700-140">4. 개인정보 파기</p>
            <p>
              큐브리펀드는 원칙적으로 개인정보 처리목적이 달성된 경우에는
              지체없이 해당 개인정보를 파기합니다. 파기의 절차, 기한 및 방법은
              다음과 같습니다.
            </p>
            <strong className="number-1">파기절차</strong>
            <strong>
                이용자가 입력한 정보는 목적 달성 후 별도의 DB에
                옮겨져&#40;종이의 경우 별도의 서류&#41; 내부 방침 및 기타 관련
                법령에 따라 일정기간 저장된 후 혹은 즉시 파기됩니다. 이 때, DB로
                옮겨진 개인정보는 법률에 의한 경우가 아니고서는 다른 목적으로
                이용되지 않습니다.
                </strong>
            <strong className="number-2">파기기한</strong>
            <strong>
            이용자의 개인정보는 개인정보의 보유기간이 경과된 경우에는
                보유기간의 종료일로부터 5일 이내에, 개인정보의 처리 목적 달성,
                해당 서비스의 폐지, 사업의 종료 등 그 개인정보가 불필요하게
                되었을 때에는 개인정보의 처리가 불필요한 것으로 인정되는
                날로부터 5일 이내에 그 개인정보를 파기합니다.
            </strong>
          </div>
          <div className="block-bx">
            <p className="f20-700-140">5. 개인정보 제3자 제공</p>
            <p>
              큐브리펀드는 정보주체의 별도 동의, 법률의 특별한 규정 등 개인정보
              보호법 제17조에 해당하는 경우 외에는 개인정보를 제3자에게 제공하지
              않습니다.
            </p>
          </div>
          <div className="block-bx">
            <p className="f20-700-140">6. 개인정보처리 위탁</p>
            <strong className="number-1">
              큐브리펀드는 원활한 개인정보 업무처리를 위하여 다음과 같이
              개인정보 처리업무를 위탁하고 있습니다.
            </strong>
            <ul>
              <li>
              가. 고객 가입 및 관리 : 서비스 이용계약 또는 회원가입 해지시까지,
                다만 채권ㆍ채무관계 잔존시에는 해당 채권ㆍ채무관계 정산시까지
                <ol>
                  <li>- 위탁받는 자 &#40;수탁자&#41; : 큐브리펀드</li>
                  <li>
                    - 위탁하는 업무의 내용 : 회원제 서비스 이용에 따른 본인확인,
                    불만처리 등 민원처리, 고지사항 전달, 신규
                    서비스&#40;제품&#41; 개발 및 맞춤 서비스 제공
                  </li>
                  <li>- 위탁기간 : 5년</li>
                </ol>
              </li>
            </ul>
            <strong className="number-2">
              큐브리펀드는 위탁계약 체결시 개인정보 보호법 제25조에 따라
              위탁업무 수행목적 외 개인정보 처리금지, 기술적ㆍ관리적 보호조치,
              재위탁 제한, 수탁자에 대한 관리ㆍ감독, 손해배상 등 책임에 관한
              사항을 계약서 등 문서에 명시하고, 수탁자가 개인정보를 안전하게
              처리하는지를 감독하고 있습니다
            </strong>
            <strong className="number-3">
              위탁업무의 내용이나 수탁자가 변경될 경우에는 지체없이 본
              개인정보 처리방침을 통하여 공개하도록 하겠습니다.
            </strong>
          </div>
          <div className="block-bx">
            <p className="f20-700-140">
              7. 쿠키&#40;cookie&#41;의 사용 및 그 거부에 관한 사항
            </p>
            <span className="sm-txt">
            큐브리펀드는 고객에 대한 정보를 저장하고 수시로 찾아내는
                  '쿠키&#40;cookie&#41;'를 사용합니다. <br className="pc-show"/>
                  쿠키는 웹사이트가 고객의 웹브라우저&#40;인터넷익스플로러,
                  크롬, 파이어폭스 등&#41;로 전송하는 소량의 정보입니다.<br className="pc-show"/>
                  고객께서 웹사이트에 접속하면 큐브리펀드에서는 고객의
                  웹브라우저에 있는 쿠키의 내용을 읽고, 고객의 추가정보를 고객의
                  컴퓨터에서 찾아 접속에 따른 성명 등의 추가 입력없이 서비스를
                  제공할 수 있습니다.<br className="pc-show"/>
                  쿠키는 고객의 컴퓨터는 식별하지만 고객을 개인적으로 식별하지는
                  않습니다. 또한 고객께서는 쿠키에 대한 선택권이 있습니다.<br className="pc-show"/>
                  따라서, 고객은 웹브라우저에서 옵션을 설정함으로써 모든 쿠키를
                  허용하거나, 쿠키가 저장될 때마다 확인을 거치거나, 아니면 모든
                  쿠키의 저장을 거부할 수도 있습니다.
            </span>

            <strong className="number-1">쿠키 설정 방법</strong>
            <ul>
              <li>가. 인터넷익스플로러의 경우</li>
              <li>웹브라우저 상단의 도구 &gt; 인터넷 옵션 &gt; 개인정보</li>
            </ul>
          </div>
          <div className="block-bx">
            <p className="f20-700-140">8. 쿠키&#40;cookie&#41;의 운용</p>
            <p>
              큐브리펀드는 이용자의 편의를 위하여 쿠키를 운용합니다.단, 쿠키
              허용을 거부하였을 경우 서비스 제공에 어려움이 있을 수 있습니다.
            </p>
          </div>
          <div className="block-bx">
            <p className="f20-700-140">
              9. 정보주체의 권리, 의무 및 그 행사방법
            </p>
            <p>
              이용자는 개인정보주체로서 다음과 같은 권리를 행사할 수 있습니다.
            </p>
            <strong className="number-1">
              자신 및 14세 미만 아동의 개인정보의 조회, 수정 및
              가입해지의 요청
            </strong>
            <strong className="number-2">개인정보의 오류에 대한 정정 및 삭제의 요청</strong>
            <strong className="number-3">
              개인정보의 조회, 수정 및 해지 등의 요청은 '정보수정' 등을
              클릭하여 본인 확인 절차를 거치신 후 직접 열람, 정정, 혹은 해지가
              가능합니다.
            </strong>
            <strong className="number-4">
              이용자가 개인정보의 오류에 대한 정정 및 해지를 요청한
              경우에는 정정 및 해지를 완료할 때까지 당해 개인정보를 이용 또는
              제공하지 않습니다. 잘못된 개인정보를 이용 또는 제공한 경우
              지체없이 수정하겠습니다.
            </strong>
            <strong className="number-5">
              큐브리펀드는 이용자의 요청에 의해 해지되는 개인정보는
              &#x3C;개인정보 보유 및 이용 기간&gt;에 따라 처리합니다.
            </strong>
          </div>
          <div className="block-bx">
            <p className="f20-700-140">10. 개인정보 안전성 확보 조치</p>
            <p>
              큐브리펀드는 개인정보보호법 제29조에 따라 다음과 같이 안전성
              확보에 필요한 기술적/관리적 및 물리적 조치를 하고 있습니다.
            </p>
            <strong className="number-1">내부관리계획의 수립 및 시행</strong>
            <ul>
              <li>
                개인정보의 안전한 처리를 위하여 내부관리계획을 수립하고 시행하고
                있습니다.
              </li>
            </ul>
            <strong className="number-2">개인정보의 암호화</strong>
            <ul>
              <li>
                이용자의 개인정보는 비밀번호는 암호화 되어 저장 및 관리되고
                있어, 본인만이 알 수 있으며 중요한 데이터는 파일 및 전송
                데이터를 암호화 하거나 파일 잠금 기능을 사용하는 등의 별도
                보안기능을 사용하고 있습니다.
              </li>
            </ul>
            <strong className="number-3">개인정보에 대한 접근 제한</strong>
            <ul>
              <li>
                개인정보를 처리하는 데이터베이스시스템에 대한 접근권한의 부여,
                변경, 말소를 통하여 개인정보에 대한 접근통제를 위하여 필요한
                조치를 하고 있으며 침입차단시스템을 이용하여 외부로부터의 무단
                접근을 통제하고 있습니다.
              </li>
            </ul>
          </div>
          <div className="block-bx">
            <p className="f20-700-140">11. 개인정보 보호 책임자</p>
            <strong className="number-1">
              큐브리펀드는 개인정보 처리에 관한 업무를 총괄해서 책임지고,
              개인정보 처리와 관련한 정보주체의 불만처리 및 피해구제 등을 위하여
              아래와 같이 개인정보 보호책임자를 재정하고 있습니다.
            </strong>
            <ul>
              <li>
                가. 개인정보 보호책임자
                <ol>
                  <li className="under">성명 : 염정원</li>
                  <li className="under">직책 : 부설연구소 소장</li>
                  <li className="under">직급 : 소장</li>
                  <li className="under">
                    연락처 : 070-5070-0413, gardenco@cuberefund.com,
                    02-6925-2033
                  </li>
                </ol>
              </li>
              <li>
                나. 개인정보 보호 담당부서
                <ol>
                  <li className="under">직책 : 부설연구소 소장</li>
                  <li className="under">담당자 : 박문성</li>
                  <li className="under">
                    연락처 : 070-5070-0429, parkmunsung@cuberefund.com,
                    02-6925-2033
                  </li>
                </ol>
              </li>
            </ul>
            <strong className="number-2">
              정보주체께서는 큐브리펀드의 서비스&#40;또는 사업&#41;을
              이용하시면서 발생한 모든 개인정보 보호 관련 문의, 불만처리,
              피해구제 등에 관한 사항을 개인정보 보호책임자 및 담당부서로
              문의하실 수 있습니다. 큐브리펀드는 정보주체의 문의에 대해 지체없이
              답변 및 처리해 드릴 것입니다.
            </strong>
          </div>
          <div className="block-bx">
            <p className="f20-700-140">12. 권익침해 구제방법</p>
            <p>
              정보주체는 아래의 기관에 대해 개인정보 침해에 대한 피해구제, 상담
              등을 문의하실 수 있습니다.
            </p>
            <span>
              &#8251; 아래 기관은 큐브리펀드와는 별개의 기관으로서, 큐브리펀드의
              자체적인 개인정보 불만처리, 피해구제 결과에 만족하지 못하시거나
              보다 자세한 도움이 필요하시면 문의하여 주시기 바랍니다.
            </span>
            <strong className="number-1">
              개인정보 침해신고센터 &#40;한국인터넷진흥원 운영&#41;
            </strong>
            <ul>
              <li>가. 개인정보 보호책임자</li>
              <li>나. 홈페이지 : privacy.kisa.or.kr</li>
              <li>다. 전화 : &#40;국번없이&#41; 118</li>
              <li>
                라. 주소 : &#40;138-950&#41; 서울시 송파구 중대로 135
                한국인터넷진흥원 개인정보침해신고센터
              </li>
            </ul>
            <strong className="number-2">
              개인정보 분쟁조정위원회 &#40;한국인터넷진흥원 운영&#41;
            </strong>
            <ul>
              <li>
                가. 소관업무 : 개인정보 분쟁조정신청, 집단분쟁조정 &#40;민사적
                해결&#41;
              </li>
              <li>나. 홈페이지 : privacy.kisa.or.kr</li>
              <li>다. 전화 : &#40;국번없이&#41; 118</li>
              <li>
                라. 주소 : &#40;138-950&#41; 서울시 송파구 중대로 135
                한국인터넷진흥원 개인정보침해신고센터
              </li>
            </ul>
            <strong className="number-3">
              대검찰청 사이버범죄수사단 : 02-3480-3573 &#40;
              <Link to="/">www.spo.go.kr</Link>&#41;
            </strong>
            <strong className="number-4">
              경찰청 사이버테러대응센터 : 1566-0112 &#40;
              <Link to="/">www.netan.go.kr</Link>&#41;
            </strong>
          </div>
          <div className="block-bx">
            <p className="f20-700-140">13. 개인정보 처리방침 변경</p>
            <strong className="number-1">
              이 개인정보처리방침은 시행일로부터 적용되며, 법령 및 방침에
              따른 변경내용의 추가, 삭제 및 정정이 있는 경우에는 변경사항의 시행
              7일 전부터 공지사항을 통하여 고지할 것입니다.
            </strong>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PrivacyPolicy;
