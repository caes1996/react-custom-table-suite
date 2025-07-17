import React, { useState } from 'react';
import { CustomTable, PaginationBar, NoResult } from 'react-custom-table-suite';
import 'react-custom-table-suite/dist/index.css';

// Sample data
const sampleData = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john@example.com',
    age: 30,
    salary: 50000,
    department: 'Engineering',
    startDate: '2023-01-15',
    status: 'active',
    performanceScore: 0.85
  },
  {
    id: 2,
    name: 'Jane Smith',
    email: 'jane@example.com',
    age: 25,
    salary: 45000,
    department: 'Marketing',
    startDate: '2023-03-20',
    status: 'active',
    performanceScore: 0.92
  },
  {
    id: 3,
    name: 'Mike Johnson',
    email: 'mike@example.com',
    age: 35,
    salary: 60000,
    department: 'Engineering',
    startDate: '2022-11-10',
    status: 'inactive',
    performanceScore: 0.78
  },
  {
    id: 4,
    name: 'Sarah Wilson',
    email: 'sarah@example.com',
    age: 28,
    salary: 52000,
    department: 'Design',
    startDate: '2023-05-12',
    status: 'active',
    performanceScore: 0.89
  },
  {
    id: 5,
    name: 'David Brown',
    email: 'david@example.com',
    age: 42,
    salary: 75000,
    department: 'Engineering',
    startDate: '2021-08-03',
    status: 'active',
    performanceScore: 0.91
  }
];

// Column configuration
const columns = [
  {
    Header: 'ID',
    accessor: 'id',
    widthPercentage: 8,
    align: 'center',
    disableSortBy: false
  },
  {
    Header: 'Name',
    accessor: 'name',
    widthPercentage: 20,
    align: 'left'
  },
  {
    Header: 'Email',
    accessor: 'email',
    widthPercentage: 25,
    align: 'left'
  },
  {
    Header: 'Age',
    accessor: 'age',
    widthPercentage: 8,
    align: 'center'
  },
  {
    Header: 'Salary',
    accessor: 'salary',
    widthPercentage: 15,
    align: 'right',
    formatCurrency: true
  },
  {
    Header: 'Department',
    accessor: 'department',
    widthPercentage: 12,
    align: 'center'
  },
  {
    Header: 'Start Date',
    accessor: 'startDate',
    widthPercentage: 12,
    align: 'center',
    formatDate: true
  },
  {
    Header: 'Performance',
    accessor: 'performanceScore',
    widthPercentage: 12,
    align: 'right',
    formatPercentage: true
  },
  {
    Header: 'Status',
    accessor: 'status',
    widthPercentage: 8,
    align: 'center',
    Cell: ({ value }) => (
      <span 
        className={`badge ${value === 'active' ? 'bg-success' : 'bg-secondary'}`}
        style={{
          padding: '0.25rem 0.5rem',
          borderRadius: '0.375rem',
          fontSize: '0.75rem',
          fontWeight: 'bold',
          color: 'white'
        }}
      >
        {value}
      </span>
    )
  }
];

