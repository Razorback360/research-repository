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
import Link from "next/link";
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
          <Link href="/">Home</Link>
          <Link href="/404">Donate</Link>
          <Link href="/404">About Us</Link>
          <Link href="/404">FAQ</Link>
          <Link href="/404">Contact Us</Link>
          <Link href="/feedback">Feedback</Link>
        </div>
        <div className="lg:flex flex-row justify-end items-center w-full space-x-2 hidden">
          <a className="rounded-full flex items-center justify-center hover:cursor-pointer hover:shadow-md hover:border-gray-200 p-2 border border-white">
            <HiOutlineBell width={24} height={24} />
          </a>
          <a className="rounded-full flex items-center justify-center hover:cursor-pointer hover:shadow-md hover:border-gray-200 p-2 border border-white">
            <HiOutlineCog8Tooth width={24} height={24} />
          </a>
          <a
            href={router.pathname.includes("profile") ? "/profile" : "/login"}
            className={cn(
              "rounded-full flex items-center justify-center p-2 hover:cursor-pointer hover:shadow-md hover:border-gray-200 border border-white",
              session.status === "authenticated" ? "bg-gray-300" : ""
            )}
          >
            {session.status === "authenticated" ? (
              <HiOutlineUser width={24} height={24} />
            ) : (
              <HiArrowRightEndOnRectangle width={24} height={24} />
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
            <HiBars3 width={24} height={24} />
          </a>
        </div>
      </div>
      <div
        className={cn(
          sidebarState ? "flex absolute" : "hidden",
          "flex-col h-full w-full bg-white"
        )}
      >
        <nav className="flex flex-col space-y-5 justify-center items-center text-md font-medium mt-5 text-center">
          <Link className="p-2 border-b w-1/2" href="/">
            Home
          </Link>
          <Link
            className="p-2 border-b w-1/2"
            href={
              router.pathname.includes("profile") ? "/profile/mobile" : "/login"
            }
          >
            {router.pathname.includes("profile") ? "Profile" : "Login"}
          </Link>
          <Link className="p-2 border-b w-1/2" href="/404">
            Donate
          </Link>
          <Link className="p-2 border-b w-1/2" href="/404">
            About Us
          </Link>
          <Link className="p-2 border-b w-1/2" href="/404">
            FAQ
          </Link>
          <Link className="p-2 border-b w-1/2" href="/404">
            Contact Us
          </Link>
          <Link className="p-2 border-b w-1/2" href="/feedback">
            Feedback
          </Link>
        </nav>
      </div>
    </>
  );
};
export default Header;
