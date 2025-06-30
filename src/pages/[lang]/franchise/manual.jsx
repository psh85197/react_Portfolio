import React, { useState, useEffect } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import useEmblaCarousel from "embla-carousel-react";
import slide_01_01_01 from "@/assets/images/contents/manual/pc/slide_01_01_01.png";
import slide_01_01_02 from "@/assets/images/contents/manual/pc/slide_01_01_02.png";
import slide_01_01_03 from "@/assets/images/contents/manual/pc/slide_01_01_03.png";
import slide_01_01_04 from "@/assets/images/contents/manual/pc/slide_01_01_04.png";
import slide_01_01_05 from "@/assets/images/contents/manual/pc/slide_01_01_05.png";
import slide_01_01_06 from "@/assets/images/contents/manual/pc/slide_01_01_06.png";

import mo_slide_01_01_01 from "@/assets/images/contents/manual/mo/slide_01_01_01.png";
import mo_slide_01_01_02 from "@/assets/images/contents/manual/mo/slide_01_01_02.png";
import mo_slide_01_01_03 from "@/assets/images/contents/manual/mo/slide_01_01_03.png";
import mo_slide_01_01_04 from "@/assets/images/contents/manual/mo/slide_01_01_04.png";
import mo_slide_01_01_05 from "@/assets/images/contents/manual/mo/slide_01_01_05.png";
import mo_slide_01_01_06 from "@/assets/images/contents/manual/mo/slide_01_01_06.png";

import slide_01_02_01 from "@/assets/images/contents/manual/pc/slide_01_02_01.png";
import slide_01_02_02 from "@/assets/images/contents/manual/pc/slide_01_02_02.png";
import slide_01_02_03 from "@/assets/images/contents/manual/pc/slide_01_02_03.png";
import slide_01_02_04 from "@/assets/images/contents/manual/pc/slide_01_02_04.png";
import slide_01_02_05 from "@/assets/images/contents/manual/pc/slide_01_02_05.png";
import slide_01_02_06 from "@/assets/images/contents/manual/pc/slide_01_02_06.png";
import slide_01_02_07 from "@/assets/images/contents/manual/pc/slide_01_02_07.png";
import slide_01_02_08 from "@/assets/images/contents/manual/pc/slide_01_02_08.png";
import slide_01_02_09 from "@/assets/images/contents/manual/pc/slide_01_02_09.png";
import slide_01_02_10 from "@/assets/images/contents/manual/pc/slide_01_02_10.png";
import slide_01_02_11 from "@/assets/images/contents/manual/pc/slide_01_02_11.png";

import mo_slide_01_02_01 from "@/assets/images/contents/manual/mo/slide_01_02_01.png";
import mo_slide_01_02_02 from "@/assets/images/contents/manual/mo/slide_01_02_02.png";
import mo_slide_01_02_03 from "@/assets/images/contents/manual/mo/slide_01_02_03.png";
import mo_slide_01_02_04 from "@/assets/images/contents/manual/mo/slide_01_02_04.png";
import mo_slide_01_02_05 from "@/assets/images/contents/manual/mo/slide_01_02_05.png";
import mo_slide_01_02_06 from "@/assets/images/contents/manual/mo/slide_01_02_06.png";
import mo_slide_01_02_07 from "@/assets/images/contents/manual/mo/slide_01_02_07.png";
import mo_slide_01_02_08 from "@/assets/images/contents/manual/mo/slide_01_02_08.png";
import mo_slide_01_02_09 from "@/assets/images/contents/manual/mo/slide_01_02_09.png";
import mo_slide_01_02_10 from "@/assets/images/contents/manual/mo/slide_01_02_10.png";
import mo_slide_01_02_11 from "@/assets/images/contents/manual/mo/slide_01_02_11.png";

// 키오스크 텐페이 슬라이드 이미지 import
import slide_01_03_01 from "@/assets/images/contents/manual/pc/slide_01_03_01.png";
import slide_01_03_02 from "@/assets/images/contents/manual/pc/slide_01_03_02.png";
import slide_01_03_03 from "@/assets/images/contents/manual/pc/slide_01_03_03.png";
import slide_01_03_04 from "@/assets/images/contents/manual/pc/slide_01_03_04.png";
import slide_01_03_05 from "@/assets/images/contents/manual/pc/slide_01_03_05.png";
import slide_01_03_06 from "@/assets/images/contents/manual/pc/slide_01_03_06.png";
import slide_01_03_07 from "@/assets/images/contents/manual/pc/slide_01_03_07.png";
import slide_01_03_08 from "@/assets/images/contents/manual/pc/slide_01_03_08.png";
import slide_01_03_09 from "@/assets/images/contents/manual/pc/slide_01_03_09.png";
import slide_01_03_10 from "@/assets/images/contents/manual/pc/slide_01_03_10.png";

import mo_slide_01_03_01 from "@/assets/images/contents/manual/mo/slide_01_03_01.png";
import mo_slide_01_03_02 from "@/assets/images/contents/manual/mo/slide_01_03_02.png";
import mo_slide_01_03_03 from "@/assets/images/contents/manual/mo/slide_01_03_03.png";
import mo_slide_01_03_04 from "@/assets/images/contents/manual/mo/slide_01_03_04.png";
import mo_slide_01_03_05 from "@/assets/images/contents/manual/mo/slide_01_03_05.png";
import mo_slide_01_03_06 from "@/assets/images/contents/manual/mo/slide_01_03_06.png";
import mo_slide_01_03_07 from "@/assets/images/contents/manual/mo/slide_01_03_07.png";
import mo_slide_01_03_08 from "@/assets/images/contents/manual/mo/slide_01_03_08.png";
import mo_slide_01_03_09 from "@/assets/images/contents/manual/mo/slide_01_03_09.png";
import mo_slide_01_03_10 from "@/assets/images/contents/manual/mo/slide_01_03_10.png";

// 키오스크 알리페이 슬라이드 이미지 import
import slide_01_04_01 from "@/assets/images/contents/manual/pc/slide_01_04_01.png";
import slide_01_04_02 from "@/assets/images/contents/manual/pc/slide_01_04_02.png";
import slide_01_04_03 from "@/assets/images/contents/manual/pc/slide_01_04_03.png";
import slide_01_04_04 from "@/assets/images/contents/manual/pc/slide_01_04_04.png";
import slide_01_04_05 from "@/assets/images/contents/manual/pc/slide_01_04_05.png";
import slide_01_04_07 from "@/assets/images/contents/manual/pc/slide_01_04_07.png";
import slide_01_04_08 from "@/assets/images/contents/manual/pc/slide_01_04_08.png";
import slide_01_04_09 from "@/assets/images/contents/manual/pc/slide_01_04_09.png";
import slide_01_04_10 from "@/assets/images/contents/manual/pc/slide_01_04_10.png";

import mo_slide_01_04_01 from "@/assets/images/contents/manual/mo/slide_01_04_01.png";
import mo_slide_01_04_02 from "@/assets/images/contents/manual/mo/slide_01_04_02.png";
import mo_slide_01_04_03 from "@/assets/images/contents/manual/mo/slide_01_04_03.png";
import mo_slide_01_04_04 from "@/assets/images/contents/manual/mo/slide_01_04_04.png";
import mo_slide_01_04_05 from "@/assets/images/contents/manual/mo/slide_01_04_05.png";
import mo_slide_01_04_07 from "@/assets/images/contents/manual/mo/slide_01_04_07.png";
import mo_slide_01_04_08 from "@/assets/images/contents/manual/mo/slide_01_04_08.png";
import mo_slide_01_04_09 from "@/assets/images/contents/manual/mo/slide_01_04_09.png";
import mo_slide_01_04_10 from "@/assets/images/contents/manual/mo/slide_01_04_10.png";

// 키오스크 신용카드 슬라이드 이미지 import
import slide_01_05_01 from "@/assets/images/contents/manual/pc/slide_01_05_01.png";
import slide_01_05_02 from "@/assets/images/contents/manual/pc/slide_01_05_02.png";
import slide_01_05_03 from "@/assets/images/contents/manual/pc/slide_01_05_03.png";
import slide_01_05_04 from "@/assets/images/contents/manual/pc/slide_01_05_04.png";
import slide_01_05_05 from "@/assets/images/contents/manual/pc/slide_01_05_05.png";
import slide_01_05_06 from "@/assets/images/contents/manual/pc/slide_01_05_06.png";
import slide_01_05_07 from "@/assets/images/contents/manual/pc/slide_01_05_07.png";
import slide_01_05_08 from "@/assets/images/contents/manual/pc/slide_01_05_08.png";
import slide_01_05_09 from "@/assets/images/contents/manual/pc/slide_01_05_09.png";

import mo_slide_01_05_01 from "@/assets/images/contents/manual/mo/slide_01_05_01.png";
import mo_slide_01_05_02 from "@/assets/images/contents/manual/mo/slide_01_05_02.png";
import mo_slide_01_05_03 from "@/assets/images/contents/manual/mo/slide_01_05_03.png";
import mo_slide_01_05_04 from "@/assets/images/contents/manual/mo/slide_01_05_04.png";
import mo_slide_01_05_05 from "@/assets/images/contents/manual/mo/slide_01_05_05.png";
import mo_slide_01_05_06 from "@/assets/images/contents/manual/mo/slide_01_05_06.png";
import mo_slide_01_05_07 from "@/assets/images/contents/manual/mo/slide_01_05_07.png";
import mo_slide_01_05_08 from "@/assets/images/contents/manual/mo/slide_01_05_08.png";
import mo_slide_01_05_09 from "@/assets/images/contents/manual/mo/slide_01_05_09.png";

// 단말기 물품 사후환급 발행 (step01) - 6개
import slide_02_01_01 from "@/assets/images/contents/manual/pc/slide_02_01_01.png";
import slide_02_01_02 from "@/assets/images/contents/manual/pc/slide_02_01_02.png";
import slide_02_01_03 from "@/assets/images/contents/manual/pc/slide_02_01_03.png";
import slide_02_01_04 from "@/assets/images/contents/manual/pc/slide_02_01_04.png";
import slide_02_01_05 from "@/assets/images/contents/manual/pc/slide_02_01_05.png";
import slide_02_01_06 from "@/assets/images/contents/manual/pc/slide_02_01_06.png";

