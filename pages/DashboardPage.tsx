import React, { useState, useEffect } from 'react';

// Mock Data
const leadsData = [
    { id: 'LD-4029', client: 'Constructora del Bajío', project: 'Torre Q7001', value: '$450,000 USD', status: 'Negociación', date: '12 Oct 2024' },
    { id: 'LD-4030', client: 'Minería San Xavier', project: 'Flota Excavación', value: '$1.2M USD', status: 'Cierre', date: '11 Oct 2024' },
    { id: 'LD-4031', client: 'Aceros de México', project: 'Suministro 1045T', value: '$85,000 USD', status: 'Nuevo', date: '11 Oct 2024' },
    { id: 'LD-4032', client: 'Grupo Indi', project: 'Planta de Concreto', value: '$120,000 USD', status: 'Seguimiento', date: '10 Oct 2024' },
    { id: 'LD-4033', client: 'Desarrollos Verticales', project: 'Bombas Estacionarias', value: '$65,000 USD', status: 'Nuevo', date: '09 Oct 2024' },
];

const getStatusColor = (status: string) => {
    switch (status) {
        case 'Nuevo': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
        case 'Seguimiento': return 'bg-yellow-500/20 text-yellow-500 border-yellow-500/30';
        case 'Negociación': return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
        case 'Cierre': return 'bg-green-500/20 text-green-400 border-green-500/30';
        default: return 'bg-zinc-500/20 text-zinc-400';
    }
};

