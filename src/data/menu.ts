export interface MenuItem {
  id?: string;
  title: string; // 이 title은 이제 다국어 '키'입니다.
  path?: string;
  type?: string;
  active?: boolean;
  children?: MenuItem[];
}

export const MenuItems:MenuItem[] = [
  {
    title: 'menu.home', // 다국어 키로 변경
    path: '/',
    // icon: Home,
    type: 'link',
    active: false,
    children: [],
  },
  {
    id: 'franchise',
    title: 'menu.franchise', // 다국어 키로 변경
    path: '/franchise',
    // icon: Pencil,
    type: 'sub',
    active: false,
    children: [
      {
        id: 'franchise-locations',
        path: `/[lang]/franchise/locations`,
        title: 'menu.franchiseLocations', // 다국어 키로 변경
        type: 'link',
      },
      {
        id: 'franchise-process',
        path: `/[lang]/franchise/process`,
        title: 'menu.franchiseProcess', // 다국어 키로 변경
        type: 'link',
      },
      {
        id: 'franchise-notice',
        path: `/[lang]/franchise/notice`,
        title: 'menu.franchiseNotice', // 다국어 키로 변경
        type: 'link',
        children: [
          {
            id: 'franchise-notice-notice-detail',
            path: `/[lang]/franchise/notice/:id`,
            title: 'menu.franchiseNoticeNoticeDetail', // 다국어 키로 변경
            type: 'link',
          },
        ],
      },
      {
        id: 'franchise-supplies',
        path: `/[lang]/franchise/supplies`,
        title: 'menu.franchiseSupplies', // 다국어 키로 변경
        type: 'link',
      },
      {
        id: 'franchise-manual',
        path: `/[lang]/franchise/manual`,
        title: 'menu.franchiseManual', // 다국어 키로 변경
        type: 'link',
      },
    ]
  },
  {
    id: 'traveler',
    title: 'menu.traveler', // 다국어 키로 변경
    path: '/traveler',
    // icon: Pencil,
    type: 'sub',
    active: false,
    children: [
      {
        id: 'traveler-eligibility',
        path: `/[lang]/traveler/refund-eligibility`,
        title: 'menu.travelerEligibility', // 다국어 키로 변경
        type: 'link',
      },
      {
        id: 'traveler-methods',
        path: `/[lang]/traveler/refund-methods`,
        title: 'menu.travelerMethods', // 다국어 키로 변경
        type: 'link',
      },
      {
        id: 'traveler-receipts',
        path: `/[lang]/traveler/announcement`,
        title: 'menu.travelerReceipts', // 다국어 키로 변경
        type: 'link',
      },
      {
        id: 'traveler-apply-refund',
        path: `/[lang]/traveler/apply-refund`,
        title: 'menu.travelerApplyRefund', // 다국어 키로 변경
        type: 'link',
        children: [
          {
            id: 'traveler-apply-refund-select',
            path: `/[lang]/traveler/apply-refund`,
            title: 'menu.travelerApplyRefundSelect', // 다국어 키로 변경
            type: 'link',
          },
          {
            id: 'traveler-apply-refund-apply',
            path: `/[lang]/traveler/apply-refund/refund`,
            title: 'menu.travelerApplyRefundApply', // 다국어 키로 변경
            type: 'link',
          },
        ]
      }
    ]
  },
  {
    id: 'tax-refund',
    title: 'menu.taxRefund', // 다국어 키로 변경
    path: '/tax-refund',
    // icon: Pencil,
    type: 'sub',
    active: false,
    children: [
      {
        id: 'tax-refund-introduction',
        path: `/[lang]/tax-refund/introduction`,
        title: 'menu.taxRefundIntroduction', // 다국어 키로 변경
        type: 'link',
      },
      {
        id: 'tax-refund-features',
        path: `/[lang]/tax-refund/features`,
        title: 'menu.taxRefundFeatures', // 다국어 키로 변경
        type: 'link',
      },
    ]
  },
  {
    id: 'contact',
    title: 'menu.contact', // 다국어 키로 변경
    path: '/contact',
    // icon: Pencil,
    type: 'sub',
    active: false,
    children: [
      {
        id: 'contact-signup-inquiry',
        path: `/[lang]/contact/signup-inquiry`,
        title: 'menu.contactSignupInquiry', // 다국어 키로 변경
        type: 'link',
      },
      {
        id: 'contact-faq',
        path: `/[lang]/contact/faq`,
        title: 'menu.contactFaq', // 다국어 키로 변경
        type: 'link',
      },
    ]
  },
  {
    id: 'company',
    title: 'menu.company', // 다국어 키로 변경
    path: '/company',
    // icon: Pencil,
    type: 'sub',
    active: false,
    children: [
      {
        id: 'company-greeting',
        path: `/[lang]/company/greeting`,
        title: 'menu.companyGreeting', // 다국어 키로 변경
        type: 'link',
      },
      {
        id: 'company-history',
        path: `/[lang]/company/history`,
        title: 'menu.companyHistory', // 다국어 키로 변경
        type: 'link',
      },
      {
        id: 'company-location',
        path: `/[lang]/company/location`,
        title: 'menu.companyLocation', // 다국어 키로 변경
        type: 'link',
      },
      {
        id: 'company-notice',
        path: `/[lang]/company/notice`,
        title: 'menu.companyNotice', // 다국어 키로 변경
        type: 'link',
        children: [
          {
            id: 'company-notice-notice-list',
            path: `/[lang]/company/notice`,
            title: 'menu.companyNoticeNoticeList', // 다국어 키로 변경
            type: 'link',
          },
          {
            id: 'company-notice-notice-defailt',
            path: `/[lang]/company/notice/:id`,
            title: 'menu.companyNoticeNoticeDefault', // 다국어 키로 변경
            type: 'link',
          },
        ]
      },
    ]
  },
  {
    id: 'footer',
    title: 'menu.footer', // 다국어 키로 변경
    path: '/footer',
    type: 'sub',
    // icon: Pencil,
    active: false,
    children: [
      {
        id: 'footer-term-fair-trade',
        path: `/[lang]/footer/fair-trade`,
        title: 'menu.footerTermFairTrade', // 다국어 키로 변경
        type: 'link',
      },
      {
        id: 'footer-ethics-guide',
        path: `/[lang]/footer/ethics-guide`,
        title: 'menu.footerEthicsGuide', // 다국어 키로 변경
        type: 'link',
      },
      // {
      //   id: 'footer-ethics-report',
      //   path: `/[lang]/footer/ethics-report`,
      //   title: 'menu.footerEthicsReport', // 다국어 키로 변경
      //   type: 'link',
      // },
      {
        id: 'footer-sitemap',
        path: `/[lang]/footer/sitemap`,
        title: 'menu.footerSitemap', // 다국어 키로 변경
        type: 'link',
      },
      {
        id: 'footer-term-privacy-policy',
        path: `/[lang]/footer/PRIVACY_POLICY`,
        title: 'menu.footerTermPrivacyPolicy', // 다국어 키로 변경
        type: 'link',
      },
      // {
      //   id: 'footer-term-video-privacy',
      //   path: `/[lang]/footer/term/VIDEO_PRIVACY`,
      //   title: 'menu.footerTermVideoPrivacy', // 다국어 키로 변경
      //   type: 'link',
      // },
      {
        id: 'footer-term-service-terms',
        path: `/[lang]/footer/term/SERVICE_TERMS`,
        title: 'menu.footerTermServiceTerms', // 다국어 키로 변경
        type: 'link',
      },
      {
        id: 'footer-term-legal-notice',
        path: `/[lang]/footer/term/LEGAL_NOTICE`,
        title: 'menu.footerTermLegalNotice', // 다국어 키로 변경
        type: 'link',
      },
      {
        id: 'footer-term-email-reject',
        path: `/[lang]/footer/term/EMAIL_REJECT`,
        title: 'menu.footerTermEmailReject', // 다국어 키로 변경
        type: 'link',
      }
    ]
  }
]