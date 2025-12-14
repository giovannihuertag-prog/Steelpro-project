import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';

const images = [
    {
        // Mining Excavator - Yellow Machinery (Fits SteelPro/Daswell aesthetic)
        src: "https://images.unsplash.com/photo-1578326584285-d852a32c253b?q=80&w=2940&auto=format&fit=crop",
        alt: "Excavadora pesada en entorno minero"
    },
    {
        // Concrete Mixer Truck - Daswell core product
        src: "https://images.unsplash.com/photo-1616401784845-180882ba9ba8?q=80&w=2940&auto=format&fit=crop",
        alt: "Camión mezclador de concreto industrial"
    },
    {
        // Crushing Plant / Industrial - Mining context
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
                        {/* Improved Overlay for Readability */}
                        <div className="absolute inset-0 bg-zinc-950/40 mix-blend-multiply" />
                        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/60 to-transparent" />
                        <div className="absolute inset-0 bg-gradient-to-r from-zinc-950/80 via-transparent to-zinc-950/80" />
                    </div>
                ))}
            </div>
            
            <div className="mx-auto max-w-7xl px-6 lg:px-8 py-32 sm:py-48 lg:py-56 relative z-10 text-center">
                
                {/* Badge */}
                <div className="inline-flex items-center gap-x-2 mb-8 animate-fade-in border border-yellow-500 bg-black/80 backdrop-blur-sm px-6 py-2 rounded-sm shadow-[0_0_15px_rgba(234,179,8,0.3)]">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-yellow-500"></span>
                    </span>
                    <span className="text-xs font-black uppercase tracking-[0.2em] text-yellow-500">
                        {t('hero.badge')}
                    </span>
                </div>
                
                {/* Main Title - Updated Typography */}
                <h1 className="text-5xl font-black tracking-tighter text-white sm:text-7xl md:text-9xl uppercase mb-4 drop-shadow-2xl">
                    STEEL<span className="text-transparent bg-clip-text bg-gradient-to-br from-yellow-400 via-yellow-500 to-orange-600 stroke-white">PRO</span>
                </h1>
                
                {/* Subtitle - Better contrast */}
                <div className="mb-8">
                    <h2 className="inline-block text-xl sm:text-3xl font-bold tracking-tight text-white uppercase bg-black/40 backdrop-blur-md px-4 py-2 border-l-4 border-yellow-500">
                        {t('hero.subtitle')}
                    </h2>
                </div>
                
                {/* Paragraph - Improved readability */}
                <p className="mt-4 text-lg sm:text-xl leading-relaxed text-zinc-200 max-w-3xl mx-auto font-medium drop-shadow-md bg-black/30 p-4 rounded-sm border border-white/5 backdrop-blur-sm">
                    {t('hero.desc')}
                </p>
                
                <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-6">
                    <a
                        href="#solutions"
                        className="w-full sm:w-auto rounded-sm bg-yellow-500 px-8 py-4 text-sm font-black text-black shadow-[0_0_20px_rgba(234,179,8,0.4)] hover:bg-white hover:text-black transition-all uppercase tracking-widest skew-x-[-10deg] hover:scale-105"
                    >
                        <span className="block skew-x-[10deg]">{t('hero.catalog')}</span>
                    </a>
                    <a 
                        href="#contact" 
                        className="w-full sm:w-auto rounded-sm border-2 border-white bg-transparent px-8 py-4 text-sm font-black text-white hover:bg-white hover:text-black transition-all uppercase tracking-widest skew-x-[-10deg]"
                    >
                        <span className="block skew-x-[10deg]">{t('hero.project_quote')}</span>
                    </a>
                </div>
            </div>

            {/* Stats Bar */}
            <div className="absolute bottom-0 w-full border-t border-white/10 bg-black/80 backdrop-blur-lg">
                <div className="mx-auto max-w-7xl px-6 lg:px-8 py-6 grid grid-cols-2 md:grid-cols-4 gap-4 text-center divide-x divide-white/10">
                    <div>
                        <p className="text-3xl font-black text-white">+15</p>
                        <p className="text-[10px] font-bold uppercase tracking-widest text-yellow-500">{t('hero.exp')}</p>
                    </div>
                    <div>
                        <p className="text-3xl font-black text-white">ISO</p>
                        <p className="text-[10px] font-bold uppercase tracking-widest text-yellow-500">{t('hero.cert')}</p>
                    </div>
                    <div>
                        <p className="text-3xl font-black text-white">24h</p>
                        <p className="text-[10px] font-bold uppercase tracking-widest text-yellow-500">{t('hero.support')}</p>
                    </div>
                    <div>
                        <p className="text-3xl font-black text-white">Global</p>
                        <p className="text-[10px] font-bold uppercase tracking-widest text-yellow-500">{t('hero.logistics')}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Hero;