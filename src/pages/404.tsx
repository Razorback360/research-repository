import { 
  HiOutlineRocketLaunch,
} from "react-icons/hi2";
import type { FC } from 'react';
import Link from "next/link";

const NotFound: FC = () => {
  return (
    <main className="flex flex-col items-center p-8 h-3/4 justify-center">
      <HiOutlineRocketLaunch className="w-[96px] h-[96px] text-gray-300 mb-4" />
      <h1 className="text-center text-6xl font-bold">
        404
        <br />
        Page Not Found
      </h1>
      <p className="text-center max-w-lg mt-4 text-lg">
        We are disappointed to inform you that the page you are trying to access
        does not actually exist! Head back to home down below!
      </p>
      <Link className="bg-white text-blue-500 border border-blue-500 py-2 px-4 rounded-lg mt-4 hover:shadow-lg shadow-md text-lg flex justify-center items-center" href="/">
          <p>Home Page</p>
        </Link>
    </main>
  );
};

export default NotFound;
