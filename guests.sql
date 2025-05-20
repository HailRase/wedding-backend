CREATE TABLE guests (
  id SERIAL PRIMARY KEY,
  fio TEXT NOT NULL,
  presence TEXT,
  people_count TEXT,
  alcogols TEXT[]
);