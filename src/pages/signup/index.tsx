import { useState } from "react";
import Link from "next/link";
import { appFetcher } from "@app/utils/fetcher";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Loader from "@app/components/Loader";
import axios from "axios";

const Signup = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    email: "",
    pass: "",
    confirm: "",
  });
  const [passwordMatch, setPasswordMatch] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const session = useSession();
  const router = useRouter();
  if (session.status === "loading") {
    return <Loader />;
  }
  if (session.status === "authenticated") {
    router.push("/");
    return <Loader/>
  }


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.pass !== formData.confirm) {
      setPasswordMatch(false);
      return;
    }
    setPasswordMatch(true);

    const fullName = `${formData.firstName} ${formData.middleName} ${formData.lastName}`.trim();
    const data = {
      name: fullName,
      pass: formData.pass,
      email: formData.email,
    };

    try {
      const req = await appFetcher.post("/api/register", data, {
        headers: { "Content-Type": "application/json" },
      });
      if (req.status === 201) {
        location.href = "/login";
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response && error.response.status === 409) {
        setErrorMessage("User with provided email already exists.");
      } else {
        setErrorMessage("An error occurred during registration. Please try again.");
      }
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="max-w-md w-full p-8 bg-white rounded-lg shadow-md text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Welcome!</h1>
        <p className="text-gray-600 mb-6">Please sign up to continue</p>
        <form className="flex flex-col items-center w-full max-w-md" onSubmit={handleSubmit}>
          <label className="w-full text-left font-medium text-gray-700 mt-4">
            First Name
          </label>
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            className="w-full p-3 bg-gray-200 rounded-lg mt-1 focus:outline-hidden focus:ring-2 focus:ring-gray-400"
            onChange={handleChange}
            required
          />
          <label className="w-full text-left font-medium text-gray-700 mt-4">
            Middle Name
          </label>
          <input
            type="text"
            name="middleName"
            placeholder="Middle Name"
            className="w-full p-3 bg-gray-200 rounded-lg mt-1 focus:outline-hidden focus:ring-2 focus:ring-gray-400"
            onChange={handleChange}
          />
          <label className="w-full text-left font-medium text-gray-700 mt-4">
            Last Name
          </label>
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            className="w-full p-3 bg-gray-200 rounded-lg mt-1 focus:outline-hidden focus:ring-2 focus:ring-gray-400"
            onChange={handleChange}
            required
          />
          <label className="w-full text-left font-medium text-gray-700 mt-4">
            Email Address
          </label>
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            className="w-full p-3 bg-gray-200 rounded-lg mt-1 focus:outline-hidden focus:ring-2 focus:ring-gray-400"
            onChange={handleChange}
            required
          />
          <label className="w-full text-left font-medium text-gray-700 mt-4">
            Password
          </label>
          <input
            type="password"
            name="pass"
            placeholder="Password"
            className="w-full p-3 bg-gray-200 rounded-lg mt-1 focus:outline-hidden focus:ring-2 focus:ring-gray-400"
            onChange={handleChange}
            required
          />
          <label className="w-full text-left font-medium text-gray-700 mt-4">
            Confirm Password
          </label>
          <input
            type="password"
            name="confirm"
            placeholder="Confirm Password"
            className="w-full p-3 bg-gray-200 rounded-lg mt-1 focus:outline-hidden focus:ring-2 focus:ring-gray-400"
            onChange={handleChange}
            required
          />
          {!passwordMatch && (
            <p className="text-red-500 text-sm mt-2">Passwords do not match</p>
          )}
          {errorMessage && (
            <p className="text-red-500 text-sm mt-2">{errorMessage}</p>
          )}
          <p className="text-sm text-gray-500 text-left w-full mt-2 mb-4">
            It must be a combination of minimum 8 letters, numbers, and symbols.
          </p>
          <button
            type="submit"
            className="w-full p-3 bg-blue-500 text-white font-semibold rounded-lg mt-4 hover:bg-primary"
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