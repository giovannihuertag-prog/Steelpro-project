import React, { useState, useEffect, useRef } from 'react';
import { GoogleGenAI } from "@google/genai";
import { solutions } from '../data/solutions';

// Initialize Gemini
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

interface Message {
    role: 'user' | 'model';
    text: string;
    isError?: boolean;
    groundingUrl?: string;
}

const SYSTEM_INSTRUCTION = `
Actúas como un ORGANIZADOR TÉCNICO para el catálogo de SteelPro.

Tu función es recibir la información cruda de maquinaria (nombre, especificaciones, condiciones de operación) y estructurarla en fichas técnicas limpias y estandarizadas para el catálogo.

REGLAS FUNDAMENTALES:
1. Cada ficha técnica debe ubicarse bajo la etiqueta/categoría: "Maquinaria y Especificaciones".
2. Usa el nombre de la máquina como Encabezado Principal.
3. Extrae y lista las especificaciones en un formato de lista estándar (Capacidad, Potencia, Dimensiones, Peso, etc.).
4. ELIMINA todo lenguaje comercial, "fluff" de marketing o adjetivos subjetivos (ej. "innovadora", "excelente", "líder"). Solo mantén los hechos técnicos.
5. NO inventes datos. Si no está en el texto, no lo pongas.

FORMATO DE SALIDA ESPERADO:

### [Nombre de la Máquina]
**Categoría:** Maquinaria y Especificaciones
**Descripción Técnica:** [Resumen objetivo de 2-3 líneas]
**Especificaciones:**
- [Propiedad]: [Valor]
- [Propiedad]: [Valor]
...

Si recibes un texto con múltiples máquinas, genera una ficha separada para cada una en la misma respuesta.
`;

