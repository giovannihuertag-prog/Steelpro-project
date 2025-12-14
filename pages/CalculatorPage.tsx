import React, { useState, useEffect } from 'react';
import { CalculatorIcon, ShieldCheckIcon, CubeTransparentIcon, CheckIcon } from '../components/Icons';

// --- DATA CONSTANTS ---

const DENSITIES: Record<string, number> = {
    acero: 7850,
    cobre: 8960,
    bronce: 8700,
    laton: 8500
};

const MATERIAL_OPTIONS = [
    { id: 'acero', name: 'Acero', class: 'bg-zinc-800' },
    { id: 'cobre', name: 'Cobre', class: 'bg-orange-900/40' },
    { id: 'bronce', name: 'Bronce', class: 'bg-yellow-900/40' },
    { id: 'laton', name: 'Latón', class: 'bg-yellow-500/20' }
];

const SHAPE_OPTIONS = [
    { id: 'solid_round', name: 'Sólido Redondo', icon: 'radio_button_checked' },
    { id: 'solid_square', name: 'Sólido Cuadrado', icon: 'check_box_outline_blank' },
    { id: 'hollow', name: 'Hueco / Tubo', icon: 'donut_large' },
    { id: 'plate', name: 'Placa / Lámina', icon: 'rectangle' }
];

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

// --- COMPONENT ---

