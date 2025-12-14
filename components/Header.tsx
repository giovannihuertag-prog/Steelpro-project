import React, { useState, useRef, useEffect } from 'react';

// Sub-menu for Machinery
const machineryLinks = [
    { name: 'Construcción', href: '#solutions/construction', description: 'Bombas y mezcladoras DASWELL.' },
    { name: 'Ingeniería', href: '#solutions/engineering', description: 'Excavación y carga pesada.' },
];

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMachineryOpen, setIsMachineryOpen] = useState(false);
  const machineryRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
        if (machineryRef.current && !machineryRef.current.contains(event.target as Node)) {
            setIsMachineryOpen(false);
        }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
        document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [machineryRef]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-zinc-950/95 backdrop-blur-md border-b border-white/5">
      <nav className="flex items-center justify-between p-4 lg:px-8 max-w-7xl mx-auto" aria-label="Global">
        
        {/* Logo */}
        <div className="flex lg:flex-1">
          <a href="#" className="-m-1.5 p-1.5 text-2xl font-black tracking-tighter text-white uppercase italic">
            STEEL<span className="text-yellow-500">PRO</span>
          </a>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-zinc-300"
            onClick={() => setIsMenuOpen(true)}
          >
            <span className="sr-only">Abrir menú</span>
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
          </button>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex lg:gap-x-8 items-center">
          <a href="#" className="text-sm font-semibold leading-6 text-zinc-300 hover:text-white uppercase tracking-wide">Inicio</a>
          <a href="#solutions" className="text-sm font-semibold leading-6 text-zinc-300 hover:text-white uppercase tracking-wide">Soluciones</a>
          
          {/* Machinery Dropdown */}
          <div className="relative" ref={machineryRef}>
            <button
              onClick={() => setIsMachineryOpen(!isMachineryOpen)}
              className="flex items-center gap-x-1 text-sm font-semibold leading-6 text-zinc-300 hover:text-white uppercase tracking-wide focus:outline-none"
            >
              Maquinaria
              <svg className={`h-4 w-4 transition-transform ${isMachineryOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
              </svg>
            </button>
            
            <div className={`absolute -left-4 top-full z-10 mt-3 w-64 overflow-hidden rounded-sm bg-zinc-900 shadow-2xl ring-1 ring-white/10 transition-all duration-200 ${isMachineryOpen ? 'opacity-100 translate-y-0 visible' : 'opacity-0 translate-y-2 invisible'}`}>
              <div className="p-2">
                {machineryLinks.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    onClick={() => setIsMachineryOpen(false)}
                    className="block rounded-sm px-4 py-3 text-sm font-semibold text-white hover:bg-white/5 hover:text-yellow-500 transition-colors"
                  >
                    <div className="uppercase">{item.name}</div>
                    <div className="text-xs text-zinc-500 font-normal normal-case mt-0.5">{item.description}</div>
                  </a>
                ))}
              </div>
            </div>
          </div>

          <a href="#solutions/steel-tech" className="text-sm font-semibold leading-6 text-zinc-300 hover:text-white uppercase tracking-wide">Aceros Industriales</a>
          <a href="#" className="text-sm font-semibold leading-6 text-zinc-300 hover:text-white uppercase tracking-wide">Aliados</a>
          <a href="#" className="text-sm font-semibold leading-6 text-zinc-300 hover:text-white uppercase tracking-wide">Nosotros</a>
          <a href="#" className="text-sm font-semibold leading-6 text-zinc-300 hover:text-white uppercase tracking-wide">Ayuda / Contacto</a>
        </div>

        {/* CTA Button */}
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <a href="#contact" className="text-sm font-bold leading-6 text-black bg-yellow-500 hover:bg-yellow-400 px-6 py-2.5 transition-all uppercase tracking-wider skew-x-[-10deg]">
            <span className="block skew-x-[10deg]">Cotiza Ahora</span>
          </a>
        </div>
      </nav>
      
      {/* Mobile Menu */}
      <div className={`lg:hidden fixed inset-0 z-50 ${isMenuOpen ? '' : 'pointer-events-none'}`}>
          <div className={`fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity ${isMenuOpen ? 'opacity-100' : 'opacity-0'}`} onClick={() => setIsMenuOpen(false)} />
          <div className={`fixed inset-y-0 right-0 z-50 w-full max-w-sm bg-zinc-950 px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-white/10 transition-transform ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
            <div className="flex items-center justify-between">
              <a href="#" className="-m-1.5 p-1.5 text-2xl font-black italic text-white uppercase">
                STEEL<span className="text-yellow-500">PRO</span>
              </a>
              <button
                type="button"
                className="-m-2.5 rounded-md p-2.5 text-zinc-400"
                onClick={() => setIsMenuOpen(false)}
              >
                <span className="sr-only">Cerrar menú</span>
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-white/10">
                <div className="space-y-2 py-6">
                  <a href="#" onClick={() => setIsMenuOpen(false)} className="-mx-3 block px-3 py-2 text-base font-semibold leading-7 text-white hover:bg-white/5 uppercase">Inicio</a>
                  <a href="#solutions" onClick={() => setIsMenuOpen(false)} className="-mx-3 block px-3 py-2 text-base font-semibold leading-7 text-white hover:bg-white/5 uppercase">Soluciones</a>
                  
                  <div className="py-2">
                    <p className="px-3 text-xs font-bold text-yellow-500 uppercase tracking-widest mb-2">Maquinaria</p>
                    {machineryLinks.map((item) => (
                         <a key={item.name} href={item.href} onClick={() => setIsMenuOpen(false)} className="-mx-3 block px-3 py-2 text-base font-semibold leading-7 text-zinc-300 hover:text-white pl-6 uppercase">
                            {item.name}
                         </a>
                    ))}
                  </div>

                  <a href="#solutions/steel-tech" onClick={() => setIsMenuOpen(false)} className="-mx-3 block px-3 py-2 text-base font-semibold leading-7 text-white hover:bg-white/5 uppercase">Aceros Industriales</a>
                  <a href="#" onClick={() => setIsMenuOpen(false)} className="-mx-3 block px-3 py-2 text-base font-semibold leading-7 text-white hover:bg-white/5 uppercase">Aliados</a>
                  <a href="#" onClick={() => setIsMenuOpen(false)} className="-mx-3 block px-3 py-2 text-base font-semibold leading-7 text-white hover:bg-white/5 uppercase">Nosotros</a>
                  <a href="#" onClick={() => setIsMenuOpen(false)} className="-mx-3 block px-3 py-2 text-base font-semibold leading-7 text-white hover:bg-white/5 uppercase">Ayuda / Contacto</a>
                </div>
                <div className="py-6">
                  <a href="#contact" onClick={() => setIsMenuOpen(false)} className="block w-full text-center bg-yellow-500 px-3 py-2.5 text-base font-bold text-black uppercase hover:bg-yellow-400">Cotiza Ahora</a>
                </div>
              </div>
            </div>
          </div>
      </div>
    </header>
  );
};

export default Header;