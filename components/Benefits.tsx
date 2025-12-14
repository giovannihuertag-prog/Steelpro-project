import React, { useEffect, useRef } from 'react';
import { ChartBarIcon, ShieldCheckIcon, CubeTransparentIcon, ServerStackIcon } from './Icons';

// Using consistent icons, though mapping them to the concepts
const cards = [
    {
        title: "Ecosistema Industrial Integrado",
        description: "Una solución completa que abarca desde la maquinaria hasta los materiales base.",
        icon: ServerStackIcon,
    },
    {
        title: "Maquinaria Especializada",
        description: "Equipos de alto rendimiento diseñados para construcción e ingeniería avanzada.",
        icon: CubeTransparentIcon,
    },
    {
        title: "Aceros Certificados",
        description: "Materiales de grado industrial con certificaciones internacionales de resistencia.",
        icon: ShieldCheckIcon,
    },
    {
        title: "Visión Global",
        description: "Tecnología de clase mundial con atención personalizada y soporte local.",
        icon: ChartBarIcon,
    },
    {
        title: "Alianzas Estratégicas",
        description: "Colaboración directa con fabricantes líderes para asegurar calidad y precio.",
        icon: ShieldCheckIcon, // Reusing icon for visual consistency
    }
];

const Benefits: React.FC = () => {
    const sectionRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach(entry => {
              if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
              }
            });
          },
          { threshold: 0.1 }
        );
    
        if (sectionRef.current) observer.observe(sectionRef.current);
    
        return () => {
            if (sectionRef.current) observer.unobserve(sectionRef.current);
        };
    }, []);

    return (
        <div ref={sectionRef} className="py-24 sm:py-32 bg-zinc-900 scroll-animate relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-yellow-500 to-transparent opacity-20"></div>
            
            <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
                <div className="mx-auto max-w-2xl lg:text-center mb-16">
                    <h2 className="text-base font-bold uppercase tracking-widest text-yellow-500">¿Por qué elegir SteelPro?</h2>
                    <p className="mt-2 text-3xl font-black tracking-tighter text-white sm:text-5xl uppercase">
                        Construimos Puentes de <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-zinc-200 to-zinc-500">Confianza y Resultados</span>
                    </p>
                    <p className="mt-6 text-lg leading-8 text-zinc-400">
                        SteelPro emerge como una empresa que trasciende fronteras para poner en sus manos un ecosistema completo.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {cards.map((card, index) => (
                        <div 
                            key={index} 
                            className="relative group bg-zinc-950 p-8 border border-white/5 hover:border-yellow-500/50 transition-all duration-300 hover:-translate-y-1"
                        >
                            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-100 transition-opacity">
                                <card.icon className="h-12 w-12 text-yellow-500" />
                            </div>
                            <div className="h-12 w-12 bg-yellow-500/10 rounded-sm flex items-center justify-center mb-6 group-hover:bg-yellow-500 transition-colors">
                                <card.icon className="h-6 w-6 text-yellow-500 group-hover:text-black transition-colors" />
                            </div>
                            <h3 className="text-xl font-bold text-white uppercase mb-3">{card.title}</h3>
                            <p className="text-zinc-400 text-sm leading-relaxed">{card.description}</p>
                            <div className="mt-6 h-1 w-12 bg-zinc-800 group-hover:bg-yellow-500 transition-all duration-500"></div>
                        </div>
                    ))}
                    
                    {/* CTA Card */}
                    <div className="relative group bg-yellow-500 p-8 flex flex-col justify-center items-center text-center">
                        <h3 className="text-2xl font-black text-black uppercase mb-3">¿Listo para comenzar?</h3>
                        <p className="text-black/80 text-sm mb-6">Contacte a nuestros ingenieros para una asesoría personalizada.</p>
                        <a href="#contact" className="px-6 py-3 bg-black text-white font-bold uppercase tracking-wider text-sm hover:bg-zinc-800 transition-colors">
                            Contactar
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Benefits;