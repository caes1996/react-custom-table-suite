import React from 'react';
import PropTypes from 'prop-types';

/**
 * LoadingSpinner component for table loading state
 * @param {Object} props - Component props
 * @param {string} props.message - Loading message to display
 */
const LoadingSpinner = ({ message = "Cargando..." }) => {
  return (
    <div className="text-center my-3">
      <div className="spinner-border text-primary" role="status">
        <span className="visually-hidden">{message}</span>
      </div>
      <p>{message}</p>
    </div>
  );
};

LoadingSpinner.propTypes = {
  message: PropTypes.string
};

export default LoadingSpinner;