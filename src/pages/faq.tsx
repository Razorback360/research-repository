import React from "react";
import { GetServerSideProps } from "next";
import { cmsFetcher } from "../utils/fetcher";
import Markdown from "react-markdown";
import rehypeRaw from 'rehype-raw'
import remarkGfm from 'remark-gfm'
import { FAQProps } from "../../interfaces";

const FAQ = ({ faqs, error }: FAQProps) => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-semibold text-center mb-6 text-gray-800">
        Frequently Asked Questions (FAQ)
      </h1>
      {error && (
        <div className="text-center py-8 text-red-600">
          <p>{error}</p>
        </div>)
      }
      <div className="space-y-6">
        {faqs.map((faq) => (
          <div
            key={faq.id}
            className="border border-gray-300 p-4 rounded-lg bg-gray-50"
          >
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              <Markdown rehypePlugins={[rehypeRaw]} remarkPlugins={[remarkGfm]}>{faq.question}</Markdown>
            </h2>
            <div className="text-gray-700">
              <Markdown rehypePlugins={[rehypeRaw]} remarkPlugins={[remarkGfm]}>{faq.answer}</Markdown>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ res, locale }) => {
  // Set cache control headers
  res.setHeader(
    'Cache-Control',
    'public, s-maxage=600, stale-while-revalidate=86400'
  );

  try {
    const response = await cmsFetcher.get('/api/faq?populate=*&locale=' + locale);

    return {
      props: {
        faqs: response.data.data.items || [],
      },
    };
  } catch (error) {
    console.error("Error fetching FAQs:", error);

    // Fallback to static data if CMS fetch fails
    const staticFaqs = [
      {
        __component: "shared.q-and-a",
        id: 1,
        question: "What is the Saudi Research Data Repository Initiative (SRDRI)?",
        answer: "SRDRI is a platform dedicated to providing researchers and institutions with access to curated datasets and research papers. It is backed by King Saud University to foster a culture of collaboration and data sharing."
      },
      // Add more static fallback items if needed
    ];

    return {
      props: {
        faqs: staticFaqs,
        error: "Failed to load FAQs from CMS. Showing limited content.",
      },
    };
  }
};

export default FAQ;
