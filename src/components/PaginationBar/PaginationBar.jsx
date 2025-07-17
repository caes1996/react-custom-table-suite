import React from 'react';
import PropTypes from 'prop-types';

/**
 * PaginationBar component for table pagination
 * @param {Object} props - Component props
 * @param {number} props.totalItems - Total number of items
 * @param {number} props.itemsPerPage - Number of items per page
 * @param {number} props.currentPage - Current active page
 * @param {Function} props.onPageChange - Callback function when page changes
 */
const PaginationBar = ({
  totalItems,
  itemsPerPage,
  currentPage,
  onPageChange,
}) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  // Function to generate pagination buttons
  const renderPagination = () => {
    const pages = [];

    // Previous button
    pages.push(
      <button
        key="prev"
        className={`page-item pagination-prev ${
          currentPage === 1 ? 'disabled' : ''
        }`}
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Previo
      </button>
    );

    // First page button
    pages.push(
      <button
        key="1"
        className={`pagination-prev page-item ${
          currentPage === 1 ? 'active' : ''
        }`}
        onClick={() => onPageChange(1)}
      >
        1
      </button>
    );

    // Left ellipsis
    if (currentPage > 3) {
      pages.push(
        <span key="dots-prev" className="dots">
          ..
        </span>
      );
    }

    // Middle pages
    for (
      let i = Math.max(2, currentPage - 1);
      i <= Math.min(totalPages - 1, currentPage + 1);
      i++
    ) {
      pages.push(
        <button
          key={i}
          className={`pagination-prev page-item ${
            currentPage === i ? 'active' : ''
          }`}
          onClick={() => onPageChange(i)}
        >
          {i}
        </button>
      );
    }

    // Right ellipsis
    if (currentPage < totalPages - 2) {
      pages.push(
        <span key="dots-next" className="dots">
          ..
        </span>
      );
    }

    // Last page button (only if there's more than 1 page)
    if (totalPages > 1) {
      pages.push(
        <button
          key={totalPages}
          className={`pagination-prev page-item ${
            currentPage === totalPages ? 'active' : ''
          }`}
          onClick={() => onPageChange(totalPages)}
        >
          {totalPages}
        </button>
      );
    }

    // Next button
    pages.push(
      <button
        key="next"
        className={`page-item pagination-next ${
          currentPage === totalPages ? 'disabled' : ''
        }`}
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Siguiente
      </button>
    );

    return pages;
  };

  // Function to render item count
  const itemCount = () => {
    const isLastPage = currentPage === totalPages;
    // If it's the last page, calculate how many items remain
    const count = isLastPage
      ? totalItems % itemsPerPage || itemsPerPage
      : itemsPerPage;

    return (
      <span>
        Mostrando {count} de {totalItems}
      </span>
    );
  };

  return (
    <div className="d-flex justify-content-between mb-3">
      {itemCount()}
      <div className="pagination-wrap hstack gap-2">{renderPagination()}</div>
    </div>
  );
};

PaginationBar.propTypes = {
  totalItems: PropTypes.number.isRequired,
  itemsPerPage: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
};

export default PaginationBar;