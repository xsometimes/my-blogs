/// <reference types="global" />

declare interface Window {
  VConsole: any;
  historyStack: HistoryRecord[];
  pdfjsLib: any;
  h5sdk: any;
  tt: any;
  ttManager: any;
}

declare interface HistoryRecord {
  href: string;
  source: 'APP' | 'H5',
  eventTime: number;
}


declare enum ELocale {
  zh = 'zh_CN',
  en = 'en_US',
}
