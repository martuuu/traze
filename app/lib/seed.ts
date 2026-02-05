import { createClient } from '@supabase/supabase-js';
import { MOCK_PATIENTS, MOCK_ORG } from './constants';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase credentials');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function seed() {
  console.log('🌱 Seeding database...');

  // 1. Create Organization
  const { data: org, error: orgError } = await supabase
    .from('organizations')
    .insert([{
        name: MOCK_ORG.name,
        cuit: '30-11223344-5',
        subscription_plan: 'pro'
    }])
    .select()
    .single();

  if (orgError) {
     console.error('Error creating org:', orgError);
     return;
  }
  console.log('✅ Organization created:', org.id);

  // 2. Create Patients
  for (const p of MOCK_PATIENTS) {
      const { data: patient, error: pError } = await supabase
        .from('patients')
        .insert([{
            organization_id: org.id,
            full_name: p.name,
            reprocann_code: p.reprocann,
            status: p.status,
            reprocann_expiration: '2025-01-01' // Mock date
        }])
        .select()
        .single();
      
      if (pError) console.error('Error creating patient:', pError);
      else console.log(`   - Patient ${p.name} created.`);
  }

  console.log('✨ Seed complete!');
}

seed();
