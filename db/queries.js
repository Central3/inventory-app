import { capitalizeWords } from "../utils/stringFormatters.js";
import pool from "./pool.js";

async function getGenres() {
  const genres = await pool.query("SELECT * FROM genres");
  return genres.rows;
}

async function getGameGenres(gameId) {
  const genres = await pool.query(
    "SELECT genres.name AS genre FROM games JOIN game_genre ON  games.game_id = game_genre.game_id JOIN genres ON genres.genre_id = game_genre.genre_id WHERE game_genre.game_id = $1",
    [gameId]
  );
  return genres.rows;
}

async function insertGenre(genre) {
  let { name } = genre;
  name = capitalizeWords(name);
  await pool.query(
    "INSERT INTO genres (name) VALUES ($1) ON CONFLICT (name) DO NOTHING",
    [name]
  );
}

async function filterOnGenre(genreId) {
  const res = await pool.query(
    "SELECT * FROM games JOIN game_genre ON games.game_id = game_genre.game_id JOIN genres ON genres.genre_id = game_genre.genre_id WHERE game_genre.genre_id = $1",
    [genreId]
  );
  return res.rows;
}

async function getDevelopers() {
  const developers = await pool.query("SELECT * FROM developers");
  return developers.rows;
}

async function getDeveloper(developerId) {
  const developer = await pool.query(
    "SELECT * FROM developers WHERE developer_id = $1",
    [developerId]
  );
  return developer.rows[0];
}

async function insertDeveloper(developer) {
  let { name } = developer;
  name = capitalizeWords(name);
  await pool.query(
    "INSERT INTO developers (name) VALUES ($1) ON CONFLICT (name) DO NOTHING",
    [name]
  );
}

async function getItems() {
  const items = await pool.query("SELECT * FROM games");
  return items.rows;
}

async function insertItem(item) {
  let {
    title,
    description,
    price,
    "release-year": releaseYear,
    genres,
    "developer-id": developerId,
  } = item;

  const gameRes = await pool.query(
    "INSERT INTO games (title, description, price, release_year, developer_id) VALUES ($1, $2, $3, $4, $5) RETURNING game_id",
    [
      title,
      description,
      parseInt(price),
      releaseYear,
      developerId === "" ? null : parseInt(developerId),
    ]
  );
  const gameId = gameRes.rows[0].game_id;

  genres = [].concat(genres || []);
  for (const genre of genres) {
    await pool.query(
      "INSERT INTO game_genre (game_id, genre_id) VALUES ($1, $2)",
      [gameId, parseInt(genre)]
    );
  }
}

export {
  insertGenre,
  getGenres,
  insertDeveloper,
  getDevelopers,
  insertItem,
  getItems,
  getDeveloper,
  getGameGenres,
  filterOnGenre,
};
