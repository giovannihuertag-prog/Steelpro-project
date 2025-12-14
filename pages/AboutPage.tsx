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
                        <span className="text-xs font-bold uppercase tracking-widest text-yellow-500">Perfil Corporativo</span>
                    </div>
                    <h1 className="text-4xl font-black tracking-tighter text-white sm:text-5xl uppercase mb-8">
                        El Eslabón Más Fuerte de su <br/>
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-zinc-200 to-zinc-500">Cadena de Suministro</span>
                    </h1>
                    <p className="text-lg text-zinc-400 font-light leading-relaxed">
                        En la industria, un retraso en materiales cuesta miles de dólares. SteelPro unifica la venta de maquinaria de alto tonelaje con el suministro de aceros base, eliminando intermediarios y tiempos muertos.
                    </p>
                </div>
            </div>

            {/* Narrative Sections */}
            <div className="mx-auto max-w-7xl px-6 lg:px-8 space-y-32">
                
                {/* 1. Capacidad Operativa */}
                <section className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <div className="relative">
                         <div className="absolute top-0 right-0 p-2 bg-yellow-500 text-black font-bold text-xs uppercase z-10">
                            Sede Querétaro, MX
                        </div>
                        <img 
                            src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=2831&auto=format&fit=crop" 
                            alt="Instalaciones industriales" 
                            className="relative rounded-sm border border-white/10 shadow-2xl grayscale hover:grayscale-0 transition-all duration-700"
                        />
                    </div>
                    <div>
                        <h2 className="text-sm font-bold uppercase tracking-widest text-yellow-500 mb-2">01. Capacidad</h2>
                        <h3 className="text-3xl font-black text-white uppercase mb-6">Infraestructura Real</h3>
                        <p className="text-zinc-400 leading-relaxed mb-6">
                            A diferencia de los intermediarios digitales, SteelPro opera con infraestructura física. Contamos con patios de maquinaria y almacenes de acero en puntos estratégicos del bajío mexicano, lo que nos permite garantizar tiempos de entrega que la competencia solo puede estimar.
                        </p>
                        <ul className="space-y-3 mt-6">
                            <li className="flex items-center text-zinc-300 text-sm">
                                <span className="material-symbols-outlined text-yellow-500 mr-2 text-lg">check_circle</span>
                                Stock permanente de refacciones DASWELL.
                            </li>
                            <li className="flex items-center text-zinc-300 text-sm">
                                <span className="material-symbols-outlined text-yellow-500 mr-2 text-lg">check_circle</span>
                                Centro de servicio y mantenimiento certificado.
                            </li>
                            <li className="flex items-center text-zinc-300 text-sm">
                                <span className="material-symbols-outlined text-yellow-500 mr-2 text-lg">check_circle</span>
                                Logística propia para entregas urgentes.
                            </li>
                        </ul>
                    </div>
                </section>

                {/* 2. Enfoque Técnico */}
                <section className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center lg:flex-row-reverse">
                    <div className="lg:order-2 relative">
                         <img 
                            src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2940&auto=format&fit=crop" 
                            alt="Ingeniería de precisión" 
                            className="relative rounded-sm border border-white/10 shadow-2xl grayscale hover:grayscale-0 transition-all duration-700"
                        />
                    </div>
                    <div className="lg:order-1">
                        <h2 className="text-sm font-bold uppercase tracking-widest text-yellow-500 mb-2">02. Expertise</h2>
                        <h3 className="text-3xl font-black text-white uppercase mb-6">Ingeniería Aplicada</h3>
                        <p className="text-zinc-400 leading-relaxed mb-6">
                            No solo vendemos el equipo; garantizamos su operatividad. Nuestro equipo está formado por ingenieros mecánicos y civiles que entienden los requerimientos técnicos de su obra.
                        </p>
                        <p className="text-zinc-400 leading-relaxed">
                            Desde la selección del grado de acero correcto hasta la configuración hidráulica de una excavadora, le asesoramos para maximizar el retorno de su inversión.
                        </p>
                    </div>
                </section>

                {/* 3. Visión Tecnológica */}
                <section className="relative overflow-hidden rounded-sm bg-zinc-900 border border-white/5 p-12 lg:p-24 text-center">
                    <div className="relative z-10 max-w-3xl mx-auto">
                        <h2 className="text-sm font-bold uppercase tracking-widest text-yellow-500 mb-2">03. Innovación</h2>
                        <h3 className="text-4xl font-black text-white uppercase mb-6">
                            Abastecimiento Inteligente
                        </h3>
                        <p className="text-lg font-light text-zinc-300 leading-relaxed mb-10">
                            SteelPro integra inteligencia de datos en el abastecimiento industrial. Analizamos tendencias globales de acero y disponibilidad de maquinaria para asegurar que su proyecto nunca se detenga por falta de insumos.
                        </p>
                        <div className="flex justify-center gap-4">
                            <a href="#solutions" className="bg-yellow-500 text-black px-8 py-3 text-sm font-bold uppercase tracking-wider hover:bg-white transition-colors">
                                Ver Catálogo
                            </a>
                        </div>
                    </div>
                </section>

            </div>
        </div>
    );
};

export default AboutPage;