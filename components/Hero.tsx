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
                
                {/* Authority Badge */}
                <div className="inline-flex items-center gap-x-3 mb-8 animate-fade-in backdrop-blur-md bg-white/5 border border-white/10 px-4 py-1.5 rounded-sm">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-yellow-500"></span>
                    </span>
                    <span className="text-xs font-bold uppercase tracking-widest text-yellow-500">
                        Distribuidor Autorizado DASWELL
                    </span>
                </div>
                
                {/* Main Title - Refined */}
                <h1 className="text-6xl sm:text-8xl md:text-9xl font-semibold tracking-[0.15em] uppercase mb-4 text-white leading-tight animate-fade-in">
                    STEELPRO
                </h1>
                
                {/* Subtitle - Technical & Sober */}
                <p className="text-lg sm:text-xl font-medium tracking-widest uppercase text-zinc-300 max-w-3xl animate-fade-in delay-100 mb-8 border-l-4 border-yellow-500 pl-4 sm:pl-6 ml-1 sm:ml-0">
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