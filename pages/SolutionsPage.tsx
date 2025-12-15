import React, { useState, useMemo, useEffect } from 'react';
import { solutions, Solution, categoryMetaData } from '../data/solutions';
import { CheckIcon, XIcon, AnalysisIcon, CubeTransparentIcon, ShareIcon } from '../components/Icons';
import ContactForm from '../components/ContactForm';
import Product3DViewer from '../components/Product3DViewer';

// --- UTILS ---
const shuffleArray = (array: Solution[]) => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
};

// --- COMPONENTS ---

const RecommendationCard: React.FC<{ solution: Solution; onSelect: (s: Solution) => void }> = ({ solution, onSelect }) => (
    <div 
        onClick={() => onSelect(solution)}
        className="group relative bg-zinc-900 border border-white/5 rounded-sm overflow-hidden hover:border-yellow-500/50 transition-all cursor-pointer flex flex-row xl:flex-col gap-3 p-3 xl:p-0"
    >
        <div className="relative w-24 h-24 xl:w-full xl:h-32 shrink-0 overflow-hidden bg-black">
             <img 
                src={solution.imageUrl} 
                alt={solution.name} 
                className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500"
            />
            <div className="absolute top-0 left-0 bg-yellow-500 text-black text-[8px] font-bold px-1.5 py-0.5 uppercase tracking-widest">
                {solution.categoryLabel || solution.category}
            </div>
        </div>
        <div className="flex flex-col justify-center xl:p-3 xl:pt-0">
            <h5 className="text-xs font-bold text-white uppercase leading-tight group-hover:text-yellow-500 transition-colors line-clamp-2">
                {solution.name}
            </h5>
            <p className="text-[10px] text-zinc-500 mt-1 line-clamp-2 hidden xl:block">
                {solution.shortDescription}
            </p>
            <button className="mt-2 text-[9px] font-bold uppercase text-yellow-500 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity -translate-x-2 group-hover:translate-x-0">
                Ver Ficha <span className="material-symbols-outlined text-[10px]">arrow_forward</span>
            </button>
        </div>
    </div>
);

