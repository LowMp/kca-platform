-- 1. 주문(Orders) 테이블 생성
create table if not exists public.orders (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles(id) on delete set null,
  merchant_uid text not null unique, -- 주문번호 (고유값)
  imp_uid text, -- Portone 결제번호 (결제 완료 후 채워짐)
  product_name text not null, -- 상품명 (예: 심리상담사 1급 과정)
  amount integer not null, -- 결제 금액
  status text default 'ready', -- ready(대기), paid(완료), failed(실패), cancelled(취소)
  created_at timestamp with time zone default now(),
  paid_at timestamp with time zone
);

-- 2. RLS 정책 설정
alter table public.orders enable row level security;

-- (1) 내 주문 내역은 내가 볼 수 있음
create policy "Users can view own orders" 
  on public.orders for select 
  using ( auth.uid() = user_id );

-- (2) 주문 생성은 누구나 (로그인한 사람)
create policy "Users can create orders" 
  on public.orders for insert 
  with check ( auth.uid() = user_id );

-- (3) 주문 업데이트는 본인만 (단, 결제 완료 처리는 서버에서 하는 게 안전하지만 client callback용으로 일단 허용하거나, 서버 액션으로 처리 권장)
-- MVP에서는 서버 액션으로 status를 update할 것이므로, service_role이 처리함. 
-- 다만 클라이언트에서 결제창 띄우기 전 merchant_uid 생성을 위해 insert 권한은 필요.

-- (4) 관리자는 모든 주문 조회 가능
create policy "Admins can view all orders" 
  on public.orders for select 
  using ( public.is_admin() );
