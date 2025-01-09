import type { FC } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Loader from "@app/components/Loader";

const Upload: FC = () => {
  const session = useSession();
  const router = useRouter();
  if(session.status === "loading") {
    return <Loader/>
  }
  if(session.status === "unauthenticated" || !session.data?.user?.permissions.WRITE) {
    router.push("/login");
    return <Loader/>
  }


  return (
    <main className="flex flex-col items-center p-8 justify-center h-3/4">
      <h1 className="text-center text-4xl font-bold">
        What would you like to submit for upload today?
      </h1>
      <p className="text-center max-w-lg mt-4 text-lg">
        Choose from the options below to either upload a dataset or upload a
        paper. Both will be submitted for review and approved in due time.
      </p>
      <div className="flex flex-row space-x-5 w-full justify-center">
        <Link className="bg-primary text-white py-2 px-4 rounded-lg mt-4 hover:shadow-2xl w-1/4 h-24 text-center justify-center items-center flex text-lg" href="/upload/paper">
          <p>Upload a Research Paper</p>
        </Link>
        <Link className="bg-primary text-white py-2 px-4 rounded-lg mt-4 hover:shadow-2xl w-1/4 h-24 text-center justify-center items-center flex text-lg" href="/upload/data">
          <p>Upload a Dataset</p>
        </Link>
      </div>
    </main>
  );
};

export default Upload;