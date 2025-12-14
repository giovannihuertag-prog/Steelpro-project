import React from 'react';
import {
    AnalysisIcon,
    AutomationIcon,
    TraceabilityIcon,
    VisualizationIcon,
    ServerStackIcon,
    CubeTransparentIcon,
    ShieldCheckIcon
} from '../components/Icons';

export interface Solution {
    id: string;
    category: 'construction' | 'engineering' | 'steel';
    brand?: string;
    name: string;
    icon: React.FC<React.SVGProps<SVGSVGElement>>;
    description: string;
    shortDescription: string;
    features: string[];
    imageUrl: string;
    imageAlt: string;
    gallery?: string[];
}

export const solutions: Solution[] = [
    // --- SECCIÓN A: MAQUINARIA PARA CONSTRUCCIÓN ---
    {
        id: 'concrete-mixer-pump',
        category: 'construction',
        brand: 'DASWELL',
        name: 'Bomba Mezcladora de Concreto',
        icon: AutomationIcon,
        description: 'Unidad híbrida que integra mezclado forzado de doble eje y bombeo de alta presión en un solo chasis monobloque. Diseñada específicamente para optimizar la logística en obras de edificación vertical y túneles de sección media, eliminando la necesidad de plantas externas.',
        shortDescription: 'Sistema integrado de mezcla y bombeo vertical.',
        features: [
            'Capacidad de Bombeo: 30 - 40 m³/h',
            'Presión de Salida: 10 MPa (Alta Presión)',
            'Alcance: 120m Vertical / 300m Horizontal',
            'Motorización: Diesel Cummins o Eléctrico 380V'
        ],
        imageUrl: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?q=80&w=2940&auto=format&fit=crop',
        imageAlt: 'Bomba mezcladora de concreto en operación',
    },
    {
        id: 'self-loading-mixer',
        category: 'construction',
        brand: 'DASWELL',
        name: 'Mezclador Autocargable 4x4',
        icon: CubeTransparentIcon,
        description: 'Planta de concreto móvil con tracción integral 4x4 y chasis articulado. Permite la carga de áridos, dosificación de cemento, mezcla y vertido en cualquier punto del terreno. Es la solución definitiva para proyectos de infraestructura vial remota o cimentaciones en terrenos agrestes.',
        shortDescription: 'Planta móvil 4x4 con autonomía total.',
        features: [
            'Producción por Batch: 1.6m³ - 4.0m³',
            'Rotación de Tambor: 270° para descarga lateral',
            'Tracción: 4WD con dirección tipo cangrejo',
            'Sistema de Pesaje: Electrónico de alta precisión'
        ],
        imageUrl: 'https://images.unsplash.com/photo-1632759145351-1d592919f522?q=80&w=2940&auto=format&fit=crop',
        imageAlt: 'Mezclador autocargable en terreno difícil',
    },
    {
        id: 'trailer-pump',
        category: 'construction',
        brand: 'DASWELL',
        name: 'Bomba Estacionaria de Arrastre',
        icon: VisualizationIcon,
        description: 'Equipo de bombeo de alto caudal diseñado para operaciones continuas de larga distancia. Incorpora válvulas S-tube de aleación de manganeso y un sistema hidráulico de circuito abierto que garantiza una disipación térmica eficiente en climas extremos.',
        shortDescription: 'Bombeo estacionario de largo alcance.',
        features: [
            'Rendimiento Teórico: 40 - 90 m³/h',
            'Distancia Máxima: 800m Horizontal / 200m Vertical',
            'Motor: Diesel Deutz/Cummins o Eléctrico',
            'Sistema Hidráulico: Kawasaki (Japón)'
        ],
        imageUrl: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=2969&auto=format&fit=crop',
        imageAlt: 'Bomba de concreto estacionaria industrial',
    },
    {
        id: 'dry-concrete-plant',
        category: 'construction',
        brand: 'DASWELL',
        name: 'Planta Dosificadora Seca',
        icon: TraceabilityIcon,
        description: 'Sistema modular de dosificación de agregados y cemento sin mezcladora central. La mezcla húmeda se realiza en el camión mixer durante el tránsito, lo que la hace ideal para proyectos que requieren distancias de transporte medias y alta velocidad de despacho.',
        shortDescription: 'Dosificación rápida para carga de camiones mixer.',
        features: [
            'Capacidad: 60 - 120 m³/h',
            'Instalación: Diseño modular de rápido despliegue',
            'Control: Sistema SCADA totalmente automático',
            'Precisión: Celdas de carga IP67'
        ],
        imageUrl: 'https://images.unsplash.com/photo-1660566365851-75468205f20a?q=80&w=2940&auto=format&fit=crop',
        imageAlt: 'Planta de concreto tipo seca',
    },

    // --- SECCIÓN B: MAQUINARIA DE INGENIERÍA ---
    {
        id: 'crawler-excavator',
        category: 'engineering',
        brand: 'DASWELL',
        name: 'Excavadora de Orugas Serie E',
        icon: AnalysisIcon,
        description: 'Máquina de alto tonelaje diseñada para minería a cielo abierto y excavación masiva. Equipada con motores Isuzu de bajo consumo y un brazo reforzado con acero de alta tensión para soportar ciclos de trabajo severos en roca dura.',
        shortDescription: 'Excavación pesada y minería.',
        features: [
            'Peso Operativo: 22T - 36T',
            'Capacidad de Cucharón: 1.0 - 1.8 m³',
            'Profundidad de Excavación: 6.5 - 7.5 m',
            'Cabina: ROPS/FOPS con climatización'
        ],
        imageUrl: 'https://images.unsplash.com/photo-1541625602330-2277a4c46182?q=80&w=2940&auto=format&fit=crop',
        imageAlt: 'Excavadora de orugas en operación minera',
    },
    {
        id: 'wheel-loader',
        category: 'engineering',
        brand: 'DASWELL',
        name: 'Cargador Frontal Articulado',
        icon: ServerStackIcon,
        description: 'Cargador sobre neumáticos con cinemática en Z para máxima fuerza de arranque. Ideal para plantas de agregados y movimiento de tierras. Su transmisión Powershift asegura ciclos de carga y descarga fluidos y rápidos.',
        shortDescription: 'Carga eficiente de áridos y graneles.',
        features: [
            'Carga Nominal: 3000kg - 6000kg',
            'Capacidad de Cuchara: 1.8 - 4.5 m³',
            'Altura de Descarga: > 3100 mm',
            'Motor: Weichai / Cummins Tier 3'
        ],
        imageUrl: 'https://images.unsplash.com/photo-1579567761406-4684ee0c75b6?q=80&w=2787&auto=format&fit=crop',
        imageAlt: 'Cargador frontal articulado',
    },
    {
        id: 'backhoe-loader',
        category: 'engineering',
        brand: 'DASWELL',
        name: 'Retroexcavadora 4x4',
        icon: CubeTransparentIcon,
        description: 'La máquina más versátil para infraestructura urbana y servicios públicos. Combina la capacidad de carga frontal con la precisión de excavación trasera. Estabilizadores hidráulicos verticales para operación en espacios confinados.',
        shortDescription: 'Versatilidad urbana: Carga y excavación.',
        features: [
            'Potencia: 70kW (95 HP) Turbo',
            'Tracción: 4WD conectable',
            'Cuchara Frontal: 1.0 m³ (4 en 1 opcional)',
            'Profundidad Excavación: 4.4 m'
        ],
        imageUrl: 'https://images.unsplash.com/photo-1519000078018-8f81e3ad8149?q=80&w=2940&auto=format&fit=crop',
        imageAlt: 'Retroexcavadora en obra civil',
    },
    {
        id: 'mobile-crushing-plant',
        category: 'engineering',
        brand: 'DASWELL',
        name: 'Planta de Trituración Móvil',
        icon: ServerStackIcon,
        description: 'Unidad autónoma de trituración y cribado montada sobre orugas o neumáticos. Permite procesar material in-situ, reduciendo costos de transporte en canteras y proyectos de demolición. Configurable con trituradora de mandíbula o cono.',
        shortDescription: 'Trituración y cribado portátil.',
        features: [
            'Capacidad: 80 - 450 TPH',
            'Configuración: Primaria / Secundaria',
            'Alimentación: Tolva vibratoria integrada',
            'Movilidad: Chasis reforzado de transporte'
        ],
        imageUrl: 'https://images.unsplash.com/photo-1599933451563-71452df1575a?q=80&w=2940&auto=format&fit=crop',
        imageAlt: 'Planta de trituración móvil',
    },

    // --- SECCIÓN C: ACEROS Y METALES INDUSTRIALES (MATERIALES AUTORIZADOS) ---
    {
        id: 'hollow-bar-1518',
        category: 'steel',
        brand: 'GRADO MAQUINARIA',
        name: 'Acero 1518 (Barra Hueca)',
        icon: CubeTransparentIcon,
        description: 'Acero al carbono-manganeso de mecanizado optimizado. Su formato tubular sin costura reduce drásticamente los tiempos de maquinado y el desperdicio de material en la fabricación de piezas cilíndricas. Ofrece una excelente soldabilidad y cementación.',
        shortDescription: 'Barra hueca sin costura para bujes y camisas.',
        features: [
            'Grado: SAE 1518 (Bajo Carbono / Alto Manganeso)',
            'Formato: Barra Hueca sin costura',
            'Propiedades: Excelente soldabilidad y cementación',
            'Aplicaciones: Bujes, cilindros, camisas, separadores'
        ],
        imageUrl: 'https://images.unsplash.com/photo-1535930749574-1399327ce78f?q=80&w=2836&auto=format&fit=crop',
        imageAlt: 'Barra hueca de acero 1518',
    },
    {
        id: 'carbon-plate-a36',
        category: 'steel',
        brand: 'ACERO AL CARBÓN',
        name: 'Placa Estructural A36',
        icon: ServerStackIcon,
        description: 'El estándar de oro en la construcción y manufactura general. Placa de acero de bajo carbono con un equilibrio óptimo entre resistencia, conformabilidad y soldabilidad. Ideal para bases de maquinaria, placas de anclaje y estructuras soldadas.',
        shortDescription: 'Placa estructural estándar para bases y soportes.',
        features: [
            'Grado: ASTM A36',
            'Formato: Placa (Lámina caliente)',
            'Fluencia: 36,000 PSI (mínimo)',
            'Aplicaciones: Bases de equipos, estructuras, placas base'
        ],
        imageUrl: 'https://images.unsplash.com/photo-1567119782539-773df644558e?q=80&w=2940&auto=format&fit=crop',
        imageAlt: 'Placa de acero A36 industrial',
    },
    {
        id: 'cast-iron-bar',
        category: 'steel',
        brand: 'HIERRO COLADO',
        name: 'Hierro Gris y Nodular',
        icon: ShieldCheckIcon,
        description: 'Barras de fundición continua libres de porosidad. El hierro gris (Clase 40) ofrece una maquinabilidad superior y excelente amortiguación de vibraciones. El hierro nodular (65-45-12) aporta mayor ductilidad y resistencia al impacto para componentes sometidos a estrés.',
        shortDescription: 'Barra sólida de fundición continua.',
        features: [
            'Grados: Hierro Gris Clase 40 / Nodular 65-45-12',
            'Formato: Barra Sólida',
            'Ventaja: Estructura densa, grano fino, sin porosidad',
            'Aplicaciones: Poleas, volantes, guías de deslizamiento'
        ],
        imageUrl: 'https://images.unsplash.com/photo-1615818451845-93c6ae1636c7?q=80&w=2750&auto=format&fit=crop',
        imageAlt: 'Barra de hierro colado textura',
    },
    {
        id: 'stainless-series-300',
        category: 'steel',
        brand: 'INOXIDABLES SERIE 300',
        name: 'Inoxidables Austeníticos',
        icon: AnalysisIcon,
        description: 'Aceros inoxidables no magnéticos de alta resistencia a la corrosión. Ideales para la industria alimentaria, química y marina. Mantenemos stock en grados especializados para maquinabilidad (303), uso general (304) y ambientes corrosivos severos (316L).',
        shortDescription: 'Barra sólida: 303, 304, 316L.',
        features: [
            '303: Azufre añadido para maquinado rápido (fittings)',
            '304: El estándar industrial (sanitario/general)',
            '316L: Bajo carbono con Molibdeno (marino/químico)',
            'Formato: Barra Sólida (Redonda/Hexagonal)'
        ],
        imageUrl: 'https://images.unsplash.com/photo-1595843477810-53a5666df75f?q=80&w=2940&auto=format&fit=crop',
        imageAlt: 'Barras de acero inoxidable brillante',
    },
    {
        id: 'stainless-series-400',
        category: 'steel',
        brand: 'INOXIDABLES SERIE 400',
        name: 'Inoxidables Martensíticos',
        icon: ShieldCheckIcon,
        description: 'Aceros inoxidables magnéticos tratables térmicamente para alcanzar alta dureza. Seleccionados para aplicaciones que requieren resistencia al desgaste y capacidad de corte. Desde grados de fácil maquinado hasta grados de cuchillería.',
        shortDescription: 'Barra sólida: 410, 416, 420.',
        features: [
            '410: Propósito general, tratable térmicamente (bombas)',
            '416: Alta maquinabilidad (sujetadores/válvulas)',
            '420: Alta dureza "Grado Cuchillería" (moldes/herramentales)',
            'Propiedad: Magnéticos y templables'
        ],
        imageUrl: 'https://images.unsplash.com/photo-1454873019514-306478985c90?q=80&w=2940&auto=format&fit=crop',
        imageAlt: 'Piezas mecanizadas de acero serie 400',
    },
    {
        id: 'aluminum-engineering',
        category: 'steel',
        brand: 'ALUMINIO DE INGENIERÍA',
        name: 'Aluminios 6061 y 7075',
        icon: CubeTransparentIcon,
        description: 'Aleaciones ligeras de alto desempeño. El 6061 T6 es el "caballo de batalla" estructural con excelente resistencia a la corrosión. El 7075 T6 ofrece una resistencia mecánica comparable a muchos aceros, ideal para componentes aeroespaciales y de alta fatiga.',
        shortDescription: 'Grados aeroespaciales y estructurales.',
        features: [
            '6061 T6: Estructural, soldable, versátil',
            '7075 T6: Ultra-alta resistencia (Zinc como aleante)',
            'Formato: Placa y Barra Redonda',
            'Aplicaciones: Moldes de soplado, componentes robóticos'
        ],
        imageUrl: 'https://images.unsplash.com/photo-1616787687259-3a3350149021?q=80&w=2874&auto=format&fit=crop',
        imageAlt: 'Aluminio industrial mecanizado',
    },
    {
        id: 'non-ferrous-metals',
        category: 'steel',
        brand: 'METALES NO FERROSOS',
        name: 'Bronce, Cobre y Latón',
        icon: TraceabilityIcon,
        description: 'Metales rojos y amarillos seleccionados por sus propiedades de conductividad y antifricción. Materiales esenciales para transmisión eléctrica, componentes de desgaste (bujes) y aplicaciones decorativas o de valvulería.',
        shortDescription: 'Aleaciones de Cobre para conducción y desgaste.',
        features: [
            'Bronce (SAE 660/64): Alta carga, antifricción (bujes)',
            'Cobre: Electrolítico, alta conductividad térmica/eléctrica',
            'Latón: Excelente maquinabilidad (fittings/conexiones)',
            'Formato: Barras Sólidas y Bujes (Bronce)'
        ],
        imageUrl: 'https://images.unsplash.com/photo-1622340274291-766b96583925?q=80&w=2938&auto=format&fit=crop',
        imageAlt: 'Barras de cobre y bronce industrial',
    },
];

