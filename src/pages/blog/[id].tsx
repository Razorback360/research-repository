import React from 'react';
import { HiOutlineCalendar, HiOutlineUser, HiOutlineTag, HiOutlineClock } from 'react-icons/hi';
import Markdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm';
import { GetServerSideProps } from "next";
import { cmsFetcher } from '@app/utils/fetcher';

const BlogPost = () => {
    return (
        <div className="bg-gray-50 flex flex-col">

            {/* Hero Section */}
            <div className="relative bg-[url('https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=1600&h=600')] bg-cover bg-center">
                <div className='object-cover absolute inset-0 h-full w-full z-10 bg-black opacity-40'></div>
                <div className="relative z-40">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                        <div className="inline-block bg-primary text-white px-3 py-1 rounded-full text-sm font-medium mb-4">
                            Technology
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
                            Unlocking the Power of Modern Web Development: A Comprehensive Guide
                        </h1>
                        <p className="text-xl text-gray-200 mb-6 max-w-3xl">
                            Discover the latest trends, best practices, and cutting-edge technologies that are shaping the future of web development in 2024 and beyond.
                        </p>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Article Meta */}
                <div className="flex flex-wrap items-center gap-6 mb-8 p-6 bg-white rounded-lg shadow-sm">
                    <div className="flex items-center space-x-3">
                        {/* Insert cover image here */}
                        <img
                            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=100&h=100"
                            alt="Author"
                            className="w-12 h-12 rounded-full object-cover"
                        />
                        <div>
                            <div className="flex items-center space-x-1 text-gray-600">
                                <HiOutlineUser size={16} />
                                {/* Insert author name here */}
                                <span className="font-medium">Dr. Sarah Johnson</span>
                            </div>
                            {/* Insert author experience here */}
                            <p className="text-sm text-gray-500">Senior Research Engineer</p>
                        </div>
                    </div>

                    <div className="flex items-center space-x-1 text-gray-600">
                        <HiOutlineCalendar size={16} />
                        {/* Insert publication date here */}
                        <span>March 15, 2024</span>
                    </div>

                    <div className="flex items-center space-x-1 text-gray-600">
                        <HiOutlineClock size={16} />
                        {/* Insert estimated reading time here */}
                        <span>8 min read</span>
                    </div>

                    <div className="flex items-center space-x-1 text-gray-600">
                        <HiOutlineTag size={16} />
                        {/* Insert article tags here */}
                        <span>Web Development, React, TypeScript</span>
                    </div>
                </div>

                {/* Article Content */}
                <article className="bg-white rounded-lg shadow-sm p-8">
                    <div className="blog-content">
                        <Markdown
                            rehypePlugins={[rehypeRaw]}
                            remarkPlugins={[remarkGfm]}
                            components={{
                                h1: ({ node, ...props }) => <h1 className="text-2xl font-bold mb-3" {...props} />,
                                h2: ({ node, ...props }) => <h2 className="text-xl font-semibold mb-3" {...props} />,
                                h3: ({ node, ...props }) => <h3 className="text-lg font-medium mb-2" {...props} />,
                                h4: ({ node, ...props }) => <h4 className="text-md font-medium mb-2" {...props} />,
                                th: ({ node, ...props }) => <th className="bg-gray-50 border border-gray-300 px-4 py-2 text-left font-medium text-gray-700" {...props} />,
                                td: ({ node, ...props }) => <td className="border border-gray-300 px-4 py-2 text-gray-600" {...props} />,
                                table: ({ node, ...props }) => (<div className="my-8"><table className="w-full border-collapse border border-gray-300 my-6" {...props} /></div>),
                                p: ({ node, ...props }) => <p className="text-gray-700 mb-4 leading-relaxed" {...props} />,
                                ul: ({ node, ...props }) => <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2" {...props} />,
                                ol: ({ node, ...props }) => <ol className="list-decimal list-inside text-gray-600 mb-4 space-y-2" {...props} />,
                                blockquote: ({ node, ...props }) => <blockquote className="border-l-4 border-primary pl-4 italic text-gray-700 my-6" {...props} />,
                            }}
                        >
                        </Markdown>


                        <div className="my-8">
                            <img
                                src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=800&h=400"
                                alt="Developer workspace"
                                className="w-full h-64 object-cover rounded-lg shadow-md"
                            />
                            <p className="text-sm text-gray-500 mt-2 text-center">A modern developer workspace optimized for productivity</p>
                        </div>
                    </div>
                </article>

                {/* Fillout with the author details */}
                <div className="mt-12 bg-white rounded-lg shadow-sm p-8">
                    <div className="flex items-start space-x-4">
                        <img
                            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=100&h=100"
                            alt="Author"
                            className="w-16 h-16 rounded-full object-cover"
                        />
                        <div>
                            <h3 className="text-xl font-bold text-gray-800 mb-2">Dr. Sarah Johnson</h3>
                            <p className="text-gray-600 mb-3">
                                Dr. Sarah Johnson is a Senior Research Engineer with over 10 years of experience in web development
                                and software architecture. She specializes in modern JavaScript frameworks and has contributed to
                                several open-source projects. Sarah holds a Ph.D. in Computer Science and regularly speaks at
                                international conferences.
                            </p>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export const getServerSideProps: GetServerSideProps = async ({ req, res, query }) => {
  // Set cache control headers
  res.setHeader(
    'Cache-Control',
    'public, s-maxage=3600, stale-while-revalidate=86400'
  );

  try {
    const response = await cmsFetcher.get(`/api/article/${query.id}/?populate[blocks][populate]=*`);
    console.log("Query ID:", query.id);
    
    return {
      props: {
        aboutData: response.data.data,
      },
    };
  } catch (error) {
    console.error("Error fetching about content:", error);
    console.log("Query ID:", query.id);
    
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

export default BlogPost;