import mo_slide_02_01_01 from "@/assets/images/contents/manual/mo/slide_02_01_01.png";
import mo_slide_02_01_02 from "@/assets/images/contents/manual/mo/slide_02_01_02.png";
import mo_slide_02_01_03 from "@/assets/images/contents/manual/mo/slide_02_01_03.png";
import mo_slide_02_01_04 from "@/assets/images/contents/manual/mo/slide_02_01_04.png";
import mo_slide_02_01_05 from "@/assets/images/contents/manual/mo/slide_02_01_05.png";
import mo_slide_02_01_06 from "@/assets/images/contents/manual/mo/slide_02_01_06.png";

// 단말기 물품 즉시환급 발행 (step02) - 7개
import slide_02_02_01 from "@/assets/images/contents/manual/pc/slide_02_02_01.png";
import slide_02_02_02 from "@/assets/images/contents/manual/pc/slide_02_02_02.png";
import slide_02_02_03 from "@/assets/images/contents/manual/pc/slide_02_02_03.png";
import slide_02_02_04 from "@/assets/images/contents/manual/pc/slide_02_02_04.png";
import slide_02_02_05 from "@/assets/images/contents/manual/pc/slide_02_02_05.png";
import slide_02_02_06 from "@/assets/images/contents/manual/pc/slide_02_02_06.png";
import slide_02_02_07 from "@/assets/images/contents/manual/pc/slide_02_02_07.png";

import mo_slide_02_02_01 from "@/assets/images/contents/manual/mo/slide_02_02_01.png";
import mo_slide_02_02_02 from "@/assets/images/contents/manual/mo/slide_02_02_02.png";
import mo_slide_02_02_03 from "@/assets/images/contents/manual/mo/slide_02_02_03.png";
import mo_slide_02_02_04 from "@/assets/images/contents/manual/mo/slide_02_02_04.png";
import mo_slide_02_02_05 from "@/assets/images/contents/manual/mo/slide_02_02_05.png";
import mo_slide_02_02_06 from "@/assets/images/contents/manual/mo/slide_02_02_06.png";
import mo_slide_02_02_07 from "@/assets/images/contents/manual/mo/slide_02_02_07.png";

// 단말기 숙박 사후환급 발행 (step03) - 7개
import slide_02_03_01 from "@/assets/images/contents/manual/pc/slide_02_03_01.png";
import slide_02_03_02 from "@/assets/images/contents/manual/pc/slide_02_03_02.png";
import slide_02_03_03 from "@/assets/images/contents/manual/pc/slide_02_03_03.png";
import slide_02_03_04 from "@/assets/images/contents/manual/pc/slide_02_03_04.png";
import slide_02_03_05 from "@/assets/images/contents/manual/pc/slide_02_03_05.png";
import slide_02_03_06 from "@/assets/images/contents/manual/pc/slide_02_03_06.png";
import slide_02_03_07 from "@/assets/images/contents/manual/pc/slide_02_03_07.png";

import mo_slide_02_03_01 from "@/assets/images/contents/manual/mo/slide_02_03_01.png";
import mo_slide_02_03_02 from "@/assets/images/contents/manual/mo/slide_02_03_02.png";
import mo_slide_02_03_03 from "@/assets/images/contents/manual/mo/slide_02_03_03.png";
import mo_slide_02_03_04 from "@/assets/images/contents/manual/mo/slide_02_03_04.png";
import mo_slide_02_03_05 from "@/assets/images/contents/manual/mo/slide_02_03_05.png";
import mo_slide_02_03_06 from "@/assets/images/contents/manual/mo/slide_02_03_06.png";
import mo_slide_02_03_07 from "@/assets/images/contents/manual/mo/slide_02_03_07.png";

// 단말기 숙박 즉시환급 발행 (step04) - 8개
import slide_02_04_01 from "@/assets/images/contents/manual/pc/slide_02_04_01.png";
import slide_02_04_02 from "@/assets/images/contents/manual/pc/slide_02_04_02.png";
import slide_02_04_03 from "@/assets/images/contents/manual/pc/slide_02_04_03.png";
import slide_02_04_04 from "@/assets/images/contents/manual/pc/slide_02_04_04.png";
import slide_02_04_05 from "@/assets/images/contents/manual/pc/slide_02_04_05.png";
import slide_02_04_06 from "@/assets/images/contents/manual/pc/slide_02_04_06.png";
import slide_02_04_07 from "@/assets/images/contents/manual/pc/slide_02_04_07.png";
import slide_02_04_08 from "@/assets/images/contents/manual/pc/slide_02_04_08.png";

import mo_slide_02_04_01 from "@/assets/images/contents/manual/mo/slide_02_04_01.png";
import mo_slide_02_04_02 from "@/assets/images/contents/manual/mo/slide_02_04_02.png";
import mo_slide_02_04_03 from "@/assets/images/contents/manual/mo/slide_02_04_03.png";
import mo_slide_02_04_04 from "@/assets/images/contents/manual/mo/slide_02_04_04.png";
import mo_slide_02_04_05 from "@/assets/images/contents/manual/mo/slide_02_04_05.png";
import mo_slide_02_04_06 from "@/assets/images/contents/manual/mo/slide_02_04_06.png";
import mo_slide_02_04_07 from "@/assets/images/contents/manual/mo/slide_02_04_07.png";
import mo_slide_02_04_08 from "@/assets/images/contents/manual/mo/slide_02_04_08.png";

// 단말기 환급 취소 (step05) - 6개
import slide_02_05_01 from "@/assets/images/contents/manual/pc/slide_02_05_01.png";
import slide_02_05_02 from "@/assets/images/contents/manual/pc/slide_02_05_02.png";
import slide_02_05_03 from "@/assets/images/contents/manual/pc/slide_02_05_03.png";
import slide_02_05_04 from "@/assets/images/contents/manual/pc/slide_02_05_04.png";
import slide_02_05_05 from "@/assets/images/contents/manual/pc/slide_02_05_05.png";
import slide_02_05_06 from "@/assets/images/contents/manual/pc/slide_02_05_06.png";

import mo_slide_02_05_01 from "@/assets/images/contents/manual/mo/slide_02_05_01.png";
import mo_slide_02_05_02 from "@/assets/images/contents/manual/mo/slide_02_05_02.png";
import mo_slide_02_05_03 from "@/assets/images/contents/manual/mo/slide_02_05_03.png";
import mo_slide_02_05_04 from "@/assets/images/contents/manual/mo/slide_02_05_04.png";
import mo_slide_02_05_05 from "@/assets/images/contents/manual/mo/slide_02_05_05.png";
import mo_slide_02_05_06 from "@/assets/images/contents/manual/mo/slide_02_05_06.png";
import { useLoadingStore } from "@/stores/loading-store.js";
import AuthComponent from "@/components/auth/AuthComponent.js";
import {checkToken} from "@/api/services/auth.js";
import {useNavigate} from "react-router-dom";
import {useAuthStore} from "@/stores/auth-store.js";

// 이미지 배열 정의
const slideImages = {
  pc: {
    slide_01_01: [
      slide_01_01_01,
      slide_01_01_02,
      slide_01_01_03,
      slide_01_01_04,
      slide_01_01_05,
      slide_01_01_06,
    ],
    slide_01_02: [
      slide_01_02_01,
      slide_01_02_02,
      slide_01_02_03,
      slide_01_02_04,
      slide_01_02_05,
      slide_01_02_06,
      slide_01_02_07,
      slide_01_02_08,
      slide_01_02_09,
      slide_01_02_10,
      slide_01_02_11,
    ],
    slide_01_03: [
      slide_01_03_01,
      slide_01_03_02,
      slide_01_03_03,
      slide_01_03_04,
      slide_01_03_05,
      slide_01_03_06,
      slide_01_03_07,
      slide_01_03_08,
      slide_01_03_09,
      slide_01_03_10,
    ],
    slide_01_04: [
      slide_01_04_01,
      slide_01_04_02,
      slide_01_04_03,
      slide_01_04_04,
      slide_01_04_05,
      slide_01_04_07,
      slide_01_04_08,
      slide_01_04_09,
      slide_01_04_10,
    ],
    slide_01_05: [
      slide_01_05_01,
      slide_01_05_02,
      slide_01_05_03,
      slide_01_05_04,
      slide_01_05_05,
      slide_01_05_06,
      slide_01_05_07,
      slide_01_05_08,
      slide_01_05_09,
    ],
    slide_02_01: [
      slide_02_01_01,
      slide_02_01_02,
      slide_02_01_03,
      slide_02_01_04,
      slide_02_01_05,
      slide_02_01_06,
    ],
    slide_02_02: [
      slide_02_02_01,
      slide_02_02_02,
      slide_02_02_03,
      slide_02_02_04,
      slide_02_02_05,
      slide_02_02_06,
      slide_02_02_07,
    ],
    slide_02_03: [
      slide_02_03_01,
      slide_02_03_02,
      slide_02_03_03,
      slide_02_03_04,
      slide_02_03_05,
      slide_02_03_06,
      slide_02_03_07,
    ],
    slide_02_04: [
      slide_02_04_01,
      slide_02_04_02,
      slide_02_04_03,
      slide_02_04_04,
      slide_02_04_05,
      slide_02_04_06,
      slide_02_04_07,
      slide_02_04_08,
    ],
    slide_02_05: [
      slide_02_05_01,
      slide_02_05_02,
      slide_02_05_03,
      slide_02_05_04,
      slide_02_05_05,
      slide_02_05_06,
    ],
  },
  mo: {
    slide_01_01: [
      mo_slide_01_01_01,
      mo_slide_01_01_02,
      mo_slide_01_01_03,
      mo_slide_01_01_04,
      mo_slide_01_01_05,
      mo_slide_01_01_06,
    ],
    slide_01_02: [
      mo_slide_01_02_01,
      mo_slide_01_02_02,
      mo_slide_01_02_03,
      mo_slide_01_02_04,
      mo_slide_01_02_05,
      mo_slide_01_02_06,
      mo_slide_01_02_07,
      mo_slide_01_02_08,
      mo_slide_01_02_09,
      mo_slide_01_02_10,
      mo_slide_01_02_11,
    ],
    slide_01_03: [
      mo_slide_01_03_01,
      mo_slide_01_03_02,
      mo_slide_01_03_03,
      mo_slide_01_03_04,
      mo_slide_01_03_05,
      mo_slide_01_03_06,
      mo_slide_01_03_07,
      mo_slide_01_03_08,
      mo_slide_01_03_09,
      mo_slide_01_03_10,
    ],
    slide_01_04: [
      mo_slide_01_04_01,
      mo_slide_01_04_02,
      mo_slide_01_04_03,
      mo_slide_01_04_04,
      mo_slide_01_04_05,
      mo_slide_01_04_07,
      mo_slide_01_04_08,
      mo_slide_01_04_09,
      mo_slide_01_04_10,
    ],
    slide_01_05: [
      mo_slide_01_05_01,
      mo_slide_01_05_02,
      mo_slide_01_05_03,
      mo_slide_01_05_04,
      mo_slide_01_05_05,
      mo_slide_01_05_06,
      mo_slide_01_05_07,
      mo_slide_01_05_08,
      mo_slide_01_05_09,
    ],
    slide_02_01: [
      mo_slide_02_01_01,
      mo_slide_02_01_02,
      mo_slide_02_01_03,
      mo_slide_02_01_04,
      mo_slide_02_01_05,
      mo_slide_02_01_06,
    ],
    slide_02_02: [
      mo_slide_02_02_01,
      mo_slide_02_02_02,
      mo_slide_02_02_03,
      mo_slide_02_02_04,
      mo_slide_02_02_05,
      mo_slide_02_02_06,
      mo_slide_02_02_07,
    ],
    slide_02_03: [
      mo_slide_02_03_01,
      mo_slide_02_03_02,
      mo_slide_02_03_03,
      mo_slide_02_03_04,
      mo_slide_02_03_05,
      mo_slide_02_03_06,
      mo_slide_02_03_07,
    ],
    slide_02_04: [
      mo_slide_02_04_01,
      mo_slide_02_04_02,
      mo_slide_02_04_03,
      mo_slide_02_04_04,
      mo_slide_02_04_05,
      mo_slide_02_04_06,
      mo_slide_02_04_07,
      mo_slide_02_04_08,
    ],
    slide_02_05: [
      mo_slide_02_05_01,
      mo_slide_02_05_02,
      mo_slide_02_05_03,
      mo_slide_02_05_04,
      mo_slide_02_05_05,
      mo_slide_02_05_06,
    ],
  },
};