const DashboardPage: React.FC = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    // Mock Login Function
    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if (password === 'admin' || password === 'steelpro') {
            setIsAuthenticated(true);
        } else {
            setError('Credenciales inválidas');
        }
    };

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen bg-zinc-950 flex items-center justify-center px-4">
                <div className="w-full max-w-md p-8 bg-zinc-900 border border-white/5 rounded-sm shadow-2xl">
                    <div className="text-center mb-8">
                        <h1 className="text-2xl font-black text-white uppercase italic mb-2 flex items-center justify-center gap-1">
                            <span className="material-symbols-outlined text-yellow-500">construction</span>
                            STEEL<span className="text-yellow-500">PRO</span>
                        </h1>
                        <p className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Acceso Corporativo</p>
                    </div>
                    <form onSubmit={handleLogin} className="space-y-6">
                        <div>
                            <label className="block text-xs font-bold text-zinc-400 uppercase mb-2">Contraseña de Acceso</label>
                            <input 
                                type="password" 
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full bg-black border border-white/10 text-white px-4 py-3 focus:border-yellow-500 focus:outline-none transition-colors"
                                placeholder="••••••••"
                            />
                        </div>
                        {error && <p className="text-red-500 text-xs text-center">{error}</p>}
                        <button type="submit" className="w-full bg-yellow-500 text-black font-bold uppercase py-3 hover:bg-yellow-400 transition-colors">
                            Ingresar al Dashboard
                        </button>
                    </form>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-zinc-950 pt-24 pb-12 animate-fade-in">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                
                {/* Dashboard Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 pb-6 border-b border-white/5">
                    <div>
                        <h1 className="text-3xl font-black text-white uppercase tracking-tight">Panel Ejecutivo</h1>
                        <p className="text-zinc-500 text-sm mt-1">Visión general del rendimiento comercial</p>
                    </div>
                    <div className="mt-4 md:mt-0 flex gap-4">
                        <div className="bg-zinc-900 border border-white/10 px-4 py-2 rounded-sm text-right">
                            <p className="text-xs text-zinc-500 uppercase">Leads Activos</p>
                            <p className="text-xl font-bold text-white">24</p>
                        </div>
                        <div className="bg-zinc-900 border border-white/10 px-4 py-2 rounded-sm text-right">
                            <p className="text-xs text-zinc-500 uppercase">Proyección Q4</p>
                            <p className="text-xl font-bold text-yellow-500">$2.4M</p>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
                    
                    {/* CHART 1: Quotes per Period (Bar Chart) */}
                    <div className="bg-zinc-900 border border-white/5 p-6 rounded-sm">
                        <h3 className="text-sm font-bold text-white uppercase mb-6 flex items-center gap-2">
                            <span className="material-symbols-outlined text-yellow-500 text-base">bar_chart</span>
                            Cotizaciones (6 Meses)
                        </h3>
                        <div className="h-48 flex items-end justify-between gap-2">
                            {[45, 60, 35, 80, 70, 95].map((h, i) => (
                                <div key={i} className="w-full flex flex-col items-center gap-2 group">
                                    <div className="relative w-full bg-zinc-800 rounded-sm overflow-hidden h-full flex items-end">
                                        <div 
                                            style={{ height: `${h}%` }} 
                                            className="w-full bg-yellow-500/80 hover:bg-yellow-500 transition-all duration-500 group-hover:shadow-[0_0_15px_rgba(234,179,8,0.3)]"
                                        ></div>
                                    </div>
                                    <span className="text-[10px] text-zinc-500 uppercase">{['May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct'][i]}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* CHART 2: Sales Funnel */}
                    <div className="bg-zinc-900 border border-white/5 p-6 rounded-sm">
                        <h3 className="text-sm font-bold text-white uppercase mb-6 flex items-center gap-2">
                            <span className="material-symbols-outlined text-yellow-500 text-base">filter_alt</span>
                            Embudo Comercial
                        </h3>
                        <div className="space-y-4">
                            {[
                                { label: 'Contactados', count: 120, w: '100%', c: 'bg-zinc-700' },
                                { label: 'Interesados', count: 85, w: '75%', c: 'bg-yellow-500/50' },
                                { label: 'Cotización', count: 45, w: '50%', c: 'bg-orange-500/50' },
                                { label: 'Negociación', count: 18, w: '30%', c: 'bg-red-500/50' },
                                { label: 'Cerrados', count: 8, w: '15%', c: 'bg-green-500/50' },
                            ].map((stage, i) => (
                                <div key={i} className="relative group">
                                    <div className="flex justify-between text-xs text-zinc-400 mb-1 z-10 relative">
                                        <span>{stage.label}</span>
                                        <span className="font-bold text-white">{stage.count}</span>
                                    </div>
                                    <div className="h-6 w-full bg-black/50 rounded-sm overflow-hidden relative">
                                        <div style={{ width: stage.w }} className={`h-full ${stage.c} transition-all duration-700 group-hover:brightness-125`}></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* CHART 3: Product Demand (Horizontal Bars) */}
                    <div className="bg-zinc-900 border border-white/5 p-6 rounded-sm">
                        <h3 className="text-sm font-bold text-white uppercase mb-6 flex items-center gap-2">
                            <span className="material-symbols-outlined text-yellow-500 text-base">pie_chart</span>
                            Demanda por Producto
                        </h3>
                        <div className="space-y-5">
                            {[
                                { name: 'Bombas de Concreto', val: 35 },
                                { name: 'Excavadoras Oruga', val: 28 },
                                { name: 'Acero 1045T', val: 22 },
                                { name: 'Plantas Dosificadoras', val: 15 },
                            ].map((p, i) => (
                                <div key={i}>
                                    <div className="flex justify-between text-xs mb-1">
                                        <span className="text-zinc-300">{p.name}</span>
                                        <span className="text-yellow-500 font-bold">{p.val}%</span>
                                    </div>
                                    <div className="h-2 w-full bg-zinc-800 rounded-full overflow-hidden">
                                        <div style={{ width: `${p.val}%` }} className="h-full bg-white transition-all duration-1000"></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>

                {/* DATA TABLE: Leads */}
                <div className="bg-zinc-900 border border-white/5 rounded-sm overflow-hidden">
                    <div className="p-6 border-b border-white/5 flex justify-between items-center bg-zinc-900">
                        <h3 className="text-sm font-bold text-white uppercase">Últimos Leads Recibidos</h3>
                        <button className="text-xs text-yellow-500 hover:text-white uppercase font-bold transition-colors">Ver Todo</button>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-black/20 text-xs uppercase text-zinc-500 font-bold">
                                <tr>
                                    <th className="px-6 py-4">ID Lead</th>
                                    <th className="px-6 py-4">Cliente / Empresa</th>
                                    <th className="px-6 py-4">Proyecto Interés</th>
                                    <th className="px-6 py-4">Valor Est.</th>
                                    <th className="px-6 py-4">Estado</th>
                                    <th className="px-6 py-4">Fecha</th>
                                    <th className="px-6 py-4">Acción</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5 text-sm text-zinc-300">
                                {leadsData.map((lead) => (
                                    <tr key={lead.id} className="hover:bg-white/5 transition-colors">
                                        <td className="px-6 py-4 font-mono text-xs text-zinc-500">{lead.id}</td>
                                        <td className="px-6 py-4 font-bold text-white">{lead.client}</td>
                                        <td className="px-6 py-4">{lead.project}</td>
                                        <td className="px-6 py-4 text-zinc-400">{lead.value}</td>
                                        <td className="px-6 py-4">
                                            <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase border ${getStatusColor(lead.status)}`}>
                                                {lead.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-zinc-500 text-xs">{lead.date}</td>
                                        <td className="px-6 py-4">
                                            <button className="text-yellow-500 hover:text-white transition-colors">
                                                <span className="material-symbols-outlined text-lg">edit_square</span>
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default DashboardPage;