import React, { useEffect, useState } from 'react';
import { HiMagnifyingGlass, HiFunnel } from 'react-icons/hi2';
import { HiBookOpen, HiDatabase, HiExternalLink } from 'react-icons/hi';
import { appFetcher } from '@app/utils/fetcher';

interface SearchResult {
  id: string;
  title: string;
  description: string | null;
  abstract: string | null;
  type: 'paper' | 'dataset';
  user: {
    name: string;
    email: string;
  };
  publishDate: string;
}

function Search() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<'all' | 'paper' | 'dataset'>('all');
  const [sortBy, setSortBy] = useState<'relevance' | 'date' | 'citations'>('relevance');
  const [results, setResults] = useState<SearchResult[]>([]);


  useEffect(() => {
      const search = async () => {
        const req = await appFetcher
          .get(`/api/search?type=${selectedType}&query=${searchTerm}`)
          .catch((err) => {
            console.error(err);
          });
        if (req) setResults(req.data);
        console.log(results)
      };
      if(searchTerm) search();
    }, [searchTerm, selectedType]);

  // const filteredResults = mockResults.filter(result => {
  //   const matchesSearch = result.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //                        result.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //                        result.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //                        result.author.toLowerCase().includes(searchTerm.toLowerCase());
  //   const matchesType = selectedType === 'all' || result.type === selectedType;
  //   return matchesSearch && matchesType;
  // });

  return (
    <div className="min-h-screen bg-gray-50 w-full">
      {/* Hero Search Section */}
      <div className="bg-white shadow-xs">
        <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-900 text-center mb-8">
              Discover Research & Datasets
            </h1>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <HiMagnifyingGlass className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-4 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-hidden focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 text-lg"
                placeholder="Search papers, datasets, authors..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Results */}
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div className="flex items-center space-x-4 mb-4 md:mb-0">
          <HiFunnel className="h-5 w-5 text-gray-400" />
          <select
            className="block w-full pl-3 shadow-md pr-10 py-2 text-base border-gray-300 focus:outline-hidden focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value as 'all' | 'paper' | 'dataset')}
          >
            <option value="all">All Types</option>
            <option value="paper">Papers</option>
            <option value="dataset">Datasets</option>
          </select>
        </div>
        <div className="flex items-center space-x-1">
          <span className="text-sm text-gray-500 w-1/2">Sort by:</span>
          <select
            className="block w-full pl-3 pr-2 shadow-md py-2 text-base border-gray-300 focus:outline-hidden focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as 'relevance' | 'date')}
          >
            <option value="relevance">Relevance</option>
            <option value="date">Date</option>
          </select>
        </div>
      </div>

      {/* Results */}
      <div className="space-y-6">
        {results.map((result) => (
          <div key={result.id} className="bg-white shadow-sm rounded-lg p-6">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-2">
                  {result.type === 'paper' ? (
                    <HiBookOpen className="h-5 w-5 text-blue-500" />
                  ) : (
                    <HiDatabase className="h-5 w-5 text-green-500" />
                  )}
                  <span className={`text-sm font-medium px-2.5 py-0.5 rounded-full capitalize ${
                    result.type === 'paper' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'
                  }`}>
                    {result.type}
                  </span>
                </div>
                <h2 className="mt-2 text-xl font-semibold text-gray-900">
                  <a href={`/view/${result.type}/${result.id}`} className="hover:text-blue-600">
                    {result.title}
                  </a>
                </h2>
                <p className="mt-2 text-gray-600">{result.description || result.abstract}</p>
                <div className="mt-4 flex items-center space-x-4 text-sm text-gray-500">
                  <span>{result.user.name}</span>
                  <span>•</span>
                  {/* TODO: Fix publishDate on dataset, replace built in date with result.publishDate */}
                  <span>{new Date("2025-02-06").toLocaleDateString()}</span> 
                </div>
              </div>
              <div className="ml-6 flex items-center space-x-3">
                <a
                  href={`/view/${result.type}/${result.id}`}
                  className="text-gray-400 hover:text-gray-500"
                  title="View Details"
                >
                  <HiExternalLink className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
    </div>
  );
}

export default Search;