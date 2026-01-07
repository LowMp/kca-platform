-- 1. 현재 로그인된 계정(yuhony1234@gmail.com)의 프로필 강제 생성 및 관리자 권한 부여
insert into public.profiles (id, email, name, role, joined_at)
select id, email, raw_user_meta_data->>'name', 'admin', created_at
from auth.users
where email = 'yuhony1234@gmail.com'
on conflict (id) do update
set role = 'admin'; -- 이미 존재한다면 관리자로 승격

-- 2. (혹시 모를 다른 누락된 분들을 위한) 전체 프로필 복구
-- auth.users에는 있는데 profiles에는 없는 사람들을 찾아서 채워넣습니다.
insert into public.profiles (id, email, name, role, joined_at)
select id, email, raw_user_meta_data->>'name', 'user', created_at
from auth.users
where id not in (select id from public.profiles)
on conflict do nothing;
