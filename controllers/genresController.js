import { insertGenre } from "../db/queries.js";

const genresCreateGet = (req, res) => {
  res.render("add-genre");
};

const genresCreatePost = async (req, res) => {
  const genre = req.body;
  await insertGenre(genre);
  res.redirect("/");
};

export { genresCreateGet, genresCreatePost };
