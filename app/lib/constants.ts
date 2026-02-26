import { Patient, TraceLog, Organization } from './types';

export const MOCK_ORG: Organization = {
    name: 'Traze Cultivos Solidarios',
    license: 'ARG-2024-992-ONG',
    address: 'Av. Libertador 2201, CABA',
    maxPatients: 150,
    currentPatients: 142,
    responsiblePerson: 'Ing. Agr. Juan Traze'
};

export const MOCK_LOGS: TraceLog[] = [
    { id: '1', timestamp: '10:02', action: 'Cambio de Sala', details: 'Lote B-04 movido a Floración', user: 'Op. Carlos', type: 'move' },
    { id: '2', timestamp: '09:15', action: 'Riego', details: 'Riego con Nutrientes (Veg) Sala A', user: 'Op. Maria', type: 'water' },
    { id: '3', timestamp: '08:30', action: 'Control Plagas', details: 'Aplicación preventiva Neem Lote C-11', user: 'Ing. Juan', type: 'water' },
    { id: '4', timestamp: 'Ayer', action: 'Esquejado', details: 'Creación de 50 clones Lemon Haze', user: 'Ing. Juan', type: 'cut' },
    { id: '5', timestamp: 'Ayer', action: 'Descarte', details: 'Planta #9921 por Plaga (Araña Roja)', user: 'Ing. Juan', type: 'destroy' },
    { id: '6', timestamp: 'Hace 2 días', action: 'Cosecha', details: 'Lote C-11 (12.5kg húmedo)', user: 'Op. Carlos', type: 'harvest' },
    { id: '7', timestamp: 'Hace 2 días', action: 'Asignación', details: 'Planta #882 asignada a Paciente P-102', user: 'Admin', type: 'move' },
    { id: '8', timestamp: 'Hace 3 días', action: 'Control Calidad', details: 'Test de humedad en sala de secado', user: 'Op. Maria', type: 'water' },
    { id: '9', timestamp: 'Hace 4 días', action: 'Poda', details: 'Poda de bajos Lote B-04', user: 'Op. Carlos', type: 'cut' },
    { id: '10', timestamp: 'Hace 5 días', action: 'Ingreso', details: 'Recepción 1500 semillas Blue Dream', user: 'Admin', type: 'move' },
];

export const MOCK_LOTES = [
    { id: 'L001', name: 'Lote Verano Alpha', genetic: 'Blue Dream', stage: 'Floración', plants: 145, location: 'Sala A', startDate: '2023-11-20', lastAction: 'Riego (Ayer)' },
    { id: 'L002', name: 'Esquejes OG', genetic: 'OG Kush', stage: 'Vegetativo', plants: 200, location: 'Esquejera', startDate: '2024-01-05', lastAction: 'Enraizado (Hoy)' },
    { id: 'L003', name: 'Premium Haze', genetic: 'Super Silver Haze', stage: 'Secado', plants: 80, location: 'Secadero 1', startDate: '2023-10-15', lastAction: 'Corte (Hace 3 días)' },
    { id: 'L004', name: 'Experimental CBD', genetic: 'Cannatonic', stage: 'Vegetativo', plants: 50, location: 'Sala B', startDate: '2024-01-20', lastAction: 'Poda Apical (Hoy)' },
];

export const MOCK_PATIENTS: Patient[] = [
  {
    id: '1',
    name: 'Juan Pérez',
    reprocann: '26550',
    status: 'active',
    plantsCount: 5,
    joinedDate: '2023-01-15',
    plants: [
        { id: 'p1', tag: 'AR-4402', strain: 'Blue Dream', stage: 'flowering', location: 'Sala A', daysInStage: 24, health: 'healthy', germinationDate: '2023-10-01' },
        { id: 'p2', tag: 'AR-4403', strain: 'OG Kush', stage: 'flowering', location: 'Sala A', daysInStage: 24, health: 'healthy', germinationDate: '2023-10-01' },
        { id: 'p3', tag: 'AR-4405', strain: 'Sour Diesel', stage: 'flowering', location: 'Sala A', daysInStage: 24, health: 'healthy', germinationDate: '2023-10-01' },
        { id: 'p4', tag: 'AR-4408', strain: 'Sour Diesel', stage: 'flowering', location: 'Sala A', daysInStage: 24, health: 'healthy', germinationDate: '2023-10-01' },
        { id: 'p5', tag: 'AR-4410', strain: 'Lemon Haze', stage: 'drying', location: 'Sala Secado', daysInStage: 4, health: 'healthy', germinationDate: '2023-09-15' },
    ]
  },
  {
    id: '2',
    name: 'María González',
    reprocann: '18992',
    status: 'active',
    plantsCount: 8,
    joinedDate: '2023-03-20',
    plants: Array(8).fill(null).map((_, i) => ({ 
        id: `mg-${i}`, tag: `MG-${i+10}`, strain: 'Gelato', stage: 'vegetative', location: 'Sala B', daysInStage: 40, health: 'healthy', germinationDate: '2023-11-01' 
    }))
  },
  {
    id: '3',
    name: 'Carlos Rodriguez',
    reprocann: '99201',
    status: 'expired',
    plantsCount: 0,
    joinedDate: '2022-11-05',
    plants: []
  },
  {
    id: '4',
    name: 'Elena Martínez',
    reprocann: '44521',
    status: 'active',
    plantsCount: 9,
    plants: Array(9).fill(null).map((_, i) => ({ id: `em-${i}`, tag: `EM-${i+55}`, strain: 'Amnesia', stage: 'flowering', location: 'Sala A', daysInStage: 45, health: 'healthy', germinationDate: '2023-09-01' }))
  },
  {
    id: '5',
    name: 'Roberto Gómez',
    reprocann: '11203',
    status: 'pending',
    plantsCount: 0,
    plants: []
  },
  {
    id: '6',
    name: 'Sofía Larken',
    reprocann: '77821',
    status: 'active',
    plantsCount: 3,
    plants: Array(3).fill(null).map((_, i) => ({ id: `sl-${i}`, tag: `SL-${i+12}`, strain: 'Gorilla Glue', stage: 'seedling', location: 'Sala C', daysInStage: 5, health: 'healthy', germinationDate: '2024-01-10' }))
  },
  {
    id: '7',
    name: 'Miguel Ángel Torres',
    reprocann: '33491',
    status: 'active',
    plantsCount: 1,
    plants: [{ id: 'mat-1', tag: 'MAT-01', strain: 'Purple Haze', stage: 'curing', location: 'Frascos', daysInStage: 15, health: 'healthy', germinationDate: '2023-08-15' }]
  },
  {
    id: '8',
    name: 'Laura Esquivel',
    reprocann: '88122',
    status: 'expired',
    plantsCount: 0,
    plants: []
  }
];

export const IMAGES = {
  flowering: "https://images.unsplash.com/photo-1603909223429-69bb7101f420?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  leaf: "https://images.unsplash.com/photo-1550088862-a98ea6347201?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
}

export const plantStageColors: Record<string, string> = {
    'vegetative': 'bg-emerald-400',
    'flowering': 'bg-purple-500',
    'seedling': 'bg-blue-300',
    'harvested': 'bg-amber-500',
    'drying': 'bg-orange-400',
    'curing': 'bg-amber-700'
};
