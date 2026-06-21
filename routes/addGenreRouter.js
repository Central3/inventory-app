import { Router } from "express";
import { insertGenre } from "../db/queries.js";

const addGenreRouter = Router();

addGenreRouter.get("/", (req, res) => {
  res.render("add-genre");
});

addGenreRouter.post("/", async (req, res) => {
  const genre = req.body;
  await insertGenre(genre);
  res.redirect("/");
});

export default addGenreRouter;
