-- 0001_init.sql — the first version of the database. LEADS ONLY.
-- Never edit a migration after it has run. To change the database, add 0002_..., 0003_..., etc.
--
-- RLS = Row Level Security: rules Postgres checks on EVERY query,
-- so a user can only read/write the rows they're allowed to.

-- profiles: one row per user (auth.users is Supabase's built-in login table)
create table public.profiles (
  id         uuid primary key references auth.users (id) on delete cascade,
  username   text unique,
  created_at timestamptz not null default now()
);

-- plays: one row each time a user finishes a game on a given day
create table public.plays (
  id          bigint generated always as identity primary key,
  user_id     uuid not null references public.profiles (id) on delete cascade,
  game        text not null check (game in ('undercovel-', 'bruindle', 'uclaweaver')),
  puzzle_date date not null,
  won         boolean not null default false,
  score       integer,
  created_at  timestamptz not null default now(),
  unique (user_id, game, puzzle_date)   -- one play per game per day
);

-- pins: games a user has pinned to the top of their homepage
create table public.pins (
  user_id    uuid not null references public.profiles (id) on delete cascade,
  game       text not null check (game in ('undercovel-', 'bruindle', 'uclaweaver')),
  created_at timestamptz not null default now(),
  primary key (user_id, game)
);

-- Turn RLS on. With RLS on and no policies, NOBODY can touch the table.
alter table public.profiles enable row level security;
alter table public.plays    enable row level security;
alter table public.pins     enable row level security;

-- Policies: auth.uid() = the id of whoever is making the request.
create policy "profiles are public" on public.profiles for select using (true);
create policy "update own profile"  on public.profiles for update using (auth.uid() = id);

create policy "read own plays"      on public.plays for select using (auth.uid() = user_id);
create policy "insert own plays"    on public.plays for insert with check (auth.uid() = user_id);

create policy "read own pins"       on public.pins for select using (auth.uid() = user_id);
create policy "add own pins"        on public.pins for insert with check (auth.uid() = user_id);
create policy "remove own pins"     on public.pins for delete using (auth.uid() = user_id);

-- Automatically create a profile row when someone signs up.
create function public.handle_new_user() returns trigger
language plpgsql security definer set search_path = '' as $$
begin
  insert into public.profiles (id) values (new.id);
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();
