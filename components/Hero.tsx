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
                        <div className="absolute inset-0 bg-zinc-950/50 mix-blend-multiply" />
                        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent" />
                    </div>
                ))}
            </div>
            
            <div className="mx-auto max-w-7xl px-6 lg:px-8 py-32 sm:py-48 lg:py-56 relative z-10 text-center">
                
                {/* Badge - Technical Look & Floating Grey/White */}
                <div className="inline-flex items-center gap-x-3 mb-12 animate-fade-in backdrop-blur-sm bg-white/5 border border-white/10 px-4 py-1.5 rounded-full shadow-[0_0_15px_rgba(255,255,255,0.05)]">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-yellow-500"></span>
                    </span>
                    <span className="text-xs font-black uppercase tracking-[0.25em] text-transparent bg-clip-text bg-gradient-to-r from-zinc-100 to-zinc-400 drop-shadow-sm">
                        {t('hero.badge')}
                    </span>
                </div>
                
                {/* Main Title - Stylized, Thicker, Metallic & Floating */}
                <h1 className="text-6xl sm:text-7xl md:text-9xl font-black tracking-tighter uppercase mb-6 drop-shadow-2xl">
                    <span className="text-transparent bg-clip-text bg-gradient-to-b from-white via-zinc-200 to-zinc-500 drop-shadow-[0_4px_4px_rgba(0,0,0,0.5)]">
                        STEEL
                    </span>
                    <span className="text-transparent bg-clip-text bg-gradient-to-br from-yellow-300 via-yellow-500 to-orange-600 drop-shadow-[0_4px_15px_rgba(234,179,8,0.4)]">
                        PRO
                    </span>
                </h1>
                
                {/* Subtitle - Sober & Technical */}
                <div className="mb-10">
                    <h2 className="inline-block text-base sm:text-xl font-bold tracking-[0.2em] text-zinc-300 uppercase drop-shadow-md">
                        {t('hero.subtitle')}
                    </h2>
                </div>
                
                {/* Paragraph - Elegant Readability */}
                <p className="mt-4 text-base sm:text-lg leading-8 text-zinc-300 max-w-2xl mx-auto font-light mix-blend-plus-lighter">
                    {t('hero.desc')}
                </p>
                
                <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-6">
                    <a
                        href="#solutions"
                        className="w-full sm:w-auto bg-yellow-500 px-8 py-4 text-xs font-bold text-black shadow-[0_0_20px_rgba(234,179,8,0.3)] hover:shadow-[0_0_30px_rgba(234,179,8,0.5)] hover:bg-white hover:text-black transition-all uppercase tracking-[0.15em] skew-x-[-10deg] hover:scale-105"
                    >
                        <span className="block skew-x-[10deg]">{t('hero.catalog')}</span>
                    </a>
                    <a 
                        href="#contact" 
                        className="w-full sm:w-auto border border-white/30 bg-black/20 backdrop-blur-sm px-8 py-4 text-xs font-bold text-white hover:bg-white hover:text-black transition-all uppercase tracking-[0.15em] skew-x-[-10deg]"
                    >
                        <span className="block skew-x-[10deg]">{t('hero.project_quote')}</span>
                    </a>
                </div>
            </div>

            {/* Stats Bar - Cleaner integration */}
            <div className="absolute bottom-0 w-full border-t border-white/5 bg-black/60 backdrop-blur-md">
                <div className="mx-auto max-w-7xl px-6 lg:px-8 py-6 grid grid-cols-2 md:grid-cols-4 gap-4 text-center divide-x divide-white/5">
                    <div>
                        <p className="text-2xl font-bold text-white">+15</p>
                        <p className="text-[10px] font-medium uppercase tracking-widest text-zinc-500">{t('hero.exp')}</p>
                    </div>
                    <div>
                        <p className="text-2xl font-bold text-white">ISO</p>
                        <p className="text-[10px] font-medium uppercase tracking-widest text-zinc-500">{t('hero.cert')}</p>
                    </div>
                    <div>
                        <p className="text-2xl font-bold text-white">24h</p>
                        <p className="text-[10px] font-medium uppercase tracking-widest text-zinc-500">{t('hero.support')}</p>
                    </div>
                    <div>
                        <p className="text-2xl font-bold text-white">Global</p>
                        <p className="text-[10px] font-medium uppercase tracking-widest text-zinc-500">{t('hero.logistics')}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Hero;