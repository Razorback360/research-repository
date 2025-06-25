import type { FC } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import Loader from "@app/components/Loader";
import { useTranslations } from "next-intl";

const Upload: FC = () => {
  const t = useTranslations();
  const session = useSession();

  if(session.status === "loading") {
    return <Loader/>
  }
  // if(session.status === "unauthenticated" || !session.data?.user?.permissions.WRITE) {
  //   router.push("/login");
  //   return <Loader/>
  // }

  return (
    <main className="flex flex-col items-center p-8 justify-center h-3/4">
      <h1 className="text-center text-4xl font-bold">
        {t("upload.title")}
      </h1>
      <p className="text-center max-w-lg mt-4 text-lg">
        {t("upload.description")}
      </p>
      <div className="flex flex-row space-x-5 w-full justify-center">
        <Link className="bg-primary text-white py-2 px-4 rounded-lg mt-4 hover:shadow-2xl w-1/4 h-24 text-center justify-center items-center flex text-lg" href="/upload/paper">
          <p>{t("upload.researchPaper")}</p>
        </Link>
        <Link className="bg-primary text-white py-2 px-4 rounded-lg mt-4 hover:shadow-2xl w-1/4 h-24 text-center justify-center items-center flex text-lg" href="/upload/data">
          <p>{t("upload.dataset")}</p>
        </Link>
      </div>
    </main>
  );
};

export default Upload;