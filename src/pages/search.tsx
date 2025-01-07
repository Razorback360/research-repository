import React, { useEffect, useState } from "react";
import Link from "next/link";
import { axiosInstance } from "@app/utils/fetcher";

type Dataset = {
  id: string;
  title: string;
  description: string;
};

type Paper = {
  id: string;
  title: string;
  abstract: string;
};

type SearchResults = {
  datasets: Dataset[];
  papers: Paper[];
};

const SearchPage = () => {
  const [query, setQuery] = useState("");
  const [type, setType] = useState("all");
  const [results, setResults] = useState<SearchResults>({ datasets: [], papers: []});

  useEffect(() => {
    const search = async () => {
      const req = await axiosInstance
        .get(`/api/search?type=${type}&query=${query}`)
        .catch((err) => {
          console.error(err);
        });
      if (req) setResults(req.data);
      console.log(results)
    };
    search();
  }, [query, type]);

  return (
    <div className="mx-auto p-4 h-full flex flex-col items-center w-full">
      <div className="flex flex-row md:flex-row items-center gap-4 mb-6 w-1/2">
        <input
          type="text"
          placeholder="Search here..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full md:w-3/4 p-2 border border-gray-400 rounded"
        />
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="p-2 border border-gray-400 rounded"
        >
          <option value="all">All</option>
          <option value="dataset">Datasets</option>
          <option value="paper">Papers</option>
        </select>
        <button
          onClick={() => {
            setQuery(query);
          }}
          className="p-2 bg-primary text-white rounded hover:bg-blue-950"
        >
          Search
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
        {results.datasets.map((item, index) => (
            <Link
              key={index}
              className="bg-white p-4 border border-gray-300 rounded shadow w-full h-48 hover:shadow-lg"
              href={`/view/dataset/${item.id}`}
            >
              <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
              <p className="text-sm text-gray-600">{item.description}</p>
            </Link>
        ))}
        {results.papers.map((item, index) => (
            <Link
              key={index}
              className="bg-white p-4 border border-gray-300 rounded shadow w-full h-48 hover:shadow-lg overflow-hidden text-ellipsis"
              href={`/view/dataset/${item.id}`}
            >
              <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
              <p className="text-sm text-gray-600">{item.abstract}</p>
            </Link>
        ))}
      </div>
    </div>
  );
};

export default SearchPage;
