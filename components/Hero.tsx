import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';

const images = [
    {
        // Mining Excavator
        src: "https://images.unsplash.com/photo-1578326584285-d852a32c253b?q=80&w=2940&auto=format&fit=crop",
        alt: "Excavadora pesada en entorno minero"
    },
    {
        // Concrete Mixer Truck
        src: "https://images.unsplash.com/photo-1616401784845-180882ba9ba8?q=80&w=2940&auto=format&fit=crop",
        alt: "Camión mezclador de concreto industrial"
    },
    {
        // Crushing Plant
        src: "https://images.unsplash.com/photo-1565008447742-97f6f38c985c?q=80&w=2940&auto=format&fit=crop",
        alt: "Planta de procesamiento de minerales"
    }
];

const Hero: React.FC = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const { t } = useLanguage();

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 5000); 
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="relative isolate overflow-hidden min-h-screen flex flex-col justify-center">
            {/* Background Carousel */}
            <div className="absolute inset-0 -z-20">
                {images.map((image, index) => (
                    <div key={index} className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentIndex ? 'opacity-100' : 'opacity-0'}`}>
                            <img
                            src={image.src}
                            alt={image.alt}
                            className="h-full w-full object-cover scale-105"
                        />
                        <div className="absolute inset-0 bg-zinc-950/70 mix-blend-multiply" />
                        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent" />
                    </div>
                ))}
            </div>
            
            <div className="mx-auto max-w-7xl px-6 lg:px-8 py-32 sm:py-48 lg:py-56 relative z-10 text-center sm:text-left">
                
                {/* Authority Badge with Tooltip */}
                <div className="group relative inline-flex items-center gap-x-3 mb-8 animate-fade-in backdrop-blur-md bg-white/5 border border-white/10 px-4 py-1.5 rounded-sm cursor-help hover:bg-white/10 transition-colors">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-yellow-500"></span>
                    </span>
                    <span className="text-xs font-bold uppercase tracking-widest text-yellow-500">
                        Distribuidor Autorizado DASWELL
                    </span>

                    {/* Tooltip Content */}
                    <div className="absolute left-1/2 -translate-x-1/2 top-full mt-3 w-64 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0 pointer-events-none z-20">
                        {/* Arrow */}
                        <div className="absolute left-1/2 -translate-x-1/2 -top-1.5 border-4 border-transparent border-b-zinc-900"></div>
                        {/* Box */}
                        <div className="bg-zinc-900 border border-white/10 p-4 rounded-sm shadow-2xl text-center backdrop-blur-xl">
                            <p className="text-[10px] text-zinc-400 leading-relaxed font-light">
                                <strong className="text-white block mb-1 uppercase tracking-wider font-bold">Licencia Oficial OEM</strong>
                                Acuerdo exclusivo de importación, refaccionamiento directo y garantía de fábrica para maquinaria Daswell en territorio nacional.
                            </p>
                        </div>
                    </div>
                </div>
                
                {/* Main Title - Refined Typography (Premium Industrial) */}
                <h1 className="text-5xl sm:text-7xl md:text-8xl font-semibold tracking-tight uppercase mb-6 text-zinc-100 leading-none animate-fade-in select-none">
                    STEELPRO
                </h1>
                
                {/* Subtitle - Technical, Sober & Precise */}
                <p className="text-xs sm:text-sm md:text-base font-normal tracking-[0.15em] uppercase text-zinc-400 max-w-2xl animate-fade-in delay-100 mb-10 border-l border-yellow-500/60 pl-4 ml-1 sm:ml-0 leading-relaxed">
                    Infraestructura Sólida para Proyectos Globales
                </p>

                {/* Descriptive Text - Value Proposition */}
                <p className="mt-4 text-base sm:text-lg leading-relaxed text-zinc-400 max-w-2xl font-light animate-fade-in delay-200">
                    Suministro estratégico de maquinaria pesada y aceros industriales. 
                    Sin intermediarios. Sin tiempos muertos.
                </p>
                
                {/* Transactional CTAs */}
                <div className="mt-10 flex flex-col sm:flex-row gap-4 animate-fade-in delay-300">
                    <a
                        href="#solutions"
                        className="bg-yellow-500 px-8 py-4 text-sm font-bold text-black hover:bg-white hover:text-black transition-all uppercase tracking-widest flex items-center justify-center gap-2 shadow-lg hover:shadow-yellow-500/20"
                    >
                        Ver Catálogo
                        <span className="material-symbols-outlined text-lg">arrow_forward</span>
                    </a>
                    <a 
                        href="#solutions/steel" 
                        className="border border-white/10 bg-white/5 backdrop-blur-sm px-8 py-4 text-sm font-bold text-white hover:bg-white hover:text-black transition-all uppercase tracking-widest flex items-center justify-center gap-2"
                    >
                        Cotizar Aceros
                    </a>
                </div>
            </div>

            {/* Stats Bar - Refined */}
            <div className="absolute bottom-0 w-full border-t border-white/10 bg-black/60 backdrop-blur-md">
                <div className="mx-auto max-w-7xl px-6 lg:px-8 py-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center md:text-left">
                    <div className="border-r border-white/5 md:border-none last:border-none">
                        <p className="text-2xl font-bold text-white tracking-tight">+15 Años</p>
                        <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">Experiencia</p>
                    </div>
                    <div className="border-r border-white/5 md:border-none last:border-none">
                        <p className="text-2xl font-bold text-white tracking-tight">ISO 9001</p>
                        <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">Certificación</p>
                    </div>
                    <div className="border-r border-white/5 md:border-none last:border-none">
                        <p className="text-2xl font-bold text-white tracking-tight">Stock Real</p>
                        <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">Entrega Inmediata</p>
                    </div>
                    <div className="hidden md:block">
                        <p className="text-2xl font-bold text-white tracking-tight">Nacional</p>
                        <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">Cobertura</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Hero;