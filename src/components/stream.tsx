'use client';


export default function StreamTest() {

  const onBtnClick = async () => {
    const decoder = new TextDecoder();
    const res = await fetch('/api/atmos/citys');
    const reader = res.body?.getReader();
     let done = false;
     while (!done) {
       const { done: doneReading, value } = await reader?.read();
       done = doneReading;
      //  const data = JSON.parse(decoder.decode(value));
       console.log(value);
     }
  }

  return (
    <div>
      <p onClick={onBtnClick}>stream</p>
    </div>
  );
}