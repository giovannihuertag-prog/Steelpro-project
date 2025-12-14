import React, { useState, useEffect } from 'react';
import { CalculatorIcon, ShieldCheckIcon, CubeTransparentIcon, ChartBarIcon } from '../components/Icons';
import { useLanguage } from '../context/LanguageContext';

// --- DATA CONSTANTS ---

const DENSITIES_METRIC: Record<string, number> = {
    acero: 7850, // kg/m3
    acero4140: 7850, // kg/m3
    cobre: 8960,
    bronce: 8700,
    laton: 8500
};

// lbs/ft3 approx
const DENSITIES_IMPERIAL: Record<string, number> = {
    acero: 490, 
    acero4140: 490,
    cobre: 559,
    bronce: 543,
    laton: 530
};

// --- TYPES ---

interface UserData {
    name: string;
    email: string;
    company: string;
    location: string;
    usage: string;
}

interface Dimensions {
    dim1: number; // OD, Side, Thickness
    dim2: number; // ID, Width
    length: number; // Length
}

interface HistoryItem {
    id: number;
    material: string;
    weight: number;
    unit: string;
    date: string;
}

type System = 'metric' | 'imperial';

// --- COMPONENT ---

const CalculatorPage: React.FC = () => {
    const [step, setStep] = useState<1 | 2 | 3>(1);
    const [system, setSystem] = useState<System>('metric');
    const { t, language } = useLanguage();
    
    // Step 1 Data
    const [userData, setUserData] = useState<UserData>({ name: '', email: '', company: '', location: '', usage: '' });
    const [userErrors, setUserErrors] = useState<Partial<UserData>>({});

    // Step 2 Data
    const [material, setMaterial] = useState<string>('');
    const [shape, setShape] = useState<string>('');
    const [dimensions, setDimensions] = useState<Dimensions>({ dim1: 0, dim2: 0, length: 0 });
    const [formError, setFormError] = useState<string>('');
    
    // History Data
    const [history, setHistory] = useState<HistoryItem[]>([]);
    
    // Result
    const [result, setResult] = useState<{ volume: number, weight: number, unitW: string, unitV: string } | null>(null);

    // Derived Constants based on Language
    const MATERIAL_OPTIONS = [
        { id: 'acero', name: language === 'es' ? 'Acero A36/1045' : 'Steel A36/1045', class: 'bg-zinc-800' },
        { id: 'acero4140', name: language === 'es' ? 'Acero 4140' : 'Steel 4140', class: 'bg-slate-800' },
        { id: 'cobre', name: language === 'es' ? 'Cobre' : 'Copper', class: 'bg-orange-900/40' },
        { id: 'bronce', name: language === 'es' ? 'Bronce' : 'Bronze', class: 'bg-yellow-900/40' },
        { id: 'laton', name: language === 'es' ? 'Latón' : 'Brass', class: 'bg-yellow-500/20' }
    ];

    const SHAPE_OPTIONS = [
        { id: 'solid_round', name: language === 'es' ? 'Sólido Redondo' : 'Solid Round', icon: 'radio_button_checked' },
        { id: 'solid_square', name: language === 'es' ? 'Sólido Cuadrado' : 'Solid Square', icon: 'check_box_outline_blank' },
        { id: 'hollow', name: language === 'es' ? 'Hueco / Tubo' : 'Hollow / Tube', icon: 'donut_large' },
        { id: 'plate', name: language === 'es' ? 'Placa de Acero / Lámina' : 'Steel Plate / Sheet', icon: 'rectangle' }
    ];

    useEffect(() => {
        window.scrollTo(0, 0);
        // Load history
        const savedHistory = localStorage.getItem('steelpro_history');
        if (savedHistory) {
            try {
                setHistory(JSON.parse(savedHistory));
            } catch (error) {
                console.error('Failed to parse history', error);
            }
        }
    }, []);

    // --- LOGIC ---

    const handleShapeSelect = (newShape: string) => {
        setShape(newShape);
        setFormError('');
        // Reset dimensions to avoid confusion (e.g. diameter becoming thickness)
        setDimensions({ dim1: 0, dim2: 0, length: 0 });
        setResult(null);
    };

    const validateStep1 = () => {
        const errors: Partial<UserData> = {};
        if (!userData.name.trim()) errors.name = "Requerido / Required";
        if (!userData.email.trim() || !/^\S+@\S+\.\S+$/.test(userData.email)) errors.email = "Email corporativo válido requerido / Valid corporate email required";
        if (!userData.company.trim()) errors.company = "Requerido / Required";
        if (!userData.location.trim()) errors.location = "Requerido / Required";
        if (!userData.usage.trim()) errors.usage = "Requerido / Required";

        setUserErrors(errors);
        if (Object.keys(errors).length === 0) {
            setStep(2);
        }
    };

    const handleCalculate = () => {
        setFormError('');

        // 1. Validate Material (Explicit Validation)
        if (!material) {
            setFormError(language === 'es' ? '⚠️ Seleccione un material para continuar.' : '⚠️ Select a material to continue.');
            return;
        }

        // 2. Validate Shape
        if (!shape) {
            setFormError(language === 'es' ? '⚠️ Seleccione una geometría.' : '⚠️ Select a shape.');
            return;
        }
        
        // 3. Validate Dimensions
        let isValidDims = true;
        
        // Specific checks
        if (shape === 'hollow') {
            // ID must be > 0 and < OD
            if (dimensions.dim2 >= dimensions.dim1) {
                setFormError(language === 'es' ? '⚠️ Error de Geometría: El diámetro interior (ID) debe ser menor al exterior (OD).' : '⚠️ Geometry Error: Inner diameter (ID) must be less than outer diameter (OD).');
                return;
            }
            if (!dimensions.dim2 || dimensions.dim2 <= 0) isValidDims = false;
        } else {
            // For other shapes, ensure main dimensions are positive
             if (!dimensions.dim1 || dimensions.dim1 <= 0) isValidDims = false;
        }

        if (shape === 'plate') {
            // Width must be > 0
            if (!dimensions.dim2 || dimensions.dim2 <= 0) isValidDims = false;
        }

        if (!dimensions.length || dimensions.length <= 0) isValidDims = false;

        if (!isValidDims) {
            setFormError(language === 'es' ? '⚠️ Verifique las dimensiones (valores positivos requeridos).' : '⚠️ Check dimensions (positive values required).');
            return;
        }

        // Calculation Logic
        let vol = 0;
        let weight = 0;

        if (system === 'metric') {
             // Métrico: Entradas en mm -> convertir a metros. Largo en mm -> metros.
             // Densidad en kg/m3
             const d1 = dimensions.dim1 / 1000;
             const d2 = dimensions.dim2 / 1000;
             const L = dimensions.length / 1000; 
             const density = DENSITIES_METRIC[material];

             switch (shape) {
                case 'solid_round': vol = Math.PI * Math.pow(d1 / 2, 2) * L; break;
                case 'solid_square': vol = d1 * d1 * L; break;
                case 'hollow': vol = Math.PI * (Math.pow(d1 / 2, 2) - Math.pow(d2 / 2, 2)) * L; break;
                case 'plate': vol = d1 * d2 * L; break; // thickness * width * length
             }
             weight = vol * density;
             setResult({ volume: vol, weight, unitW: 'kg', unitV: 'm³' });

        } else {
            // Imperial
            // Entradas de sección (diámetro, ancho, espesor) en Pulgadas (in) -> convertir a Pies (ft)
            // Entrada de Largo en Pies (ft) -> se mantiene en Pies
            // Densidad en lbs/ft3
            
            const d1_ft = dimensions.dim1 / 12; // in -> ft
            const d2_ft = dimensions.dim2 / 12; // in -> ft
            const L_ft = dimensions.length;     // ft -> ft
            
            switch (shape) {
                case 'solid_round': vol = Math.PI * Math.pow(d1_ft / 2, 2) * L_ft; break;
                case 'solid_square': vol = d1_ft * d1_ft * L_ft; break;
                case 'hollow': vol = Math.PI * (Math.pow(d1_ft / 2, 2) - Math.pow(d2_ft / 2, 2)) * L_ft; break;
                case 'plate': vol = d1_ft * d2_ft * L_ft; break; // thickness(ft) * width(ft) * length(ft)
            }
            
            const density = DENSITIES_IMPERIAL[material];
            weight = vol * density;
            setResult({ volume: vol, weight, unitW: 'lbs', unitV: 'ft³' });
        }
        
        // Save History
        const newItem: HistoryItem = {
            id: Date.now(),
            material: MATERIAL_OPTIONS.find(m => m.id === material)?.name || material,
            weight: weight,
            unit: system === 'metric' ? 'kg' : 'lbs',
            date: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        
        // Keep last 7 calculations
        const updatedHistory = [...history, newItem].slice(-7);
        setHistory(updatedHistory);
        localStorage.setItem('steelpro_history', JSON.stringify(updatedHistory));

        setStep(3);
    };

    const resetCalculator = () => {
        setResult(null);
        setStep(2); // Keep user data, go back to config
    };
    
    const clearHistory = () => {
        setHistory([]);
        localStorage.removeItem('steelpro_history');
    };

    // --- RENDER HELPERS ---

    const renderDimensionInputs = () => {
        if (!shape) return null;

        const isImperial = system === 'imperial';
        const unitSection = isImperial ? 'pulg (in)' : 'mm';
        const unitLength = isImperial ? 'pies (ft)' : 'mm'; 

        const inputClass = "w-full bg-black border border-white/10 p-2 text-white focus:border-yellow-500 outline-none transition-colors";
        const labelClass = "block text-xs uppercase text-zinc-500 mb-2 font-bold";

        return (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 animate-fade-in mt-8 p-6 bg-zinc-900 border border-white/5 rounded-sm">
                {shape === 'solid_round' && (
                    <>
                        <div>
                            <label className={labelClass}>{t('calc.diameter')} <span className="text-zinc-600 font-normal">({unitSection})</span></label>
                            <input type="number" className={inputClass} 
                                value={dimensions.dim1 || ''} onChange={e => {setDimensions({...dimensions, dim1: parseFloat(e.target.value)}); setFormError('');}} />
                        </div>
                        <div className="sm:col-span-2">
                            <label className={labelClass}>{t('calc.length')} <span className="text-zinc-600 font-normal">({unitLength})</span></label>
                            <input type="number" className={inputClass} 
                                value={dimensions.length || ''} onChange={e => {setDimensions({...dimensions, length: parseFloat(e.target.value)}); setFormError('');}} />
                        </div>
                    </>
                )}
                {shape === 'solid_square' && (
                    <>
                        <div>
                            <label className={labelClass}>{t('calc.side')} <span className="text-zinc-600 font-normal">({unitSection})</span></label>
                            <input type="number" className={inputClass} 
                                value={dimensions.dim1 || ''} onChange={e => {setDimensions({...dimensions, dim1: parseFloat(e.target.value)}); setFormError('');}} />
                        </div>
                        <div className="sm:col-span-2">
                            <label className={labelClass}>{t('calc.length')} <span className="text-zinc-600 font-normal">({unitLength})</span></label>
                            <input type="number" className={inputClass} 
                                value={dimensions.length || ''} onChange={e => {setDimensions({...dimensions, length: parseFloat(e.target.value)}); setFormError('');}} />
                        </div>
                    </>
                )}
                {shape === 'hollow' && (
                    <>
                        <div>
                            <label className={labelClass}>
                                {t('calc.outer_diam')} <span className="text-yellow-500 font-black">OD</span> <span className="text-zinc-600 font-normal">({unitSection})</span>
                            </label>
                            <input type="number" className={inputClass} placeholder="0.00"
                                value={dimensions.dim1 || ''} onChange={e => {setDimensions({...dimensions, dim1: parseFloat(e.target.value)}); setFormError('');}} />
                        </div>
                        <div>
                            <label className={labelClass}>
                                {t('calc.inner_diam')} <span className="text-yellow-500 font-black">ID</span> <span className="text-zinc-600 font-normal">({unitSection})</span>
                            </label>
                            <div className="relative">
                                <input type="number" placeholder="0.00"
                                    className={`w-full bg-black border p-2 text-white outline-none transition-colors ${
                                        dimensions.dim1 > 0 && dimensions.dim2 >= dimensions.dim1 
                                        ? 'border-red-500 focus:border-red-500 text-red-100' 
                                        : 'border-white/10 focus:border-yellow-500'
                                    }`}
                                    value={dimensions.dim2 || ''} 
                                    onChange={e => {setDimensions({...dimensions, dim2: parseFloat(e.target.value)}); setFormError('');}} />
                                
                                {dimensions.dim1 > 0 && dimensions.dim2 >= dimensions.dim1 && (
                                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                                        <span className="text-red-500 font-bold">!</span>
                                    </div>
                                )}
                            </div>
                            {dimensions.dim1 > 0 && dimensions.dim2 >= dimensions.dim1 && (
                                <p className="text-red-500 text-[10px] mt-1 font-medium animate-pulse">
                                    {language === 'es' ? 'ID debe ser menor que OD' : 'ID must be less than OD'}
                                </p>
                            )}
                        </div>
                        <div>
                            <label className={labelClass}>{t('calc.length')} <span className="text-zinc-600 font-normal">({unitLength})</span></label>
                            <input type="number" className={inputClass} placeholder="0.00"
                                value={dimensions.length || ''} onChange={e => {setDimensions({...dimensions, length: parseFloat(e.target.value)}); setFormError('');}} />
                        </div>
                    </>
                )}
                {shape === 'plate' && (
                    <>
                         <div>
                            <label className={labelClass}>{t('calc.thickness')} <span className="text-zinc-600 font-normal">({unitSection})</span></label>
                            <input type="number" className={inputClass} 
                                value={dimensions.dim1 || ''} onChange={e => {setDimensions({...dimensions, dim1: parseFloat(e.target.value)}); setFormError('');}} />
                        </div>
                        <div>
                            <label className={labelClass}>{t('calc.width')} <span className="text-zinc-600 font-normal">({unitSection})</span></label>
                            <input type="number" className={inputClass} 
                                value={dimensions.dim2 || ''} onChange={e => {setDimensions({...dimensions, dim2: parseFloat(e.target.value)}); setFormError('');}} />
                        </div>
                        <div>
                            <label className={labelClass}>{t('calc.length')} <span className="text-zinc-600 font-normal">({unitLength})</span></label>
                            <input type="number" className={inputClass} 
                                value={dimensions.length || ''} onChange={e => {setDimensions({...dimensions, length: parseFloat(e.target.value)}); setFormError('');}} />
                        </div>
                    </>
                )}
            </div>
        );
    };

    const renderHistoryChart = () => {
        if (history.length === 0) return (
            <div className="mt-12 bg-zinc-900 border border-white/5 p-6 rounded-sm animate-fade-in text-center">
                 <h4 className="text-sm font-bold text-white uppercase flex items-center justify-center gap-2 mb-2">
                    <ChartBarIcon className="h-5 w-5 text-zinc-500" />
                    {language === 'es' ? 'Historial de Cálculo' : 'Calculation History'}
                </h4>
                <p className="text-xs text-zinc-500">{language === 'es' ? 'Realice un cálculo para ver estadísticas.' : 'Perform a calculation to see statistics.'}</p>
            </div>
        );
        
        const maxVal = Math.max(...history.map(h => h.weight));
        // Default to 10 if 0 to avoid division by zero
        const safeMax = maxVal > 0 ? maxVal : 10;
        
        return (
            <div className="mt-12 bg-zinc-900 border border-white/5 p-6 rounded-sm animate-fade-in">
                <div className="flex justify-between items-center mb-6">
                     <h4 className="text-sm font-bold text-white uppercase flex items-center gap-2">
                        <ChartBarIcon className="h-5 w-5 text-yellow-500" />
                        {language === 'es' ? 'Tendencia de Peso' : 'Weight Trend'}
                    </h4>
                    <button 
                        onClick={clearHistory}
                        className="text-[10px] text-zinc-500 hover:text-red-500 uppercase font-bold transition-colors"
                    >
                        {language === 'es' ? 'Borrar Historial' : 'Clear History'}
                    </button>
                </div>
               
                <div className="relative h-48 mt-4 pl-8 border-l border-white/10 border-b border-white/10">
                    {/* Y-Axis Labels */}
                    <div className="absolute left-0 top-0 -translate-x-full pr-2 h-full flex flex-col justify-between text-[9px] text-zinc-500 font-mono py-1">
                        <span>{safeMax.toFixed(0)}</span>
                        <span>{(safeMax / 2).toFixed(0)}</span>
                        <span>0</span>
                    </div>

                    {/* Grid Lines */}
                    <div className="absolute inset-0 flex flex-col justify-between pointer-events-none">
                        <div className="border-t border-dashed border-white/5 w-full h-0"></div>
                        <div className="border-t border-dashed border-white/5 w-full h-0"></div>
                        <div className="border-t border-dashed border-white/5 w-full h-0"></div>
                    </div>

                    {/* Bars Container */}
                    <div className="absolute inset-0 flex items-end justify-around gap-2 px-2 pb-0">
                         {history.map((item, index) => {
                            const isLast = index === history.length - 1;
                            const heightPct = Math.min((item.weight / safeMax) * 100, 100);
                            
                            return (
                                <div key={item.id} className="w-full flex flex-col items-center gap-2 group relative h-full justify-end">
                                    {/* Bar */}
                                    <div 
                                        style={{ height: `${heightPct}%` }} 
                                        className={`w-full max-w-[30px] sm:max-w-[40px] rounded-t-sm transition-all duration-700 relative group-hover:opacity-80 ${
                                            isLast 
                                            ? 'bg-yellow-500' 
                                            : 'bg-zinc-700 hover:bg-zinc-600'
                                        }`}
                                    >
                                        {/* Tooltip */}
                                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity bg-black border border-white/10 px-2 py-1 rounded text-[10px] whitespace-nowrap z-20 pointer-events-none shadow-xl">
                                            <span className="text-yellow-500 font-bold block">{item.weight.toFixed(2)} {item.unit}</span>
                                            <span className="text-zinc-400 text-[9px] block">{item.material}</span>
                                        </div>
                                    </div>
                                    
                                    {/* Date Label */}
                                    <div className="text-[9px] text-zinc-500 w-full text-center truncate px-1">
                                        {item.date}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="bg-zinc-950 min-h-screen pt-24 pb-24 animate-fade-in font-sans">
            <div className="mx-auto max-w-4xl px-6 lg:px-8">
                
                {/* HEADER */}
                <div className="mb-12 text-center">
                     <div className="inline-flex items-center gap-x-2 mb-6 border border-yellow-500/30 bg-yellow-500/10 px-4 py-1.5 rounded-full">
                        <CalculatorIcon className="h-4 w-4 text-yellow-500" />
                        <span className="text-xs font-bold uppercase tracking-widest text-yellow-500">SteelPro Tools</span>
                    </div>
                    <h1 className="text-3xl sm:text-5xl font-black text-white uppercase tracking-tighter mb-4">
                        {t('calc.title')}
                    </h1>
                    <p className="text-zinc-400 max-w-2xl mx-auto">
                        {t('calc.subtitle')}
                    </p>
                </div>

                {/* PROGRESS BAR */}
                <div className="flex justify-between items-center mb-12 max-w-lg mx-auto relative">
                    <div className="absolute top-1/2 left-0 w-full h-0.5 bg-zinc-800 -z-10"></div>
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm border-2 ${step >= 1 ? 'bg-yellow-500 border-yellow-500 text-black' : 'bg-zinc-900 border-zinc-700 text-zinc-500'}`}>1</div>
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm border-2 ${step >= 2 ? 'bg-yellow-500 border-yellow-500 text-black' : 'bg-zinc-900 border-zinc-700 text-zinc-500'}`}>2</div>
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm border-2 ${step >= 3 ? 'bg-yellow-500 border-yellow-500 text-black' : 'bg-zinc-900 border-zinc-700 text-zinc-500'}`}>3</div>
                </div>

                {/* STEP 1: DATA COLLECTION */}
                {step === 1 && (
                    <div className="bg-zinc-900 border border-white/5 p-8 sm:p-12 rounded-sm shadow-2xl animate-fade-in max-w-2xl mx-auto">
                        <h2 className="text-xl font-bold text-white uppercase mb-6 flex items-center gap-2">
                            <ShieldCheckIcon className="h-6 w-6 text-yellow-500" />
                            {t('calc.step1')}
                        </h2>
                        <div className="space-y-6">
                            <div>
                                <label className="block text-xs font-bold uppercase text-zinc-500 mb-1">{t('calc.name')} *</label>
                                <input 
                                    type="text" 
                                    className={`w-full bg-black border ${userErrors.name ? 'border-red-500' : 'border-white/10'} p-3 text-white focus:border-yellow-500 outline-none transition-colors`}
                                    value={userData.name}
                                    onChange={e => setUserData({...userData, name: e.target.value})}
                                />
                                {userErrors.name && <p className="text-red-500 text-xs mt-1">{userErrors.name}</p>}
                            </div>
                            
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-xs font-bold uppercase text-zinc-500 mb-1">{t('calc.email')} *</label>
                                    <input 
                                        type="email" 
                                        className={`w-full bg-black border ${userErrors.email ? 'border-red-500' : 'border-white/10'} p-3 text-white focus:border-yellow-500 outline-none transition-colors`}
                                        value={userData.email}
                                        onChange={e => setUserData({...userData, email: e.target.value})}
                                    />
                                    {userErrors.email && <p className="text-red-500 text-xs mt-1">{userErrors.email}</p>}
                                </div>
                                <div>
                                    <label className="block text-xs font-bold uppercase text-zinc-500 mb-1">{t('calc.company')} *</label>
                                    <input 
                                        type="text" 
                                        className={`w-full bg-black border ${userErrors.company ? 'border-red-500' : 'border-white/10'} p-3 text-white focus:border-yellow-500 outline-none transition-colors`}
                                        value={userData.company}
                                        onChange={e => setUserData({...userData, company: e.target.value})}
                                    />
                                    {userErrors.company && <p className="text-red-500 text-xs mt-1">{userErrors.company}</p>}
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-xs font-bold uppercase text-zinc-500 mb-1">{t('calc.location')} *</label>
                                    <input 
                                        type="text" 
                                        className={`w-full bg-black border ${userErrors.location ? 'border-red-500' : 'border-white/10'} p-3 text-white focus:border-yellow-500 outline-none transition-colors`}
                                        value={userData.location}
                                        onChange={e => setUserData({...userData, location: e.target.value})}
                                    />
                                    {userErrors.location && <p className="text-red-500 text-xs mt-1">{userErrors.location}</p>}
                                </div>
                                <div>
                                    <label className="block text-xs font-bold uppercase text-zinc-500 mb-1">{t('calc.usage')} *</label>
                                    <select 
                                        className={`w-full bg-black border ${userErrors.usage ? 'border-red-500' : 'border-white/10'} p-3 text-white focus:border-yellow-500 outline-none transition-colors`}
                                        value={userData.usage}
                                        onChange={e => setUserData({...userData, usage: e.target.value})}
                                    >
                                        <option value="">{t('calc.select_usage')}</option>
                                        <option value="estructural">Estructural</option>
                                        <option value="maquinado">Maquinado / Piezas</option>
                                        <option value="mantenimiento">Mantenimiento / Refacción</option>
                                        <option value="mineria">Minería</option>
                                    </select>
                                    {userErrors.usage && <p className="text-red-500 text-xs mt-1">{userErrors.usage}</p>}
                                </div>
                            </div>

                            <button 
                                onClick={validateStep1}
                                className="w-full mt-6 bg-yellow-500 text-black font-bold uppercase py-4 hover:bg-yellow-400 transition-colors tracking-wide"
                            >
                                {t('calc.btn_start')}
                            </button>
                        </div>
                    </div>
                )}

                {/* STEP 2: CONFIGURATION */}
                {step === 2 && (
                    <div className="bg-zinc-950 border border-white/5 rounded-sm p-6 sm:p-10 animate-fade-in">
                        <div className="mb-8 border-b border-white/10 pb-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                            <h2 className="text-xl font-bold text-white uppercase">{t('calc.step2')}</h2>
                            
                            {/* Unit Switcher */}
                            <div className="flex bg-zinc-900 rounded-sm p-1 border border-white/10">
                                <button 
                                    onClick={() => { setSystem('metric'); setDimensions({dim1:0,dim2:0,length:0}); setFormError(''); }}
                                    className={`px-4 py-1.5 text-xs font-bold uppercase transition-all ${system === 'metric' ? 'bg-yellow-500 text-black' : 'text-zinc-500 hover:text-white'}`}
                                >
                                    {t('calc.metric')}
                                </button>
                                <button 
                                    onClick={() => { setSystem('imperial'); setDimensions({dim1:0,dim2:0,length:0}); setFormError(''); }}
                                    className={`px-4 py-1.5 text-xs font-bold uppercase transition-all ${system === 'imperial' ? 'bg-yellow-500 text-black' : 'text-zinc-500 hover:text-white'}`}
                                >
                                    {t('calc.imperial')}
                                </button>
                            </div>
                        </div>

                        {/* Material Grid */}
                        <div className="mb-8">
                            <label className="block text-xs font-bold uppercase text-zinc-500 mb-3">{t('calc.select_material')}</label>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                {MATERIAL_OPTIONS.map(opt => (
                                    <button
                                        key={opt.id}
                                        onClick={() => { setMaterial(opt.id); setFormError(''); }}
                                        className={`group relative p-4 border ${material === opt.id ? 'border-yellow-500 opacity-100 ring-1 ring-yellow-500' : 'border-white/10 opacity-60 hover:opacity-100'} rounded-sm transition-all flex flex-col items-center gap-2 ${opt.class}`}
                                    >
                                        {/* Tooltip */}
                                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-max bg-zinc-900 border border-white/20 p-2 rounded shadow-2xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-20">
                                            <p className="text-[10px] text-yellow-500 font-bold uppercase text-center mb-1 border-b border-white/10 pb-1">
                                                {language === 'es' ? 'Densidad' : 'Density'}
                                            </p>
                                            <div className="flex gap-3 text-[9px] text-zinc-400">
                                                <div className="text-center">
                                                    <span className="block font-bold text-white text-xs">{DENSITIES_METRIC[opt.id]}</span>
                                                    kg/m³
                                                </div>
                                                <div className="w-px bg-white/10"></div>
                                                <div className="text-center">
                                                    <span className="block font-bold text-white text-xs">{DENSITIES_IMPERIAL[opt.id]}</span>
                                                    lbs/ft³
                                                </div>
                                            </div>
                                            {/* Arrow */}
                                            <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 border-4 border-transparent border-t-zinc-900"></div>
                                        </div>

                                        <CubeTransparentIcon className="h-6 w-6 text-white" />
                                        <span className="text-sm font-bold text-white uppercase">{opt.name}</span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Shape Grid */}
                         <div className="mb-8">
                            <label className="block text-xs font-bold uppercase text-zinc-500 mb-3">{t('calc.select_shape')}</label>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                {SHAPE_OPTIONS.map(opt => (
                                    <button
                                        key={opt.id}
                                        onClick={() => handleShapeSelect(opt.id)}
                                        className={`p-4 border ${shape === opt.id ? 'border-yellow-500 bg-white/5' : 'border-white/10 bg-black'} rounded-sm transition-all flex flex-col items-center gap-2`}
                                    >
                                        <span className="material-symbols-outlined text-zinc-300">{opt.icon}</span>
                                        <span className="text-xs font-bold text-white uppercase text-center">{opt.name}</span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Dimensions Inputs */}
                        {renderDimensionInputs()}

                        <div className="mt-8 flex flex-col items-end gap-4">
                            {formError && (
                                <p className="text-red-500 text-sm font-bold animate-pulse">{formError}</p>
                            )}
                            <button
                                onClick={handleCalculate}
                                className="bg-yellow-500 text-black font-bold uppercase px-8 py-3 hover:bg-yellow-400 transition-colors"
                            >
                                {t('calc.btn_calc')}
                            </button>
                        </div>
                    </div>
                )}

                {/* STEP 3: RESULTS */}
                {step === 3 && result && (
                    <div className="max-w-xl mx-auto animate-fade-in">
                        <div className="bg-zinc-900 border border-yellow-500 rounded-sm overflow-hidden shadow-[0_0_50px_rgba(234,179,8,0.15)]">
                            <div className="bg-yellow-500 p-4 text-center">
                                <h3 className="text-black font-black uppercase text-xl tracking-wider">{t('calc.result_title')}</h3>
                            </div>
                            <div className="p-8">
                                <div className="grid grid-cols-2 gap-8 mb-8 border-b border-white/10 pb-8">
                                    <div className="text-center">
                                        <p className="text-xs uppercase text-zinc-500 mb-1">Material</p>
                                        <p className="text-white font-bold text-lg uppercase">{MATERIAL_OPTIONS.find(m => m.id === material)?.name}</p>
                                        <p className="text-xs text-zinc-600">Densidad Ref: {system === 'metric' ? DENSITIES_METRIC[material] : DENSITIES_IMPERIAL[material]} {system === 'metric' ? 'kg/m³' : 'lbs/ft³'}</p>
                                    </div>
                                    <div className="text-center">
                                        <p className="text-xs uppercase text-zinc-500 mb-1">Geometría</p>
                                        <p className="text-white font-bold text-lg uppercase">{SHAPE_OPTIONS.find(s => s.id === shape)?.name}</p>
                                    </div>
                                </div>

                                <div className="space-y-6">
                                    <div className="flex justify-between items-end">
                                        <span className="text-zinc-400 uppercase text-sm">{t('calc.vol_total')}</span>
                                        <span className="text-white font-mono text-xl">{result.volume.toFixed(4)} <span className="text-sm text-zinc-500">{result.unitV}</span></span>
                                    </div>
                                    <div className="flex justify-between items-end border-t border-white/10 pt-4">
                                        <span className="text-yellow-500 font-bold uppercase text-lg">{t('calc.weight_est')}</span>
                                        <span className="text-white font-black text-4xl tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-white to-yellow-200">
                                            {result.weight.toFixed(2)} <span className="text-lg text-zinc-500 font-normal">{result.unitW}</span>
                                        </span>
                                    </div>
                                </div>

                                <div className="mt-8 bg-black/40 p-4 rounded text-xs text-zinc-400 border-l-2 border-yellow-500">
                                    <p className="mb-2"><strong>Nota Técnica:</strong> Este cálculo es una referencia teórica basada en densidades estándar. Las tolerancias de fabricación pueden variar el peso real.</p>
                                    <p>Para disponibilidad de stock y tiempos de entrega en {userData.location}, contacte a un ingeniero.</p>
                                </div>

                                <div className="mt-8 grid grid-cols-2 gap-4">
                                    <button 
                                        onClick={resetCalculator}
                                        className="w-full border border-white/10 text-white font-bold uppercase py-3 hover:bg-white/5 transition-colors text-xs"
                                    >
                                        {t('calc.new_calc')}
                                    </button>
                                    <a 
                                        href="#contact"
                                        className="w-full bg-yellow-500 text-black font-bold uppercase py-3 hover:bg-yellow-400 transition-colors text-xs flex items-center justify-center"
                                    >
                                        {t('calc.req_material')}
                                    </a>
                                </div>
                            </div>
                        </div>

                        {/* HISTORY CHART */}
                        {renderHistoryChart()}
                    </div>
                )}

            </div>
        </div>
    );
};

export default CalculatorPage;