-- 1. 보안 정책(RLS) 다시 켜기 (필수)
-- 아까 문제 해결을 위해 껐던 보안 장치를 다시 켭니다.
alter table public.profiles enable row level security;

-- 2. "내 정보는 내가 볼 수 있게" 정책 확실히 박제
-- (기존에 있다면 에러가 날 수 있으니 drop 하고 다시 만듭니다)
drop policy if exists "Users can view own profile" on public.profiles;
create policy "Users can view own profile"
  on public.profiles for select
  using ( auth.uid() = id );

-- 3. "내 정보는 내가 수정할 수 있게" 정책
drop policy if exists "Users can update own profile" on public.profiles;
create policy "Users can update own profile"
  on public.profiles for update
  using ( auth.uid() = id );

-- 4. "관리자는 모든 걸 볼 수 있게" 정책
drop policy if exists "Admins can view all profiles" on public.profiles;
create policy "Admins can view all profiles"
  on public.profiles for select
  using (
    (select role from public.profiles where id = auth.uid()) = 'admin'
  );
