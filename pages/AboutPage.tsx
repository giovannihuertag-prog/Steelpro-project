import React, { useEffect } from 'react';

const AboutPage: React.FC = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="bg-zinc-950 min-h-screen pt-24 pb-24 animate-fade-in">
            {/* Header / Intro */}
            <div className="relative px-6 lg:px-8 mb-24">
                <div className="mx-auto max-w-3xl text-center">
                    <div className="inline-flex items-center gap-x-2 mb-6 border border-yellow-500/30 bg-yellow-500/10 px-4 py-1.5 rounded-full">
                        <span className="h-1.5 w-1.5 rounded-full bg-yellow-500"></span>
                        <span className="text-xs font-bold uppercase tracking-widest text-yellow-500">Nuestra Identidad</span>
                    </div>
                    <h1 className="text-4xl font-black tracking-tighter text-white sm:text-6xl uppercase mb-8">
                        Más que Maquinaria, <br/>
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-zinc-200 to-zinc-500">Construimos Legado</span>
                    </h1>
                    <p className="text-lg text-zinc-400 font-light leading-relaxed">
                        En un mundo industrial fragmentado, SteelPro nace con una premisa clara: ser el eslabón más fuerte en su cadena de valor.
                    </p>
                </div>
            </div>

            {/* Narrative Sections */}
            <div className="mx-auto max-w-7xl px-6 lg:px-8 space-y-32">
                
                {/* 1. Nuestro Comienzo */}
                <section className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <div className="relative">
                        <div className="absolute -inset-4 bg-yellow-500/20 blur-2xl opacity-50 rounded-full"></div>
                        <img 
                            src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=2831&auto=format&fit=crop" 
                            alt="Arquitectura industrial" 
                            className="relative rounded-sm border border-white/10 shadow-2xl grayscale hover:grayscale-0 transition-all duration-700"
                        />
                        <div className="absolute -bottom-6 -right-6 bg-yellow-500 p-6 shadow-xl hidden sm:block">
                            <p className="text-3xl font-black text-black">2024</p>
                            <p className="text-xs font-bold text-black uppercase tracking-widest">Fundación en Querétaro</p>
                        </div>
                    </div>
                    <div>
                        <h2 className="text-sm font-bold uppercase tracking-widest text-yellow-500 mb-2">01. El Origen</h2>
                        <h3 className="text-3xl font-black text-white uppercase mb-6">Nuestro Comienzo</h3>
                        <p className="text-zinc-400 leading-relaxed mb-6">
                            SteelPro no surgió en una sala de juntas, sino en el terreno. Observamos la desconexión crítica entre la provisión de maquinaria pesada y el suministro de materiales base. Los proyectos se detenían esperando partes, o fallaban por aceros de baja calidad.
                        </p>
                        <p className="text-zinc-400 leading-relaxed border-l-2 border-yellow-500 pl-4">
                            Nacimos en el corazón industrial de México, Querétaro, con la misión de unificar estas dos necesidades vitales bajo un solo estándar de excelencia global.
                        </p>
                    </div>
                </section>

                {/* 2. Nuestra Razón */}
                <section className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center lg:flex-row-reverse">
                    <div className="lg:order-2 relative">
                         <img 
                            src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2940&auto=format&fit=crop" 
                            alt="Ingeniería de precisión" 
                            className="relative rounded-sm border border-white/10 shadow-2xl grayscale hover:grayscale-0 transition-all duration-700"
                        />
                    </div>
                    <div className="lg:order-1">
                        <h2 className="text-sm font-bold uppercase tracking-widest text-yellow-500 mb-2">02. El Propósito</h2>
                        <h3 className="text-3xl font-black text-white uppercase mb-6">Nuestra Razón</h3>
                        <p className="text-zinc-400 leading-relaxed mb-6">
                            Existimos porque la eficiencia no es negociable. La industria moderna no puede permitirse proveedores que no entienden la urgencia de una obra detenida. 
                        </p>
                        <p className="text-zinc-400 leading-relaxed">
                            Nuestra razón de ser es <strong>eliminar la incertidumbre</strong>. Cuando un cliente elige SteelPro, no compra un activo; adquiere la certeza de que su operación tiene el respaldo de una infraestructura logística y técnica diseñada para responder.
                        </p>
                    </div>
                </section>

                {/* 3. Nuestro Fundamento */}
                <section className="grid grid-cols-1 lg:grid-cols-3 gap-8 text-center bg-zinc-900/50 p-12 rounded-sm border border-white/5">
                    <div className="lg:col-span-3 mb-8">
                        <h2 className="text-sm font-bold uppercase tracking-widest text-yellow-500 mb-2">03. Los Pilares</h2>
                        <h3 className="text-3xl font-black text-white uppercase">Nuestro Fundamento</h3>
                    </div>
                    <div className="p-6 border border-white/5 hover:border-yellow-500/30 transition-colors">
                        <div className="text-yellow-500 mb-4 flex justify-center">
                            <span className="material-symbols-outlined text-4xl">verified</span>
                        </div>
                        <h4 className="text-xl font-bold text-white uppercase mb-2">Certificación Total</h4>
                        <p className="text-sm text-zinc-400">Cada máquina y cada tonelada de acero cuenta con trazabilidad ISO y garantía de origen.</p>
                    </div>
                    <div className="p-6 border border-white/5 hover:border-yellow-500/30 transition-colors">
                        <div className="text-yellow-500 mb-4 flex justify-center">
                            <span className="material-symbols-outlined text-4xl">handshake</span>
                        </div>
                        <h4 className="text-xl font-bold text-white uppercase mb-2">Alianzas Globales</h4>
                        <p className="text-sm text-zinc-400">Socios directos de DASWELL y fundidoras internacionales, eliminando intermediarios.</p>
                    </div>
                    <div className="p-6 border border-white/5 hover:border-yellow-500/30 transition-colors">
                        <div className="text-yellow-500 mb-4 flex justify-center">
                            <span className="material-symbols-outlined text-4xl">engineering</span>
                        </div>
                        <h4 className="text-xl font-bold text-white uppercase mb-2">Soporte Técnico</h4>
                        <p className="text-sm text-zinc-400">Ingenieros reales, no bots, resolviendo problemas complejos en tiempo real.</p>
                    </div>
                </section>

                {/* 4. Nuestra Dirección */}
                <section className="relative overflow-hidden rounded-sm bg-yellow-500 p-12 lg:p-24 text-center">
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
                    <div className="relative z-10 max-w-3xl mx-auto">
                        <h2 className="text-sm font-bold uppercase tracking-widest text-black mb-2">04. El Futuro</h2>
                        <h3 className="text-4xl lg:text-5xl font-black text-black uppercase mb-8 leading-tight">
                            Nuestra Dirección
                        </h3>
                        <p className="text-xl font-medium text-black/80 leading-relaxed mb-10">
                            "Construimos puentes de confianza y resultados." Nos dirigimos hacia la integración total de la inteligencia artificial en la cadena de suministro industrial, automatizando no solo la maquinaria, sino la toma de decisiones estratégicas de nuestros clientes.
                        </p>
                        <a href="#solutions" className="inline-block bg-black text-white px-8 py-4 text-sm font-bold uppercase tracking-wider hover:bg-zinc-800 transition-colors">
                            Únase a Nuestra Visión
                        </a>
                    </div>
                </section>

            </div>
        </div>
    );
};

export default AboutPage;