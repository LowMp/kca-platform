-- 1. 기존 함수 및 트리거 삭제 (수정을 위해)
drop trigger if exists on_auth_user_created on auth.users;
drop function if exists public.handle_new_user();

-- 2. 프로필 생성을 위한 트리거 함수 재정의
create or replace function public.handle_new_user() returns trigger as $$
begin
  insert into public.profiles (id, email, name, phone, birthdate, address)
  values (
    new.id, 
    new.email, 
    new.raw_user_meta_data->>'name', 
    new.raw_user_meta_data->>'phone',
    (new.raw_user_meta_data->>'birthdate')::date,
    new.raw_user_meta_data->>'address'
  );
  return new;
end;
$$ language plpgsql security definer;

-- 3. 트리거 재생성
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
