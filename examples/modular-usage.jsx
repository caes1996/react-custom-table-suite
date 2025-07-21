import React, { useState } from 'react';
import { 
  CustomTable, 
  PaginationBar, 
  NoResult 
} from 'react-custom-table-suite';

// Import individual table components for advanced customization
import {
  LoadingSpinner,
  SearchFilter,
  ExportButtons,
  TableContainer,
  TableHeader,
  TableBody,
  TableRow,
  TableCell
} from 'react-custom-table-suite/dist/components/CustomTable/components';

// Import hooks for custom logic
import {
  useTableData,
  useTableExport
} from 'react-custom-table-suite/dist/hooks';

// Sample data for demonstrations
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
    performanceScore: 0.85,
    projects: 12
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
    performanceScore: 0.92,
    projects: 8
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
    performanceScore: 0.78,
    projects: 15
  }
];

const columns = [
  {
    Header: 'ID',
    accessor: 'id',
    widthPercentage: 8,
    align: 'center'
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
    Header: 'Department',
    accessor: 'department',
    widthPercentage: 15,
    align: 'center'
  },
  {
    Header: 'Salary',
    accessor: 'salary',
    widthPercentage: 12,
    align: 'right',
    formatCurrency: true
  },
  {
    Header: 'Projects',
    accessor: 'projects',
    widthPercentage: 10,
    align: 'center'
  },
  {
    Header: 'Performance',
    accessor: 'performanceScore',
    widthPercentage: 10,
    align: 'right',
    formatPercentage: true
  }
];

