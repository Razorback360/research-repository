import { useState } from "react";
import Link from "next/link";
import { appFetcher } from "@app/utils/fetcher";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Loader from "@app/components/Loader";
import axios from "axios";
import { useTranslations } from "next-intl";

const Signup = () => {
  const t = useTranslations('signup');
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
      const req = await appFetcher.post("/api/auth/register", data, {
        headers: { "Content-Type": "application/json" },
      });
      if (req.status === 201) {
        location.href = "/auth/login";
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response && error.response.status === 409) {
        setErrorMessage(t('errors.emailExists'));
      } else {
        setErrorMessage(t('errors.generic'));
      }
    }
  };
  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="max-w-md w-full p-8 bg-white rounded-lg shadow-md text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">{t('title')}</h1>
        <p className="text-gray-600 mb-6">{t('subtitle')}</p>
        <form className="flex flex-col items-center w-full max-w-md" onSubmit={handleSubmit}>
          <label className="w-full text-start font-medium text-gray-700 mt-4">
            {t('firstName')}
          </label>
          <input
            type="text"
            name="firstName"
            placeholder={t('firstName')}
            className="w-full p-3 bg-gray-200 rounded-lg mt-1 focus:outline-hidden focus:ring-2 focus:ring-gray-400"
            onChange={handleChange}
            required
          />
          <label className="w-full text-start font-medium text-gray-700 mt-4">
            {t('middleName')}
          </label>
          <input
            type="text"
            name="middleName"
            placeholder={t('middleName')}
            className="w-full p-3 bg-gray-200 rounded-lg mt-1 focus:outline-hidden focus:ring-2 focus:ring-gray-400"
            onChange={handleChange}
          />
          <label className="w-full text-start font-medium text-gray-700 mt-4">
            {t('lastName')}
          </label>
          <input
            type="text"
            name="lastName"
            placeholder={t('lastName')}
            className="w-full p-3 bg-gray-200 rounded-lg mt-1 focus:outline-hidden focus:ring-2 focus:ring-gray-400"
            onChange={handleChange}
            required
          />          <label className="w-full text-start font-medium text-gray-700 mt-4">
            {t('emailAddress')}
          </label>
          <input
            type="email"
            name="email"
            placeholder={t('emailAddress')}
            className="w-full p-3 bg-gray-200 rounded-lg mt-1 focus:outline-hidden focus:ring-2 focus:ring-gray-400"
            onChange={handleChange}
            required
          />
          <label className="w-full text-start font-medium text-gray-700 mt-4">
            {t('password')}
          </label>
          <input
            type="password"
            name="pass"
            placeholder={t('password')}
            className="w-full p-3 bg-gray-200 rounded-lg mt-1 focus:outline-hidden focus:ring-2 focus:ring-gray-400"
            onChange={handleChange}
            required
          />
          <label className="w-full text-start font-medium text-gray-700 mt-4">
            {t('confirmPassword')}
          </label>
          <input
            type="password"
            name="confirm"
            placeholder={t('confirmPassword')}
            className="w-full p-3 bg-gray-200 rounded-lg mt-1 focus:outline-hidden focus:ring-2 focus:ring-gray-400"
            onChange={handleChange}
            required
          />
          {!passwordMatch && (
            <p className="text-red-500 text-sm mt-2">{t('errors.passwordMismatch')}</p>
          )}
          {errorMessage && (
            <p className="text-red-500 text-sm mt-2">{errorMessage}</p>
          )}
          <p className="text-sm text-gray-500 text-start w-full mt-2 mb-4">
            {t('passwordRequirements')}
          </p>
          <button
            type="submit"
            className="w-full p-3 bg-blue-500 text-white font-semibold rounded-lg mt-4 hover:bg-primary"
          >
            {t('signupButton')}
          </button>
          <p className="text-gray-600 mt-4">
            {t('haveAccount')}{' '}
            <Link href="/auth/login" className="text-blue-500 hover:underline">
              {t('signIn')}
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;