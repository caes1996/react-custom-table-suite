import PropTypes from 'prop-types';
import TableHeader from '../TableHeader';
import TableBody from '../TableBody';
import NoResult from '../../../NoResult';

/**
 * TableContainer component for wrapping the table
 * @param {Object} props - Component props
 * @param {Array} props.filteredData - Filtered data array
 * @param {Object} props.getTableProps - React-table props function
 * @param {Object} props.getTableBodyProps - React-table body props function
 * @param {Array} props.headerGroups - React-table header groups
 * @param {Array} props.page - Current page data
 * @param {Function} props.prepareRow - React-table prepareRow function
 * @param {boolean} props.fitContent - Allow text wrapping
 * @param {string} props.headerColor - Header background color
 * @param {string} props.headerTextColor - Header text color
 * @param {Function|string} props.rowColor - Row background color function or string
 * @param {string} props.verticalAlign - Cell vertical alignment
 */
const TableContainer = ({
  filteredData,
  getTableProps,
  getTableBodyProps,
  headerGroups,
  page,
  prepareRow,
  fitContent = false,
  headerColor = '#E1DEF9FF',
  headerTextColor = '#000000',
  rowColor,
  verticalAlign = 'middle'
}) => {
  if (filteredData.length === 0) {
    return (
      <NoResult
        title="¡Lo sentimos! No se encontraron resultados"
        message="No hemos encontrado registros que coincidan con tu búsqueda."
      />
    );
  }

  return (
    <div className="table-responsive table-card mt-1 mb-0">
      <table
        {...getTableProps()}
        className="table table-sm fs-6 table-bordered table-striped"
        style={{ tableLayout: 'fixed' }}
      >
        <TableHeader
          headerGroups={headerGroups}
          fitContent={fitContent}
          headerColor={headerColor}
          headerTextColor={headerTextColor}
        />
        <TableBody
          getTableBodyProps={getTableBodyProps}
          page={page}
          prepareRow={prepareRow}
          rowColor={rowColor}
          fitContent={fitContent}
          verticalAlign={verticalAlign}
        />
      </table>
    </div>
  );
};

TableContainer.propTypes = {
  filteredData: PropTypes.array.isRequired,
  getTableProps: PropTypes.func.isRequired,
  getTableBodyProps: PropTypes.func.isRequired,
  headerGroups: PropTypes.array.isRequired,
  page: PropTypes.array.isRequired,
  prepareRow: PropTypes.func.isRequired,
  fitContent: PropTypes.bool,
  headerColor: PropTypes.string,
  headerTextColor: PropTypes.string,
  rowColor: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func
  ]),
  verticalAlign: PropTypes.oneOf(['top', 'middle', 'bottom'])
};

export default TableContainer;