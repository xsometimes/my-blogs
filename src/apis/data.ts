export interface INav {
  title: string;
  value: string;
  path?: string;
  children?: INav[];
}
export const navList:INav[] = [
  {
    title: '学习',
    value: 'study',
    path:'/study',
  }
];