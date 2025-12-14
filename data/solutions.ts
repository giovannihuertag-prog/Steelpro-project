import React from 'react';
import {
    AnalysisIcon,
    AutomationIcon,
    TraceabilityIcon,
    VisualizationIcon,
    ServerStackIcon,
    CubeTransparentIcon
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
    // --- SECCIÓN A: MAQUINARIA PARA CONSTRUCCIÓN (Pages 7-11) ---
    {
        id: 'concrete-mixer-pump',
        category: 'construction',
        brand: 'DASWELL',
        name: 'Bomba Mezcladora de Concreto',
        icon: AutomationIcon,
        description: 'La bomba mezcladora de hormigón DASWELL es una máquina innovadora que combina mezcla y bombeo en una sola unidad, optimizando tiempos y reduciendo la necesidad de múltiples equipos en obra. Ideal para edificación vertical y túneles pequeños.',
        shortDescription: 'Mezcla y bombeo integrado. Eficiencia 2 en 1.',
        features: [
            'Capacidad de bombeo: 30 - 40 m³/h',
            'Presión de salida: 8 - 10 MPa',
            'Motor: Diésel 48kW / Eléctrico 45kW',
            'Alcance: 120m Vertical / 300m Horizontal'
        ],
        imageUrl: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?q=80&w=2940&auto=format&fit=crop',
        imageAlt: 'Bomba mezcladora de concreto DASWELL',
    },
    {
        id: 'self-loading-mixer',
        category: 'construction',
        brand: 'DASWELL',
        name: 'Mezclador Autocargable',
        icon: CubeTransparentIcon,
        description: 'Una planta de hormigón sobre ruedas. Carga, mezcla, transporta y descarga automáticamente. Su sistema de tracción 4x4 permite operar en terrenos difíciles donde los camiones mixer convencionales no acceden.',
        shortDescription: 'Planta móvil 4x4 con autocarga y rotación.',
        features: [
            'Capacidad del tambor: 1.6 - 4.0 m³',
            'Potencia motor: 55 - 92 kW Turbo',
            'Tanque de agua: 2 x 300 Litros',
            'Rotación descarga: 270 grados'
        ],
        imageUrl: 'https://images.unsplash.com/photo-1632759145351-1d592919f522?q=80&w=2940&auto=format&fit=crop',
        imageAlt: 'Mezclador autocargable DASWELL',
    },
    {
        id: 'trailer-pump',
        category: 'construction',
        brand: 'DASWELL',
        name: 'Bomba de Remolque de Hormigón',
        icon: VisualizationIcon,
        description: 'Equipo robusto para el transporte de concreto líquido a través de tuberías a largas distancias. Componentes hidráulicos de marcas líderes mundiales (Kawasaki, Rexroth) para garantizar fiabilidad continua.',
        shortDescription: 'Bombeo estacionario de alta presión.',
        features: [
            'Rendimiento teórico: 40 - 90 m³/h',
            'Presión máx: 10 - 22 MPa',
            'Diámetro tubería: 125 mm',
            'Motor: Cummins / Deutz Diésel'
        ],
        imageUrl: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=2969&auto=format&fit=crop',
        imageAlt: 'Bomba de remolque DASWELL',
    },
    {
        id: 'dry-concrete-plant',
        category: 'construction',
        brand: 'DASWELL',
        name: 'Planta de Hormigón Seco',
        icon: TraceabilityIcon,
        description: 'Sistema de dosificación de precisión que carga los materiales secos directamente en el camión mixer. La mezcla con agua ocurre durante el transporte, lo que permite distancias de entrega más largas.',
        shortDescription: 'Dosificación eficiente sin agua en planta.',
        features: [
            'Productividad: 60 - 120 m³/h',
            'Sistema de control: PLC Automático',
            'Pesaje: Alta precisión electrónica',
            'Instalación: Modular rápida'
        ],
        imageUrl: 'https://images.unsplash.com/photo-1660566365851-75468205f20a?q=80&w=2940&auto=format&fit=crop',
        imageAlt: 'Planta de hormigón seco DASWELL',
    },

    // --- SECCIÓN B: MAQUINARIA DE INGENIERÍA (Pages 12-20) ---
    {
        id: 'backhoe',
        category: 'engineering',
        brand: 'DASWELL',
        name: 'Retroexcavadora',
        icon: AnalysisIcon,
        description: 'La versatilidad definitiva. Combina cargadora frontal y brazo excavador trasero. Perfecta para servicios públicos, agricultura y construcción general. Cabina ROPS/FOPS para máxima seguridad.',
        shortDescription: 'Excavación y carga en una sola máquina.',
        features: [
            'Cucharon carga: 1.0 m³',
            'Cucharon excavador: 0.3 m³',
            'Profundidad excavación: 4085 mm',
            'Potencia: 70 kW (95 HP)'
        ],
        imageUrl: 'https://images.unsplash.com/photo-1519000078018-8f81e3ad8149?q=80&w=2940&auto=format&fit=crop',
        imageAlt: 'Retroexcavadora DASWELL',
        gallery: [
            'https://images.unsplash.com/photo-1519000078018-8f81e3ad8149?q=80&w=2940&auto=format&fit=crop', // Main
            'https://images.unsplash.com/photo-1616406432452-9226602aa36f?q=80&w=2940&auto=format&fit=crop', // Digging action
            'https://images.unsplash.com/photo-1657094770337-b4528f9d6c17?q=80&w=2940&auto=format&fit=crop', // Side profile
            'https://images.unsplash.com/photo-1627838528935-7c152d192070?q=80&w=2940&auto=format&fit=crop'  // Front view / Detail
        ]
    },
    {
        id: 'wheel-loader',
        category: 'engineering',
        brand: 'DASWELL',
        name: 'Pala Cargadora',
        icon: ServerStackIcon,
        description: 'Diseñada para mover grandes volúmenes de tierra, grava y minerales. Su chasis articulado y potente sistema hidráulico garantizan ciclos de trabajo rápidos y bajo consumo de combustible.',
        shortDescription: 'Movimiento de tierras masivo y eficiente.',
        features: [
            'Carga nominal: 3000 - 5000 kg',
            'Cucharón: 1.8 - 3.0 m³',
            'Altura descarga: 3100 mm',
            'Motor: 6 Cilindros Turbo'
        ],
        imageUrl: 'https://images.unsplash.com/photo-1579567761406-4684ee0c75b6?q=80&w=2787&auto=format&fit=crop',
        imageAlt: 'Pala cargadora DASWELL',
    },
    {
        id: 'crawler-excavator',
        category: 'engineering',
        brand: 'DASWELL',
        name: 'Excavadora de Orugas',
        icon: AutomationIcon,
        description: 'Potencia pura sobre orugas. Estabilidad inigualable para excavaciones profundas, demoliciones y minería a cielo abierto. Motor Tier 3 de baja emisión y alto torque.',
        shortDescription: 'Máxima fuerza de excavación sobre orugas.',
        features: [
            'Peso operativo: 21.5 - 33 Toneladas',
            'Cucharón: 0.9 - 1.6 m³',
            'Alcance excavación: 9900 mm',
            'Hidráulica: Kawasaki / Rexroth'
        ],
        imageUrl: 'https://images.unsplash.com/photo-1541625602330-2277a4c46182?q=80&w=2940&auto=format&fit=crop',
        imageAlt: 'Excavadora de orugas DASWELL',
    },
    {
        id: 'skid-steer',
        category: 'engineering',
        brand: 'DASWELL',
        name: 'Cargadora Compacta',
        icon: CubeTransparentIcon,
        description: 'El "Minicargador" por excelencia. Gira sobre su propio eje, ideal para espacios confinados. Compatible con barredoras, martillos hidráulicos y horquillas.',
        shortDescription: 'Agilidad y potencia en espacios reducidos.',
        features: [
            'Carga operativa: 750 - 1100 kg',
            'Flujo hidráulico: 62 - 80 L/min',
            'Potencia: 37 - 55 kW',
            'Velocidad máx: 12 km/h'
        ],
        imageUrl: 'https://images.unsplash.com/photo-1555675409-7d4323e07d0f?q=80&w=2680&auto=format&fit=crop',
        imageAlt: 'Cargadora compacta DASWELL',
    },
    {
        id: 'rough-terrain-forklift',
        category: 'engineering',
        brand: 'DASWELL',
        name: 'Carretilla Elevadora Todo Terreno',
        icon: VisualizationIcon,
        description: 'Levante carga donde otros no llegan. Tracción 4x4, gran despeje del suelo y neumáticos de alta flotación. Mástil reforzado para operar con seguridad en pendientes.',
        shortDescription: 'Elevación de carga 4x4 para terrenos difíciles.',
        features: [
            'Carga nominal: 3.5 - 5.0 Toneladas',
            'Altura elevación: 3.0 - 6.0 metros',
            'Tracción: 4WD con bloqueo',
            'Motor: Diésel 45 - 60 kW'
        ],
        imageUrl: 'https://images.unsplash.com/photo-1587582345426-bf07f534b063?q=80&w=2940&auto=format&fit=crop',
        imageAlt: 'Carretilla elevadora DASWELL',
    },
    {
        id: 'mobile-batching-plant',
        category: 'engineering',
        brand: 'DASWELL',
        name: 'Planta Dosificadora Móvil',
        icon: TraceabilityIcon,
        description: 'Producción de concreto in-situ con total movilidad. Diseño compacto que facilita el transporte y la instalación rápida sin necesidad de cimientos complejos.',
        shortDescription: 'Planta de concreto portátil de alta capacidad.',
        features: [
            'Capacidad: 25 - 60 m³/h',
            'Mezcladora: Doble Eje JS Series',
            'Movilidad: Chasis remolcable integrado',
            'Altura descarga: 3.8 metros'
        ],
        imageUrl: 'https://images.unsplash.com/photo-1590088998492-c4193557e491?q=80&w=2807&auto=format&fit=crop',
        imageAlt: 'Planta dosificadora móvil DASWELL',
    },
    {
        id: 'stationary-batching-plant',
        category: 'engineering',
        brand: 'DASWELL',
        name: 'Planta Dosificadora Estacionaria',
        icon: ServerStackIcon,
        description: 'Instalación industrial para producción masiva de concreto premezclado. NOTA: Las especificaciones detalladas y las imágenes completas estarán disponibles próximamente, ya que se trata de una unidad industrial de alta capacidad configurada a medida.',
        shortDescription: 'Producción masiva. (Imagen referencial - Configuración pendiente).',
        features: [
            'Producción: Consultar Ingeniería',
            'Mezcladora: Serie JS Industrial',
            'Configuración: 100% Personalizable',
            'Disponibilidad: Bajo Pedido'
        ],
        // Using a placeholder/abstract industrial image
        imageUrl: 'https://images.unsplash.com/photo-1485628390555-173ee0992837?q=80&w=2890&auto=format&fit=crop',
        imageAlt: 'Planta dosificadora estacionaria DASWELL (Referencial)',
    },

    // --- ACEROS (SteelPro Brand) ---
    {
        id: 'steel-tech',
        category: 'steel',
        brand: 'STEELPRO',
        name: 'Aceros de Grado Industrial',
        icon: TraceabilityIcon,
        description: 'División especializada en aceros de alta resistencia y aleaciones para manufactura. Suministro confiable para la industria metalmecánica.',
        shortDescription: 'Aleaciones especiales y aceros certificados.',
        features: [
            'Acero Grado Maquinaria (1045T, 4140T)',
            'Aceros Inoxidables (303, 304, 316L)',
            'Aluminio Aeroespacial (6061 - 7075)',
            'Bronces, Cobre y Latón'
        ],
        imageUrl: 'https://images.unsplash.com/photo-1535930749574-1399327ce78f?q=80&w=2836&auto=format&fit=crop',
        imageAlt: 'Aceros industriales SteelPro',
    },
];