const ManualPage = () => {

  const refundData = [
    { range: "15,000원 ~ 29,999원", amount: "1,000원" },
    { range: "30,000원 ~ 49,999원", amount: "1,500원" },
    { range: "50,000원 ~ 74,999원", amount: "3,500원" },
    { range: "75,000원 ~ 99,999원", amount: "5,000원" },
    { range: "100,000원 ~ 124,999원", amount: "6,000원" },
    { separator: true },
    { range: "125,000원 ~ 149,999원", amount: "7,500원" },
    { range: "150,000원 ~ 174,999원", amount: "9,000원" },
    { range: "175,000원 ~ 199,999원", amount: "10,000원" },
    { range: "200,000원 ~ 224,999원", amount: "12,000원" },
    { range: "225,000원 ~ 249,999원", amount: "13,500원" },
  ];
  const refundData1 = [
    { range: "250,000원 ~ 274,999원", amount: "15,500원" },
    { range: "275,000원 ~ 299,999원", amount: "17,000원" },
    { range: "300,000원 ~ 324,999원", amount: "19,000원" },
    { range: "325,000원 ~ 349,999원", amount: "21,000원" },
    { range: "350,000원 ~ 374,999원", amount: "23,000원" },
    { separator: true },
    { range: "375,000원 ~ 399,999원", amount: "24,500원" },
    { range: "400,000원 ~ 424,999원", amount: "26,000원" },
    { range: "425,000원 ~ 449,999원", amount: "28,000원" },
    { range: "450,000원 ~ 474,999원", amount: "30,000원" },
    { range: "475,000원 ~ 499,999원", amount: "32,000원" },
  ];
  const refundData2 = [
    { range: "500,000원 ~ 549,999원", amount: "35,000원" },
    { range: "550,000원 ~ 599,999원", amount: "38,000원" },
    { range: "600,000원 ~ 649,999원", amount: "42,000원" },
    { range: "650,000원 ~ 699,999원", amount: "46,000원" },
    { range: "700,000원 ~ 749,999원", amount: "50,000원" },
    { separator: true },
    { range: "750,000원 ~ 799,999원", amount: "53,000원" },
    { range: "800,000원 ~ 849,999원", amount: "57,000원" },
    { range: "850,000원 ~ 899,999원", amount: "61,000원" },
    { range: "900,000원 ~ 949,999원", amount: "65,000원" },
    { range: "950,000원 ~ 999,999원", amount: "68,000원" },
  ];
  const refundData3 = [
    { range: "1,000,000원 ~ 1,099,999원", amount: "74,000원" },
    { range: "1,100,000원 ~ 1,199,999원", amount: "82,000원" },
    { range: "1,200,000원 ~ 1,299,999원", amount: "90,000원" },
    { range: "1,300,000원 ~ 1,399,999원", amount: "97,000원" },
    { range: "1,400,000원 ~ 1,499,999원", amount: "104,000원" },
    { separator: true },
    { range: "1,500,000원 ~ 1,599,999원", amount: "112,000원" },
    { range: "1,600,000원 ~ 1,699,999원", amount: "119,000원" },
    { range: "1,700,000원 ~ 1,799,999원", amount: "127,000원" },
    { range: "1,800,000원 ~ 1,899,999원", amount: "134,000원" },
    { range: "1,900,000원 ~ 1,999,999원", amount: "141,000원" },
  ];
  const refundData4 = [
    { range: "2,000,000원 ~ 2,099,999원", amount: "149,000원" },
    { range: "2,100,000원 ~ 2,199,999원", amount: "155,000원" },
    { range: "2,200,000원 ~ 2,299,999원", amount: "160,000원" },
    { range: "2,300,000원 ~ 2,399,999원", amount: "170,000원" },
    { range: "2,400,000원 ~ 2,499,999원", amount: "177,000원" },
    { separator: true },
    { range: "2,500,000원 ~ 2,599,999원", amount: "185,000원" },
    { range: "2,600,000원 ~ 2,699,999원", amount: "192,000원" },
    { range: "2,700,000원 ~ 2,799,999원", amount: "200,000원" },
    { range: "2,800,000원 ~ 2,899,999원", amount: "208,000원" },
    { range: "2,900,000원 ~ 2,999,999원", amount: "215,000원" },
  ];
  const refundData5 = [
    { range: "3,000,000원 ~ 3,099,999원", amount: "223,000원" },
    { range: "3,100,000원 ~ 3,199,999원", amount: "231,000원" },
    { range: "3,200,000원 ~ 3,299,999원", amount: "238,000원" },
    { range: "3,300,000원 ~ 3,399,999원", amount: "246,000원" },
    { range: "3,400,000원 ~ 3,499,999원", amount: "255,000원" },
    { separator: true },
    { range: "3,500,000원 ~ 3,599,999원", amount: "262,000원" },
    { range: "3,600,000원 ~ 3,699,999원", amount: "270,000원" },
    { range: "3,700,000원 ~ 3,799,999원", amount: "278,000원" },
    { range: "3,800,000원 ~ 3,899,999원", amount: "286,000원" },
    { range: "3,900,000원 ~ 3,999,999원", amount: "294,000원" },
  ];
  const refundData6 = [
    { range: "4,000,000원 ~ 4,099,999원", amount: "303,000원" },
    { range: "4,100,000원 ~ 4,199,999원", amount: "310,000원" },
    { range: "4,200,000원 ~ 4,299,999원", amount: "318,000원" },
    { range: "4,300,000원 ~ 4,399,999원", amount: "325,000원" },
    { range: "4,400,000원 ~ 4,499,999원", amount: "333,000원" },
    { separator: true },
    { range: "4,500,000원 ~ 4,599,999원", amount: "344,000원" },
    { range: "4,600,000원 ~ 4,699,999원", amount: "352,000원" },
    { range: "4,700,000원 ~ 4,799,999원", amount: "360,000원" },
    { range: "4,800,000원 ~ 4,899,999원", amount: "370,000원" },
    { range: "4,900,000원 ~ 4,999,999원", amount: "380,000원" },
  ];
  const refundData7 = [
    { range: "5,000,000원 ~ 5,099,999원", amount: "390,000원" },
    { range: "5,100,000원 ~ 5,199,999원", amount: "400,000원" },
    { range: "5,200,000원 ~ 5,299,999원", amount: "410,000원" },
    { range: "5,300,000원 ~ 5,399,999원", amount: "420,000원" },
    { range: "5,400,000원 ~ 5,499,999원", amount: "430,000원" },
    { separator: true },
    { range: "5,500,000원 ~ 5,599,999원", amount: "440,000원" },
    { range: "5,600,000원 ~ 5,699,999원", amount: "450,000원" },
    { range: "5,700,000원 ~ 5,799,999원", amount: "460,000원" },
    { range: "5,800,000원 ~ 5,899,999원", amount: "470,000원" },
    { range: "5,900,000원 ~ 5,999,999원", amount: "480,000원" },
  ];

  // 키오스크 탭의 서브 탭 캐러셀
  const [kioskReceiptCarousel, setKioskReceiptCarousel] = useState(null);
  const [kioskCashCarousel, setKioskCashCarousel] = useState(null);
  const [kioskTenpayCarousel, setKioskTenpayCarousel] = useState(null);
  const [kioskAlipayCarousel, setKioskAlipayCarousel] = useState(null);
  const [kioskCreditCardCarousel, setKioskCreditCardCarousel] = useState(null);

  // 단말기 탭의 서브 탭 캐러셀
  const [terminalReceiptCarousel, setTerminalReceiptCarousel] = useState(null);
  const [terminalCashCarousel, setTerminalCashCarousel] = useState(null);
  const [terminalTenpayCarousel, setTerminalTenpayCarousel] = useState(null);
  const [terminalAlipayCarousel, setTerminalAlipayCarousel] = useState(null);
  const [terminalCancelCarousel, setTerminalCancelCarousel] = useState(null);

  // 키오스크 탭의 서브 탭 페이지 상태
  const [currentKioskReceiptPage, setCurrentKioskReceiptPage] = useState(1);
  const [currentKioskCashPage, setCurrentKioskCashPage] = useState(1);
  const [currentKioskTenpayPage, setCurrentKioskTenpayPage] = useState(1);
  const [currentKioskAlipayPage, setCurrentKioskAlipayPage] = useState(1);
  const [currentKioskCreditCardPage, setCurrentKioskCreditCardPage] =
    useState(1);

  // 단말기 탭의 서브 탭 페이지 상태
  const [currentTerminalReceiptPage, setCurrentTerminalReceiptPage] =
    useState(1);
  const [currentTerminalCashPage, setCurrentTerminalCashPage] = useState(1);
  const [currentTerminalTenpayPage, setCurrentTerminalTenpayPage] = useState(1);
  const [currentTerminalAlipayPage, setCurrentTerminalAlipayPage] = useState(1);
  const [currentTerminalCancelPage, setCurrentTerminalCancelPage] = useState(1);

  // 각 캐러셀의 총 슬라이드 개수 상태
  const [totalKioskReceiptPages, setTotalKioskReceiptPages] = useState(0);
  const [totalKioskCashPages, setTotalKioskCashPages] = useState(0);
  const [totalKioskTenpayPages, setTotalKioskTenpayPages] = useState(0);
  const [totalKioskAlipayPages, setTotalKioskAlipayPages] = useState(0);
  const [totalKioskCreditCardPages, setTotalKioskCreditCardPages] = useState(0);
  const [totalTerminalReceiptPages, setTotalTerminalReceiptPages] = useState(0);
  const [totalTerminalCashPages, setTotalTerminalCashPages] = useState(0);
  const [totalTerminalTenpayPages, setTotalTerminalTenpayPages] = useState(0);
  const [totalTerminalAlipayPages, setTotalTerminalAlipayPages] = useState(0);
  const [totalTerminalCancelPages, setTotalTerminalCancelPages] = useState(0);

  // 키오스크 환급전표 발행 캐러셀 이벤트
  useEffect(() => {
    if (kioskReceiptCarousel) {
      // 초기 마운트 시 total 페이지 설정
      const totalPages = kioskReceiptCarousel.slideNodes().length;
      setTotalKioskReceiptPages(totalPages);

      const onSelect = () => {
        const currentPage = kioskReceiptCarousel.selectedScrollSnap() + 1;
        setCurrentKioskReceiptPage(currentPage);
      };
      kioskReceiptCarousel.on("select", onSelect);

      // 현재 페이지로 이동
      if (currentKioskReceiptPage > 1) {
        kioskReceiptCarousel.scrollTo(currentKioskReceiptPage - 1);
      }

      return () => kioskReceiptCarousel.off("select", onSelect);
    }
  }, [kioskReceiptCarousel, currentKioskReceiptPage]);

  // 키오스크 현금 환급 캐러셀 이벤트
  useEffect(() => {
    if (kioskCashCarousel) {
      const totalPages = kioskCashCarousel.slideNodes().length;
      setTotalKioskCashPages(totalPages);

      const onSelect = () => {
        setCurrentKioskCashPage(kioskCashCarousel.selectedScrollSnap() + 1);
      };
      kioskCashCarousel.on("select", onSelect);

      if (currentKioskCashPage > 1) {
        kioskCashCarousel.scrollTo(currentKioskCashPage - 1);
      }

      return () => kioskCashCarousel.off("select", onSelect);
    }
  }, [kioskCashCarousel, currentKioskCashPage]);

  // 키오스크 텐페이 환급 캐러셀 이벤트
  useEffect(() => {
    if (kioskTenpayCarousel) {
      const totalPages = kioskTenpayCarousel.slideNodes().length;
      setTotalKioskTenpayPages(totalPages);

      const onSelect = () => {
        setCurrentKioskTenpayPage(kioskTenpayCarousel.selectedScrollSnap() + 1);
      };
      kioskTenpayCarousel.on("select", onSelect);

      if (currentKioskTenpayPage > 1) {
        kioskTenpayCarousel.scrollTo(currentKioskTenpayPage - 1);
      }

      return () => kioskTenpayCarousel.off("select", onSelect);
    }
  }, [kioskTenpayCarousel, currentKioskTenpayPage]);

  // 키오스크 알리페이 환급 캐러셀 이벤트
  useEffect(() => {
    if (kioskAlipayCarousel) {
      const totalPages = kioskAlipayCarousel.slideNodes().length;
      setTotalKioskAlipayPages(totalPages);

      const onSelect = () => {
        setCurrentKioskAlipayPage(kioskAlipayCarousel.selectedScrollSnap() + 1);
      };
      kioskAlipayCarousel.on("select", onSelect);

      if (currentKioskAlipayPage > 1) {
        kioskAlipayCarousel.scrollTo(currentKioskAlipayPage - 1);
      }

      return () => kioskAlipayCarousel.off("select", onSelect);
    }
  }, [kioskAlipayCarousel, currentKioskAlipayPage]);

  // 키오스크 신용카드 환급 캐러셀 이벤트
  useEffect(() => {
    if (kioskCreditCardCarousel) {
      const totalPages = kioskCreditCardCarousel.slideNodes().length;
      setTotalKioskCreditCardPages(totalPages);

      const onSelect = () => {
        setCurrentKioskCreditCardPage(
          kioskCreditCardCarousel.selectedScrollSnap() + 1
        );
      };
      kioskCreditCardCarousel.on("select", onSelect);

      if (currentKioskCreditCardPage > 1) {
        kioskCreditCardCarousel.scrollTo(currentKioskCreditCardPage - 1);
      }

      return () => kioskCreditCardCarousel.off("select", onSelect);
    }
  }, [kioskCreditCardCarousel, currentKioskCreditCardPage]);

  // 단말기 환급전표 발행 캐러셀 이벤트
  useEffect(() => {
    if (terminalReceiptCarousel) {
      const totalPages = terminalReceiptCarousel.slideNodes().length;
      setTotalTerminalReceiptPages(totalPages);

      const onSelect = () => {
        setCurrentTerminalReceiptPage(
          terminalReceiptCarousel.selectedScrollSnap() + 1
        );
      };
      terminalReceiptCarousel.on("select", onSelect);

      if (currentTerminalReceiptPage > 1) {
        terminalReceiptCarousel.scrollTo(currentTerminalReceiptPage - 1);
      }

      return () => terminalReceiptCarousel.off("select", onSelect);
    }
  }, [terminalReceiptCarousel, currentTerminalReceiptPage]);

  // 단말기 현금 환급 캐러셀 이벤트
  useEffect(() => {
    if (terminalCashCarousel) {
      const totalPages = terminalCashCarousel.slideNodes().length;
      setTotalTerminalCashPages(totalPages);

      const onSelect = () => {
        setCurrentTerminalCashPage(
          terminalCashCarousel.selectedScrollSnap() + 1
        );
      };
      terminalCashCarousel.on("select", onSelect);

      if (currentTerminalCashPage > 1) {
        terminalCashCarousel.scrollTo(currentTerminalCashPage - 1);
      }

      return () => terminalCashCarousel.off("select", onSelect);
    }
  }, [terminalCashCarousel, currentTerminalCashPage]);

  // 단말기 텐페이 환급 캐러셀 이벤트
  useEffect(() => {
    if (terminalTenpayCarousel) {
      const totalPages = terminalTenpayCarousel.slideNodes().length;
      setTotalTerminalTenpayPages(totalPages);

      const onSelect = () => {
        setCurrentTerminalTenpayPage(
          terminalTenpayCarousel.selectedScrollSnap() + 1
        );
      };
      terminalTenpayCarousel.on("select", onSelect);

      if (currentTerminalTenpayPage > 1) {
        terminalTenpayCarousel.scrollTo(currentTerminalTenpayPage - 1);
      }

      return () => terminalTenpayCarousel.off("select", onSelect);
    }
  }, [terminalTenpayCarousel, currentTerminalTenpayPage]);

  // 단말기 알리페이 환급 캐러셀 이벤트
  useEffect(() => {
    if (terminalAlipayCarousel) {
      const totalPages = terminalAlipayCarousel.slideNodes().length;
      setTotalTerminalAlipayPages(totalPages);

      const onSelect = () => {
        setCurrentTerminalAlipayPage(
          terminalAlipayCarousel.selectedScrollSnap() + 1
        );
      };
      terminalAlipayCarousel.on("select", onSelect);

      if (currentTerminalAlipayPage > 1) {
        terminalAlipayCarousel.scrollTo(currentTerminalAlipayPage - 1);
      }

      return () => terminalAlipayCarousel.off("select", onSelect);
    }
  }, [terminalAlipayCarousel, currentTerminalAlipayPage]);

  // 단말기 환급 취소 캐러셀 이벤트
  useEffect(() => {
    if (terminalCancelCarousel) {
      const totalPages = terminalCancelCarousel.slideNodes().length;
      setTotalTerminalCancelPages(totalPages);

      const onSelect = () => {
        setCurrentTerminalCancelPage(
          terminalCancelCarousel.selectedScrollSnap() + 1
        );
      };
      terminalCancelCarousel.on("select", onSelect);

      if (currentTerminalCancelPage > 1) {
        terminalCancelCarousel.scrollTo(currentTerminalCancelPage - 1);
      }

      return () => terminalCancelCarousel.off("select", onSelect);
    }
  }, [terminalCancelCarousel, currentTerminalCancelPage]);
  // 키오스크 캐러셀의 슬라이드별 텍스트 정의

  // 키오스크 환급전표
  const kioskReceiptTexts = [
    "언어 선택",
    "발행 선택",
    "여권 스캔",
    "영수증 스캔",
    "이용약관 동의",
    "환급전표 출력",
  ];

  // 키오스크 현금 환급
  const kioskCashTexts = [
    "언어 선택",
    "환급 선택 ",
    "여권 스캔",
    "환급전표 스캔 ",
    "환급 수단 - 현금 선택",
    "출국 일자 확인",
    "신용카드 삽입(담보용)",
    "신용카드 회수",
    "이용약관 확인 및 서명",
    "도심환급 전표 출력 및 환급금 수령",
    "인천공항 세관 위치 안내",
  ];

  // 키오스크 위챗페이
  const kioskTenpayTexts = [
    "언어 선택",
    "환급 선택",
    "여권 스캔 ",
    "환급전표 스캔",
    "환급 수단 - 텐페이(위챗) 선택",
    "텐페이(위챗) 환급 전용 QR 스캔",
    "QR 스캔 후 발급된 바코드 스캔",
    "이용약관 확인 및 서명",
    "도심환급 전표 출력",
    "인천공항 세관 위치 안내",
  ];

  // 키오스크 알리페이
  const kioskAlipayTexts = [
    "언어 선택",
    "환급 선택",
    "여권 스캔",
    "환급전표 스캔",
    "환급 수단 - 알리페이 선택",
    "알리페이 바코드 스캔 또는 알리페이 번호 입력",
    "이용약관 확인 및 서명",
    "도심 환급전표 출력",
    "인천공항 세관 위치 안내",
  ];

  // 키오스크 신용카드 환급
  const kioskCreditCardTexts = [
    "언어 선택",
    "환급 선택",
    "여권 스캔",
    "환급전표 선택",
    "환급 수단 - 신용카드 선택",
    "신용카드 번호 입력",
    "이용약관 확인 및 서명",
    "도심 환금전표 출력",
    "인천공항 세관 위치 안내",
  ];

  // 단말기(물품/숙박) 슬라이드별 텍 스트 정의
  const terminalReceiptTexts = [
    "0번 선택",
    "현금(온라인) 선택",
    "결제유형 선택",
    "판매금액 입력",
    "수량 입력",
    "완료",
  ];

  const terminalCashTexts = [
    "0번 선택",
    "즉시환급 선택 - [2번]",
    "여권 스캔",
    "결제유형 선택",
    "판매금액 입력",
    "수량 입력",
    "완료",
  ];

  const terminalTenpayTexts = [
    "0번 선택",
    "숙박용역 선택 - [2번]",
    "사후환급 선택 - [1번]",
    "결제유형 선택",
    "판매금액 입력",
    "숙박일수 입력",
    "완료",
  ];

  const terminalAlipayTexts = [
    "0번 선택",
    "숙박용역 선택 - [2번]",
    "즉시환급 선택 - [2번]",
    "여권 스캔",
    "결제유형 선택",
    "판매금액 입력",
    "숙박일수 입력",
    "완료",
  ];

  const terminalCancelTexts = [
    "0번 선택",
    "취소 선택 - [2번]",
    "현금 선택 - [1번]",
    "판매금액 입력",
    "구매일련번호 입력",
    "완료",
  ];

  // 탭 변경 시 캐러셀 상태 초기화 방지
  const handleTabChange = (value) => {
    // 모든 캐러셀 객체 배열
    const carousels = [
      kioskReceiptCarousel,
      kioskCashCarousel,
      kioskTenpayCarousel,
      kioskAlipayCarousel,
      kioskCreditCardCarousel,
      terminalReceiptCarousel,
      terminalCashCarousel,
      terminalTenpayCarousel,
      terminalAlipayCarousel,
      terminalCancelCarousel,
    ];

    // 모든 페이지 상태 설정 함수 배열
    const setPageStates = [
      setCurrentKioskReceiptPage,
      setCurrentKioskCashPage,
      setCurrentKioskTenpayPage,
      setCurrentKioskAlipayPage,
      setCurrentKioskCreditCardPage,
      setCurrentTerminalReceiptPage,
      setCurrentTerminalCashPage,
      setCurrentTerminalTenpayPage,
      setCurrentTerminalAlipayPage,
      setCurrentTerminalCancelPage,
    ];

    // 캐러셀 초기화
    carousels.forEach((carousel) => carousel?.scrollTo(0));

    // 페이지 상태 초기화
    setPageStates.forEach((setState) => setState(1));
  };

  return (
    <>
      <div className="manual-wrap">
        <section>
          <div className="hgroup-wrap">
            <h2 className="f48-700-140">매뉴얼</h2>
          </div>
        </section>
        <section>
          <Tabs
            defaultValue="step01"
            className="tab-wrap type03"
            scrollIntoView={false}
            onValueChange={handleTabChange}
          >
            <TabsList>
              <TabsTrigger value="step01">키오스크</TabsTrigger>
              <TabsTrigger value="step02">단말기</TabsTrigger>
              <TabsTrigger value="step03">환급요율표</TabsTrigger>
            </TabsList>
            <TabsContent value="step01">
              <section>
                <div className="manual-content">
                  <div className="title-wrap">
                    <p className="tit f40-700-130">키오스크(KIOSK)</p>
                  </div>
                  <div className="cont-wrap border">
                    <Tabs
                      defaultValue="step01-01"
                      className="tab-wrap type04"
                      scrollIntoView={false}
                      onValueChange={handleTabChange}
                    >
                      <TabsList>
                        <TabsTrigger value="step01-01">
                          환급전표 발행
                        </TabsTrigger>
                        <TabsTrigger value="step02-01">현금 환급</TabsTrigger>
                        <TabsTrigger value="step03-01">
                          위챗페이 환급
                        </TabsTrigger>
                        <TabsTrigger value="step04-01">
                          알리페이 환급
                        </TabsTrigger>
                        <TabsTrigger value="step05-01">
                          신용카드 환급
                        </TabsTrigger>
                      </TabsList>
                      <TabsContent value="step01-01">
                        <div className="component-group">
                          <div className="from-group">
                            <div className="w-full relative">
                              <div className="pagination-wrapper">
                                <div className="pagination-container">
                                  <div className="pagination-style">
                                    <span className="pagination-text text-white">
                                      <span className="opacity-100">
                                        {currentKioskReceiptPage}
                                      </span>
                                      <span className="opacity-50">
                                        / {totalKioskReceiptPages}
                                      </span>
                                    </span>
                                  </div>
                                  <span className="slide-text-style">
                                    {
                                      kioskReceiptTexts[
                                        currentKioskReceiptPage - 1
                                      ]
                                    }
                                  </span>
                                </div>
                              </div>
                              <Carousel
                                className="w-full relative"
                                setApi={setKioskReceiptCarousel}
                                opts={{
                                  loop: false,
                                }}
                              >
                                <CarouselContent className="w-full mx-0">
                                  {[...Array(6)].map((_, index) => (
                                    <CarouselItem
                                      key={index}
                                      className="basis-full pl-0 pr-0"
                                    >
                                      <div className="p-0 w-full">
                                        <Card className="w-full rounded-none bg-card text-card-foreground shadow">
                                          <CardContent className="p-0 w-full">
                                            <div className="manual-image">
                                              <img
                                                src={
                                                  slideImages.pc.slide_01_01[
                                                    index
                                                  ]
                                                }
                                                alt=""
                                                className="w-full h-full object-cover hidden md:block"
                                              />
                                              <img
                                                src={
                                                  slideImages.mo.slide_01_01[
                                                    index
                                                  ]
                                                }
                                                alt=""
                                                className="w-full h-full object-cover block md:hidden"
                                              />
                                            </div>
                                          </CardContent>
                                        </Card>
                                      </div>
                                    </CarouselItem>
                                  ))}
                                </CarouselContent>
                                <CarouselPrevious
                                  className="absolute left-2 z-10"
                                  style={{
                                    width: "40px",
                                    height: "40px",
                                    border: "1px solid #212529",
                                    backgroundColor: "#ffffff",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                  }}
                                />
                                <CarouselNext
                                  className="absolute right-2 z-10"
                                  style={{
                                    width: "40px",
                                    height: "40px",
                                    border: "1px solid #212529",
                                    backgroundColor: "#ffffff",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                  }}
                                />
                              </Carousel>
                            </div>
                          </div>
                        </div>
                      </TabsContent>
                      <TabsContent value="step02-01">
                        <div className="component-group">
                          <div className="from-group">
                            <div className="w-full relative">
                              <div className="pagination-wrapper">
                                <div className="pagination-container">
                                  <div className="pagination-style">
                                    <span className="pagination-text text-white">
                                      <span className="opacity-100">
                                        {currentKioskCashPage}
                                      </span>
                                      <span className="opacity-50">
                                        / {totalKioskCashPages}
                                      </span>
                                    </span>
                                  </div>
                                  <span className="slide-text-style">
                                    {kioskCashTexts[currentKioskCashPage - 1]}
                                  </span>
                                </div>
                              </div>
                              <Carousel
                                className="w-full relative"
                                setApi={setKioskCashCarousel}
                                opts={{
                                  loop: false,
                                }}
                              >
                                <CarouselContent className="w-full mx-0">
                                  {[...Array(11)].map((_, index) => (
                                    <CarouselItem
                                      key={index}
                                      className="basis-full pl-0 pr-0"
                                    >
                                      <div className="p-0 w-full">
                                        <Card className="w-full rounded-none bg-card text-card-foreground shadow">
                                          <CardContent className="p-0 w-full">
                                            <div className="manual-image">
                                              <img
                                                src={
                                                  slideImages.pc.slide_01_02[
                                                    index
                                                  ]
                                                }
                                                alt=""
                                                className="w-full h-full object-cover hidden md:block"
                                              />
                                              <img
                                                src={
                                                  slideImages.mo.slide_01_02[
                                                    index
                                                  ]
                                                }
                                                alt=""
                                                className="w-full h-full object-cover block md:hidden"
                                              />
                                            </div>
                                          </CardContent>
                                        </Card>
                                      </div>
                                    </CarouselItem>
                                  ))}
                                </CarouselContent>
                                <CarouselPrevious
                                  className="absolute left-2 z-10"
                                  style={{
                                    width: "40px",
                                    height: "40px",
                                    border: "1px solid #212529",
                                    backgroundColor: "#ffffff",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                  }}
                                />
                                <CarouselNext
                                  className="absolute right-2 z-10"
                                  style={{
                                    width: "40px",
                                    height: "40px",
                                    border: "1px solid #212529",
                                    backgroundColor: "#ffffff",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                  }}
                                />
                              </Carousel>
                            </div>
                          </div>
                        </div>
                      </TabsContent>
                      <TabsContent value="step03-01">
                        <div className="component-group">
                          <div className="from-group">
                            <div className="w-full relative">
                              <div className="pagination-wrapper">
                                <div className="pagination-container">
                                  <div className="pagination-style">
                                    <span className="pagination-text text-white">
                                      <span className="opacity-100">
                                        {currentKioskTenpayPage}
                                      </span>
                                      <span className="opacity-50">
                                        / {totalKioskTenpayPages}
                                      </span>
                                    </span>
                                  </div>
                                  <span className="slide-text-style">
                                    {
                                      kioskTenpayTexts[
                                        currentKioskTenpayPage - 1
                                      ]
                                    }
                                  </span>
                                </div>
                              </div>
                              <Carousel
                                className="w-full relative"
                                setApi={setKioskTenpayCarousel}
                                opts={{
                                  loop: false,
                                }}
                              >
                                <CarouselContent className="w-full mx-0">
                                  {[...Array(10)].map((_, index) => (
                                    <CarouselItem
                                      key={index}
                                      className="basis-full pl-0 pr-0"
                                    >
                                      <div className="p-0 w-full">
                                        <Card className="w-full rounded-none bg-card text-card-foreground shadow">
                                          <CardContent className="p-0 w-full">
                                            <div className="manual-image">
                                              <img
                                                src={
                                                  slideImages.pc.slide_01_03[
                                                    index
                                                  ]
                                                }
                                                alt=""
                                                className="w-full h-full object-cover hidden md:block"
                                              />
                                              <img
                                                src={
                                                  slideImages.mo.slide_01_03[
                                                    index
                                                  ]
                                                }
                                                alt=""
                                                className="w-full h-full object-cover block md:hidden"
                                              />
                                            </div>
                                          </CardContent>
                                        </Card>
                                      </div>
                                    </CarouselItem>
                                  ))}
                                </CarouselContent>
                                <CarouselPrevious
                                  className="absolute left-2 z-10"
                                  style={{
                                    width: "40px",
                                    height: "40px",
                                    border: "1px solid #212529",
                                    backgroundColor: "#ffffff",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                  }}
                                />
                                <CarouselNext
                                  className="absolute right-2 z-10"
                                  style={{
                                    width: "40px",
                                    height: "40px",
                                    border: "1px solid #212529",
                                    backgroundColor: "#ffffff",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                  }}
                                />
                              </Carousel>
                            </div>
                          </div>
                        </div>
                      </TabsContent>
                      <TabsContent value="step04-01">
                        <div className="component-group">
                          <div className="from-group">
                            <div className="w-full relative">
                              <div className="pagination-wrapper">
                                <div className="pagination-container">
                                  <div className="pagination-style">
                                    <span className="pagination-text text-white">
                                      <span className="opacity-100">
                                        {currentKioskAlipayPage}
                                      </span>
                                      <span className="opacity-50">
                                        / {totalKioskAlipayPages}
                                      </span>
                                    </span>
                                  </div>
                                  <span className="slide-text-style">
                                    {
                                      kioskAlipayTexts[
                                        currentKioskAlipayPage - 1
                                      ]
                                    }
                                  </span>
                                </div>
                              </div>
                              <Carousel
                                className="w-full relative"
                                setApi={setKioskAlipayCarousel}
                                opts={{
                                  loop: false,
                                }}
                              >
                                <CarouselContent className="w-full mx-0">
                                  {[...Array(9)].map((_, index) => (
                                    <CarouselItem
                                      key={index}
                                      className="basis-full pl-0 pr-0"
                                    >
                                      <div className="p-0 w-full">
                                        <Card className="w-full rounded-none bg-card text-card-foreground shadow">
                                          <CardContent className="p-0 w-full">
                                            <div className="manual-image">
                                              <img
                                                src={
                                                  slideImages.pc.slide_01_04[
                                                    index
                                                  ]
                                                }
                                                alt=""
                                                className="w-full h-full object-cover hidden md:block"
                                              />
                                              <img
                                                src={
                                                  slideImages.mo.slide_01_04[
                                                    index
                                                  ]
                                                }
                                                alt=""
                                                className="w-full h-full object-cover block md:hidden"
                                              />
                                            </div>
                                          </CardContent>
                                        </Card>
                                      </div>
                                    </CarouselItem>
                                  ))}
                                </CarouselContent>
                                <CarouselPrevious
                                  className="absolute left-2 z-10"
                                  style={{
                                    width: "40px",
                                    height: "40px",
                                    border: "1px solid #212529",
                                    backgroundColor: "#ffffff",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                  }}
                                />
                                <CarouselNext
                                  className="absolute right-2 z-10"
                                  style={{
                                    width: "40px",
                                    height: "40px",
                                    border: "1px solid #212529",
                                    backgroundColor: "#ffffff",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                  }}
                                />
                              </Carousel>
                            </div>
                          </div>
                        </div>
                      </TabsContent>
                      <TabsContent value="step05-01">
                        <div className="component-group">
                          <div className="from-group">
                            <div className="w-full relative">
                              <div className="pagination-wrapper">
                                <div className="pagination-container">
                                  <div className="pagination-style">
                                    <span className="pagination-text text-white">
                                      <span className="opacity-100">
                                        {currentKioskCreditCardPage}
                                      </span>
                                      <span className="opacity-50">
                                        / {totalKioskCreditCardPages}
                                      </span>
                                    </span>
                                  </div>
                                  <span className="slide-text-style">
                                    {
                                      kioskCreditCardTexts[
                                        currentKioskCreditCardPage - 1
                                      ]
                                    }
                                  </span>
                                </div>
                              </div>
                              <Carousel
                                className="w-full relative"
                                setApi={setKioskCreditCardCarousel}
                                opts={{
                                  loop: false,
                                }}
                              >
                                <CarouselContent className="w-full mx-0">
                                  {[...Array(9)].map((_, index) => (
                                    <CarouselItem
                                      key={index}
                                      className="basis-full pl-0 pr-0"
                                    >
                                      <div className="p-0 w-full">
                                        <Card className="w-full rounded-none bg-card text-card-foreground shadow">
                                          <CardContent className="p-0 w-full">
                                            <div className="manual-image">
                                              <img
                                                src={
                                                  slideImages.pc.slide_01_05[
                                                    index
                                                  ]
                                                }
                                                alt=""
                                                className="w-full h-full object-cover hidden md:block"
                                              />
                                              <img
                                                src={
                                                  slideImages.mo.slide_01_05[
                                                    index
                                                  ]
                                                }
                                                alt=""
                                                className="w-full h-full object-cover block md:hidden"
                                              />
                                            </div>
                                          </CardContent>
                                        </Card>
                                      </div>
                                    </CarouselItem>
                                  ))}
                                </CarouselContent>
                                <CarouselPrevious
                                  className="absolute left-2 z-10"
                                  style={{
                                    width: "40px",
                                    height: "40px",
                                    border: "1px solid #212529",
                                    backgroundColor: "#ffffff",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                  }}
                                />
                                <CarouselNext
                                  className="absolute right-2 z-10"
                                  style={{
                                    width: "40px",
                                    height: "40px",
                                    border: "1px solid #212529",
                                    backgroundColor: "#ffffff",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                  }}
                                />
                              </Carousel>
                            </div>
                          </div>
                        </div>
                      </TabsContent>
                    </Tabs>
                  </div>
                </div>
              </section>
              <section>
                <div className="info-bx no-scroll border-none">
                  <p className="info-txt point-txt">장비 오류 시</p>
                  <ul className="info-list">
                    <li className="info-item dot">
                      전원 연결선 : 장비 뒷부분 연결 단자 확인해 주세요.
                    </li>
                  </ul>
                </div>
              </section>
            </TabsContent>
            <TabsContent value="step02">
              <section>
                <div className="manual-content">
                  <div className="title-wrap">
                    <p className="tit f40-700-130">다우데이타</p>
                  </div>
                  <div className="cont-wrap border">
                    <Tabs
                      defaultValue="step01-02"
                      className="tab-wrap type04"
                      onValueChange={handleTabChange}
                    >
                      <TabsList>
                        <TabsTrigger value="step01-02">
                          물품 사후환급 발행
                        </TabsTrigger>
                        <TabsTrigger value="step02-02">
                          물품 즉시환급 발행
                        </TabsTrigger>
                        <TabsTrigger value="step03-02">
                          숙박 사후환급 발행
                        </TabsTrigger>
                        {/* <TabsTrigger value="step04-02">숙박 즉시환급 발행</TabsTrigger> */}
                        <TabsTrigger value="step05-02">환급 취소</TabsTrigger>
                      </TabsList>
                      <TabsContent value="step01-02">
                        <div className="component-group">
                          <div className="from-group">
                            <div className="w-full relative">
                              <div className="pagination-wrapper">
                                <div className="pagination-container">
                                  <div className="pagination-style">
                                    <span className="pagination-text text-white">
                                      <span className="opacity-100">
                                        {currentTerminalReceiptPage}
                                      </span>
                                      <span className="opacity-50">
                                        / {totalTerminalReceiptPages}
                                      </span>
                                    </span>
                                  </div>
                                  <span className="slide-text-style">
                                    {
                                      terminalReceiptTexts[
                                        currentTerminalReceiptPage - 1
                                      ]
                                    }
                                  </span>
                                </div>
                              </div>
                              <Carousel
                                className="w-full relative"
                                setApi={setTerminalReceiptCarousel}
                                opts={{
                                  loop: false,
                                }}
                              >
                                <CarouselContent className="w-full mx-0">
                                  {[...Array(6)].map((_, index) => (
                                    <CarouselItem
                                      key={index}
                                      className="basis-full pl-0 pr-0"
                                    >
                                      <div className="p-0 w-full">
                                        <Card className="w-full rounded-none bg-card text-card-foreground shadow">
                                          <CardContent className="p-0 w-full">
                                            <div className="manual-image">
                                              <img
                                                src={
                                                  slideImages.pc.slide_02_01[
                                                    index
                                                  ]
                                                }
                                                alt=""
                                                className="w-full h-full object-cover hidden md:block"
                                              />
                                              <img
                                                src={
                                                  slideImages.mo.slide_02_01[
                                                    index
                                                  ]
                                                }
                                                alt=""
                                                className="w-full h-full object-cover block md:hidden"
                                              />
                                            </div>
                                          </CardContent>
                                        </Card>
                                      </div>
                                    </CarouselItem>
                                  ))}
                                </CarouselContent>
                                <CarouselPrevious
                                  className="absolute left-2 z-10"
                                  style={{
                                    width: "40px",
                                    height: "40px",
                                    border: "1px solid #212529",
                                    backgroundColor: "#ffffff",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                  }}
                                />
                                <CarouselNext
                                  className="absolute right-2 z-10"
                                  style={{
                                    width: "40px",
                                    height: "40px",
                                    border: "1px solid #212529",
                                    backgroundColor: "#ffffff",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                  }}
                                />
                              </Carousel>
                            </div>
                          </div>
                        </div>
                      </TabsContent>
                      <TabsContent value="step02-02">
                        <div className="component-group">
                          <div className="from-group">
                            <div className="w-full relative">
                              <div className="pagination-wrapper">
                                <div className="pagination-container">
                                  <div className="pagination-style">
                                    <span className="pagination-text text-white">
                                      <span className="opacity-100">
                                        {currentTerminalCashPage}
                                      </span>
                                      <span className="opacity-50">
                                        / {totalTerminalCashPages}
                                      </span>
                                    </span>
                                  </div>
                                  <span className="slide-text-style">
                                    {
                                      terminalCashTexts[
                                        currentTerminalCashPage - 1
                                      ]
                                    }
                                  </span>
                                </div>
                              </div>
                              <Carousel
                                className="w-full relative"
                                setApi={setTerminalCashCarousel}
                                opts={{
                                  loop: false,
                                }}
                              >
                                <CarouselContent className="w-full mx-0">
                                  {[...Array(7)].map((_, index) => (
                                    <CarouselItem
                                      key={index}
                                      className="basis-full pl-0 pr-0"
                                    >
                                      <div className="p-0 w-full">
                                        <Card className="w-full rounded-none bg-card text-card-foreground shadow">
                                          <CardContent className="p-0 w-full">
                                            <div className="manual-image">
                                              <img
                                                src={
                                                  slideImages.pc.slide_02_02[
                                                    index
                                                  ]
                                                }
                                                alt=""
                                                className="w-full h-full object-cover hidden md:block"
                                              />
                                              <img
                                                src={
                                                  slideImages.mo.slide_02_02[
                                                    index
                                                  ]
                                                }
                                                alt=""
                                                className="w-full h-full object-cover block md:hidden"
                                              />
                                            </div>
                                          </CardContent>
                                        </Card>
                                      </div>
                                    </CarouselItem>
                                  ))}
                                </CarouselContent>
                                <CarouselPrevious
                                  className="absolute left-2 z-10"
                                  style={{
                                    width: "40px",
                                    height: "40px",
                                    border: "1px solid #212529",
                                    backgroundColor: "#ffffff",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                  }}
                                />
                                <CarouselNext
                                  className="absolute right-2 z-10"
                                  style={{
                                    width: "40px",
                                    height: "40px",
                                    border: "1px solid #212529",
                                    backgroundColor: "#ffffff",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                  }}
                                />
                              </Carousel>
                            </div>
                          </div>
                        </div>
                      </TabsContent>
                      <TabsContent value="step03-02">
                        <div className="component-group">
                          <div className="from-group">
                            <div className="w-full relative">
                              <div className="pagination-wrapper">
                                <div className="pagination-container">
                                  <div className="pagination-style">
                                    <span className="pagination-text text-white">
                                      <span className="opacity-100">
                                        {currentTerminalTenpayPage}
                                      </span>
                                      <span className="opacity-50">
                                        / {totalTerminalTenpayPages}
                                      </span>
                                    </span>
                                  </div>
                                  <span className="slide-text-style">
                                    {
                                      terminalTenpayTexts[
                                        currentTerminalTenpayPage - 1
                                      ]
                                    }
                                  </span>
                                </div>
                              </div>
                              <Carousel
                                className="w-full relative"
                                setApi={setTerminalTenpayCarousel}
                                opts={{
                                  loop: false,
                                }}
                              >
                                <CarouselContent className="w-full mx-0">
                                  {[...Array(7)].map((_, index) => (
                                    <CarouselItem
                                      key={index}
                                      className="basis-full pl-0 pr-0"
                                    >
                                      <div className="p-0 w-full">
                                        <Card className="w-full rounded-none bg-card text-card-foreground shadow">
                                          <CardContent className="p-0 w-full">
                                            <div className="manual-image">
                                              <img
                                                src={
                                                  slideImages.pc.slide_02_03[
                                                    index
                                                  ]
                                                }
                                                alt=""
                                                className="w-full h-full object-cover hidden md:block"
                                              />
                                              <img
                                                src={
                                                  slideImages.mo.slide_02_03[
                                                    index
                                                  ]
                                                }
                                                alt=""
                                                className="w-full h-full object-cover block md:hidden"
                                              />
                                            </div>
                                          </CardContent>
                                        </Card>
                                      </div>
                                    </CarouselItem>
                                  ))}
                                </CarouselContent>
                                <CarouselPrevious
                                  className="absolute left-2 z-10"
                                  style={{
                                    width: "40px",
                                    height: "40px",
                                    border: "1px solid #212529",
                                    backgroundColor: "#ffffff",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                  }}
                                />
                                <CarouselNext
                                  className="absolute right-2 z-10"
                                  style={{
                                    width: "40px",
                                    height: "40px",
                                    border: "1px solid #212529",
                                    backgroundColor: "#ffffff",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                  }}
                                />
                              </Carousel>
                            </div>
                          </div>
                        </div>
                      </TabsContent>
                      {/* <TabsContent value="step04-02">
                      <div className="component-group">
                        <div className='from-group'>
                          <div className="w-full relative">
                            <div className="pagination-wrapper">
                              <div className="pagination-container">
                                <div className="pagination-style">
                              <span className="pagination-text text-white">
                                <span className="opacity-100">{currentTerminalAlipayPage}</span>
                                <span className="opacity-50">/ {totalTerminalAlipayPages}</span>
                              </span>
                                </div>
                                <span className="slide-text-style">
                                  {terminalAlipayTexts[currentTerminalAlipayPage - 1]}
                                </span>
                              </div>
                            </div>
                            <Carousel
                              className="w-full relative"
                              setApi={setTerminalAlipayCarousel}
                              opts={{
                                loop: false,
                              }}
                            >
                              <CarouselContent className="w-full mx-0">
                                {[...Array(8)].map((_, index) => (
                                  <CarouselItem key={index} className="basis-full pl-0 pr-0">
                                    <div className="p-0 w-full">
                                      <Card className="w-full rounded-none bg-card text-card-foreground shadow">
                                        <CardContent className="p-0 w-full">
                                          <div className="manual-image">
                                            <img
                                              src={slideImages.pc.slide_02_04[index]}
                                              alt=""
                                              className="w-full h-full object-cover hidden md:block"
                                            />
                                            <img
                                              src={slideImages.mo.slide_02_04[index]}
                                              alt=""
                                              className="w-full h-full object-cover block md:hidden"
                                            />
                                          </div>
                                        </CardContent>
                                      </Card>
                                    </div>
                                  </CarouselItem>
                                ))}
                              </CarouselContent>
                              <CarouselPrevious
                                className="absolute left-2 z-10"
                                style={{
                                  width: '40px',
                                  height: '40px',
                                  border: '1px solid #212529',
                                  backgroundColor: '#ffffff',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center'
                                }}
                              />
                              <CarouselNext
                                className="absolute right-2 z-10"
                                style={{
                                  width: '40px',
                                  height: '40px',
                                  border: '1px solid #212529',
                                  backgroundColor: '#ffffff',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center'
                                }}
                              />
                            </Carousel>
                          </div>
                        </div>
                      </div>
                    </TabsContent> */}
                      <TabsContent value="step05-02">
                        <div className="component-group">
                          <div className="from-group">
                            <div className="w-full relative">
                              <div className="pagination-wrapper">
                                <div className="pagination-container">
                                  <div className="pagination-style">
                                    <span className="pagination-text text-white">
                                      <span className="opacity-100">
                                        {currentTerminalCancelPage}
                                      </span>
                                      <span className="opacity-50">
                                        / {totalTerminalCancelPages}
                                      </span>
                                    </span>
                                  </div>
                                  <span className="slide-text-style">
                                    {
                                      terminalCancelTexts[
                                        currentTerminalCancelPage - 1
                                      ]
                                    }
                                  </span>
                                </div>
                              </div>
                              <Carousel
                                className="w-full relative"
                                setApi={setTerminalCancelCarousel}
                                opts={{
                                  loop: false,
                                }}
                              >
                                <CarouselContent className="w-full mx-0">
                                  {[...Array(6)].map((_, index) => (
                                    <CarouselItem
                                      key={index}
                                      className="basis-full pl-0 pr-0"
                                    >
                                      <div className="p-0 w-full">
                                        <Card className="w-full rounded-none bg-card text-card-foreground shadow">
                                          <CardContent className="p-0 w-full">
                                            <div className="manual-image">
                                              <img
                                                src={
                                                  slideImages.pc.slide_02_05[
                                                    index
                                                  ]
                                                }
                                                alt=""
                                                className="w-full h-full object-cover hidden md:block"
                                              />
                                              <img
                                                src={
                                                  slideImages.mo.slide_02_05[
                                                    index
                                                  ]
                                                }
                                                alt=""
                                                className="w-full h-full object-cover block md:hidden"
                                              />
                                            </div>
                                          </CardContent>
                                        </Card>
                                      </div>
                                    </CarouselItem>
                                  ))}
                                </CarouselContent>
                                <CarouselPrevious
                                  className="absolute left-2 z-10"
                                  style={{
                                    width: "40px",
                                    height: "40px",
                                    border: "1px solid #212529",
                                    backgroundColor: "#ffffff",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                  }}
                                />
                                <CarouselNext
                                  className="absolute right-2 z-10"
                                  style={{
                                    width: "40px",
                                    height: "40px",
                                    border: "1px solid #212529",
                                    backgroundColor: "#ffffff",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                  }}
                                />
                              </Carousel>
                            </div>
                          </div>
                        </div>
                      </TabsContent>
                    </Tabs>
                  </div>
                </div>
              </section>
              <section>
                <div className="info-bx no-scroll border-none">
                  <p className="info-txt point-txt">장비 오류 시</p>
                  <ul className="info-list">
                    <li className="info-item dot">
                      전원 연결선 : 장비 뒷부분 연결 단자 확인해 주세요.
                    </li>
                    <li className="info-item dot">
                      어댑터 연결선 : 어댑터 연결 단자가 빠져있는지 확인해
                      주세요.
                    </li>
                    <li className="info-item dot">
                      전원 버튼 : 전원 버튼이 켜져있는지 확인해 주세요.
                    </li>
                  </ul>
                </div>
              </section>
            </TabsContent>
            <TabsContent value="step03">
              <section>
                <div className="manual-content">
                  <div className="title-wrap">
                    <p className="tit f40-700-130">
                      부가가치세 환급표
                    </p>
                  </div>
                  <div className="cont-wrap">
                    <Accordion
                      type="single"
                      collapsible
                      className="accordion-wrap"
                    >
                      <AccordionItem value="item-1">
                        <AccordionTrigger>
                          <p className="tit-num">15,000원 ~ 249,999원</p>
                        </AccordionTrigger>
                        <AccordionContent>
                          <table className="refund-table">
                            <thead>
                              <tr>
                                <th scope="col">구입액(원)</th>
                                <th scope="col" style={{ width: "180px" }}>
                                  환급액(원)
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              {refundData.map((row, idx) =>
                                row.separator ? (
                                  <tr key={`sep-${idx}`} className="separator">
                                    <td colSpan={2}></td>
                                  </tr>
                                ) : (
                                  <tr key={idx}>
                                    <td>{row.range}</td>
                                    <td className="amount">{row.amount}</td>
                                  </tr>
                                )
                              )}
                            </tbody>
                          </table>
                        </AccordionContent>
                      </AccordionItem>
                      <AccordionItem value="item-2">
                        <AccordionTrigger>
                          <p className="tit-num">250,000원 ~ 499,999원</p>
                        </AccordionTrigger>
                        <AccordionContent>
                          <table className="refund-table">
                            <thead>
                              <tr>
                                <th scope="col">구입액(원)</th>
                                <th scope="col" style={{ width: "180px" }}>
                                  환급액(원)
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              {refundData1.map((row, idx) =>
                                row.separator ? (
                                  <tr key={`sep-${idx}`} className="separator">
                                    <td colSpan={2}></td>
                                  </tr>
                                ) : (
                                  <tr key={idx}>
                                    <td>{row.range}</td>
                                    <td className="amount">{row.amount}</td>
                                  </tr>
                                )
                              )}
                            </tbody>
                          </table>
                        </AccordionContent>
                      </AccordionItem>
                      <AccordionItem value="item-3">
                        <AccordionTrigger>
                          <p className="tit-num">500,000원 ~ 999,999원</p>
                        </AccordionTrigger>
                        <AccordionContent>
                          <table className="refund-table">
                            <thead>
                              <tr>
                                <th scope="col">구입액(원)</th>
                                <th scope="col" style={{ width: "180px" }}>
                                  환급액(원)
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              {refundData2.map((row, idx) =>
                                row.separator ? (
                                  <tr key={`sep-${idx}`} className="separator">
                                    <td colSpan={2}></td>
                                  </tr>
                                ) : (
                                  <tr key={idx}>
                                    <td>{row.range}</td>
                                    <td className="amount">{row.amount}</td>
                                  </tr>
                                )
                              )}
                            </tbody>
                          </table>
                        </AccordionContent>
                      </AccordionItem>
                      <AccordionItem value="item-4">
                        <AccordionTrigger>
                          <p className="tit-num">1,000,000원 ~ 1,999,999원</p>
                        </AccordionTrigger>
                        <AccordionContent>
                          <table className="refund-table">
                            <thead>
                              <tr>
                                <th scope="col">구입액(원)</th>
                                <th scope="col" style={{ width: "180px" }}>
                                  환급액(원)
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              {refundData3.map((row, idx) =>
                                row.separator ? (
                                  <tr key={`sep-${idx}`} className="separator">
                                    <td colSpan={2}></td>
                                  </tr>
                                ) : (
                                  <tr key={idx}>
                                    <td>{row.range}</td>
                                    <td className="amount">{row.amount}</td>
                                  </tr>
                                )
                              )}
                            </tbody>
                          </table>
                        </AccordionContent>
                      </AccordionItem>
                      <AccordionItem value="item-5">
                        <AccordionTrigger>
                          <p className="tit-num">2,000,000원 ~ 2,999,999원</p>
                        </AccordionTrigger>
                        <AccordionContent>
                          <table className="refund-table">
                            <thead>
                              <tr>
                                <th scope="col">구입액(원)</th>
                                <th scope="col" style={{ width: "180px" }}>
                                  환급액(원)
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              {refundData4.map((row, idx) =>
                                row.separator ? (
                                  <tr key={`sep-${idx}`} className="separator">
                                    <td colSpan={2}></td>
                                  </tr>
                                ) : (
                                  <tr key={idx}>
                                    <td>{row.range}</td>
                                    <td className="amount">{row.amount}</td>
                                  </tr>
                                )
                              )}
                            </tbody>
                          </table>
                        </AccordionContent>
                      </AccordionItem>
                      <AccordionItem value="item-6">
                        <AccordionTrigger>
                          <p className="tit-num">3,000,000원 ~ 3,999,999원</p>
                        </AccordionTrigger>
                        <AccordionContent>
                          <table className="refund-table">
                            <thead>
                              <tr>
                                <th scope="col">구입액(원)</th>
                                <th scope="col" style={{ width: "180px" }}>
                                  환급액(원)
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              {refundData5.map((row, idx) =>
                                row.separator ? (
                                  <tr key={`sep-${idx}`} className="separator">
                                    <td colSpan={2}></td>
                                  </tr>
                                ) : (
                                  <tr key={idx}>
                                    <td>{row.range}</td>
                                    <td className="amount">{row.amount}</td>
                                  </tr>
                                )
                              )}
                            </tbody>
                          </table>
                        </AccordionContent>
                      </AccordionItem>
                      <AccordionItem value="item-7">
                        <AccordionTrigger>
                          <p className="tit-num">4,000,000원 ~ 4,999,999원</p>
                        </AccordionTrigger>
                        <AccordionContent>
                          <table className="refund-table">
                            <thead>
                              <tr>
                                <th scope="col">구입액(원)</th>
                                <th scope="col" style={{ width: "180px" }}>
                                  환급액(원)
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              {refundData6.map((row, idx) =>
                                row.separator ? (
                                  <tr key={`sep-${idx}`} className="separator">
                                    <td colSpan={2}></td>
                                  </tr>
                                ) : (
                                  <tr key={idx}>
                                    <td>{row.range}</td>
                                    <td className="amount">{row.amount}</td>
                                  </tr>
                                )
                              )}
                            </tbody>
                          </table>
                        </AccordionContent>
                      </AccordionItem>
                      <AccordionItem value="item-8">
                        <AccordionTrigger>
                          <p className="tit-num">5,000,000원 ~ 5,999,999원</p>
                        </AccordionTrigger>
                        <AccordionContent>
                          <table className="refund-table">
                            <thead>
                              <tr>
                                <th scope="col">구입액(원)</th>
                                <th scope="col" style={{ width: "180px" }}>
                                  환급액(원)
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              {refundData7.map((row, idx) =>
                                row.separator ? (
                                  <tr key={`sep-${idx}`} className="separator">
                                    <td colSpan={2}></td>
                                  </tr>
                                ) : (
                                  <tr key={idx}>
                                    <td>{row.range}</td>
                                    <td className="amount">{row.amount}</td>
                                  </tr>
                                )
                              )}
                            </tbody>
                          </table>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </div>
                </div>
              </section>
              <section>
                <div className="info-bx no-scroll border-none">
                  <p className="info-txt point-txt">
                    부가가치세 환급표 유의사항
                  </p>
                  <ul className="info-list">
                    <li className="info-item dot">
                      환급전표에 국적, 여권번호, 성명이 기록되어 있어야
                      환급가능.
                    </li>
                    <li className="info-item dot">
                      6,000,000원 이상일 경우 환급액(원)은 판매금액 X 0.0818 임
                      (단, 계산시 소숫점 이하는 절사)
                    </li>
                    <li className="info-item dot">
                      TAX FREE 환급 안내문 신청 및 문의 ㈜큐브리펀드 전화 :
                      02-6925-2033
                    </li>
                  </ul>
                </div>
              </section>
            </TabsContent>
          </Tabs>
        </section>
      </div>
      <AuthComponent />
    </>
  );
};

export default ManualPage;
