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
    category: 'construction' | 'engineering' | 'road' | 'crushing' | 'milling' | 'steel' | 'production';
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

    // --- SEGMENTO: MAQUINARIA VIAL (ROAD) ---
    {
        id: 'stationary-asphalt-plant',
        category: 'road',
        categoryLabel: 'Plantas de Asfalto',
        brand: 'DASWELL',
        name: 'Planta de Asfalto Estacionaria',
        icon: ServerStackIcon,
        status: 'bajo_pedido',
        description: 'Planta mezcladora de asfalto ideal para proyectos de construcción de carreteras urbanas a gran escala. Diseñada con precisión para garantizar alimentación, secado, calentamiento y mezcla óptimos. Sistema de control automático para producción en masa de alta calidad.',
        shortDescription: 'Producción masiva para autopistas.',
        features: [
            'Capacidad: 40 - 400 t/h',
            'Mezclador: 750 - 5000 kg/lote',
            'Aplicación: Autopistas / Aeropuertos',
            'Insumos: Árido, polvo, betún'
        ],
        imageUrl: 'https://images.unsplash.com/photo-1581094288338-2314dddb7ece?q=80&w=2940&auto=format&fit=crop',
        imageAlt: 'Planta de asfalto estacionaria',
        gallery: [
            'https://images.unsplash.com/photo-1581094288338-2314dddb7ece?q=80&w=2940&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1535732820275-9ffd998cac22?q=80&w=2940&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?q=80&w=2940&auto=format&fit=crop'
        ]
    },
    {
        id: 'drum-asphalt-plant',
        category: 'road',
        categoryLabel: 'Plantas de Asfalto',
        brand: 'DASWELL',
        name: 'Planta de Asfalto de Tambor',
        icon: TraceabilityIcon,
        status: 'bajo_pedido',
        description: 'Equipo de mezcla asfáltica continua donde el tambor realiza funciones duales de secado y mezclado. Estructura integrada que ocupa menos espacio y facilita la movilización rápida entre obras. Ideal para caminos rurales y municipales.',
        shortDescription: 'Mezcla continua compacta.',
        features: [
            'Capacidad: 40 - 100 t/h',
            'Potencia: 75 - 200 kW',
            'Tipo: Mezcla Continua',
            'Ventaja: Rápida movilización'
        ],
        imageUrl: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=2969&auto=format&fit=crop',
        imageAlt: 'Planta de asfalto de tambor',
        gallery: [
            'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=2969&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1574360778004-459807f7943d?q=80&w=2940&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1595246738090-4497e7530691?q=80&w=2940&auto=format&fit=crop'
        ]
    },
    {
        id: 'mobile-asphalt-plant',
        category: 'road',
        categoryLabel: 'Plantas de Asfalto',
        brand: 'DASWELL',
        name: 'Planta de Asfalto Móvil',
        icon: AutomationIcon,
        status: 'bajo_pedido',
        description: 'Sistema completo de producción de asfalto montado sobre chasis para facilitar el tránsito. Capaz de producir mezcla asfáltica, modificada y coloreada en cualquier ubicación. La solución preferida para obras itinerantes y mantenimiento vial.',
        shortDescription: 'Planta completa sobre ruedas.',
        features: [
            'Capacidad: 40 - 160 t/h',
            'Potencia: 75 - 142 kW',
            'Movilidad: Chasis remolcable',
            'Flexibilidad: Rápida instalación'
        ],
        imageUrl: 'https://images.unsplash.com/photo-1590486803833-1c5dc8ddd4c8?q=80&w=2874&auto=format&fit=crop',
        imageAlt: 'Planta de asfalto móvil',
        gallery: [
            'https://images.unsplash.com/photo-1590486803833-1c5dc8ddd4c8?q=80&w=2874&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1621905251918-48416bd8575a?q=80&w=2940&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1584463635346-95aa5ae80136?q=80&w=2832&auto=format&fit=crop'
        ]
    },
    {
        id: 'asphalt-paver',
        category: 'road',
        categoryLabel: 'Pavimentación',
        brand: 'DASWELL',
        name: 'Pavimentadora de Asfalto',
        icon: TraceabilityIcon,
        status: 'bajo_pedido',
        description: 'Máquina esencial para la construcción de carreteras, diseñada para aplicar asfalto con uniformidad milimétrica. Equipada con motor Cummins QSB5.9 y sistemas de nivelación automática. Garantiza superficies lisas en autopistas y aeropuertos.',
        shortDescription: 'Pavimentación vial de alta precisión.',
        features: [
            'Motor: Cummins QSB5.9 (97 kW)',
            'Tecnología: Nivelación automática',
            'Sistema: Hidráulico + Mecánico',
            'Aplicación: Autopistas / Aeropuertos'
        ],
        imageUrl: 'https://images.unsplash.com/photo-1621905251918-48416bd8575a?q=80&w=2940&auto=format&fit=crop',
        imageAlt: 'Pavimentadora de asfalto en operación',
        gallery: [
            'https://images.unsplash.com/photo-1621905251918-48416bd8575a?q=80&w=2940&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1590486803833-1c5dc8ddd4c8?q=80&w=2874&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1584463635346-95aa5ae80136?q=80&w=2832&auto=format&fit=crop'
        ]
    },
    {
        id: 'vibratory-roller',
        category: 'road',
        categoryLabel: 'Compactación',
        brand: 'DASWELL',
        name: 'Rodillo Vibratorio',
        icon: AnalysisIcon,
        status: 'disponible',
        description: 'Diseñado para la compactación de materiales no cohesivos (arena, grava, roca). Utiliza fuerza estática (peso) combinada con fuerza dinámica (vibración) para penetrar profundamente en las capas del suelo. Disponible en configuraciones de tambor simple o doble (tándem).',
        shortDescription: 'Compactación dinámica de suelos.',
        features: [
            'Potencia: 66.3 - 110 kW',
            'Capacidad pendiente: 35%',
            'Tipos: Tambor Simple / Doble',
            'Uso: Asfalto y Bases Granulares'
        ],
        imageUrl: 'https://images.unsplash.com/photo-1616401784845-180882ba9ba8?q=80&w=2940&auto=format&fit=crop',
        imageAlt: 'Rodillo vibratorio compactador',
        gallery: [
            'https://images.unsplash.com/photo-1616401784845-180882ba9ba8?q=80&w=2940&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1590486803833-1c5dc8ddd4c8?q=80&w=2874&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1574360778004-459807f7943d?q=80&w=2940&auto=format&fit=crop'
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
        description: 'Integran a la perfección las capacidades de una cargadora frontal y una excavadora trasera en una máquina multifuncional ultraeficiente. Equipadas con una cuchara cargadora de 1 m³ y un potente brazo excavador trasero, estas máquinas destacan en la excavación de zanjas, la rotura de asfalto, la elevación, la carga y la manipulación de materiales. Tecnología hidráulica avanzada con detección de carga (Load Sensing) para un ciclo más suave y mayor vida útil.',
        shortDescription: 'Funcionalidad dual: Cargadora + Excavadora.',
        features: [
            'Peso operativo total: 8200 kg',
            'Capacidad cucharón: 1 m³',
            'Hidráulica: Bombas de desplazamiento variable',
            'Eficiencia: Ahorro combustible hasta 16%'
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
        name: 'Excavadora de Orugas',
        icon: AnalysisIcon,
        status: 'disponible',
        description: 'Máquina de movimiento de tierras equipada con un motor Cummins de alta potencia. Utiliza un cucharón para excavar materiales por encima o por debajo de la superficie de apoyo. Cuenta con bomba y válvula principal Kawasaki para durabilidad extrema y sistema de control electrónico de flujo positivo para respuesta rápida.',
        shortDescription: 'Excavación pesada con motor Cummins.',
        features: [
            'Cubo estándar: 0.04 - 3.2 m³',
            'Fuerza excavación: 15.2 - 28 kN',
            'Motor: Cummins Alta Potencia',
            'Hidráulica: Kawasaki Japón'
        ],
        imageUrl: 'https://images.unsplash.com/photo-1541625602330-2277a4c46182?q=80&w=2940&auto=format&fit=crop',
        imageAlt: 'Excavadora de orugas Cummins',
        gallery: [
            'https://images.unsplash.com/photo-1541625602330-2277a4c46182?q=80&w=2940&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1610427956424-6eb905953041?q=80&w=2874&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1578326584285-d852a32c253b?q=80&w=2940&auto=format&fit=crop'
        ]
    },
    {
        id: 'skid-steer-loader',
        category: 'engineering',
        categoryLabel: 'Maquinaria Pesada',
        brand: 'DASWELL',
        name: 'Cargadora Compacta',
        icon: CubeTransparentIcon,
        status: 'disponible',
        description: 'Minicargador con chasis de ruedas diseñado para espacios reducidos. Capaz de realizar giros de 360° sobre su propio eje. Versatilidad extrema gracias al cambio rápido de accesorios (martillo, barrena, horquillas). Ideal para limpieza logística y construcción municipal.',
        shortDescription: 'Minicargador giro 360° versátil.',
        features: [
            'Potencia: 18.2 - 103 kW',
            'Capacidad cubo: 0.16 - 0.55 m³',
            'Tracción: 4x4 permanente',
            'Uso: Espacios confinados / Logística'
        ],
        imageUrl: 'https://plus.unsplash.com/premium_photo-1664303847960-586318f59035?q=80&w=2940&auto=format&fit=crop',
        imageAlt: 'Cargadora compacta skid steer',
        gallery: [
            'https://plus.unsplash.com/premium_photo-1664303847960-586318f59035?q=80&w=2940&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1626264147775-7b6400595328?q=80&w=2874&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1589739900266-43b2843f4c12?q=80&w=2890&auto=format&fit=crop'
        ]
    },
    {
        id: 'rough-terrain-forklift',
        category: 'engineering',
        categoryLabel: 'Maquinaria Pesada',
        brand: 'DASWELL',
        name: 'Montacargas Todo Terreno',
        icon: ServerStackIcon,
        status: 'bajo_pedido',
        description: 'Carretilla elevadora con tracción integral permanente y neumáticos de base ancha. Diseñada para operar en lodo, nieve y terrenos irregulares donde los montacargas convencionales fallan. Ángulo de salida >30° y distancia al suelo >300mm.',
        shortDescription: 'Elevación 4x4 para terreno difícil.',
        features: [
            'Carga nominal: 3500 - 7000 kg',
            'Potencia: 36.8 - 103 kW',
            'Tracción: 4WD Permanente',
            'Pendiente superable: 25° - 35°'
        ],
        imageUrl: 'https://images.unsplash.com/photo-1580901368919-7738efb0f87e?q=80&w=2940&auto=format&fit=crop',
        imageAlt: 'Montacargas todo terreno',
        gallery: [
            'https://images.unsplash.com/photo-1580901368919-7738efb0f87e?q=80&w=2940&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1618213837777-623253b3df76?q=80&w=2940&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1595246737923-a7c88029c0f3?q=80&w=2940&auto=format&fit=crop'
        ]
    },
    {
        id: 'bulldozer',
        category: 'engineering',
        categoryLabel: 'Maquinaria Pesada',
        brand: 'DASWELL',
        name: 'Bulldozer Hidráulico',
        icon: ShieldCheckIcon,
        status: 'disponible',
        description: 'Potente máquina de orugas para movimiento masivo de tierras. Equipada con cuchilla ancha y sistema hidráulico robusto para empuje y nivelación. Diseño de orugas que mejora la estabilidad en pendientes de hasta 45°. Indispensable en minería y construcción de presas.',
        shortDescription: 'Empuje y nivelación de alto tonelaje.',
        features: [
            'Potencia: 131 - 257 kW',
            'Pendiente máx: 45°',
            'Implementos: Cuchilla / Ripper',
            'Transmisión: Hidráulica'
        ],
        imageUrl: 'https://images.unsplash.com/photo-1520106606041-6fb74c207904?q=80&w=2832&auto=format&fit=crop',
        imageAlt: 'Bulldozer empujando tierra',
        gallery: [
            'https://images.unsplash.com/photo-1520106606041-6fb74c207904?q=80&w=2832&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1595246738090-4497e7530691?q=80&w=2940&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1589739900266-43b2843f4c12?q=80&w=2890&auto=format&fit=crop'
        ]
    },

    // --- SEGMENTO: TRITURACIÓN Y AGREGADOS (CRUSHING) ---
    {
        id: 'mini-mobile-crusher',
        category: 'crushing',
        categoryLabel: 'Trituración y Agregados',
        brand: 'DASWELL',
        name: 'Mini Planta Trituradora Móvil',
        icon: CubeTransparentIcon,
        status: 'bajo_pedido',
        description: 'Planta compacta diseñada para operaciones de pequeña escala y reciclaje. Su chasis móvil permite una fácil reubicación en sitios de construcción estrechos.',
        shortDescription: 'Trituración compacta y versátil.',
        features: [
            'Capacidad Trituradora: 5 – 21 t/h',
            'Capacidad Cribadora: 10 – 80 m³/h',
            'Movilidad: Remolcable',
            'Aplicación: Pequeña minería'
        ],
        imageUrl: 'https://images.unsplash.com/photo-1599933451563-71452df1575a?q=80&w=2940&auto=format&fit=crop',
        imageAlt: 'Mini planta trituradora móvil',
        gallery: []
    },
    {
        id: 'mobile-crushing-plant',
        category: 'crushing',
        categoryLabel: 'Trituración y Agregados',
        brand: 'DASWELL',
        name: 'Planta Móvil de Trituración',
        icon: ServerStackIcon,
        status: 'bajo_pedido',
        description: 'Sistema completo de trituración montado sobre chasis (oruga o neumático). Ideal para procesar residuos de construcción y piedra caliza directamente en la fuente.',
        shortDescription: 'Planta completa sobre ruedas/orugas.',
        features: [
            'Tipo: Oruga / Neumático',
            'Materias primas: Residuos, Caliza',
            'Configuración: Flexible',
            'Movilidad: Alta'
        ],
        imageUrl: 'https://images.unsplash.com/photo-1578326584285-d852a32c253b?q=80&w=2940&auto=format&fit=crop',
        imageAlt: 'Planta móvil de trituración',
        gallery: []
    },
    {
        id: 'stone-crushing-plant',
        category: 'crushing',
        categoryLabel: 'Trituración y Agregados',
        brand: 'DASWELL',
        name: 'Planta Trituradora de Piedra',
        icon: AnalysisIcon,
        status: 'bajo_pedido',
        description: 'Planta estacionaria diseñada a medida para canteras y minas. Capaz de procesar granito, guijarros de río y basalto con alta eficiencia.',
        shortDescription: 'Producción estacionaria masiva.',
        features: [
            'Capacidad: 1 - 1000 tph',
            'Materiales: Granito, Río, Caliza',
            'Componentes: Trituradora, Criba, Cinta',
            'Uso: Canteras grandes'
        ],
        imageUrl: 'https://images.unsplash.com/photo-1525126859551-7f374780516f?q=80&w=2940&auto=format&fit=crop',
        imageAlt: 'Planta trituradora de piedra estacionaria',
        gallery: []
    },
    {
        id: 'track-crusher',
        category: 'crushing',
        categoryLabel: 'Trituración y Agregados',
        brand: 'DASWELL',
        name: 'Trituradora de Orugas',
        icon: ShieldCheckIcon,
        status: 'bajo_pedido',
        description: 'Equipo de trituración autónomo montado sobre orugas hidráulicas. Puede acceder a terrenos difíciles y operar sin infraestructura externa.',
        shortDescription: 'Trituración todoterreno autónoma.',
        features: [
            'Capacidad: 1 - 1000 tph',
            'Tracción: Orugas Hidráulicas',
            'Materiales: Residuos, Roca dura',
            'Ventaja: Acceso difícil'
        ],
        imageUrl: 'https://images.unsplash.com/photo-1595246738090-4497e7530691?q=80&w=2940&auto=format&fit=crop',
        imageAlt: 'Trituradora de orugas',
        gallery: []
    },
    {
        id: 'jaw-crusher',
        category: 'crushing',
        categoryLabel: 'Trituración y Agregados',
        brand: 'DASWELL',
        name: 'Trituradora de Mandíbula',
        icon: AutomationIcon,
        status: 'disponible',
        description: 'Trituradora primaria por excelencia. Utiliza fuerza de compresión para romper roca dura y abrasiva. Estructura robusta para larga vida útil.',
        shortDescription: 'Trituración primaria robusta.',
        features: [
            'Capacidad: 1 - 1100 tph',
            'Dimensión: 4800*3200*4200 mm',
            'Aplicación: Primaria',
            'Material: Roca dura'
        ],
        imageUrl: 'https://images.unsplash.com/photo-1629738848773-195f0022f468?q=80&w=2940&auto=format&fit=crop',
        imageAlt: 'Trituradora de mandíbula',
        gallery: []
    },
    {
        id: 'cone-crusher',
        category: 'crushing',
        categoryLabel: 'Trituración y Agregados',
        brand: 'DASWELL',
        name: 'Trituradora de Cono',
        icon: TraceabilityIcon,
        status: 'bajo_pedido',
        description: 'Máquina de trituración secundaria o terciaria. Utiliza un manto giratorio para triturar roca contra un cóncavo. Produce agregados de forma cúbica excelente.',
        shortDescription: 'Trituración secundaria de precisión.',
        features: [
            'Capacidad: 5 - 530 tph',
            'Dimensiones: 2983*1866*3156 mm',
            'Tecnología: Hidráulica',
            'Producto: Agregado cúbico'
        ],
        imageUrl: 'https://plus.unsplash.com/premium_photo-1664303847960-586318f59035?q=80&w=2940&auto=format&fit=crop',
        imageAlt: 'Trituradora de cono',
        gallery: []
    },
    {
        id: 'impact-crusher',
        category: 'crushing',
        categoryLabel: 'Trituración y Agregados',
        brand: 'DASWELL',
        name: 'Trituradora de Impacto',
        icon: AnalysisIcon,
        status: 'bajo_pedido',
        description: 'Utiliza energía de impacto para romper materiales. Ideal para piedra caliza y materiales de dureza media. Alta relación de reducción.',
        shortDescription: 'Alto radio de reducción.',
        features: [
            'Alimentación: 400 - 1260 mm',
            'Capacidad: 15 - 800 t/h',
            'Rotor: Alta inercia',
            'Mantenimiento: Fácil acceso'
        ],
        imageUrl: 'https://images.unsplash.com/photo-1590486803833-1c5dc8ddd4c8?q=80&w=2874&auto=format&fit=crop',
        imageAlt: 'Trituradora de impacto',
        gallery: []
    },
    {
        id: 'hammer-crusher',
        category: 'crushing',
        categoryLabel: 'Trituración y Agregados',
        brand: 'DASWELL',
        name: 'Trituradora de Martillo',
        icon: CubeTransparentIcon,
        status: 'disponible',
        description: 'Trituradora de una etapa que utiliza martillos giratorios de alta velocidad. Eficiente para materiales frágiles como carbón, yeso y caliza.',
        shortDescription: 'Trituración de una etapa.',
        features: [
            'Capacidad: 5 - 50 t/h',
            'Potencia: 11 - 55 kW',
            'Uso: Materiales blandos',
            'Costo: Económico'
        ],
        imageUrl: 'https://images.unsplash.com/photo-1581093583449-ed252133d01e?q=80&w=2832&auto=format&fit=crop',
        imageAlt: 'Trituradora de martillo',
        gallery: []
    },
    {
        id: 'sand-making-machine',
        category: 'crushing',
        categoryLabel: 'Trituración y Agregados',
        brand: 'DASWELL',
        name: 'Máquina de Fabricación de Arena',
        icon: VisualizationIcon,
        status: 'bajo_pedido',
        description: 'Trituradora de impacto de eje vertical (VSI). Diseñada para producir arena artificial de alta calidad y dar forma a los agregados.',
        shortDescription: 'Producción de arena artificial.',
        features: [
            'Alimentación: 550 - 640 mm',
            'Dimensiones: 5500*2750*3950 mm',
            'Tecnología: Piedra contra piedra',
            'Producto: Arena fina'
        ],
        imageUrl: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=2940&auto=format&fit=crop',
        imageAlt: 'Máquina VSI para arena',
        gallery: []
    },
    {
        id: 'sand-washer',
        category: 'crushing',
        categoryLabel: 'Trituración y Agregados',
        brand: 'DASWELL',
        name: 'Lavadora de Arena',
        icon: TraceabilityIcon,
        status: 'disponible',
        description: 'Equipo de lavado tipo rueda utilizado para eliminar polvo e impurezas de la arena, mejorando su calidad para la construcción.',
        shortDescription: 'Lavado eficiente de áridos.',
        features: [
            'Tamaño alim.: ≤10 mm',
            'Capacidad: 20 - 250 t/h',
            'Tipo: Rueda / Cangilones',
            'Eficiencia: Alta limpieza'
        ],
        imageUrl: 'https://images.unsplash.com/photo-1574360778004-459807f7943d?q=80&w=2940&auto=format&fit=crop',
        imageAlt: 'Lavadora de arena',
        gallery: []
    },
    {
        id: 'fine-sand-recycling',
        category: 'crushing',
        categoryLabel: 'Trituración y Agregados',
        brand: 'DASWELL',
        name: 'Máquina de Reciclaje de Arena Fina',
        icon: ShieldCheckIcon,
        status: 'bajo_pedido',
        description: 'Sistema diseñado para recuperar la arena fina que se pierde en el proceso de lavado tradicional, aumentando la producción total y reduciendo residuos.',
        shortDescription: 'Recuperación de finos.',
        features: [
            'Tamaño alim.: ≤10 mm',
            'Capacidad: 20 - 250 t/h',
            'Recuperación: >90%',
            'Beneficio: Mayor rentabilidad'
        ],
        imageUrl: 'https://images.unsplash.com/photo-1535732759880-bbd5c7265e3f?q=80&w=2864&auto=format&fit=crop',
        imageAlt: 'Equipo de reciclaje de arena',
        gallery: []
    },

    // --- SEGMENTO: MOLIENDA INDUSTRIAL (MILLING) ---
    {
        id: 'ball-mill',
        category: 'milling',
        categoryLabel: 'Molienda Industrial',
        brand: 'DASWELL',
        name: 'Molino de Bolas',
        icon: AnalysisIcon,
        status: 'bajo_pedido',
        description: 'Equipo clave para la molienda de materiales triturados. Adecuado para molienda seca y húmeda de diversos minerales y materiales molibles como calcita, mármol y caliza.',
        shortDescription: 'Molienda industrial de alta capacidad.',
        features: [
            'Capacidad: 1 - 500,000 t/año',
            'Materiales: Calcita, Mármol, Caliza',
            'Tipo: Rejilla / Desbordamiento',
            'Uso: Minería y Cemento'
        ],
        imageUrl: 'https://images.unsplash.com/photo-1629738848773-195f0022f468?q=80&w=2940&auto=format&fit=crop',
        imageAlt: 'Molino de bolas industrial',
        gallery: []
    },
    {
        id: 'ring-roller-mill',
        category: 'milling',
        categoryLabel: 'Molienda Industrial',
        brand: 'DASWELL',
        name: 'Molino de Rodillos (Micro Polvo)',
        icon: TraceabilityIcon,
        status: 'bajo_pedido',
        description: 'Molino diseñado para la producción de polvos ultrafinos. Su tecnología de rodillos permite obtener una finura de descarga excepcional, ideal para aplicaciones industriales exigentes.',
        shortDescription: 'Pulverización ultrafina de precisión.',
        features: [
            'Alimentación: 0 - 10 mm',
            'Descarga: 5 - 45 μm',
            'Eficiencia: Alta finura',
            'Aplicación: Polvos químicos/minerales'
        ],
        imageUrl: 'https://images.unsplash.com/photo-1535732820275-9ffd998cac22?q=80&w=2940&auto=format&fit=crop',
        imageAlt: 'Molino de micro polvo',
        gallery: []
    },
    {
        id: 'raymond-mill',
        category: 'milling',
        categoryLabel: 'Molienda Industrial',
        brand: 'DASWELL',
        name: 'Molino Raymond',
        icon: ServerStackIcon,
        status: 'bajo_pedido',
        description: 'El clásico molino pendular Raymond, optimizado para la molienda de materiales no inflamables y no explosivos. Estructura vertical compacta con sistema de clasificación de aire integrado.',
        shortDescription: 'Molienda pendular eficiente.',
        features: [
            'Alim. Máx: 20 - 30 mm',
            'Descarga: 45 - 180 μm',
            'Estructura: Vertical compacta',
            'Uso: Minerales no metálicos'
        ],
        imageUrl: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?q=80&w=2940&auto=format&fit=crop',
        imageAlt: 'Molino Raymond',
        gallery: []
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
    road: {
        title: "Maquinaria Vial",
        subtitle: "Plantas de Asfalto y Pavimentación",
        heroImage: "https://images.unsplash.com/photo-1590486803833-1c5dc8ddd4c8?q=80&w=2874&auto=format&fit=crop",
        description: "Infraestructura integral para carreteras. Plantas de asfalto de alta eficiencia y equipos de pavimentación diseñados para cumplir con los estándares internacionales más estrictos.",
        stats: [
            { label: "Capacidad", value: "400 t/h" },
            { label: "Precisión", value: "Digital" },
            { label: "Movilidad", value: "Modular" },
        ]
    },
    crushing: {
        title: "Trituración y Agregados",
        subtitle: "Procesamiento de Minerales",
        heroImage: "https://images.unsplash.com/photo-1578326584285-d852a32c253b?q=80&w=2940&auto=format&fit=crop",
        description: "Equipos de trituración, cribado y lavado para canteras y minería. Desde plantas móviles compactas hasta instalaciones estacionarias de gran capacidad.",
        stats: [
            { label: "Capacidad", value: "1100 tph" },
            { label: "Materiales", value: "Roca Dura" },
            { label: "Sistemas", value: "Móviles" },
        ]
    },
    milling: {
        title: "Molienda Industrial",
        subtitle: "Equipos de Pulverización Fina",
        heroImage: "https://images.unsplash.com/photo-1629738848773-195f0022f468?q=80&w=2940&auto=format&fit=crop",
        description: "Tecnología avanzada para la molienda de minerales. Molinos de bolas y rodillos diseñados para alcanzar niveles de finura micrométrica con alta eficiencia energética.",
        stats: [
            { label: "Finura", value: "5-45 μm" },
            { label: "Capacidad", value: "500k t/a" },
            { label: "Uso", value: "Minería" },
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