const AIChatBot: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        { role: 'model', text: 'Sistema de Organización Técnico activo. Por favor, ingrese los datos de la maquinaria para generar las fichas técnicas estandarizadas.' }
    ]);
    const [inputValue, setInputValue] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const [hasInteracted, setHasInteracted] = useState(false);

    // Auto-scroll to bottom
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isOpen]);

    // Proactive Triggers based on URL
    useEffect(() => {
        const handleHashChange = () => {
            const hash = window.location.hash;
            if (hasInteracted) return; // Don't interrupt if already talking

            // Logic specifically for catalog admin context
            // We removed the sales triggers to focus on the technical organizer role
        };

        window.addEventListener('hashchange', handleHashChange);
        return () => window.removeEventListener('hashchange', handleHashChange);
    }, [hasInteracted]);

    const handleSendMessage = async (e?: React.FormEvent) => {
        e?.preventDefault();
        if (!inputValue.trim() || isLoading) return;

        const userText = inputValue;
        setInputValue('');
        setHasInteracted(true);
        setMessages(prev => [...prev, { role: 'user', text: userText }]);
        setIsLoading(true);

        try {
            // Build history for context
            const response = await ai.models.generateContent({
                model: 'gemini-3-pro-preview',
                contents: [
                    { role: 'user', parts: [{ text: SYSTEM_INSTRUCTION }] }, // Priming the model
                    ...messages.map(m => ({
                        role: m.role,
                        parts: [{ text: m.text }]
                    })),
                    { role: 'user', parts: [{ text: userText }] }
                ],
                config: {
                    // Search grounding disabled for this specific task to ensure strict adherence to provided text
                    temperature: 0.2 // Lower temperature for more deterministic/strict output
                }
            });

            const text = response.text;
            
            if (text) {
                setMessages(prev => [...prev, { role: 'model', text }]);
            } else {
                 setMessages(prev => [...prev, { role: 'model', text: "No pude procesar la información. Intente nuevamente." }]);
            }

        } catch (error) {
            console.error("Chat error:", error);
            setMessages(prev => [...prev, { role: 'model', text: "Error de procesamiento.", isError: true }]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end pointer-events-none">
            {/* Chat Window */}
            <div 
                className={`pointer-events-auto bg-zinc-900 border border-yellow-500/50 rounded-sm shadow-2xl w-full max-w-[400px] sm:w-[450px] overflow-hidden transition-all duration-300 origin-bottom-right flex flex-col ${isOpen ? 'opacity-100 scale-100 mb-4 h-[600px]' : 'opacity-0 scale-90 h-0 mb-0'}`}
            >
                {/* Header */}
                <div className="bg-zinc-950 p-4 border-b border-white/10 flex justify-between items-center">
                    <div className="flex items-center gap-3">
                        <div className="relative">
                            <div className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center border border-white/10">
                                <span className="material-symbols-outlined text-yellow-500">inventory_2</span>
                            </div>
                            <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-zinc-950 rounded-full"></span>
                        </div>
                        <div>
                            <h3 className="text-white font-bold text-sm uppercase">Organizador Técnico</h3>
                            <p className="text-zinc-400 text-xs flex items-center gap-1">
                                <span className="material-symbols-outlined text-[10px] text-zinc-500">database</span>
                                Catalog Manager
                            </p>
                        </div>
                    </div>
                    <button onClick={() => setIsOpen(false)} className="text-zinc-500 hover:text-white">
                        <span className="material-symbols-outlined">close</span>
                    </button>
                </div>

                {/* Messages Area */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-black/20 chat-scroll">
                    {messages.map((msg, idx) => (
                        <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                            <div 
                                className={`max-w-[90%] p-3 rounded-lg text-sm leading-relaxed font-mono ${
                                    msg.role === 'user' 
                                    ? 'bg-white/10 text-white rounded-br-none border border-white/5' 
                                    : 'bg-zinc-800 text-zinc-300 rounded-bl-none border border-yellow-500/20'
                                } ${msg.isError ? 'border-red-500/50 text-red-200' : ''}`}
                            >
                                <div className="whitespace-pre-wrap markdown-content">
                                    {msg.text}
                                </div>
                            </div>
                        </div>
                    ))}
                    {isLoading && (
                        <div className="flex justify-start">
                             <div className="bg-zinc-800 p-3 rounded-lg rounded-bl-none border border-yellow-500/20 flex items-center gap-2">
                                <div className="w-2 h-2 bg-yellow-500 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
                                <div className="w-2 h-2 bg-yellow-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                                <div className="w-2 h-2 bg-yellow-500 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                             </div>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>

                {/* Input Area */}
                <form onSubmit={handleSendMessage} className="p-3 bg-zinc-950 border-t border-white/10">
                    <div className="relative flex items-center">
                        <textarea
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            placeholder="Pegue aquí la información de la maquinaria..."
                            className="w-full bg-zinc-900 text-white text-xs rounded-lg pl-4 pr-12 py-3 border border-white/10 focus:border-yellow-500 focus:outline-none focus:ring-1 focus:ring-yellow-500 transition-all placeholder:text-zinc-600 font-mono resize-none h-14"
                        />
                        <button 
                            type="submit" 
                            disabled={isLoading || !inputValue.trim()}
                            className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 bg-yellow-500 text-black rounded-md hover:bg-yellow-400 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                            <span className="material-symbols-outlined text-lg">arrow_upward</span>
                        </button>
                    </div>
                </form>
            </div>

            {/* Floating Trigger Button */}
            <button 
                onClick={() => setIsOpen(!isOpen)}
                className={`pointer-events-auto shadow-xl transition-all duration-300 group flex items-center justify-center ${isOpen ? 'w-12 h-12 rounded-full bg-zinc-800 text-white border border-white/10' : 'w-16 h-16 rounded-full bg-zinc-800 text-yellow-500 border border-yellow-500/20 hover:scale-110'}`}
            >
                 {isOpen ? (
                     <span className="material-symbols-outlined">expand_more</span>
                 ) : (
                    <span className="material-symbols-outlined text-3xl">inventory_2</span>
                 )}
            </button>
        </div>
    );
};

export default AIChatBot;