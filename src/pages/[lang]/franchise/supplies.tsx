// src/pages/SuppliesPage.tsx
import React, { useEffect, useState, useCallback } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { Input as ShadcnInput } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import ico_complete from "@/assets/images/icon/ico_complete.png";
import {getSupplyRequestHistory, requestSupply} from "@/api/services/supply.ts";
import {RequestSupply} from "@/types/supply.ts";
import { RadioItem, ShadcnRadio } from "@/components/ui/radio-group.tsx";
import { CommonAlertDialog } from "@/components/ui/common-alert-dialog.tsx";
import ico_fail from "@/assets/images/icon/ico_fail.png";
import { useNavigate } from "react-router-dom";
import {useLoadingStore} from "@/stores/loading-store.ts";

interface SupplyChecklistItem {
  [key: string]: boolean;
}

interface SupplyItem {
  id: string;
  label: string;
  icon: string;
  count: number;
}

const supplyItemsConfig: { [key: string]: { label: string; icon: string } } = { // 상수로 분리
  envGen: { label: "환급봉투", icon: "message" },
  posGen: { label: "단말기/포스 용지", icon: "paper" },
  posPda: { label: "PDA 용지", icon: "paper-pda" },
  stiFree: { label: "TAX FREE 스티커", icon: "sticker" },
  stiShop: { label: "TAX REFUND SHOP 스티커", icon: "sticker-shop" },
  popFree: { label: "TAX FREE 아크릴POP", icon: "tax" },
  popShop: { label: "TAX REFUND SHOP 아크릴POP", icon: "tax-shop" },
  paper: { label: "의료&숙박 환급안내 삽지", icon: "refund" },
  alipay: { label: "알리페이 안내", icon: "alipay" },
  tabImm: { label: "환급표+즉시환급 안내", icon: "thunder" },
  tabGen: { label: "환급표+환급대상자 안내", icon: "thunder-shop" },
  tabHimt: { label: "환급표+하이마트용", icon: "himart" },
};

const SuppliesPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("step01");
  const [isSuccess, setIsSuccess] = useState<boolean>(true);
  const [isConfirm, setIsConfirm] = useState<boolean>(false);
  const [isDeleteAlert, setIsDeleteAlert] = useState<boolean>(false);
  const [deleteItem, setDeleteItem] = useState<string>('');
  const navigate = useNavigate();
  const { setLoginModalOpen } = useLoadingStore();

  const mbrName = localStorage.getItem("mbrName");
  const mbrAddr = localStorage.getItem("mbrAddr");

  const [checkedItems, setCheckedItems] = useState<SupplyChecklistItem>({
    envGen: false, envEtc: false, posGen: false, posPda: false,
    stiFree: false, stiShop: false, popFree: false, popShop: false,
    paper: false, alipay: false, tabImm: false, tabGen: false, tabHimt: false,
  });

  const [items, setItems] = useState<SupplyItem[]>([]);

  // supplyItemsConfig를 직접 사용합니다.
  const supplyItems = supplyItemsConfig;

  // fetchSupplyHistoryOnLoad는 API 호출 및 상태 업데이트 로직을 포함합니다.
  // 이 함수는 오직 한 번, 컴포넌트 마운트 시에만 호출되도록 useEffect를 구성할 것입니다.
  const fetchSupplyHistoryOnLoad = useCallback(async () => {
    try {
      const response = await getSupplyRequestHistory();

      if (response.code === 200 && response.data) {
        if (!('code' in response.data)) {
          const responseData = response.data as { requestBody: string | null };
          if (responseData.requestBody === null) {
            setActiveTab('step01');
          } else {
            setActiveTab('step03'); // 기존 신청 내역이 있으면 step03으로
            try {
              const parsedRequestBody = JSON.parse(responseData.requestBody);
              const initialItemsFromHistory: SupplyItem[] = [];
              const initialCheckedItems: SupplyChecklistItem = {
                envGen: false, envEtc: false, posGen: false, posPda: false,
                stiFree: false, stiShop: false, popFree: false, popShop: false,
                paper: false, alipay: false, tabImm: false, tabGen: false, tabHimt: false,
              };

              for (const key in initialCheckedItems) {
                if (
                  Object.prototype.hasOwnProperty.call(parsedRequestBody, key) &&
                  parsedRequestBody[key] !== null &&
                  parsedRequestBody[key] !== undefined
                ) {
                  const countAsString = parsedRequestBody[key];
                  const countAsNumber = parseInt(countAsString, 10);
                  if (!isNaN(countAsNumber) && countAsNumber > 0) {
                    initialItemsFromHistory.push({
                      id: key,
                      label: supplyItems[key].label,
                      icon: supplyItems[key].icon,
                      count: countAsNumber,
                    });
                  }
                  initialCheckedItems[key] = countAsNumber > 0;
                } else {
                  initialCheckedItems[key] = false;
                }
              }
              setCheckedItems(initialCheckedItems);
              setItems(initialItemsFromHistory);
            } catch (error) {
              console.error('Error parsing JSON:', error);
              setActiveTab('step01'); // 파싱 오류 시 step01
            }
          }
        } else if ('code' in response.data) {
          // API 응답에서 인증 관련 에러가 발생했을 때 처리
          if (['TOKEN_EXPIRED'].includes(response.data.code)) {
            navigate('/ko')
            setLoginModalOpen(true, () => {
              navigate(('/ko/franchise/supplies'))
            });
            console.error("Access denied (expired token):", response.data.message);
          } else if (['UNAUTHORIZED', 'FORBIDDEN', 'INVALID_TOKEN'].includes(response.data.code)) {
            // 이 경우, 사용자가 페이지를 직접 새로고침했거나, 로그인 후 시간이 지나 토큰이 만료된 상황일 수 있습니다.
            // 로그인 모달을 띄우고 성공 시 재시도하도록 처리합니다.
            navigate('/ko')
            setLoginModalOpen(true, () => {
              navigate(('/ko/franchise/supplies'))
            });
            console.error("Access denied (auth error):", response.data.message);
          } else {
            navigate('/ko')
            console.error("Unexpected response data:", response.data);
            setLoginModalOpen(true, () => (
              navigate(('/ko/franchise/supplies'))
            )); // 기타 에러 시 로그인 모달
          }
        } else {
          navigate('/ko')
          console.error("API call failed with code:", response.code);
          setLoginModalOpen(true, () => (
            navigate(('/ko/franchise/supplies'))
          )); // 기타 에러 시 로그인 모달
          setActiveTab('step01'); // 서버 응답에 오류 코드가 있을 시 step01
        }
      } else {
        console.error("API call failed or unexpected response:", response);
        setActiveTab('step01'); // 예상치 못한 응답 시 step01
      }
    } catch (error) {
      console.error('Error fetching supply request history:', error);
      setActiveTab('step01'); // 네트워크 오류 등 예외 발생 시 step01
    }
  }, [supplyItems]); // supplyItems는 상수로 정의되었으므로 변경되지 않아 useCallback 의존성에 큰 영향 없음

  // 컴포넌트가 처음 마운트될 때만 API를 호출하도록 useEffect를 설정
  // 빈 의존성 배열 `[]`을 사용하여 한 번만 실행되도록 합니다.
  useEffect(() => {
    fetchSupplyHistoryOnLoad();
  }, [fetchSupplyHistoryOnLoad]);


  useEffect(() => {
    const selectedItems = Object.keys(checkedItems)
      .filter((key) => checkedItems[key])
      .map((key) => ({
        id: key,
        label: supplyItems[key].label,
        icon: supplyItems[key].icon,
        count: key === 'envGen' || key === 'envEtc' ? 500 : 1,
      }));
    setItems(selectedItems);
  }, [checkedItems, supplyItems]);

  const handleCheckboxChange = (id: string) => {
    setCheckedItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleRemove = (id: string) => {
    setIsDeleteAlert(true)
    setDeleteItem(id);
  };

  const removeItem = () => {
    setIsDeleteAlert(false)
    setCheckedItems((prev) => ({
      ...prev,
      [deleteItem]: false,
    }));
  }

  const handleCountSelect = (id: string, value: string) => {
    setItems(prev => prev.map(item => item.id === id ? { ...item, count: parseInt(value) } : item));
  };

  const renderCountControl = (id: string, count: number) => {
    return (<ShadcnRadio
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
    </ShadcnRadio>);
  };

  const handleNext = async () => {
    if (activeTab === "step01") {
      if (items.length === 0) {
        alert("최소 한 개의 소모품을 선택해주세요.");
        return;
      }
      setActiveTab("step02");
    } else if (activeTab === "step02") {
      setActiveTab("step01")
    }
  };

  const handleConfirm = async () => {
    setIsConfirm(true)
  }

  const submitApplication = useCallback(async () => {
    const applicationData: RequestSupply = {
      envGen: 0, envEtc: 0, paper: 0, posGen: 0, posPda: 0,
      stiFree: 0, stiShop: 0, popFree: 0, popShop: 0,
      tabImm: 0, tabGen: 0, tabHimt: 0, alipay: 0,
    };

    items.forEach((item) => {
      if (item.id in applicationData) {
        applicationData[item.id as keyof RequestSupply] = item.count;
      }
    });

    console.log("신청 데이터:", applicationData);

    try {
      const response = await requestSupply(applicationData);

      if (response.code === 200 ) {
        if (!('code' in response.data) &&  response.data?.params?.rspCode === "0000") {
          return response;
        } else {
          console.error("Unexpected response data:", response.data);
          throw new Error(`소모품 신청에 실패했습니다. (코드: ${response.code})`);
        }
      } else {
        console.error("API call failed with code:", response.code);
        throw new Error(`소모품 신청에 실패했습니다. (HTTP 코드: ${response.code})`);
      }

    } catch (error) {
      console.error("신청 실패:", error);
      throw error;
    }
  }, [items]);

  const onConfirm = useCallback(async () => {
    setIsConfirm(false);
    try {
      await submitApplication();
      setActiveTab("step03"); // 신청 성공 시 step03으로 이동
      setIsSuccess(true);
    } catch (error) {
      console.error("Submission failed caught in onConfirm:", error);
      setIsSuccess(false); // 신청 실패 시 isSuccess를 false로 설정
      setActiveTab("step03"); // 신청 실패 시에도 결과 페이지(step03)로 이동
    }
  }, [submitApplication]);

  const moveToFranchiseNotice = () => {
    navigate('/ko/franchise/notice');
  };

  return (<>
    <div className="supplies-wrap">
      <section>
        <div className="hgroup-wrap">
          <h2 className="f48-700-140">소모품 신청</h2>
        </div>
      </section>

      <section>
        <div className="component-group">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="tab-wrap step-type">
            <TabsList>
              <TabsTrigger value="step01" className="pointer-events-none">
                <span>소모품 선택</span>
              </TabsTrigger>
              <TabsTrigger value="step02" className="pointer-events-none">
                <span>신청 정보 작성</span>
              </TabsTrigger>
              <TabsTrigger value="step03" className="pointer-events-none">
                <span>신청 완료</span>
              </TabsTrigger>
            </TabsList>
            <TabsContent value="step01">
              <section>
                <div className="hgroup-wrap sub tooltip-type">
                  <p className="f24-700-140">소모품 선택</p>
                </div>
                <div className="round-bx list-type">
                  <div className="round-inner">
                    {Object.keys(supplyItems).map((supply, index) => (<button
                      key={supply}
                      className={`round-item ${checkedItems[supply] ? "selected" : ""}`}
                      onClick={() => handleCheckboxChange(supply)}
                      type="button"
                    >
                      <div className="badge-group">
                        <div className="tit-ico">
                          <i
                            className={`ico ${supplyItems[supply].icon}`}
                            aria-hidden="true"
                          ></i>
                          <span>{supplyItems[supply].label}</span>
                        </div>
                        <div className="checkbox-wrap">
                          <Checkbox  onClick={(e) => e.stopPropagation()}
                            className="checkbox-input"
                            id={`checkbox-${index + 1}`}
                            checked={checkedItems[supply]}
                            onCheckedChange={() => handleCheckboxChange(supply)}
                          />
                        </div>
                      </div>
                    </button>))}
                  </div>
                </div>
              </section>
              <section>
                <div className="btn-wrap">
                  <div className="btn-inner line-type">
                    <Button className="btn btn-primary" onClick={handleNext}>
                      다음
                    </Button>
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
                  {items.map(({ id, label, icon, count }) => (<div
                    key={id}
                    className={`count-box ${id !== '1' ? 'no-radio' : ''}`}
                  >
                    <div className="tit-wrap">
                      {icon && (<i className={`ico ${icon}`} aria-hidden="true"></i>)}
                      <span className="tit">{label}</span>
                    </div>
                    {id === 'envGen' || id === 'envEtc' ? (<div className="btn-wrap">
                      {renderCountControl(id, count)}
                      <button
                        onClick={() => handleRemove(id)}
                        className="btn-close"
                      >
                        <i className="ico-close">닫기</i>
                      </button>
                    </div>) : (<div className="btn-wrap single-btn">
                      <button
                        onClick={() => handleRemove(id)}
                        className="btn-close"
                      >
                        <i className="ico-close">닫기</i>
                      </button>
                    </div>)}
                  </div>))}
                </div>
              </section>
              <section>
                <div className="hgroup-wrap more-type line-type">
                  <h2 className="f24-700-140">배송지 정보</h2>
                </div>
                <div className="component-group">
                  <div className="from-group">
                    <label htmlFor="test1" className="input-label">
                      <span className="label-txt">가맹점</span>
                    </label>
                    <div className="input-group hold-txt">
                      <ShadcnInput
                        type="text"
                        id="test1"
                        placeholder={mbrName ?? ""}
                        disabled
                      />
                    </div>
                  </div>
                  <div className="from-group">
                    <label htmlFor="test2" className="input-label">
                      <span className="label-txt">배송지</span>
                    </label>
                    <div className="input-group hold-txt">
                      <ShadcnInput
                        type="text"
                        id="test2"
                        placeholder={mbrAddr ?? ""}
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
                    <Button className="btn btn-default" onClick={handleNext}>
                      이전
                    </Button>
                    <Button className="btn btn-primary" onClick={handleConfirm}>
                      신청
                    </Button>
                  </div>
                </div>
              </section>
            </TabsContent>
            <TabsContent value="step03">
              {isSuccess ? (/* 신청완료 */
                <section>
                  <div className="complete-bx">
                    <img src={ico_complete} alt="완료" />
                    <p className="f28-700-140">소모품 신청이 완료되었습니다.</p>
                    <div className="supply-box">
                      <h4 className="supply-title">소모품 신청 내역</h4>
                      <ul className="supply-list">
                        {items.map((item, idx) => (
                          <li key={idx}>
                            {item.label} {item.count > 1 ? `${item.count}개` : ""}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </section>) : (/* 신청실패 */
                <>
                  <section>
                    <div className="complete-bx">
                      <img src={ico_fail} alt="실패" />
                      <p className="f28-700-140">소모품 신청이 실패하였습니다.</p>
                      <span className="f18-500-160">나중에 다시 시도해 주세요.</span>
                      <span className="f18-500-160">신청 문의: 02-6925-2033</span>
                    </div>
                  </section>
                </>)}
              <section>
                <div className="btn-wrap">
                  <div className="btn-inner line-type">
                    <Button className="btn btn-primary" onClick={moveToFranchiseNotice}>확인</Button>
                  </div>
                </div>
              </section>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </div>
    <CommonAlertDialog
      type="destructive"
      isOpen={isConfirm}
      title=""
      description="소모품 신청을 하시겠습니까?
      ※ 소모품 신청은 하루에 한번만 가능합니다."
      confirmText="확인"
      onConfirm={onConfirm}
      cancelText="취소"
      onCancel={() => {
        setIsConfirm(false);
      }}
    />
    <CommonAlertDialog
      type="normal"
      isOpen={isDeleteAlert}
      title=""
      description="선택한 물품을 삭제하시겠습니까?"
      confirmText="확인"
      onConfirm={removeItem}
    />
  </>);
};

export default SuppliesPage;