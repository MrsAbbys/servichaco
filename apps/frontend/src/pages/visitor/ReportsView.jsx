import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { fetchCitizenReports, submitCitizenReport } from '../../services/api';
import { AlertTriangle, PlusCircle, CheckCircle2, Clock, Send } from 'lucide-react';

// Fix para iconos estándar de Leaflet en Vite/Webpack
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

export default function ReportsView() {
  const [reports, setReports] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [loading, setLoading] = useState(true);

  // Formulario
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('bache');
  const [description, setDescription] = useState('');
  const [latitude, setLatitude] = useState(-22.0139);
  const [longitude, setLongitude] = useState(-63.6775);
  const [submitting, setSubmitting] = useState(false);
  const [feedback, setFeedback] = useState(null);

  const defaultCenter = [-22.0139, -63.6775];

  useEffect(() => {
    loadReports();
  }, [selectedCategory]);

  const loadReports = async () => {
    setLoading(true);
    const data = await fetchCitizenReports(selectedCategory);
    setReports(data);
    setLoading(false);
  };

  const handleCreateReport = async (e) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) return;

    setSubmitting(true);
    setFeedback(null);

    const payload = {
      title,
      category,
      description,
      latitude: parseFloat(latitude),
      longitude: parseFloat(longitude)
    };

    const res = await submitCitizenReport(payload);
    if (res.success) {
      setFeedback({ type: 'success', msg: 'Reporte registrado exitosamente en ServiChaco.' });
      setTitle('');
      setDescription('');
      loadReports();
    } else {
      setFeedback({ type: 'error', msg: 'No se pudo registrar el reporte.' });
    }
    setSubmitting(false);
  };

  const categories = [
    { label: 'Todos', value: '' },
    { label: 'Baches / Vías', value: 'bache' },
    { label: 'Luminarias / Luz', value: 'luminaria' },
    { label: 'Fugas de Agua', value: 'fuga_agua' },
    { label: 'Residuos / Basura', value: 'basura' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Reportes Urbanos Ciudadanos</h1>
        <p className="text-sm text-slate-500 mt-1">
          Identifica y visualiza problemas en la infraestructura pública de Yacuiba.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Columna Izquierda: Formulario de Reporte */}
        <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center space-x-2 border-b pb-3">
            <PlusCircle className="w-5 h-5 text-emerald-700" />
            <h2 className="font-bold text-slate-800 text-sm">Registrar Nuevo Incidente</h2>
          </div>

          {feedback && (
            <div className={`p-3 rounded-lg text-xs font-medium ${
              feedback.type === 'success' ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' : 'bg-rose-50 text-rose-800 border border-rose-200'
            }`}>
              {feedback.msg}
            </div>
          )}

          <form onSubmit={handleCreateReport} className="space-y-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Título del problema</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Ej. Luminaria rota en Barrio Petrolero"
                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs focus:outline-none focus:border-emerald-600"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Categoría</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs bg-white focus:outline-none focus:border-emerald-600"
              >
                <option value="bache">Bache / Desperfecto vial</option>
                <option value="luminaria">Alumbrado público</option>
                <option value="fuga_agua">Fuga de agua potable o desagüe</option>
                <option value="basura">Microbasural / Residuos</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Descripción detallada</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
                placeholder="Indica referencias de la calle, esquinas o peligros asociados..."
                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs focus:outline-none focus:border-emerald-600"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs">
              <div>
                <label className="block text-[11px] font-medium text-slate-500 mb-0.5">Latitud</label>
                <input
                  type="number"
                  step="0.0001"
                  value={latitude}
                  onChange={(e) => setLatitude(e.target.value)}
                  className="w-full px-2 py-1.5 border border-slate-200 rounded text-xs"
                />
              </div>
              <div>
                <label className="block text-[11px] font-medium text-slate-500 mb-0.5">Longitud</label>
                <input
                  type="number"
                  step="0.0001"
                  value={longitude}
                  onChange={(e) => setLongitude(e.target.value)}
                  className="w-full px-2 py-1.5 border border-slate-200 rounded text-xs"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-emerald-700 hover:bg-emerald-800 disabled:opacity-50 text-white font-semibold py-2 rounded-lg text-xs transition-colors flex items-center justify-center space-x-1.5"
            >
              <Send className="w-3.5 h-3.5" />
              <span>{submitting ? 'Enviando...' : 'Publicar Reporte'}</span>
            </button>
          </form>
        </div>

        {/* Columna Derecha: Filtros y Mapa de Incidentes */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex flex-wrap gap-2">
            {categories.map((c) => (
              <button
                key={c.value}
                onClick={() => setSelectedCategory(c.value)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                  selectedCategory === c.value
                    ? 'bg-orange-600 text-white'
                    : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>

          <div className="h-[460px] bg-slate-100 rounded-2xl overflow-hidden border border-slate-200 shadow-sm relative">
            <MapContainer
              center={defaultCenter}
              zoom={14}
              style={{ height: '100%', width: '100%' }}
              scrollWheelZoom={true}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              {reports.map((r) => (
                <Marker key={r.id} position={[parseFloat(r.latitude), parseFloat(r.longitude)]}>
                  <Popup>
                    <div className="text-xs space-y-1">
                      <div className="font-bold text-slate-800">{r.title}</div>
                      <div className="text-[10px] uppercase font-semibold text-orange-600">
                        {r.category}
                      </div>
                      <p className="text-slate-600 text-[11px]">{r.description}</p>
                      <div className="pt-1 text-[10px] text-slate-400">
                        Estado: <span className="capitalize font-medium text-slate-700">{r.status}</span>
                      </div>
                    </div>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
