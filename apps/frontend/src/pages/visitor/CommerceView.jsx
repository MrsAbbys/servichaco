import React, { useState, useEffect } from 'react';
import { fetchBusinessesDirectory } from '../../services/api';
import { Store, Search, MapPin, Phone, CheckCircle, ShoppingBag } from 'lucide-react';

export default function CommerceView() {
  const [businesses, setBusinesses] = useState([]);
  const [category, setCategory] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDirectory();
  }, [category]);

  const loadDirectory = async (search = searchTerm) => {
    setLoading(true);
    const data = await fetchBusinessesDirectory(category, search);
    setBusinesses(data);
    setLoading(false);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    loadDirectory(searchTerm);
  };

  const categories = [
    { label: 'Todos', value: '' },
    { label: 'Gastronomía Chaqueña', value: 'gastronomia' },
    { label: 'Ferretería y Construcción', value: 'ferreteria' },
    { label: 'Indumentaria y Calzados', value: 'indumentaria' },
    { label: 'Electrónica y Servicios', value: 'comercio' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Comercio Yacuiba Digital</h1>
        <p className="text-sm text-slate-500 mt-1">
          Catálogo local de emprendimientos, tiendas y puesteros del Gran Chaco.
        </p>
      </div>

      {/* Barra de Filtros y Búsqueda */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm space-y-3">
        <form onSubmit={handleSearchSubmit} className="flex gap-2">
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar por nombre, producto o plato (ej. 'saice', 'lechón', 'herramientas')..."
              className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-lg text-xs md:text-sm focus:outline-none focus:border-emerald-600"
            />
          </div>
          <button
            type="submit"
            className="bg-emerald-700 hover:bg-emerald-800 text-white px-4 py-2 rounded-lg text-xs font-semibold"
          >
            Buscar
          </button>
        </form>

        <div className="flex flex-wrap gap-2 pt-1 border-t border-slate-100">
          {categories.map((c) => (
            <button
              key={c.value}
              onClick={() => {
                setCategory(c.value);
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                category === c.value
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>
      </div>

      {/* Grid de Comercios */}
      {loading ? (
        <p className="text-sm text-slate-500 text-center py-10">Cargando directorio de comercios...</p>
      ) : businesses.length === 0 ? (
        <div className="bg-white rounded-xl border border-slate-200 p-10 text-center space-y-2">
          <ShoppingBag className="w-8 h-8 text-slate-400 mx-auto" />
          <h3 className="font-semibold text-slate-700 text-sm">No se encontraron comercios</h3>
          <p className="text-xs text-slate-500">Prueba con otra palabra clave o selecciona otra categoría.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {businesses.map((b) => (
            <div
              key={b.id}
              className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-slate-100 text-slate-600">
                    {b.category}
                  </span>
                  {b.is_verified && (
                    <span className="inline-flex items-center text-[11px] font-semibold text-emerald-600">
                      <CheckCircle className="w-3.5 h-3.5 mr-1" /> Verificado
                    </span>
                  )}
                </div>
                <h3 className="font-bold text-slate-800 text-base">{b.name}</h3>
                <p className="text-xs text-slate-500 mt-1 line-clamp-2">{b.description}</p>
                <div className="mt-3 flex items-start text-xs text-slate-600">
                  <MapPin className="w-3.5 h-3.5 mr-1.5 text-slate-400 shrink-0 mt-0.5" />
                  <span>{b.address}</span>
                </div>
              </div>

              {b.whatsapp && (
                <div className="mt-4 pt-3 border-t border-slate-100">
                  <a
                    href={`https://wa.me/${b.whatsapp}?text=Hola,%20vi%20su%20comercio%20en%20ServiChaco%20y%20deseo%20hacer%20una%20consulta.`}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full inline-flex items-center justify-center bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-2 px-3 rounded-lg text-xs transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5 mr-1.5" />
                    Consultar por WhatsApp
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
