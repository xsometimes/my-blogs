'use client';
import commonmark, { HtmlRenderer, Parser } from 'commonmark';
import { useEffect, useRef, useState } from 'react';

interface Props {
  url?: string;
}
export default function MeowMdRenderer({}: Props) {


  const readerRef = useRef<Parser>(null);
  const writerRef = useRef<HtmlRenderer>(null);

  const [renderContent, setRenderContent] = useState<string>('');

  useEffect(() => {
    if (!readerRef.current) {
      readerRef.current = new Parser();
      writerRef.current = new HtmlRenderer();
      const parsed = readerRef.current.parse("Hello *world*");
      const rendered = writerRef.current.render(parsed);
      setRenderContent(rendered);
    }
  }, []);

  return (<div dangerouslySetInnerHTML={ {__html: renderContent} }></div>);
}
