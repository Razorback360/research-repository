// import Link from "next/link";
import { appFetcher } from "@app/utils/fetcher";
import Markdown from "react-markdown";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Loader from "@app/components/Loader";
import axios from "axios";

type Author = {
  authorFirst: string;
  authorMiddle: string;
  authorLast: string;
};

type DataProp = {
  id: string;
  title: string;
  journal: string;
  volume?: string;
  issue?: string;
  startPage?: string;
  endPage?: string;
  publishDate: string;
  doiLink?: string;
  abstract: string;
  authors: Author[];
  apaCitation: string;
  chicagoCitation: string;
};

const Paper = ({ data }: { data: DataProp }) => {
  const session = useSession();
  const router = useRouter();
  if(session.status === "loading") {
    return <Loader/>
  }
  if(session.status === "unauthenticated" || !session.data?.user?.permissions.READ) {
    router.push("/auth/login");
    return <Loader/>
  }

  return (
    <div className="bg-gray-100 text-gray-800 flex flex-col w-full items-center">
      <header className="bg-primary text-white p-5 text-center w-full">
        <h1 className="text-4xl">{data.title}</h1>
        <p className="mt-2 text-xl">
          Published in: {data.journal}
          {data.volume && `, Volume ${data.volume}`}
          {data.issue && `, Issue ${data.issue}`}
          {data.startPage && `, Pages ${data.startPage}-${data.endPage}`}
        </p>
      </header>
      <main className="p-5 flex flex-col w-3/4">
        <section className="mb-5 p-4 bg-white border border-gray-300 rounded-sm shadow-sm">
          <h2 className="text-primary text-2xl">Abstract</h2>
          <p>{data.abstract}</p>
        </section>
        <section className="mb-5 p-4 bg-white border border-gray-300 rounded-sm shadow-sm">
          <h2 className="text-primary text-2xl">Authors</h2>
          <div className="authors">
            {data.authors.map((author, index) => (
              <p key={index}>
                {author.authorFirst} {author.authorMiddle} {author.authorLast}
              </p>
            ))}
          </div>
        </section>
        <section className="mb-5 p-4 bg-white border border-gray-300 rounded-sm shadow-sm h-[1200px]">
          <h2 className="text-primary text-2xl mb-2">PDF Preview</h2>
          <iframe
            src={`/api/view/paper/${data.id}?type=pdf`}
            className="w-full h-[1125px] border border-gray-300 rounded-sm"
            title="PDF Preview"
          ></iframe>
        </section>
        <section className="mb-5 p-4 bg-white border border-gray-300 rounded-sm shadow-sm">
          <h2 className="text-primary text-2xl">Publication Information</h2>
          <div className="journal-info">
            <p>
              <strong>Journal:</strong> {data.journal}
            </p>
            {data.volume && (
              <p>
                <strong>Volume:</strong> {data.volume}
              </p>
            )}
            {data.issue && (
              <p>
                <strong>Issue:</strong> {data.issue}
              </p>
            )}
            <p>
              <strong>Pages:</strong> {data.startPage}-{data.endPage}
            </p>
            <p>
              <strong>Publish Date:</strong> {data.publishDate.split("T")[0]}
            </p>
            {data.doiLink && (
              <a
                href={data.doiLink}
                className="hover:cursor-pointer inline-block mt-5 px-4 py-2 bg-primary text-white rounded-sm hover:bg-blue-700"
              >
                View DOI Link
              </a>
            )}
          </div>
        </section>
        <section className="mb-5 p-4 bg-white border border-gray-300 rounded-sm shadow-sm">
          <h2 className="text-primary text-2xl">Citations</h2>
          <div className="citation mb-5">
            <h3 className="text-xl">APA Style</h3>
            <pre className="bg-gray-100 p-4 border border-gray-300 rounded-sm overflow-x-auto">
              <Markdown>{data.apaCitation}</Markdown>
            </pre>
          </div>
          <div className="citation">
            <h3 className="text-xl">Chicago Style</h3>
            <pre className="bg-gray-100 p-4 border border-gray-300 rounded-sm overflow-x-auto">
              <Markdown>{data.chicagoCitation}</Markdown>
            </pre>
          </div>
        </section>
      </main>
    </div>
  );
};

export const getServerSideProps = async (context: {
  params: { id: string };
  req: {headers: Record<string, string>};
}) => {
  try {
    const req = await appFetcher(`/api/view/paper/${context.params?.id}`, {
      headers: context.req.headers,
    });
    const data = req.data;
    return {
      props: { data }, // will be passed to the page component as props
    };
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 401) {
      return {
        redirect: {
          destination: "/auth/login",
          permanent: false,
        },
      };
    }
    return {
      notFound: true,
    };
  }
};

export default Paper;
