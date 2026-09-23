import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { ShieldAlert, Store, Bus, AlertCircle, Sparkles, MapPin } from 'lucide-react';

export default function VisitorLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-emerald-800 text-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2 font-bold text-xl tracking-tight">
            <span className="bg-white text-emerald-900 rounded px-2 py-0.5 text-sm">YC</span>
            <span>ServiChaco</span>
          </Link>
          <div className="flex items-center space-x-1 text-xs md:text-sm">
            <span className="flex items-center text-emerald-200 bg-emerald-900/50 px-2 py-1 rounded-full">
              <MapPin className="w-3.5 h-3.5 mr-1 text-emerald-400" />
              Yacuiba, Bolivia
            </span>
          </div>
        </div>
      </header>

      <nav className="bg-white border-b border-slate-200 px-4 py-2 sticky top-[53px] z-40 shadow-sm overflow-x-auto">
        <div className="max-w-7xl mx-auto flex space-x-6 text-sm whitespace-nowrap">
          <Link to="/servicios-24-7" className="flex items-center text-slate-600 hover:text-emerald-700 py-1 font-medium">
            <ShieldAlert className="w-4 h-4 mr-1.5 text-rose-500" />
            Servicios 24/7
          </Link>
          <Link to="/comercio" className="flex items-center text-slate-600 hover:text-emerald-700 py-1 font-medium">
            <Store className="w-4 h-4 mr-1.5 text-blue-500" />
            Comercio Local
          </Link>
          <Link to="/movilidad" className="flex items-center text-slate-600 hover:text-emerald-700 py-1 font-medium">
            <Bus className="w-4 h-4 mr-1.5 text-amber-500" />
            Yacuiba Móvil
          </Link>
          <Link to="/reportes" className="flex items-center text-slate-600 hover:text-emerald-700 py-1 font-medium">
            <AlertCircle className="w-4 h-4 mr-1.5 text-orange-500" />
            Reportes Urbanos
          </Link>
          <Link to="/asistente" className="flex items-center text-slate-600 hover:text-emerald-700 py-1 font-medium">
            <Sparkles className="w-4 h-4 mr-1.5 text-purple-500" />
            Asistente IA
          </Link>
        </div>
      </nav>

      <main className="flex-1 max-w-7xl w-full mx-auto p-4 md:p-6">
        <Outlet />
      </main>

      <footer className="bg-slate-900 text-slate-400 text-center py-6 text-sm border-t border-slate-800">
        <p className="font-semibold text-slate-300">ServiChaco - Portal Digital Ciudadano</p>
        <p className="text-xs text-slate-500 mt-1">Conectando servicios, transporte e información oficial para Yacuiba.</p>
      </footer>
    </div>
  );
}
