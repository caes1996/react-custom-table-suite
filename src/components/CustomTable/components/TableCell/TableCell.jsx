import React from 'react';
import PropTypes from 'prop-types';
import { formatDate, formatSaldoCOP, formatPercentage } from '../../../../utils';
import { renderRowTipo } from '../../utils';

/**
 * TableCell component for rendering individual table cells
 * @param {Object} props - Component props
 * @param {Object} props.cell - React-table cell object
 * @param {number} props.rowIndex - Row index
 * @param {number} props.cellIndex - Cell index
 * @param {boolean} props.fitContent - Allow text wrapping
 * @param {string} props.verticalAlign - Cell vertical alignment
 */
const TableCell = ({ 
  cell, 
  rowIndex, 
  cellIndex, 
  fitContent = false, 
  verticalAlign = 'middle' 
}) => {
  const cellStyle = cell.column.style || null;
  const cellVerticalAlign = cell.column.verticalAlign || verticalAlign;

  const getCellContent = () => {
    const { column, value, row } = cell;

    // Format currency
    if (typeof column.formatCurrency === 'function') {
      return column.formatCurrency(value, row.original) 
        ? formatSaldoCOP(value, typeof column.formatCurrency === 'number' ? column.formatCurrency : 2) 
        : value;
    }
    if (column.formatCurrency) {
      return formatSaldoCOP(value, typeof column.formatCurrency === 'number' ? column.formatCurrency : 2);
    }

    // Format date
    if (typeof column.formatDate === 'function') {
      return column.formatDate(value, row.original) ? formatDate(value) : value;
    }
    if (column.formatDate) {
      return formatDate(value);
    }

    // Format percentage
    if (typeof column.formatPercentage === 'function') {
      return column.formatPercentage(value, row.original) 
        ? formatPercentage(value, typeof column.formatPercentage === 'number' ? column.formatPercentage : 2) 
        : value;
    }
    if (column.formatPercentage) {
      return formatPercentage(value, typeof column.formatPercentage === 'number' ? column.formatPercentage : 2);
    }

    // Format tipo (special formatting for income/expense types)
    if (column.formatTipo) {
      return renderRowTipo(value);
    }

    // Default cell rendering
    return cell.render('Cell');
  };

  const getTextAlign = () => {
    if (cell.column.align) {
      return cell.column.align;
    }
    if (cell.column.formatCurrency || cell.column.formatPercentage) {
      return 'right';
    }
    return 'left';
  };

  return (
    <td
      key={`cell-${rowIndex}-${cellIndex}`}
      {...cell.getCellProps()}
      className={`${cell.column.align === 'center' ? 'actions-cell' : ''} py-1`}
      style={{
        whiteSpace: fitContent ? 'normal' : 'nowrap',
        textAlign: getTextAlign(),
        verticalAlign: cellVerticalAlign,
        width: `${cell.column.calculatedWidth}%`,
        minWidth: cell.column.minWidth || 'auto',
        maxWidth: cell.column.maxWidth || 'none',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        ...cellStyle,
      }}
    >
      {getCellContent()}
    </td>
  );
};

TableCell.propTypes = {
  cell: PropTypes.object.isRequired,
  rowIndex: PropTypes.number.isRequired,
  cellIndex: PropTypes.number.isRequired,
  fitContent: PropTypes.bool,
  verticalAlign: PropTypes.oneOf(['top', 'middle', 'bottom'])
};

export default TableCell;