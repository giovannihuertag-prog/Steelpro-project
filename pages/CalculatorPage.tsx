import React, { useState, useEffect, useRef } from 'react';
import { CalculatorIcon, ShieldCheckIcon, CubeTransparentIcon, ChartBarIcon } from '../components/Icons';
import { useLanguage } from '../context/LanguageContext';

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
    const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
    
    // History Data
    const [history, setHistory] = useState<HistoryItem[]>([]);
    
    // Result
    const [result, setResult] = useState<{ volume: number, weight: number, unitW: string, unitV: string } | null>(null);

    // Scrolling Refs
    const topRef = useRef<HTMLDivElement>(null);
    const historyRef = useRef<HTMLDivElement>(null);

    // Enhanced smooth scroll function with offset calculation
    const smoothScrollTo = (targetRef: React.RefObject<HTMLDivElement>) => {
        setTimeout(() => {
            if (targetRef.current) {
                const headerOffset = 100; // Adjust for fixed header height
                const elementPosition = targetRef.current.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.scrollY - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        }, 150); // Small delay to allow render/layout updates
    };

    // --- CONFIGURATION & DATA ---

    // Unified Material Options containing metadata and densities
    const MATERIAL_OPTIONS = [
        { 
            id: 'acero', 
            name: language === 'es' ? 'Acero A36/1045' : 'Steel A36/1045', 
            icon: CubeTransparentIcon,
            class: 'bg-zinc-800',
            image: 'https://images.unsplash.com/photo-1567119782539-773df644558e?q=80&w=2940&auto=format&fit=crop',
            densityMetric: 7850, // kg/m3
            densityImperial: 490 // lbs/ft3
        },
        { 
            id: 'acero4140', 
            name: language === 'es' ? 'Acero 4140' : 'Steel 4140', 
            icon: ShieldCheckIcon,
            class: 'bg-slate-800',
            densityMetric: 7850,
            densityImperial: 490
        },
        // Stainless Steel Series
        { 
            id: 'inox410', 
            name: 'Inox 410', 
            icon: CubeTransparentIcon,
            class: 'bg-stone-800',
            densityMetric: 7750,
            densityImperial: 484
        },
        { 
            id: 'inox416', 
            name: 'Inox 416', 
            icon: CubeTransparentIcon,
            class: 'bg-stone-800',
            densityMetric: 7750,
            densityImperial: 484
        },
        { 
            id: 'inox420', 
            name: 'Inox 420', 
            icon: CubeTransparentIcon,
            class: 'bg-stone-800',
            densityMetric: 7750,
            densityImperial: 484
        },
        // Aluminum Series
        { 
            id: 'alum6061', 
            name: 'Alum 6061', 
            icon: CubeTransparentIcon,
            class: 'bg-zinc-700',
            densityMetric: 2700,
            densityImperial: 169
        },
        { 
            id: 'alum7075', 
            name: 'Alum 7075', 
            icon: CubeTransparentIcon,
            class: 'bg-zinc-700',
            densityMetric: 2810,
            densityImperial: 175
        },
        { 
            id: 'alum1050', 
            name: 'Alum 1050', 
            icon: CubeTransparentIcon,
            class: 'bg-zinc-700',
            densityMetric: 2705,
            densityImperial: 169
        },
        // Non-Ferrous
        { 
            id: 'cobre', 
            name: language === 'es' ? 'Cobre' : 'Copper', 
            icon: CubeTransparentIcon,
            class: 'bg-orange-900/40',
            densityMetric: 8960,
            densityImperial: 559
        },
        { 
            id: 'bronce', 
            name: language === 'es' ? 'Bronce' : 'Bronze', 
            icon: CubeTransparentIcon,
            class: 'bg-yellow-900/40',
            densityMetric: 8700,
            densityImperial: 543
        },
        { 
            id: 'laton', 
            name: language === 'es' ? 'Latón' : 'Brass', 
            icon: CubeTransparentIcon,
            class: 'bg-yellow-500/20',
            densityMetric: 8500,
            densityImperial: 530
        }
    ];

    const SHAPE_OPTIONS = [
        { id: 'solid_round', name: language === 'es' ? 'Sólido Redondo' : 'Solid Round', icon: 'radio_button_checked' },
        { id: 'solid_square', name: language === 'es' ? 'Sólido Cuadrado' : 'Solid Square', icon: 'check_box_outline_blank' },
        { id: 'hollow', name: language === 'es' ? 'Hueco / Tubo' : 'Hollow / Tube', icon: 'donut_large' },
        { id: 'plate', name: language === 'es' ? 'Placa de Acero / Lámina' : 'Steel Plate / Sheet', icon: 'rectangle' }
    ];

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
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
        setFieldErrors({});
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
            smoothScrollTo(topRef);
        }
    };

    const updateDimension = (field: keyof Dimensions, value: string) => {
        const numVal = parseFloat(value);
        setDimensions(prev => ({...prev, [field]: numVal}));
        
        // Clear specific field error on change
        if (fieldErrors[field]) {
             setFieldErrors(prev => {
                 const next = {...prev};
                 delete next[field];
                 return next;
             });
        }
        setFormError('');
    };

    const handleCalculate = () => {
        setFormError('');
        setFieldErrors({});
        
        // 1. Validate Material & Get Data
        const selectedMaterial = MATERIAL_OPTIONS.find(m => m.id === material);

        if (!material || !selectedMaterial) {
            setFormError(language === 'es' ? '⚠️ Seleccione un material para continuar.' : '⚠️ Select a material to continue.');
            return;
        }

        // 2. Validate Shape
        if (!shape) {
            setFormError(language === 'es' ? '⚠️ Seleccione una geometría.' : '⚠️ Select a shape.');
            return;
        }
        
        // 3. Validate Dimensions
        let hasError = false;
        const newFieldErrors: Record<string, string> = {};

        const validatePositive = (val: number, field: string) => {
            if (!val || val <= 0 || isNaN(val)) {
                newFieldErrors[field] = language === 'es' ? 'Valor positivo requerido (> 0)' : 'Positive value required (> 0)';
                hasError = true;
            }
        };
        
        // General check for length
        validatePositive(dimensions.length, 'length');

        // Shape specific dimension checks
        if (shape === 'solid_round' || shape === 'solid_square') {
             validatePositive(dimensions.dim1, 'dim1');
        } else if (shape === 'hollow') {
             validatePositive(dimensions.dim1, 'dim1'); // OD
             validatePositive(dimensions.dim2, 'dim2'); // ID
             
             // Check if ID >= OD (Logic Error) - Only if both values are valid positive numbers so far
             if (!newFieldErrors.dim1 && !newFieldErrors.dim2) {
                 if (dimensions.dim2 >= dimensions.dim1) {
                     newFieldErrors.dim2 = language === 'es' 
                        ? 'ID debe ser menor que OD' 
                        : 'ID must be less than OD';
                     hasError = true;
                 }
            }
        } else if (shape === 'plate') {
             validatePositive(dimensions.dim1, 'dim1'); // Thickness
             validatePositive(dimensions.dim2, 'dim2'); // Width
        }

        if (hasError) {
            setFieldErrors(newFieldErrors);
            setFormError(language === 'es' ? '⚠️ Verifique los campos marcados.' : '⚠️ Please check highlighted fields.');
            return;
        }

        // Calculation Logic
        let vol = 0;
        let weight = 0;
        // Access density from the configured object
        const density = system === 'metric' ? selectedMaterial.densityMetric : selectedMaterial.densityImperial;

        if (system === 'metric') {
             // Metric Input: mm -> Output: m
             const L_m = dimensions.length / 1000;

             if (shape === 'solid_round') {
                 const radius_m = (dimensions.dim1 / 1000) / 2;
                 vol = Math.PI * Math.pow(radius_m, 2) * L_m;
             } else if (shape === 'solid_square') {
                 const side_m = dimensions.dim1 / 1000;
                 vol = side_m * side_m * L_m;
             } else if (shape === 'hollow') {
                 const od_m = dimensions.dim1 / 1000;
                 const id_m = dimensions.dim2 / 1000;
                 vol = Math.PI * (Math.pow(od_m / 2, 2) - Math.pow(id_m / 2, 2)) * L_m;
             } else if (shape === 'plate') {
                 // Explicit variables for clarity
                 const thickness_m = dimensions.dim1 / 1000;
                 const width_m = dimensions.dim2 / 1000;
                 vol = thickness_m * width_m * L_m;
             }

             weight = vol * density;
             setResult({ volume: vol, weight, unitW: 'kg', unitV: 'm³' });

        } else {
            // Imperial Input: in (section), ft (length) -> Output: ft
            const L_ft = dimensions.length;

            if (shape === 'solid_round') {
                 const radius_ft = (dimensions.dim1 / 12) / 2;
                 vol = Math.PI * Math.pow(radius_ft, 2) * L_ft;
            } else if (shape === 'solid_square') {
                 const side_ft = dimensions.dim1 / 12;
                 vol = side_ft * side_ft * L_ft;
            } else if (shape === 'hollow') {
                 const od_ft = dimensions.dim1 / 12;
                 const id_ft = dimensions.dim2 / 12;
                 vol = Math.PI * (Math.pow(od_ft / 2, 2) - Math.pow(id_ft / 2, 2)) * L_ft;
            } else if (shape === 'plate') {
                 // Explicit variables for clarity
                 const thickness_ft = dimensions.dim1 / 12; // inches to feet
                 const width_ft = dimensions.dim2 / 12;     // inches to feet
                 vol = thickness_ft * width_ft * L_ft;
            }
            
            weight = vol * density;
            setResult({ volume: vol, weight, unitW: 'lbs', unitV: 'ft³' });
        }
        
        // Save History
        const newItem: HistoryItem = {
            id: Date.now(),
            material: selectedMaterial.name,
            weight: weight,
            unit: system === 'metric' ? 'kg' : 'lbs',
            date: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        
        // Keep last 7 calculations
        const updatedHistory = [...history, newItem].slice(-7);
        setHistory(updatedHistory);
        localStorage.setItem('steelpro_history', JSON.stringify(updatedHistory));

        setStep(3);
        smoothScrollTo(topRef);
    };

    const resetCalculator = () => {
        setResult(null);
        setStep(2); // Keep user data, go back to config
        smoothScrollTo(topRef);
    };
    
    const clearHistory = () => {
        setHistory([]);
        localStorage.removeItem('steelpro_history');
    };

    // --- VISUAL HELPERS (BLUEPRINTS) ---
    
    const renderShapeDiagram = () => {
        const strokeColor = "#eab308"; // Yellow-500
        const strokeWidth = 2;
        
        if (!shape) return (
            <div className="h-full w-full flex items-center justify-center border-2 border-dashed border-white/5 rounded-sm bg-black/20">
                 <p className="text-xs text-zinc-600 font-mono uppercase text-center p-4">
                     {t('calc.select_shape')} <br/> {language === 'es' ? 'para ver diagrama' : 'to view diagram'}
                 </p>
            </div>
        );

        return (
            <div className="h-full w-full flex items-center justify-center bg-black/20 rounded-sm relative overflow-hidden group">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/graphy.png')] opacity-10"></div>
                
                <svg viewBox="0 0 100 100" className="w-32 h-32 drop-shadow-[0_0_10px_rgba(234,179,8,0.3)] transition-all duration-500 group-hover:scale-105">
                    {shape === 'solid_round' && (
                        <>
                            <circle cx="50" cy="50" r="35" fill="none" stroke={strokeColor} strokeWidth={strokeWidth} />
                            {/* Diameter Line */}
                            <line x1="15" y1="50" x2="85" y2="50" stroke="white" strokeWidth="1" strokeDasharray="4 2" opacity="0.5" />
                            <text x="50" y="45" textAnchor="middle" fill="white" fontSize="8" fontFamily="monospace">Ø</text>
                        </>
                    )}
                    {shape === 'solid_square' && (
                        <>
                            <rect x="20" y="20" width="60" height="60" fill="none" stroke={strokeColor} strokeWidth={strokeWidth} />
                             {/* Side indicators */}
                             <line x1="20" y1="90" x2="80" y2="90" stroke="white" strokeWidth="1" opacity="0.3" />
                             <line x1="20" y1="85" x2="20" y2="95" stroke="white" strokeWidth="1" opacity="0.3" />
                             <line x1="80" y1="85" x2="80" y2="95" stroke="white" strokeWidth="1" opacity="0.3" />
                        </>
                    )}
                    {shape === 'hollow' && (
                        <>
                            <circle cx="50" cy="50" r="40" fill="none" stroke={strokeColor} strokeWidth={strokeWidth} />
                            <circle cx="50" cy="50" r="25" fill="none" stroke="white" strokeWidth="1" strokeDasharray="4" opacity="0.6" />
                             {/* Thickness area */}
                             <path d="M50 10 A40 40 0 1 0 50 90 A40 40 0 1 0 50 10 Z M50 25 A25 25 0 1 1 50 75 A25 25 0 1 1 50 25 Z" fill={strokeColor} fillOpacity="0.1" fillRule="evenodd" />
                        </>
                    )}
                    {shape === 'plate' && (
                         <>
                            {/* Isometric-ish look */}
                            <path d="M10 30 L80 30 L90 20 L20 20 Z" fill="none" stroke={strokeColor} strokeWidth={strokeWidth} />
                            <path d="M10 30 L80 30 L80 70 L10 70 Z" fill={strokeColor} fillOpacity="0.1" stroke={strokeColor} strokeWidth={strokeWidth} />
                            <path d="M80 30 L90 20 L90 60 L80 70 Z" fill="none" stroke={strokeColor} strokeWidth={strokeWidth} />
                        </>
                    )}
                </svg>
                <div className="absolute bottom-2 right-2 text-[10px] text-zinc-600 font-mono">FIG. 0{SHAPE_OPTIONS.findIndex(s => s.id === shape) + 1}</div>
            </div>
        );
    };

    // --- RENDER HELPERS ---

    const renderDimensionInputs = () => {
        if (!shape) return null;

        const isImperial = system === 'imperial';
        
        const labelUnitSection = isImperial ? 'IN' : 'MM';
        const labelUnitLength = isImperial ? 'FT' : 'MM';

        const phSection = isImperial ? '0.00 in' : '0.00 mm';
        const phLength = isImperial ? '0.00 ft' : '0.00 mm';
        
        const tipSection = isImperial ? '1 in ≈ 25.4 mm' : '10 mm = 1 cm';
        const tipLength = isImperial ? '1 ft = 30.48 cm' : '1000 mm = 1 m';

        const baseInputClass = "w-full bg-black border p-2 pl-3 text-right text-white font-mono outline-none transition-all placeholder:text-zinc-700";
        
        const getInputClass = (hasError: boolean, isPrimary: boolean = false) => {
            if (hasError) return `${baseInputClass} border-red-500 focus:border-red-500 text-red-100 bg-red-900/10`;
            if (isPrimary) return `${baseInputClass} border-yellow-500/50 focus:border-yellow-400 focus:shadow-[0_0_15px_rgba(234,179,8,0.1)]`;
            return `${baseInputClass} border-white/10 focus:border-yellow-500`;
        };
        
        const renderLabel = (text: string, icon: string | null, unit: string, tip: string, isPrimary: boolean = false) => (
             <label className={`flex items-center justify-between text-[10px] uppercase mb-1 font-bold tracking-wider w-full ${isPrimary ? 'text-yellow-500' : 'text-zinc-500'}`}>
                <div className="flex items-center gap-1">
                    {icon && <span className="material-symbols-outlined text-[14px]">{icon}</span>}
                    {text}
                </div>
                
                <div className="flex items-center gap-1 group relative cursor-help">
                    <span className="font-mono text-zinc-600 group-hover:text-zinc-400 transition-colors">{unit}</span>
                    <span className="material-symbols-outlined text-[12px] text-zinc-700 group-hover:text-yellow-500 transition-colors">help</span>
                    
                    {/* Tooltip */}
                    <div className="absolute bottom-full right-0 mb-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50">
                        <div className="bg-zinc-800 border border-white/10 text-white text-[9px] px-2 py-1.5 rounded shadow-xl whitespace-nowrap font-mono flex items-center gap-2">
                             <span className="w-1.5 h-1.5 bg-yellow-500 rounded-full"></span>
                            {tip}
                        </div>
                        {/* Arrow */}
                        <div className="absolute top-full right-1.5 -mt-[1px] border-4 border-transparent border-t-zinc-800"></div>
                    </div>
                </div>
             </label>
        );
        
        const InputWrapper = ({ label, unit, children, error }: any) => (
             <div>
                <div className="mb-1">
                    {label}
                </div>
                <div className="relative group">
                    {children}
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[10px] text-zinc-600 font-mono font-bold pointer-events-none group-focus-within:text-zinc-400 transition-colors">
                        {unit}
                    </span>
                </div>
                {error && <p className="text-red-500 text-[9px] mt-1 font-mono">{error}</p>}
             </div>
        );

        return (
            <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6 animate-fade-in">
                
                {/* Visual Diagram Column */}
                <div className="lg:col-span-1 h-40 lg:h-auto order-1 lg:order-2 bg-zinc-900 border border-white/5 rounded-sm p-1">
                    {renderShapeDiagram()}
                </div>

                {/* Inputs Column */}
                <div className="lg:col-span-2 order-2 lg:order-1 p-6 bg-zinc-900 border border-white/5 rounded-sm">
                    <h4 className="text-xs font-bold text-white uppercase tracking-widest mb-6 border-b border-white/5 pb-2">
                        {t('calc.step2').split(' ')[0]} <span className="text-zinc-500">// Dimensiones</span>
                    </h4>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-6">
                        {shape === 'solid_round' && (
                            <>
                                <InputWrapper 
                                    label={renderLabel(t('calc.diameter'), 'circle', labelUnitSection, tipSection, true)} 
                                    unit={labelUnitSection} 
                                    error={fieldErrors.dim1}
                                >
                                    <input type="number" className={getInputClass(!!fieldErrors.dim1, true)} placeholder={phSection}
                                        value={dimensions.dim1 || ''} onChange={e => updateDimension('dim1', e.target.value)} />
                                </InputWrapper>
                                <InputWrapper 
                                    label={renderLabel(t('calc.length'), null, labelUnitLength, tipLength)} 
                                    unit={labelUnitLength} 
                                    error={fieldErrors.length}
                                >
                                    <input type="number" className={getInputClass(!!fieldErrors.length)} placeholder={phLength}
                                        value={dimensions.length || ''} onChange={e => updateDimension('length', e.target.value)} />
                                </InputWrapper>
                            </>
                        )}
                        {shape === 'solid_square' && (
                             <>
                                <InputWrapper 
                                    label={renderLabel(t('calc.side'), 'square', labelUnitSection, tipSection, true)} 
                                    unit={labelUnitSection} 
                                    error={fieldErrors.dim1}
                                >
                                    <input type="number" className={getInputClass(!!fieldErrors.dim1, true)} placeholder={phSection}
                                        value={dimensions.dim1 || ''} onChange={e => updateDimension('dim1', e.target.value)} />
                                </InputWrapper>
                                <InputWrapper 
                                    label={renderLabel(t('calc.length'), null, labelUnitLength, tipLength)} 
                                    unit={labelUnitLength} 
                                    error={fieldErrors.length}
                                >
                                    <input type="number" className={getInputClass(!!fieldErrors.length)} placeholder={phLength}
                                        value={dimensions.length || ''} onChange={e => updateDimension('length', e.target.value)} />
                                </InputWrapper>
                            </>
                        )}
                        {shape === 'hollow' && (
                            <>
                                <InputWrapper 
                                    label={renderLabel(t('calc.outer_diam'), 'radio_button_unchecked', labelUnitSection, tipSection, true)} 
                                    unit={labelUnitSection} 
                                    error={fieldErrors.dim1}
                                >
                                    <input type="number" className={getInputClass(!!fieldErrors.dim1, true)} placeholder={phSection}
                                        value={dimensions.dim1 || ''} onChange={e => updateDimension('dim1', e.target.value)} />
                                </InputWrapper>
                                <InputWrapper 
                                    label={renderLabel(t('calc.inner_diam'), null, labelUnitSection, tipSection)} 
                                    unit={labelUnitSection} 
                                    error={fieldErrors.dim2}
                                >
                                    <input type="number" className={getInputClass(!!fieldErrors.dim2)} placeholder={phSection}
                                        value={dimensions.dim2 || ''} onChange={e => updateDimension('dim2', e.target.value)} />
                                </InputWrapper>
                                <div className="sm:col-span-2">
                                     <InputWrapper 
                                        label={renderLabel(t('calc.length'), null, labelUnitLength, tipLength)} 
                                        unit={labelUnitLength} 
                                        error={fieldErrors.length}
                                    >
                                        <input type="number" className={getInputClass(!!fieldErrors.length)} placeholder={phLength}
                                            value={dimensions.length || ''} onChange={e => updateDimension('length', e.target.value)} />
                                    </InputWrapper>
                                </div>
                            </>
                        )}
                        {shape === 'plate' && (
                             <>
                                <InputWrapper 
                                    label={renderLabel(t('calc.thickness'), 'space_dashboard', labelUnitSection, tipSection, true)} 
                                    unit={labelUnitSection} 
                                    error={fieldErrors.dim1}
                                >
                                    <input type="number" className={getInputClass(!!fieldErrors.dim1, true)} placeholder={phSection}
                                        value={dimensions.dim1 || ''} onChange={e => updateDimension('dim1', e.target.value)} />
                                </InputWrapper>
                                <InputWrapper 
                                    label={renderLabel(t('calc.width'), null, labelUnitSection, tipSection)} 
                                    unit={labelUnitSection} 
                                    error={fieldErrors.dim2}
                                >
                                    <input type="number" className={getInputClass(!!fieldErrors.dim2)} placeholder={phSection}
                                        value={dimensions.dim2 || ''} onChange={e => updateDimension('dim2', e.target.value)} />
                                </InputWrapper>
                                <div className="sm:col-span-2">
                                    <InputWrapper 
                                        label={renderLabel(t('calc.length'), null, labelUnitLength, tipLength)} 
                                        unit={labelUnitLength} 
                                        error={fieldErrors.length}
                                    >
                                        <input type="number" className={getInputClass(!!fieldErrors.length)} placeholder={phLength}
                                            value={dimensions.length || ''} onChange={e => updateDimension('length', e.target.value)} />
                                    </InputWrapper>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        );
    };

    const renderHistoryChart = () => {
        if (history.length === 0) return (
            <div ref={historyRef} className="mt-12 bg-zinc-900 border border-white/5 p-6 rounded-sm animate-fade-in text-center">
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
            <div ref={historyRef} className="mt-12 bg-zinc-900 border border-white/5 p-6 rounded-sm animate-fade-in">
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
                                            <span className="text-yellow-500 font-bold block font-mono">{item.weight.toFixed(2)} {item.unit}</span>
                                            <span className="text-zinc-400 text-[9px] block">{item.material}</span>
                                        </div>
                                    </div>
                                    
                                    {/* Date Label */}
                                    <div className="text-[9px] text-zinc-500 w-full text-center truncate px-1 font-mono">
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
            <div ref={topRef} className="mx-auto max-w-4xl px-6 lg:px-8 scroll-mt-32">
                
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
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm border-2 transition-all ${step >= 1 ? 'bg-yellow-500 border-yellow-500 text-black shadow-[0_0_15px_rgba(234,179,8,0.5)]' : 'bg-zinc-900 border-zinc-700 text-zinc-500'}`}>1</div>
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm border-2 transition-all ${step >= 2 ? 'bg-yellow-500 border-yellow-500 text-black shadow-[0_0_15px_rgba(234,179,8,0.5)]' : 'bg-zinc-900 border-zinc-700 text-zinc-500'}`}>2</div>
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm border-2 transition-all ${step >= 3 ? 'bg-yellow-500 border-yellow-500 text-black shadow-[0_0_15px_rgba(234,179,8,0.5)]' : 'bg-zinc-900 border-zinc-700 text-zinc-500'}`}>3</div>
                </div>

                {/* STEP 1: DATA COLLECTION */}
                {step === 1 && (
                    <div className="bg-zinc-900 border border-white/5 p-8 sm:p-12 rounded-sm shadow-2xl animate-fade-in max-w-2xl mx-auto relative overflow-hidden">
                        {/* Decorative Corner */}
                        <div className="absolute top-0 right-0 w-16 h-16 border-t-2 border-r-2 border-yellow-500/20 rounded-tr-sm"></div>

                        <h2 className="text-xl font-bold text-white uppercase mb-6 flex items-center gap-2">
                            <ShieldCheckIcon className="h-6 w-6 text-yellow-500" />
                            {t('calc.step1')}
                        </h2>
                        <div className="space-y-6">
                            <div>
                                <label className="block text-xs font-bold uppercase text-zinc-500 mb-1">{t('calc.name')} *</label>
                                <input 
                                    type="text" 
                                    className={`w-full bg-black border ${userErrors.name ? 'border-red-500' : 'border-white/10'} p-3 text-white focus:border-yellow-500 outline-none transition-colors font-mono`}
                                    value={userData.name}
                                    onChange={e => setUserData({...userData, name: e.target.value})}
                                />
                                {userErrors.name && <p className="text-red-500 text-xs mt-1 font-mono">{userErrors.name}</p>}
                            </div>
                            
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-xs font-bold uppercase text-zinc-500 mb-1">{t('calc.email')} *</label>
                                    <input 
                                        type="email" 
                                        className={`w-full bg-black border ${userErrors.email ? 'border-red-500' : 'border-white/10'} p-3 text-white focus:border-yellow-500 outline-none transition-colors font-mono`}
                                        value={userData.email}
                                        onChange={e => setUserData({...userData, email: e.target.value})}
                                    />
                                    {userErrors.email && <p className="text-red-500 text-xs mt-1 font-mono">{userErrors.email}</p>}
                                </div>
                                <div>
                                    <label className="block text-xs font-bold uppercase text-zinc-500 mb-1">{t('calc.company')} *</label>
                                    <input 
                                        type="text" 
                                        className={`w-full bg-black border ${userErrors.company ? 'border-red-500' : 'border-white/10'} p-3 text-white focus:border-yellow-500 outline-none transition-colors font-mono`}
                                        value={userData.company}
                                        onChange={e => setUserData({...userData, company: e.target.value})}
                                    />
                                    {userErrors.company && <p className="text-red-500 text-xs mt-1 font-mono">{userErrors.company}</p>}
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-xs font-bold uppercase text-zinc-500 mb-1">{t('calc.location')} *</label>
                                    <input 
                                        type="text" 
                                        className={`w-full bg-black border ${userErrors.location ? 'border-red-500' : 'border-white/10'} p-3 text-white focus:border-yellow-500 outline-none transition-colors font-mono`}
                                        value={userData.location}
                                        onChange={e => setUserData({...userData, location: e.target.value})}
                                    />
                                    {userErrors.location && <p className="text-red-500 text-xs mt-1 font-mono">{userErrors.location}</p>}
                                </div>
                                <div>
                                    <label className="block text-xs font-bold uppercase text-zinc-500 mb-1">{t('calc.usage')} *</label>
                                    <select 
                                        className={`w-full bg-black border ${userErrors.usage ? 'border-red-500' : 'border-white/10'} p-3 text-white focus:border-yellow-500 outline-none transition-colors font-mono`}
                                        value={userData.usage}
                                        onChange={e => setUserData({...userData, usage: e.target.value})}
                                    >
                                        <option value="">{t('calc.select_usage')}</option>
                                        <option value="estructural">Estructural</option>
                                        <option value="maquinado">Maquinado / Piezas</option>
                                        <option value="mantenimiento">Mantenimiento / Refacción</option>
                                        <option value="mineria">Minería</option>
                                    </select>
                                    {userErrors.usage && <p className="text-red-500 text-xs mt-1 font-mono">{userErrors.usage}</p>}
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
                    <div className="bg-zinc-950 border border-white/5 rounded-sm p-6 sm:p-10 animate-fade-in relative">
                         {/* Tech Grid Background */}
                         <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-5 pointer-events-none"></div>

                        <div className="mb-8 border-b border-white/10 pb-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 relative z-10">
                            <h2 className="text-xl font-bold text-white uppercase">{t('calc.step2')}</h2>
                            
                            {/* Unit Switcher */}
                            <div className="flex bg-black rounded-sm p-1 border border-white/10">
                                <button 
                                    onClick={() => { setSystem('metric'); setDimensions({dim1:0,dim2:0,length:0}); setFormError(''); }}
                                    className={`px-4 py-1.5 text-xs font-bold uppercase transition-all ${system === 'metric' ? 'bg-yellow-500 text-black shadow-lg' : 'text-zinc-500 hover:text-white'}`}
                                >
                                    {t('calc.metric')}
                                </button>
                                <button 
                                    onClick={() => { setSystem('imperial'); setDimensions({dim1:0,dim2:0,length:0}); setFormError(''); }}
                                    className={`px-4 py-1.5 text-xs font-bold uppercase transition-all ${system === 'imperial' ? 'bg-yellow-500 text-black shadow-lg' : 'text-zinc-500 hover:text-white'}`}
                                >
                                    {t('calc.imperial')}
                                </button>
                            </div>
                        </div>

                        {/* Material Grid */}
                        <div className="mb-8 relative z-10">
                            <label className="block text-xs font-bold uppercase text-zinc-500 mb-3 tracking-widest">{t('calc.select_material')}</label>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                {MATERIAL_OPTIONS.map((opt) => (
                                    <button
                                        key={opt.id}
                                        onClick={() => { setMaterial(opt.id); setFormError(''); }}
                                        className={`group relative p-4 border rounded-sm transition-all duration-300 flex flex-col items-center gap-2 overflow-hidden ${!opt.image && opt.class} ${
                                            material === opt.id 
                                            ? 'border-yellow-500 opacity-100 ring-1 ring-yellow-500 shadow-[0_0_20px_rgba(234,179,8,0.15)] scale-105 z-10' 
                                            : 'border-white/10 opacity-60 hover:opacity-100 hover:border-yellow-500 hover:shadow-lg'
                                        }`}
                                    >
                                        {/* Background Image Logic */}
                                        {opt.image ? (
                                            <>
                                                <div className={`absolute inset-0 bg-zinc-900`}></div>
                                                <img src={opt.image} alt="" className="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-overlay group-hover:scale-110 transition-transform duration-700" />
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                                            </>
                                        ) : null}

                                        {/* Tooltip */}
                                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 w-max bg-zinc-900 border border-white/20 p-3 rounded-sm shadow-2xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50 backdrop-blur-xl">
                                            <p className="text-[10px] text-yellow-500 font-bold uppercase text-center mb-2 pb-1 border-b border-white/10 tracking-widest">
                                                {language === 'es' ? 'Densidad' : 'Density'}
                                            </p>
                                            <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-[10px] font-mono">
                                                <div className="text-center">
                                                    <span className="block text-zinc-500 uppercase text-[9px] mb-0.5 font-sans">{language === 'es' ? 'Métrico' : 'Metric'}</span>
                                                    <span className="block font-bold text-white text-sm tracking-tight">{opt.densityMetric}</span>
                                                    <span className="text-zinc-400 text-[9px]">kg/m³</span>
                                                </div>
                                                <div className="text-center border-l border-white/10 pl-4">
                                                    <span className="block text-zinc-500 uppercase text-[9px] mb-0.5 font-sans">{language === 'es' ? 'Imperial' : 'Imperial'}</span>
                                                    <span className="block font-bold text-white text-sm tracking-tight">{opt.densityImperial}</span>
                                                    <span className="text-zinc-400 text-[9px]">lbs/ft³</span>
                                                </div>
                                            </div>
                                            {/* Arrow */}
                                            <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-[1px] border-4 border-transparent border-t-zinc-900"></div>
                                        </div>

                                        <div className="relative z-10 flex flex-col items-center gap-2">
                                            <opt.icon className="h-6 w-6 text-white" />
                                            <span className="text-sm font-bold text-white uppercase text-center shadow-black drop-shadow-md">{opt.name}</span>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Shape Grid */}
                         <div className="mb-8 relative z-10">
                            <label className="block text-xs font-bold uppercase text-zinc-500 mb-3 tracking-widest">{t('calc.select_shape')}</label>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                {SHAPE_OPTIONS.map(opt => (
                                    <button
                                        key={opt.id}
                                        onClick={() => handleShapeSelect(opt.id)}
                                        className={`p-4 border ${shape === opt.id ? 'border-yellow-500 bg-white/5 shadow-[inset_0_0_20px_rgba(234,179,8,0.1)]' : 'border-white/10 bg-black hover:border-white/30'} rounded-sm transition-all flex flex-col items-center gap-2`}
                                    >
                                        <span className={`material-symbols-outlined transition-colors ${shape === opt.id ? 'text-yellow-500' : 'text-zinc-300'}`}>{opt.icon}</span>
                                        <span className={`text-xs font-bold uppercase text-center transition-colors ${shape === opt.id ? 'text-white' : 'text-zinc-400'}`}>{opt.name}</span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Dimensions Inputs */}
                        {renderDimensionInputs()}

                        <div className="mt-8 flex flex-col items-end gap-4 relative z-10">
                            {formError && (
                                <div className="flex items-center gap-2 text-red-500 bg-red-500/10 px-4 py-2 rounded-sm border border-red-500/20">
                                    <span className="material-symbols-outlined text-sm">error</span>
                                    <p className="text-xs font-bold uppercase tracking-wide animate-pulse">{formError}</p>
                                </div>
                            )}
                            <button
                                onClick={handleCalculate}
                                className="bg-yellow-500 text-black font-black uppercase px-12 py-4 hover:bg-white transition-colors tracking-widest shadow-lg hover:shadow-yellow-500/20"
                            >
                                {t('calc.btn_calc')}
                            </button>
                        </div>
                    </div>
                )}

                {/* STEP 3: RESULTS (Visual Spec Sheet) */}
                {step === 3 && result && (
                    <div className="max-w-xl mx-auto animate-fade-in">
                        <div className="bg-zinc-900 border border-yellow-500/50 rounded-sm overflow-hidden shadow-[0_0_50px_rgba(234,179,8,0.1)] relative group">
                             
                            {/* Industrial Header */}
                            <div className="bg-black p-4 border-b border-white/10 flex justify-between items-center">
                                <div className="flex items-center gap-2">
                                     <span className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse"></span>
                                     <span className="text-[10px] font-mono text-zinc-400 uppercase">SPEC-ID: {Date.now().toString().slice(-6)}</span>
                                </div>
                                <div className="text-[10px] font-bold text-yellow-500 uppercase border border-yellow-500/30 px-2 py-0.5 rounded-sm">
                                    Verified
                                </div>
                            </div>
                            
                            <div className="p-0 relative">
                                {/* Diagonal Lines Pattern */}
                                <div className="absolute top-0 right-0 w-32 h-32 bg-[repeating-linear-gradient(45deg,transparent,transparent_10px,rgba(255,255,255,0.03)_10px,rgba(255,255,255,0.03)_20px)] pointer-events-none"></div>

                                <div className="p-8 pb-4">
                                    <h3 className="text-3xl font-black text-white uppercase tracking-tight mb-1">{t('calc.result_title')}</h3>
                                    <p className="text-zinc-500 text-xs uppercase tracking-widest">Reporte Técnico Preliminar</p>
                                </div>

                                <div className="px-8 py-6">
                                    <div className="grid grid-cols-2 gap-4 mb-8">
                                        <div className="bg-white/5 p-4 rounded-sm border-l-2 border-yellow-500">
                                            <p className="text-[9px] uppercase text-zinc-500 mb-1 font-bold tracking-wider">Material Base</p>
                                            <p className="text-white font-bold text-sm uppercase">{MATERIAL_OPTIONS.find(m => m.id === material)?.name}</p>
                                        </div>
                                        <div className="bg-white/5 p-4 rounded-sm border-l-2 border-zinc-600">
                                            <p className="text-[9px] uppercase text-zinc-500 mb-1 font-bold tracking-wider">Perfil</p>
                                            <p className="text-white font-bold text-sm uppercase">{SHAPE_OPTIONS.find(s => s.id === shape)?.name}</p>
                                        </div>
                                    </div>

                                    <div className="space-y-1 bg-black p-6 rounded-sm border border-white/10 relative overflow-hidden">
                                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-yellow-500 to-transparent"></div>
                                        
                                        <div className="flex justify-between items-center border-b border-dashed border-white/10 pb-4 mb-4">
                                            <span className="text-zinc-500 uppercase text-[10px] font-bold tracking-widest">{t('calc.vol_total')}</span>
                                            <span className="text-zinc-300 font-mono text-lg">{result.volume.toFixed(4)} <span className="text-xs text-zinc-600">{result.unitV}</span></span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-white font-bold uppercase text-xs tracking-widest">{t('calc.weight_est')}</span>
                                            <span className="text-yellow-500 font-mono font-black text-4xl tracking-tighter">
                                                {result.weight.toFixed(2)} <span className="text-lg text-zinc-600 font-normal">{result.unitW}</span>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="bg-black/50 p-6 border-t border-white/5 flex flex-col sm:flex-row gap-4">
                                <button 
                                    onClick={resetCalculator}
                                    className="flex-1 border border-white/10 text-zinc-400 font-bold uppercase py-3 hover:bg-white/5 hover:text-white transition-colors text-[10px] tracking-wider"
                                >
                                    {t('calc.new_calc')}
                                </button>
                                <a 
                                    href="#contact"
                                    className="flex-1 bg-yellow-500 text-black font-black uppercase py-3 hover:bg-white transition-colors text-[10px] flex items-center justify-center gap-2 tracking-wider"
                                >
                                    <span className="material-symbols-outlined text-base">request_quote</span>
                                    Cotizar Este Material
                                </a>
                            </div>
                            
                             {/* Scroll to History Action */}
                            <div className="bg-black/80 p-2 text-center border-t border-white/5">
                                <button 
                                    onClick={() => smoothScrollTo(historyRef)}
                                    className="text-[10px] text-zinc-500 hover:text-yellow-500 uppercase font-bold transition-colors flex items-center justify-center gap-1 w-full"
                                >
                                    <ChartBarIcon className="h-3 w-3" />
                                    {language === 'es' ? 'Ver Historial de Cálculos' : 'View Calculation History'}
                                </button>
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