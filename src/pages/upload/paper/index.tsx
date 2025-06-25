import React, { useState } from "react";
import { appFetcher } from "@app/utils/fetcher";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Loader from "@app/components/Loader";
import { useTranslations } from "next-intl";

const SubmitPaperForm = () => {
  const t = useTranslations("uploadPaper");
  const [authors, setAuthors] = useState([""]);
  const [formData, setFormData] = useState<{
    title: string;
    abstract: string;
    keyWords: string;
    volume: string;
    issue: string;
    journal: string;
    startPage: string;
    endPage: string;
    publishDate: string;
    doiLink: string;
    file: File | null;
    [key: string]: string | File | null;
  }>({
    title: "",
    abstract: "",
    keyWords: "",
    volume: "",
    issue: "",
    journal: "",
    startPage: "",
    endPage: "",
    publishDate: "",
    doiLink: "",
    file: null,
  });

  const session = useSession();
  const router = useRouter();
  if (session.status === "loading") {
    return <Loader />;
  }
  if (
    session.status === "unauthenticated" ||
    !session.data?.user?.permissions.WRITE
  ) {
    router.push("/login");
    return <Loader/>
  }

  const handleAddAuthor = () => {
    setAuthors([...authors, ""]);
  };

  const handleRemoveAuthor = (index: number) => {
    setAuthors(authors.filter((_, i) => i !== index));
  };

  const handleAuthorChange = (index: number, value: string) => {
    const updatedAuthors = [...authors];
    updatedAuthors[index] = value;
    setAuthors(updatedAuthors);
  };

  const handleFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, files } = e.target as HTMLInputElement;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Submit the form data to the backend or API
    // console.log("Form Data:", formData);
    // console.log("Authors:", authors);

    const copiedArray = formData;
    authors.map((author, index) => {
      copiedArray[`author${index + 1}`] = author;
    });

    // console.log("Copied Array:", copiedArray);
    const req = await appFetcher
      .post("/api/upload/paper", copiedArray, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .catch((err) => {
        console.error(err);
      });    if (req) {
      console.log(t("success"));
    }
  };
  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-6">{t("pageTitle")}</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Paper Title */}
        <div>
          <label
            className="block text-sm font-medium text-gray-700 mb-2"
            htmlFor="title"
          >
            {t("paperTitle")}
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleFormChange}
            className="w-full p-2 border border-gray-400 rounded-sm"
            required
          />
        </div>

        {/* Abstract */}
        <div>
          <label
            className="block text-sm font-medium text-gray-700 mb-2"
            htmlFor="abstract"
          >
            {t("abstract")}
          </label>
          <textarea
            id="abstract"
            name="abstract"
            value={formData.abstract}
            onChange={handleFormChange}
            rows={5}
            className="w-full p-2 border border-gray-400 rounded-sm"
            required
          ></textarea>
        </div>

        {/* Additional Fields */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label
              className="block text-sm font-medium text-gray-700 mb-2"
              htmlFor="volume"
            >
              {t("volume")}
            </label>
            <input
              type="text"
              id="volume"
              name="volume"
              value={formData.volume}
              onChange={handleFormChange}
              className="w-full p-2 border border-gray-400 rounded-sm"
            />
          </div>          <div>
            <label
              className="block text-sm font-medium text-gray-700 mb-2"
              htmlFor="issue"
            >
              {t("issue")}
            </label>
            <input
              type="text"
              id="issue"
              name="issue"
              value={formData.issue}
              onChange={handleFormChange}
              className="w-full p-2 border border-gray-400 rounded-sm"
            />
          </div>
          <div>
            <label
              className="block text-sm font-medium text-gray-700 mb-2"
              htmlFor="journal"
            >
              {t("journal")}
            </label>
            <input
              type="text"
              id="journal"
              name="journal"
              value={formData.journal}
              onChange={handleFormChange}
              className="w-full p-2 border border-gray-400 rounded-sm"
              required
            />
          </div>
          <div>
            <label
              className="block text-sm font-medium text-gray-700 mb-2"
              htmlFor="startPage"
            >
              {t("startPage")}
            </label>
            <input
              type="text"
              id="startPage"
              name="startPage"
              value={formData.startPage}
              onChange={handleFormChange}
              className="w-full p-2 border border-gray-400 rounded-sm"
            />
          </div>
          <div>
            <label
              className="block text-sm font-medium text-gray-700 mb-2"
              htmlFor="endPage"
            >
              {t("endPage")}
            </label>
            <input
              type="text"
              id="endPage"
              name="endPage"
              value={formData.endPage}
              onChange={handleFormChange}
              className="w-full p-2 border border-gray-400 rounded-sm"
            />
          </div>
          <div>
            <label
              className="block text-sm font-medium text-gray-700 mb-2"
              htmlFor="publishDate"
            >
              {t("publishDate")}
            </label>
            <input
              type="date"
              id="publishDate"
              name="publishDate"
              value={formData.publishDate}
              onChange={handleFormChange}
              className="w-full p-2 border border-gray-400 rounded-sm"
              required
            />
          </div>
          <div className="col-span-2">
            <label
              className="block text-sm font-medium text-gray-700 mb-2"
              htmlFor="doiLink"
            >
              {t("doiLink")}
            </label>
            <input
              type="text"
              id="doiLink"
              name="doiLink"
              value={formData.doiLink}
              onChange={handleFormChange}
              className="w-full p-2 border border-gray-400 rounded-sm"
            />
          </div>
        </div>        {/* Keywords */}
        <div>
          <label
            className="block text-sm font-medium text-gray-700 mb-2"
            htmlFor="keyWords"
          >
            {t("keywords")}
          </label>
          <input
            type="text"
            id="keyWords"
            name="keyWords"
            value={formData.keyWords}
            onChange={handleFormChange}
            className="w-full p-2 border border-gray-400 rounded-sm"
          />
        </div>

        {/* Authors */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t("authors")}
          </label>
          {authors.map((author, index) => (
            <div key={index} className="flex items-center gap-4 mb-2">
              <input
                type="text"
                value={author}
                onChange={(e) => handleAuthorChange(index, e.target.value)}
                placeholder={t("authorPlaceholder", { number: index + 1 })}
                className="w-full p-2 border border-gray-400 rounded-sm"
              />
              <button
                type="button"
                onClick={() => handleRemoveAuthor(index)}
                className="p-2 bg-red-500 text-white rounded-sm hover:bg-red-700"
              >
                {t("removeAuthor")}
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={handleAddAuthor}
            className="mt-2 p-2 bg-primary text-white rounded-sm hover:bg-blue-950"
          >
            {t("addMoreAuthors")}
          </button>
        </div>

        {/* Paper File */}
        <div>
          <label
            className="block text-sm font-medium text-gray-700 mb-2"
            htmlFor="file"
          >
            {t("uploadFile")}
          </label>
          <input
            type="file"
            id="file"
            name="file"
            accept=".pdf"
            onChange={handleFormChange}
            className="w-full p-2 border border-gray-400 rounded-sm"
            required
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full p-2 bg-primary text-white rounded-sm hover:bg-blue-950"
        >
          {t("submitButton")}
        </button>
      </form>
    </div>
  );
};

export default SubmitPaperForm;
