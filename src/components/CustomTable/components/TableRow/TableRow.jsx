import React from 'react';
import PropTypes from 'prop-types';
import TableCell from '../TableCell';

/**
 * TableRow component for rendering table rows
 * @param {Object} props - Component props
 * @param {Object} props.row - React-table row object
 * @param {number} props.rowIndex - Row index
 * @param {Function} props.prepareRow - React-table prepareRow function
 * @param {Function|string} props.rowColor - Row background color function or string
 * @param {boolean} props.fitContent - Allow text wrapping
 * @param {string} props.verticalAlign - Cell vertical alignment
 */
const TableRow = ({ 
  row, 
  rowIndex, 
  prepareRow, 
  rowColor, 
  fitContent = false, 
  verticalAlign = 'middle' 
}) => {
  prepareRow(row);

  const backgroundColor = rowColor 
    ? (typeof rowColor === 'function' ? rowColor(row.original) : rowColor)
    : undefined;

  return (
    <tr
      key={`row-${rowIndex}`}
      {...row.getRowProps()}
      style={{
        ...(backgroundColor ? { backgroundColor } : {})
      }}
    >
      {row.cells.map((cell, cellIndex) => (
        <TableCell
          key={`cell-${rowIndex}-${cellIndex}`}
          cell={cell}
          rowIndex={rowIndex}
          cellIndex={cellIndex}
          fitContent={fitContent}
          verticalAlign={verticalAlign}
        />
      ))}
    </tr>
  );
};

TableRow.propTypes = {
  row: PropTypes.object.isRequired,
  rowIndex: PropTypes.number.isRequired,
  prepareRow: PropTypes.func.isRequired,
  rowColor: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func
  ]),
  fitContent: PropTypes.bool,
  verticalAlign: PropTypes.oneOf(['top', 'middle', 'bottom'])
};

export default TableRow;