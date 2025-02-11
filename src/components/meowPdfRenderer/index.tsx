'use client';
import { getPathWithBase } from "@/helpers";
import { useSearchParams } from "next/navigation";
import { useMemo } from "react";

// https://sit-cn.hero-ee.com:8002/oss/hero-iot-oss-sit/salePackage/pdfs/test1007001.pdf
// const u = 'https://www.hero-ee.com/oss/hero-iot-oss-prod/salePackage/pdfs/Hithium_280Ah%E7%94%B5%E8%8A%AF%E6%8A%80%E6%9C%AF%E8%A7%84%E6%A0%BC%E4%B9%A6.pdf';
// const u0 = getPathWithBase(`/mozillaPdfjs/web/viewer.html?file=https://sit-cn.hero-ee.com:8002/oss/hero-iot-oss-pre/salePackage/pdfs/HiHIUM%20HeroEE%201%20Product%20Brochure_English_6.27.pdf`)
// const u1 = getPathWithBase(`/mozillaPdfjs/web/viewer.html?file=https://sit-cn.hero-ee.com:8002/oss/hero-iot-oss-sit/salePackage/pdfs/HiHIUM%20HeroEE%201%20Product%20Brochure_English_6.27.pdf`)
// const u1 = '/sales-package/proxy/pdf.js/web/viewer.html?file=https://sit-cn.hero-ee.com:8002/oss/hero-iot-oss-pre/salePackage/pdfs/HiHIUM%20HeroEE%201%20Product%20Brochure_English_6.27.pdf';
export default function Preview() {
  
  const searchParams = useSearchParams();
  const pdfUrlStr = searchParams.get('pdfUrl')||'';

  const pdfLink = useMemo(() => {

    if (!pdfUrlStr) {
      return ''
    }
    return getPathWithBase(`/mozillaPdfjs/web/viewer.html?file=${pdfUrlStr}`)
  }, [pdfUrlStr])
    
  if (!pdfLink) {
    return null;
  }
  return (<div className="w-full min-h-[100vh]">
    <iframe src={pdfLink} width="100%" height="100%" style={{
      width: '100vw',
      height: '100vh'
    }}></iframe>
  </div>)
}
