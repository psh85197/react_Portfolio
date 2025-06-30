import { useState } from "react";

/**
 * 체크박스 전체 선택 및 개별 선택 상태를 관리하는 커스텀 훅
 *
 * @template T - 체크 항목의 ID 타입 (number 또는 string)
 * @returns
 * - checkItems: 선택된 항목의 ID 배열
 * - setCheckItems: checkItems 상태를 직접 설정하는 함수
 * - isAllChecked: 현재 페이지 기준 전체 선택 여부
 * - handleAllCheck: 전체 선택/해제 시 호출하는 함수
 * - handleSingleCheck: 개별 체크박스 선택/해제 시 호출하는 함수
 *
 * 주로 페이징 UI나 테이블 등에서 체크박스 기능을 제어할 때 사용됨
 */
export const useCheckbox = <T extends number | string>() => {
  const [checkItems, setCheckItems] = useState<T[]>([]);
  const [isAllChecked, setIsAllChecked] = useState(false);

  // 체크박스 전체 선택
  const handleAllCheck = (checked: boolean, items: T[]) => {
    if (checked) {
      setCheckItems(items);
    } else {
      setCheckItems([]);
    }
    setIsAllChecked(checked);
  };

  // 체크박스 개별 선택
  const handleSingleCheck = (id: T, checked: boolean) => {
    setCheckItems((prev) =>
      checked ? [...prev, id] : prev.filter((checkedId) => checkedId !== id)
    );
  };

  return {
    checkItems,
    setCheckItems,
    isAllChecked,
    handleAllCheck,
    handleSingleCheck,
  };
};