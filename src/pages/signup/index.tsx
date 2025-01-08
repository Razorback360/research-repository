import { useState } from "react";
import Link from "next/link";
import { axiosInstance } from "@app/utils/fetcher";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Loader from "@app/components/Loader";

const Signup = () => {
  const [userName, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [confirm, setConfirm] = useState("");

  console.log(confirm)
  const session = useSession();
  const router = useRouter();
  if (session.status === "authenticated") {
    router.push("/");
  }

  if (session.status === "loading") {
    return <Loader />;
  }

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="max-w-md w-full p-8 bg-white rounded-lg shadow-md text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Welcome!</h1>
        <p className="text-gray-600 mb-6">Please sign up to continue</p>
        <form className="flex flex-col items-center w-full max-w-md">
          <label className="w-full text-left font-medium text-gray-700 mt-4">
            Full Name
          </label>
          <input
            type="text"
            placeholder="Placeholder"
            className="w-full p-3 bg-gray-200 rounded-lg mt-1 focus:outline-none focus:ring-2 focus:ring-gray-400"
            onChange={(e) => setUsername(e.target.value)}
          />
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
            onChange={(e) => setPass(e.target.value)}
          />
          <label className="w-full text-left font-medium text-gray-700 mt-4">
            Confirm Password
          </label>
          <input
            type="password"
            placeholder="Placeholder"
            className="w-full p-3 bg-gray-200 rounded-lg mt-1 focus:outline-none focus:ring-2 focus:ring-gray-400"
            onChange={(e) => setConfirm(e.target.value)}
          />
          <p className="text-sm text-gray-500 text-left w-full mt-2 mb-4">
            It must be a combination of minimum 8 letters, numbers, and symbols.
          </p>
          <button
            type="submit"
            className="w-full p-3 bg-blue-500 text-white font-semibold rounded-lg mt-4 hover:bg-primary"
            onClick={async (e) => {
              e.preventDefault();
              const data = new FormData();
              data.append("name", userName);
              data.append("pass", pass);
              data.append("email", email);
              const req = await axiosInstance.post("/api/register", data, {
                headers: { "Content-Type": "application/json" },
              });
              if (req.status === 201) {
                location.href = "/login";
              }
            }}
          >
            Sign Up
          </button>
          <p className="text-gray-600 mt-4">
            Have an account?{" "}
            <Link href="/login" className="text-blue-500 hover:underline">
              Sign in
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
