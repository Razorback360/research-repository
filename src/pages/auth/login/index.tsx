import { signIn } from "next-auth/react";
import { useState } from "react";
import Link from "next/link";
import { IoLogoLinkedin, IoLogoMicrosoft, IoLogoGoogle } from "react-icons/io5";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Loader from "@app/components/Loader";
import { useTranslations } from "next-intl";

const Login = () => {
  const t = useTranslations("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const session = useSession();
  const router = useRouter();
  if (session.status === "loading") {
    return <Loader />;
  }
  if (session.status === "authenticated") {
    router.push("/");
    return <Loader />;
  }

  return (
    <div className="flex justify-center items-center h-full bg-gray-100 ">
      <div className="max-w-md w-full p-8 bg-white rounded-lg shadow-md text-center mt-10 mb-10">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">{t("title")}</h1>
        <p className="text-gray-600 mb-6">{t("subtitle")}</p>
        <form className="flex flex-col items-center w-full max-w-md">
          <label className="w-full text-start font-medium text-gray-700 mt-4">
            {t("emailAddress")}
          </label>
          <input
            type="email"
            placeholder={t("placeholder")}
            className="w-full p-3 bg-gray-200 rounded-lg mt-1 focus:outline-hidden focus:ring-2 focus:ring-gray-400"
            onChange={(e) => setEmail(e.target.value)}
          />
          <label className="w-full text-start font-medium text-gray-700 mt-4">
            {t("password")}
          </label>
          <input
            type="password"
            placeholder={t("placeholder")}
            className="w-full p-3 bg-gray-200 rounded-lg mt-1 focus:outline-hidden focus:ring-2 focus:ring-gray-400"
            onChange={(e) => setPassword(e.target.value)}
          />{" "}
          <p className="text-sm text-gray-500 text-start w-full mt-2">
            {t("passwordRequirements")}
          </p>
          {error && (
            <div className="w-full mt-2 p-2 bg-red-100 text-red-700 rounded-lg text-sm">
              {error}
            </div>
          )}
          <div className="flex justify-between items-center w-full mt-4">
            <div className="flex items-center">
              <input type="checkbox" className="me-2" />
              <label className="text-sm text-gray-700">{t("rememberMe")}</label>
            </div>
            <div className="text-sm text-blue-500">
              <a href="#" className="hover:underline">
                {t("forgotPassword")}
              </a>
            </div>
          </div>
          <button
            type="submit"
            className="w-full p-3 bg-blue-500 text-white font-semibold rounded-lg mt-4 hover:bg-primary"
            onClick={(e) => {
              e.preventDefault();
              setError("");
              signIn("credentials", {
                email: email,
                password: password,
                redirect: false,
              }).then((response) => {
                if (response?.error) {
                  setError(t("errorGeneric"));
                }
              });
            }}
          >
            {t("loginButton")}
          </button>
          <p className="text-sm text-gray-600 mt-4">
            {t("noAccount")}{" "}
            <Link href="/auth/signup" className="text-blue-500 hover:underline">
              {t("signUp")}
            </Link>
          </p>
          <hr className="text-black w-full mt-3" />
          <p className="text-sm text-gray-600 mt-2">{t("or")}</p>
          <button
            type="submit"
            className="w-full p-3 bg-blue-500 text-white font-semibold rounded-lg mt-2 hover:bg-primary"
            onClick={(e) => {
              e.preventDefault();
              setError("");
              signIn("azure-ad", { redirect: false }).then((response) => {
                if (response?.error) {
                  setError(t("errorGeneric"));
                }
              });
            }}
          >
            {t("loginWithMicrosoft")} <IoLogoMicrosoft className="inline" />
          </button>
          <button
            type="submit"
            className="w-full p-3 bg-blue-500 text-white font-semibold rounded-lg mt-2 hover:bg-primary"
            onClick={(e) => {
              e.preventDefault();
              setError("");
              signIn("google", { redirect: false }).then((response) => {
                if (response?.error) {
                  setError(t("errorGeneric"));
                }
              });
            }}
          >
            {t("loginWithGoogle")} <IoLogoGoogle className="inline" />
          </button>
          <button
            type="submit"
            className="w-full p-3 bg-blue-500 text-white font-semibold rounded-lg mt-2 hover:bg-primary"
            onClick={(e) => {
              e.preventDefault();
              setError("");
              signIn("linkedin", { redirect: false }).then((response) => {
                if (response?.error) {
                  setError(t("errorGeneric"));
                }
              });
            }}
          >
            {t("loginWithLinkedIn")} <IoLogoLinkedin className="inline" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
