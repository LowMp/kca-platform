-- 1. profiles 테이블의 RLS(행 보안 정책) 활성화 확인
alter table public.profiles enable row level security;

-- 2. [필수] "내 정보는 내가 볼 수 있게" 정책 추가
-- 이 정책이 없으면, 관리자 권한을 줬더라도 '본인 확인' 단계에서 막힐 수 있습니다.
create policy "Users can view own profile"
  on public.profiles for select
  using ( auth.uid() = id );

-- 3. [필수] "내 정보는 내가 수정할 수 있게" 정책 추가
create policy "Users can update own profile"
  on public.profiles for update
  using ( auth.uid() = id );

-- (참고: 관리자용 정책은 이미 추가하셨으므로 생략합니다)
