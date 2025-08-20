import {
  HiBars3,
  HiArrowRightEndOnRectangle,
  HiOutlineUser,
  HiMagnifyingGlass,
  HiArrowRightOnRectangle,
  HiLanguage
} from "react-icons/hi2";
import Link from "next/link";
import { useState } from "react";
import { cn } from "@app/utils/cn";
import Image from "next/image";
import { signOut, useSession } from "next-auth/react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/router";

const Header = () => {
  const [sidebarState, setSidebarState] = useState(false);
  const [dropdownState, setDropdownState] = useState(false);
  const router = useRouter();
  const t = useTranslations();

  const session = useSession();

  //switch lang
  const switchLanguage = () => {
    const newLang = router.locale === "en" ? "ar" : "en";
      router.push(router.asPath, undefined, { locale: newLang})
      router.reload();
  };

  return (
    <>
      <div className="flex flex-row w-full border-b ps-10 pe-10">
        <div className="flex flex-row justify-center items-center w-auto">
          <div className="w-32 h-24 relative">
            <Image
              src="/logo.png"
              alt={t("header.logo.alt")}
              layout="fill"
              objectFit="contain"
            ></Image>
          </div>
          <p className="text-center text-xl ps-4 font-bold  whitespace-nowrap">
            {t("header.title")}
          </p>
        </div>
        <div className="lg:flex flex-row space-x-5 items-center text-md font-medium hidden w-full ms-5">
          <Link href="/">{t("header.navigation.home")}</Link>
          <Link href="/upload">{t("header.navigation.submitData")}</Link>
          <Link href="/about">{t("header.navigation.aboutUs")}</Link>
          <Link href="/faq">{t("header.navigation.faq")}</Link>
          <Link href="/contact">{t("header.navigation.contactUs")}</Link>
          <Link href="/feedback">{t("header.navigation.feedback")}</Link>
          {session.data?.user.permissions.ADMIN_READ && (
            <Link href="/dashboard/admin">
              {t("header.navigation.dashboard")}
            </Link>
          )}
        </div>
        <div className="lg:flex flex-row justify-end items-center w-full space-x-2 hidden">
          <Link
            className="rounded-full flex items-center justify-center hover:cursor-pointer hover:shadow-md hover:border-gray-200 p-2 border border-white"
            href="/search"
          >
            <HiMagnifyingGlass className="w-[24px] h-[24px]" />
          </Link>
          <a
            className="rounded-full flex items-center justify-center hover:cursor-pointer hover:shadow-md hover:border-gray-200 p-2 border border-white"
            onClick={switchLanguage}
          >
            <HiLanguage className="w-[24px] h-[24px]" />
          </a>

          {session.status === "authenticated" ? (
            <div className="flex flex-col">
              <a
                onClick={() => {
                  setDropdownState(!dropdownState);
                }}
                className="rounded-full flex items-center justify-center p-2 hover:cursor-pointer hover:shadow-md hover:border-gray-200 border border-white bg-gray-200"
              >
                <HiOutlineUser className="w-[24px] h-[24px]" />
              </a>
              <div
                className={cn(
                  "absolute right-16 mt-10 bg-white shadow-md rounded-md p-2 space-y-2 w-32",
                  dropdownState ? "" : "hidden"
                )}
              >
                <Link
                  href={"/profile"}
                  className="flex flex-row w-full p-3 hover:bg-gray-200 hover:cursor-pointer rounded-lg"
                >
                  <HiOutlineUser className="w-[24px] h-[24px] me-1" />
                  {t("header.userMenu.profile")}
                </Link>
                <a
                  className="flex flex-row w-full p-3 hover:bg-gray-200 hover:cursor-pointer rounded-lg"
                  onClick={() => {
                    signOut();
                  }}
                >
                  <HiArrowRightOnRectangle className="w-[24px] h-[24px] me-1" />
                  {t("header.userMenu.logout")}
                </a>
              </div>
            </div>
          ) : (
            <Link
              href={"/login"}
              className={cn(
                "rounded-full flex items-center justify-center p-2 hover:cursor-pointer hover:shadow-md hover:border-gray-200 border border-white"
              )}
            >
              <HiArrowRightEndOnRectangle className="w-[24px] h-[24px]" />
            </Link>
          )}
        </div>
        <div className="lg:hidden flex-row justify-end items-center w-full space-x-2 flex">
          <a
            className="rounded-full flex items-center justify-center hover:cursor-pointer hover:shadow-md hover:border-gray-200 p-2 border border-white"
            onClick={() => {
              setSidebarState(!sidebarState);
            }}
          >
            <HiBars3 className="w-[24px] h-[24px]" />
          </a>
        </div>
      </div>
      {/* Mobile */}
      <div
        className={cn(
          sidebarState ? "flex fixed z-50" : "hidden",
          "flex-col h-full w-full bg-white"
        )}
      >
        <div className="flex flex-row justify-between items-center w-full border-b px-10">
          <div className="flex flex-row justify-center items-center w-auto">
          <div className="w-32 h-24 relative">
            <Image
              src="/logo.png"
              alt={t("header.logo.alt")}
              layout="fill"
              objectFit="contain"
            ></Image>
          </div>
          <p className="text-center text-xl ps-4 font-bold  whitespace-nowrap">
            {t("header.title")}
          </p>
        </div>
        <div className="lg:hidden flex-row justify-end items-center w-full space-x-2 flex">
          <a
            className="rounded-full flex items-center justify-center hover:cursor-pointer hover:shadow-md hover:border-gray-200 p-2 border border-white"
            onClick={() => {
              setSidebarState(!sidebarState);
            }}
          >
            <HiBars3 className="w-[24px] h-[24px]" />
          </a>
        </div>
        </div>
        <nav className="flex flex-col space-y-5 justify-center items-center text-md font-medium mt-5 text-center">
          <Link className="p-2 border-b w-1/2" href="/">
            {t("header.navigation.home")}
          </Link>
          <Link
            className="p-2 border-b w-1/2"
            href={
              session.status === "authenticated" ? "/profile/mobile" : "/login"
            }
          >
            {session.status === "authenticated"
              ? t("header.userMenu.profile")
              : t("header.userMenu.login")}
          </Link>
          <Link className="p-2 border-b w-1/2" href="/search">
            {t("header.navigation.search")}
          </Link>
          <Link className="p-2 border-b w-1/2" href="/upload">
            {t("header.navigation.submitData")}
          </Link>
          <Link className="p-2 border-b w-1/2" href="/about">
            {t("header.navigation.aboutUs")}
          </Link>
          <Link className="p-2 border-b w-1/2" href="/contact">
            {t("header.navigation.contactUs")}
          </Link>
          <Link className="p-2 border-b w-1/2" href="/feedback">
            {t("header.navigation.feedback")}
          </Link>
          {session.data?.user.permissions.ADMIN_READ && (
            <Link className="p-2 border-b w-1/2" href="/dashboard/admin">
              {t("header.navigation.dashboard")}
            </Link>
          )}
          {session.status === "authenticated" && (
            <a
              className="p-2 border-b w-1/2"
              onClick={() => {
                signOut();
              }}
            >
              {t("header.userMenu.logout")}
            </a>
          )}
        </nav>
      </div>
    </>
  );
};
export default Header;
