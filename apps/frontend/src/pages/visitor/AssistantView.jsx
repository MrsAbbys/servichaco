import React, { useState } from 'react';
import { sendChatMessage } from '../../services/api';
import { Send, Sparkles, Bot, User, MapPin, Phone } from 'lucide-react';

export default function AssistantView() {
  const [messages, setMessages] = useState([
    {
      sender: 'agent',
      agentName: 'Asistente Multi-Agente ServiChaco',
      text: '¡Hola! Soy tu asistente cívico de Yacuiba. Puedes consultarme sobre farmacias de turno, centros de salud, tarifas de micro o normativas municipales.'
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { sender: 'user', text: userMsg }]);
    setLoading(true);

    const res = await sendChatMessage(userMsg);
    
    setMessages(prev => [
      ...prev,
      {
        sender: 'agent',
        agentName: res.agent,
        text: res.reply,
        contextSnippet: res.contextSnippet,
        source: res.source,
        payload: res.payload
      }
    ]);
    setLoading(false);
  };

  return (
    <div className="max-w-3xl mx-auto h-[620px] flex flex-col bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
      {/* Encabezado */}
      <div className="bg-emerald-800 text-white px-5 py-3.5 flex items-center justify-between">
        <div className="flex items-center space-x-2.5">
          <div className="w-8 h-8 rounded-lg bg-emerald-700 flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-emerald-200" />
          </div>
          <div>
            <h2 className="font-bold text-sm">Asistente Cívico Inteligente</h2>
            <p className="text-[11px] text-emerald-200">RAG Documental & Orquestación de Servicios</p>
          </div>
        </div>
      </div>

      {/* Historial de Mensajes */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((m, idx) => (
          <div
            key={idx}
            className={`flex items-start space-x-2.5 ${m.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}
          >
            <div
              className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 ${
                m.sender === 'user' ? 'bg-slate-700 text-white' : 'bg-emerald-100 text-emerald-800'
              }`}
            >
              {m.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
            </div>

            <div className={`max-w-[80%] rounded-xl p-3 text-sm ${
              m.sender === 'user' ? 'bg-emerald-700 text-white' : 'bg-slate-50 border border-slate-200 text-slate-800'
            }`}>
              {m.agentName && (
                <div className="text-[11px] font-semibold text-emerald-700 mb-1">
                  {m.agentName}
                </div>
              )}
              <p className="leading-relaxed">{m.text}</p>

              {/* Fragmento de Documento RAG */}
              {m.contextSnippet && (
                <div className="mt-2.5 p-2.5 bg-white rounded-lg border border-slate-200 text-xs text-slate-600">
                  <div className="font-medium text-slate-800 mb-1">Fragmento Oficial:</div>
                  <blockquote className="italic border-l-2 border-emerald-500 pl-2">
                    "{m.contextSnippet}"
                  </blockquote>
                  {m.source && (
                    <div className="mt-1.5 text-[10px] text-slate-400">
                      Fuente: {m.source}
                    </div>
                  )}
                </div>
              )}

              {/* Lista de Resultados Cívicos o Rutas */}
              {m.payload && m.payload.length > 0 && (
                <div className="mt-2.5 space-y-2">
                  {m.payload.map((item, pIdx) => (
                    <div key={pIdx} className="bg-white p-2.5 rounded-lg border border-slate-200 text-xs">
                      <div className="font-bold text-slate-800">{item.name}</div>
                      {item.address && (
                        <div className="flex items-center text-slate-500 mt-1">
                          <MapPin className="w-3 h-3 mr-1" />
                          <span>{item.address}</span>
                        </div>
                      )}
                      {item.whatsapp && (
                        <a
                          href={`https://wa.me/${item.whatsapp}`}
                          target="_blank"
                          rel="noreferrer"
                          className="mt-2 inline-flex items-center text-emerald-600 font-semibold"
                        >
                          <Phone className="w-3 h-3 mr-1" /> Contactar WhatsApp
                        </a>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex items-center space-x-2 text-xs text-slate-400">
            <Sparkles className="w-3.5 h-3.5 animate-spin" />
            <span>Consultando agentes y base documental...</span>
          </div>
        )}
      </div>

      {/* Entrada de Texto */}
      <form onSubmit={handleSubmit} className="p-3 bg-slate-50 border-t border-slate-200 flex space-x-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Escribe tu consulta (ej. 'Precio del micro', 'Farmacia abierta')..."
          className="flex-1 bg-white border border-slate-200 rounded-xl px-3.5 py-2 text-sm focus:outline-none focus:border-emerald-600"
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-emerald-700 hover:bg-emerald-800 disabled:opacity-50 text-white px-4 py-2 rounded-xl text-sm font-medium flex items-center space-x-1"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
}