const RecommendationColumn: React.FC<{ title: string; items: Solution[]; onSelect: (s: Solution) => void }> = ({ title, items, onSelect }) => {
    if (items.length === 0) return null;
    return (
        <div className="flex flex-col gap-4 animate-fade-in">
             <div className="flex items-center gap-2 mb-2 border-b border-white/10 pb-2">
                <span className="w-1.5 h-1.5 bg-yellow-500 rounded-full animate-pulse"></span>
                <h4 className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">{title}</h4>
             </div>
             <div className="flex flex-col gap-3">
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

const SolutionSection: React.FC<SectionProps> = ({ title, description, items, onSelect, id, showDivider = true }) => {
    if (items.length === 0) return null;

    return (
        <div id={id} className={`py-8 ${showDivider ? 'border-b border-white/5' : ''} last:border-0`}>
            <div className="mb-6">
                <h3 className="text-xl font-black text-white uppercase tracking-tighter border-l-4 border-yellow-500 pl-4">
                    {title}
                </h3>
                <p className="mt-1 text-sm text-zinc-400 pl-5">{description}</p>
            </div>
            
            {/* Grid Layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
                {items.map((solution) => (
                    <div 
                        key={solution.id} 
                        className="group relative bg-zinc-900 border border-white/5 overflow-hidden rounded-sm hover:border-yellow-500/50 transition-all duration-300 flex flex-col cursor-pointer h-full"
                        onClick={() => onSelect(solution)}
                    >
                        {/* Image Container */}
                        <div className="relative h-40 overflow-hidden bg-black">
                            <img 
                                src={solution.imageUrl} 
                                alt={solution.imageAlt} 
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0 opacity-80 group-hover:opacity-100"
                            />
                            <div className="absolute top-0 left-0 bg-yellow-500 text-black text-[10px] font-bold px-2 py-1 uppercase tracking-widest">
                                {solution.brand}
                            </div>
                            {/* Status Badge */}
                            <div className={`absolute top-0 right-0 px-2 py-1 text-[9px] font-bold uppercase tracking-widest ${
                                solution.status === 'disponible' ? 'bg-green-500 text-black' : 'bg-zinc-700 text-white'
                            }`}>
                                {solution.status === 'disponible' ? 'En Stock' : 'Bajo Pedido'}
                            </div>
                        </div>

                        {/* Content Container */}
                        <div className="p-4 flex flex-col flex-grow">
                            <h4 className="text-sm font-bold text-white uppercase leading-tight mb-2 group-hover:text-yellow-500 transition-colors">
                                {solution.name}
                            </h4>
                            <p className="text-xs text-zinc-400 line-clamp-2 mb-3 flex-grow">
                                {solution.shortDescription}
                            </p>
                            
                            <div className="space-y-1 mb-3 border-t border-white/5 pt-2">
                                {solution.features.slice(0, 2).map((feature, i) => (
                                    <div key={i} className="flex items-center text-[9px] text-zinc-500">
                                        <span className="w-1 h-1 bg-yellow-500 rounded-full mr-2 flex-shrink-0"></span>
                                        <span className="truncate">{feature}</span>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-auto">
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        onSelect(solution);
                                    }}
                                    className="w-full py-2 bg-white/5 hover:bg-yellow-500 hover:text-black border border-white/10 text-[10px] font-bold uppercase text-white tracking-widest transition-colors"
                                >
                                    Ver Detalle
                                </button>
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
    // Get 3 random images from the items
    const previewImages = useMemo(() => {
        if (items.length < 3) return items.slice(0, 3);
        return [...items].sort(() => 0.5 - Math.random()).slice(0, 3);
    }, [items]);

    if (items.length === 0) return null;

    return (
        <div className="grid grid-cols-3 gap-1 h-32 md:h-48 mb-8 opacity-60 hover:opacity-100 transition-opacity duration-500">
            {previewImages.map((item, idx) => (
                <div key={idx} className="relative overflow-hidden group bg-black">
                    <img 
                        src={item.imageUrl} 
                        alt="Preview" 
                        className="w-full h-full object-cover grayscale transition-transform duration-1000 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors"></div>
                </div>
            ))}
        </div>
    );
};

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
    const [showCopyFeedback, setShowCopyFeedback] = useState(false);

    // Filter solutions dynamically (Main Content)
    const currentSolutions = useMemo(() => {
        if (activeFilter === 'all') return solutions;
        return solutions.filter(s => s.category === activeFilter);
    }, [activeFilter]);

    // INTELLIGENT RECOMMENDATION ENGINE
    const { leftRecommendations, rightRecommendations } = useMemo(() => {
        // 1. Exclude items currently visible in the main view (Rule: No duplicates)
        const visibleIds = new Set(currentSolutions.map(s => s.id));
        const availableForRecs = solutions.filter(s => !visibleIds.has(s.id));

        // 2. Prioritize items. Random shuffle for "discovery" feel + category variety
        const shuffled = shuffleArray(availableForRecs);

        // 3. Split into Left and Right columns (approx 3-4 items each)
        const left = shuffled.slice(0, 4);
        const right = shuffled.slice(4, 8);

        return { leftRecommendations: left, rightRecommendations: right };
    }, [currentSolutions]);

    // RELATED PRODUCTS FOR MODAL
    const relatedProducts = useMemo(() => {
        if (!selectedSolution) return [];
        // Show items from same category first, then others
        return solutions
            .filter(s => s.id !== selectedSolution.id && s.category === selectedSolution.category)
            .slice(0, 3); // Top 3 related
    }, [selectedSolution]);


    useEffect(() => {
        if (selectedSolution) {
            document.body.style.overflow = 'hidden';
            setActiveImage(selectedSolution.imageUrl);
            setViewMode('image');
            setShowCopyFeedback(false);
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

    const handleShare = async () => {
        if (!selectedSolution) return;
        const shareData = {
            title: `STEELPRO - ${selectedSolution.name}`,
            text: selectedSolution.description,
            url: window.location.href 
        };
        if (navigator.share) {
            try { await navigator.share(shareData); } catch (err) { console.error('Error sharing', err); }
        } else {
            try {
                await navigator.clipboard.writeText(window.location.href);
                setShowCopyFeedback(true);
                setTimeout(() => setShowCopyFeedback(false), 2000);
            } catch (err) { console.error('Error copying', err); }
        }
    };

    return (
        <div className="pt-0 animate-fade-in bg-zinc-950 min-h-screen">
            
            {/* HERO SECTION */}
            {!isCategoryView ? (
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

            {/* Sub-Navigation */}
            <div className={`sticky top-20 z-30 bg-zinc-950/90 backdrop-blur-sm border-b border-white/5 ${isCategoryView ? 'py-2' : 'py-4 mt-8'}`}>
                <div className="mx-auto max-w-7xl px-6 lg:px-8 flex items-center justify-between overflow-x-auto no-scrollbar">
                    <div className="flex flex-nowrap items-center gap-2">
                        {isCategoryView && <span className="text-zinc-500 text-sm font-bold uppercase mr-2 hidden sm:inline whitespace-nowrap">Departamentos:</span>}
                        {filterCategories.map((category) => (
                            <a
                                key={category.id}
                                href={category.id === 'all' ? '#solutions' : `#solutions/${category.id}`}
                                className={`px-4 py-2 text-xs sm:text-sm font-bold uppercase tracking-wide transition-all duration-300 focus:outline-none whitespace-nowrap ${
                                    activeFilter === category.id
                                    ? 'bg-yellow-500 text-black skew-x-[-10deg]'
                                    : 'text-zinc-400 hover:text-white hover:bg-white/5'
                                }`}
                            >
                                <span className={activeFilter === category.id ? 'skew-x-[10deg] block' : ''}>{category.name}</span>
                            </a>
                        ))}
                    </div>
                </div>
            </div>

            {/* MAIN CONTENT AREA - 3 COLUMN LAYOUT */}
            <div className="mx-auto max-w-[1600px] px-4 lg:px-8 min-h-[500px] py-12">
                <div className="flex flex-col xl:flex-row gap-8 relative items-start">
                    
                    {/* LEFT COLUMN: Recommendations */}
                    <aside className="hidden xl:flex flex-col w-64 shrink-0 sticky top-40 h-fit max-h-[80vh] overflow-y-auto no-scrollbar pb-10">
                        <RecommendationColumn 
                            title="Sugerencias" 
                            items={leftRecommendations} 
                            onSelect={setSelectedSolution} 
                        />
                    </aside>

                    {/* CENTER COLUMN: Main Content */}
                    <main className="flex-1 w-full min-w-0">
                        {isLoading ? (
                            <div className="flex justify-center items-center h-64">
                                <div className="w-12 h-12 border-4 border-yellow-500 border-solid border-t-transparent animate-spin" role="status">
                                    <span className="sr-only">Cargando...</span>
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
                    </main>

                    {/* RIGHT COLUMN: Recommendations */}
                    <aside className="hidden xl:flex flex-col w-64 shrink-0 sticky top-40 h-fit max-h-[80vh] overflow-y-auto no-scrollbar pb-10">
                        <RecommendationColumn 
                            title="Tendencias" 
                            items={rightRecommendations} 
                            onSelect={setSelectedSolution} 
                        />
                    </aside>

                </div>
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
                                         <Product3DViewer category={selectedSolution.category} className="bg-zinc-200" />
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
                                            <img src={imgUrl} alt={`Vista ${index + 1}`} className="w-full h-full object-cover" />
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Modal Content - LIGHT THEME */}
                        <div className="md:w-7/12 p-8 md:p-12 flex flex-col overflow-y-auto bg-white text-zinc-900 scroll-smooth">
                            <div className="flex items-start justify-between gap-x-4 mb-2">
                                <div className="inline-flex items-center gap-2 mb-2">
                                    <span className={`h-2 w-2 rounded-full ${selectedSolution.status === 'disponible' ? 'bg-green-500' : 'bg-yellow-500'} animate-pulse`}></span>
                                    <span className="text-xs font-bold uppercase tracking-widest text-zinc-500">
                                        {selectedSolution.categoryLabel || selectedSolution.category}
                                    </span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <button onClick={handleShare} className="p-1 text-zinc-400 hover:text-zinc-900 transition-colors relative" title="Compartir">
                                        <ShareIcon className="h-5 w-5" />
                                        {showCopyFeedback && (
                                             <span className="absolute top-full right-0 mt-1 text-[9px] bg-black text-white px-1 rounded font-bold">Copiado</span>
                                        )}
                                    </button>
                                    <button onClick={() => setSelectedSolution(null)} className="p-1 text-zinc-400 hover:text-red-500 transition-colors">
                                        <XIcon className="h-6 w-6" />
                                    </button>
                                </div>
                            </div>

                            <h3 className="text-3xl md:text-4xl font-black tracking-tight text-zinc-900 uppercase leading-none mb-6">
                                {selectedSolution.name}
                            </h3>

                            <p className="text-lg text-zinc-600 mb-8 font-normal leading-relaxed border-l-4 border-yellow-500 pl-4 bg-yellow-50 p-4 rounded-r-sm">
                                {selectedSolution.description}
                            </p>
                            
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-8">
                                <div className="bg-zinc-50 p-6 rounded-sm border border-zinc-200">
                                    <h4 className="text-xs font-bold text-zinc-900 uppercase tracking-widest mb-4 flex items-center border-b border-zinc-200 pb-2">
                                        <AnalysisIcon className="h-4 w-4 mr-2 text-yellow-500" />
                                        Ficha Técnica
                                    </h4>
                                    <ul className="space-y-3">
                                        {selectedSolution.features.map((feature) => (
                                            <li key={feature} className="flex items-start text-sm text-zinc-700">
                                                <CheckIcon className="h-5 w-5 text-green-600 mr-3 flex-shrink-0" />
                                                {feature}
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <div className="bg-zinc-50 p-6 rounded-sm border border-zinc-200 flex flex-col justify-between">
                                    <div>
                                        <h4 className="text-xs font-bold text-zinc-900 uppercase tracking-widest mb-4 border-b border-zinc-200 pb-2">
                                            Documentación
                                        </h4>
                                        <p className="text-xs text-zinc-500 mb-4">
                                            Descargue las especificaciones completas, curvas de rendimiento y planos dimensionales.
                                        </p>
                                    </div>
                                    
                                    {selectedSolution.pdfUrl ? (
                                        <a 
                                            href={selectedSolution.pdfUrl}
                                            className="flex items-center justify-center gap-2 w-full py-3 border-2 border-zinc-900 text-zinc-900 font-bold uppercase text-xs hover:bg-zinc-900 hover:text-white transition-all"
                                        >
                                            <span className="material-symbols-outlined text-lg">picture_as_pdf</span>
                                            Descargar PDF Técnico
                                        </a>
                                    ) : (
                                        <div className="w-full py-3 bg-zinc-200 text-zinc-400 font-bold uppercase text-xs text-center cursor-not-allowed flex items-center justify-center gap-2">
                                            <span className="material-symbols-outlined text-lg">pending</span>
                                            PDF en Preparación
                                        </div>
                                    )}
                                </div>
                            </div>
                            
                            {/* RELATED PRODUCTS SECTION (Intelligent Recommendation for Product Page) */}
                            {relatedProducts.length > 0 && (
                                <div className="mb-8 border-t border-zinc-200 pt-8">
                                    <h4 className="text-sm font-bold text-zinc-900 uppercase tracking-widest mb-4 flex items-center gap-2">
                                        <span className="material-symbols-outlined text-yellow-500">recommend</span>
                                        Productos Relacionados
                                    </h4>
                                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                        {relatedProducts.map(rel => (
                                            <div 
                                                key={rel.id} 
                                                onClick={() => setSelectedSolution(rel)}
                                                className="group cursor-pointer border border-zinc-200 hover:border-yellow-500 transition-colors rounded-sm overflow-hidden"
                                            >
                                                <div className="h-24 bg-zinc-100 overflow-hidden relative">
                                                    <img src={rel.imageUrl} alt={rel.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                                </div>
                                                <div className="p-3">
                                                    <h5 className="text-xs font-bold text-zinc-900 uppercase truncate mb-1">{rel.name}</h5>
                                                    <p className="text-[9px] text-zinc-500 uppercase tracking-wider">{rel.categoryLabel}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            <div className="mt-auto flex flex-col sm:flex-row justify-end gap-4 border-t border-zinc-200 pt-6">
                                <button
                                    onClick={() => setSelectedSolution(null)}
                                    className="px-6 py-3 text-xs font-bold uppercase text-zinc-500 hover:text-zinc-900 transition-colors"
                                >
                                    Cerrar Ventana
                                </button>
                                <a
                                    href="#contact"
                                    onClick={() => setSelectedSolution(null)}
                                    className="px-8 py-3 bg-yellow-500 hover:bg-yellow-400 text-xs font-bold uppercase text-black tracking-wide transition-colors shadow-lg shadow-yellow-500/30 text-center"
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