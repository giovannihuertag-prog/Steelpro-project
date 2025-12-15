import React, { useState, useMemo, useEffect } from 'react';
import { solutions, Solution, categoryMetaData } from '../data/solutions';
import { CubeTransparentIcon } from '../components/Icons';
import ContactForm from '../components/ContactForm';
import Product3DViewer from '../components/Product3DViewer';
import LayoutTresColumnas from '../components/LayoutTresColumnas';

// --- UTILS ---
const shuffleArray = (array: Solution[]) => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
};

// --- LOCAL COMPONENTS ---

// Tarjeta lateral técnica (Inventario)
const RecommendationCard: React.FC<{ solution: Solution; onSelect: (s: Solution) => void }> = ({ solution, onSelect }) => (
    <div 
        onClick={() => onSelect(solution)}
        className="group flex items-start gap-3 p-3 bg-zinc-900/40 border-b border-white/5 hover:bg-white/5 transition-colors cursor-pointer last:border-0"
    >
        <div className="relative w-12 h-12 shrink-0 bg-black border border-white/10">
             <img 
                src={solution.imageUrl} 
                alt={solution.name} 
                className="w-full h-full object-cover opacity-60 group-hover:opacity-100 grayscale group-hover:grayscale-0 transition-all duration-500"
            />
        </div>
        <div className="min-w-0 flex-1">
            <h5 className="text-[10px] font-bold text-zinc-300 uppercase leading-tight truncate group-hover:text-yellow-500 transition-colors">
                {solution.name}
            </h5>
             <div className="flex items-center gap-2 mt-1">
                <span className="text-[9px] text-zinc-500 font-mono uppercase tracking-wider">
                    {solution.brand || 'STEELPRO'}
                </span>
                {solution.status === 'disponible' && (
                    <span className="flex items-center gap-1 bg-green-900/20 px-1.5 py-0.5 rounded-sm border border-green-900/30">
                         <span className="w-1 h-1 bg-green-500 rounded-full"></span>
                         <span className="text-[8px] text-green-500 font-bold uppercase">Stock</span>
                    </span>
                )}
            </div>
        </div>
    </div>
);

const RecommendationColumn: React.FC<{ title: string; items: Solution[]; onSelect: (s: Solution) => void }> = ({ title, items, onSelect }) => {
    if (items.length === 0) return null;
    return (
        <div className="flex flex-col">
             <div className="flex items-center gap-2 mb-4 border-b border-white/10 pb-2 sticky top-0 bg-zinc-950/95 backdrop-blur z-10 pt-1">
                <span className="w-1 h-4 bg-yellow-500"></span>
                <h4 className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">{title}</h4>
             </div>
             <div className="flex flex-col border border-white/5 bg-zinc-950">
                 {items.map(item => (
                     <RecommendationCard key={item.id} solution={item} onSelect={onSelect} />
                 ))}
             </div>
        </div>
    );
};

// Dynamically generate filter categories from data
const getFilterCategories = () => {
    const uniqueCategories = Array.from(new Set(solutions.map(s => s.category)));
    const dynamicCats = uniqueCategories.map(cat => ({
        id: cat,
        name: categoryMetaData[cat as keyof typeof categoryMetaData]?.title || cat.toUpperCase()
    }));
    return [{ id: 'all', name: 'Catálogo Completo' }, ...dynamicCats];
};

interface SectionProps {
    title: string;
    description: string;
    items: Solution[];
    onSelect: (s: Solution) => void;
    id: string;
    showDivider?: boolean;
}

