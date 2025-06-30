import React, { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { Input as ShadcnInput } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button";
import { ShadcnRadio, RadioItem } from "@/components/ui/radio-group";
import ico_complete from "@/assets/images/icon/ico_complete.png";
import ico_fail from "@/assets/images/icon/ico_fail.png";
import { Link, useParams } from "react-router-dom";

const Supplies = () => {
  const { lang } = useParams();
  const [checkedItems, setCheckedItems] = useState({
    terms1: false, 
    terms2: false, 
    terms3: false, 
  });

  const handleCheckboxChange = (id) => {
    setCheckedItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };
  
  const [text, setText] = useState("");

  const initialItems = [
    { id: 1, label: '환급 봉투', icon: 'message'},
    { id: 2, label: 'PDA 용지', icon: 'paper-pda'},
    { id: 3, label: '아크릴POP (TAX REFUND SHOP)', icon: 'tax-shop'},
  ];

  const [items, setItems] = useState(initialItems);

  const handleCountSelect = (id, value) => {
    setItems(prev =>
      prev.map(item =>
        item.id === id
          ? { ...item, count: parseInt(value) }
          : item
      )
    );
  };

  const handleRemove = (id) => {
    setItems(prev => prev.filter(item => item.id !== id));
  };

  // 환급 봉투의 경우만 500개와 1000개 선택 옵션 적용
  const renderCountControl = (id, label, count) => {
    // 환급 봉투인 경우 라디오 버튼 표시
    if (id === 1) {
      return (
        <ShadcnRadio
          value={String(count)}
          onValueChange={(value) => handleCountSelect(id, value)}
          className="radio-group"
        >
          <div className="radio-item">
            <RadioItem value="500" id={`radio-500-${id}`} />
            <label htmlFor={`radio-500-${id}`}>500개</label>
          </div>
          <div className="radio-item">
            <RadioItem value="1000" id={`radio-1000-${id}`} />
            <label htmlFor={`radio-1000-${id}`}>1000개</label>
          </div>
        </ShadcnRadio>
      );
    }
    // 그 외의 경우 null 반환 (아무것도 렌더링하지 않음)
    return null;
  };

  return (
    
      <div className="supplies-wrap">
        <section>
          <div className="hgroup-wrap">
            <h2 className="f48-700-140">소모품 신청</h2>
          </div>
        </section>
        <section>
          <div className="component-group">
            <div className="from-group">
              <Tabs defaultValue="step01" className="tab-wrap step-type">
                <TabsList>
                  <TabsTrigger value="step01">
                    <span>소모품 선택</span>
                  </TabsTrigger>
                  <TabsTrigger value="step02">
                    <span>신청 정보 작성</span>
                  </TabsTrigger>
                  <TabsTrigger value="step03">
                    <span>신청 완료</span>
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="step01">
                  <section>
                    <div className="hgroup-wrap sub t ooltip-type">
                      <p className="f24-700-140">소모품 선택</p>
                    </div>
                    <div className="round-bx list-type">
                      <div className="round-inner">
                        <button
                          className={`round-item ${
                            checkedItems.terms1 ? "selected" : ""
                          }`}
                          onClick={() => handleCheckboxChange("terms1")}
                          type="button"
                        >
                          <div className="badge-group">
                            <div className="tit-ico">
                              <i className="ico message" aria-hidden="true"></i>
                              <span>환급 봉투</span>
                            </div>
                            <div className="checkbox-wrap" onClick={(e) => e.stopPropagation()}>
                              <Checkbox
                                className="checkbox-input"
                                id="checkbox-1"
                                checked={checkedItems.terms1}
                                onCheckedChange={() =>
                                  handleCheckboxChange("terms1")
                                }
                              />
                            </div>
                          </div>
                        </button>
                        <button
                          className={`round-item ${
                            checkedItems.terms2 ? "selected" : ""
                          }`}
                          onClick={() => handleCheckboxChange("terms2")}
                          type="button"
                        >
                          <div className="badge-group">
                            <div className="tit-ico">
                            <i className="ico thunder" aria-hidden="true"></i>
                              <span>환급표+즉시환급 안내</span>
                            </div>
                            <div className="checkbox-wrap" onClick={(e) => e.stopPropagation()}>
                              <Checkbox
                                className="checkbox-input"
                                id="checkbox-2"
                                checked={checkedItems.terms2}
                                onCheckedChange={() =>
                                  handleCheckboxChange("terms2")
                                }
                              />
                            </div>
                          </div>
                         
                        </button>
                        <button
                          className={`round-item clear ${
                            checkedItems.terms3 ? "selected" : ""
                          }`}
                          onClick={() => handleCheckboxChange("terms3")}
                          type="button"
                        >
                          <div className="badge-group">
                            <div className="tit-ico">
                            <i className="ico thunder-shop" aria-hidden="true"></i>
                              <span>환급표+환급대상자 안내</span>
                            </div>
                            <div className="checkbox-wrap" onClick={(e) => e.stopPropagation()}>
                              <Checkbox
                                className="checkbox-input"
                                id="checkbox-3"
                                checked={checkedItems.terms3}
                                onCheckedChange={() =>
                                  handleCheckboxChange("terms3")
                                }
                              />
                            </div>
                          </div>
                        </button>
                        <button
                          className={`round-item disabled ${
                            checkedItems.terms4 ? "selected" : ""
                          }`}
                          onClick={() => handleCheckboxChange("terms4")}
                          type="button"
                        >
                          <div className="badge-group">
                            <div className="tit-ico">
                              <i className="ico thunder-shop" aria-hidden="true"></i>
                              <span>환급표+하이마트용 안내</span>
                            </div>
                            <div className="checkbox-wrap" onClick={(e) => e.stopPropagation()}>
                              <Checkbox
                                className="checkbox-input"
                                id="checkbox-4"
                                checked={checkedItems.terms4}
                                onCheckedChange={() =>
                                  handleCheckboxChange("terms4")
                                }
                              />
                            </div>
                          </div>
                        </button>
                        <button
                          className={`round-item ${
                            checkedItems.terms5 ? "selected" : ""
                          }`}
                          onClick={() => handleCheckboxChange("terms5")}
                          type="button"
                        >
                          <div className="badge-group">
                            <div className="tit-ico">
                            <i className="ico paper" aria-hidden="true"></i>
                              <span>단말기/포스 용지</span>
                            </div>
                            <div className="checkbox-wrap" onClick={(e) => e.stopPropagation()}>
                              <Checkbox
                                className="checkbox-input"
                                id="checkbox-1"
                                checked={checkedItems.terms5}
                                onCheckedChange={() =>
                                  handleCheckboxChange("terms5")
                                }
                              />
                            </div>
                          </div>
                        </button>
                        <button
                          className={`round-item ${
                            checkedItems.terms6 ? "selected" : ""
                          }`}
                          onClick={() => handleCheckboxChange("terms6")}
                          type="button"
                        >
                          <div className="badge-group">
                            <div className="tit-ico">
                            <i className="ico paper-pda" aria-hidden="true"></i>
                              <span>PDA 용지</span>
                            </div>
                            <div className="checkbox-wrap" onClick={(e) => e.stopPropagation()}>
                              <Checkbox
                                className="checkbox-input"
                                id="checkbox-1"
                                checked={checkedItems.terms6}
                                onCheckedChange={() =>
                                  handleCheckboxChange("terms6")
                                }
                              />
                            </div>
                          </div>
                        </button>
                        <button
                          className={`round-item ${
                            checkedItems.terms7 ? "selected" : ""
                          }`}
                          onClick={() => handleCheckboxChange("terms7")}
                          type="button"
                        >
                          <div className="badge-group">
                            <div className="tit-ico">
                              <i className="ico sticker" aria-hidden="true"></i>
                              <span>TAX FREE 스티커</span>
                            </div>
                            <div className="checkbox-wrap" onClick={(e) => e.stopPropagation()}>
                              <Checkbox
                                className="checkbox-input"
                                id="checkbox-1"
                                checked={checkedItems.terms7}
                                onCheckedChange={() =>
                                  handleCheckboxChange("terms7")
                                }
                              />
                            </div>
                          </div>
                        </button>
                        <button
                          className={`round-item ${
                            checkedItems.terms8 ? "selected" : ""
                          }`}
                          onClick={() => handleCheckboxChange("terms8")}
                          type="button"
                        >
                          <div className="badge-group">
                            <div className="tit-ico">
                              <i className="ico tax" aria-hidden="true"></i>
                              <span>TAX FREE 아크릴POP</span>
                            </div>
                            <div className="checkbox-wrap" onClick={(e) => e.stopPropagation()}>
                              <Checkbox
                                className="checkbox-input"
                                id="checkbox-1"
                                checked={checkedItems.terms8}
                                onCheckedChange={() =>
                                  handleCheckboxChange("terms8")
                                }
                              />
                            </div>
                          </div>
                        </button>
                        <button
                          className={`round-item ${
                            checkedItems.terms9 ? "selected" : ""
                          }`}
                          onClick={() => handleCheckboxChange("terms9")}
                          type="button"
                        >
                          <div className="badge-group">
                            <div className="tit-ico">
                              <i className="ico sticker-shop" aria-hidden="true"></i>
                              <span>TAX FREE SHOP 스티커</span>
                            </div>
                            <div className="checkbox-wrap" onClick={(e) => e.stopPropagation()}>
                              <Checkbox
                                className="checkbox-input"
                                id="checkbox-1"
                                checked={checkedItems.terms9}
                                onCheckedChange={() =>
                                  handleCheckboxChange("terms9")
                                }
                              />
                            </div>
                          </div>
                        </button>
                        <button
                          className={`round-item ${
                            checkedItems.terms10 ? "selected" : ""
                          }`}
                          onClick={() => handleCheckboxChange("terms10")}
                          type="button"
                        >
                          <div className="badge-group">
                            <div className="tit-ico">
                              <i className="ico tax-shop" aria-hidden="true"></i>
                              <span>TAX REFUND SHOP 아크릴POP</span>
                            </div>
                            <div className="checkbox-wrap" onClick={(e) => e.stopPropagation()}>
                              <Checkbox
                                className="checkbox-input"
                                id="checkbox-1"
                                checked={checkedItems.terms10}
                                onCheckedChange={() =>
                                  handleCheckboxChange("terms10")
                                }
                              />
                            </div>
                          </div>
                        </button>
                        <button
                          className={`round-item ${
                            checkedItems.terms11 ? "selected" : ""
                          }`}
                          onClick={() => handleCheckboxChange("terms11")}
                          type="button"
                        >
                          <div className="badge-group">
                            <div className="tit-ico">
                              <i className="ico refund" aria-hidden="true"></i>
                              <span>의료&숙박 환급안내 삽지</span>
                            </div>
                            <div className="checkbox-wrap" onClick={(e) => e.stopPropagation()}>
                              <Checkbox
                                className="checkbox-input"
                                id="checkbox-1"
                                checked={checkedItems.terms11}
                                onCheckedChange={() =>
                                  handleCheckboxChange("terms11")
                                }
                              />
                            </div>
                          </div>
                        </button>
                        <button
                          className={`round-item ${
                            checkedItems.terms12 ? "selected" : ""
                          }`}
                          onClick={() => handleCheckboxChange("terms12")}
                          type="button"
                        >
                          <div className="badge-group">
                            <div className="tit-ico">
                              <i className="ico alipay" aria-hidden="true"></i>
                              <span>알리페이 안내</span>
                            </div>
                            <div className="checkbox-wrap" onClick={(e) => e.stopPropagation()}>
                              <Checkbox
                                className="checkbox-input"
                                id="checkbox-1"
                                checked={checkedItems.terms12}
                                onCheckedChange={() =>
                                  handleCheckboxChange("terms12")
                                }
                              />
                            </div>
                          </div>
                        </button>
                      </div>
                    </div>
                  </section>
                  <section>
                    <div className="btn-wrap">
                      <div className="btn-inner line-type">
                        <Button className="btn btn-primary">다음</Button>
                      </div>
                    </div>
                  </section>
                </TabsContent>
                <TabsContent value="step02">
                  <section>
                    <div className="hgroup-wrap line-type mb-0">
                      <h2 className="f24-700-140">신청 물품 및 수량</h2>
                    </div>
                    <div className="count-wrap">
                      {items.map(({ id, label, icon, count }) => (
                        <div
                          key={id} 
                          className={`count-box ${id !== 1 ? 'no-radio' : ''}`}
                        >
                          <div className="tit-wrap">
                          {icon && (
                              <i className={`ico ${icon}`} aria-hidden="true"></i>
                            )}
                            <span className="tit">{label}</span>
                          </div>
                          {id === 1 ? (
                            <div className="btn-wrap">
                              {renderCountControl(id, label, count)}
                              <button 
                                onClick={() => handleRemove(id)} 
                                className="btn-close"                          
                              >
                                <i className="ico-close">닫기</i>
                              </button>
                            </div>
                          ) : (
                            <div className="btn-wrap single-btn">
                              <button 
                                onClick={() => handleRemove(id)} 
                                className="btn-close"                          
                              >
                                <i className="ico-close">닫기</i>
                              </button>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </section>
                  <section>
                    <div className="hgroup-wrap more-type line-type">
                      <h2 className="f24-700-140">배송지 정보</h2>
                    </div>
                    <div className="component-group">
                      <div className="from-group">
                        <label htmlFor="test1" className="input-label">
                          <span className="label-txt">
                            가맹점
                          </span>
                        </label>
                        <div className="input-group hold-txt">
                          <ShadcnInput
                            type="text"
                            id="test1"
                            placeholder="롯데백화점 부산본점  "
                            disabled
                          />
                        </div>
                      </div>
                      <div className="from-group">
                        <label htmlFor="test1" className="input-label">
                          <span className="label-txt">
                            배송지
                          </span>
                        </label>
                        <div className="input-group hold-txt">
                          <ShadcnInput
                            type="text"
                            id="test2"
                            placeholder="부산시 부산진구 가야대로 772, 1층"
                            disabled
                            className="hold-txt"
                          />
                        </div>
                      </div>
                    </div>
                  </section>
                  <section>
                    <div className="info-bx no-scroll border-none">
                      <p className="info-txt">신청 안내</p>
                      <ul className="info-list">
                        <li className="info-item dot">
                        물품신청은 하루에 한 번만 가능하오니, 추가로 물품이 필요하신 경우에는 대표전화로 연락 주시기 바랍니다.
                        </li>
                        <li className="info-item dot">
                        배송지 변경 문의는 대표전화로 연락 주시기 바랍니다.
                        </li>
                        <li className="info-item dot">
                        배송은 접수시간과 지역에 따라 1~3일 정도 소요됩니다.
                        </li>
                        <li className="info-item dot">
                        대표전화 : 02-6925-2033
                        </li>
                      </ul>
                      {/* 20250527 퍼블 수정 */}
                      <p className="info-txt">발송 안내</p>
                      <ul className="info-list">
                        <li className="info-item dot">
                        평일 15시 이전 신청 : 당일 발송
                        </li>
                        <li className="info-item dot">
                        평일 15시 이후 신청 : 익일 발송
                        </li>
                        <li className="info-item dot">
                        휴일에는 접수만 가능하며, 다음 평일에 발송해드립니다.
                        </li>
                      </ul>
                    </div>
                    <div className="btn-wrap">
                      <div className="btn-inner line-type">
                      <Button className="btn btn-default">이전</Button>
                        <Button className="btn btn-primary">다음</Button>
                      </div>
                    </div>
                  </section>
                </TabsContent>
                <TabsContent value="step03">
                  {/* 신청완료 */}
                  <section>
                    <div className="complete-bx">
                      <img src={ico_complete} alt="완료" />
                      <p className="f28-700-140">소모품 신청이 완료되었습니다.</p>
                      {/* 퍼블수정 : 20250520 텍스트 삭제}
                      {/* <span className="f18-500-160">ADMIN에 접속하셔서 진행상태를 확인해 주세요.</span> */}
                      <div className="supply-box">
                        <h4 className="supply-title">소모품 신청 내역</h4>
                        <ul className="supply-list">
                          <li>환급봉투 500개</li>
                          <li>단말기/포스 용지</li>
                          <li>TAX REFUND SHOP 아크릴POP</li>
                        </ul>
                      </div>
                    </div>
                  </section>
                  {/* 신청실패 */}
                  <section>
                    <div className="complete-bx">
                      <img src={ico_fail} alt="실패" />
                      <p className="f28-700-140">소모품 신청에 실패하였습니다.</p>
                      <span className="f18-500-160">나중에 다시 시도해 주세요. <br/>
                      대표전화 : 02-6925-2033</span>
                    </div>
                  </section>
                  <section>
                    <div className="btn-wrap">
                      <div className="btn-inner line-type">
                        <Link to={`/${lang}/pub/pages/franchise/notice`} className="btn btn-primary a-type">홈으로 이동</Link>
                      </div>
                    </div>
                  </section>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </section>
      </div>
   
  );
};

export default Supplies; 