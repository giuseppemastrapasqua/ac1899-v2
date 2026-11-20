create table public.ac1899_news_archive (
  id text primary key,
  published_at timestamptz not null,
  story jsonb not null
);

create index ac1899_news_archive_published_at
  on public.ac1899_news_archive (published_at desc);

alter table public.ac1899_news_archive enable row level security;
revoke all on public.ac1899_news_archive from public, anon, authenticated;
grant select, insert on public.ac1899_news_archive to service_role;
