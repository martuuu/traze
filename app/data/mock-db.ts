// app/data/mock-db.ts

// This file contains a robust set of simulated data for the Traze MVP. 

export type Provider = {
    id: string;
    name: string;
    inaseNumber: string;
    contact: string;
    status: 'ACTIVE' | 'INACTIVE';
};

export type Seed = {
    id: string;
    providerId: string;
    name: string;
    genetics: string; // e.g. "Sativa 70% / Indica 30%"
    thcCbdRatio: string; // e.g. "THC 15% / CBD <1%"
    purchaseDate: string;
    quantity: number; // Initially bought quantity
    currentStock: number; // Available quantity
    inaseStamp: string;
    germinationPower: number; // percentage
    invoiceUrl?: string;
    status: 'IN_STOCK' | 'DEPLETED';
};

export type Lot = {
    id: string;
    seedId: string;
    name: string;
    creationDate: string;
    expirationDate: string;
    quantity: number;
    assignedLocation: string;
    status: 'ACTIVE' | 'ARCHIVED';
    conditions: { temp: number; humidity: number }; // Simulated conservation conditions
};

export type ReprocannPatient = {
    id: string;
    fullName: string;
    dni: string;
    reprocannCode: string;
    expirationDate: string;
    assignedPlantsCount: number; // Out of 9 max
    medicalCondition: string;
    status: 'ACTIVE' | 'PENDING' | 'EXPIRED';
};

export type PlantStage = 'GERMINATION' | 'VEGETATIVE' | 'FLOWERING' | 'HARVESTED' | 'DRYING' | 'EXTRACTED';

export type Plant = {
    id: string;
    batchId: string;
    patientId: string | null; // Null if not assigned yet
    qrUuid: string;
    currentStage: PlantStage;
    stageStartDate: string;
    location: string; // e.g., "Sala 1 - Indoor"
    events: PlantEvent[];
};

export type PlantEvent = {
    id: string;
    date: string;
    actionType: 'PLANTED' | 'TRANSFERRED' | 'PODA' | 'STAGE_CHANGE' | 'FERTILIZED' | 'NOTE';
    description: string;
    user: string;
};

// --- MOCK DATA ---

export const providers: Provider[] = [
    { id: 'prov-001', name: 'Genética Andina SRL', inaseNumber: 'INASE-2023-A45', contact: 'ventas@g-andina.com.ar', status: 'ACTIVE' },
    { id: 'prov-002', name: 'Semillas del Sur', inaseNumber: 'INASE-2022-B12', contact: 'contacto@semillassur.com', status: 'ACTIVE' },
];

export const seeds: Seed[] = [
    {
        id: 'seed-100',
        providerId: 'prov-001',
        name: 'Andes Kush (CAT 2)',
        genetics: 'Índica 80% / Sativa 20%',
        thcCbdRatio: 'THC: <1% / CBD: 18%', // CBD dominant, good for medical
        purchaseDate: '2024-01-15',
        quantity: 500,
        currentStock: 150,
        inaseStamp: 'STP-99213',
        germinationPower: 95,
        status: 'IN_STOCK',
    },
    {
        id: 'seed-101',
        providerId: 'prov-002',
        name: 'Patagonia Sour',
        genetics: 'Sativa 60% / Índica 40%',
        thcCbdRatio: 'THC: 12% / CBD: 8%', // Balanced
        purchaseDate: '2024-02-10',
        quantity: 1000,
        currentStock: 800,
        inaseStamp: 'STP-77421',
        germinationPower: 92,
        status: 'IN_STOCK',
    }
];

export const lots: Lot[] = [
    {
        id: 'lot-24-001',
        seedId: 'seed-100',
        name: 'Lote Andes Kush - Q1',
        creationDate: '2024-01-20',
        expirationDate: '2025-01-20',
        quantity: 350, // They allocated 350 from the 500 bought
        assignedLocation: 'Banco Frio - A1',
        status: 'ACTIVE',
        conditions: { temp: 4, humidity: 30 }
    },
    {
        id: 'lot-24-002',
        seedId: 'seed-101',
        name: 'Lote Patagonia - Inicial',
        creationDate: '2024-02-15',
        expirationDate: '2025-02-15',
        quantity: 200,
        assignedLocation: 'Banco Frio - B2',
        status: 'ACTIVE',
        conditions: { temp: 5, humidity: 32 }
    }
];

