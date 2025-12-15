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
    category: 'construction' | 'engineering' | 'steel' | 'production';
    categoryLabel?: string; // For display purposes
    brand?: string;
    name: string;
    icon: React.FC<React.SVGProps<SVGSVGElement>>;
    description: string; // Detailed description
    shortDescription: string; // For card view
    features: string[];
    imageUrl: string;
    imageAlt: string;
    gallery?: string[];
    status: 'disponible' | 'bajo_pedido' | 'proximamente';
    pdfUrl?: string;
    densityMetric?: number;
    densityImperial?: number;
}

export const solutions: Solution[] = [
    // --- SEGMENTO: CONSTRUCCIÓN (CONCRETOS) ---
    {
        id: 'concrete-mixer-pump',
        category: 'construction',
        categoryLabel: 'División Concreto',
        brand: 'DASWELL',
        name: 'Bomba Mezcladora de Concreto',
        icon: AutomationIcon,
        status: 'disponible',
        description: 'La bomba mezcladora de hormigón es una máquina de construcción innovadora que combina las funciones de mezcla y bombeo de hormigón en una sola máquina. Ahorra mano de obra y es más económica, permitiendo completar tareas de vertido rápidamente en proyectos de vivienda y túneles.',
        shortDescription: 'Mezcla y bombeo en un solo equipo.',
        features: [
            'Capacidad teórica: 30-45 m³/h',
            'Potencia: Diesel Weichai o Eléctrico',
            'Hidráulica: Kawasaki (Corea) / Rexroth',
            'Alcance: Mangueras Manuli (Italia)'
        ],
        imageUrl: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?q=80&w=2940&auto=format&fit=crop',
        imageAlt: 'Bomba mezcladora de concreto',
        gallery: [
            'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?q=80&w=2940&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?q=80&w=2969&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1518709414768-a8c79b06a5de?q=80&w=2874&auto=format&fit=crop'
        ],
        pdfUrl: '#'
    },
    {
        id: 'self-loading-mixer',
        category: 'construction',
        categoryLabel: 'División Concreto',
        brand: 'DASWELL',
        name: 'Mezclador Autocargable',
        icon: CubeTransparentIcon,
        status: 'disponible',
        description: 'Solución integral para mezclar hormigón. Carga, mezcla, transporta y descarga automáticamente. Funciona como una pequeña planta móvil con tracción 4x4, ideal para terrenos difíciles. Cuenta con tambor giratorio de 270° y cabina cerrada.',
        shortDescription: 'Planta móvil 4x4 todo en uno.',
        features: [
            'Capacidad de mezcla: 0.6 - 4.5 m³/lote',
            'Salida: 1.2 - 6.5 m³',
            'Rotación: 270° a 360°',
            'Sistema de pesaje electrónico'
        ],
        imageUrl: 'https://images.unsplash.com/photo-1632759145351-1d592919f522?q=80&w=2940&auto=format&fit=crop',
        imageAlt: 'Mezclador autocargable',
        gallery: [
            'https://images.unsplash.com/photo-1632759145351-1d592919f522?q=80&w=2940&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1590486803833-1c5dc8ddd4c8?q=80&w=2874&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1584463635346-95aa5ae80136?q=80&w=2832&auto=format&fit=crop'
        ]
    },
    {
        id: 'trailer-pump',
        category: 'construction',
        categoryLabel: 'División Concreto',
        brand: 'DASWELL',
        name: 'Bomba de Remolque',
        icon: VisualizationIcon,
        status: 'bajo_pedido',
        description: 'Equipo de bombeo estacionario para transportar concreto líquido. Disponible en versiones diésel y eléctrica. Clasificadas en bomba de piedra fina (≤30mm) y áridos grandes (≤40mm). Modelos especiales para túneles y puentes.',
        shortDescription: 'Bombeo estacionario de alta presión.',
        features: [
            'Rendimiento: 30 - 90 m³/h',
            'Presión salida: 10 - 22 MPa',
            'Tipos: Eléctrica / Diesel',
            'Aplicación: Rascacielos y larga distancia'
        ],
        imageUrl: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=2969&auto=format&fit=crop',
        imageAlt: 'Bomba de remolque estacionaria',
        gallery: [
            'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=2969&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1574360778004-459807f7943d?q=80&w=2940&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1535732759880-bbd5c7265e3f?q=80&w=2864&auto=format&fit=crop'
        ]
    },
    {
        id: 'dry-mix-plant',
        category: 'construction',
        categoryLabel: 'División Concreto',
        brand: 'DASWELL',
        name: 'Planta de Hormigón Seco',
        icon: TraceabilityIcon,
        status: 'bajo_pedido',
        description: 'Sistema de dosificación sin mezcladora central. Carga áridos y cemento en seco directamente al camión mixer, donde se añade agua y se mezcla durante el transporte. Ideal para largas distancias y regiones cálidas.',
        shortDescription: 'Dosificación rápida para mixers.',
        features: [
            'Capacidad: 30 - 90 m³/h',
            'Ventaja: Bajo mantenimiento',
            'Uso: Proyectos remotos / Larga distancia',
            'Estructura: Modular simple'
        ],
        imageUrl: 'https://images.unsplash.com/photo-1660566365851-75468205f20a?q=80&w=2940&auto=format&fit=crop',
        imageAlt: 'Planta de concreto seca',
        gallery: [
            'https://images.unsplash.com/photo-1660566365851-75468205f20a?q=80&w=2940&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1581093583449-ed252133d01e?q=80&w=2832&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?q=80&w=2940&auto=format&fit=crop'
        ]
    },
    {
        id: 'mobile-batching-plant',
        category: 'construction',
        categoryLabel: 'División Concreto',
        brand: 'DASWELL',
        name: 'Planta Dosificadora Móvil',
        icon: ServerStackIcon,
        status: 'disponible',
        description: 'Planta portátil que concentra almacenamiento, pesaje, transporte y mezcla en un bastidor móvil remolcable. Se instala en horas sin necesidad de cimientos complejos. Ahorra 90% en costes de cimentación.',
        shortDescription: 'Producción de concreto in-situ.',
        features: [
            'Capacidad: 25 - 100 m³/h',
            'Potencia: 40 - 135 kW',
            'Movilidad: 1 o 2 remolques',
            'Instalación: Rápida / Sin base'
        ],
        imageUrl: 'https://images.unsplash.com/photo-1590059390234-63328ebbc5c5?q=80&w=2940&auto=format&fit=crop',
        imageAlt: 'Planta móvil de concreto',
        gallery: [
            'https://images.unsplash.com/photo-1590059390234-63328ebbc5c5?q=80&w=2940&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1580901369227-3d844b5847fa?q=80&w=2826&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1616401784845-180882ba9ba8?q=80&w=2940&auto=format&fit=crop'
        ]
    },
    {
        id: 'stationary-batching-plant',
        category: 'construction',
        categoryLabel: 'División Concreto',
        brand: 'DASWELL',
        name: 'Planta Estacionaria',
        icon: ServerStackIcon,
        status: 'bajo_pedido',
        description: 'Instalación de producción masiva con alto grado de automatización. Diseñada para proyectos de infraestructura a gran escala (Presas, Aeropuertos, Autopistas). Estructura robusta para operación continua.',
        shortDescription: 'Producción industrial de alto volumen.',
        features: [
            'Capacidad: 25 - 240 m³/h',
            'Tipos: Tolva o Cinta Transportadora',
            'Aplicación: Concreto Premezclado (RMC)',
            'Durabilidad: Heavy Duty'
        ],
        imageUrl: 'https://images.unsplash.com/photo-1565008447742-97f6f38c985c?q=80&w=2940&auto=format&fit=crop',
        imageAlt: 'Planta estacionaria grande',
        gallery: [
            'https://images.unsplash.com/photo-1565008447742-97f6f38c985c?q=80&w=2940&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1595246738090-4497e7530691?q=80&w=2940&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1533240366601-57448d3db841?q=80&w=2940&auto=format&fit=crop'
        ]
    },
    {
        id: 'brick-machine',
        category: 'production',
        categoryLabel: 'Maquinaria de Producción',
        brand: 'DASWELL',
        name: 'Máquina de Ladrillos Hidráulica',
        icon: CubeTransparentIcon,
        status: 'bajo_pedido',
        description: 'Línea de producción automática de ladrillos y bloques utilizando cenizas, arena y escoria. Sistema hidráulico de alta presión para ladrillos de alta densidad. Modelos BMM4-15 a BMM12-15.',
        shortDescription: 'Fabricación automática de bloques.',
        features: [
            'Capacidad: 1728 - 2160 uds/h (bloque hueco)',
            'Dimensiones: 9350x3200x2900 mm',
            'Productos: Ladrillo hueco, pavimento, bordillo',
            'Control: PLC Automático'
        ],
        imageUrl: 'https://images.unsplash.com/photo-1622466479904-8785e4952042?q=80&w=2874&auto=format&fit=crop',
        imageAlt: 'Máquina bloquera hidráulica',
        gallery: [
            'https://images.unsplash.com/photo-1622466479904-8785e4952042?q=80&w=2874&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2940&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1565258900984-5f50438a3915?q=80&w=2874&auto=format&fit=crop'
        ]
    },

    // --- SEGMENTO: INGENIERÍA ---
    {
        id: 'backhoe-loader',
        category: 'engineering',
        categoryLabel: 'Maquinaria Pesada',
        brand: 'DASWELL',
        name: 'Retroexcavadora',
        icon: AnalysisIcon,
        status: 'disponible',
        description: 'Máquina multifuncional que integra cargadora frontal y excavadora trasera. Sistema hidráulico con detección de carga (Load Sensing) para ahorro de combustible (hasta 16% en modo eco). Ideal para servicios públicos y zanjas.',
        shortDescription: 'Cargadora y excavadora combinada.',
        features: [
            'Peso operativo: 8200 kg',
            'Cuchara carga: 1 m³',
            'Tecnología: Bombas de desplazamiento variable',
            'Eficiencia: Modo Eco + Bloqueo convertidor'
        ],
        imageUrl: 'https://images.unsplash.com/photo-1519000078018-8f81e3ad8149?q=80&w=2940&auto=format&fit=crop',
        imageAlt: 'Retroexcavadora Daswell',
        gallery: [
            'https://images.unsplash.com/photo-1519000078018-8f81e3ad8149?q=80&w=2940&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1541625602330-2277a4c46182?q=80&w=2940&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1579567761406-4684ee0c75b6?q=80&w=2787&auto=format&fit=crop'
        ]
    },
    {
        id: 'crawler-excavator',
        category: 'engineering',
        categoryLabel: 'Maquinaria Pesada',
        brand: 'DASWELL',
        name: 'Excavadora de Orugas Serie E',
        icon: AnalysisIcon,
        status: 'disponible',
        description: 'Máquina de alto tonelaje diseñada para minería a cielo abierto y excavación masiva. Equipada con motores Isuzu de bajo consumo y un brazo reforzado con acero de alta tensión.',
        shortDescription: 'Excavación pesada y minería.',
        features: [
            'Peso Operativo: 22T - 36T',
            'Capacidad de Cucharón: 1.0 - 1.8 m³',
            'Profundidad de Excavación: 6.5 - 7.5 m',
            'Cabina: ROPS/FOPS'
        ],
        imageUrl: 'https://images.unsplash.com/photo-1541625602330-2277a4c46182?q=80&w=2940&auto=format&fit=crop',
        imageAlt: 'Excavadora de orugas',
        gallery: [
            'https://images.unsplash.com/photo-1541625602330-2277a4c46182?q=80&w=2940&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1610427956424-6eb905953041?q=80&w=2874&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1578326584285-d852a32c253b?q=80&w=2940&auto=format&fit=crop'
        ]
    },

    // --- SEGMENTO: ACEROS ---
    {
        id: 'hollow-bar-1518',
        category: 'steel',
        categoryLabel: 'Aceros Especiales',
        brand: 'GRADO MAQUINARIA',
        name: 'Acero 1518 (Barra Hueca)',
        icon: CubeTransparentIcon,
        status: 'disponible',
        description: 'Acero al carbono-manganeso de mecanizado optimizado. Su formato tubular sin costura reduce drásticamente los tiempos de maquinado.',
        shortDescription: 'Barra hueca sin costura.',
        densityMetric: 7850,
        densityImperial: 490,
        features: [
            'Grado: SAE 1518',
            'Formato: Barra Hueca',
            'Soldabilidad: Excelente',
            'Uso: Bujes, cilindros'
        ],
        imageUrl: 'https://images.unsplash.com/photo-1535930749574-1399327ce78f?q=80&w=2836&auto=format&fit=crop',
        imageAlt: 'Barra hueca de acero',
        gallery: [
            'https://images.unsplash.com/photo-1535930749574-1399327ce78f?q=80&w=2836&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1615818451845-93c6ae1636c7?q=80&w=2750&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1567119782539-773df644558e?q=80&w=2940&auto=format&fit=crop'
        ]
    },
    {
        id: 'carbon-plate-a36',
        category: 'steel',
        categoryLabel: 'Aceros Especiales',
        brand: 'ACERO AL CARBÓN',
        name: 'Placa Estructural A36',
        icon: ServerStackIcon,
        status: 'disponible',
        description: 'Placa de acero de bajo carbono con un equilibrio óptimo entre resistencia, conformabilidad y soldabilidad.',
        shortDescription: 'Placa estructural estándar.',
        densityMetric: 7850,
        densityImperial: 490,
        features: [
            'Grado: ASTM A36',
            'Fluencia: 36,000 PSI',
            'Formato: Placa caliente',
            'Uso: Estructuras'
        ],
        imageUrl: 'https://images.unsplash.com/photo-1567119782539-773df644558e?q=80&w=2940&auto=format&fit=crop',
        imageAlt: 'Placa A36',
        gallery: [
            'https://images.unsplash.com/photo-1567119782539-773df644558e?q=80&w=2940&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1533240366601-57448d3db841?q=80&w=2940&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1615818451845-93c6ae1636c7?q=80&w=2750&auto=format&fit=crop'
        ]
    }
];

