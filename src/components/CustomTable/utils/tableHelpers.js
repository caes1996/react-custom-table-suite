/**
 * Calculate column widths based on percentage specifications
 * @param {Array} columns - Array of column configurations
 * @returns {Array} Columns with calculated widths
 */
export const calculateColumnWidths = (columns) => {
  const specifiedTotal = columns.reduce((sum, col) => sum + (col.widthPercentage || 0), 0);
  const unspecifiedCount = columns.filter(col => !col.widthPercentage).length;
  const remainingPercentage = 100 - specifiedTotal;
  const defaultPercentage = unspecifiedCount > 0 ? remainingPercentage / unspecifiedCount : 0;

  return columns.map(col => ({
    ...col,
    calculatedWidth: col.widthPercentage || defaultPercentage
  }));
};

/**
 * Process columns to handle links and custom rendering
 * @param {Array} columns - Array of column configurations
 * @param {React.Component} linkComponent - Link component for routing
 * @returns {Array} Processed columns
 */
export const processColumnsWithLinks = (columns, linkComponent) => {
  return columns.map(column => {
    const processedColumn = {
      ...column,
      getHeaderProps: () => ({
        style: {
          width: `${column.calculatedWidth}%`,
          minWidth: column.minWidth || 'auto',
          maxWidth: column.maxWidth || 'none'
        }
      })
    };

    if (column.link && linkComponent) {
      processedColumn.Cell = ({ row, value }) => {
        let routeTo;
        if (typeof column.link === 'function') {
          routeTo = column.link(row.original);
        } else if (typeof column.link === 'string') {
          routeTo = column.link;
        } else if (typeof column.link === 'object' && column.link.field) {
          const baseField = row.original[column.link.field];
          const prefix = column.link.prefix || '';
          const suffix = column.link.suffix || '';
          routeTo = `${prefix}${baseField}${suffix}`;
        }

        const linkText = column.linkText
          ? (typeof column.linkText === 'function'
              ? column.linkText(row.original)
              : column.linkText)
          : value;

        const linkClass = column.linkClass || "text-primary";

        if (column.customCell) {
          return column.customCell({ row, value, routeTo, linkText, linkClass, linkComponent });
        }

        const LinkComponent = linkComponent;
        return routeTo ? (
          <LinkComponent
            to={routeTo}
            className={linkClass}
            replace={false}
            {...(column.linkProps ? (typeof column.linkProps === 'function' ? column.linkProps(row.original) : column.linkProps) : {})}
          >
            {linkText}
          </LinkComponent>
        ) : (
          <>{linkText}</>
        );
      };
    }
    return processedColumn;
  });
};

/**
 * Render row type with color coding
 * @param {string} tipo - Type value to render
 * @returns {JSX.Element} Styled type element
 */
export const renderRowTipo = (tipo) => {
  return (
    tipo === "ingreso" || tipo === 'Desbloqueado'
      ? <strong style={{ fontWeight: "800", color: "#90EE90" }}>{tipo}</strong>
      : <strong style={{ fontWeight: "800", color: "#FF6961" }}>{tipo}</strong>
  );
};