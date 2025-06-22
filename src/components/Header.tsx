import {
  HiBars3,
  HiArrowRightEndOnRectangle,
  HiOutlineUser,
  HiMagnifyingGlass,
  HiArrowRightOnRectangle,
} from "react-icons/hi2";
import Link from "next/link";
import { useState } from "react";
import { cn } from "@app/utils/cn";
import Image from "next/image";
import { signOut, useSession } from "next-auth/react";

const Header = () => {
  const [sidebarState, setSidebarState] = useState(false);
  const [dropdownState, setDropdownState] = useState(false);

  const session = useSession();

  return (
    <>
      <div className="flex flex-row w-full border-b ps-10 pe-10">
        <div className="flex flex-row justify-center items-center w-auto">
          <div className="w-32 h-24 relative">
            <Image
              src="/logo.png"
              alt="Picture of the Logo"
              layout="fill"
              objectFit="contain"
            ></Image>
          </div>
          <p className="text-center text-xl ps-4 font-bold  whitespace-nowrap">
            SRDRI | KSU
          </p>
        </div>
        <div className="lg:flex flex-row space-x-5 items-center text-md font-medium hidden w-full ms-5">
          <Link href="/">Home</Link>
          <Link href="/upload">Submit Data</Link>
          <Link href="/about">About Us</Link>
          <Link href="/faq">FAQ</Link>
          <Link href="/contact">Contact Us</Link>
          <Link href="/feedback">Feedback</Link>
          {session.data?.user.permissions.ADMIN_READ && (
            <Link href="/dashboard/admin">Dashboard</Link>
          )}
        </div>
        <div className="lg:flex flex-row justify-end items-center w-full space-x-2 hidden">
          <Link
            className="rounded-full flex items-center justify-center hover:cursor-pointer hover:shadow-md hover:border-gray-200 p-2 border border-white"
            href="/search"
          >
            <HiMagnifyingGlass className="w-[24px] h-[24px]" />
          </Link>

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
                <Link href={"/profile"} className="flex flex-row w-full p-3 hover:bg-gray-200 hover:cursor-pointer rounded-lg">
                  <HiOutlineUser className="w-[24px] h-[24px] me-1" />
                  Profile
                </Link>
                <a
                  className="flex flex-row w-full p-3 hover:bg-gray-200 hover:cursor-pointer rounded-lg"
                  onClick={() => {
                    signOut();
                  }}
                >
                  <HiArrowRightOnRectangle className="w-[24px] h-[24px] me-1" />{" "}
                  Logout
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
      <div
        className={cn(
          sidebarState ? "flex fixed z-50" : "hidden",
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
              session.status === "authenticated" ? "/profile/mobile" : "/login"
            }
          >
            {session.status === "authenticated" ? "Profile" : "Login"}
          </Link>
          <Link className="p-2 border-b w-1/2" href="/search">
            Search
          </Link>
          <Link className="p-2 border-b w-1/2" href="/upload">
            Submit Data
          </Link>
          <Link className="p-2 border-b w-1/2" href="/about">
            About Us
          </Link>
          <Link className="p-2 border-b w-1/2" href="/contact">
            Contact Us
          </Link>
          <Link className="p-2 border-b w-1/2" href="/feedback">
            Feedback
          </Link>
          {session.data?.user.permissions.ADMIN_READ && (
            <Link className="p-2 border-b w-1/2" href="/dashboard/admin">
              Dashboard
            </Link>
          )}
          {session.status === "authenticated" && (
            <a
              className="p-2 border-b w-1/2"
              onClick={() => {
                signOut();
              }}
            >
              Logout
            </a>
          )}
        </nav>
      </div>
    </>
  );
};
export default Header;
