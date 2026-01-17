-- Creating 3 Schemas(tables) like -> user, api_keys, and api_usage instead of Redis

-- Creating User Table
create table users(
    id serial primary key,
    email text not null unique,
    password text not null,
    created_at timestamp default now()
);

-- Creating API Keys Table
create table api_keys(
    id serial primary key,
    user_id integer references users(id),
    key_name text not null,
    key_hash text not null,
    daily_limit integer not null default 100,
    is_active boolean not null default true,
    created_at timestamp default now()
);

-- Creating API Keys Usage Table instead of Redis. It will act as Redis and will help in rate limiting
create table api_key_usage(
    id serial primary key,
    api_key_id integer references api_keys(id),
    usage_date date not null,
    request_count integer not null default 0,
    created_at timestamp default now(),
    unique(api_key_id, usage_date)
);
