import { Router } from "express";
import { getDevelopers, getGenres, insertItem } from "../db/queries.js";

const addItemRouter = Router();

addItemRouter.get("/", async (req, res) => {
  const genres = await getGenres();
  const developers = await getDevelopers();
  res.render("add-item", { genres, developers });
});

addItemRouter.post("/", async (req, res) => {
  const item = req.body;
  await insertItem(item);
  res.redirect("/");
});

export default addItemRouter;
