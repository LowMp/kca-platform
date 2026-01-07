-- 1. 문제가 되는 기존 정책 삭제
drop policy if exists "Admins can view all profiles" on public.profiles;
drop policy if exists "Users can view own profile" on public.profiles;

-- 2. [핵심] '관리자 확인' 전용 함수 만들기 (Security Definer)
-- 이 함수는 "보안관 배지"를 달고 실행되어서, RLS 검사를 우회해 안전하게 role을 확인해옵니다.
-- 이렇게 안 하면 "권한 확인하려고 데이터를 보는데, 데이터를 보려면 권한이 필요해서..."라는 무한 루프에 빠집니다.
create or replace function public.is_admin()
returns boolean as $$
begin
  return exists (
    select 1
    from public.profiles
    where id = auth.uid() and role = 'admin'
  );
end;
$$ language plpgsql security definer;

-- 3. 안전해진 정책 다시 켜기

-- A. 내 정보는 내가 본다 (기본)
create policy "Users can view own profile"
  on public.profiles for select
  using ( auth.uid() = id );

-- B. 관리자는 다 본다 (안전한 함수 사용)
create policy "Admins can view all profiles"
  on public.profiles for select
  using ( public.is_admin() );

-- C. 내 정보 수정 (기존 유지)
drop policy if exists "Users can update own profile" on public.profiles;
create policy "Users can update own profile"
  on public.profiles for update
  using ( auth.uid() = id );
