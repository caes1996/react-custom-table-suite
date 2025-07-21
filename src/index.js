// Inject styles automatically
import { injectStyles } from './styles/injectStyles';

// Main exports
export { default as CustomTable } from './components/CustomTable';
export { default as PaginationBar } from './components/PaginationBar';
export { default as NoResult } from './components/NoResult';

// Utility exports
export * from './utils';

// Inject styles when the library is imported
injectStyles();