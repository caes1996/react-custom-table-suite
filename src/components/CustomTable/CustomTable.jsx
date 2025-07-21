import React from 'react';
import { useState, useEffect, useMemo } from 'react';
import { useTable, useFilters, usePagination, useSortBy } from 'react-table';
import PropTypes from 'prop-types';

// Inject styles automatically
import { useInjectStyles } from '../styles/injectStyles';

// Internal components
import {
  LoadingSpinner,
  SearchFilter,
  ExportButtons,
  TableContainer
} from './components';

// External components
import PaginationBar from '../PaginationBar';

// Hooks and utilities
import { useTableData, useTableExport } from './hooks';
import { calculateColumnWidths, processColumnsWithLinks } from './utils';

/**
 * CustomTable component with advanced features
 * Supports filtering, sorting, pagination, and export capabilities
 */
const CustomTable = ({
  isLoading = false,
  itemPerPage = 25,
  data,
  columns,
  filters,
  showExcel = true,
  showPDF = true,
  showCSV = true,
  showFilter = true,
  showPagination = true,
  exportOrientation = 'horizontal',
  customComponent,
  rowColor,
  fitContent = false,
  exportFileName = "Reporte de Datos",
  linkComponent,
  verticalAlign = 'middle',
  headerColor = '#E1DEF9FF',
  headerTextColor = '#000000',
}) => {
  // Inject styles automatically
  useInjectStyles();

  const [searchTerm, setSearchTerm] = useState('');

  // Use custom hooks for data processing
  const { filteredData, pageSize } = useTableData(data, filters, searchTerm, itemPerPage);

  // Calculate column widths and process links
  const calculateColumnWidthsMemo = useMemo(() => calculateColumnWidths(columns), [columns]);
  const processedColumns = useMemo(() => 
    processColumnsWithLinks(calculateColumnWidthsMemo, linkComponent), 
    [calculateColumnWidthsMemo, linkComponent]
  );

  // Memoize processed columns and data to avoid unnecessary re-renders
  const memoizedColumns = useMemo(() => processedColumns, [processedColumns]);
  const memoizedData = useMemo(() => filteredData, [filteredData]);

  // Use export hook
  const { exportPDF, exportExcel, csvHeaders, csvData } = useTableExport(
    memoizedColumns, 
    filteredData, 
    exportFileName, 
    exportOrientation
  );

  // react-table configuration using internal pagination
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    state: { pageIndex: tablePageIndex },
    gotoPage,
  } = useTable(
    {
      columns: memoizedColumns,
      data: memoizedData,
      initialState: { pageIndex: 0, pageSize },
      pageCount: Math.ceil(memoizedData.length / pageSize),
    },
    useFilters,
    useSortBy,
    usePagination
  );

  // Reset pagination to first page when search changes
  useEffect(() => {
    gotoPage(0);
  }, [searchTerm, gotoPage]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Show loading spinner if data is loading
  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div>
      {/* Header row with export buttons and search field - Responsive version */}
      <div className="row g-0 mb-3">
        <div className="col-12 col-md-6 mb-2 mb-md-0">
          <ExportButtons
            showExcel={showExcel}
            showPDF={showPDF}
            showCSV={showCSV}
            exportExcel={exportExcel}
            exportPDF={exportPDF}
            csvHeaders={csvHeaders}
            csvData={csvData}
            exportFileName={exportFileName}
          />
        </div>
        <div className="col-12 col-md-6">
          {!showFilter && (
            <div className="d-flex justify-content-md-end">{customComponent}</div>
          )}
          {showFilter && (
            <SearchFilter
              searchTerm={searchTerm}
              onSearchChange={handleSearchChange}
            />
          )}
        </div>
      </div>

      {/* Table container */}
      <TableContainer
        filteredData={filteredData}
        getTableProps={getTableProps}
        getTableBodyProps={getTableBodyProps}
        headerGroups={headerGroups}
        page={page}
        prepareRow={prepareRow}
        fitContent={fitContent}
        headerColor={headerColor}
        headerTextColor={headerTextColor}
        rowColor={rowColor}
        verticalAlign={verticalAlign}
      />

      {/* Pagination */}
      {showPagination && filteredData.length > 0 && (
        <PaginationBar
          totalItems={filteredData.length}
          itemsPerPage={pageSize}
          currentPage={tablePageIndex + 1}
          onPageChange={(page) => gotoPage(page - 1)}
        />
      )}
    </div>
  );
};

CustomTable.propTypes = {
  itemPerPage: PropTypes.number,
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      Header: PropTypes.oneOfType([PropTypes.string, PropTypes.func]).isRequired,
      accessor: PropTypes.oneOfType([PropTypes.string, PropTypes.func]).isRequired,
      disableSortBy: PropTypes.bool,
      Cell: PropTypes.func,
      export: PropTypes.bool,
      formatCurrency: PropTypes.oneOfType([PropTypes.bool, PropTypes.number, PropTypes.func]),
      formatDate: PropTypes.oneOfType([PropTypes.bool, PropTypes.func]),
      formatPercentage: PropTypes.oneOfType([PropTypes.bool, PropTypes.number, PropTypes.func]),
      formatTipo: PropTypes.bool,
      headerAlign: PropTypes.oneOf(['left', 'center', 'right']),
      align: PropTypes.oneOf(['left', 'center', 'right']),
      verticalAlign: PropTypes.oneOf(['top', 'middle', 'bottom']),
      style: PropTypes.object,
      widthPercentage: PropTypes.number,
      minWidth: PropTypes.string,
      maxWidth: PropTypes.string,
      link: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.func,
        PropTypes.shape({
          field: PropTypes.string,
          prefix: PropTypes.string,
          suffix: PropTypes.string
        })
      ]),
      linkText: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.func
      ]),
      linkClass: PropTypes.string,
      linkProps: PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.func
      ]),
      customCell: PropTypes.func
    })
  ).isRequired,
  headerColor: PropTypes.string,
  headerTextColor: PropTypes.string,
  filters: PropTypes.arrayOf(PropTypes.string),
  showExcel: PropTypes.bool,
  showPDF: PropTypes.bool,
  showCSV: PropTypes.bool,
  showFilter: PropTypes.bool,
  showPagination: PropTypes.bool,
  exportOrientation: PropTypes.oneOf(['vertical', 'horizontal']),
  customComponent: PropTypes.element,
  isLoading: PropTypes.bool,
  rowColor: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func
  ]),
  fitContent: PropTypes.bool,
  exportFileName: PropTypes.string,
  linkComponent: PropTypes.elementType,
  verticalAlign: PropTypes.oneOf(['top', 'middle', 'bottom'])
};

export default CustomTable;