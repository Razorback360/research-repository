import { FC } from "react";
import Link from "next/link";
import { GetServerSideProps } from "next";
import { cmsFetcher } from "../utils/fetcher";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { HomeProps } from "../../interfaces";

// Render SVG icon from CMS data
const IconComponent: FC<{ iconData: string }> = ({ iconData }) => {
  return (
    <svg
      width="64"
      height="64"
      viewBox="0 0 24 24"
      className="text-[#c1c7cd]"
      dangerouslySetInnerHTML={{ __html: iconData }}
    />
  );
};

const Home: FC<HomeProps> = ({ data, error }) => {
  if (error) {
    return (
      <div className="w-full flex flex-col items-center justify-center p-12">
        <h1 className="text-2xl text-red-600 mb-4">Error Loading Content</h1>
        <p>{error}</p>
      </div>
    );
  }

  const cmsUrl = process.env.NEXT_PUBLIC_CMS_API_URL || "http://127.0.0.1:1337";

  return (
    <div className="w-full flex flex-col">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-6 lg:p-12 h-full">
        <div className="flex items-center justify-center">
          <img
            className="w-96 rounded-lg"
            src={`${cmsUrl}${data.heroImg.url}` || "/landing-catch.png"}
            alt={data.heroImg.alternativeText || "Hero image"}
          />
        </div>
        <div className="flex flex-col space-y-4 text-left">
          <h4 className="text-sm font-semibold text-primary uppercase">
            Submit Data
          </h4>
          <h2 className="text-2xl font-bold text-gray-800 leading-tight">
            {data.heroTitle}
          </h2>
          <p className="text-[#000000]">{data.heroDesc}</p>
          <div className="flex space-x-4">
            <Link
              href="/upload"
              className="px-4 py-2 text-white bg-primary hover:bg-primary rounded-md font-medium"
            >
              Submit now
            </Link>
            <Link
              href="/about"
              className="px-4 py-2 text-primary border border-primary hover:bg-blue-50 rounded-md font-medium"
            >
              Learn more
            </Link>
          </div>
        </div>
      </div>

      <div className="p-6 lg:p-12 space-y-8">
        <h4 className="text-center text-sm font-semibold text-primary uppercase">
          {data.impTitle}
        </h4>
        <h2 className="text-center text-3xl font-bold text-gray-800 leading-snug">
          {data.impDesc.split("\n").map((line, i) => (
            <span key={i}>
              {line}
              {i < data.impDesc.split("\n").length - 1 && <br />}
            </span>
          ))}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-center">
          {data.impacts.map((impact) => (
            <div key={impact.id} className="flex flex-col items-center space-y-4">
              <IconComponent iconData={impact.impactIcon.iconData} />
              <p>
                <strong className="text-gray-800">{impact.impactStat}</strong>
              </p>
              <div className="w-3/4">
                <Markdown remarkPlugins={[remarkGfm]}>{impact.impactDesc}</Markdown>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="text-center md:text-left mt-8 w-full flex flex-col items-center px-2">
        <h2 className="text-2xl font-bold text-gray-800 leading-tight md:w-1/2 w-full">
          {data.ctaTitle}
        </h2>
        <p className="text-[#000000] md:w-1/2 w-full">{data.ctaDesc}</p>
      </div>
      <div className="text-center mt-8 mb-10">
        <Link
          href="/signup"
          className="px-6 py-3 text-[#ffffff] bg-primary hover:bg-primary rounded-md font-medium"
        >
          Join Us
        </Link>
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  // Set cache control headers
  res.setHeader(
    "Cache-Control",
    "public, s-maxage=600, stale-while-revalidate=86400"
  );

  try {
    const response = await cmsFetcher.get("/api/home?populate=*");
    return {
      props: {
        data: response.data.data,
      },
    };
  } catch (error) {
    console.error("Error fetching home content:", error);

    return {
      props: {
        data: {
          id: 0,
          heroTitle: "Unlock the Power of Knowledge",
          heroDesc:
            "Every dataset stored, every paper shared, and every discovery made through SRDRI is a step toward building a brighter, more informed future.",
          impTitle: "Impact in Numbers",
          impDesc:
            "At SRDRI, our commitment to advancing research\nand knowledge is making a real difference.",
          ctaTitle: "Together, We're Making a Difference",
          ctaDesc:
            "Every statistic represents lives touched, ideas shared, and a brighter future being built.",
          heroImg: {
            url: "/landing-catch.png",
            alternativeText: null,
          },
          impacts: [],
        },
        error: "Failed to load content from CMS. Showing limited content.",
      },
    };
  }
};

export default Home;
