# API Documentation - React Custom Table Suite

## 📋 Table of Contents

- [Components](#components)
  - [CustomTable](#customtable)
  - [PaginationBar](#paginationbar)
  - [NoResult](#noresult)
  - [Modular Components](#modular-components)
- [Hooks](#hooks)
  - [useTableData](#usetabledata)
  - [useTableExport](#usetableexport)
- [Utilities](#utilities)
  - [Date Utilities](#date-utilities)
  - [Format Utilities](#format-utilities)
  - [Validation Utilities](#validation-utilities)
- [Types](#types)
- [Examples](#examples)

---

## Components

### CustomTable

The main table component with advanced features including sorting, filtering, pagination, and export capabilities.

#### Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `data` | `Array<Object>` | - | ✅ | Array of objects to display in the table |
| `columns` | `Array<ColumnConfig>` | - | ✅ | Column configuration array |
| `itemPerPage` | `number` | `25` | ❌ | Number of items per page |
| `isLoading` | `boolean` | `false` | ❌ | Show loading spinner |
| `showExcel` | `boolean` | `true` | ❌ | Show Excel export button |
| `showPDF` | `boolean` | `true` | ❌ | Show PDF export button |
| `showCSV` | `boolean` | `true` | ❌ | Show CSV export button |
| `showFilter` | `boolean` | `true` | ❌ | Show search filter input |
| `showPagination` | `boolean` | `true` | ❌ | Show pagination controls |
| `exportOrientation` | `'horizontal' \| 'vertical'` | `'horizontal'` | ❌ | PDF export orientation |
| `customComponent` | `React.ReactElement` | - | ❌ | Custom component to show when filter is disabled |
| `rowColor` | `string \| function` | - | ❌ | Row background color (string or function) |
| `fitContent` | `boolean` | `false` | ❌ | Allow text wrapping in cells |
| `exportFileName` | `string` | `'Reporte de Datos'` | ❌ | Base name for exported files |
| `linkComponent` | `React.ComponentType` | - | ❌ | Link component for routing (e.g., React Router Link) |
| `verticalAlign` | `'top' \| 'middle' \| 'bottom'` | `'middle'` | ❌ | Cell vertical alignment |
| `headerColor` | `string` | `'#E1DEF9FF'` | ❌ | Table header background color |
| `headerTextColor` | `string` | `'#000000'` | ❌ | Table header text color |
| `filters` | `Array<string>` | - | ❌ | Array of field names to filter by |

#### ColumnConfig

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `Header` | `string \| function` | - | Column header text or render function |
| `accessor` | `string \| function` | - | Data accessor key or function |
| `disableSortBy` | `boolean` | `false` | Disable sorting for this column |
| `Cell` | `function` | - | Custom cell render function |
| `export` | `boolean` | `true` | Include column in exports |
| `formatCurrency` | `boolean \| number \| function` | `false` | Format as currency (COP) |
| `formatDate` | `boolean \| function` | `false` | Format as date |
| `formatPercentage` | `boolean \| number \| function` | `false` | Format as percentage |
| `formatTipo` | `boolean` | `false` | Format as income/expense type |
| `headerAlign` | `'left' \| 'center' \| 'right'` | `'center'` | Header text alignment |
| `align` | `'left' \| 'center' \| 'right'` | `'left'` | Cell text alignment |
| `verticalAlign` | `'top' \| 'middle' \| 'bottom'` | `'middle'` | Cell vertical alignment |
| `style` | `object` | - | Custom cell styles |
| `widthPercentage` | `number` | - | Column width as percentage (0-100) |
| `minWidth` | `string` | `'auto'` | Minimum column width |
| `maxWidth` | `string` | `'none'` | Maximum column width |
| `link` | `string \| function \| object` | - | Link configuration for cells |
| `linkText` | `string \| function` | - | Link text override |
| `linkClass` | `string` | `'text-primary'` | CSS class for links |
| `linkProps` | `object \| function` | - | Additional props for link component |
| `customCell` | `function` | - | Custom cell renderer with link support |

#### Usage Examples

```jsx
import { CustomTable } from 'react-custom-table-suite';

// Basic usage
<CustomTable
  data={data}
  columns={columns}
/>

// Advanced usage
<CustomTable
  data={data}
  columns={columns}
  itemPerPage={50}
  isLoading={false}
  showExcel={true}
  showPDF={true}
  showCSV={true}
  showFilter={true}
  showPagination={true}
  exportOrientation="horizontal"
  exportFileName="My Report"
  headerColor="#007bff"
  headerTextColor="#ffffff"
  rowColor={(row) => row.status === 'active' ? '#e8f5e8' : undefined}
  fitContent={false}
  verticalAlign="middle"
  filters={['name', 'email', 'department']}
/>
```

---

### PaginationBar

Standalone pagination component for navigating through paginated data.

#### Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `totalItems` | `number` | - | ✅ | Total number of items |
| `itemsPerPage` | `number` | - | ✅ | Number of items per page |
| `currentPage` | `number` | - | ✅ | Current active page (1-based) |
| `onPageChange` | `function` | - | ✅ | Callback when page changes |

#### Usage Example

```jsx
import { PaginationBar } from 'react-custom-table-suite';

<PaginationBar
  totalItems={250}
  itemsPerPage={25}
  currentPage={3}
  onPageChange={(page) => setCurrentPage(page)}
/>
```

---

### NoResult

Component for displaying "no results" message when data is empty.

#### Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `size` | `number` | `60` | ❌ | Icon size in pixels |
| `title` | `string` | `'¡Lo sentimos! No se encontraron resultados'` | ❌ | Main title text |
| `message` | `string` | `'No hemos encontrado registros que coincidan con tu búsqueda.'` | ❌ | Description message |

#### Usage Example

```jsx
import { NoResult } from 'react-custom-table-suite';

<NoResult
  size={48}
  title="No employees found"
  message="Try adjusting your search criteria"
/>
```

---

### Modular Components

Individual components for building custom table interfaces.

#### LoadingSpinner

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `message` | `string` | `'Cargando...'` | Loading message |

#### SearchFilter

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `searchTerm` | `string` | ✅ | Current search term |
| `onSearchChange` | `function` | ✅ | Search change handler |
| `placeholder` | `string` | ❌ | Input placeholder |

#### ExportButtons

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `showExcel` | `boolean` | ❌ | Show Excel button |
| `showPDF` | `boolean` | ❌ | Show PDF button |
| `showCSV` | `boolean` | ❌ | Show CSV button |
| `exportExcel` | `function` | ✅ | Excel export handler |
| `exportPDF` | `function` | ✅ | PDF export handler |
| `csvHeaders` | `array` | ✅ | CSV headers config |
| `csvData` | `array` | ✅ | CSV data array |
| `exportFileName` | `string` | ✅ | Export filename |

#### Usage Examples

```jsx
import {
  LoadingSpinner,
  SearchFilter,
  ExportButtons
} from 'react-custom-table-suite/components';

// Loading spinner
<LoadingSpinner message="Loading data..." />

// Search filter
<SearchFilter
  searchTerm={searchTerm}
  onSearchChange={setSearchTerm}
  placeholder="Search employees..."
/>

// Export buttons
<ExportButtons
  showExcel={true}
  showPDF={true}
  showCSV={true}
  exportExcel={handleExportExcel}
  exportPDF={handleExportPDF}
  csvHeaders={csvHeaders}
  csvData={csvData}
  exportFileName="Report"
/>
```

---

## Hooks

### useTableData

Custom hook for handling table data filtering and processing.

#### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `data` | `Array<Object>` | Original data array |
| `filters` | `Array<string>` | Fields to filter by |
| `searchTerm` | `string` | Search term for filtering |
| `itemPerPage` | `number` | Items per page |

#### Returns

| Property | Type | Description |
|----------|------|-------------|
| `filteredData` | `Array<Object>` | Filtered data array |
| `pageSize` | `number` | Current page size |
| `setPageSize` | `function` | Page size setter |

#### Usage Example

```jsx
import { useTableData } from 'react-custom-table-suite/hooks';

function MyComponent() {
  const [searchTerm, setSearchTerm] = useState('');
  
  const { filteredData, pageSize } = useTableData(
    data,
    ['name', 'email'],
    searchTerm,
    25
  );

  return (
    <div>
      <input 
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <p>Showing {filteredData.length} results</p>
    </div>
  );
}
```

---

### useTableExport

Custom hook for handling table export functionality.

#### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `columns` | `Array<ColumnConfig>` | Table columns configuration |
| `filteredData` | `Array<Object>` | Filtered data to export |
| `exportFileName` | `string` | Base filename for exports |
| `exportOrientation` | `string` | PDF orientation |

#### Returns

| Property | Type | Description |
|----------|------|-------------|
| `exportPDF` | `function` | PDF export function |
| `exportExcel` | `function` | Excel export function |
| `csvHeaders` | `array` | CSV headers configuration |
| `csvData` | `array` | CSV data array |
| `exportableColumns` | `array` | Columns available for export |

#### Usage Example

```jsx
import { useTableExport } from 'react-custom-table-suite/hooks';

function MyComponent() {
  const { exportPDF, exportExcel, csvHeaders, csvData } = useTableExport(
    columns,
    filteredData,
    'My Report',
    'horizontal'
  );

  return (
    <div>
      <button onClick={exportPDF}>Export PDF</button>
      <button onClick={exportExcel}>Export Excel</button>
      <CSVLink headers={csvHeaders} data={csvData}>
        Export CSV
      </CSVLink>
    </div>
  );
}
```

---

## Utilities

### Date Utilities

#### formatDate(dateString)

Formats a date string to YYYY-MM-DD format with optional time.

**Parameters:**
- `dateString` (string): The date string to format

**Returns:** 
- `string`: Formatted date string or "No registra" if invalid

**Example:**
```javascript
import { formatDate } from 'react-custom-table-suite';

formatDate('2023-12-25T10:30:00') // "2023-12-25 10:30"
formatDate('2023-12-25') // "2023-12-25"
formatDate('invalid') // "No registra"
```

#### parseDate(dateString)

Parses a date string in YYYY-MM-DD format.

**Parameters:**
- `dateString` (string): The date string to parse

**Returns:** 
- `Date`: Parsed date object

#### monthOptions

Array of month options for dropdowns.

**Returns:** 
- `Array<{value: string, label: string}>`: Month options

#### yearOptions

Array of year options for dropdowns.

**Returns:** 
- `Array<{value: string, label: string}>`: Year options

---

### Format Utilities

#### formatSaldoCOP(saldo, decimals)

Formats a number as Colombian Peso (COP) currency.

**Parameters:**
- `saldo` (number|string): The amount to format
- `decimals` (number): Number of decimal places (default: 2)

**Returns:** 
- `string`: Formatted currency string

**Example:**
```javascript
import { formatSaldoCOP } from 'react-custom-table-suite';

formatSaldoCOP(1000000) // "$1.000.000,00 COP"
formatSaldoCOP(1500.75, 2) // "$1.500,75 COP"
```

#### formatMiles(number, minDec, maxDec)

Formats a number with thousands separators.

**Parameters:**
- `number` (number|string): The number to format
- `minDec` (number): Minimum decimal places (default: 0)
- `maxDec` (number): Maximum decimal places (default: 0)

**Returns:** 
- `string`: Formatted number string

**Example:**
```javascript
import { formatMiles } from 'react-custom-table-suite';

formatMiles(1000000) // "1.000.000"
formatMiles(1500.75, 0, 2) // "1.500,75"
```

#### formatPercent(number, minDec, maxDec)

Formats a number as percentage.

**Parameters:**
- `number` (number|string): The number to format (decimal)
- `minDec` (number): Minimum decimal places (default: 0)
- `maxDec` (number): Maximum decimal places (default: 0)

**Returns:** 
- `string`: Formatted percentage string

**Example:**
```javascript
import { formatPercent } from 'react-custom-table-suite';

formatPercent(0.25) // "25%"
formatPercent(0.8567, 0, 2) // "85,67%"
```

#### formatPercentage(value, decimals)

Formats a percentage value for display.

**Parameters:**
- `value` (number|string): The value to format
- `decimals` (number): Number of decimal places (default: 2)

**Returns:** 
- `string`: Formatted percentage string

**Example:**
```javascript
import { formatPercentage } from 'react-custom-table-suite';

formatPercentage(0.25) // "25.00%"
formatPercentage(0.8567, 1) // "85.7%"
```

#### formatMoneyInt(saldo, dec)

Formats money with additional description.

**Parameters:**
- `saldo` (string): String in format "amount-description"
- `dec` (number): Number of decimal places (default: 0)

**Returns:** 
- `string`: Formatted money string with description

**Example:**
```javascript
import { formatMoneyInt } from 'react-custom-table-suite';

formatMoneyInt("1000000-Salary") // "$1.000.000 COP - (Salary)"
```

---

### Validation Utilities

#### validateNumericValue(value)

Validates and cleans numeric input by removing non-digit characters.

**Parameters:**
- `value` (string): The input value to validate

**Returns:** 
- `string`: Cleaned numeric string

**Example:**
```javascript
import { validateNumericValue } from 'react-custom-table-suite';

validateNumericValue("123abc456") // "123456"
validateNumericValue("$1,000.00") // "100000"
```

---

## Types

### ColumnConfig

```typescript
interface ColumnConfig {
  Header: string | React.ComponentType;
  accessor: string | ((row: any) => any);
  disableSortBy?: boolean;
  Cell?: React.ComponentType<{value: any, row: any}>;
  export?: boolean;
  formatCurrency?: boolean | number | ((value: any, row: any) => boolean);
  formatDate?: boolean | ((value: any, row: any) => boolean);
  formatPercentage?: boolean | number | ((value: any, row: any) => boolean);
  formatTipo?: boolean;
  headerAlign?: 'left' | 'center' | 'right';
  align?: 'left' | 'center' | 'right';
  verticalAlign?: 'top' | 'middle' | 'bottom';
  style?: React.CSSProperties;
  widthPercentage?: number;
  minWidth?: string;
  maxWidth?: string;
  link?: string | ((row: any) => string) | LinkConfig;
  linkText?: string | ((row: any) => string);
  linkClass?: string;
  linkProps?: object | ((row: any) => object);
  customCell?: React.ComponentType<CellProps>;
}
```

### LinkConfig

```typescript
interface LinkConfig {
  field: string;
  prefix?: string;
  suffix?: string;
}
```

### CellProps

```typescript
interface CellProps {
  row: any;
  value: any;
  routeTo: string;
  linkText: string;
  linkClass: string;
  linkComponent: React.ComponentType;
}
```

---

## Examples

### Basic Table

```jsx
import { CustomTable } from 'react-custom-table-suite';

const data = [
  { id: 1, name: 'John', email: 'john@example.com', age: 30 },
  { id: 2, name: 'Jane', email: 'jane@example.com', age: 25 }
];

const columns = [
  { Header: 'ID', accessor: 'id', widthPercentage: 10 },
  { Header: 'Name', accessor: 'name', widthPercentage: 30 },
  { Header: 'Email', accessor: 'email', widthPercentage: 40 },
  { Header: 'Age', accessor: 'age', widthPercentage: 20, align: 'center' }
];

<CustomTable data={data} columns={columns} />
```

### Advanced Table with Formatting

```jsx
const columns = [
  {
    Header: 'ID',
    accessor: 'id',
    widthPercentage: 10,
    align: 'center'
  },
  {
    Header: 'Name',
    accessor: 'name',
    widthPercentage: 25,
    link: (row) => `/users/${row.id}`,
    linkText: (row) => `View ${row.name}`
  },
  {
    Header: 'Salary',
    accessor: 'salary',
    widthPercentage: 20,
    formatCurrency: true,
    align: 'right'
  },
  {
    Header: 'Start Date',
    accessor: 'startDate',
    widthPercentage: 15,
    formatDate: true,
    align: 'center'
  },
  {
    Header: 'Performance',
    accessor: 'performance',
    widthPercentage: 15,
    formatPercentage: true,
    align: 'right'
  },
  {
    Header: 'Actions',
    accessor: 'id',
    widthPercentage: 15,
    export: false,
    Cell: ({ value }) => (
      <button onClick={() => handleEdit(value)}>
        Edit
      </button>
    )
  }
];

<CustomTable
  data={data}
  columns={columns}
  headerColor="#007bff"
  headerTextColor="#ffffff"
  rowColor={(row) => row.active ? '#e8f5e8' : '#ffe8e8'}
/>
```

### Using Hooks for Custom Implementation

```jsx
import { useTableData, useTableExport } from 'react-custom-table-suite/hooks';
import { SearchFilter, ExportButtons } from 'react-custom-table-suite/components';

function CustomTableImplementation() {
  const [searchTerm, setSearchTerm] = useState('');
  
  const { filteredData } = useTableData(
    data,
    ['name', 'email'],
    searchTerm,
    25
  );
  
  const { exportPDF, exportExcel, csvHeaders, csvData } = useTableExport(
    columns,
    filteredData,
    'My Custom Report',
    'horizontal'
  );

  return (
    <div>
      <SearchFilter
        searchTerm={searchTerm}
        onSearchChange={(e) => setSearchTerm(e.target.value)}
      />
      
      <ExportButtons
        exportExcel={exportExcel}
        exportPDF={exportPDF}
        csvHeaders={csvHeaders}
        csvData={csvData}
        exportFileName="Custom Report"
      />
      
      {/* Your custom table implementation */}
    </div>
  );
}
```

---

## Migration Guide

### From v1.0.0 to v2.0.0

No breaking changes - fully backward compatible.

### Adding New Features

The modular architecture allows easy extension:

1. **Custom Components**: Create new components in `components/` folder
2. **Custom Hooks**: Add new hooks in `hooks/` folder  
3. **Custom Utilities**: Add utilities in `utils/` folder
4. **Custom Formatters**: Extend format utilities

### Performance Optimization

- Use `useMemo` for expensive column calculations
- Implement virtual scrolling for large datasets
- Use `React.memo` for custom cell components
- Optimize re-renders with proper prop dependencies

---

## Support

For issues and questions:
- GitHub Issues: [react-custom-table-suite/issues](https://github.com/caes1996/react-custom-table-suite/issues)
- Documentation: [GitHub Wiki](https://github.com/caes1996/react-custom-table-suite/wiki)
- Examples: [CodeSandbox](https://codesandbox.io/s/react-custom-table-suite-examples)