export const categoryMetaData = {
    construction: {
        title: "Maquinaria de Construcción",
        subtitle: "Tecnología de Concreto y Bombeo de Alto Rendimiento",
        heroImage: "https://images.unsplash.com/photo-1531834685032-c34bf0d84c7c?q=80&w=2897&auto=format&fit=crop",
        description: "Equipos diseñados para optimizar el flujo de trabajo en obra, garantizando mezclas homogéneas y bombeo continuo en las condiciones más exigentes.",
        stats: [
            { label: "Eficiencia Operativa", value: "+35%" },
            { label: "Alcance Vertical", value: "120m+" },
            { label: "Soporte Técnico", value: "24/7" },
        ]
    },
    engineering: {
        title: "Maquinaria de Ingeniería",
        subtitle: "Poder de Excavación y Movimiento de Tierras",
        heroImage: "https://images.unsplash.com/photo-1610427956424-6eb905953041?q=80&w=2874&auto=format&fit=crop",
        description: "Soluciones de maquinaria pesada para minería, infraestructura y construcción civil. Potencia bruta combinada con precisión hidráulica.",
        stats: [
            { label: "Capacidad de Carga", value: "50 Ton" },
            { label: "Torque Motor", value: "Max" },
            { label: "Disponibilidad", value: "98%" },
        ]
    },
    steel: {
        title: "Aceros Industriales",
        subtitle: "Certificación y Aleaciones de Grado Aeroespacial",
        heroImage: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?q=80&w=2940&auto=format&fit=crop",
        description: "Suministro de materiales críticos para la manufactura avanzada. Trazabilidad completa y cortes a medida para su línea de producción.",
        stats: [
            { label: "Grados de Acero", value: "20+" },
            { label: "Certificación", value: "ISO" },
            { label: "Entrega", value: "Express" },
        ]
    }
};