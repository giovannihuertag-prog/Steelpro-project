import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from './Icons';

const slides = [
    {
        src: "https://images.unsplash.com/photo-1599933451563-71452df1575a?q=80&w=2940&auto=format&fit=crop",
        title: "PLANTAS MÓVILES DE TRITURACIÓN",
        description: "Versatilidad total en cantera. Sistemas de oruga y neumáticos para máxima movilidad.",
        tag: "TRITURACIÓN"
    },
    {
        src: "https://images.unsplash.com/photo-1578326584285-d852a32c253b?q=80&w=2940&auto=format&fit=crop",
        title: "TRITURADORAS DE MANDÍBULA",
        description: "Potencia primaria. Diseñadas para roca dura y materiales abrasivos con alta eficiencia.",
        tag: "MAQUINARIA PESADA"
    },
    {
        src: "https://images.unsplash.com/photo-1525126859551-7f374780516f?q=80&w=2940&auto=format&fit=crop",
        title: "TRITURADORAS DE CONO",
        description: "Precisión en el producto final. Tecnología hidráulica avanzada para agregados de calidad.",
        tag: "AGREGADOS"
    },
    {
        src: "https://images.unsplash.com/photo-1629738848773-195f0022f468?q=80&w=2940&auto=format&fit=crop",
        title: "LAVADORAS DE ARENA",
        description: "Limpieza profunda. Eliminación eficiente de impurezas para cumplir estándares internacionales.",
        tag: "PROCESAMIENTO"
    },
    {
        src: "https://images.unsplash.com/photo-1595246738090-4497e7530691?q=80&w=2940&auto=format&fit=crop",
        title: "MINI TRITURADORAS",
        description: "Soluciones compactas. Ideales para reciclaje urbano y proyectos de espacio reducido.",
        tag: "RECICLAJE"
    }
];

const MachineryCarousel: React.FC = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const timeoutRef = useRef<number | null>(null);

    const resetTimeout = () => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
    };

    useEffect(() => {
        resetTimeout();
        if (!isPaused) {
            timeoutRef.current = window.setTimeout(() => {
                setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
            }, 5000); // Change every 5 seconds
        }
        return () => resetTimeout();
    }, [currentIndex, isPaused]);

    const goToPrevious = () => {
        const isFirstSlide = currentIndex === 0;
        const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
        setCurrentIndex(newIndex);
    };

    const goToNext = () => {
        const isLastSlide = currentIndex === slides.length - 1;
        const newIndex = isLastSlide ? 0 : currentIndex + 1;
        setCurrentIndex(newIndex);
    };

    return (
        <div 
            className="relative w-full h-[600px] bg-zinc-900 group overflow-hidden border-y border-white/5"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
        >
            {/* Slides */}
            {slides.map((slide, index) => (
                <div
                    key={index}
                    className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                        index === currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
                    }`}
                >
                    <img
                        src={slide.src}
                        alt={slide.title}
                        className="w-full h-full object-cover grayscale brightness-75 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-90"></div>
                    
                    {/* Content */}
                    <div className="absolute bottom-0 left-0 w-full p-8 md:p-16 text-left transform transition-transform duration-700 translate-y-0">
                        <div className="max-w-4xl animate-fade-in">
                            <span className="inline-block px-3 py-1 mb-4 text-xs font-bold text-black bg-yellow-500 uppercase tracking-widest">
                                {slide.tag}
                            </span>
                            <h2 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter mb-4 leading-none">
                                {slide.title}
                            </h2>
                            <p className="text-lg md:text-xl text-zinc-300 max-w-2xl font-light border-l-4 border-yellow-500 pl-4">
                                {slide.description}
                            </p>
                        </div>
                    </div>
                </div>
            ))}

            {/* Controls */}
            <button
                onClick={goToPrevious}
                className="absolute top-1/2 left-4 z-20 -translate-y-1/2 p-3 bg-black/50 text-white hover:bg-yellow-500 hover:text-black transition-all border border-white/10"
                aria-label="Anterior"
            >
                <ChevronLeftIcon className="h-8 w-8" />
            </button>
            <button
                onClick={goToNext}
                className="absolute top-1/2 right-4 z-20 -translate-y-1/2 p-3 bg-black/50 text-white hover:bg-yellow-500 hover:text-black transition-all border border-white/10"
                aria-label="Siguiente"
            >
                <ChevronRightIcon className="h-8 w-8" />
            </button>

            {/* Indicators */}
            <div className="absolute bottom-8 right-8 z-20 flex space-x-2">
                {slides.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentIndex(index)}
                        className={`h-1 transition-all duration-300 ${
                            index === currentIndex ? 'w-12 bg-yellow-500' : 'w-6 bg-zinc-600 hover:bg-zinc-400'
                        }`}
                        aria-label={`Ir a diapositiva ${index + 1}`}
                    />
                ))}
            </div>
            
            {/* Progress Bar */}
            <div className="absolute bottom-0 left-0 h-1 bg-yellow-500 z-30 transition-all duration-500 ease-linear" style={{ width: `${((currentIndex + 1) / slides.length) * 100}%` }}></div>
        </div>
    );
};

export default MachineryCarousel;