import React from 'react';
import PropTypes from 'prop-types';
import { ChevronDownIcon, ChevronUpIcon, ChevronsUpDownIcon } from 'lucide-react';

/**
 * TableHeader component for rendering table headers
 * @param {Object} props - Component props
 * @param {Array} props.headerGroups - React-table header groups
 * @param {boolean} props.fitContent - Allow text wrapping
 * @param {string} props.headerColor - Header background color
 * @param {string} props.headerTextColor - Header text color
 */
const TableHeader = ({ 
  headerGroups, 
  fitContent = false, 
  headerColor = '#E1DEF9FF', 
  headerTextColor = '#000000' 
}) => {
  return (
    <thead>
      {headerGroups.map((headerGroup, headerIndex) => (
        <tr key={`header-${headerIndex}`} {...headerGroup.getHeaderGroupProps()}>
          {headerGroup.headers.map((column, colIndex) => (
            <th
              key={`column-${colIndex}`}
              {...column.getHeaderProps(column.getSortByToggleProps())}
              style={{
                textAlign: column.headerAlign || column.align || 'center',
                whiteSpace: fitContent ? 'normal' : 'nowrap',
                width: `${column.calculatedWidth}%`,
                minWidth: column.minWidth || 'auto',
                maxWidth: column.maxWidth || 'none',
                ...(headerColor.startsWith('bg-') ? {} : { backgroundColor: headerColor }),
                color: headerTextColor,
              }}
              className={headerColor.startsWith('bg-') ? headerColor : ''}
            >
              {column.render("Header")}
              {!column.disableSortBy && (
                <span style={{ marginLeft: "8px" }}>
                  {column.isSorted ? (
                    column.isSortedDesc 
                      ? <ChevronDownIcon size={10} />
                      : <ChevronUpIcon size={10} />
                  ) : (
                    <ChevronsUpDownIcon size={10} />
                  )}
                </span>
              )}
            </th>
          ))}
        </tr>
      ))}
    </thead>
  );
};

TableHeader.propTypes = {
  headerGroups: PropTypes.array.isRequired,
  fitContent: PropTypes.bool,
  headerColor: PropTypes.string,
  headerTextColor: PropTypes.string
};

export default TableHeader;