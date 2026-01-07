
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
// Note: In a real app we'd need service role key for bypassing RLS, 
// but here we might rely on anon if RLS allows or if we have the service key in env. 
// Actually, I don't have the service key in the visible context usually, 
// let's try to use the anon key and hope RLS allows insert for 'authenticated' (simulated) 
// or I'll just use the user's ID if I can get it. 
// Wait, I can't easily get the logged in user's ID here without a session.
// I'll grab the *first* user from 'profiles' and update them.

// ACTUALLY, I should check if I have the SERVICE_ROLE_KEY. 
// I'll assume I do not and try to use a specific user email if known, or just list users.

const supabase = createClient(supabaseUrl, supabaseKey);

async function main() {
    console.log('Connecting to Supabase...');

    // 1. Get a user (any user)
    const { data: users, error: userError } = await supabase.from('profiles').select('*').limit(1);

    if (userError || !users || users.length === 0) {
        console.error('Error fetching users:', userError);
        return;
    }

    const user = users[0];
    console.log(`Target User: ${user.email} (${user.id})`);

    // 2. Force Pass Exam
    // We need an exam_id. Let's fetch the first exam.
    let { data: exams } = await supabase.from('exams').select('id').limit(1);

    let examId;
    if (!exams || exams.length === 0) {
        console.log('No exams found. Creating one...');
        const { data: newExam, error: createError } = await supabase.from('exams').insert({
            title: 'Test Exam',
            description: 'Created by script',
            time_limit_minutes: 60,
            passing_score: 70
        }).select().single();

        if (createError) {
            console.error('Failed to create exam:', createError);
            return;
        }
        examId = newExam.id;
    } else {
        examId = exams[0].id;
    }

    const { error: examError } = await supabase.from('exam_results').upsert({
        user_id: user.id,
        exam_id: examId,
        score: 100,
        is_passed: true,
        answers: {},
        completed_at: new Date().toISOString(),
    });

    if (examError) console.error('Exam Update Error:', examError);
    else console.log('✅ Exam Result: PASSED');

    // 3. Force Pay Order
    // Create or update an order for 'Certificate'
    const { error: orderError } = await supabase.from('orders').insert({
        user_id: user.id,
        merchant_uid: `cert_${Date.now()}`,
        name: '심리상담사 1급 자격증',
        amount: 50000,
        status: 'paid', // FORCE PAID
        paid_at: new Date().toISOString(),
    });

    if (orderError) console.error('Order Update Error:', orderError);
    else console.log('✅ Order Status: PAID');
}

main();
