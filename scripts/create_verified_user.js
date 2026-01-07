
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

const TEST_EMAIL = 'pdf_tester@kca.kr';
const TEST_PASS = 'password123';

async function main() {
    console.log(`Creating/Verifying User: ${TEST_EMAIL}`);

    // 1. Sign Up / Sign In
    let { data: auth, error: authError } = await supabase.auth.signUp({
        email: TEST_EMAIL,
        password: TEST_PASS,
        options: {
            data: { name: 'PDF_Tester', phone: '010-1234-5678' }
        }
    });

    if (authError) {
        // If already exists, try signing in
        console.log('User exists, signing in...');
        const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
            email: TEST_EMAIL,
            password: TEST_PASS,
        });
        if (signInError) {
            console.error('Sign In Failed:', signInError);
            return;
        }
        auth = signInData;
    }

    if (!auth.session) {
        console.error('No session established.');
        return;
    }

    console.log('✅ Logged In. User ID:', auth.user.id);

    // 2. Search Exam (Now Authenticated)
    const { data: exams, error: examFetchError } = await supabase.from('exams').select('id').limit(1);

    let examId;
    if (!exams || exams.length === 0) {
        console.log('No exams found (RLS might still block insert if not Admin). Using fallback ID if known or creating...');
        // Note: Creating exam requires Admin. We are just a user. 
        // We hope an exam exists. If RLS allows read for auth, we should see it.
        // If not, we are stuck unless we use service key (which we don't have easily).
        // Let's assume the previous schema creation made one and Auth Read allows it.
        return console.error('Exams table empty or not readable.');
    } else {
        examId = exams[0].id;
        console.log('Found Exam ID:', examId);
    }

    // 3. Submit Exam Result
    const { error: resultError } = await supabase.from('exam_results').upsert({
        user_id: auth.user.id,
        exam_id: examId,
        score: 100,
        is_passed: true,
        answers: { 'q1': 4, 'q2': 4 },
        completed_at: new Date().toISOString(),
    }, { onConflict: 'user_id, exam_id' });

    if (resultError) console.error('Exam Result Error:', resultError);
    else console.log('✅ Exam PASSED.');

    // 4. Create Paid Order
    // Check if order exists first to avoid duplicate key if unique constraints exist (merchant_uid)
    const merchant_uid = `cert_${auth.user.id}_v1`;

    // We can just query first
    const { data: existingOrder } = await supabase.from('orders').select('*').eq('merchant_uid', merchant_uid).single();

    if (!existingOrder) {
        const { error: orderError } = await supabase.from('orders').insert({
            user_id: auth.user.id,
            merchant_uid: merchant_uid,
            name: '심리상담사 1급 자격증',
            amount: 50000,
            status: 'paid',
            paid_at: new Date().toISOString(),
        });
        if (orderError) console.error('Order Create Error:', orderError);
        else console.log('✅ Order PAID.');
    } else {
        console.log('✅ Order already exists.');
    }
}

main();
