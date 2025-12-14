import React, { useState, useMemo, useEffect, useRef } from 'react';
import { solutions, Solution, categoryMetaData } from '../data/solutions';
import { CheckIcon, XIcon, AnalysisIcon } from '../components/Icons';
import ContactForm from '../components/ContactForm';

const filterCategories = [
    { id: 'all', name: 'Catálogo Completo' },
    { id: 'construction', name: 'Construcción' },
    { id: 'engineering', name: 'Ingeniería' },
    { id: 'steel', name: 'Aceros' },
];

interface SectionProps {
    title: string;
    description: string;
    items: Solution[];
    onSelect: (s: Solution) => void;
    id: string;
    showDivider?: boolean;
}

const SolutionSection: React.FC<SectionProps> = ({ title, description, items, onSelect, id, showDivider = true }) => {
    if (items.length === 0) return null;

    return (
        <div id={id} className={`py-12 ${showDivider ? 'border-b border-white/5' : ''} last:border-0`}>
            <div className="mb-10">
                <h3 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tighter border-l-4 border-yellow-500 pl-4">
                    {title}
                </h3>
                <p className="mt-2 text-zinc-400 pl-5">{description}</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-8">
                {items.map((solution) => (
                    <div 
                        key={solution.id} 
                        className="group relative bg-zinc-900 border border-white/5 overflow-hidden rounded-sm hover:border-yellow-500/50 transition-all duration-300 flex flex-col sm:flex-row cursor-pointer"
                        onClick={() => onSelect(solution)}
                    >
                        {/* Image Container */}
                        <div className="sm:w-2/5 relative h-64 sm:h-auto overflow-hidden">
                            <img 
                                src={solution.imageUrl} 
                                alt={solution.imageAlt} 
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0"
                            />
                            <div className="absolute top-0 left-0 bg-yellow-500 text-black text-xs font-bold px-3 py-1 uppercase tracking-widest">
                                {solution.brand}
                            </div>
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent sm:bg-gradient-to-r"></div>
                        </div>

                        {/* Content Container */}
                        <div className="sm:w-3/5 p-6 flex flex-col justify-between">
                            <div>
                                <h4 className="text-xl font-bold text-white uppercase leading-tight mb-2 group-hover:text-yellow-500 transition-colors">
                                    {solution.name}
                                </h4>
                                <p className="text-sm text-zinc-400 line-clamp-3 mb-4">
                                    {solution.shortDescription}
                                </p>
                                
                                <div className="space-y-1 mb-6">
                                    {solution.features.slice(0, 4).map((feature, i) => (
                                        <div key={i} className="flex items-center text-xs text-zinc-500">
                                            <span className="w-1.5 h-1.5 bg-yellow-500 rounded-full mr-2 flex-shrink-0"></span>
                                            <span className="truncate">{feature}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="flex gap-3 mt-auto">
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        onSelect(solution);
                                    }}
                                    className="flex-1 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-bold uppercase text-white tracking-wide transition-colors"
                                >
                                    Ver Detalles
                                </button>
                                <a 
                                    href="#contact"
                                    onClick={(e) => e.stopPropagation()}
                                    className="flex-1 px-4 py-2 bg-yellow-500 hover:bg-yellow-400 text-xs font-bold uppercase text-black tracking-wide text-center transition-colors flex items-center justify-center"
                                >
                                    Solicitar Cotización
                                </a>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

const SolutionsPage: React.FC<{ route?: string }> = ({ route = '#solutions' }) => {
    const activeFilter = useMemo(() => {
        const hashParts = route.split('/');
        if (hashParts.length > 1 && hashParts[0] === '#solutions') {
            const filterId = hashParts[1];
            if (filterCategories.some(c => c.id === filterId)) {
                return filterId;
            }
        }
        return 'all';
    }, [route]);

    const isCategoryView = activeFilter !== 'all';
    const categoryInfo = isCategoryView ? categoryMetaData[activeFilter as keyof typeof categoryMetaData] : null;

    const [selectedSolution, setSelectedSolution] = useState<Solution | null>(null);
    const [activeImage, setActiveImage] = useState<string>('');
    const [isLoading, setIsLoading] = useState(true);

    // Group solutions by category
    const groupedSolutions = useMemo(() => {
        return {
            construction: solutions.filter(s => s.category === 'construction'),
            engineering: solutions.filter(s => s.category === 'engineering'),
            steel: solutions.filter(s => s.category === 'steel')
        };
    }, []);

    useEffect(() => {
        if (selectedSolution) {
            document.body.style.overflow = 'hidden';
            // Reset the active image to the main one when opening modal
            setActiveImage(selectedSolution.imageUrl);
        } else {
            document.body.style.overflow = 'auto';
        }
        return () => { 
            document.body.style.overflow = 'auto';
        };
    }, [selectedSolution]);

    useEffect(() => {
        setIsLoading(true);
        const timer = setTimeout(() => {
            setIsLoading(false);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }, 400); 
        return () => clearTimeout(timer);
    }, [activeFilter]);

    return (
        <div className="pt-0 animate-fade-in bg-zinc-950 min-h-screen">
            
            {/* HERO SECTION: Dynamic based on Category vs All */}
            {!isCategoryView ? (
                // Standard Catalog Hero
                <div className="pt-24 sm:pt-32 pb-10">
                     <div className="mx-auto max-w-7xl px-6 lg:px-8">
                        <div className="mx-auto max-w-3xl text-center">
                            <h2 className="text-sm font-bold uppercase tracking-widest text-yellow-500">Distribuidor Autorizado DASWELL</h2>
                            <p className="mt-2 text-4xl font-black tracking-tighter text-white sm:text-6xl uppercase">Catálogo de Maquinaria</p>
                            <p className="mt-6 text-lg leading-8 text-zinc-400">
                                Tecnología de punta para construcción e ingeniería. Potencia, durabilidad y soporte técnico global.
                            </p>
                        </div>
                    </div>
                </div>
            ) : (
                // Specialized Category Hero
                <div className="relative h-[60vh] min-h-[500px] flex items-center">
                     <div className="absolute inset-0 z-0">
                         <img 
                            src={categoryInfo?.heroImage} 
                            alt={categoryInfo?.title}
                            className="w-full h-full object-cover"
                         />
                         <div className="absolute inset-0 bg-zinc-950/80 mix-blend-multiply"></div>
                         <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent"></div>
                     </div>
                     
                     <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8 w-full">
                         <div className="max-w-3xl">
                             <div className="inline-flex items-center gap-x-2 mb-6 border border-yellow-500/30 bg-black/50 backdrop-blur-md px-4 py-1.5 rounded-full">
                                <span className="h-2 w-2 rounded-full bg-yellow-500"></span>
                                <span className="text-xs font-bold uppercase tracking-widest text-yellow-500">División Especializada</span>
                            </div>
                            <h1 className="text-5xl md:text-7xl font-black text-white uppercase tracking-tighter mb-6">
                                {categoryInfo?.title}
                            </h1>
                            <p className="text-xl text-zinc-300 font-light border-l-4 border-yellow-500 pl-6 max-w-2xl">
                                {categoryInfo?.subtitle}
                            </p>
                            <p className="mt-6 text-zinc-400 max-w-xl">
                                {categoryInfo?.description}
                            </p>
                         </div>
                     </div>
                     
                     {/* Stats Bar */}
                     <div className="absolute bottom-0 w-full bg-black/60 backdrop-blur-md border-t border-white/10">
                         <div className="mx-auto max-w-7xl px-6 lg:px-8">
                             <div className="grid grid-cols-3 divide-x divide-white/10">
                                 {categoryInfo?.stats.map((stat, idx) => (
                                     <div key={idx} className="py-6 px-4 text-center sm:text-left">
                                         <p className="text-3xl font-black text-white">{stat.value}</p>
                                         <p className="text-xs uppercase tracking-widest text-zinc-500 mt-1">{stat.label}</p>
                                     </div>
                                 ))}
                             </div>
                         </div>
                     </div>
                </div>
            )}

            {/* Sub-Navigation / Breadcrumbs */}
            <div className={`sticky top-20 z-30 bg-zinc-950/90 backdrop-blur-sm border-b border-white/5 ${isCategoryView ? 'py-2' : 'py-4 mt-8'}`}>
                <div className="mx-auto max-w-7xl px-6 lg:px-8 flex items-center justify-between">
                    <div className="flex flex-wrap items-center gap-2">
                        {isCategoryView && <span className="text-zinc-500 text-sm font-bold uppercase mr-2 hidden sm:inline">Departamentos:</span>}
                        {filterCategories.map((category) => (
                            <a
                                key={category.id}
                                href={category.id === 'all' ? '#solutions' : `#solutions/${category.id}`}
                                className={`px-4 py-2 text-xs sm:text-sm font-bold uppercase tracking-wide transition-all duration-300 focus:outline-none ${
                                    activeFilter === category.id
                                    ? 'bg-yellow-500 text-black skew-x-[-10deg]'
                                    : 'text-zinc-400 hover:text-white hover:bg-white/5'
                                }`}
                            >
                                <span className={activeFilter === category.id ? 'skew-x-[10deg] block' : ''}>{category.name}</span>
                            </a>
                        ))}
                    </div>
                    {isCategoryView && (
                         <a href="#contact" className="hidden sm:inline-flex items-center text-xs font-bold text-yellow-500 hover:text-white uppercase transition-colors">
                            Hablar con un ingeniero <span className="ml-2">→</span>
                         </a>
                    )}
                </div>
            </div>

            {/* Solutions Content */}
            <div className="mx-auto max-w-7xl px-6 lg:px-8 min-h-[500px] py-12">
                {isLoading ? (
                    <div className="flex justify-center items-center h-64">
                        <div className="w-12 h-12 border-4 border-yellow-500 border-solid border-t-transparent animate-spin" role="status">
                            <span className="sr-only">Cargando...</span>
                        </div>
                    </div>
                ) : (
                    <div className="animate-fade-in space-y-8">
                        {/* Section A: Construction */}
                        {(activeFilter === 'all' || activeFilter === 'construction') && (
                            <SolutionSection 
                                id="construction"
                                title={isCategoryView ? "Equipos Disponibles" : "A) Maquinaria para Construcción"} 
                                description="Soluciones integrales de bombeo, mezcla y plantas de hormigón DASWELL."
                                items={groupedSolutions.construction} 
                                onSelect={setSelectedSolution}
                                showDivider={!isCategoryView}
                            />
                        )}

                        {/* Section B: Engineering */}
                        {(activeFilter === 'all' || activeFilter === 'engineering') && (
                            <SolutionSection 
                                id="engineering"
                                title={isCategoryView ? "Equipos Disponibles" : "B) Maquinaria de Ingeniería"} 
                                description="Equipos pesados de movimiento de tierras y elevación para grandes proyectos."
                                items={groupedSolutions.engineering} 
                                onSelect={setSelectedSolution}
                                showDivider={!isCategoryView}
                            />
                        )}

                        {/* Section C: Steel */}
                        {(activeFilter === 'all' || activeFilter === 'steel') && (
                            <SolutionSection 
                                id="steel"
                                title={isCategoryView ? "Catálogo de Materiales" : "Aceros Industriales"} 
                                description="Suministro de materiales certificados para manufactura y estructuras."
                                items={groupedSolutions.steel} 
                                onSelect={setSelectedSolution}
                                showDivider={!isCategoryView}
                            />
                        )}
                    </div>
                )}
            </div>

            {/* Contact Section */}
            <div id="contact" className="py-16 sm:py-24 px-6 lg:px-8 mt-0 bg-zinc-900 border-t border-white/5">
              <div className="mx-auto max-w-7xl rounded-sm overflow-hidden bg-zinc-950 border border-white/10 shadow-2xl">
                <div className="grid grid-cols-1 lg:grid-cols-2">
                    <div className="relative hidden lg:block">
                        <img 
                            src={isCategoryView && categoryInfo ? categoryInfo.heroImage : "https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=2940&auto=format&fit=crop"} 
                            alt="Construcción" 
                            className="absolute inset-0 h-full w-full object-cover grayscale opacity-60"
                        />
                        <div className="absolute inset-0 bg-yellow-500/10 mix-blend-multiply"></div>
                        <div className="absolute inset-0 bg-gradient-to-r from-zinc-950 to-transparent"></div>
                    </div>
                    <div className="p-12 sm:p-16">
                        <h2 className="text-3xl font-black tracking-tight text-white uppercase">Solicitar Cotización</h2>
                        <p className="mt-4 text-lg leading-8 text-zinc-400">
                            {isCategoryView ? `Contacte a nuestro departamento de ${categoryInfo?.title.toLowerCase()} para una propuesta formal.` : "Póngase en contacto con nuestro equipo global para discutir las especificaciones de su proyecto."}
                        </p>
                        <ContactForm idPrefix="solutions" />
                    </div>
                </div>
              </div>
            </div>

            {/* Details Modal */}
            {selectedSolution && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-fade-in"
                    onClick={() => setSelectedSolution(null)}
                >
                    <div
                        className="relative w-full max-w-6xl bg-zinc-900 rounded-sm shadow-2xl border border-yellow-500/30 max-h-[95vh] overflow-y-auto flex flex-col md:flex-row"
                        onClick={(e) => e.stopPropagation()} 
                    >
                        {/* Modal Image Column */}
                        <div className="md:w-5/12 bg-black flex flex-col">
                            {/* Main Image */}
                            <div className="relative h-64 md:h-[500px] w-full group">
                                <img 
                                    src={activeImage || selectedSolution.imageUrl} 
                                    alt={selectedSolution.imageAlt} 
                                    className="absolute inset-0 w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60"></div>
                                <div className="absolute top-4 left-4 bg-yellow-500 text-black text-xs font-bold px-3 py-1 uppercase tracking-widest z-10">
                                    {selectedSolution.brand}
                                </div>
                            </div>
                            
                            {/* Gallery Thumbnails (only if gallery exists) */}
                            {selectedSolution.gallery && selectedSolution.gallery.length > 0 && (
                                <div className="p-4 grid grid-cols-4 gap-2 bg-zinc-950/50 border-t border-white/5">
                                    {selectedSolution.gallery.map((imgUrl, index) => (
                                        <button
                                            key={index}
                                            onClick={() => setActiveImage(imgUrl)}
                                            className={`relative aspect-square overflow-hidden border-2 transition-all ${activeImage === imgUrl ? 'border-yellow-500 opacity-100' : 'border-transparent opacity-60 hover:opacity-100'}`}
                                        >
                                            <img src={imgUrl} alt={`Vista ${index + 1}`} className="w-full h-full object-cover" />
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Modal Content */}
                        <div className="md:w-7/12 p-8 md:p-12 flex flex-col overflow-y-auto">
                            <div className="flex items-start justify-between gap-x-4 mb-2">
                                <div className="inline-flex items-center gap-2 mb-2">
                                    <span className="h-1.5 w-1.5 rounded-full bg-yellow-500 animate-pulse"></span>
                                    <span className="text-xs font-bold uppercase tracking-widest text-zinc-500">
                                        {selectedSolution.category === 'construction' ? 'Maquinaria Pesada' : selectedSolution.category === 'engineering' ? 'Ingeniería Civil' : 'Materiales'}
                                    </span>
                                </div>
                                <button
                                    type="button"
                                    onClick={() => setSelectedSolution(null)}
                                    className="p-1 text-zinc-400 hover:text-white transition-colors focus:outline-none"
                                >
                                    <XIcon className="h-6 w-6" />
                                </button>
                            </div>

                            <h3 className="text-3xl md:text-4xl font-black tracking-tight text-white uppercase leading-none mb-6">
                                {selectedSolution.name}
                            </h3>

                            <p className="text-lg text-zinc-300 mb-8 font-light leading-relaxed border-l-2 border-zinc-700 pl-4">
                                {selectedSolution.description}
                            </p>
                            
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-8">
                                <div className="bg-white/5 p-6 rounded-sm border border-white/5">
                                    <h4 className="text-xs font-bold text-yellow-500 uppercase tracking-widest mb-4 flex items-center">
                                        <AnalysisIcon className="h-4 w-4 mr-2" />
                                        Especificaciones Técnicas
                                    </h4>
                                    <ul className="space-y-3">
                                        {selectedSolution.features.map((feature) => (
                                            <li key={feature} className="flex items-start text-sm text-zinc-300">
                                                <CheckIcon className="h-5 w-5 text-yellow-500 mr-3 flex-shrink-0" />
                                                {feature}
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                {/* Visual Performance Graph (Simulated) */}
                                <div className="bg-white/5 p-6 rounded-sm border border-white/5">
                                    <h4 className="text-xs font-bold text-white uppercase tracking-widest mb-4">
                                        Índice de Rendimiento
                                    </h4>
                                    <div className="space-y-4">
                                        <div>
                                            <div className="flex justify-between text-xs text-zinc-500 mb-1">
                                                <span>Potencia / Capacidad</span>
                                                <span>92%</span>
                                            </div>
                                            <div className="h-1.5 w-full bg-zinc-700 rounded-full overflow-hidden">
                                                <div className="h-full bg-yellow-500 w-[92%]"></div>
                                            </div>
                                        </div>
                                        <div>
                                            <div className="flex justify-between text-xs text-zinc-500 mb-1">
                                                <span>Eficiencia Energética</span>
                                                <span>88%</span>
                                            </div>
                                            <div className="h-1.5 w-full bg-zinc-700 rounded-full overflow-hidden">
                                                <div className="h-full bg-yellow-500 w-[88%]"></div>
                                            </div>
                                        </div>
                                        <div>
                                            <div className="flex justify-between text-xs text-zinc-500 mb-1">
                                                <span>Durabilidad</span>
                                                <span>98%</span>
                                            </div>
                                            <div className="h-1.5 w-full bg-zinc-700 rounded-full overflow-hidden">
                                                <div className="h-full bg-yellow-500 w-[98%]"></div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mt-6 p-3 bg-black/40 text-xs text-zinc-400 border border-white/5">
                                        <strong className="text-white block mb-1">Nota de Ingeniería:</strong>
                                        Equipo certificado bajo normas ISO. Mantenimiento preventivo recomendado cada 500 horas.
                                    </div>
                                </div>
                            </div>

                            <div className="mt-auto flex justify-end gap-4 border-t border-white/10 pt-6">
                                <button
                                    onClick={() => setSelectedSolution(null)}
                                    className="px-6 py-3 text-xs font-bold uppercase text-zinc-400 hover:text-white transition-colors"
                                >
                                    Cerrar Ficha
                                </button>
                                <a
                                    href="#contact"
                                    onClick={() => setSelectedSolution(null)}
                                    className="px-8 py-3 bg-yellow-500 hover:bg-yellow-400 text-xs font-bold uppercase text-black tracking-wide transition-colors shadow-lg hover:shadow-yellow-500/20"
                                >
                                    Solicitar Cotización Formal
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SolutionsPage;