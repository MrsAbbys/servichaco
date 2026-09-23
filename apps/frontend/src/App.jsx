import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import VisitorLayout from './components/layout/VisitorLayout';
import Home from './pages/visitor/Home';
import Services247 from './pages/visitor/Services247';

function PlaceholderView({ title }) {
  return (
    <div className="bg-white rounded-xl border border-slate-200 p-8 text-center">
      <h2 className="text-xl font-bold text-slate-800">{title}</h2>
      <p className="text-slate-500 text-sm mt-2">Módulo en preparación para sincronización con la API.</p>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<VisitorLayout />}>
          <Route index element={<Home />} />
          <Route path="servicios-24-7" element={<Services247 />} />
          <Route path="comercio" element={<PlaceholderView title="Directorio Comercial y Emprendedores" />} />
          <Route path="movilidad" element={<PlaceholderView title="Yacuiba Móvil - Seguimiento de Rutas" />} />
          <Route path="reportes" element={<PlaceholderView title="Gestión de Reportes Ciudadanos" />} />
          <Route path="asistente" element={<PlaceholderView title="Asistente RAG Multi-Agente" />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
