import { Client } from "pg";

const { USER, PASSWORD, HOST, PORT, DATABASE, CA } = process.env;

const SQL = `
CREATE TABLE IF NOT EXISTS developers (
  developer_id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name TEXT UNIQUE
);

CREATE TABLE IF NOT EXISTS games (
  game_id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  title TEXT,
  description TEXT,
  price INTEGER,
  release_year DATE,
  developer_id INTEGER,
  FOREIGN KEY (developer_id) REFERENCES developers(developer_id)
);

CREATE TABLE IF NOT EXISTS genres (
  genre_id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name TEXT UNIQUE
);

CREATE TABLE IF NOT EXISTS game_genre (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  game_id INTEGER,
  genre_id INTEGER,
  FOREIGN KEY (game_id) REFERENCES games(game_id),
  FOREIGN KEY (genre_id) REFERENCES genres(genre_id)
);
`;

async function main() {
  console.log("seeding...");

  const client = new Client({
    user: USER,
    password: PASSWORD,
    host: HOST,
    port: PORT,
    database: DATABASE,
    ssl: {
      rejectUnauthorized: true,
      ca: CA,
    },
  });

  await client.connect();
  await client.query(SQL);
  await client.end();
  console.log("done");
}

main();
