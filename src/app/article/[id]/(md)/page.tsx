// 'use client';
import type { Metadata, ResolvingMetadata } from 'next'
import MeowMdRenderer from "@/components/meowMdRenderer";
type Props = {
  params: Promise<{ id: string }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // read route params
  const id = (await params).id
 
  // fetch data
  // const product = await fetch(`https://.../${id}`).then((res) => res.json())
 
  // optionally access and extend (rather than replace) parent metadata
  // const previousImages = (await parent).openGraph?.images || []
 
  return {
    title: `product.title`,
    // openGraph: {
    //   images: ['/some-specific-page-image.jpg', ...previousImages],
    // },
  }
}

// export const metadata = async ({  }) => {
//   // const { id } = params;
//   // const article = articles.find(article => article.id === parseInt(id));
//   // if (!article) {
//   //   return {
//   //     title: '文章未找到',
//   //     description: '未找到对应文章的描述'
//   //   };
//   // }
//   return {
//     title: `article.title`,
//     description: `article.content.slice(0, 150)`
//   };
// };
export default function MdPage() {
  return (<>
  <p className="text-[32px]">dddd render</p>
  <MeowMdRenderer />
  </>);
}