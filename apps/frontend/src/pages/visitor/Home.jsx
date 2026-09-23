import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldAlert, Store, Bus, AlertTriangle, Sparkles, ArrowRight } from 'lucide-react';

export default function Home() {
  const modulos = [
    {
      title: "Urgencias y Servicios 24/7",
      desc: "Farmacias de turno, centros de salud, mecánicos y contactos de emergencia.",
      icon: ShieldAlert,
      color: "bg-rose-500 text-white",
      border: "border-rose-100 hover:border-rose-300",
      to: "/servicios-24-7"
    },
    {
      title: "Comercio Yacuiba Digital",
      desc: "Catálogo local de tiendas y negocios con enlace directo a WhatsApp.",
      icon: Store,
      color: "bg-blue-600 text-white",
      border: "border-blue-100 hover:border-blue-300",
      to: "/comercio"
    },
    {
      title: "Yacuiba Móvil",
      desc: "Rutas de micros, trufis escolares y seguimiento en tiempo real.",
      icon: Bus,
      color: "bg-amber-600 text-white",
      border: "border-amber-100 hover:border-amber-300",
      to: "/movilidad"
    },
    {
      title: "Reportes Ciudadanos",
      desc: "Informa sobre baches, fugas de agua y alumbrado público en tu zona.",
      icon: AlertTriangle,
      color: "bg-orange-500 text-white",
      border: "border-orange-100 hover:border-orange-300",
      to: "/reportes"
    },
    {
      title: "Asistente Virtual Cívico & RAG",
      desc: "Consulta normativas, horarios y procedimientos institucionales.",
      icon: Sparkles,
      color: "bg-purple-600 text-white",
      border: "border-purple-100 hover:border-purple-300",
      to: "/asistente"
    }
  ];

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-emerald-800 to-teal-700 rounded-2xl p-6 md:p-8 text-white shadow-lg">
        <h1 className="text-2xl md:text-3xl font-bold">Portal Cívico y Comercial de Yacuiba</h1>
        <p className="text-emerald-100 mt-2 max-w-2xl text-sm md:text-base">
          Accede a información esencial, servicios de guardia y canales comunitarios en una sola plataforma.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {modulos.map((m, idx) => {
          const Icon = m.icon;
          return (
            <Link
              key={idx}
              to={m.to}
              className={`bg-white rounded-xl p-5 border ${m.border} shadow-sm hover:shadow-md transition-all flex flex-col justify-between group`}
            >
              <div>
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${m.color} mb-3`}>
                  <Icon className="w-5 h-5" />
                </div>
                <h2 className="font-bold text-slate-800 group-hover:text-emerald-700 transition-colors">
                  {m.title}
                </h2>
                <p className="text-sm text-slate-500 mt-1">{m.desc}</p>
              </div>
              <div className="mt-4 flex items-center text-xs font-semibold text-emerald-600">
                <span>Explorar</span>
                <ArrowRight className="w-3.5 h-3.5 ml-1 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
