import { useState, useEffect, useMemo } from 'react';

/**
 * Custom hook to handle table data filtering and processing
 * @param {Array} data - Original data array
 * @param {Array} filters - Fields to filter by
 * @param {string} searchTerm - Search term for filtering
 * @param {number} itemPerPage - Items per page
 * @returns {Object} Processed table data and utilities
 */
export const useTableData = (data, filters, searchTerm, itemPerPage) => {
  const [filteredData, setFilteredData] = useState(data || []);
  const [pageSize, setPageSize] = useState(itemPerPage);

  useEffect(() => {
    const filterFields = filters && filters.length > 0
      ? filters
      : (data && data.length > 0 ? Object.keys(data[0]) : []);

    if (!searchTerm) {
      setFilteredData(data || []);
    } else {
      const lowerSearchTerm = searchTerm.toLowerCase();
      const filtered = data.filter(item =>
        filterFields.some(field => {
          const fieldValue = item[field];
          return fieldValue && String(fieldValue).toLowerCase().includes(lowerSearchTerm);
        })
      );
      setFilteredData(filtered);
    }
    setPageSize(itemPerPage);
  }, [data, searchTerm, itemPerPage, filters]);

  return {
    filteredData,
    pageSize,
    setPageSize
  };
};