// 'use client';
import type { Metadata, ResolvingMetadata } from 'next'
import MeowMdRenderer from "@/components/meowMdRenderer";
import { Suspense } from 'react';
type Props = {
  params: Promise<{ id: string }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

// 生成所有可能的静态路径
export async function generateStaticParams() {
  const res = await fetch('https://api.example.com/posts');
  const posts = await res.json();
  return posts.map(post => ({
      id: post.id.toString()
  }));
}

// 模拟从 API 获取文章数据
async function getPostData(id) {
  const res = await fetch(`https://api.example.com/posts/${id}`);
  const post = await res.json();
  return post;
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

// MeowMdRenderer 下次改成动态加载
export default function MdPage({ params }) {
  const { id } = params;
  const post = await getPostData(id);
  return (<>
  <p className="text-[32px]">dddd render</p>
  <Suspense fallback={<p>Loading...</p>}>
          <MeowMdRenderer />
        </Suspense>
  </>);
}