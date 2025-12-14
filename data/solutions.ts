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
    gallery?: string[]; // New optional property for image gallery
}

export const solutions: Solution[] = [
    // --- SECCIÓN A: MAQUINARIA PARA CONSTRUCCIÓN (Pages 7-11) ---
    {
        id: 'concrete-mixer-pump',
        category: 'construction',
        brand: 'DASWELL',
        name: 'Bomba Mezcladora de Concreto',
        icon: AutomationIcon,
        description: 'La bomba mezcladora de hormigón DASWELL es una máquina innovadora que combina mezcla y bombeo en una sola unidad, optimizando tiempos y reduciendo la necesidad de múltiples equipos en obra.',
        shortDescription: 'Mezcla y bombeo integrado. Eficiencia 2 en 1.',
        features: [
            'Capacidad de bombeo: 30-45 m³/h',
            'Potencia: Motor Diésel / Eléctrico',
            'Distancia de bombeo vertical: 120m',
            'Sistema hidráulico de alta presión'
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
        description: 'Una planta de hormigón sobre ruedas. Carga, mezcla, transporta y descarga automáticamente. Ideal para proyectos en zonas remotas o de difícil acceso.',
        shortDescription: 'Planta móvil 4x4 con autocarga.',
        features: [
            'Capacidad de mezcla: 0.6 - 4.5 m³/lote',
            'Capacidad de salida: 1.2 - 6.5 m³',
            'Tracción 4x4 todo terreno',
            'Cabina giratoria y control intuitivo'
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
        description: 'Equipo robusto para el transporte de concreto líquido a través de tuberías. Esencial para edificios de gran altura o túneles donde el acceso directo es imposible.',
        shortDescription: 'Bombeo estacionario de alto rendimiento.',
        features: [
            'Rendimiento máx: 30 - 90 m³/h',
            'Presión de salida: 10 - 22 MPa',
            'Motor: Diésel de alta potencia',
            'Fácil mantenimiento y limpieza'
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
        description: 'Sistema de dosificación de precisión que carga los materiales secos directamente en el camión mixer. La mezcla con agua ocurre durante el transporte, garantizando frescura.',
        shortDescription: 'Dosificación eficiente sin agua en planta.',
        features: [
            'Rendimiento: 30 - 90 m³/h',
            'Alta precisión en pesaje',
            'Menor consumo energético',
            'Instalación rápida modular'
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
        description: 'La versatilidad definitiva. Combina cargadora frontal y brazo excavador trasero. Perfecta para servicios públicos, agricultura y construcción general.',
        shortDescription: 'Excavación y carga en una sola máquina.',
        features: [
            'Cucharon de carga: 1 m³',
            'Peso operativo: 8200 kg',
            'Potencia nominal: 75 kW',
            'Profundidad de excavación: 4000+ mm'
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
        description: 'Diseñada para mover grandes volúmenes de tierra, grava y minerales. Su chasis articulado y potente sistema hidráulico garantizan ciclos de trabajo rápidos.',
        shortDescription: 'Movimiento de tierras masivo y eficiente.',
        features: [
            'Capacidad del cubo: 0.3 - 3 m³',
            'Altura de descarga: 2000 - 3430 mm',
            'Fuerza de arranque superior',
            'Cabina panorámica climatizada'
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
        description: 'Potencia pura sobre orugas. Estabilidad inigualable para excavaciones profundas, demoliciones y minería a cielo abierto.',
        shortDescription: 'Máxima fuerza de excavación sobre orugas.',
        features: [
            'Cubo estándar: 0.04 - 3.2 m³ (Roca)',
            'Fuerza excavación: 15.2 - 287 KN',
            'Motor Turbo Diésel Eficiente',
            'Sistema hidráulico avanzado'
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
        description: 'El "Minicargador" por excelencia. Gira sobre su propio eje, ideal para espacios confinados. Compatible con múltiples aditamentos.',
        shortDescription: 'Agilidad y potencia en espacios reducidos.',
        features: [
            'Potencia motor: 18.2 - 103 KW',
            'Capacidad cubo: 0.16 - 0.55 m³',
            'Dirección deslizante',
            'Sistema de acople rápido'
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
        description: 'Levante carga donde otros no llegan. Tracción 4x4, gran despeje del suelo y neumáticos de alta flotación para obras en construcción.',
        shortDescription: 'Elevación de carga 4x4 para terrenos difíciles.',
        features: [
            'Carga nominal: 3500 - 7000 KG',
            'Potencia motor: 36.8 - 103 KW',
            'Ángulo de salida > 30 grados',
            'Mástil reforzado de alta visibilidad'
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
        description: 'Producción de concreto in-situ con total movilidad. Diseño compacto que facilita el transporte y la instalación rápida en diferentes frentes de obra.',
        shortDescription: 'Planta de concreto portátil de alta capacidad.',
        features: [
            'Capacidad: 25 - 100 m³/h',
            'Potencia total: 40 - 135 KW',
            'Diseño modular remolcable',
            'Sistema de control automático'
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
        description: 'Instalación industrial para producción masiva de concreto. Alto grado de mecanización y automatización para proyectos de infraestructura mayor.',
        shortDescription: 'Producción masiva de concreto industrial.',
        features: [
            'Capacidad: 25 - 240 m³/h',
            'Alta precisión de pesaje',
            'Mezclador de doble eje horizontal',
            'Configuración flexible de silos'
        ],
        imageUrl: 'https://images.unsplash.com/photo-1626388480376-784af2d148e6?q=80&w=2940&auto=format&fit=crop',
        imageAlt: 'Planta dosificadora estacionaria DASWELL',
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