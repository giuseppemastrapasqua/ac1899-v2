-- Preserve the existing owner's access; public signup must not create administrators.
insert into public.admins(email)
select u.email from auth.users u
where u.email = 'milancampione81@gmail.com'
and not exists(select 1 from public.admins a where lower(a.email)=lower(u.email));

create table public.community_profiles (
 id uuid primary key references auth.users(id) on delete cascade,
 nickname text not null check (nickname ~ '^[A-Za-z0-9_.-]{3,30}$'),
 created_at timestamptz not null default now()
);
create unique index community_profiles_nickname_key on public.community_profiles(lower(nickname));
alter table public.community_profiles enable row level security;
revoke all on public.community_profiles from public, anon, authenticated;
grant select on public.community_profiles to authenticated;
create policy "Read own community profile" on public.community_profiles for select to authenticated using (id = (select auth.uid()));
insert into public.community_profiles(id,nickname) select id,'Rabdo' from auth.users where email='milancampione81@gmail.com';

create schema if not exists ac1899_private;
revoke all on schema ac1899_private from public, anon, authenticated;
create function ac1899_private.create_community_profile() returns trigger
language plpgsql security definer set search_path='' as $$
begin
 if new.raw_user_meta_data ? 'nickname' then
  insert into public.community_profiles(id,nickname) values(new.id,trim(new.raw_user_meta_data->>'nickname'));
 end if;
 return new;
end;
$$;
revoke all on function ac1899_private.create_community_profile() from public, anon, authenticated;
create trigger ac1899_community_profile after insert on auth.users for each row execute function ac1899_private.create_community_profile();

create function public.ac1899_nickname_available(candidate text) returns boolean
language sql stable security definer set search_path='' as $$
 select trim(candidate) ~ '^[A-Za-z0-9_.-]{3,30}$' and not exists(select 1 from public.community_profiles where lower(nickname)=lower(trim(candidate)))
$$;
revoke all on function public.ac1899_nickname_available(text) from public;
grant execute on function public.ac1899_nickname_available(text) to anon, authenticated;

-- Signed-in readers can create only their own comments under their registered nickname.
alter policy "Own comment" on public.article_comments with check (
 auth.uid()=user_id and exists(select 1 from public.community_profiles p where p.id=auth.uid() and p.nickname=author)
);

-- Keep public reading and limit editorial changes to the established administrator.
alter table public.news enable row level security;
alter table public.transfers enable row level security;
alter table public.wonderkids enable row level security;
create policy "Public news read" on public.news for select to anon, authenticated using(true);
create policy "Admin news write" on public.news for all to authenticated using(public.ac1899_is_admin()) with check(public.ac1899_is_admin());
create policy "Public transfers read" on public.transfers for select to anon, authenticated using(true);
create policy "Admin transfers write" on public.transfers for all to authenticated using(public.ac1899_is_admin()) with check(public.ac1899_is_admin());
create policy "Public wonderkids read" on public.wonderkids for select to anon, authenticated using(true);
create policy "Admin wonderkids write" on public.wonderkids for all to authenticated using(public.ac1899_is_admin()) with check(public.ac1899_is_admin());

create policy "Admin pagelle insert gate" on public.pagelle as restrictive for insert to anon, authenticated with check(public.ac1899_is_admin());
create policy "Admin pagelle update gate" on public.pagelle as restrictive for update to anon, authenticated using(public.ac1899_is_admin()) with check(public.ac1899_is_admin());
create policy "Admin pagelle delete gate" on public.pagelle as restrictive for delete to anon, authenticated using(public.ac1899_is_admin());
create policy "Admin candidate update gate" on public.wonderkid_candidates as restrictive for update to anon, authenticated using(public.ac1899_is_admin()) with check(public.ac1899_is_admin());
create policy "Admin storage insert gate" on storage.objects as restrictive for insert to anon, authenticated with check(public.ac1899_is_admin());

-- Draft editorials are readable only by the editor.
alter policy "Allow read daily editorials" on public.daily_editorials using(status='published' or public.ac1899_is_admin());
