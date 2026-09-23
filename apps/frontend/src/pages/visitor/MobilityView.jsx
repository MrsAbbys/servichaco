import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { fetchMobilityRoutes } from '../../services/api';
import { Bus, Clock, DollarSign, MapPin } from 'lucide-react';

export default function MobilityView() {
  const [routes, setRoutes] = useState([]);
  const [selectedRoute, setSelectedRoute] = useState(null);
  const [loading, setLoading] = useState(true);

  // Centro de Yacuiba (Plaza 12 de Agosto)
  const defaultCenter = [-22.0139, -63.6775];

  useEffect(() => {
    loadRoutes();
  }, []);

  const loadRoutes = async () => {
    setLoading(true);
    const data = await fetchMobilityRoutes();
    setRoutes(data);
    if (data.length > 0) setSelectedRoute(data[0]);
    setLoading(false);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Yacuiba Móvil: Rutas y Transporte Urbano</h1>
        <p className="text-sm text-slate-500 mt-1">
          Consulta paradas, horarios aproximados y trazados de micros y trufis locales.
        </p>
      </div>

      {loading ? (
        <p className="text-center py-10 text-sm text-slate-500">Cargando rutas de transporte...</p>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Selector de Rutas y Detalle */}
          <div className="space-y-4">
            <h2 className="text-sm font-semibold text-slate-700 uppercase tracking-wide">
              Líneas Disponibles
            </h2>
            <div className="space-y-2">
              {routes.map((r) => (
                <button
                  key={r.id}
                  onClick={() => setSelectedRoute(r)}
                  className={`w-full text-left p-4 rounded-xl border transition-all flex items-center justify-between ${
                    selectedRoute?.id === r.id
                      ? 'border-emerald-600 bg-emerald-50/50 shadow-sm'
                      : 'border-slate-200 bg-white hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div
                      className="w-9 h-9 rounded-lg flex items-center justify-center text-white"
                      style={{ backgroundColor: r.color }}
                    >
                      <Bus className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-800 text-sm">{r.name}</h3>
                      <p className="text-xs text-slate-500 capitalize">Tipo: {r.type}</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>

            {selectedRoute && (
              <div className="bg-white rounded-xl p-5 border border-slate-200 space-y-3">
                <h3 className="font-bold text-slate-800 text-sm border-b pb-2">Información del Servicio</h3>
                <div className="flex items-center text-xs text-slate-600">
                  <Clock className="w-4 h-4 mr-2 text-slate-400" />
                  <span>Horario: {selectedRoute.schedule} (cada {selectedRoute.frequencyMinutes} min)</span>
                </div>
                <div className="flex items-center text-xs text-slate-600">
                  <DollarSign className="w-4 h-4 mr-2 text-slate-400" />
                  <span>Pasaje: {selectedRoute.fareBob.toFixed(2)} Bs.</span>
                </div>

                <div className="pt-2">
                  <span className="text-xs font-semibold text-slate-700 block mb-2">Paradas Clave:</span>
                  <ul className="space-y-1.5">
                    {selectedRoute.stops.map((stop, idx) => (
                      <li key={idx} className="flex items-start text-xs text-slate-600">
                        <MapPin className="w-3.5 h-3.5 mr-1.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{stop}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>

          {/* Visor de Mapa con OpenStreetMap y Leaflet */}
          <div className="lg:col-span-2 h-[480px] bg-slate-100 rounded-2xl overflow-hidden border border-slate-200 shadow-sm relative">
            <MapContainer
              center={defaultCenter}
              zoom={13}
              style={{ height: '100%', width: '100%' }}
              scrollWheelZoom={true}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              {selectedRoute && (
                <GeoJSON
                  key={selectedRoute.id}
                  data={selectedRoute.geojson}
                  style={() => ({
                    color: selectedRoute.color,
                    weight: 5,
                    opacity: 0.85
                  })}
                />
              )}
            </MapContainer>
          </div>
        </div>
      )}
    </div>
  );
}
