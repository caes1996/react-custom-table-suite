import { useState } from 'react';
import PropTypes from 'prop-types';
import { CSVLink } from 'react-csv';
import { DownloadIcon } from 'lucide-react';

/**
 * ExportButtons component for table export functionality
 * @param {Object} props - Component props
 * @param {boolean} props.showExcel - Show Excel export button
 * @param {boolean} props.showPDF - Show PDF export button
 * @param {boolean} props.showCSV - Show CSV export button
 * @param {Function} props.exportExcel - Excel export function
 * @param {Function} props.exportPDF - PDF export function
 * @param {Array} props.csvHeaders - CSV headers configuration
 * @param {Array} props.csvData - CSV data array
 * @param {string} props.exportFileName - Base filename for exports
 */
const ExportButtons = ({
  showExcel = true,
  showPDF = true,
  showCSV = true,
  exportExcel,
  exportPDF,
  csvHeaders,
  csvData,
  exportFileName
}) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => setDropdownOpen(prevState => !prevState);

  const renderDesktopButtons = () => (
    <div className="d-none d-md-flex">
      {showExcel && (
        <button 
          className="btn btn-outline-primary me-2 mb-2" 
          onClick={exportExcel}
        >
          Exportar Excel
        </button>
      )}
      {showPDF && (
        <button 
          className="btn btn-outline-primary me-2 mb-2" 
          onClick={exportPDF}
        >
          Exportar PDF
        </button>
      )}
      {showCSV && (
        <CSVLink
          headers={csvHeaders}
          data={csvData}
          filename={`${exportFileName}.csv`}
          className="btn btn-outline-primary me-2 mb-2"
        >
          Exportar CSV
        </CSVLink>
      )}
    </div>
  );

  const renderMobileDropdown = () => (
    <div className="d-block d-md-none">
      <div className="dropdown">
        <button
          className="btn btn-primary dropdown-toggle d-flex align-items-center"
          type="button"
          onClick={toggleDropdown}
        >
          <DownloadIcon size={16} className="me-1" /> Exportar
        </button>
        {dropdownOpen && (
          <div className="dropdown-menu show">
            {showExcel && (
              <button 
                className="dropdown-item" 
                onClick={() => {
                  exportExcel();
                  setDropdownOpen(false);
                }}
              >
                Exportar Excel
              </button>
            )}
            {showPDF && (
              <button 
                className="dropdown-item" 
                onClick={() => {
                  exportPDF();
                  setDropdownOpen(false);
                }}
              >
                Exportar PDF
              </button>
            )}
            {showCSV && (
              <CSVLink
                headers={csvHeaders}
                data={csvData}
                filename={`${exportFileName}.csv`}
                className="dropdown-item"
                onClick={() => setDropdownOpen(false)}
              >
                Exportar CSV
              </CSVLink>
            )}
          </div>
        )}
      </div>
    </div>
  );

  // Don't render anything if no export options are enabled
  if (!showExcel && !showPDF && !showCSV) {
    return null;
  }

  return (
    <>
      {renderMobileDropdown()}
      {renderDesktopButtons()}
    </>
  );
};

ExportButtons.propTypes = {
  showExcel: PropTypes.bool,
  showPDF: PropTypes.bool,
  showCSV: PropTypes.bool,
  exportExcel: PropTypes.func.isRequired,
  exportPDF: PropTypes.func.isRequired,
  csvHeaders: PropTypes.array.isRequired,
  csvData: PropTypes.array.isRequired,
  exportFileName: PropTypes.string.isRequired
};

export default ExportButtons;