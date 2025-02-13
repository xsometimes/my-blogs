import Link from "next/link";
import './index.scss';

const menuList = [
  {
    title: '首页',
    value: 'dashboard',
    path: '/dashboard'
  },
  {
    title: '学习',
    value: 'study',
    path: '/article/list'
  },
  {
    title: 'cute',
    value:'cute',
    path: '/case/list'
  }
]

export default function MeowHeader() {
  return <header className="meow-header">
    {/* <div className="w-[80px]">logo</div> */}
    <nav>
      <ul>
        {
          menuList.map((item) => {
            return <li key={item.value} className={`meow-header-item text-[16px] active`}>
              <Link href={item.path}>{item.value}</Link>
            </li>
          })
        }
      </ul>
    </nav>
      
  </header>;
}