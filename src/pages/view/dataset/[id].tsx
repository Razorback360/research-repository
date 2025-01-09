import { useState } from "react";
// import Link from "next/link";
import { axiosInstance } from "@app/utils/fetcher";
import { IoCaretDownOutline, IoCaretUpOutline } from "react-icons/io5";
import { cn } from "@app/utils/cn";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Loader from "@app/components/Loader";

type DataType = {
  id: string;
  title: string;
  description: string;
  mapping: {
    variableLabels: Record<string, string>;
    labels: Record<string, Record<string, string>>;
  };
  report: string;
  sample: [string[], (string | number)[][]];
};

const Dataset = ({ data }: { data: DataType }) => {
  const [collapsibles, setCollapsibles] = useState({
    variableMapping: true,
    responseOptions: true,
    analysis: true,
    sampleData: true,
  });

  const session = useSession();
  const router = useRouter();
  if (session.status === "loading") {
    return <Loader />;
  }
  if (
    session.status === "unauthenticated" ||
    !session.data?.user?.permissions.READ
  ) {
    router.push("/login");
    return <Loader/>
  }


  const toggleCollapsible = (section: keyof typeof collapsibles) => {
    setCollapsibles({
      ...collapsibles,
      [section]: !collapsibles[section],
    });
  };

  const toggleMapping = (event: React.MouseEvent<HTMLButtonElement>) => {
    const content = event.currentTarget.nextElementSibling as HTMLElement;
    content.style.display =
      content.style.display === "block" ? "none" : "block";
  };

  return (
    <div className="bg-gray-100 text-gray-800 h-full flex flex-col w-full">
      <header className="bg-primary text-white p-5 text-center">
        <h1 className="text-2xl">{data.title}</h1>
        <p className="mt-2">{data.description}</p>
      </header>
      <main className="p-5">
        {session.data?.user.permissions.DOWNLOAD && (
          <a
            className="bg-primary p-3 text-white rounded-lg float-end hover:cursor-pointer"
            href={`/api/view/dataset/${data.id}?type=spss`}
          >
            Download Dataset
          </a>
        )}
        {/* DATA VARIABLE MAPPING SECTION */}
        <section className="mt-16 mb-5 p-4 bg-white border border-gray-300 rounded shadow">
          <div className="flex flex-row">
            <h2 className="text-primary text-xl">Variable Mapping</h2>
            {collapsibles.variableMapping ? (
              <IoCaretDownOutline
                className="text-primary ml-auto w-6 h-6 hover:cursor-pointer"
                onClick={() => toggleCollapsible("variableMapping")}
              />
            ) : (
              <IoCaretUpOutline
                className="text-primary ml-auto w-6 h-6 hover:cursor-pointer"
                onClick={() => toggleCollapsible("variableMapping")}
              />
            )}
          </div>
          <table
            className={cn(
              "w-full border-collapse mt-2",
              collapsibles.variableMapping ? "hidden" : ""
            )}
          >
            <thead>
              <tr>
                <th className="border border-gray-300 p-2 text-left bg-gray-100">
                  Variable
                </th>
                <th className="border border-gray-300 p-2 text-left bg-gray-100">
                  Label
                </th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(data.mapping.variableLabels).map(
                ([key, value]) => (
                  <tr key={key}>
                    <td className="border border-gray-300 p-2">{key}</td>
                    <td className="border border-gray-300 p-2">{value}</td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </section>

        {/* DATA RESPONSE MAPPING SECTION */}
        <section className="mb-5 p-4 bg-white border border-gray-300 rounded shadow">
          <div className="flex flex-row">
            <h2 className="text-primary text-xl">
              Response Options by Variable
            </h2>
            {collapsibles.responseOptions ? (
              <IoCaretDownOutline
                className="text-primary ml-auto w-6 h-6 hover:cursor-pointer"
                onClick={() => toggleCollapsible("responseOptions")}
              />
            ) : (
              <IoCaretUpOutline
                className="text-primary ml-auto w-6 h-6 hover:cursor-pointer"
                onClick={() => toggleCollapsible("responseOptions")}
              />
            )}
          </div>
          <div className={collapsibles.responseOptions ? "hidden" : ""}>
            {Object.entries(data.mapping.labels).map(([key, value]) => (
              <div key={key}>
                <button
                  className="w-full text-left p-2 bg-gray-100 border border-gray-300 mt-2"
                  onClick={toggleMapping}
                >
                  Variable {key}
                </button>
                <div
                  className="collapsible-content p-2 border-t border-gray-300"
                  style={{ display: "none" }}
                >
                  <table className="w-full border-collapse mt-2">
                    <thead>
                      <tr>
                        <th className="border border-gray-300 p-2 text-left bg-gray-100">
                          Value
                        </th>
                        <th className="border border-gray-300 p-2 text-left bg-gray-100">
                          Label
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {Object.entries(value).map(([key, value]) => (
                        <tr key={key}>
                          <td className="border border-gray-300 p-2">{key}</td>
                          <td className="border border-gray-300 p-2">
                            {value}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* DATA ANALYSIS SECTION */}
        <section className="mb-5 p-4 bg-white border border-gray-300 rounded shadow">
          <div className="flex flex-row">
            <h2 className="text-primary text-xl">Dataset Analysis</h2>
            {collapsibles.analysis ? (
              <IoCaretDownOutline
                className="text-primary ml-auto w-6 h-6 hover:cursor-pointer"
                onClick={() => toggleCollapsible("analysis")}
              />
            ) : (
              <IoCaretUpOutline
                className="text-primary ml-auto w-6 h-6 hover:cursor-pointer"
                onClick={() => toggleCollapsible("analysis")}
              />
            )}
          </div>
          <div
            className={cn(
              "bg-gray-200 p-2 rounded-lg mt-2",
              collapsibles.analysis ? "hidden" : ""
            )}
          >
            {data.report.split("\n").map((line, index) => (
              <p key={index}>{line}</p>
            ))}
          </div>
        </section>

        {/* SAMPLE DATA SECTION */}
        <section className="mb-5 p-4 bg-white border border-gray-300 rounded shadow overflow-hidden">
          <div className="flex flex-row">
            <h2 className="text-primary text-xl">Sample Data</h2>
            {collapsibles.sampleData ? (
              <IoCaretDownOutline
                className="text-primary ml-auto w-6 h-6 hover:cursor-pointer"
                onClick={() => toggleCollapsible("sampleData")}
              />
            ) : (
              <IoCaretUpOutline
                className="text-primary ml-auto w-6 h-6 hover:cursor-pointer"
                onClick={() => toggleCollapsible("sampleData")}
              />
            )}
          </div>
          <div
            className={cn(
              "overflow-auto",
              collapsibles.sampleData ? "hidden" : ""
            )}
          >
            <table className="w-full border-collapse mt-2 overflow-scroll">
              <thead>
                <tr>
                  {data.sample[0].map((col, index) => (
                    <th
                      key={index}
                      className="border border-gray-300 p-2 text-left bg-gray-100"
                    >
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {data.sample[1].map((row, index) => (
                  <tr key={index}>
                    {row.map((col, index) => (
                      <td className="border border-gray-300 p-2" key={index}>
                        {col}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
};

export const getServerSideProps = async (context: {
  params: { id: string };
  req: { headers: Record<string, string> };
}) => {
  console.log(context.params.id);
  const req = await axiosInstance(`/api/view/dataset/${context.params.id}`, {
    headers: context.req.headers,
  });
  const data = req.data;
  return {
    props: { data }, // will be passed to the page component as props
  };
};

export default Dataset;
