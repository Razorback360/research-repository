import React, { useState } from "react";
import { appFetcher } from "@app/utils/fetcher";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Loader from "@app/components/Loader";

const SubmitDatasetForm = () => {
  const [formData, setFormData] = useState<{
    title: string;
    description: string;
    keyWords: string;
    file: File | null;
    [key: string]: string | File | null;
  }>({
    title: "",
    description: "",
    keyWords: "",
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
    router.push("/auth/login");
    return <Loader/>
  }


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
    // Submit the form data to the API
    const req = await appFetcher
      .post("/api/upload/dataset", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .catch((err) => {
        console.error(err);
      });
    if (req) {
      console.log("Dataset submitted successfully!");
    }
  };

  return (
    <div className="container mx-auto p-4 h-full">
      <h2 className="text-2xl font-semibold mb-6">Submit a Paper</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Dataset Title */}
        <div>
          <label
            className="block text-sm font-medium text-gray-700 mb-2"
            htmlFor="title"
          >
            Dataset Title
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

        {/* description */}
        <div>
          <label
            className="block text-sm font-medium text-gray-700 mb-2"
            htmlFor="description"
          >
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleFormChange}
            rows={5}
            className="w-full p-2 border border-gray-400 rounded-sm"
            required
          ></textarea>
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
            className="w-full p-2 border border-gray-400 rounded-sm"
          />
        </div>


        {/* Dataset File */}
        <div>
          <label
            className="block text-sm font-medium text-gray-700 mb-2"
            htmlFor="file"
          >
            Upload Dataset File (SAV)
          </label>
          <input
            type="file"
            id="file"
            name="file"
            accept=".sav"
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
          Submit Dataset
        </button>
      </form>
    </div>
  );
};

export default SubmitDatasetForm;
