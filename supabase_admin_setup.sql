-- 1. profiles 테이블에 'role'과 'joined_at' 컬럼 추가
alter table public.profiles 
add column if not exists role text default 'user',
add column if not exists joined_at timestamp with time zone default now();

-- 2. 관리자(admin)는 모든 프로필을 볼 수 있는 권한 정책(Policy) 추가
-- 기존 정책은 '내 것만 볼 수 있음'이므로, 'OR' 조건으로 관리자도 볼 수 있게 하거나, 별도 정책 추가
create policy "Admins can view all profiles"
  on public.profiles for select
  using (
    (select role from public.profiles where id = auth.uid()) = 'admin'
  );

-- 3. (옵션) 관리자가 다른 사람 정보를 수정할 수도 있게 하려면:
create policy "Admins can update all profiles"
  on public.profiles for update
  using (
    (select role from public.profiles where id = auth.uid()) = 'admin'
  );

-- 4. [중요] 대표님 계정을 관리자로 승격시키기
-- 아래 'user@example.com' 부분을 대표님이 실제 로그인한 이메일로 바꿔서 실행하세요!
update public.profiles
set role = 'admin'
where email = 'test@test.com';  -- 여기 이메일을 본인 것으로 변경!
