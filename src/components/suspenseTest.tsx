
import { wait } from "@/helpers/wait";
import { Suspense } from "react";

const MyComponent = async () => {
  const data = await wait(100, { name: "zidan" });
  return <p>{data.name}</p>;
};

export const dynamic = "force-dynamic";

export default async function SuspenseTest() {

  

  return (
    <>
      <p>网页静态信息</p>
      <Suspense fallback={"数据正在加载，请稍等..."}>
        <MyComponent />
      </Suspense>
    </>
 );
  }
