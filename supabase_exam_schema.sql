-- 1. 시험(Exams) 테이블
create table if not exists public.exams (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  description text,
  time_limit_minutes integer default 60,
  passing_score integer default 60,
  created_at timestamp with time zone default now()
);

-- 2. 문제(Questions) 테이블
create table if not exists public.questions (
  id uuid default gen_random_uuid() primary key,
  exam_id uuid references public.exams(id) on delete cascade not null,
  question_text text not null,
  option_1 text not null,
  option_2 text not null,
  option_3 text not null,
  option_4 text not null,
  correct_option integer not null check (correct_option between 1 and 4),
  order_index integer default 0
);

-- 3. 시험 결과(Exam Results) 테이블
create table if not exists public.exam_results (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  exam_id uuid references public.exams(id) on delete cascade not null,
  score integer not null,
  is_passed boolean not null,
  completed_at timestamp with time zone default now(),
  
  -- 한 사람이 같은 시험을 여러 번 볼 수 있음 (가장 최근 기록을 유효하게 할지, 최고 점수를 할지는 로직 나름)
  -- 일단 로그성으로 쌓되, '최종 합격 여부'는 별도 쿼리로 조회 가능
  unique(user_id, exam_id) -- MVP에서는 편의상 '재응시하면 덮어쓰기' (Upsert) 구조로 감
);

-- 4. RLS 정책
alter table public.exams enable row level security;
alter table public.questions enable row level security;
alter table public.exam_results enable row level security;

-- (1) 시험과 문제는 누구나 조회 가능
create policy "Exams viewable by auth" on public.exams for select using (auth.role() = 'authenticated');
create policy "Questions viewable by auth" on public.questions for select using (auth.role() = 'authenticated');

-- (2) 결과는 본인 것만
create policy "Results own view" on public.exam_results for select using (auth.uid() = user_id);
create policy "Results own insert" on public.exam_results for insert with check (auth.uid() = user_id);
create policy "Results own update" on public.exam_results for update using (auth.uid() = user_id);

-- (3) 관리자 권한
create policy "Admins manage exams" on public.exams for all using (public.is_admin());
create policy "Admins manage questions" on public.questions for all using (public.is_admin());
create policy "Admins view all results" on public.exam_results for select using (public.is_admin());


-- 5. 더미 데이터 (심리상담사 1급 시험)
do $$
declare
  v_exam_id uuid;
begin
  -- 시험 생성
  insert into public.exams (title, description, passing_score)
  values ('심리상담사 1급 자격시험', '본 시험은 총 5문제이며, 60점 이상 득점 시 합격입니다.', 60)
  returning id into v_exam_id;

  -- 문제 생성
  insert into public.questions (exam_id, question_text, option_1, option_2, option_3, option_4, correct_option, order_index)
  values
  (v_exam_id, '심리상담의 기본 원리가 아닌 것은?', '개별화의 원리', '의도적 감정표현의 원리', '통제된 정서 관여의 원리', '심판적 태도의 원리', 4, 1),
  (v_exam_id, '프로이트의 정신분석 이론에서 성격의 구성 요소가 아닌 것은?', '원초아(Id)', '자아(Ego)', '초자아(Superego)', '페르소나(Persona)', 4, 2),
  (v_exam_id, '다음 중 방어기제에 해당하지 않는 것은?', '투사', '승화', '합리화', '동조', 4, 3),
  (v_exam_id, '라포(Rapport)의 의미로 가장 적절한 것은?', '상호 신뢰 관계', '일방적 지시', '객관적 관찰', '심리적 거리두기', 1, 4),
  (v_exam_id, '상담자의 태도로 바람직하지 않은 것은?', '경청', '공감', '조언과 충고 남발', '수용', 3, 5);
end $$;
