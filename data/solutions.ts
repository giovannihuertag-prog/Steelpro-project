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

    // --- SECCIÓN C: ACEROS INDUSTRIALES (NUEVA ESTRUCTURA) ---
    {
        id: 'wear-resistant-steel',
        category: 'steel',
        brand: 'STEELPRO',
        name: 'Aceros Anti-Desgaste (AR)',
        icon: ShieldCheckIcon,
        description: 'Placas de acero de alta dureza (400 - 600 HBW) diseñadas para resistir la abrasión severa y el impacto en maquinaria minera. Material esencial para el revestimiento de tolvas, cucharones de excavadoras y chutes de transferencia.',
        shortDescription: 'Placas AR400/AR500 para blindaje de maquinaria.',
        features: [
            'Dureza: 400 HBW / 500 HBW',
            'Espesores: 6mm a 100mm',
            'Aplicación: Revestimiento de Cucharones',
            'Servicio: Corte y dimensionado CNC'
        ],
        imageUrl: 'https://images.unsplash.com/photo-1535930749574-1399327ce78f?q=80&w=2836&auto=format&fit=crop',
        imageAlt: 'Placas de acero anti-desgaste',
    },
    {
        id: 'grinding-media',
        category: 'steel',
        brand: 'STEELPRO',
        name: 'Bolas de Molienda',
        icon: CubeTransparentIcon,
        description: 'Medios de molienda forjados y fundidos de alto cromo para molinos SAG y de bolas. Optimizados para maximizar la eficiencia de conminución y reducir el consumo por tonelada de mineral procesado en plantas concentradoras.',
        shortDescription: 'Insumos críticos para molienda minera.',
        features: [
            'Diámetros: 1" a 6"',
            'Dureza Volumétrica: 60 - 65 HRC',
            'Material: Acero Aleado Alto Carbono',
            'Garantía: Tasa de rotura < 1%'
        ],
        imageUrl: 'https://images.unsplash.com/photo-1615818451845-93c6ae1636c7?q=80&w=2750&auto=format&fit=crop', // Abstract metallic spheres
        imageAlt: 'Bolas de acero para molinos mineros',
    },
    {
        id: 'structural-steel',
        category: 'steel',
        brand: 'STEELPRO',
        name: 'Perfiles Estructurales',
        icon: ServerStackIcon,
        description: 'Vigas IPR, IPS y perfiles tubulares de grado estructural para la construcción de naves industriales y soporte de maquinaria pesada. Acero certificado bajo normas ASTM para garantizar la integridad sísmica y de carga.',
        shortDescription: 'Vigas y perfiles para infraestructura.',
        features: [
            'Normas: ASTM A992 / A572-50',
            'Perfiles: IPR, IPS, HSS',
            'Largo: Stock en 6m y 12m',
            'Certificación: Calidad metalúrgica (Mill Test)'
        ],
        imageUrl: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?q=80&w=2940&auto=format&fit=crop',
        imageAlt: 'Estructuras de acero industrial',
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
        title: "Aceros Técnicos",
        subtitle: "Suministro Industrial Certificado",
        heroImage: "https://images.unsplash.com/photo-1567119782539-773df644558e?q=80&w=2940&auto=format&fit=crop", // Industrial Steel Mill
        description: "El eslabón crítico en su cadena de mantenimiento y construcción. Proveemos aceros anti-desgaste para blindaje de equipos y estructuras certificadas para grandes claros industriales.",
        stats: [
            { label: "Dureza Máx", value: "600 HBW" },
            { label: "Stock", value: "+5000 Ton" },
            { label: "Corte", value: "Plasma/Oxi" },
        ]
    }
};