import { signIn } from "next-auth/react";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { appFetcher } from "@app/utils/fetcher";

const Reset = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [isValidToken, setIsValidToken] = useState(true);
  const [reset, setReset] = useState(false);
  const session = useSession();
  const router = useRouter();
  const { token } = router.query;


  if (!isValidToken) {
    return (
      <div className="flex justify-center items-center h-full bg-gray-100 min-h-screen">
        <div className="max-w-md w-full p-8 bg-white rounded-lg shadow-md text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Invalid Reset Link</h1>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={() => router.push('/auth/login')}
            className="w-full p-3 bg-blue-500 text-white font-semibold rounded-lg mt-4 hover:bg-primary"
          >
            Go Back to Login
          </button>
        </div>
      </div>
    );
  }

  if (reset) {
    return (
      <main className="flex flex-col items-center p-8 h-full justify-center">
            <h1 className="text-center text-6xl font-bold">
                Password Reset!
            </h1>
            <p className="text-center max-w-lg mt-4 text-lg mb-0">
                Your password has been successfully reset! Redirecting to login page.
            </p>
        </main>
    );
  }

  return (
    <div className="flex justify-center items-center h-full bg-gray-100">
      <div className="max-w-md w-full p-8 bg-white rounded-lg shadow-md text-center mt-10 mb-10">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Password Reset</h1>
        <p className="text-gray-600 mb-6">Please enter your new chosen password</p>
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4" role="alert">
            <p>{error}</p>
          </div>
        )}
        <form className="flex flex-col items-center w-full max-w-md">
          <label className="w-full text-left font-medium text-gray-700 mt-4">
            New Password
          </label>
          <input
            type="password"
            placeholder="Enter your new password"
            className="w-full p-3 bg-gray-200 rounded-lg mt-1 focus:outline-hidden focus:ring-2 focus:ring-gray-400"
            onChange={(e) => setPassword(e.target.value)}
          />
          <label className="w-full text-left font-medium text-gray-700 mt-4">
            Confirm Password
          </label>
          <input
            type="password"
            placeholder="Confirm your new password"
            className="w-full p-3 bg-gray-200 rounded-lg mt-1 focus:outline-hidden focus:ring-2 focus:ring-gray-400"
            onChange={(e) => setConfirmPassword(e.target.value)}
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
            onClick={async (e) => {
              e.preventDefault();
              setError("");

              if (!password) {
                setError("Password is required");
                return;
              }

              const passwordValidator = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&*]{8,}$/;
              if (!passwordValidator.test(password)) {
                setError("Password must be at least 8 characters long and include letters, numbers, and symbols.");
                return;
              }
              
              if (password !== confirmPassword) {
                setError("Passwords do not match");
                return;
              }
              try {
                const response = await appFetcher.patch(`/api/auth/reset`, {
                  token,
                  password,
                });
                if(response.status === 200){
                    setReset(true);
                    setTimeout(() => {
                      router.push("/auth/login");
                    }, 2000);
                }
              } catch (err) {
                setIsValidToken(false);
              }
            
            }}
          >
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default Reset;