export const patients: ReprocannPatient[] = [
    {
        id: 'pat-001',
        fullName: 'Martín Navarro',
        dni: '35.123.456',
        reprocannCode: 'REP-2024-AB12',
        expirationDate: '2025-04-10',
        assignedPlantsCount: 7, // 7 out of 9
        medicalCondition: 'Epilepsia Refractaria',
        status: 'ACTIVE'
    },
    {
        id: 'pat-002',
        fullName: 'Lucía Gómez',
        dni: '38.987.654',
        reprocannCode: 'REP-2023-XY99',
        expirationDate: '2024-11-05',
        assignedPlantsCount: 9, // LIMIT REACHED
        medicalCondition: 'Dolor Crónico',
        status: 'ACTIVE'
    },
    {
        id: 'pat-003',
        fullName: 'Carlos Sanchez',
        dni: '29.333.111',
        reprocannCode: 'REP-2024-ZZ01',
        expirationDate: '2025-01-20',
        assignedPlantsCount: 0, // NEW PATIENT
        medicalCondition: 'Insomnio Severo',
        status: 'PENDING'
    }
];

export const plants: Plant[] = [
    {
        id: 'plt-4001',
        batchId: 'lot-24-001',
        patientId: 'pat-001',
        qrUuid: '0192a-3b5-41d',
        currentStage: 'FLOWERING',
        stageStartDate: '2024-03-01',
        location: 'Sala 1 - Indoor Flora',
        events: [
            { id: 'ev-1', date: '2024-01-22', actionType: 'PLANTED', description: 'Semilla germinada y plantada en sustrato.', user: 'Ing. Agrónomo' },
            { id: 'ev-2', date: '2024-02-05', actionType: 'STAGE_CHANGE', description: 'Pase a etapa vegetativa. Trasplante a maceta de 10L.', user: 'Operario Cultivo' },
            { id: 'ev-3', date: '2024-03-01', actionType: 'STAGE_CHANGE', description: 'Inicio de floración. Cambio de ciclo lumínico a 12/12.', user: 'Ing. Agrónomo' },
        ]
    },
    {
        id: 'plt-4002',
        batchId: 'lot-24-001',
        patientId: 'pat-002',
        qrUuid: '0192a-3b5-88x',
        currentStage: 'FLOWERING',
        stageStartDate: '2024-03-05',
        location: 'Sala 1 - Indoor Flora',
        events: [
            { id: 'ev-1', date: '2024-01-25', actionType: 'PLANTED', description: 'Semilla germinada y plantada.', user: 'Ing. Agrónomo' },
        ]
    },
     {
        id: 'plt-4003',
        batchId: 'lot-24-002',
        patientId: null, // Unassigned plant
        qrUuid: '002x-abc-99d',
        currentStage: 'VEGETATIVE',
        stageStartDate: '2024-03-15',
        location: 'Sala 2 - Indoor Vege',
        events: [
            { id: 'ev-1', date: '2024-03-01', actionType: 'PLANTED', description: 'Esqueje de planta madre plantado.', user: 'Operario Cultivo' },
        ]
    }
];

// SIMULATED YEARLY STATS FOR REPORTS
export const yearlyStatsData = [
    { name: 'Ene', seeds: 1500, cultivated: 300, harvested: 0, extracted: 0 },
    { name: 'Feb', seeds: 1300, cultivated: 450, harvested: 0, extracted: 0 },
    { name: 'Mar', seeds: 1100, cultivated: 450, harvested: 200, extracted: 50 },
    { name: 'Abr', seeds: 1000, cultivated: 500, harvested: 300, extracted: 100 },
    { name: 'May', seeds: 950, cultivated: 600, harvested: 350, extracted: 150 },
    { name: 'Jun', seeds: 800, cultivated: 650, harvested: 400, extracted: 200 },
    { name: 'Jul', seeds: 700, cultivated: 700, harvested: 450, extracted: 250 },
    { name: 'Ago', seeds: 1200, cultivated: 750, harvested: 500, extracted: 300 }, // Bought more seeds
    { name: 'Sep', seeds: 1050, cultivated: 800, harvested: 600, extracted: 350 },
    { name: 'Oct', seeds: 900, cultivated: 850, harvested: 700, extracted: 400 },
    { name: 'Nov', seeds: 750, cultivated: 900, harvested: 800, extracted: 500 },
    { name: 'Dic', seeds: 600, cultivated: 950, harvested: 900, extracted: 600 },
];
