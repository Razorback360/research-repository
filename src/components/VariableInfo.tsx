import React, { useState } from 'react';
import { FiSearch, FiTag, FiList } from 'react-icons/fi';
import { MappingData, DatasetInfo } from '@interfaces/pages';

interface VariableInfoProps {
  mappings: MappingData;
  datasetInfo: DatasetInfo;
}

const VariableInfo: React.FC<VariableInfoProps> = ({ mappings, datasetInfo }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredVariables = datasetInfo.columns.filter(column => {
    const label = mappings.variableLabels[column.name] || column.name;
    return column.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
           label.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const getValueLabels = (columnName: string) => {
    const labels = mappings.labels[columnName];
    if (!labels) return null;
    
    return Object.entries(labels).map(([key, value]) => ({
      key,
      value
    }));
  };

  return (
    <div className="space-y-6">
      {/* Header and Search */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Variable Information</h2>
          <p className="text-gray-600 mt-1">
            Showing {filteredVariables.length} of {datasetInfo.columns.length} variables
          </p>
        </div>
        <div className="relative w-full sm:w-64">
          <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search variables..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
          />
        </div>
      </div>

      {/* Variables Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredVariables.map((column, index) => {
          const label = mappings.variableLabels[column.name] || 'No description available';
          const valueLabels = getValueLabels(column.name);
          
          return (
            <div key={column.name} className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
              {/* Header */}
              <div className="bg-gradient-to-r from-slate-50 to-slate-100 p-4 border-b border-gray-200">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                      <FiTag className="text-blue-600" />
                      {column.name}
                    </h3>
                    <p className="text-sm text-gray-600 mt-1" dir="auto">
                      {label}
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {column.type}
                    </span>
                    <div className="text-xs text-gray-500 mt-1 font-mono">
                      {column.format}
                    </div>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-4">
                {valueLabels ? (
                  <div>
                    <h4 className="text-sm font-medium text-gray-900 flex items-center gap-2 mb-3">
                      <FiList className="text-gray-600" />
                      Value Labels ({valueLabels.length})
                    </h4>
                    <div className="space-y-2 max-h-48 overflow-y-auto">
                      {valueLabels.map(({ key, value }) => (
                        <div key={key} className="flex items-center justify-between p-2 bg-gray-50 rounded-md">
                          <span className="font-mono text-sm text-gray-600">{key}</span>
                          <span className="text-sm text-gray-900 text-right" dir="auto">
                            {value}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-6">
                    <div className="text-gray-400 mb-2">
                      <FiList className="mx-auto text-2xl" />
                    </div>
                    <p className="text-sm text-gray-500">No value labels defined</p>
                    <p className="text-xs text-gray-400 mt-1">This variable contains raw numeric values</p>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {filteredVariables.length === 0 && (
        <div className="text-center py-12">
          <FiSearch className="mx-auto text-gray-400 text-4xl mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No variables found</h3>
          <p className="text-gray-500">Try adjusting your search criteria</p>
        </div>
      )}
    </div>
  );
};

export default VariableInfo;