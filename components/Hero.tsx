import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';

const images = [
    {
        // High-tech Robotic Arm
        src: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2940&auto=format&fit=crop",
        alt: "Brazo robótico de precisión industrial"
    },
    {
        // Automated Warehouse / Tech
        src: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=2940&auto=format&fit=crop",
        alt: "Almacén automatizado con inteligencia artificial"
    },
    {
        // Futuristic Mining/Industry
        src: "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?q=80&w=2969&auto=format&fit=crop",
        alt: "Maquinaria pesada conectada"
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
        <div className="relative isolate overflow-hidden min-h-screen flex flex-col justify-center bg-zinc-950">
            {/* Background Carousel */}
            <div className="absolute inset-0 -z-20">
                {images.map((image, index) => (
                    <div key={index} className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentIndex ? 'opacity-100' : 'opacity-0'}`}>
                            <img
                            src={image.src}
                            alt={image.alt}
                            className="h-full w-full object-cover scale-105"
                        />
                        <div className="absolute inset-0 bg-zinc-950/80 mix-blend-multiply" />
                        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-zinc-950/50" />
                        
                        {/* Grid Overlay for Tech feel */}
                        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20 mix-blend-overlay"></div>
                    </div>
                ))}
            </div>
            
            <div className="mx-auto max-w-7xl px-6 lg:px-8 py-32 sm:py-48 lg:py-56 relative z-10 text-center sm:text-left">
                
                {/* Tech Badge */}
                <div className="group relative inline-flex items-center gap-x-3 mb-8 animate-fade-in backdrop-blur-md bg-white/5 border border-white/10 px-4 py-1.5 rounded-sm cursor-help hover:bg-white/10 transition-colors">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-yellow-500"></span>
                    </span>
                    <span className="text-xs font-bold uppercase tracking-widest text-yellow-500">
                        Sistemas Autónomos &amp; IA
                    </span>
                </div>
                
                {/* Main Title - Industrial Tech Typography */}
                <h1 className="text-5xl sm:text-7xl md:text-8xl font-black tracking-tighter uppercase mb-6 text-white leading-none animate-fade-in select-none">
                    PARA<span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-yellow-200">TECC</span>
                </h1>
                
                {/* Subtitle */}
                <p className="text-xs sm:text-sm md:text-base font-normal tracking-[0.15em] uppercase text-zinc-400 max-w-2xl animate-fade-in delay-100 mb-10 border-l border-yellow-500/60 pl-4 ml-1 sm:ml-0 leading-relaxed">
                    Evolución Industrial Inteligente
                </p>

                {/* Value Proposition */}
                <p className="mt-4 text-base sm:text-lg leading-relaxed text-zinc-300 max-w-2xl font-light animate-fade-in delay-200">
                    Integramos Inteligencia Artificial en maquinaria pesada y procesos de manufactura. Optimice su cadena de suministro con mantenimiento predictivo y automatización avanzada.
                </p>
                
                {/* CTAs */}
                <div className="mt-10 flex flex-col sm:flex-row gap-4 animate-fade-in delay-300">
                    <a
                        href="#solutions"
                        className="bg-yellow-500 px-8 py-4 text-sm font-bold text-black hover:bg-white hover:text-black transition-all uppercase tracking-widest flex items-center justify-center gap-2 shadow-lg shadow-yellow-500/20"
                    >
                        <span className="material-symbols-outlined">smart_toy</span>
                        Soluciones IA
                    </a>
                    <a 
                        href="#about" 
                        className="border border-white/10 bg-white/5 backdrop-blur-sm px-8 py-4 text-sm font-bold text-white hover:bg-white hover:text-black transition-all uppercase tracking-widest flex items-center justify-center gap-2"
                    >
                        Consultoría
                    </a>
                </div>
            </div>

            {/* Tech Stats Bar */}
            <div className="absolute bottom-0 w-full border-t border-white/10 bg-black/80 backdrop-blur-md">
                <div className="mx-auto max-w-7xl px-6 lg:px-8 py-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center md:text-left">
                    <div className="border-r border-white/5 md:border-none last:border-none">
                        <p className="text-2xl font-bold text-white tracking-tight flex items-center justify-center md:justify-start gap-2">
                            98% <span className="material-symbols-outlined text-yellow-500 text-sm">trending_up</span>
                        </p>
                        <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">Eficiencia Operativa</p>
                    </div>
                    <div className="border-r border-white/5 md:border-none last:border-none">
                        <p className="text-2xl font-bold text-white tracking-tight">IoT</p>
                        <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">Conectividad Total</p>
                    </div>
                    <div className="border-r border-white/5 md:border-none last:border-none">
                        <p className="text-2xl font-bold text-white tracking-tight">24/7</p>
                        <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">Monitoreo Predictivo</p>
                    </div>
                    <div className="hidden md:block">
                        <p className="text-2xl font-bold text-white tracking-tight">ISO/IEC</p>
                        <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">Estándares Globales</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Hero;