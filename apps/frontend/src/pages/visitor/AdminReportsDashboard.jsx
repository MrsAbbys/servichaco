import React, { useState, useEffect } from 'react';
import { fetchCitizenReports, updateReportStatus } from '../../services/api';
import { ShieldCheck, CheckCircle2, Clock, AlertCircle, RefreshCw } from 'lucide-react';

export default function AdminReportsDashboard() {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadReports();
  }, []);

  const loadReports = async () => {
    setLoading(true);
    const data = await fetchCitizenReports();
    setReports(data);
    setLoading(false);
  };

  const handleStatusChange = async (id, newStatus) => {
    const res = await updateReportStatus(id, newStatus);
    if (res.success) {
      setReports(prev => prev.map(r => r.id === id ? { ...r, status: newStatus } : r));
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'resuelto':
        return <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 flex items-center w-max"><CheckCircle2 className="w-3.5 h-3.5 mr-1" /> Resuelto</span>;
      case 'en_revision':
        return <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-100 text-amber-800 flex items-center w-max"><Clock className="w-3.5 h-3.5 mr-1" /> En Revisión</span>;
      default:
        return <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-rose-100 text-rose-800 flex items-center w-max"><AlertCircle className="w-3.5 h-3.5 mr-1" /> Pendiente</span>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 flex items-center">
            <ShieldCheck className="w-6 h-6 mr-2 text-emerald-700" />
            Panel de Gestión de Incidentes Urbanos
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Mesa de control municipal para la resolución de baches, luminarias y fugas en Yacuiba.
          </p>
        </div>
        <button
          onClick={loadReports}
          className="flex items-center space-x-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 px-3.5 py-2 rounded-xl text-xs font-semibold"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Actualizar</span>
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-600">
            <thead className="bg-slate-50 text-slate-700 uppercase font-bold border-b border-slate-200 text-[11px]">
              <tr>
                <th className="px-5 py-3.5">Título y Ubicación</th>
                <th className="px-4 py-3.5">Categoría</th>
                <th className="px-4 py-3.5">Estado Actual</th>
                <th className="px-4 py-3.5">Fecha</th>
                <th className="px-5 py-3.5 text-right">Acción de Control</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {reports.map((r) => (
                <tr key={r.id} className="hover:bg-slate-50/60 transition-colors">
                  <td className="px-5 py-4">
                    <div className="font-bold text-slate-800 text-sm">{r.title}</div>
                    <div className="text-[11px] text-slate-400 mt-0.5">Lat: {r.latitude} | Lng: {r.longitude}</div>
                    <p className="text-slate-500 text-xs mt-1 max-w-md">{r.description}</p>
                  </td>
                  <td className="px-4 py-4">
                    <span className="uppercase font-semibold tracking-wider text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded">
                      {r.category}
                    </span>
                  </td>
                  <td className="px-4 py-4">{getStatusBadge(r.status)}</td>
                  <td className="px-4 py-4 text-slate-500 whitespace-nowrap">
                    {new Date(r.created_at).toLocaleDateString()}
                  </td>
                  <td className="px-5 py-4 text-right">
                    <select
                      value={r.status}
                      onChange={(e) => handleStatusChange(r.id, e.target.value)}
                      className="bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs text-slate-700 focus:outline-none focus:border-emerald-600 font-medium"
                    >
                      <option value="pendiente">Pendiente</option>
                      <option value="en_revision">En Revisión</option>
                      <option value="resuelto">Resuelto</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
