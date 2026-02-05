-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. ORGANIZATIONS (Tenants)
CREATE TABLE organizations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    cuit TEXT,
    subscription_plan TEXT DEFAULT 'basic',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. USERS (Profiles linked to Auth)
CREATE TABLE users (
    id UUID PRIMARY KEY REFERENCES auth.users(id),
    organization_id UUID REFERENCES organizations(id),
    full_name TEXT,
    role TEXT CHECK (role IN ('owner', 'grower', 'auditor', 'patient')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. PATIENTS
CREATE TABLE patients (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    organization_id UUID REFERENCES organizations(id),
    full_name TEXT NOT NULL,
    reprocann_code TEXT NOT NULL,
    reprocann_expiration DATE,
    status TEXT CHECK (status IN ('active', 'expired', 'pending')) DEFAULT 'pending',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. PLANTS (Traceability Core)
CREATE TABLE plants (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    organization_id UUID REFERENCES organizations(id),
    patient_id UUID REFERENCES patients(id),
    tag TEXT NOT NULL, -- e.g. AR-4402
    strain TEXT NOT NULL,
    stage TEXT CHECK (stage IN ('germination', 'seedling', 'vegetative', 'flowering', 'drying', 'curing', 'stock', 'packaged')),
    location TEXT,
    health TEXT CHECK (health IN ('healthy', 'issue', 'pest')) DEFAULT 'healthy',
    germination_date DATE DEFAULT CURRENT_DATE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. AUDIT LOGS (Immutable)
CREATE TABLE audit_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    organization_id UUID REFERENCES organizations(id),
    entity_id UUID NOT NULL, -- Plant ID or Patient ID
    entity_type TEXT NOT NULL,
    action TEXT NOT NULL,
    performed_by UUID REFERENCES auth.users(id),
    details JSONB,
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- RLS POLICIES (Row Level Security)
ALTER TABLE organizations ENABLE ROW LEVEL SECURITY;
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE patients ENABLE ROW LEVEL SECURITY;
ALTER TABLE plants ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;

-- Simple policy: Users can see data from their own organization
CREATE POLICY "Users view their org data" ON patients
    USING (organization_id IN (
        SELECT organization_id FROM users WHERE id = auth.uid()
    ));

CREATE POLICY "Users view their org plants" ON plants
    USING (organization_id IN (
        SELECT organization_id FROM users WHERE id = auth.uid()
    ));

-- CRITICAL BUSINESS LOGIC: 9 Plants Limit Trigger
CREATE OR REPLACE FUNCTION check_plant_limit()
RETURNS TRIGGER AS $$
DECLARE
    plant_count INTEGER;
BEGIN
    -- Only check if moving to flowering
    IF NEW.stage = 'flowering' THEN
        SELECT COUNT(*) INTO plant_count
        FROM plants
        WHERE patient_id = NEW.patient_id AND stage = 'flowering';
        
        IF plant_count >= 9 THEN
            RAISE EXCEPTION 'Violación de Normativa 3132/2024: El paciente ya tiene 9 plantas en floración.';
        END IF;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER enforce_plant_limit
BEFORE INSERT OR UPDATE ON plants
FOR EACH ROW
EXECUTE FUNCTION check_plant_limit();
