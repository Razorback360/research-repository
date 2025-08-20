import React from "react";
import { GetServerSideProps } from "next";
import Markdown from "react-markdown";
import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm';
import { cmsFetcher } from "@app/utils/fetcher";
import { AboutProps, RichTextBlock, MediaBlock } from "../../interfaces";
import { env } from "@app/utils/env"
import { useTranslations } from "next-intl";


const AboutUs = ({ aboutData, error }: AboutProps) => {  // Function to render blocks based on their type
  const t = useTranslations();

  const renderBlock = (block: RichTextBlock | MediaBlock) => {
    const cmsUrl = env.NEXT_PUBLIC_CMS_API_URL || 'http://127.0.0.1:1337';
    
    if (block.__component === "shared.rich-text") {
      return (
        <div key={block.id} className="my-6">
          <Markdown 
            rehypePlugins={[rehypeRaw]} 
            remarkPlugins={[remarkGfm]}
            components={{
              h1: ({ node, ...props }) => <h1 className="text-2xl font-bold mb-3" {...props} />,
              h2: ({ node, ...props }) => <h2 className="text-xl font-semibold mb-3" {...props} />,
              ul: ({ node, ...props }) => <ul className="list-disc list-inside space-y-1" {...props} />,
            }}
          >
            {(block as RichTextBlock).body}
          </Markdown>
        </div>
      );
    } else if (block.__component === "shared.media") {      const mediaBlock = block as MediaBlock;
      if (!mediaBlock.file) return null;
      
      const imageUrl = `${cmsUrl}${mediaBlock.file.url}`;
      const altText = mediaBlock.file.alternativeText || mediaBlock.file.name || 'Image';
      const caption = mediaBlock.file.caption;
      
      return (
        <figure key={block.id} className="my-8 flex flex-col items-center">
          <img 
            src={imageUrl} 
            alt={altText} 
            className="max-w-full rounded-lg shadow-md" 
            style={{ maxHeight: '600px' }}
          />
          {caption && (
            <figcaption className="text-sm text-gray-600 text-center mt-2">
              {caption}
            </figcaption>
          )}
        </figure>
      );
    }
    return null;
  };

  return (
    <div className="container mx-auto p-4 h-full">
      <h1 className="text-3xl font-semibold text-center mb-6 text-gray-800">
        {t("about")}
      </h1>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          <p>{error}</p>
        </div>
      )}
      
      <div className="space-y-6 text-gray-700 text-lg">
        <Markdown 
          rehypePlugins={[rehypeRaw]} 
          remarkPlugins={[remarkGfm]} 
          components={{
            h1: ({ node, ...props }) => <h1 className="text-2xl font-bold mb-3" {...props} />,
            h2: ({ node, ...props }) => <h2 className="text-xl font-semibold mb-3" {...props} />,
            ul: ({ node, ...props }) => <ul className="list-disc list-inside space-y-1" {...props} />,
          }}
        >
          {aboutData.aboutUs}
        </Markdown>
        
        {aboutData.blocks && aboutData.blocks.map((block: RichTextBlock | MediaBlock) => renderBlock(block))}
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ res, locale }) => {
  // Set cache control headers
  res.setHeader(
    'Cache-Control',
    'public, s-maxage=3600, stale-while-revalidate=86400'
  );

  try {
    const response = await cmsFetcher.get('/api/about?populate[blocks][populate]=*&locale=' + locale);
    
    return {
      props: {
        aboutData: response.data.data,
      },
    };
  } catch (error) {
    console.error("Error fetching about content:", error);
    
    // Fallback to static data if CMS fetch fails
    return {
      props: {
        aboutData: {
          id: 0,
          documentId: "",
          aboutUs: "# About Us\n\nInformation about SRDRI is currently unavailable. Please check back later.",
          blocks: []
        },
        error: "Failed to load about content from CMS. Showing limited content.",
      },
    };
  }
};

export default AboutUs;
