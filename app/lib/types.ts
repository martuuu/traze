export type PlantStage = 
  | 'germination' 
  | 'seedling' 
  | 'vegetative' 
  | 'flowering' 
  | 'harvested' 
  | 'drying' 
  | 'curing' 
  | 'stock';

export interface Plant {
  id: string;
  tag: string;
  strain: string;
  stage: PlantStage;
  location: string;
  daysInStage: number;
  health: 'healthy' | 'issue' | 'pest';
  germinationDate: string;
  batchId?: string;
}

export interface Patient {
  id: string;
  name: string;
  reprocann: string;
  status: 'active' | 'expired' | 'pending';
  plantsCount: number;
  plants: Plant[];
  email?: string;
  phone?: string;
  joinedDate?: string;
}

export interface Organization {
  name: string;
  license: string;
  address: string;
  maxPatients: number;
  currentPatients: number;
  responsiblePerson: string;
}

export interface AuditStat {
  label: string;
  value: string;
  status: 'success' | 'warning' | 'error';
  subtext?: string;
}

export interface TraceLog {
  id: string;
  timestamp: string;
  action: string;
  details: string;
  user: string;
  type: 'move' | 'water' | 'feed' | 'cut' | 'destroy' | 'harvest';
}

export interface Report {
  id: string;
  label: string;
  status: 'Presentado' | 'Pendiente' | 'Archivado';
  date: string;
  color: 'green' | 'amber' | 'gray';
  code: string;
}