export const categoryMetaData = {
    construction: {
        title: "División Concreto",
        subtitle: "Tecnología de Bombeo y Mezclado",
        heroImage: "https://images.unsplash.com/photo-1531834685032-c34bf0d84c7c?q=80&w=2897&auto=format&fit=crop",
        description: "Soluciones de ingeniería para la producción y colocación de concreto. Desde bombas estáticas de ultra-alta presión hasta plantas móviles todo terreno, nuestros equipos están diseñados para maximizar el uptime en obra.",
        stats: [
            { label: "Presión Máxima", value: "22 MPa" },
            { label: "Alcance Vertical", value: "200m+" },
            { label: "Disponibilidad", value: "Inmediata" },
        ]
    },
    engineering: {
        title: "Maquinaria Pesada",
        subtitle: "Movimiento de Tierras y Minería",
        heroImage: "https://images.unsplash.com/photo-1610427956424-6eb905953041?q=80&w=2874&auto=format&fit=crop",
        description: "Flota de alto rendimiento para los entornos más exigentes. Nuestras excavadoras y cargadores combinan hidráulica japonesa de precisión con estructuras reforzadas para soportar ciclos de trabajo 24/7.",
        stats: [
            { label: "Capacidad Cuchara", value: "6.0 m³" },
            { label: "Peso Operativo", value: "50 Ton" },
            { label: "Motores", value: "Tier 3/4" },
        ]
    },
    steel: {
        title: "Aceros y Metales",
        subtitle: "Inventario Técnico Selecto",
        heroImage: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?q=80&w=2940&auto=format&fit=crop",
        description: "En SteelPro no saturamos con catálogos infinitos. Seleccionamos únicamente los materiales que resuelven problemas críticos de ingeniería: resistencia al desgaste, maquinabilidad optimizada y certificaciones estructurales.",
        stats: [
            { label: "Grados", value: "Certificados" },
            { label: "Inoxidables", value: "300 / 400" },
            { label: "Corte", value: "A Medida" },
        ]
    }
};