const ModularUsageExample = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentTab, setCurrentTab] = useState('complete');

  const handleRefresh = () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 2000);
  };

  // Complete Table Example
  const CompleteTableExample = () => (
    <div>
      <h4>📊 Tabla Completa (Todo Integrado)</h4>
      <p className="text-muted">
        Uso estándar del componente CustomTable con todas las funcionalidades integradas.
        Esta es la forma más simple y rápida de implementar una tabla completa.
      </p>
      
      <div className="alert alert-info">
        <strong>💡 Ventajas:</strong> Implementación rápida, todas las funcionalidades incluidas, 
        configuración mínima requerida.
      </div>
      
      <CustomTable
        data={sampleData}
        columns={columns}
        isLoading={isLoading}
        itemPerPage={10}
        showExcel={true}
        showPDF={true}
        showCSV={true}
        showFilter={true}
        showPagination={true}
        exportFileName="Employee Report"
        headerColor="#007bff"
        headerTextColor="#ffffff"
      />
    </div>
  );

  // Modular Components Example
  const ModularComponentsExample = () => (
    <div>
      <h4>🧩 Componentes Modulares (Uso Independiente)</h4>
      <p className="text-muted">
        Ejemplo de cómo usar componentes individuales para crear interfaces personalizadas 
        y reutilizar funcionalidades en diferentes partes de tu aplicación.
      </p>
      
      <div className="row mb-4">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">🔍 Filtro de Búsqueda Independiente</h5>
              <p className="card-text">
                Perfecto para búsquedas globales o filtros en barras de navegación.
              </p>
              <SearchFilter
                searchTerm={searchTerm}
                onSearchChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Buscar empleados..."
              />
              {searchTerm && (
                <small className="text-muted mt-2 d-block">
                  Buscando: "{searchTerm}"
                </small>
              )}
            </div>
          </div>
        </div>
        
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">📤 Botones de Exportación</h5>
              <p className="card-text">
                Reutiliza la funcionalidad de exportación en diferentes vistas.
              </p>
              <ExportButtons
                showExcel={true}
                showPDF={true}
                showCSV={true}
                exportExcel={() => alert('Excel export triggered!')}
                exportPDF={() => alert('PDF export triggered!')}
                csvHeaders={[]}
                csvData={[]}
                exportFileName="Custom Export"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="row mb-4">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">⏳ Indicador de Carga</h5>
              <p className="card-text">
                Consistencia en los estados de carga en toda la aplicación.
              </p>
              <LoadingSpinner message="Procesando datos de empleados..." />
            </div>
          </div>
        </div>
        
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">🚫 Sin Resultados</h5>
              <p className="card-text">
                Mensaje personalizable cuando no hay datos para mostrar.
              </p>
              <NoResult
                title="Sin empleados"
                message="No se encontraron empleados en este departamento."
                size={40}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">📊 Paginación Independiente</h5>
              <p className="card-text">
                Control de paginación reutilizable para cualquier lista de datos.
              </p>
              <PaginationBar
                totalItems={250}
                itemsPerPage={25}
                currentPage={5}
                onPageChange={(page) => console.log('Navegando a página:', page)}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Custom Hook Usage Example
  const CustomHookExample = () => {
    const [localSearchTerm, setLocalSearchTerm] = useState('');
    
    // Using custom hooks for advanced control
    const { filteredData } = useTableData(
      sampleData, 
      ['name', 'email', 'department'], 
      localSearchTerm, 
      5
    );
    
    const { exportPDF, exportExcel, csvHeaders, csvData } = useTableExport(
      columns,
      filteredData,
      'Custom Hook Export',
      'horizontal'
    );

    return (
      <div>
        <h4>🎣 Hooks Personalizados (Control Avanzado)</h4>
        <p className="text-muted">
          Usa hooks personalizados para crear lógica de tabla completamente personalizada
          y tener control total sobre el comportamiento de los datos.
        </p>
        
        <div className="alert alert-warning">
          <strong>🔧 Para Desarrolladores Avanzados:</strong> Esta aproximación te da control
          total sobre el estado y comportamiento de la tabla, pero requiere más configuración.
        </div>

        <div className="mb-4">
          <h5>Control de Datos con useTableData</h5>
          <div className="row">
            <div className="col-md-6">
              <SearchFilter
                searchTerm={localSearchTerm}
                onSearchChange={(e) => setLocalSearchTerm(e.target.value)}
                placeholder="Filtrar con hook personalizado..."
              />
            </div>
            <div className="col-md-6">
              <div className="d-flex align-items-center">
                <span className="badge bg-info me-2">
                  {filteredData.length} resultados
                </span>
                <small className="text-muted">
                  de {sampleData.length} total
                </small>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-4">
          <h5>Exportación con useTableExport</h5>
          <div className="d-flex gap-2">
            <button className="btn btn-outline-success" onClick={exportExcel}>
              📊 Excel ({filteredData.length} filas)
            </button>
            <button className="btn btn-outline-danger" onClick={exportPDF}>
              📄 PDF ({filteredData.length} filas)
            </button>
            <span className="badge bg-secondary align-self-center">
              CSV: {csvData.length} registros
            </span>
          </div>
        </div>

        <div className="bg-light p-3 rounded">
          <h6>📋 Código de Ejemplo:</h6>
          <pre className="mb-0"><code>{`import { useTableData, useTableExport } from 'react-custom-table-suite/hooks';

function MyCustomTable() {
  const [searchTerm, setSearchTerm] = useState('');
  
  const { filteredData } = useTableData(
    data, 
    ['name', 'email'], 
    searchTerm, 
    10
  );
  
  const { exportPDF } = useTableExport(
    columns, 
    filteredData, 
    'My Export'
  );
  
  return (
    <div>
      <SearchFilter 
        searchTerm={searchTerm} 
        onSearchChange={setSearchTerm} 
      />
      <button onClick={exportPDF}>Export PDF</button>
      {/* Tu tabla personalizada */}
    </div>
  );
}`}</code></pre>
        </div>
      </div>
    );
  };

  // Advanced Customization Example
  const AdvancedCustomizationExample = () => (
    <div>
      <h4>🛠️ Personalización Avanzada</h4>
      <p className="text-muted">
        Casos de uso avanzados y mejores prácticas para aprovechar al máximo 
        la arquitectura modular del paquete.
      </p>
      
      <div className="row mb-4">
        <div className="col-12">
          <div className="alert alert-success">
            <h6>✨ Casos de Uso Reales para Componentes Modulares:</h6>
            <div className="row">
              <div className="col-md-6">
                <ul className="mb-0">
                  <li><strong>SearchFilter:</strong> Búsqueda global en navbar</li>
                  <li><strong>ExportButtons:</strong> Reportes desde dashboards</li>
                  <li><strong>LoadingSpinner:</strong> Estados de carga consistentes</li>
                </ul>
              </div>
              <div className="col-md-6">
                <ul className="mb-0">
                  <li><strong>PaginationBar:</strong> Listas de productos/usuarios</li>
                  <li><strong>NoResult:</strong> Estados vacíos personalizados</li>
                  <li><strong>Hooks:</strong> Lógica compartida entre tablas</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row mb-4">
        <div className="col-md-6">
          <div className="card">
            <div className="card-header">
              <h6>📱 Aplicaciones Móviles</h6>
            </div>
            <div className="card-body">
              <ul className="list-unstyled">
                <li>✅ SearchFilter para búsqueda global</li>
                <li>✅ LoadingSpinner para UX consistente</li>
                <li>✅ PaginationBar para navegación optimizada</li>
                <li>✅ Componentes responsive por defecto</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="col-md-6">
          <div className="card">
            <div className="card-header">
              <h6>🏢 Aplicaciones Empresariales</h6>
            </div>
            <div className="card-body">
              <ul className="list-unstyled">
                <li>✅ Hooks compartidos entre módulos</li>
                <li>✅ Exportación desde múltiples vistas</li>
                <li>✅ Componentes reutilizables en equipos</li>
                <li>✅ Formateo consistente de datos</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <h6>🚀 Migración desde Versión Monolítica</h6>
        </div>
        <div className="card-body">
          <div className="row">
            <div className="col-md-6">
              <h6 className="text-success">✅ Sin Cambios Necesarios</h6>
              <pre><code>{`// ✅ Esto sigue funcionando igual
<CustomTable 
  data={data} 
  columns={columns} 
/>`}</code></pre>
            </div>
            <div className="col-md-6">
              <h6 className="text-info">🔧 Migración Gradual</h6>
              <pre><code>{`// ✅ Adopta componentes modulares gradualmente
import { CustomTable, SearchFilter } from 'react-custom-table-suite';

// Usar SearchFilter independiente
// Mantener CustomTable para tablas`}</code></pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="container mt-4">
      <div className="row mb-4">
        <div className="col-md-8">
          <h1>React Custom Table Suite - Uso Modular</h1>
          <p className="lead">
            Explora las diferentes formas de usar react-custom-table-suite, 
            desde el componente completo hasta componentes modulares individuales.
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

      {/* Navigation tabs */}
      <ul className="nav nav-tabs mb-4">
        <li className="nav-item">
          <button 
            className={`nav-link ${currentTab === 'complete' ? 'active' : ''}`}
            onClick={() => setCurrentTab('complete')}
          >
            📊 Tabla Completa
          </button>
        </li>
        <li className="nav-item">
          <button 
            className={`nav-link ${currentTab === 'modular' ? 'active' : ''}`}
            onClick={() => setCurrentTab('modular')}
          >
            🧩 Componentes
          </button>
        </li>
        <li className="nav-item">
          <button 
            className={`nav-link ${currentTab === 'hooks' ? 'active' : ''}`}
            onClick={() => setCurrentTab('hooks')}
          >
            🎣 Hooks
          </button>
        </li>
        <li className="nav-item">
          <button 
            className={`nav-link ${currentTab === 'advanced' ? 'active' : ''}`}
            onClick={() => setCurrentTab('advanced')}
          >
            🛠️ Avanzado
          </button>
        </li>
      </ul>

      {/* Tab content */}
      <div className="tab-content">
        {currentTab === 'complete' && <CompleteTableExample />}
        {currentTab === 'modular' && <ModularComponentsExample />}
        {currentTab === 'hooks' && <CustomHookExample />}
        {currentTab === 'advanced' && <AdvancedCustomizationExample />}
      </div>

      {/* Footer with summary */}
      <div className="mt-5 pt-4 border-top">
        <div className="row">
          <div className="col-md-8">
            <h5>📚 Resumen de Opciones</h5>
            <p className="text-muted">
              <strong>Tabla Completa:</strong> Perfecta para implementación rápida con todas las funcionalidades.<br/>
              <strong>Componentes Modulares:</strong> Ideal para interfaces personalizadas y reutilización.<br/>
              <strong>Hooks Personalizados:</strong> Control total para desarrolladores avanzados.<br/>
              <strong>Personalización Avanzada:</strong> Casos de uso complejos y arquitecturas escalables.
            </p>
          </div>
          <div className="col-md-4">
            <div className="bg-light p-3 rounded">
              <h6>🎯 Recomendaciones</h6>
              <ul className="list-unstyled mb-0 small">
                <li>• Comienza con <strong>Tabla Completa</strong></li>
                <li>• Usa <strong>Componentes</strong> para personalización</li>
                <li>• Adopta <strong>Hooks</strong> para casos avanzados</li>
                <li>• Migra gradualmente según necesidades</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModularUsageExample;