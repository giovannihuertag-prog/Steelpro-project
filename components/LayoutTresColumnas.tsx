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
        <div className={`mx-auto max-w-[1920px] px-4 lg:px-6 min-h-[600px] py-8 ${className}`}>
            <style>{`
                .scrollbar-hide::-webkit-scrollbar {
                    display: none;
                }
                .scrollbar-hide {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
                .fade-mask-y {
                    mask-image: linear-gradient(to bottom, transparent, black 20px, black 90%, transparent);
                    -webkit-mask-image: linear-gradient(to bottom, transparent, black 20px, black 90%, transparent);
                }
            `}</style>

            <div className="flex flex-col xl:flex-row gap-6 relative items-start">
                
                {/* COLUMNA IZQUIERDA: Contexto Técnico (18-20%) */}
                {/* Orden 2 en móvil (debajo del contenido), Orden 1 en Desktop */}
                <aside className="w-full xl:w-[20%] xl:min-w-[260px] order-2 xl:order-1 flex flex-col gap-4">
                    {leftSidebar && (
                        <div className="xl:sticky xl:top-32 xl:max-h-[calc(100vh-140px)] overflow-y-auto scrollbar-hide fade-mask-y py-2 transition-all duration-300">
                            {leftSidebar}
                        </div>
                    )}
                </aside>

                {/* COLUMNA CENTRAL: Catálogo Activo (60-64%) */}
                {/* Orden 1 en móvil (primero), Orden 2 en Desktop */}
                <main className="flex-1 w-full xl:w-[60%] min-w-0 order-1 xl:order-2 animate-fade-in px-0 xl:px-2">
                    {children}
                </main>

                {/* COLUMNA DERECHA: Exploración (18-20%) */}
                {/* Orden 3 en móvil */}
                <aside className="w-full xl:w-[20%] xl:min-w-[260px] order-3 flex flex-col gap-4">
                    {rightSidebar && (
                        <div className="xl:sticky xl:top-32 xl:max-h-[calc(100vh-140px)] overflow-y-auto scrollbar-hide fade-mask-y py-2 transition-all duration-300">
                            {rightSidebar}
                        </div>
                    )}
                </aside>

            </div>
        </div>
    );
};

export default LayoutTresColumnas;