// Tarjeta Central (Ficha Técnica Resumida)
const SolutionSection: React.FC<SectionProps> = ({ title, description, items, onSelect, id, showDivider = true }) => {
    if (items.length === 0) return null;

    return (
        <div id={id} className={`py-6 ${showDivider ? 'border-b border-white/5' : ''} last:border-0`}>
            <div className="mb-6 flex items-baseline justify-between">
                <div>
                    <h3 className="text-lg font-bold text-white uppercase tracking-tight flex items-center gap-2">
                        <span className="text-yellow-500">/</span> {title}
                    </h3>
                    <p className="mt-1 text-xs text-zinc-500 max-w-2xl">{description}</p>
                </div>
            </div>
            
            {/* Grid Layout B2B */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
                {items.map((solution) => (
                    <div 
                        key={solution.id} 
                        className="group relative bg-zinc-900 border border-white/5 hover:border-yellow-500/50 transition-all duration-300 flex flex-col cursor-pointer overflow-hidden"
                        onClick={() => onSelect(solution)}
                    >
                        <div className="flex h-40">
                             {/* Imagen Técnica */}
                            <div className="w-1/3 relative border-r border-white/5 bg-black">
                                <img 
                                    src={solution.imageUrl} 
                                    alt={solution.imageAlt} 
                                    className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity grayscale group-hover:grayscale-0"
                                />
                                <div className="absolute top-0 left-0 bg-yellow-500/90 text-black text-[8px] font-bold px-1.5 py-0.5 uppercase tracking-widest z-10">
                                    {solution.brand}
                                </div>
                            </div>
                            
                            {/* Datos Técnicos */}
                            <div className="w-2/3 p-4 flex flex-col justify-between">
                                <div>
                                    <div className="flex justify-between items-start mb-2">
                                        <h4 className="text-sm font-bold text-zinc-200 uppercase leading-tight group-hover:text-yellow-500 transition-colors">
                                            {solution.name}
                                        </h4>
                                        {solution.status === 'disponible' && (
                                            <span className="w-2 h-2 bg-green-500 rounded-full shrink-0 mt-1"></span>
                                        )}
                                    </div>
                                    <p className="text-[10px] text-zinc-500 line-clamp-2 leading-relaxed mb-3">
                                        {solution.shortDescription}
                                    </p>
                                    <div className="space-y-1">
                                        {solution.features.slice(0, 2).map((feature, i) => (
                                            <div key={i} className="flex items-center text-[9px] text-zinc-400 font-mono">
                                                <span className="w-1 h-1 bg-zinc-600 rounded-full mr-2"></span>
                                                <span className="truncate">{feature}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div className="mt-2 pt-2 border-t border-white/5 flex justify-end">
                                    <span className="text-[9px] font-bold uppercase text-yellow-500 tracking-wider group-hover:translate-x-1 transition-transform flex items-center gap-1">
                                        Ficha Técnica <span className="material-symbols-outlined text-[10px]">chevron_right</span>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

// Dynamic Image Preview Component
const SegmentPreview: React.FC<{ items: Solution[] }> = ({ items }) => {
    const previewImages = useMemo(() => {
        if (items.length < 3) return items.slice(0, 3);
        return [...items].sort(() => 0.5 - Math.random()).slice(0, 3);
    }, [items]);

    if (items.length === 0) return null;

    return (
        <div className="grid grid-cols-3 gap-1 h-24 mb-8 opacity-50 hover:opacity-100 transition-opacity duration-500 border border-white/5 bg-black">
            {previewImages.map((item, idx) => (
                <div key={idx} className="relative overflow-hidden group">
                    <img 
                        src={item.imageUrl} 
                        alt="Preview" 
                        className="w-full h-full object-cover grayscale transition-transform duration-1000 group-hover:scale-105"
                    />
                </div>
            ))}
        </div>
    );
};

// --- MAIN PAGE COMPONENT ---

const SolutionsPage: React.FC<{ route?: string }> = ({ route = '#solutions' }) => {
    const filterCategories = useMemo(() => getFilterCategories(), []);

    const activeFilter = useMemo(() => {
        const hashParts = route.split('/');
        if (hashParts.length > 1 && hashParts[0] === '#solutions') {
            const filterId = hashParts[1];
            if (filterCategories.some(c => c.id === filterId)) {
                return filterId;
            }
        }
        return 'all';
    }, [route, filterCategories]);

    const isCategoryView = activeFilter !== 'all';
    const categoryInfo = isCategoryView ? categoryMetaData[activeFilter as keyof typeof categoryMetaData] : null;

    const [selectedSolution, setSelectedSolution] = useState<Solution | null>(null);
    const [activeImage, setActiveImage] = useState<string>('');
    const [isLoading, setIsLoading] = useState(true);
    const [viewMode, setViewMode] = useState<'image' | '3d'>('image');

    // Filter solutions dynamically
    const currentSolutions = useMemo(() => {
        if (activeFilter === 'all') return solutions;
        return solutions.filter(s => s.category === activeFilter);
    }, [activeFilter]);

    // INTELLIGENT RECOMMENDATION ENGINE (No Duplicates)
    const { leftRecommendations, rightRecommendations } = useMemo(() => {
        // Exclude items currently visible in the main view to avoid duplicates
        const visibleIds = new Set(currentSolutions.map(s => s.id));
        
        // Exclude selected solution if any
        if (selectedSolution) visibleIds.add(selectedSolution.id);

        // Get pool of available items
        const availableForRecs = solutions.filter(s => !visibleIds.has(s.id));
        const shuffled = shuffleArray(availableForRecs);
        
        // Provide enough items for the sticky scroll
        const left = shuffled.slice(0, 8);
        const right = shuffled.slice(8, 16);
        
        return { leftRecommendations: left, rightRecommendations: right };
    }, [currentSolutions, selectedSolution]);

    useEffect(() => {
        if (selectedSolution) {
            document.body.style.overflow = 'hidden';
            setActiveImage(selectedSolution.imageUrl);
            setViewMode('image');
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
            
            {/* HERO SECTION - OUTSIDE LAYOUT (Full Width) */}
            {!isCategoryView ? (
                <div className="pt-24 sm:pt-32 pb-10 bg-zinc-950 border-b border-white/5">
                     <div className="mx-auto max-w-7xl px-6 lg:px-8">
                        <div className="mx-auto max-w-4xl text-center">
                            <h2 className="text-xs font-bold uppercase tracking-widest text-yellow-500 mb-4 bg-yellow-500/10 inline-block px-3 py-1 rounded-sm border border-yellow-500/20">Distribuidor Autorizado DASWELL</h2>
                            <p className="text-4xl font-black tracking-tighter text-white sm:text-6xl uppercase mb-6">
                                Catálogo STEELPRO
                            </p>
                            <p className="text-lg leading-8 text-zinc-400 font-light max-w-2xl mx-auto">
                                Soluciones integrales en maquinaria pesada, plantas de concreto y aceros certificados. Potencia y precisión para la industria.
                            </p>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="relative h-[40vh] min-h-[300px] flex items-center border-b border-white/5">
                     <div className="absolute inset-0 z-0">
                         <img 
                            src={categoryInfo?.heroImage} 
                            alt={categoryInfo?.title}
                            className="w-full h-full object-cover"
                         />
                         <div className="absolute inset-0 bg-zinc-950/90 mix-blend-multiply"></div>
                         <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent"></div>
                     </div>
                     
                     <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8 w-full">
                         <div className="max-w-4xl">
                             <div className="inline-flex items-center gap-x-2 mb-4 border border-yellow-500/30 bg-black/50 backdrop-blur-md px-3 py-1 rounded-sm">
                                <span className="h-1.5 w-1.5 rounded-full bg-yellow-500"></span>
                                <span className="text-[10px] font-bold uppercase tracking-widest text-yellow-500">División Especializada</span>
                            </div>
                            <h1 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tighter mb-4">
                                {categoryInfo?.title}
                            </h1>
                            <p className="text-lg text-zinc-300 font-light border-l-2 border-yellow-500 pl-4 max-w-2xl">
                                {categoryInfo?.subtitle}
                            </p>
                         </div>
                     </div>
                </div>
            )}

            {/* Sub-Navigation - OUTSIDE LAYOUT (Sticky) */}
            <div className={`sticky top-20 z-30 bg-zinc-950/95 backdrop-blur-md border-b border-white/5 ${isCategoryView ? 'py-2' : 'py-3 mt-0'}`}>
                <div className="mx-auto max-w-[1920px] px-6 lg:px-8 flex items-center justify-between overflow-x-auto no-scrollbar">
                    <div className="flex flex-nowrap items-center gap-2">
                        {isCategoryView && <span className="text-zinc-600 text-[10px] font-bold uppercase mr-2 hidden sm:inline whitespace-nowrap">Filtrar por:</span>}
                        {filterCategories.map((category) => (
                            <a
                                key={category.id}
                                href={category.id === 'all' ? '#solutions' : `#solutions/${category.id}`}
                                className={`px-4 py-1.5 text-[10px] sm:text-xs font-bold uppercase tracking-wide transition-all duration-300 focus:outline-none whitespace-nowrap rounded-sm border ${
                                    activeFilter === category.id
                                    ? 'bg-yellow-500 border-yellow-500 text-black'
                                    : 'bg-zinc-900 border-white/10 text-zinc-400 hover:text-white hover:border-white/30'
                                }`}
                            >
                                {category.name}
                            </a>
                        ))}
                    </div>
                </div>
            </div>

            {/* MAIN LAYOUT IMPLEMENTATION */}
            <LayoutTresColumnas
                leftSidebar={
                    <RecommendationColumn 
                        title="Inventario Relacionado" 
                        items={leftRecommendations} 
                        onSelect={setSelectedSolution} 
                    />
                }
                rightSidebar={
                    <RecommendationColumn 
                        title="Exploración Cruzada" 
                        items={rightRecommendations} 
                        onSelect={setSelectedSolution} 
                    />
                }
            >
                {isLoading ? (
                    <div className="flex justify-center items-center h-96">
                        <div className="flex flex-col items-center gap-4">
                            <div className="w-8 h-8 border-2 border-yellow-500 border-solid border-t-transparent animate-spin rounded-full"></div>
                            <p className="text-zinc-500 text-[10px] font-bold uppercase tracking-widest">Cargando Catálogo...</p>
                        </div>
                    </div>
                ) : (
                    <div className="animate-fade-in">
                        
                        {/* Dynamic Preview for Category View */}
                        {isCategoryView && <SegmentPreview items={currentSolutions} />}

                        {/* If viewing ALL, group by category. If viewing ONE category, show just that list */}
                        {activeFilter === 'all' ? (
                            filterCategories.filter(c => c.id !== 'all').map(cat => (
                                <SolutionSection
                                    key={cat.id}
                                    id={cat.id}
                                    title={`Maquinaria: ${cat.name}`}
                                    description={categoryMetaData[cat.id as keyof typeof categoryMetaData]?.subtitle || ''}
                                    items={solutions.filter(s => s.category === cat.id)}
                                    onSelect={setSelectedSolution}
                                />
                            ))
                        ) : (
                            <SolutionSection 
                                id={activeFilter}
                                title="Equipos Disponibles" 
                                description={`Listado completo de equipos para ${categoryMetaData[activeFilter as keyof typeof categoryMetaData]?.title}`}
                                items={currentSolutions} 
                                onSelect={setSelectedSolution}
                                showDivider={false}
                            />
                        )}
                    </div>
                )}
            </LayoutTresColumnas>

            {/* Contact Section - OUTSIDE LAYOUT (Footer Pre-area) */}
            <div id="contact" className="py-16 sm:py-24 px-6 lg:px-8 mt-0 bg-zinc-900 border-t border-white/5">
              <div className="mx-auto max-w-7xl rounded-sm overflow-hidden bg-zinc-950 border border-white/10 shadow-2xl">
                <div className="grid grid-cols-1 lg:grid-cols-2">
                    <div className="relative hidden lg:block">
                        <img 
                            src={isCategoryView && categoryInfo ? categoryInfo.heroImage : "https://images.unsplash.com/photo-1541625602330-2277a4c46182?q=80&w=2940&auto=format&fit=crop"} 
                            alt="Construcción" 
                            className="absolute inset-0 h-full w-full object-cover grayscale opacity-40"
                        />
                        <div className="absolute inset-0 bg-yellow-500/5 mix-blend-multiply"></div>
                        <div className="absolute inset-0 bg-gradient-to-r from-zinc-950 to-transparent"></div>
                    </div>
                    <div className="p-12 sm:p-16">
                        <h2 className="text-2xl font-black tracking-tight text-white uppercase">Solicitar Cotización</h2>
                        <p className="mt-4 text-base leading-7 text-zinc-400">
                            {isCategoryView ? `Contacte a nuestro departamento de ${categoryInfo?.title.toLowerCase()} para una propuesta formal.` : "Póngase en contacto con nuestro equipo de ingeniería para discutir las especificaciones de su proyecto."}
                        </p>
                        <ContactForm idPrefix="solutions" />
                    </div>
                </div>
              </div>
            </div>

            {/* LIGHT MODE DETAIL MODAL */}
            {selectedSolution && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-fade-in"
                    onClick={() => setSelectedSolution(null)}
                >
                    <div
                        className="relative w-full max-w-6xl bg-white rounded-sm shadow-2xl overflow-hidden max-h-[95vh] flex flex-col md:flex-row"
                        onClick={(e) => e.stopPropagation()} 
                    >
                        {/* Modal Image/3D Column */}
                        <div className="md:w-5/12 bg-zinc-100 flex flex-col relative group border-r border-zinc-200">
                            
                            {/* Toggle Switch */}
                            <div className="absolute top-4 right-4 z-20 flex bg-white rounded-sm shadow-md border border-zinc-200 p-1">
                                <button
                                    onClick={() => setViewMode('image')}
                                    className={`px-3 py-1.5 text-[10px] font-bold uppercase transition-colors ${viewMode === 'image' ? 'bg-zinc-900 text-white' : 'text-zinc-500 hover:text-zinc-900'}`}
                                >
                                    Fotos
                                </button>
                                <button
                                    onClick={() => setViewMode('3d')}
                                    className={`px-3 py-1.5 text-[10px] font-bold uppercase transition-colors flex items-center gap-1 ${viewMode === '3d' ? 'bg-yellow-500 text-black' : 'text-zinc-500 hover:text-zinc-900'}`}
                                >
                                    <CubeTransparentIcon className="h-3 w-3" />
                                    3D
                                </button>
                            </div>

                            {/* Main Content Area */}
                            <div className="relative h-64 md:h-[500px] w-full bg-zinc-50">
                                {viewMode === 'image' ? (
                                    <>
                                        <img 
                                            src={activeImage || selectedSolution.imageUrl} 
                                            alt={selectedSolution.imageAlt} 
                                            className="absolute inset-0 w-full h-full object-cover animate-fade-in"
                                        />
                                        <div className="absolute top-4 left-4 bg-yellow-500 text-black text-xs font-bold px-3 py-1 uppercase tracking-widest z-10 shadow-md">
                                            {selectedSolution.brand}
                                        </div>
                                    </>
                                ) : (
                                    <div className="w-full h-full animate-fade-in bg-zinc-200">
                                         <Product3DViewer category={selectedSolution.category === 'steel' ? 'steel' : 'construction'} className="bg-zinc-200" />
                                         <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white/80 backdrop-blur px-3 py-1 rounded-full text-[10px] text-zinc-600 pointer-events-none border border-zinc-300 shadow-sm">
                                            Interactivo 3D
                                         </div>
                                    </div>
                                )}
                            </div>
                            
                            {/* Gallery Thumbnails */}
                            {viewMode === 'image' && selectedSolution.gallery && selectedSolution.gallery.length > 0 && (
                                <div className="p-4 grid grid-cols-4 gap-2 bg-white border-t border-zinc-200">
                                    {selectedSolution.gallery.map((imgUrl, index) => (
                                        <button
                                            key={index}
                                            onClick={() => setActiveImage(imgUrl)}
                                            className={`relative aspect-square overflow-hidden border-2 transition-all ${activeImage === imgUrl ? 'border-yellow-500 opacity-100' : 'border-transparent opacity-60 hover:opacity-100'}`}
                                        >
                                            <img 
                                                src={imgUrl} 
                                                alt="" 
                                                className="w-full h-full object-cover" 
                                            />
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Content Column */}
                        <div className="md:w-7/12 p-8 overflow-y-auto">
                            <button
                                onClick={() => setSelectedSolution(null)}
                                className="absolute top-4 right-4 p-2 text-zinc-400 hover:text-black hover:bg-zinc-100 rounded-full transition-all z-50"
                            >
                                <span className="material-symbols-outlined">close</span>
                            </button>

                            <div className="mb-6">
                                <div className="flex items-center gap-3 mb-2">
                                     <span className={`px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded-sm ${selectedSolution.status === 'disponible' ? 'bg-green-100 text-green-700' : 'bg-zinc-100 text-zinc-600'}`}>
                                        {selectedSolution.status === 'disponible' ? 'Stock Inmediato' : 'Bajo Pedido'}
                                     </span>
                                     <span className="text-[10px] text-zinc-400 uppercase font-bold tracking-widest">
                                        REF: {selectedSolution.id.toUpperCase().slice(0, 8)}
                                     </span>
                                </div>
                                <h2 className="text-3xl font-black text-zinc-900 uppercase tracking-tighter mb-2">
                                    {selectedSolution.name}
                                </h2>
                                <p className="text-zinc-500 text-lg leading-relaxed">
                                    {selectedSolution.description}
                                </p>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-8">
                                <div>
                                    <h3 className="text-xs font-bold text-zinc-900 uppercase tracking-widest mb-3 border-b border-zinc-200 pb-2">Especificaciones</h3>
                                    <ul className="space-y-2">
                                        {selectedSolution.features.map((feature, idx) => (
                                            <li key={idx} className="flex items-start text-sm text-zinc-600">
                                                <span className="material-symbols-outlined text-yellow-500 text-base mr-2 shrink-0">check_circle</span>
                                                {feature}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div className="bg-zinc-50 p-4 rounded-sm border border-zinc-100">
                                    <h3 className="text-xs font-bold text-zinc-900 uppercase tracking-widest mb-3">Documentación</h3>
                                    <div className="space-y-2">
                                        <button className="flex items-center justify-between w-full p-2 bg-white border border-zinc-200 hover:border-yellow-500 hover:text-yellow-600 transition-all text-xs font-bold text-zinc-600 uppercase">
                                            <span>Ficha Técnica PDF</span>
                                            <span className="material-symbols-outlined">download</span>
                                        </button>
                                        <button className="flex items-center justify-between w-full p-2 bg-white border border-zinc-200 hover:border-yellow-500 hover:text-yellow-600 transition-all text-xs font-bold text-zinc-600 uppercase">
                                            <span>Certificado ISO</span>
                                            <span className="material-symbols-outlined">verified</span>
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-zinc-100">
                                <a 
                                    href="#contact" 
                                    onClick={() => setSelectedSolution(null)}
                                    className="flex-1 bg-yellow-500 text-black py-4 font-black uppercase tracking-widest text-center hover:bg-yellow-400 shadow-lg shadow-yellow-500/20 transition-all flex items-center justify-center gap-2"
                                >
                                    <span className="material-symbols-outlined">request_quote</span>
                                    Solicitar Cotización
                                </a>
                                <button className="px-6 py-4 border border-zinc-200 text-zinc-600 font-bold uppercase hover:bg-zinc-50 transition-all">
                                    <span className="material-symbols-outlined">share</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SolutionsPage;