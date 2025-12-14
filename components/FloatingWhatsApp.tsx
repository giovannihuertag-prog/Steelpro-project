import React from 'react';
import { WhatsAppIcon } from './Icons';

const FloatingWhatsApp: React.FC = () => {
    return (
        <a 
            href="https://wa.me/524428192172"
            target="_blank"
            rel="noopener noreferrer"
            className="fixed bottom-6 left-6 z-50 group flex items-center gap-2"
            aria-label="Contactar por WhatsApp"
        >
            <div className="relative">
                <span className="absolute -inset-2 rounded-full bg-green-500 opacity-20 group-hover:opacity-40 animate-pulse"></span>
                <div className="bg-[#25D366] text-white p-3.5 rounded-full shadow-xl hover:scale-110 transition-transform duration-300 border border-white/10">
                    <WhatsAppIcon className="h-8 w-8" />
                </div>
            </div>
            
            <div className="bg-white text-black text-xs font-bold py-1.5 px-3 rounded-sm shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none translate-x-2">
                <span className="uppercase tracking-wide">Venta Directa</span>
                <div className="absolute left-0 top-1/2 -translate-x-1 -translate-y-1/2 w-2 h-2 bg-white rotate-45"></div>
            </div>
        </a>
    );
};

export default FloatingWhatsApp;