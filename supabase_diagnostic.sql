-- 1. 진짜 내 프로필이 없는지 확인해보기 (결과가 나오는지 보세요!)
select * from public.profiles where email = 'yuhony1234@gmail.com';

-- 2. 만약 위에서 결과가 나오는데도 웹사이트에서 'MISSING'이라고 뜬다면,
--    100% "보안 정책(RLS)" 문제입니다. 일단 보안을 잠시 꺼서 확인해봅시다.
alter table public.profiles disable row level security;

-- 3. 보안을 껐는데도 안 나온다면, 아까 INSERT가 실패한 겁니다. 다시 강제로 넣어봅시다.
insert into public.profiles (id, email, name, role, joined_at)
select id, email, coalesce(raw_user_meta_data->>'name', '관리자'), 'admin', created_at
from auth.users
where email = 'yuhony1234@gmail.com'
on conflict (id) do update
set role = 'admin';
