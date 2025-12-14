import React, { useEffect, useRef } from 'react';
import { ChartBarIcon, ShieldCheckIcon, CubeTransparentIcon, ServerStackIcon } from './Icons';

const cards = [
    {
        title: "Disponibilidad Inmediata",
        description: "Reduzca tiempos de espera. Mantenemos inventario físico de maquinaria y aceros para despacho urgente.",
        icon: ServerStackIcon,
    },
    {
        title: "Maquinaria Heavy-Duty",
        description: "Equipos DASWELL diseñados para ciclos de trabajo continuo en condiciones extremas de minería.",
        icon: CubeTransparentIcon,
    },
    {
        title: "Aceros Certificados",
        description: "Trazabilidad completa con certificados de calidad (MTR) para cada lote entregado.",
        icon: ShieldCheckIcon,
    },
    {
        title: "Soporte Técnico Real",
        description: "Ingenieros especialistas disponibles para puesta en marcha, capacitación y mantenimiento.",
        icon: ChartBarIcon,
    },
    {
        title: "Logística Integrada",
        description: "Coordinación directa de transporte a obra, eliminando fricción con terceros.",
        icon: ShieldCheckIcon, 
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
            <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
                <div className="mx-auto max-w-2xl lg:text-center mb-16">
                    <h2 className="text-sm font-bold uppercase tracking-widest text-yellow-500">Propuesta de Valor</h2>
                    <p className="mt-2 text-3xl font-black tracking-tighter text-white sm:text-4xl uppercase">
                        Operatividad Garantizada
                    </p>
                    <p className="mt-4 text-lg leading-8 text-zinc-400">
                        SteelPro elimina la incertidumbre en su cadena de suministro. No solo vendemos equipos; aseguramos la continuidad de su proyecto.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {cards.map((card, index) => (
                        <div 
                            key={index} 
                            className="relative group bg-zinc-950 p-8 border border-white/5 hover:border-yellow-500/50 transition-all duration-300"
                        >
                            <div className="h-12 w-12 bg-yellow-500/10 rounded-sm flex items-center justify-center mb-6 border border-yellow-500/20 group-hover:bg-yellow-500 group-hover:border-yellow-500 transition-colors">
                                <card.icon className="h-6 w-6 text-yellow-500 group-hover:text-black transition-colors" />
                            </div>
                            <h3 className="text-lg font-bold text-white uppercase mb-3">{card.title}</h3>
                            <p className="text-zinc-400 text-sm leading-relaxed">{card.description}</p>
                        </div>
                    ))}
                    
                    {/* CTA Card */}
                    <div className="relative group bg-yellow-500 p-8 flex flex-col justify-center items-center text-center">
                        <h3 className="text-xl font-black text-black uppercase mb-3">¿Necesita Asesoría?</h3>
                        <p className="text-black/80 text-sm mb-6 font-medium">Hable con un ingeniero de aplicaciones hoy mismo.</p>
                        <a href="#contact" className="px-6 py-3 bg-black text-white font-bold uppercase tracking-wider text-xs hover:bg-zinc-800 transition-colors w-full">
                            Contactar Ingeniería
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Benefits;