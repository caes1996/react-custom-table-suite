# React Custom Table Suite

A comprehensive React table component suite with advanced features like filtering, sorting, pagination, and export capabilities.

## Features

- 📊 **Advanced Table Component**: Full-featured data table with sorting, filtering, and pagination
- 📤 **Export Capabilities**: Export to Excel, PDF, and CSV formats
- 🔍 **Search & Filter**: Built-in search functionality with customizable filters
- 📱 **Responsive Design**: Mobile-friendly with responsive export controls
- 🎨 **Customizable**: Extensive styling and behavior customization options
- ⚡ **Performance**: Optimized with React hooks and memoization
- 🧩 **Modular**: Use individual components or the complete suite

## Installation

```bash
npm install react-custom-table-suite
```

### Peer Dependencies

Make sure you have these peer dependencies installed:

```bash
npm install react react-dom
```

### Optional Dependencies for UI Framework Integration

For full Bootstrap integration (recommended):

```bash
npm install bootstrap reactstrap
```

For React Router integration:

```bash
npm install react-router-dom
```

## Quick Start

```jsx
import React from 'react';
import { CustomTable } from 'react-custom-table-suite';
import 'react-custom-table-suite/dist/index.css';

const data = [
  { id: 1, name: 'John Doe', email: 'john@example.com', age: 30 },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', age: 25 },
  // ... more data
];

const columns = [
  {
    Header: 'ID',
    accessor: 'id',
    widthPercentage: 10
  },
  {
    Header: 'Name',
    accessor: 'name',
    widthPercentage: 30
  },
  {
    Header: 'Email',
    accessor: 'email',
    widthPercentage: 40
  },
  {
    Header: 'Age',
    accessor: 'age',
    widthPercentage: 20,
    align: 'center'
  }
];

function MyTable() {
  return (
    <CustomTable
      data={data}
      columns={columns}
      exportFileName="Users Report"
    />
  );
}

export default MyTable;
```

## Components

### CustomTable

The main table component with all advanced features.

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `data` | `array` | **required** | Array of objects to display |
| `columns` | `array` | **required** | Column configuration array |
| `itemPerPage` | `number` | `25` | Items per page for pagination |
| `isLoading` | `boolean` | `false` | Show loading spinner |
| `showExcel` | `boolean` | `true` | Show Excel export button |
| `showPDF` | `boolean` | `true` | Show PDF export button |
| `showCSV` | `boolean` | `true` | Show CSV export button |
| `showFilter` | `boolean` | `true` | Show search filter |
| `showPagination` | `boolean` | `true` | Show pagination controls |
| `exportOrientation` | `string` | `'horizontal'` | PDF export orientation |
| `exportFileName` | `string` | `'Reporte de Datos'` | Base name for exported files |
| `headerColor` | `string` | `'#E1DEF9FF'` | Table header background color |
| `headerTextColor` | `string` | `'#000000'` | Table header text color |
| `fitContent` | `boolean` | `false` | Allow text wrapping in cells |
| `verticalAlign` | `string` | `'middle'` | Cell vertical alignment |

#### Column Configuration

```jsx
const columns = [
  {
    Header: 'Column Title',
    accessor: 'dataKey', // or function
    
    // Display options
    align: 'left|center|right',
    headerAlign: 'left|center|right',
    verticalAlign: 'top|middle|bottom',
    widthPercentage: 25, // Column width as percentage
    minWidth: '100px',
    maxWidth: '300px',
    
    // Formatting
    formatCurrency: true, // or number for decimals
    formatDate: true,
    formatPercentage: true, // or number for decimals
    
    // Export
    export: true, // Include in exports (default: true)
    
    // Sorting
    disableSortBy: false,
    
    // Links (requires react-router-dom)
    link: '/path/:id', // or function or object
    linkText: 'Click here', // or function
    linkClass: 'text-primary',
    
    // Custom rendering
    Cell: ({ value, row }) => <custom-render />
  }
];
```

### PaginationBar

Standalone pagination component.

```jsx
import { PaginationBar } from 'react-custom-table-suite';

<PaginationBar
  totalItems={100}
  itemsPerPage={10}
  currentPage={1}
  onPageChange={(page) => console.log(page)}
/>
```

### NoResult

Component for displaying "no results" message.

```jsx
import { NoResult } from 'react-custom-table-suite';

<NoResult
  title="No data found"
  message="Try adjusting your search criteria"
  size={60}
/>
```

## Utility Functions

The package also exports utility functions for data formatting:

```jsx
import {
  formatDate,
  formatSaldoCOP,
  formatPercentage,
  formatMiles,
  validateNumericValue
} from 'react-custom-table-suite';

// Format dates
const formatted = formatDate('2023-12-25'); // "2023-12-25"

// Format currency (Colombian Pesos)
const currency = formatSaldoCOP(1000000, 2); // "$1.000.000,00 COP"

// Format percentages
const percent = formatPercentage(0.25, 2); // "25.00%"

// Format thousands
const thousands = formatMiles(1000000); // "1.000.000"

// Validate numeric input
const numeric = validateNumericValue("123abc456"); // "123456"
```

## Styling

The package includes basic CSS styles. Import the CSS file:

```jsx
import 'react-custom-table-suite/dist/index.css';
```

For full Bootstrap integration, also import Bootstrap CSS:

```jsx
import 'bootstrap/dist/css/bootstrap.min.css';
```

### Custom Styling

You can override the default styles by targeting the CSS classes:

```css
.noresult {
  /* No results component styles */
}

.table-card {
  /* Table container styles */
}

.pagination-wrap {
  /* Pagination container styles */
}
```

## Advanced Examples

### With React Router Links

```jsx
import { Link } from 'react-router-dom';
import { CustomTable } from 'react-custom-table-suite';

const columns = [
  {
    Header: 'User',
    accessor: 'name',
    link: (row) => `/users/${row.id}`,
    linkText: (row) => `View ${row.name}`
  }
];

<CustomTable
  data={data}
  columns={columns}
  linkComponent={Link}
/>
```

### Custom Cell Rendering

```jsx
const columns = [
  {
    Header: 'Status',
    accessor: 'status',
    Cell: ({ value }) => (
      <span className={`badge ${value === 'active' ? 'bg-success' : 'bg-danger'}`}>
        {value}
      </span>
    )
  }
];
```

### Conditional Formatting

```jsx
const columns = [
  {
    Header: 'Amount',
    accessor: 'amount',
    formatCurrency: (value, row) => row.type === 'money',
    align: 'right'
  }
];
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

MIT © Cristian Escobar

## Support

For issues and questions, please use the [GitHub Issues](https://github.com/caes1996/react-custom-table-suite/issues) page.