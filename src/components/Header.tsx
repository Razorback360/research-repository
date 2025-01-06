import { 
  HiBars3, 
  HiArrowRightEndOnRectangle,
  HiOutlineBell,
  HiOutlineCog8Tooth,
  HiOutlineUser
} from "react-icons/hi2";

import { useState } from "react";
import { cn } from "@app/utils/cn";
import { useRouter } from "next/router";
import a from "next/a";
import Image from "next/image";
import { useSession } from "next-auth/react";

const Header = () => {
  const [sidebarState, setSidebarState] = useState(false);
  const router = useRouter();
  const session = useSession();
  return (
    <>
      <div className="flex flex-row w-full border-b pl-10 pr-10 ">
        <div className="flex flex-row justify-center items-center w-auto">
          <div className="w-32 h-24 relative">
            <Image
              src="/logo.png"
              alt="Picture of the Logo"
              layout="fill"
              objectFit="contain"
            ></Image>
          </div>
          <p className="text-center text-xl pl-4 font-bold  whitespace-nowrap">
            SRDRI | KSU
          </p>
        </div>
        <div className="lg:flex flex-row space-x-5 items-center text-md font-medium hidden w-full ml-5">
          <a href="/">Home</a>
          <a href="/404">Donate</a>
          <a href="/404">About Us</a>
          <a href="/404">FAQ</a>
          <a href="/404">Contact Us</a>
          <a href="/feedback">Feedback</a>
        </div>
        <div className="lg:flex flex-row justify-end items-center w-full space-x-2 hidden">
          <a className="rounded-full flex items-center justify-center hover:cursor-pointer hover:shadow-md hover:border-gray-200 p-2 border border-white">
            <HiOutlineBell className="w-[24px] h-[24px]"/>
          </a>
          <a className="rounded-full flex items-center justify-center hover:cursor-pointer hover:shadow-md hover:border-gray-200 p-2 border border-white">
            <HiOutlineCog8Tooth className="w-[24px] h-[24px]" />
          </a>
          <a
            href={router.pathname.includes("profile") ? "/profile" : "/login"}
            className={cn(
              "rounded-full flex items-center justify-center p-2 hover:cursor-pointer hover:shadow-md hover:border-gray-200 border border-white",
              session.status === "authenticated" ? "bg-gray-300" : ""
            )}
          >
            {session.status === "authenticated" ? (
              <HiOutlineUser className="w-[24px] h-[24px]" />
            ) : (
              <HiArrowRightEndOnRectangle className="w-[24px] h-[24px]" />
            )}
          </a>
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
      <div
        className={cn(
          sidebarState ? "flex fixed z-50" : "hidden",
          "flex-col h-full w-full bg-white"
        )}
      >
        <nav className="flex flex-col space-y-5 justify-center items-center text-md font-medium mt-5 text-center">
          <a className="p-2 border-b w-1/2" href="/">
            Home
          </a>
          <a
            className="p-2 border-b w-1/2"
            href={
              router.pathname.includes("profile") ? "/profile/mobile" : "/login"
            }
          >
            {router.pathname.includes("profile") ? "Profile" : "Login"}
          </a>
          <a className="p-2 border-b w-1/2" href="/404">
            Donate
          </a>
          <a className="p-2 border-b w-1/2" href="/404">
            About Us
          </a>
          <a className="p-2 border-b w-1/2" href="/404">
            FAQ
          </a>
          <a className="p-2 border-b w-1/2" href="/404">
            Contact Us
          </a>
          <a className="p-2 border-b w-1/2" href="/feedback">
            Feedback
          </a>
        </nav>
      </div>
    </>
  );
};
export default Header;