export const categoryMetaData = {
    construction: {
        title: "División Concretos",
        subtitle: "Tecnología de Bombeo y Mezclado",
        heroImage: "https://images.unsplash.com/photo-1531834685032-c34bf0d84c7c?q=80&w=2897&auto=format&fit=crop",
        description: "Soluciones completas para la cadena de valor del concreto. Desde la dosificación precisa en plantas estacionarias hasta el bombeo vertical en rascacielos.",
        stats: [
            { label: "Presión Máx", value: "22 MPa" },
            { label: "Producción", value: "240 m³/h" },
            { label: "Disponibilidad", value: "Inmediata" },
        ]
    },
    engineering: {
        title: "Maquinaria Pesada",
        subtitle: "Movimiento de Tierras y Minería",
        heroImage: "https://images.unsplash.com/photo-1610427956424-6eb905953041?q=80&w=2874&auto=format&fit=crop",
        description: "Flota de alto rendimiento para los entornos más exigentes. Nuestras excavadoras y cargadores combinan hidráulica japonesa con estructuras reforzadas.",
        stats: [
            { label: "Cuchara", value: "6.0 m³" },
            { label: "Peso Op.", value: "50 Ton" },
            { label: "Motores", value: "Tier 3/4" },
        ]
    },
    production: {
        title: "Sistemas de Producción",
        subtitle: "Bloqueras y Prefabricados",
        heroImage: "https://images.unsplash.com/photo-1622466479904-8785e4952042?q=80&w=2874&auto=format&fit=crop",
        description: "Líneas automatizadas para la fabricación de ladrillos y bloques de concreto. Alta densidad y precisión dimensional para materiales de construcción.",
        stats: [
            { label: "Ciclo", value: "15s" },
            { label: "Presión", value: "Alta" },
            { label: "Control", value: "PLC" },
        ]
    },
    steel: {
        title: "Aceros Industriales",
        subtitle: "Inventario Técnico Selecto",
        heroImage: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?q=80&w=2940&auto=format&fit=crop",
        description: "Seleccionamos únicamente los materiales que resuelven problemas críticos de ingeniería: resistencia al desgaste, maquinabilidad optimizada y certificaciones.",
        stats: [
            { label: "Grados", value: "Certificados" },
            { label: "Inoxidables", value: "300 / 400" },
            { label: "Corte", value: "A Medida" },
        ]
    }
};