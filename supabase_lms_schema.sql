-- 1. 강의(Lectures) 테이블 생성
create table if not exists public.lectures (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default now(),
  title text not null,
  description text,
  video_url text not null, -- YouTube URL 등
  duration_minutes integer default 0,
  order_index integer default 0 -- 강의 순서
);

-- 2. 학습 진도(Progress) 테이블 생성
create table if not exists public.learning_progress (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  lecture_id uuid references public.lectures(id) on delete cascade not null,
  is_completed boolean default false,
  last_watched_at timestamp with time zone default now(),
  
  unique(user_id, lecture_id) -- 한 사람이 같은 강의에 중복 기록 안 되게
);

-- 3. RLS 정책 설정 (필수!)
alter table public.lectures enable row level security;
alter table public.learning_progress enable row level security;

-- (1) 강의 정보는 누구나 볼 수 있음 (로그인한 사람)
create policy "Lectures are viewable by everyone" 
  on public.lectures for select 
  using ( auth.role() = 'authenticated' );

-- (2) 관리자는 강의 추가/수정 가능
create policy "Admins can manage lectures" 
  on public.lectures for all 
  using ( public.is_admin() );

-- (3) 진도율: 내 기록은 내가 보고/수정함
create policy "Users can view own progress" 
  on public.learning_progress for select 
  using ( auth.uid() = user_id );

create policy "Users can update own progress" 
  on public.learning_progress for insert 
  with check ( auth.uid() = user_id );

create policy "Users can modify own progress" 
  on public.learning_progress for update 
  using ( auth.uid() = user_id );

-- 4. [테스트용] 더미 데이터 (강의 3개)
insert into public.lectures (title, video_url, duration_minutes, order_index)
values
  ('1강. 오리엔테이션 및 자격증 소개', 'https://www.youtube.com/embed/dQw4w9WgXcQ', 15, 1),
  ('2강. 심리상담의 기초 이론', 'https://www.youtube.com/embed/dummy_vid2', 45, 2),
  ('3강. 실전 상담 사례 분석', 'https://www.youtube.com/embed/dummy_vid3', 50, 3);
