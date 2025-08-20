import { HiOutlineRocketLaunch } from "react-icons/hi2";
import type { FC } from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";

const NotFound: FC = () => {
  const t = useTranslations();

  return (
    <main className="flex flex-col items-center p-8 h-full justify-center">
      {" "}
      <HiOutlineRocketLaunch className="w-[96px] h-[96px] text-gray-300 mb-4" />
      <h1 className="text-center text-6xl font-bold">
        {t("notFound.title")}
        <br />
        {t("notFound.subtitle")}
      </h1>
      <p className="text-center max-w-lg mt-4 text-lg">
        {t("notFound.message")}
      </p>
      <Link
        className="bg-white text-primary border border-primary py-2 px-4 rounded-lg mt-4 hover:shadow-lg shadow-md text-lg flex justify-center items-center"
        href="/"
      >
        <p>{t("notFound.homePage")}</p>
      </Link>
    </main>
  );
};

export default NotFound;
