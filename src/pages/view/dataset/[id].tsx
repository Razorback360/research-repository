import { useState } from "react";
// import Link from "next/link";
import { appFetcher } from "@app/utils/fetcher";
import { IoCaretDownOutline, IoCaretUpOutline } from "react-icons/io5";
import { cn } from "@app/utils/cn";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Loader from "@app/components/Loader";
import axios from "axios";
import Navigation from "@app/components/Navigation";
import DatasetOverview from "@app/components/DatasetOverview";
import DataTable from "@app/components/DataTable";
import VariableInfo from "@app/components/VariableInfo";
import { MappingData, DatasetInfo, DatasetStructure } from '@interfaces/pages';

type NavigationTab = 'overview' | 'data' | 'variables';

type DataType = {
  id: string;
  title: string;
  description: string;
  mapping: MappingData;
  report: DatasetInfo;
  sample: DatasetStructure;
};

const Dataset = ({ data }: { data: DataType }) => {
  const [activeTab, setActiveTab] = useState<NavigationTab>('overview');

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return <DatasetOverview datasetInfo={data.report} datasetDesc={data.description} datasetTitle={data.title} datasetId={data.id}/>;
      case 'data':
        return <DataTable dataset={data.sample} mappings={data.mapping} />;
      case 'variables':
        return <VariableInfo mappings={data.mapping} datasetInfo={data.report} />;
      default:
        return <DatasetOverview datasetInfo={data.report} datasetDesc={data.description} datasetTitle={data.title} datasetId={data.id} />;
    }
  };

  return (
    <div className="h-full bg-gray-50">
      <Navigation activeTab={activeTab} onTabChange={setActiveTab} />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {renderContent()}
      </main>
    </div>
  );
};

export const getServerSideProps = async (context: {
  params: { id: string };
  req: { headers: Record<string, string> };
}) => {
  try {
    const req = await appFetcher(`/api/view/dataset/${context.params?.id}`, {
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

export default Dataset;
