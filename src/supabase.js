import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://mbhpegwytybjmulgyptr.supabase.co';
const supabaseKey = 'sb_publishable_uMSiDBFQ7GXydAQFrqPMOw_FG74tFa5';

export const supabase = createClient(supabaseUrl, supabaseKey);