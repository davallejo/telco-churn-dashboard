import React, { useState, useMemo } from 'react';
import Papa from 'papaparse';
import * as FileSaver from 'file-saver';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function TelcoChurnDashboard() {
  const [data, setData] = useState([]);
  const [filterContract, setFilterContract] = useState('');
  const [filterInternet, setFilterInternet] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 10;

  // Normalizar valor
  const normalizeNumber = (val) => {
    if (val === null || val === undefined || val === '') return 0;
    const str = String(val).replace(/,/g, '.');
    const num = parseFloat(str);
    return isNaN(num) ? 0 : num;
  };

  const normalizeChurn = (val) => {
    if (!val) return 'No';
    const str = String(val).toLowerCase().trim();
    if (['yes', '1', 'true', 'si', 'sí'].includes(str)) return 'Yes';
    return 'No';
  };

  // Procesar CSV
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      Papa.parse(file, {
        header: true,
        skipEmptyLines: true,
        complete: (results) => {
          const normalized = results.data.map(row => ({
            ...row,
            Churn: normalizeChurn(row.Churn),
            tenure: normalizeNumber(row.tenure),
            MonthlyCharges: normalizeNumber(row.MonthlyCharges),
            TotalCharges: normalizeNumber(row.TotalCharges),
          }));
          setData(normalized);
          setCurrentPage(1);
        },
      });
    }
  };

  // Filtrar datos
  const filteredData = useMemo(() => {
    return data.filter(row => {
      const matchContract = !filterContract || row.Contract === filterContract;
      const matchInternet = !filterInternet || row.InternetService === filterInternet;
      const matchSearch = !searchTerm || Object.values(row).some(val =>
        String(val).toLowerCase().includes(searchTerm.toLowerCase())
      );
      return matchContract && matchInternet && matchSearch;
    });
  }, [data, filterContract, filterInternet, searchTerm]);

  // KPIs
  const kpis = useMemo(() => {
    if (filteredData.length === 0) return { total: 0, churnRate: 0, avgTenure: 0, avgTicket: 0 };
    
    const churnCount = filteredData.filter(r => r.Churn === 'Yes').length;
    const totalTenure = filteredData.reduce((sum, r) => sum + r.tenure, 0);
    const totalCharges = filteredData.reduce((sum, r) => sum + r.MonthlyCharges, 0);

    return {
      total: filteredData.length,
      churnRate: ((churnCount / filteredData.length) * 100).toFixed(2),
      avgTenure: (totalTenure / filteredData.length).toFixed(1),
      avgTicket: (totalCharges / filteredData.length).toFixed(2),
    };
  }, [filteredData]);

  // Gráfica: Churn por Contract
  const chartDataContract = useMemo(() => {
    const contracts = [...new Set(filteredData.map(r => r.Contract))].filter(Boolean);
    return contracts.map(contract => {
      const subset = filteredData.filter(r => r.Contract === contract);
      const churnCount = subset.filter(r => r.Churn === 'Yes').length;
      return {
        name: contract,
        Churn: ((churnCount / subset.length) * 100).toFixed(2),
      };
    });
  }, [filteredData]);

  // Gráfica: Churn por InternetService
  const chartDataInternet = useMemo(() => {
    const services = [...new Set(filteredData.map(r => r.InternetService))].filter(Boolean);
    return services.map(service => {
      const subset = filteredData.filter(r => r.InternetService === service);
      const churnCount = subset.filter(r => r.Churn === 'Yes').length;
      return {
        name: service,
        Churn: ((churnCount / subset.length) * 100).toFixed(2),
      };
    });
  }, [filteredData]);

  // Paginación
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = filteredData.slice(indexOfFirstRecord, indexOfLastRecord);
  const totalPages = Math.ceil(filteredData.length / recordsPerPage);

  // Exportar CSV
  const exportCSV = () => {
    const csv = Papa.unparse(filteredData);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    FileSaver.saveAs(blob, 'telco_churn_filtered.csv');
  };

  // Opciones de filtros
  const contractOptions = useMemo(() => [...new Set(data.map(r => r.Contract))].filter(Boolean), [data]);
  const internetOptions = useMemo(() => [...new Set(data.map(r => r.InternetService))].filter(Boolean), [data]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-[#0033A0] text-white py-6 px-8 shadow-lg relative">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between">
          <div>
            <h1 className="text-3xl font-bold">Telco Churn Dashboard</h1>
            <p className="text-sm mt-1 opacity-90">Análisis Ejecutivo de Fuga de Clientes</p>
          </div>

          {/* Nombre alineado a la derecha */}
          <p className="text-sm mt-4 md:mt-0 md:self-end">
            Elaborado por: Diego Vallejo
          </p>
        </div>
      </header>


      <div className="max-w-7xl mx-auto px-8 py-8">
        {/* Upload CSV */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <label className="block text-lg font-semibold text-gray-700 mb-3">Subir archivo CSV</label>
          <input
            type="file"
            accept=".csv"
            onChange={handleFileUpload}
            className="block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-big-blue file:text-white hover:file:bg-blue-800 cursor-pointer"
          />
        </div>

        {data.length > 0 && (
          <>
            {/* KPIs */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <div className="bg-white rounded-lg shadow p-6">
                <div className="text-sm font-medium text-gray-500">Total Usuarios</div>
                <div className="text-3xl font-bold text-big-blue mt-2">{kpis.total}</div>
              </div>
              <div className="bg-white rounded-lg shadow p-6">
                <div className="text-sm font-medium text-gray-500">Churn Rate</div>
                <div className="text-3xl font-bold text-red-600 mt-2">{kpis.churnRate}%</div>
              </div>
              <div className="bg-white rounded-lg shadow p-6">
                <div className="text-sm font-medium text-gray-500">Tenure Medio</div>
                <div className="text-3xl font-bold text-big-blue mt-2">{kpis.avgTenure} m</div>
              </div>
              <div className="bg-white rounded-lg shadow p-6">
                <div className="text-sm font-medium text-gray-500">Ticket Medio</div>
                <div className="text-3xl font-bold text-green-600 mt-2">${kpis.avgTicket}</div>
              </div>
            </div>

            {/* Filtros */}
            <div className="bg-white rounded-lg shadow p-6 mb-8">
              <h2 className="text-lg font-semibold text-gray-700 mb-4">Filtros</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-2">Tipo de Contrato</label>
                  <select
                    value={filterContract}
                    onChange={(e) => setFilterContract(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-big-blue"
                  >
                    <option value="">Todos</option>
                    {contractOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-2">Servicio de Internet</label>
                  <select
                    value={filterInternet}
                    onChange={(e) => setFilterInternet(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-big-blue"
                  >
                    <option value="">Todos</option>
                    {internetOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                  </select>
                </div>
              </div>
            </div>

            {/* Gráficas */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-lg font-semibold text-gray-700 mb-4">% Churn por Contrato</h2>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={chartDataContract}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="Churn" fill="#0033A0" />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-lg font-semibold text-gray-700 mb-4">% Churn por Servicio Internet</h2>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={chartDataInternet}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="Churn" fill="#0033A0" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Tabla */}
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-gray-700">Registros</h2>
                <button
                  onClick={exportCSV}
                  className="px-4 py-2 bg-big-blue text-white rounded-md hover:bg-blue-800 font-medium"
                >
                  Exportar CSV
                </button>
              </div>

              <input
                type="text"
                placeholder="Buscar..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-big-blue"
              />

              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase">Customer ID</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase">Gender</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase">Tenure</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase">Contract</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase">Internet</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase">Monthly</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase">Total</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase">Churn</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {currentRecords.map((row, idx) => (
                      <tr key={idx} className="hover:bg-gray-50">
                        <td className="px-4 py-3 text-sm text-gray-700">{row.customerID}</td>
                        <td className="px-4 py-3 text-sm text-gray-700">{row.gender}</td>
                        <td className="px-4 py-3 text-sm text-gray-700">{row.tenure}</td>
                        <td className="px-4 py-3 text-sm text-gray-700">{row.Contract}</td>
                        <td className="px-4 py-3 text-sm text-gray-700">{row.InternetService}</td>
                        <td className="px-4 py-3 text-sm text-gray-700">${row.MonthlyCharges.toFixed(2)}</td>
                        <td className="px-4 py-3 text-sm text-gray-700">${row.TotalCharges.toFixed(2)}</td>
                        <td className="px-4 py-3 text-sm">
                          <span className={`px-2 py-1 rounded text-xs font-medium ${row.Churn === 'Yes' ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}`}>
                            {row.Churn}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Paginación */}
              <div className="flex justify-between items-center mt-4">
                <div className="text-sm text-gray-600">
                  Mostrando {indexOfFirstRecord + 1} - {Math.min(indexOfLastRecord, filteredData.length)} de {filteredData.length}
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    className="px-3 py-1 border border-gray-300 rounded disabled:opacity-50 hover:bg-gray-100"
                  >
                    Anterior
                  </button>
                  <button
                    onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                    disabled={currentPage === totalPages}
                    className="px-3 py-1 border border-gray-300 rounded disabled:opacity-50 hover:bg-gray-100"
                  >
                    Siguiente
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
