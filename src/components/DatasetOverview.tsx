import React from 'react';
import { FiDatabase, FiGrid, FiFileText, FiInfo } from 'react-icons/fi';
import { DatasetInfo } from '@interfaces/pages';

interface DatasetOverviewProps {
  datasetInfo: DatasetInfo;
  datasetDesc: String;
  datasetTitle: String;
  datasetId: String;
}

const DatasetOverview: React.FC<DatasetOverviewProps> = ({ datasetInfo, datasetDesc, datasetTitle, datasetId }) => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-primary text-white p-6 rounded-lg shadow-md">
        <div className="flex items-center gap-3 mb-2">
          <FiDatabase className="text-2xl" />
          <h1 className="text-2xl font-bold">Dataset Overview</h1>
        </div>
        <p className="text-blue-100 text-lg">{datasetTitle}</p>
        <p className="text-blue-100 text-lg">{datasetDesc}</p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">File Size</p>
              <p className="text-2xl font-bold text-gray-900">{datasetInfo.fileSize}</p>
            </div>
            <FiFileText className="text-3xl text-blue-500" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Columns</p>
              <p className="text-2xl font-bold text-gray-900">{datasetInfo.totalColumns.toLocaleString()}</p>
            </div>
            <FiGrid className="text-3xl text-green-500" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Rows</p>
              <p className="text-2xl font-bold text-gray-900">{datasetInfo.totalRows.toLocaleString()}</p>
            </div>
            <FiDatabase className="text-3xl text-purple-500" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Values</p>
              <p className="text-2xl font-bold text-gray-900">{datasetInfo.totalValues.toLocaleString()}</p>
            </div>
            <FiInfo className="text-3xl text-orange-500" />
          </div>
        </div>
      </div>

      {/* Column Information */}
      <div className="bg-white rounded-lg shadow-md border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
            <FiGrid className="text-blue-600" />
            Column Information
          </h2>
        </div>
        <div className="p-6">
          <div className="overflow-x-auto">
            <table className="w-full table-auto">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    #
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Column Name
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Format
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {datasetInfo.columns.map((column, index) => (
                  <tr key={column.name} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                      {String(index + 1).padStart(2, '0')}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">
                      {column.name}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {column.type}
                      </span>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500 font-mono">
                      {column.format}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DatasetOverview;