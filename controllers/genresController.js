import { insertGenre } from "../db/queries.js";
import { body, matchedData, validationResult } from "express-validator";

const validateGenre = [
  body("name").trim().notEmpty().withMessage("Genre name cannot be empty"),
];

const genresCreateGet = (req, res) => {
  res.render("add-genre");
};

const genresCreatePost = [
  validateGenre,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render("add-genre", {
        errors: errors.array(),
      });
    }

    const genre = matchedData(req);
    await insertGenre(genre);
    res.redirect("/genres");
  },
];

export { genresCreateGet, genresCreatePost };
