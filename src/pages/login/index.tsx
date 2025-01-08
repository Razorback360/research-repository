import { signIn } from "next-auth/react";
import { useState } from "react";
import Link from "next/link";
import { IoLogoLinkedin, IoLogoMicrosoft, IoLogoGoogle } from "react-icons/io5";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Loader from "@app/components/Loader";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const session = useSession();
  const router = useRouter();
  if (session.status === "authenticated") {
    router.push("/");
  }

  if (session.status === "loading") {
    return <Loader />;
  }

  return (
    <div className="flex justify-center items-center h-full bg-gray-100 ">
      <div className="max-w-md w-full p-8 bg-white rounded-lg shadow-md text-center mt-10 mb-10">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Welcome Back!</h1>
        <p className="text-gray-600 mb-6">Please log in to continue</p>
        <form className="flex flex-col items-center w-full max-w-md">
          <label className="w-full text-left font-medium text-gray-700 mt-4">
            Email Address
          </label>
          <input
            type="email"
            placeholder="Placeholder"
            className="w-full p-3 bg-gray-200 rounded-lg mt-1 focus:outline-none focus:ring-2 focus:ring-gray-400"
            onChange={(e) => setEmail(e.target.value)}
          />
          <label className="w-full text-left font-medium text-gray-700 mt-4">
            Password
          </label>
          <input
            type="password"
            placeholder="Placeholder"
            className="w-full p-3 bg-gray-200 rounded-lg mt-1 focus:outline-none focus:ring-2 focus:ring-gray-400"
            onChange={(e) => setPassword(e.target.value)}
          />
          <p className="text-sm text-gray-500 text-left w-full mt-2">
            It must be a combination of minimum 8 letters, numbers, and symbols.
          </p>
          <div className="flex justify-between items-center w-full mt-4">
            <div className="flex items-center">
              <input type="checkbox" className="mr-2" />
              <label className="text-sm text-gray-700">Remember me</label>
            </div>
            <div className="text-sm text-blue-500">
              <a href="#" className="hover:underline">
                Forgot password?
              </a>
            </div>
          </div>
          <button
            type="submit"
            className="w-full p-3 bg-blue-500 text-white font-semibold rounded-lg mt-4 hover:bg-primary"
            onClick={(e) => {
              e.preventDefault();
              signIn("credentials", {
                email: email,
                password: password,
              });
            }}
          >
            Log In
          </button>
          <p className="text-sm text-gray-600 mt-4">
            No account yet?{" "}
            <Link href="/signup" className="text-blue-500 hover:underline">
              Sign Up!
            </Link>
          </p>
          <hr className="text-black w-full mt-3" />
          <p className="text-sm text-gray-600 mt-2">Or</p>
          <button
            type="submit"
            className="w-full p-3 bg-blue-500 text-white font-semibold rounded-lg mt-2 hover:bg-primary"
            onClick={(e) => {
              e.preventDefault();
              signIn("azure-ad");
            }}
          >
            Log In with Microsoft <IoLogoMicrosoft className="inline" />
          </button>
          <button
            type="submit"
            className="w-full p-3 bg-blue-500 text-white font-semibold rounded-lg mt-2 hover:bg-primary"
            onClick={(e) => {
              e.preventDefault();
              signIn("google");
            }}
          >
            Log In with Google <IoLogoGoogle className="inline" />
          </button>
          <button
            type="submit"
            className="w-full p-3 bg-blue-500 text-white font-semibold rounded-lg mt-2 hover:bg-primary"
            onClick={(e) => {
              e.preventDefault();
              signIn("linkedin");
            }}
          >
            Log In with LinkedIn <IoLogoLinkedin className="inline" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
