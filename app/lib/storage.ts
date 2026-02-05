'use client';

// Initial Mock Data Imports
import { MOCK_PATIENTS, MOCK_LOTES } from './constants';

// Types
import { Patient } from './types';
export type { Patient };

export interface Lote {
    id: string;
    name: string;
    genetic: string;
    stage: string;
    plants: number;
    location: string;
    startDate: string;
    lastAction: string;
}

export interface Plant {
    id: string;
    tag: string;
    strain: string;
    stage: string;
    location: string;
    patient: string;
    health: string;
    daysInStage: number;
}

// Initial Plants Generator (since we generated them on the fly before)
const INITIAL_PLANTS: Plant[] = Array.from({ length: 50 }).map((_, i) => ({
    id: `P${1000 + i}`,
    tag: `TRZ-24-${1000 + i}`,
    strain: i % 3 === 0 ? 'Blue Dream' : i % 3 === 1 ? 'OG Kush' : 'Gorilla Glue',
    stage: i % 4 === 0 ? 'vegetative' : i % 4 === 1 ? 'flowering' : i % 4 === 2 ? 'drying' : 'curing',
    location: i % 2 === 0 ? 'Sala A' : 'Sala B',
    patient: i % 5 === 0 ? 'Sin Asignar' : `Paciente ${i}`,
    health: i % 10 === 0 ? 'attention' : 'healthy',
    daysInStage: Math.floor(Math.random() * 60) + 1
}));


// Storage Keys
const KEYS = {
    PATIENTS: 'traze_patients_v1',
    LOTES: 'traze_lotes_v1',
    PLANTS: 'traze_plants_v1'
};

// Generic Helper
function getFromStorage<T>(key: string, initialData: T): T {
    if (typeof window === 'undefined') return initialData;
    
    try {
        const item = window.localStorage.getItem(key);
        return item ? JSON.parse(item) : initialData;
    } catch (error) {
        console.error(`Error reading ${key} from storage`, error);
        return initialData;
    }
}

function saveToStorage<T>(key: string, data: T) {
    if (typeof window === 'undefined') return;
    try {
        window.localStorage.setItem(key, JSON.stringify(data));
    } catch (error) {
        console.error(`Error saving ${key} to storage`, error);
    }
}

// --- Data Access Layers ---

// PATIENTS
export const getPatients = (): Patient[] => {
    const stored = getFromStorage(KEYS.PATIENTS, null);
    if (!stored) {
        // Initialize with default mocks if empty
        saveToStorage(KEYS.PATIENTS, MOCK_PATIENTS);
        return MOCK_PATIENTS;
    }
    return stored;
};

export const createPatient = (patient: Omit<Patient, 'id' | 'plants'>) => {
    const patients = getPatients();
    const newPatient: Patient = {
        ...patient,
        id: `P-${Math.floor(Math.random() * 10000)}`, // Simple ID gen
        plants: []
    };
    const updated = [newPatient, ...patients];
    saveToStorage(KEYS.PATIENTS, updated);
    return newPatient;
};

// LOTES
export const getLotes = (): Lote[] => {
    const stored = getFromStorage(KEYS.LOTES, null);
    if (!stored) {
        saveToStorage(KEYS.LOTES, MOCK_LOTES);
        return MOCK_LOTES;
    }
    return stored;
};

export const createLote = (lote: Omit<Lote, 'id' | 'plants' | 'lastAction'>) => {
    const lotes = getLotes();
    const newLote: Lote = {
        ...lote,
        id: `L${Math.floor(Math.random() * 1000)}`,
        plants: 0,
        lastAction: 'Creado Recientemente'
    };
    const updated = [newLote, ...lotes];
    saveToStorage(KEYS.LOTES, updated);
    return newLote;
};

// PLANTS
export const getPlants = (): Plant[] => {
    const stored = getFromStorage(KEYS.PLANTS, null);
    if (!stored) {
        saveToStorage(KEYS.PLANTS, INITIAL_PLANTS);
        return INITIAL_PLANTS;
    }
    return stored;
};

export const createPlant = (plant: Omit<Plant, 'id' | 'tag' | 'daysInStage' | 'health'>) => {
    const plants = getPlants();
    const idNum = Math.floor(Math.random() * 9000) + 1000;
    const newPlant: Plant = {
        ...plant,
        id: `P${idNum}`,
        tag: `TRZ-24-${idNum}`,
        stage: 'vegetative', // Default start
        health: 'healthy',
        daysInStage: 0
    };
    const updated = [newPlant, ...plants];
    saveToStorage(KEYS.PLANTS, updated);
    return newPlant;
};