const BasicUsageExample = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [currentExample, setCurrentExample] = useState('basic');

  const handleRefresh = () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 2000);
  };

  const BasicExample = () => (
    <div>
      <h4>📊 Ejemplo Básico</h4>
      <p>Uso estándar del componente CustomTable con configuración mínima.</p>
      
      <CustomTable
        data={sampleData}
        columns={columns}
        isLoading={isLoading}
        exportFileName="Employee Report Basic"
      />
    </div>
  );

  const AdvancedExample = () => (
    <div>
      <h4>🚀 Ejemplo Avanzado</h4>
      <p>CustomTable con todas las opciones de personalización habilitadas.</p>
      
      <CustomTable
        data={sampleData}
        columns={columns}
        isLoading={isLoading}
        itemPerPage={3}
        showExcel={true}
        showPDF={true}
        showCSV={true}
        showFilter={true}
        showPagination={true}
        exportOrientation="horizontal"
        exportFileName="Employee Report Advanced"
        headerColor="#007bff"
        headerTextColor="#ffffff"
        fitContent={false}
        verticalAlign="middle"
        filters={['name', 'email', 'department']}
        rowColor={(row) => row.status === 'inactive' ? '#f8f9fa' : undefined}
      />
    </div>
  );

  const CustomStyleExample = () => (
    <div>
      <h4>🎨 Ejemplo con Estilos Personalizados</h4>
      <p>Tabla con colores y formateo personalizado.</p>
      
      <CustomTable
        data={sampleData}
        columns={[
          ...columns.slice(0, -1),
          {
            Header: 'Actions',
            accessor: 'id',
            widthPercentage: 15,
            align: 'center',
            export: false,
            Cell: ({ value }) => (
              <div>
                <button 
                  className="btn btn-sm btn-outline-primary me-1"
                  onClick={() => alert(`Edit user ${value}`)}
                >
                  Edit
                </button>
                <button 
                  className="btn btn-sm btn-outline-danger"
                  onClick={() => alert(`Delete user ${value}`)}
                >
                  Delete
                </button>
              </div>
            )
          }
        ]}
        isLoading={isLoading}
        itemPerPage={5}
        exportFileName="Employee Report Custom"
        headerColor="bg-dark"
        headerTextColor="#ffffff"
        rowColor={(row) => {
          if (row.performanceScore > 0.9) return '#d4edda';
          if (row.performanceScore < 0.8) return '#f8d7da';
          return undefined;
        }}
      />
    </div>
  );

  const ComponentsExample = () => (
    <div>
      <h4>🧩 Componentes Individuales</h4>
      <p>Ejemplos de componentes que puedes usar por separado.</p>
      
      <div className="row">
        <div className="col-md-6 mb-4">
          <h5>Paginación Independiente</h5>
          <PaginationBar
            totalItems={100}
            itemsPerPage={10}
            currentPage={3}
            onPageChange={(page) => console.log('Page changed to:', page)}
          />
        </div>

        <div className="col-md-6 mb-4">
          <h5>Sin Resultados</h5>
          <NoResult
            title="No employees found"
            message="Try adjusting your search criteria or add new employees."
            size={48}
          />
        </div>
      </div>

      <div className="alert alert-info">
        <h6>💡 Tip: Componentes Modulares</h6>
        <p className="mb-0">
          Cada componente puede usarse independientemente. Perfecto para crear 
          interfaces personalizadas o reutilizar funcionalidad en diferentes partes 
          de tu aplicación.
        </p>
      </div>
    </div>
  );

  const CodeExample = () => (
    <div>
      <h4>💻 Ejemplos de Código</h4>
      
      <div className="mb-4">
        <h5>Importación Básica</h5>
        <pre><code>{`import { CustomTable } from 'react-custom-table-suite';
import 'react-custom-table-suite/dist/index.css';

const data = [
  { id: 1, name: 'John', email: 'john@example.com' }
];

const columns = [
  { Header: 'ID', accessor: 'id' },
  { Header: 'Name', accessor: 'name' },
  { Header: 'Email', accessor: 'email' }
];

<CustomTable data={data} columns={columns} />`}</code></pre>
      </div>

      <div className="mb-4">
        <h5>Configuración Avanzada de Columnas</h5>
        <pre><code>{`const columns = [
  {
    Header: 'Salary',
    accessor: 'salary',
    formatCurrency: true,      // Formato de moneda
    align: 'right',           // Alineación
    widthPercentage: 15       // Ancho personalizado
  },
  {
    Header: 'Date',
    accessor: 'startDate',
    formatDate: true,         // Formato de fecha
    align: 'center'
  },
  {
    Header: 'Performance',
    accessor: 'score',
    formatPercentage: true,   // Formato de porcentaje
    align: 'right'
  },
  {
    Header: 'Actions',
    accessor: 'id',
    export: false,            // No exportar esta columna
    Cell: ({ value }) => (
      <button onClick={() => edit(value)}>
        Edit
      </button>
    )
  }
];`}</code></pre>
      </div>

      <div className="mb-4">
        <h5>Personalización de Estilos</h5>
        <pre><code>{`<CustomTable
  data={data}
  columns={columns}
  headerColor="#007bff"         // Color del header
  headerTextColor="#ffffff"     // Color del texto del header
  rowColor={(row) => 
    row.status === 'inactive' ? '#f8f9fa' : undefined
  }                            // Color condicional de filas
  fitContent={true}            // Permitir wrap de texto
  verticalAlign="top"          // Alineación vertical
/>`}</code></pre>
      </div>
    </div>
  );

  return (
    <div className="container mt-4">
      <h1>React Custom Table Suite - Ejemplos de Uso</h1>
      
      <div className="row mb-4">
        <div className="col-md-8">
          <p className="lead">
            Explora diferentes formas de usar react-custom-table-suite con ejemplos 
            prácticos y configuraciones reales.
          </p>
        </div>
        <div className="col-md-4 text-end">
          <button 
            className="btn btn-primary" 
            onClick={handleRefresh}
            disabled={isLoading}
          >
            {isLoading ? 'Cargando...' : 'Simular Carga'}
          </button>
        </div>
      </div>

      {/* Navigation */}
      <ul className="nav nav-pills mb-4">
        <li className="nav-item">
          <button 
            className={`nav-link ${currentExample === 'basic' ? 'active' : ''}`}
            onClick={() => setCurrentExample('basic')}
          >
            Básico
          </button>
        </li>
        <li className="nav-item">
          <button 
            className={`nav-link ${currentExample === 'advanced' ? 'active' : ''}`}
            onClick={() => setCurrentExample('advanced')}
          >
            Avanzado
          </button>
        </li>
        <li className="nav-item">
          <button 
            className={`nav-link ${currentExample === 'custom' ? 'active' : ''}`}
            onClick={() => setCurrentExample('custom')}
          >
            Personalizado
          </button>
        </li>
        <li className="nav-item">
          <button 
            className={`nav-link ${currentExample === 'components' ? 'active' : ''}`}
            onClick={() => setCurrentExample('components')}
          >
            Componentes
          </button>
        </li>
        <li className="nav-item">
          <button 
            className={`nav-link ${currentExample === 'code' ? 'active' : ''}`}
            onClick={() => setCurrentExample('code')}
          >
            Código
          </button>
        </li>
      </ul>

      {/* Content */}
      <div className="tab-content">
        {currentExample === 'basic' && <BasicExample />}
        {currentExample === 'advanced' && <AdvancedExample />}
        {currentExample === 'custom' && <CustomStyleExample />}
        {currentExample === 'components' && <ComponentsExample />}
        {currentExample === 'code' && <CodeExample />}
      </div>
    </div>
  );
};

export default BasicUsageExample;