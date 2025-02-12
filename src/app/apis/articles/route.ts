import { Params } from "next/dist/server/request/params";
import { NextRequest, NextResponse } from "next/server";


export async function GET(
  request: NextRequest,
  {
    id,
    tag,
    keyword,
  }: Params
): Promise<NextResponse> {

  try {
    const response = await fetch('url');
    const pdfBytes = await response.arrayBuffer();
    const headers = {
      'content-type': 'application/pdf',
      'cache-control': 'no-cache,no-store,must-revalidate',
      // 'Content-Disposition': 'attachment; filename=downloaded-pdf.pdf'
    };
    return new NextResponse(pdfBytes, { headers });
  } catch (error) {
    console.error('获取在线PDF文件失败', error);
    return NextResponse.json({ error: '获取在线PDF文件失败' }, { status: 500 });
  }
}