import { useMemo } from 'react';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import * as XLSX from 'xlsx';

/**
 * Custom hook to handle table export functionality
 * @param {Array} columns - Table columns configuration
 * @param {Array} filteredData - Filtered data to export
 * @param {string} exportFileName - Base filename for exports
 * @param {string} exportOrientation - PDF orientation (horizontal/vertical)
 * @returns {Object} Export functions and utilities
 */
export const useTableExport = (columns, filteredData, exportFileName, exportOrientation) => {
  // Get exportable columns (those that don't have export: false)
  const exportableColumns = useMemo(() => {
    return columns.filter(col => col.export !== false);
  }, [columns]);

  // Prepare data for export in table format
  const getExportTableData = useMemo(() => {
    const headers = exportableColumns.map(col => col.Header);
    const rows = filteredData.map(row =>
      exportableColumns.map(col =>
        typeof col.accessor === 'function'
          ? col.accessor(row)
          : row[col.accessor]
      )
    );
    return { headers, rows };
  }, [exportableColumns, filteredData]);

  // Calculate column widths for exports
  const calculateExportWidths = useMemo(() => {
    const specifiedTotal = exportableColumns.reduce((sum, col) => sum + (col.widthPercentage || 0), 0);
    const unspecifiedCount = exportableColumns.filter(col => !col.widthPercentage).length;
    const remainingPercentage = 100 - specifiedTotal;
    const defaultPercentage = unspecifiedCount > 0 ? remainingPercentage / unspecifiedCount : 0;
    
    return exportableColumns.map(col => ({
      ...col,
      calculatedWidth: col.widthPercentage || defaultPercentage
    }));
  }, [exportableColumns]);

  // PDF export function
  const exportPDF = () => {
    const { headers, rows } = getExportTableData;
    const doc = new jsPDF({
      orientation: exportOrientation === 'horizontal' ? 'landscape' : 'portrait',
      format: "tabloid",
    });

    const pageWidth = doc.internal.pageSize.getWidth();
    const margin = 20;
    const availableWidth = pageWidth - margin * 2;

    const colStyles = {};
    calculateExportWidths.forEach((col, index) => {
      colStyles[index] = { cellWidth: (col.calculatedWidth * availableWidth) / 100 };
    });

    autoTable(doc, {
      head: [headers],
      body: rows,
      margin: { left: margin, right: margin },
      columnStyles: colStyles,
    });
    doc.save(`${exportFileName}.pdf`);
  };

  // Excel export function
  const exportExcel = () => {
    const exportableData = filteredData.map(row => {
      const newRow = {};
      exportableColumns.forEach(col => {
        newRow[col.Header] = row[col.accessor];
      });
      return newRow;
    });

    const totalChars = 100;
    const colsWidth = calculateExportWidths.map(col => ({
      wch: (col.calculatedWidth * totalChars) / 100
    }));

    const worksheet = XLSX.utils.json_to_sheet(exportableData);
    worksheet['!cols'] = colsWidth;

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Datos");
    XLSX.writeFile(workbook, `${exportFileName}.xlsx`);
  };

  // CSV export data
  const csvHeaders = useMemo(() => {
    return exportableColumns.map((col, index) => {
      const key = typeof col.accessor === 'function' ? `custom_field_${index}` : col.accessor;
      return { label: col.Header, key };
    });
  }, [exportableColumns]);

  const csvData = useMemo(() => {
    return filteredData.map(row => {
      const newRow = {};
      exportableColumns.forEach((col, index) => {
        const key = typeof col.accessor === 'function' ? `custom_field_${index}` : col.accessor;
        newRow[key] =
          typeof col.accessor === 'function'
            ? col.accessor(row)
            : row[col.accessor];
      });
      return newRow;
    });
  }, [exportableColumns, filteredData]);

  return {
    exportPDF,
    exportExcel,
    csvHeaders,
    csvData,
    exportableColumns
  };
};