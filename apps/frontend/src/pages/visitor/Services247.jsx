import React, { useState, useEffect } from 'react';
import { fetchPublicServices } from '../../services/api';
import { Phone, MapPin, CheckCircle, Clock } from 'lucide-react';

export default function Services247() {
  const [services, setServices] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [only247, setOnly247] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadServices();
  }, [selectedCategory, only247]);

  const loadServices = async () => {
    setLoading(true);
    const data = await fetchPublicServices(selectedCategory, only247);
    setServices(data);
    setLoading(false);
  };

  const categories = [
    { label: 'Todos', value: '' },
    { label: 'Farmacias', value: 'farmacia' },
    { label: 'Salud / Hospitales', value: 'salud' },
    { label: 'Talleres Mecánicos', value: 'taller' },
    { label: 'Radiotaxis', value: 'transporte' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Servicios y Urgencias en Yacuiba</h1>
        <p className="text-sm text-slate-500 mt-1">
          Encuentra atención inmediata, farmacias de turno y contactos de auxilio.
        </p>
      </div>

      {/* Barra de Filtros */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-4 rounded-xl border border-slate-200">
        <div className="flex flex-wrap gap-2">
          {categories.map((c) => (
            <button
              key={c.value}
              onClick={() => setSelectedCategory(c.value)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                selectedCategory === c.value
                  ? 'bg-emerald-700 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>

        <label className="flex items-center space-x-2 text-xs font-medium text-slate-700 cursor-pointer">
          <input
            type="checkbox"
            checked={only247}
            onChange={(e) => setOnly247(e.target.checked)}
            className="rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
          />
          <span className="flex items-center">
            <Clock className="w-3.5 h-3.5 mr-1 text-emerald-600" /> Solo atención 24/7
          </span>
        </label>
      </div>

      {/* Listado de Servicios */}
      {loading ? (
        <p className="text-sm text-slate-500 text-center py-8">Cargando servicios...</p>
      ) : services.length === 0 ? (
        <p className="text-sm text-slate-500 text-center py-8">No se encontraron servicios en esta categoría.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {services.map((item) => (
            <div key={item.id} className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-slate-100 text-slate-600">
                    {item.category}
                  </span>
                  {item.is_24_7 && (
                    <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-rose-100 text-rose-700">
                      24 Horas
                    </span>
                  )}
                </div>
                <h3 className="font-bold text-slate-800 text-base flex items-center">
                  {item.name}
                  {item.is_verified && <CheckCircle className="w-4 h-4 text-emerald-600 ml-1.5 inline" />}
                </h3>
                <p className="text-xs text-slate-500 mt-1">{item.description}</p>
                <div className="mt-3 flex items-start text-xs text-slate-600">
                  <MapPin className="w-3.5 h-3.5 mr-1 text-slate-400 shrink-0 mt-0.5" />
                  <span>{item.address}</span>
                </div>
              </div>

              {item.whatsapp && (
                <div className="mt-4 pt-3 border-t border-slate-100">
                  <a
                    href={`https://wa.me/${item.whatsapp}?text=Hola,%20vi%20su%20contacto%20en%20ServiChaco.`}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full inline-flex items-center justify-center bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-2 px-3 rounded-lg text-xs transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5 mr-1.5" />
                    Contactar por WhatsApp
                  </a>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
