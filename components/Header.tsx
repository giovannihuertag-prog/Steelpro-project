import React, { useState, useRef, useEffect } from 'react';
import { FacebookIcon, InstagramIcon, WhatsAppIcon, CalculatorIcon } from './Icons';
import { useLanguage } from '../context/LanguageContext';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCatalogOpen, setIsCatalogOpen] = useState(false);
  const catalogRef = useRef<HTMLDivElement>(null);
  const { t, language, setLanguage } = useLanguage();

  const catalogLinks = [
      { name: 'Maquinaria: Construcción', href: '#solutions/construction', description: 'Bombas, mixers y plantas DASWELL.' },
      { name: 'Maquinaria: Ingeniería', href: '#solutions/engineering', description: 'Excavación y movimiento de tierras.' },
      { name: 'Aceros Industriales', href: '#solutions/steel', description: 'Materiales certificados y corte.' },
  ];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
        if (catalogRef.current && !catalogRef.current.contains(event.target as Node)) {
            setIsCatalogOpen(false);
        }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
        document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [catalogRef]);

  const toggleLanguage = () => {
    setLanguage(language === 'es' ? 'en' : 'es');
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-zinc-950/95 backdrop-blur-md border-b border-white/5">
      <nav className="flex items-center justify-between p-4 lg:px-8 max-w-7xl mx-auto" aria-label="Global">
        
        {/* Logo */}
        <div className="flex lg:flex-1">
          <a href="#" className="-m-1.5 p-1.5 text-2xl font-black tracking-tighter text-white uppercase italic flex items-center gap-1">
            <span className="material-symbols-outlined text-yellow-500 text-3xl">construction</span>
            STEEL<span className="text-yellow-500">PRO</span>
          </a>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex lg:hidden gap-4 items-center">
          <button 
             onClick={toggleLanguage}
             className="text-xs font-bold uppercase text-white border border-white/20 px-2 py-1 rounded-sm hover:bg-white/10"
          >
             {language === 'es' ? 'EN' : 'ES'}
          </button>
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

        {/* Desktop Navigation - Optimized Structure */}
        <div className="hidden lg:flex lg:gap-x-8 items-center">
          <a href="#" className="text-sm font-bold leading-6 text-zinc-300 hover:text-white uppercase tracking-wide transition-colors">Inicio</a>
          
          {/* Unified Catalog Dropdown */}
          <div className="relative" ref={catalogRef}>
            <button
              onClick={() => setIsCatalogOpen(!isCatalogOpen)}
              className="flex items-center gap-x-1 text-sm font-bold leading-6 text-zinc-300 hover:text-white uppercase tracking-wide focus:outline-none transition-colors"
            >
              Catálogo
              <svg className={`h-4 w-4 transition-transform ${isCatalogOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
              </svg>
            </button>
            
            <div className={`absolute -left-4 top-full z-10 mt-3 w-72 overflow-hidden rounded-sm bg-zinc-900 shadow-2xl ring-1 ring-white/10 transition-all duration-200 ${isCatalogOpen ? 'opacity-100 translate-y-0 visible' : 'opacity-0 translate-y-2 invisible'}`}>
              <div className="p-2">
                {catalogLinks.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    onClick={() => setIsCatalogOpen(false)}
                    className="block rounded-sm px-4 py-3 text-sm font-semibold text-white hover:bg-white/5 hover:text-yellow-400 transition-colors group"
                  >
                    <div className="uppercase font-bold">{item.name}</div>
                    <div className="text-xs text-zinc-500 font-normal normal-case mt-0.5 group-hover:text-zinc-400">{item.description}</div>
                  </a>
                ))}
              </div>
            </div>
          </div>

          <a href="#about" className="text-sm font-bold leading-6 text-zinc-300 hover:text-white uppercase tracking-wide transition-colors">Servicios & Soporte</a>
          
          <a href="#calculator" className="text-sm font-bold leading-6 text-yellow-500 hover:text-white uppercase tracking-wide flex items-center gap-1 transition-colors border border-yellow-500/20 bg-yellow-500/5 px-3 py-1 rounded-sm">
             <CalculatorIcon className="h-4 w-4" /> Herramientas
          </a>
        </div>

        {/* CTA Button & Language Switcher */}
        <div className="hidden lg:flex lg:flex-1 lg:justify-end lg:items-center lg:gap-4">
           {/* Language Switcher */}
           <button 
             onClick={toggleLanguage}
             className="text-xs font-bold uppercase text-zinc-500 hover:text-white px-3 py-1.5 transition-colors flex items-center gap-1"
          >
             {language === 'es' ? 'EN' : 'ES'}
          </button>

          <a href="https://wa.me/524428192172" target="_blank" rel="noopener noreferrer" className="text-zinc-400 hover:text-[#25D366] transition-colors" aria-label="WhatsApp">
            <WhatsAppIcon className="h-6 w-6" />
          </a>
          <a href="#contact" className="text-sm font-black leading-6 text-black bg-yellow-500 hover:bg-white hover:text-black px-6 py-2.5 transition-all uppercase tracking-wider skew-x-[-10deg]">
            <span className="block skew-x-[10deg]">Cotizar Ahora</span>
          </a>
        </div>
      </nav>
      
      {/* Mobile Menu */}
      <div className={`lg:hidden fixed inset-0 z-50 ${isMenuOpen ? '' : 'pointer-events-none'}`}>
          <div className={`fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity ${isMenuOpen ? 'opacity-100' : 'opacity-0'}`} onClick={() => setIsMenuOpen(false)} />
          <div className={`fixed inset-y-0 right-0 z-50 w-full max-w-sm bg-zinc-950 px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-white/10 transition-transform ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
            <div className="flex items-center justify-between">
              <a href="#" className="-m-1.5 p-1.5 text-2xl font-black italic text-white uppercase flex items-center gap-1">
                 <span className="material-symbols-outlined text-yellow-500">construction</span>
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
                  <a href="#" onClick={() => setIsMenuOpen(false)} className="-mx-3 block px-3 py-2 text-base font-bold leading-7 text-white hover:bg-white/5 uppercase">Inicio</a>
                  
                  <div className="py-2">
                    <p className="px-3 text-xs font-bold text-yellow-500 uppercase tracking-widest mb-2">Catálogo</p>
                    {catalogLinks.map((item) => (
                         <a key={item.name} href={item.href} onClick={() => setIsMenuOpen(false)} className="-mx-3 block px-3 py-2 text-sm font-semibold leading-7 text-zinc-300 hover:text-white pl-6 uppercase">
                            {item.name}
                         </a>
                    ))}
                  </div>

                  <a href="#about" onClick={() => setIsMenuOpen(false)} className="-mx-3 block px-3 py-2 text-base font-bold leading-7 text-white hover:bg-white/5 uppercase">Servicios</a>
                  <a href="#calculator" onClick={() => setIsMenuOpen(false)} className="-mx-3 block px-3 py-2 text-base font-bold leading-7 text-yellow-500 hover:bg-white/5 uppercase flex items-center gap-2">
                      <CalculatorIcon className="h-4 w-4"/> Calculadora
                  </a>
                  <a href="#contact" onClick={() => setIsMenuOpen(false)} className="-mx-3 block px-3 py-2 text-base font-bold leading-7 text-white hover:bg-white/5 uppercase">Contacto</a>
                </div>
                
                {/* Mobile Social & CTA */}
                <div className="py-6 space-y-4">
                  <div className="flex justify-center gap-6">
                      <a href="https://www.facebook.com/profile.php?id=61584829238865" target="_blank" rel="noopener noreferrer" className="text-zinc-400 hover:text-[#1877F2]">
                          <FacebookIcon className="h-6 w-6" />
                      </a>
                      <a href="https://www.instagram.com/steelpro789" target="_blank" rel="noopener noreferrer" className="text-zinc-400 hover:text-[#E4405F]">
                          <InstagramIcon className="h-6 w-6" />
                      </a>
                      <a href="https://wa.me/524428192172" target="_blank" rel="noopener noreferrer" className="text-zinc-400 hover:text-[#25D366]">
                          <WhatsAppIcon className="h-6 w-6" />
                      </a>
                  </div>
                  <a href="#contact" onClick={() => setIsMenuOpen(false)} className="block w-full text-center bg-yellow-500 px-3 py-3 text-base font-black text-black uppercase hover:bg-yellow-400">COTIZAR AHORA</a>
                </div>
              </div>
            </div>
          </div>
      </div>
    </header>
  );
};

export default Header;