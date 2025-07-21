import React from 'react';
import { HiOutlineCalendar, HiOutlineUser, HiOutlineTag, HiOutlineClock } from 'react-icons/hi';
import Markdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm';
import { GetServerSideProps } from "next";
import { cmsFetcher } from '@app/utils/fetcher';
import { ArticleProps } from '@interfaces/pages';
import { RichTextBlock, MediaBlock, QuoteBlock } from '@interfaces/blocks';
import { format } from 'date-fns';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/router';
import { ar, enUS } from 'date-fns/locale';

const BlogPost = ({articleData, error }: ArticleProps) => {
    const cmsUrl = process.env.NEXT_PUBLIC_CMS_API_URL || 'http://127.0.0.1:1337';
    const router = useRouter();
    const t = useTranslations('blog');
    const isRTL = router.locale === 'ar';
    const locale = router.locale === 'ar' ? ar : enUS;
    
    if (!articleData) {
        return <div className="text-center py-20">{t('notFound')}</div>;
    }
    
    // Helper function to estimate reading time
    const calculateReadingTime = (content: string) => {
        const wordsPerMinute = 200;
        const words = content.split(/\s+/).length;
        const minutes = Math.ceil(words / wordsPerMinute);
        return minutes;
    };
    
    // Calculate total reading time from all rich text blocks
    const readingTime = articleData.blocks
        .filter(block => block.__component === 'shared.rich-text')
        .reduce((total, block) => {
            const richTextBlock = block as RichTextBlock;
            return total + calculateReadingTime(richTextBlock.body);
        }, 0);
    
    // Format the publication date with locale
    const formattedDate = articleData.publishedAt 
        ? format(new Date(articleData.publishedAt), 'MMMM d, yyyy', { locale })
        : '';
    
    return (
        <div className="bg-gray-50 flex flex-col">

            {/* Hero Section */}
            <div style={{ "--image-url": `url(${cmsUrl}${articleData.cover.url})` } as React.CSSProperties} className={`relative ${articleData.cover ? `bg-[image:var(--image-url)] bg-cover bg-center` : 'bg-[url(https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=1600&h=600)] bg-cover bg-center'}`}>
                <div className='object-cover absolute inset-0 h-full w-full z-10 bg-black opacity-40'></div>
                <div className="relative z-40">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                        <div className="inline-block bg-primary text-white px-3 py-1 rounded-full text-sm font-medium mb-4">
                            {articleData.category.name}
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
                            {articleData.title}
                        </h1>
                        <p className="text-xl text-gray-200 mb-6 max-w-3xl">
                            {articleData.description}
                        </p>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Article Meta */}
                <div className="flex flex-wrap items-center gap-6 mb-8 p-6 bg-white rounded-lg shadow-sm">
                    <div className="flex items-center space-x-3">
                        <img
                            src={`${cmsUrl}${articleData.author.avatar.url}`}
                            alt={articleData.author.avatar.alternativeText || articleData.author.avatar.name || "Author Picture"}
                            className="w-12 h-12 rounded-full object-cover"
                        />
                        <div>
                            <div className="flex items-center">
                                <HiOutlineUser size={16} />
                                <span className="font-medium">{articleData.author.name}</span>
                            </div>
                            <p className="text-sm text-gray-500">{articleData.author.profTitle || "Content Creator"}</p>
                        </div>
                    </div>

                    <div className="flex items-center space-x-1 text-gray-600">
                        <HiOutlineCalendar size={16} />
                        <span>{t('metadata.published')}: {formattedDate}</span>
                    </div>

                    <div className="flex items-center space-x-1 text-gray-600">
                        <HiOutlineClock size={16} />
                        <span>{t('readingTime', { minutes: readingTime })}</span>
                    </div>

                    {/* Insert article tags here */}
                    {/* 
                    <div className="flex items-center space-x-1 text-gray-600">
                        <HiOutlineTag size={16} />
                        <span>Web Development, React, TypeScript</span>
                    </div> 
                    */}
                </div>

                {/* Article Content */}
                <article className="bg-white rounded-lg shadow-sm p-8">
                    <div className="blog-content">
                        {articleData.blocks.map((block, index) => {
                            if (block.__component === 'shared.rich-text') {
                                const richTextBlock = block as RichTextBlock;
                                return (
                                    <div key={block.id || `rich-text-${index}`}>
                                        <Markdown
                                            rehypePlugins={[rehypeRaw]}
                                            remarkPlugins={[remarkGfm]}
                                            components={{
                                                h1: ({ node, ...props }) => <h1 className="text-2xl font-bold mb-3" {...props} />,
                                                h2: ({ node, ...props }) => <h2 className="text-xl font-semibold mb-3" {...props} />,
                                                h3: ({ node, ...props }) => <h3 className="text-lg font-medium mb-2" {...props} />,
                                                h4: ({ node, ...props }) => <h4 className="text-md font-medium mb-2" {...props} />,
                                                th: ({ node, ...props }) => <th className="bg-gray-50 border border-gray-300 px-4 py-2 text-start font-medium text-gray-700" {...props} />,
                                                td: ({ node, ...props }) => <td className="border border-gray-300 px-4 py-2 text-gray-600" {...props} />,
                                                table: ({ node, ...props }) => (<div className="my-8"><table className="w-full border-collapse border border-gray-300 my-6" {...props} /></div>),
                                                p: ({ node, ...props }) => <p className="text-gray-700 mb-4 leading-relaxed" {...props} />,
                                                ul: ({ node, ...props }) => <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2" {...props} />,
                                                ol: ({ node, ...props }) => <ol className="list-decimal list-inside text-gray-600 mb-4 space-y-2" {...props} />,
                                                blockquote: ({ node, ...props }) => <blockquote className="border-l-4 border-primary ps-4 italic text-gray-700 my-6" {...props} />,
                                            }}
                                        >
                                            {richTextBlock.body}
                                        </Markdown>
                                    </div>
                                );
                            } else if (block.__component === 'shared.quote') {
                                const quoteBlock = block as QuoteBlock;
                                return (
                                    <blockquote key={block.id || `quote-${index}`} className="border-l-4 border-primary ps-4 italic text-gray-700 my-6 py-2">
                                        <p className="text-lg mb-2">"{quoteBlock.body}"</p>
                                        {quoteBlock.title && <footer className="text-right font-medium">— {quoteBlock.title}</footer>}
                                    </blockquote>
                                );
                            } else if (block.__component === 'shared.media') {
                                const mediaBlock = block as MediaBlock;
                                return (
                                    <div key={block.id || `media-${index}`} className="my-8">
                                        <img
                                            src={`${cmsUrl}${mediaBlock.file.url}`}
                                            alt={mediaBlock.file.alternativeText || mediaBlock.file.name}
                                            className="w-full max-h-96 object-contain rounded-lg shadow-md"
                                        />
                                        {mediaBlock.file.caption && (
                                            <p className="text-sm text-gray-500 mt-2 text-center">{mediaBlock.file.caption}</p>
                                        )}
                                    </div>
                                );
                            }
                            return null;
                        })}
                    </div>
                </article>

                {/* Author details */}
                <div className="mt-12 bg-white rounded-lg shadow-sm p-8">
                    <div className="flex items-start space-x-4">
                        <img
                            src={`${cmsUrl}${articleData.author.avatar.url}`}
                            alt={articleData.author.avatar.alternativeText || "Author"}
                            className="w-16 h-16 rounded-full object-cover"
                        />
                        <div>
                            <h3 className="text-xl font-bold text-gray-800 mb-2">{articleData.author.name}</h3>
                            <p className="text-gray-600 mb-3">
                                {articleData.author.biography || 
                                t('author.defaultBio', {
                                    name: articleData.author.name,
                                    category: articleData.category.name
                                })}
                            </p>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};



export const getServerSideProps: GetServerSideProps = async ({ req, res, query, locale }) => {
  // Set cache control headers
  res.setHeader(
    'Cache-Control',
    'public, s-maxage=3600, stale-while-revalidate=86400'
  );
  try {
    const response = await cmsFetcher.get(`/api/articles/${query.id}?populate[author][populate]=*&populate[blocks][populate]=*&populate[cover][populate]=*&populate[category][fields][0]=name&locale=${locale}`);
    console.log("Query ID:", query.id);
    
    return {
      props: {
        articleData: response.data.data,
      },
    };
  } catch (error) {
    console.error("Error fetching article content:", error);
    console.log("Query ID:", query.id);
    
    // Fallback to static data if CMS fetch fails
    return {
      props: {
        articleData: null,
        error: "Failed to load article content from CMS. Please try again later.",
      },
    };
  }
};

export default BlogPost;