const CalculatorPage: React.FC = () => {
    const [step, setStep] = useState<1 | 2 | 3>(1);
    
    // Step 1 Data
    const [userData, setUserData] = useState<UserData>({ name: '', email: '', company: '', location: '', usage: '' });
    const [userErrors, setUserErrors] = useState<Partial<UserData>>({});

    // Step 2 Data
    const [material, setMaterial] = useState<string>('');
    const [shape, setShape] = useState<string>('');
    const [dimensions, setDimensions] = useState<Dimensions>({ dim1: 0, dim2: 0, length: 0 });
    
    // Result
    const [result, setResult] = useState<{ volume: number, weight: number } | null>(null);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    // --- LOGIC ---

    const validateStep1 = () => {
        const errors: Partial<UserData> = {};
        if (!userData.name.trim()) errors.name = "Requerido";
        if (!userData.email.trim() || !/^\S+@\S+\.\S+$/.test(userData.email)) errors.email = "Email corporativo válido requerido";
        if (!userData.company.trim()) errors.company = "Requerido";
        if (!userData.location.trim()) errors.location = "Requerido";
        if (!userData.usage.trim()) errors.usage = "Requerido";

        setUserErrors(errors);
        if (Object.keys(errors).length === 0) {
            setStep(2);
        }
    };

    const handleCalculate = () => {
        if (!material || !shape) return;

        // Convert all mm to meters for calculation
        const d1 = dimensions.dim1 / 1000;
        const d2 = dimensions.dim2 / 1000;
        const L = dimensions.length / 1000;
        const density = DENSITIES[material];

        let vol = 0; // m3

        switch (shape) {
            case 'solid_round':
                // pi * r^2 * h
                vol = Math.PI * Math.pow(d1 / 2, 2) * L;
                break;
            case 'solid_square':
                // side * side * L
                vol = d1 * d1 * L;
                break;
            case 'hollow':
                // pi * (R^2 - r^2) * L
                // d1 = OD, d2 = ID
                if (d2 >= d1) {
                    alert("El diámetro interior no puede ser mayor o igual al exterior.");
                    return;
                }
                vol = Math.PI * (Math.pow(d1 / 2, 2) - Math.pow(d2 / 2, 2)) * L;
                break;
            case 'plate':
                // Thickness * Width * Length
                // d1 = Thickness, d2 = Width
                vol = d1 * d2 * L;
                break;
        }

        const weight = vol * density;
        setResult({ volume: vol, weight });
        setStep(3);
    };

    const resetCalculator = () => {
        setResult(null);
        setStep(2); // Keep user data, go back to config
    };

    // --- RENDER HELPERS ---

    const renderDimensionInputs = () => {
        if (!shape) return null;

        return (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 animate-fade-in mt-8 p-6 bg-zinc-900 border border-white/5 rounded-sm">
                {shape === 'solid_round' && (
                    <>
                        <div>
                            <label className="block text-xs uppercase text-zinc-500 mb-2">Diámetro (mm)</label>
                            <input type="number" className="w-full bg-black border border-white/10 p-2 text-white" 
                                value={dimensions.dim1 || ''} onChange={e => setDimensions({...dimensions, dim1: parseFloat(e.target.value)})} />
                        </div>
                        <div className="sm:col-span-2">
                            <label className="block text-xs uppercase text-zinc-500 mb-2">Largo (mm)</label>
                            <input type="number" className="w-full bg-black border border-white/10 p-2 text-white" 
                                value={dimensions.length || ''} onChange={e => setDimensions({...dimensions, length: parseFloat(e.target.value)})} />
                        </div>
                    </>
                )}
                {shape === 'solid_square' && (
                    <>
                        <div>
                            <label className="block text-xs uppercase text-zinc-500 mb-2">Lado (mm)</label>
                            <input type="number" className="w-full bg-black border border-white/10 p-2 text-white" 
                                value={dimensions.dim1 || ''} onChange={e => setDimensions({...dimensions, dim1: parseFloat(e.target.value)})} />
                        </div>
                        <div className="sm:col-span-2">
                            <label className="block text-xs uppercase text-zinc-500 mb-2">Largo (mm)</label>
                            <input type="number" className="w-full bg-black border border-white/10 p-2 text-white" 
                                value={dimensions.length || ''} onChange={e => setDimensions({...dimensions, length: parseFloat(e.target.value)})} />
                        </div>
                    </>
                )}
                {shape === 'hollow' && (
                    <>
                        <div>
                            <label className="block text-xs uppercase text-zinc-500 mb-2">Diám. Exterior (mm)</label>
                            <input type="number" className="w-full bg-black border border-white/10 p-2 text-white" 
                                value={dimensions.dim1 || ''} onChange={e => setDimensions({...dimensions, dim1: parseFloat(e.target.value)})} />
                        </div>
                        <div>
                            <label className="block text-xs uppercase text-zinc-500 mb-2">Diám. Interior (mm)</label>
                            <input type="number" className="w-full bg-black border border-white/10 p-2 text-white" 
                                value={dimensions.dim2 || ''} onChange={e => setDimensions({...dimensions, dim2: parseFloat(e.target.value)})} />
                        </div>
                        <div>
                            <label className="block text-xs uppercase text-zinc-500 mb-2">Largo (mm)</label>
                            <input type="number" className="w-full bg-black border border-white/10 p-2 text-white" 
                                value={dimensions.length || ''} onChange={e => setDimensions({...dimensions, length: parseFloat(e.target.value)})} />
                        </div>
                    </>
                )}
                {shape === 'plate' && (
                    <>
                         <div>
                            <label className="block text-xs uppercase text-zinc-500 mb-2">Espesor (mm)</label>
                            <input type="number" className="w-full bg-black border border-white/10 p-2 text-white" 
                                value={dimensions.dim1 || ''} onChange={e => setDimensions({...dimensions, dim1: parseFloat(e.target.value)})} />
                        </div>
                        <div>
                            <label className="block text-xs uppercase text-zinc-500 mb-2">Ancho (mm)</label>
                            <input type="number" className="w-full bg-black border border-white/10 p-2 text-white" 
                                value={dimensions.dim2 || ''} onChange={e => setDimensions({...dimensions, dim2: parseFloat(e.target.value)})} />
                        </div>
                        <div>
                            <label className="block text-xs uppercase text-zinc-500 mb-2">Largo (mm)</label>
                            <input type="number" className="w-full bg-black border border-white/10 p-2 text-white" 
                                value={dimensions.length || ''} onChange={e => setDimensions({...dimensions, length: parseFloat(e.target.value)})} />
                        </div>
                    </>
                )}
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
                        <span className="text-xs font-bold uppercase tracking-widest text-yellow-500">Herramienta Técnica</span>
                    </div>
                    <h1 className="text-3xl sm:text-5xl font-black text-white uppercase tracking-tighter mb-4">
                        Calculadora <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-yellow-200">Industrial</span>
                    </h1>
                    <p className="text-zinc-400 max-w-2xl mx-auto">
                        Estime peso y volumen de materiales industriales con precisión de ingeniería. 
                        SteelPro no vende kilos, vende certeza.
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
                            Validación de Usuario
                        </h2>
                        <div className="space-y-6">
                            <div>
                                <label className="block text-xs font-bold uppercase text-zinc-500 mb-1">Nombre Completo *</label>
                                <input 
                                    type="text" 
                                    className={`w-full bg-black border ${userErrors.name ? 'border-red-500' : 'border-white/10'} p-3 text-white focus:border-yellow-500 outline-none`}
                                    value={userData.name}
                                    onChange={e => setUserData({...userData, name: e.target.value})}
                                />
                                {userErrors.name && <p className="text-red-500 text-xs mt-1">{userErrors.name}</p>}
                            </div>
                            
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-xs font-bold uppercase text-zinc-500 mb-1">Email Corporativo *</label>
                                    <input 
                                        type="email" 
                                        className={`w-full bg-black border ${userErrors.email ? 'border-red-500' : 'border-white/10'} p-3 text-white focus:border-yellow-500 outline-none`}
                                        value={userData.email}
                                        onChange={e => setUserData({...userData, email: e.target.value})}
                                    />
                                    {userErrors.email && <p className="text-red-500 text-xs mt-1">{userErrors.email}</p>}
                                </div>
                                <div>
                                    <label className="block text-xs font-bold uppercase text-zinc-500 mb-1">Empresa *</label>
                                    <input 
                                        type="text" 
                                        className={`w-full bg-black border ${userErrors.company ? 'border-red-500' : 'border-white/10'} p-3 text-white focus:border-yellow-500 outline-none`}
                                        value={userData.company}
                                        onChange={e => setUserData({...userData, company: e.target.value})}
                                    />
                                    {userErrors.company && <p className="text-red-500 text-xs mt-1">{userErrors.company}</p>}
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-xs font-bold uppercase text-zinc-500 mb-1">Ciudad y País *</label>
                                    <input 
                                        type="text" 
                                        className={`w-full bg-black border ${userErrors.location ? 'border-red-500' : 'border-white/10'} p-3 text-white focus:border-yellow-500 outline-none`}
                                        value={userData.location}
                                        onChange={e => setUserData({...userData, location: e.target.value})}
                                    />
                                    {userErrors.location && <p className="text-red-500 text-xs mt-1">{userErrors.location}</p>}
                                </div>
                                <div>
                                    <label className="block text-xs font-bold uppercase text-zinc-500 mb-1">Uso del Material *</label>
                                    <select 
                                        className={`w-full bg-black border ${userErrors.usage ? 'border-red-500' : 'border-white/10'} p-3 text-white focus:border-yellow-500 outline-none`}
                                        value={userData.usage}
                                        onChange={e => setUserData({...userData, usage: e.target.value})}
                                    >
                                        <option value="">Seleccione...</option>
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
                                Iniciar Protocolo de Cálculo
                            </button>
                        </div>
                    </div>
                )}

                {/* STEP 2: CONFIGURATION */}
                {step === 2 && (
                    <div className="bg-zinc-950 border border-white/5 rounded-sm p-6 sm:p-10 animate-fade-in">
                        <div className="mb-8 border-b border-white/10 pb-4 flex justify-between items-center">
                            <h2 className="text-xl font-bold text-white uppercase">Configuración Técnica</h2>
                            <span className="text-xs text-zinc-500">Sesión: {userData.company.toUpperCase()}</span>
                        </div>

                        {/* Material Grid */}
                        <div className="mb-8">
                            <label className="block text-xs font-bold uppercase text-zinc-500 mb-3">1. Seleccione Material</label>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                {MATERIAL_OPTIONS.map(opt => (
                                    <button
                                        key={opt.id}
                                        onClick={() => setMaterial(opt.id)}
                                        className={`p-4 border ${material === opt.id ? 'border-yellow-500 opacity-100 ring-1 ring-yellow-500' : 'border-white/10 opacity-60 hover:opacity-100'} rounded-sm transition-all flex flex-col items-center gap-2 ${opt.class}`}
                                    >
                                        <CubeTransparentIcon className="h-6 w-6 text-white" />
                                        <span className="text-sm font-bold text-white uppercase">{opt.name}</span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Shape Grid */}
                         <div className="mb-8">
                            <label className="block text-xs font-bold uppercase text-zinc-500 mb-3">2. Seleccione Geometría</label>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                {SHAPE_OPTIONS.map(opt => (
                                    <button
                                        key={opt.id}
                                        onClick={() => setShape(opt.id)}
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

                        <div className="mt-8 flex justify-end">
                            <button
                                onClick={handleCalculate}
                                disabled={!material || !shape || dimensions.length === 0}
                                className="bg-yellow-500 text-black font-bold uppercase px-8 py-3 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-yellow-400 transition-colors"
                            >
                                Calcular Peso
                            </button>
                        </div>
                    </div>
                )}

                {/* STEP 3: RESULTS */}
                {step === 3 && result && (
                    <div className="max-w-xl mx-auto animate-fade-in">
                        <div className="bg-zinc-900 border border-yellow-500 rounded-sm overflow-hidden shadow-[0_0_50px_rgba(234,179,8,0.1)]">
                            <div className="bg-yellow-500 p-4 text-center">
                                <h3 className="text-black font-black uppercase text-xl tracking-wider">Resultado del Cálculo</h3>
                            </div>
                            <div className="p-8">
                                <div className="grid grid-cols-2 gap-8 mb-8 border-b border-white/10 pb-8">
                                    <div className="text-center">
                                        <p className="text-xs uppercase text-zinc-500 mb-1">Material</p>
                                        <p className="text-white font-bold text-lg uppercase">{MATERIAL_OPTIONS.find(m => m.id === material)?.name}</p>
                                        <p className="text-xs text-zinc-600">Densidad: {DENSITIES[material]} kg/m³</p>
                                    </div>
                                    <div className="text-center">
                                        <p className="text-xs uppercase text-zinc-500 mb-1">Geometría</p>
                                        <p className="text-white font-bold text-lg uppercase">{SHAPE_OPTIONS.find(s => s.id === shape)?.name}</p>
                                    </div>
                                </div>

                                <div className="space-y-6">
                                    <div className="flex justify-between items-end">
                                        <span className="text-zinc-400 uppercase text-sm">Volumen Total</span>
                                        <span className="text-white font-mono text-xl">{result.volume.toFixed(6)} <span className="text-sm text-zinc-500">m³</span></span>
                                    </div>
                                    <div className="flex justify-between items-end border-t border-white/10 pt-4">
                                        <span className="text-yellow-500 font-bold uppercase text-lg">Peso Estimado</span>
                                        <span className="text-white font-black text-4xl tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-white to-yellow-200">
                                            {result.weight.toFixed(2)} <span className="text-lg text-zinc-500 font-normal">kg</span>
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
                                        Nuevo Cálculo
                                    </button>
                                    <a 
                                        href="#contact"
                                        className="w-full bg-yellow-500 text-black font-bold uppercase py-3 hover:bg-yellow-400 transition-colors text-xs flex items-center justify-center"
                                    >
                                        Solicitar Material
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

            </div>
        </div>
    );
};

export default CalculatorPage;