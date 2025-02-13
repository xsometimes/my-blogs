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

declare interface ITag {
  value: string;
  key: string;
}

declare interface IArticle {
  id: string
  title: string;
  createTime: number;
  updateTime: number;
  url: string;
  size: number | bigint,
  fileType: string;
  tags: string[];
}

