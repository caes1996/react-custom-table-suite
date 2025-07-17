import PropTypes from 'prop-types';
import TableRow from '../TableRow';

/**
 * TableBody component for rendering table body
 * @param {Object} props - Component props
 * @param {Object} props.getTableBodyProps - React-table body props function
 * @param {Array} props.page - Current page data
 * @param {Function} props.prepareRow - React-table prepareRow function
 * @param {Function|string} props.rowColor - Row background color function or string
 * @param {boolean} props.fitContent - Allow text wrapping
 * @param {string} props.verticalAlign - Cell vertical alignment
 */
const TableBody = ({ 
  getTableBodyProps, 
  page, 
  prepareRow, 
  rowColor, 
  fitContent = false, 
  verticalAlign = 'middle' 
}) => {
  return (
    <tbody {...getTableBodyProps()}>
      {page.map((row, rowIndex) => (
        <TableRow
          key={`row-${rowIndex}`}
          row={row}
          rowIndex={rowIndex}
          prepareRow={prepareRow}
          rowColor={rowColor}
          fitContent={fitContent}
          verticalAlign={verticalAlign}
        />
      ))}
    </tbody>
  );
};

TableBody.propTypes = {
  getTableBodyProps: PropTypes.func.isRequired,
  page: PropTypes.array.isRequired,
  prepareRow: PropTypes.func.isRequired,
  rowColor: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func
  ]),
  fitContent: PropTypes.bool,
  verticalAlign: PropTypes.oneOf(['top', 'middle', 'bottom'])
};

export default TableBody;