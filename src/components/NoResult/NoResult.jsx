import PropTypes from 'prop-types';
import { AlertTriangle } from 'lucide-react';

/**
 * NoResult component for displaying when no data is found
 * @param {Object} props - Component props
 * @param {number} props.size - Icon size (default: 60)
 * @param {string} props.title - Main title text
 * @param {string} props.message - Description message
 */
const NoResult = ({
  size = 60,
  title = '¡Lo sentimos! No se encontraron resultados',
  message = 'No hemos encontrado registros que coincidan con tu búsqueda.',
}) => {
  return (
    <div className="noresult">
      <div className="text-center">
        <AlertTriangle size={size} />
        <h5 className="mt-3">{title}</h5>
        <p className="text-muted mb-0">{message}</p>
      </div>
    </div>
  );
};

NoResult.propTypes = {
  size: PropTypes.number,
  title: PropTypes.string,
  message: PropTypes.string,
};

export default NoResult;
