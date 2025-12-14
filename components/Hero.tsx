import React, { useState, useEffect } from 'react';

const images = [
    {
        // Port / Global Logistics - Dark, dramatic lighting with containers
        src: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=2940&auto=format&fit=crop",
        alt: "Logística portuaria global y exportación industrial"
    },
    {
        // Large Scale Construction - High contrast, massive scale
        src: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=2940&auto=format&fit=crop",
        alt: "Construcción civil de gran envergadura"
    },
    {
        // Abstract Metallic / Steel - Texture, engineering focus
        src: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?q=80&w=2940&auto=format&fit=crop",
        alt: "Ingeniería de detalle y texturas metálicas"
    }
];

const Hero: React.FC = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

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
                            className="h-full w-full object-cover"
                        />
                        <div className="absolute inset-0 bg-zinc-950/70 mix-blend-multiply" />
                        <div className="absolute inset-0 bg-gradient-to-b from-zinc-950/80 via-transparent to-zinc-950" />
                    </div>
                ))}
            </div>
            
            <div className="mx-auto max-w-7xl px-6 lg:px-8 py-32 sm:py-48 lg:py-56 relative z-10 text-center">
                <div className="inline-flex items-center gap-x-2 mb-8 animate-fade-in border border-yellow-500/30 bg-yellow-500/10 px-4 py-1.5 rounded-full">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-yellow-500"></span>
                    </span>
                    <span className="text-xs font-bold uppercase tracking-widest text-yellow-500">
                        Industrial Supplies
                    </span>
                </div>
                
                <h1 className="text-4xl font-black tracking-tighter text-white sm:text-6xl md:text-7xl uppercase mb-6 drop-shadow-2xl">
                    Un Nuevo Estándar en <br className="hidden sm:block"/>
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-yellow-200">Soluciones Industriales</span>
                </h1>
                
                <p className="mt-6 text-lg sm:text-xl leading-8 text-zinc-300 max-w-3xl mx-auto font-light">
                    Maquinaria pesada, aceros de grado industrial y soluciones globales para proyectos que exigen <span className="text-white font-semibold">precisión</span>, <span className="text-white font-semibold">potencia</span> y <span className="text-white font-semibold">confiabilidad</span>.
                </p>
                
                <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-6">
                    <a
                        href="#contact"
                        className="w-full sm:w-auto rounded-none bg-yellow-500 px-8 py-4 text-sm font-bold text-black shadow-lg hover:bg-yellow-400 transition-all uppercase tracking-wider skew-x-[-10deg]"
                    >
                        <span className="block skew-x-[10deg]">Cotiza tu Proyecto</span>
                    </a>
                    <a 
                        href="#solutions" 
                        className="w-full sm:w-auto rounded-none border border-white px-8 py-4 text-sm font-bold text-white hover:bg-white hover:text-black transition-all uppercase tracking-wider skew-x-[-10deg]"
                    >
                        <span className="block skew-x-[10deg]">Conoce Nuestras Soluciones</span>
                    </a>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="absolute bottom-0 w-full border-t border-white/10 bg-black/40 backdrop-blur-sm">
                <div className="mx-auto max-w-7xl px-6 lg:px-8 py-4 flex justify-between items-center text-xs sm:text-sm text-zinc-500 uppercase tracking-widest">
                    <span>Querétaro - Qro México</span>
                    <span className="hidden sm:block">Servicios Industriales Globales</span>
                    <span>Est. 2024</span>
                </div>
            </div>
        </div>
    );
};

export default Hero;