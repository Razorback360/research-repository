import React, { useState } from "react";
import { axiosInstance } from "@app/utils/fetcher";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Loader from "@app/components/Loader";

const SubmitPaperForm = () => {
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
  if (
    session.status === "unauthenticated" ||
    !session.data?.user?.permissions.WRITE
  ) {
    router.push("/login");
  }

  if (session.status === "loading") {
    return <Loader />;
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
    const req = await axiosInstance
      .post("/api/upload/paper", copiedArray, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .catch((err) => {
        console.error(err);
      });
    if (req) {
      console.log("Paper submitted successfully!");
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-6">Submit a Paper</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Paper Title */}
        <div>
          <label
            className="block text-sm font-medium text-gray-700 mb-2"
            htmlFor="title"
          >
            Paper Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleFormChange}
            className="w-full p-2 border border-gray-400 rounded"
            required
          />
        </div>

        {/* Abstract */}
        <div>
          <label
            className="block text-sm font-medium text-gray-700 mb-2"
            htmlFor="abstract"
          >
            Abstract
          </label>
          <textarea
            id="abstract"
            name="abstract"
            value={formData.abstract}
            onChange={handleFormChange}
            rows={5}
            className="w-full p-2 border border-gray-400 rounded"
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
              Volume
            </label>
            <input
              type="text"
              id="volume"
              name="volume"
              value={formData.volume}
              onChange={handleFormChange}
              className="w-full p-2 border border-gray-400 rounded"
            />
          </div>
          <div>
            <label
              className="block text-sm font-medium text-gray-700 mb-2"
              htmlFor="issue"
            >
              Issue
            </label>
            <input
              type="text"
              id="issue"
              name="issue"
              value={formData.issue}
              onChange={handleFormChange}
              className="w-full p-2 border border-gray-400 rounded"
            />
          </div>
          <div>
            <label
              className="block text-sm font-medium text-gray-700 mb-2"
              htmlFor="journal"
            >
              Journal
            </label>
            <input
              type="text"
              id="journal"
              name="journal"
              value={formData.journal}
              onChange={handleFormChange}
              className="w-full p-2 border border-gray-400 rounded"
              required
            />
          </div>
          <div>
            <label
              className="block text-sm font-medium text-gray-700 mb-2"
              htmlFor="startPage"
            >
              Start Page
            </label>
            <input
              type="text"
              id="startPage"
              name="startPage"
              value={formData.startPage}
              onChange={handleFormChange}
              className="w-full p-2 border border-gray-400 rounded"
            />
          </div>
          <div>
            <label
              className="block text-sm font-medium text-gray-700 mb-2"
              htmlFor="endPage"
            >
              End Page
            </label>
            <input
              type="text"
              id="endPage"
              name="endPage"
              value={formData.endPage}
              onChange={handleFormChange}
              className="w-full p-2 border border-gray-400 rounded"
            />
          </div>
          <div>
            <label
              className="block text-sm font-medium text-gray-700 mb-2"
              htmlFor="publishDate"
            >
              Publish Date
            </label>
            <input
              type="date"
              id="publishDate"
              name="publishDate"
              value={formData.publishDate}
              onChange={handleFormChange}
              className="w-full p-2 border border-gray-400 rounded"
              required
            />
          </div>
          <div className="col-span-2">
            <label
              className="block text-sm font-medium text-gray-700 mb-2"
              htmlFor="doiLink"
            >
              DOI Link
            </label>
            <input
              type="text"
              id="doiLink"
              name="doiLink"
              value={formData.doiLink}
              onChange={handleFormChange}
              className="w-full p-2 border border-gray-400 rounded"
            />
          </div>
        </div>

        {/* Keywords */}
        <div>
          <label
            className="block text-sm font-medium text-gray-700 mb-2"
            htmlFor="keyWords"
          >
            Keywords (comma-separated)
          </label>
          <input
            type="text"
            id="keyWords"
            name="keyWords"
            value={formData.keyWords}
            onChange={handleFormChange}
            className="w-full p-2 border border-gray-400 rounded"
          />
        </div>

        {/* Authors */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Authors
          </label>
          {authors.map((author, index) => (
            <div key={index} className="flex items-center gap-4 mb-2">
              <input
                type="text"
                value={author}
                onChange={(e) => handleAuthorChange(index, e.target.value)}
                placeholder={`Author ${index + 1}`}
                className="w-full p-2 border border-gray-400 rounded"
              />
              <button
                type="button"
                onClick={() => handleRemoveAuthor(index)}
                className="p-2 bg-red-500 text-white rounded hover:bg-red-700"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={handleAddAuthor}
            className="mt-2 p-2 bg-primary text-white rounded hover:bg-blue-950"
          >
            Add More Authors
          </button>
        </div>

        {/* Paper File */}
        <div>
          <label
            className="block text-sm font-medium text-gray-700 mb-2"
            htmlFor="file"
          >
            Upload Paper File (PDF)
          </label>
          <input
            type="file"
            id="file"
            name="file"
            accept=".pdf"
            onChange={handleFormChange}
            className="w-full p-2 border border-gray-400 rounded"
            required
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full p-2 bg-primary text-white rounded hover:bg-blue-950"
        >
          Submit Paper
        </button>
      </form>
    </div>
  );
};

export default SubmitPaperForm;
