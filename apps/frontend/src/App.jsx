import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import VisitorLayout from './components/layout/VisitorLayout';
import Home from './pages/visitor/Home';
import Services247 from './pages/visitor/Services247';
import MobilityView from './pages/visitor/MobilityView';
import AssistantView from './pages/visitor/AssistantView';
import CommerceView from './pages/visitor/CommerceView';
import ReportsView from './pages/visitor/ReportsView';
import AdminReportsDashboard from './pages/visitor/AdminReportsDashboard';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<VisitorLayout />}>
          <Route index element={<Home />} />
          <Route path="servicios-24-7" element={<Services247 />} />
          <Route path="movilidad" element={<MobilityView />} />
          <Route path="asistente" element={<AssistantView />} />
          <Route path="comercio" element={<CommerceView />} />
          <Route path="reportes" element={<ReportsView />} />
          <Route path="admin/reportes" element={<AdminReportsDashboard />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
