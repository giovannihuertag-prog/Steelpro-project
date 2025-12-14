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
Eres el Ingeniero de Ventas Senior de SteelPro, distribuidor autorizado de DASWELL.
Tu objetivo es asesorar técnicamente a los visitantes y guiarlos hacia el cierre de venta (solicitar cotización).

CONTEXTO DE PRODUCTOS (Usa esta información para responder):
${JSON.stringify(solutions.map(s => ({
    name: s.name,
    category: s.category,
    description: s.description,
    specs: s.features,
    brand: s.brand
})))}

REGLAS DE COMPORTAMIENTO:
1.  **Experto y Profesional:** Usas terminología industrial correcta pero eres accesible.
2.  **Proactivo (Pre-cierre):** Después de responder una duda técnica, siempre haz una pregunta de cierre o calificación. Ejemplo: "¿Para qué volumen de obra requiere este equipo?" o "¿Le gustaría que le preparemos una ficha técnica formal?".
3.  **Enfoque en Soluciones:** Si preguntan por precios, explica que dependen de la configuración (puerto de destino, motorización, extras) e invítalos a usar el formulario de "Solicitar Cotización".
4.  **Breve y Conciso:** Respuestas directas. No escribas párrafos enormes.
5.  **Grounding:** Si te preguntan sobre tendencias del mercado, precios del acero globales o noticias, usa tu herramienta de búsqueda.

Si el usuario pregunta algo fuera del contexto industrial/maquinaria, responde educadamente que solo puedes asistir en temas de SteelPro y Daswell.
`;

const AIChatBot: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        { role: 'model', text: 'Bienvenido a SteelPro. Soy su ingeniero asignado. ¿En qué tipo de proyecto industrial está trabajando hoy?' }
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

            let promoMessage = '';

            if (hash.includes('construction')) {
                promoMessage = 'Veo que le interesa nuestra línea de concreto. ¿Busca bombeo de altura o mezcla in-situ?';
            } else if (hash.includes('engineering')) {
                promoMessage = 'Nuestra maquinaria amarilla DASWELL tiene disponibilidad inmediata. ¿Busca excavación o carga frontal?';
            } else if (hash.includes('steel')) {
                promoMessage = 'Contamos con aceros certificados 1045T y 4140T. ¿Necesita corte a medida?';
            }

            if (promoMessage) {
                // Small delay to simulate observation
                setTimeout(() => {
                    setMessages(prev => [...prev, { role: 'model', text: promoMessage }]);
                    setIsOpen(true); // Auto open to catch attention
                }, 2000);
            }
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
            // Note: In a real prod app, you'd manage history more robustly.
            // Here we send the last few messages plus the system instruction context.
            
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
                    tools: [{ googleSearch: {} }], // Search grounding enabled
                }
            });

            const text = response.text;
            let groundingUrl = undefined;
            
            // Extract grounding metadata if available (simple extraction of first link)
            const chunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks;
            if (chunks) {
                const webChunk = chunks.find(c => c.web?.uri);
                if (webChunk) {
                    groundingUrl = webChunk.web?.uri;
                }
            }

            if (text) {
                setMessages(prev => [...prev, { role: 'model', text, groundingUrl }]);
            } else {
                 setMessages(prev => [...prev, { role: 'model', text: "Lo siento, tuve un problema procesando esa solicitud técnica." }]);
            }

        } catch (error) {
            console.error("Chat error:", error);
            setMessages(prev => [...prev, { role: 'model', text: "Error de conexión con el servidor de IA. Por favor intente más tarde.", isError: true }]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end pointer-events-none">
            {/* Chat Window */}
            <div 
                className={`pointer-events-auto bg-zinc-900 border border-yellow-500/50 rounded-sm shadow-2xl w-full max-w-[350px] sm:w-[380px] overflow-hidden transition-all duration-300 origin-bottom-right flex flex-col ${isOpen ? 'opacity-100 scale-100 mb-4 h-[500px]' : 'opacity-0 scale-90 h-0 mb-0'}`}
            >
                {/* Header */}
                <div className="bg-zinc-950 p-4 border-b border-white/10 flex justify-between items-center">
                    <div className="flex items-center gap-3">
                        <div className="relative">
                            <div className="w-10 h-10 rounded-full bg-yellow-500 flex items-center justify-center">
                                <span className="material-symbols-outlined text-black">smart_toy</span>
                            </div>
                            <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-zinc-950 rounded-full"></span>
                        </div>
                        <div>
                            <h3 className="text-white font-bold text-sm uppercase">Ingeniero SteelPro</h3>
                            <p className="text-zinc-400 text-xs flex items-center gap-1">
                                <span className="material-symbols-outlined text-[10px] text-yellow-500">spark</span>
                                Powered by Gemini
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
                                className={`max-w-[85%] p-3 rounded-lg text-sm leading-relaxed ${
                                    msg.role === 'user' 
                                    ? 'bg-white/10 text-white rounded-br-none border border-white/5' 
                                    : 'bg-zinc-800 text-zinc-300 rounded-bl-none border border-yellow-500/20'
                                } ${msg.isError ? 'border-red-500/50 text-red-200' : ''}`}
                            >
                                <p>{msg.text}</p>
                                {msg.groundingUrl && (
                                    <a 
                                        href={msg.groundingUrl} 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        className="mt-2 text-xs flex items-center gap-1 text-yellow-500 hover:underline border-t border-white/5 pt-2"
                                    >
                                        <span className="material-symbols-outlined text-[12px]">google</span>
                                        Fuente verificada
                                    </a>
                                )}
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
                        <input
                            type="text"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            placeholder="Escriba su consulta técnica..."
                            className="w-full bg-zinc-900 text-white text-sm rounded-full pl-4 pr-12 py-3 border border-white/10 focus:border-yellow-500 focus:outline-none focus:ring-1 focus:ring-yellow-500 transition-all placeholder:text-zinc-600"
                        />
                        <button 
                            type="submit" 
                            disabled={isLoading || !inputValue.trim()}
                            className="absolute right-1.5 p-1.5 bg-yellow-500 text-black rounded-full hover:bg-yellow-400 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                            <span className="material-symbols-outlined text-xl">send</span>
                        </button>
                    </div>
                </form>
            </div>

            {/* Floating Trigger Button */}
            <button 
                onClick={() => setIsOpen(!isOpen)}
                className={`pointer-events-auto shadow-xl transition-all duration-300 group flex items-center justify-center ${isOpen ? 'w-12 h-12 rounded-full bg-zinc-800 text-white border border-white/10' : 'w-16 h-16 rounded-full bg-yellow-500 text-black hover:scale-110'}`}
            >
                 {isOpen ? (
                     <span className="material-symbols-outlined">expand_more</span>
                 ) : (
                    <span className="material-symbols-outlined text-3xl">voice_chat</span>
                 )}
                 
                 {/* Notification Badge if closed */}
                 {!isOpen && messages.length > 1 && (
                     <span className="absolute top-0 right-0 w-4 h-4 bg-red-500 rounded-full border-2 border-zinc-950 animate-pulse"></span>
                 )}
            </button>
        </div>
    );
};

export default AIChatBot;