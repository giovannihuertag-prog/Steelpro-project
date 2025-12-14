import React, { createContext, useState, useContext, ReactNode } from 'react';

type Language = 'es' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  es: {
    // Nav
    'nav.home': 'Inicio',
    'nav.solutions': 'Soluciones',
    'nav.machinery': 'Maquinaria',
    'nav.steel': 'Aceros',
    'nav.about': 'Nosotros',
    'nav.calculator': 'Calculadora',
    'nav.contact': 'Contacto',
    'nav.quote': 'Cotiza Ahora',
    'nav.construction': 'Construcción',
    'nav.engineering': 'Ingeniería',
    
    // Hero
    'hero.badge': 'Distribuidor Autorizado DASWELL',
    'hero.subtitle': 'Infraestructura Sólida para Proyectos Globales',
    'hero.desc': 'Suministro integral de maquinaria pesada, plantas de concreto y aceros certificados. La potencia que su obra necesita, con el respaldo técnico que usted exige.',
    'hero.catalog': 'Ver Catálogo',
    'hero.project_quote': 'Cotizar Proyecto',
    'hero.exp': 'Años de Experiencia',
    'hero.cert': 'Certificación 9001',
    'hero.support': 'Soporte Técnico',
    'hero.logistics': 'Cobertura Logística',

    // Calculator
    'calc.title': 'Calculadora de Materiales',
    'calc.subtitle': 'Estime el peso teórico de sus requerimientos de acero y metales industriales para optimizar su logística.',
    'calc.step1': 'Validación de Usuario',
    'calc.step2': 'Configuración Técnica',
    'calc.step3': 'Resultados',
    'calc.name': 'Nombre Completo',
    'calc.company': 'Empresa',
    'calc.email': 'Email Corporativo',
    'calc.location': 'Ciudad y País',
    'calc.usage': 'Uso del Material',
    'calc.select_usage': 'Seleccione...',
    'calc.btn_start': 'Iniciar Protocolo de Cálculo',
    'calc.btn_calc': 'Calcular Peso',
    'calc.select_material': '1. Seleccione Material',
    'calc.select_shape': '2. Seleccione Geometría',
    'calc.metric': 'Métrico (mm/kg)',
    'calc.imperial': 'Imperial (in/lbs)',
    'calc.result_title': 'Resultado del Cálculo',
    'calc.vol_total': 'Volumen Total',
    'calc.weight_est': 'Peso Estimado',
    'calc.new_calc': 'Nuevo Cálculo',
    'calc.req_material': 'Solicitar Material',
    'calc.diameter': 'Diámetro',
    'calc.length': 'Largo',
    'calc.side': 'Lado',
    'calc.outer_diam': 'Diám. Exterior',
    'calc.inner_diam': 'Diám. Interior',
    'calc.thickness': 'Espesor',
    'calc.width': 'Ancho',
  },
  en: {
    // Nav
    'nav.home': 'Home',
    'nav.solutions': 'Solutions',
    'nav.machinery': 'Machinery',
    'nav.steel': 'Steel',
    'nav.about': 'About Us',
    'nav.calculator': 'Calculator',
    'nav.contact': 'Contact',
    'nav.quote': 'Get Quote',
    'nav.construction': 'Construction',
    'nav.engineering': 'Engineering',

    // Hero
    'hero.badge': 'Authorized DASWELL Distributor',
    'hero.subtitle': 'Solid Infrastructure for Global Projects',
    'hero.desc': 'Integral supply of heavy machinery, concrete plants, and certified steels. The power your construction site needs, with the technical support you demand.',
    'hero.catalog': 'View Catalog',
    'hero.project_quote': 'Quote Project',
    'hero.exp': 'Years Experience',
    'hero.cert': '9001 Certification',
    'hero.support': 'Tech Support',
    'hero.logistics': 'Global Logistics',

    // Calculator
    'calc.title': 'Material Calculator',
    'calc.subtitle': 'Estimate the theoretical weight of your steel and industrial metal requirements to optimize your logistics.',
    'calc.step1': 'User Validation',
    'calc.step2': 'Technical Configuration',
    'calc.step3': 'Results',
    'calc.name': 'Full Name',
    'calc.company': 'Company',
    'calc.email': 'Corporate Email',
    'calc.location': 'City & Country',
    'calc.usage': 'Material Usage',
    'calc.select_usage': 'Select...',
    'calc.btn_start': 'Start Calculation Protocol',
    'calc.btn_calc': 'Calculate Weight',
    'calc.select_material': '1. Select Material',
    'calc.select_shape': '2. Select Geometry',
    'calc.metric': 'Metric (mm/kg)',
    'calc.imperial': 'Imperial (in/lbs)',
    'calc.result_title': 'Calculation Result',
    'calc.vol_total': 'Total Volume',
    'calc.weight_est': 'Estimated Weight',
    'calc.new_calc': 'New Calculation',
    'calc.req_material': 'Request Material',
    'calc.diameter': 'Diameter',
    'calc.length': 'Length',
    'calc.side': 'Side',
    'calc.outer_diam': 'Outer Diam.',
    'calc.inner_diam': 'Inner Diam.',
    'calc.thickness': 'Thickness',
    'calc.width': 'Width',
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('es');

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations['es']] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};