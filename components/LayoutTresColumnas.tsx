import React from 'react';

interface LayoutTresColumnasProps {
    children: React.ReactNode;
    leftSidebar?: React.ReactNode;
    rightSidebar?: React.ReactNode;
    className?: string;
}

const LayoutTresColumnas: React.FC<LayoutTresColumnasProps> = ({ 
    children, 
    leftSidebar, 
    rightSidebar,
    className = ""
}) => {
    return (
        <div className={`mx-auto max-w-[1920px] px-4 lg:px-8 min-h-[600px] py-8 ${className}`}>
            <style>{`
                .scrollbar-technical::-webkit-scrollbar { width: 4px; }
                .scrollbar-technical::-webkit-scrollbar-track { background: #09090b; }
                .scrollbar-technical::-webkit-scrollbar-thumb { background: #27272a; border-radius: 0; }
                .scrollbar-technical::-webkit-scrollbar-thumb:hover { background: #eab308; }
            `}</style>

            <div className="flex flex-col xl:flex-row gap-8 relative items-start">
                
                {/* COLUMNA IZQUIERDA: Contexto Técnico */}
                {/* Sticky posicionada debajo del sub-nav (aprox 140px) */}
                {leftSidebar && (
                    <aside className="hidden xl:block w-72 shrink-0 sticky top-36 h-[calc(100vh-10rem)] overflow-y-auto scrollbar-technical border-r border-white/5 pr-4 transition-all duration-300">
                        {leftSidebar}
                    </aside>
                )}

                {/* COLUMNA CENTRAL: Catálogo Activo */}
                <main className="flex-1 w-full min-w-0 animate-fade-in">
                    {children}
                </main>

                {/* COLUMNA DERECHA: Exploración */}
                {rightSidebar && (
                    <aside className="hidden xl:block w-72 shrink-0 sticky top-36 h-[calc(100vh-10rem)] overflow-y-auto scrollbar-technical border-l border-white/5 pl-4 transition-all duration-300">
                        {rightSidebar}
                    </aside>
                )}

            </div>
        </div>
    );
};

export default LayoutTresColumnas;