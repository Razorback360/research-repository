import React, { useState, useMemo } from 'react';
import { FiSearch, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { DatasetStructure, MappingData } from '@interfaces/pages';

interface DataTableProps {
  dataset: DatasetStructure;
  mappings: MappingData;
}

const DataTable: React.FC<DataTableProps> = ({ dataset, mappings }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [rowsPerPage] = useState(10);

  const getCellValue = (value: number | string | null, columnName: string): string => {
    if (value === null || value === undefined) {
      return '-';
    }
    
    const stringValue = String(value);
    const mapping = mappings.labels[columnName];
    
    if (mapping && mapping[stringValue]) {
      return mapping[stringValue];
    }
    
    return stringValue;
  };

  const getColumnLabel = (columnName: string): string => {
    return mappings.variableLabels[columnName] || columnName;
  };

  const filteredRows = useMemo(() => {
    if (!searchTerm) return dataset.rows;
    
    return dataset.rows.filter(row =>
      row.some(cell => {
        const cellValue = String(cell || '').toLowerCase();
        return cellValue.includes(searchTerm.toLowerCase());
      })
    );
  }, [dataset.rows, searchTerm]);

  const totalPages = Math.ceil(filteredRows.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const currentRows = filteredRows.slice(startIndex, endIndex);

  const handlePreviousPage = () => {
    setCurrentPage(prev => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage(prev => Math.min(prev + 1, totalPages));
  };

  return (
    <div className="space-y-6">
      {/* Header and Search */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Data Table</h2>
          <p className="text-gray-600 mt-1">
            Showing {startIndex + 1} to {Math.min(endIndex, filteredRows.length)} of {filteredRows.length} entries
          </p>
        </div>
        <div className="relative w-full sm:w-64">
          <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search data..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
          />
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                {dataset.headers.map((header, index) => (
                  <th
                    key={header}
                    className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-200 min-w-[120px]"
                    title={getColumnLabel(header)}
                  >
                    <div className="truncate">
                      {header}
                    </div>
                    <div className="text-xs font-normal text-gray-400 mt-1 truncate">
                      {getColumnLabel(header)}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {currentRows.map((row, rowIndex) => (
                <tr
                  key={startIndex + rowIndex}
                  className={rowIndex % 2 === 0 ? 'bg-white' : 'bg-gray-50'}
                >
                  {row.map((cell, cellIndex) => (
                    <td
                      key={cellIndex}
                      className="px-4 py-3 whitespace-nowrap text-sm text-gray-900 border-b border-gray-100"
                    >
                      <div className="truncate max-w-[200px]" title={getCellValue(cell, dataset.headers[cellIndex])}>
                        {getCellValue(cell, dataset.headers[cellIndex])}
                      </div>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <div className="text-sm text-gray-700">
          Page {currentPage} of {totalPages}
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <FiChevronLeft />
            Previous
          </button>
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Next
            <FiChevronRight />
          </button>
        </div>
      </div>
    </div>
  );
};

export default DataTable;