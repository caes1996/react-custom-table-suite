import React from 'react';
import PropTypes from 'prop-types';
import { SearchIcon } from 'lucide-react';

/**
 * SearchFilter component for table search functionality
 * @param {Object} props - Component props
 * @param {string} props.searchTerm - Current search term
 * @param {Function} props.onSearchChange - Search change handler
 * @param {string} props.placeholder - Input placeholder text
 */
const SearchFilter = ({ 
  searchTerm, 
  onSearchChange, 
  placeholder = "Buscar..." 
}) => {
  return (
    <div className="position-relative">
      <input
        type="text"
        className="form-control ps-5"
        placeholder={placeholder}
        value={searchTerm}
        onChange={onSearchChange}
        aria-label="Buscar en la tabla"
      />
      <span
        className="position-absolute"
        style={{ top: '50%', transform: 'translateY(-50%)', left: '10px' }}
      >
        <SearchIcon size={20} />
      </span>
      {searchTerm && (
        <span
          className="position-absolute"
          style={{ 
            top: '50%', 
            transform: 'translateY(-50%)', 
            right: '10px', 
            cursor: 'pointer',
            fontSize: '1.2rem',
            fontWeight: 'bold',
            color: '#6c757d'
          }}
          onClick={() => onSearchChange({ target: { value: '' } })}
          aria-label="Limpiar búsqueda"
        >
          ×
        </span>
      )}
    </div>
  );
};

SearchFilter.propTypes = {
  searchTerm: PropTypes.string.isRequired,
  onSearchChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string
};

export default SearchFilter;