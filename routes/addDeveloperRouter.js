import { Router } from "express";
import { insertDeveloper } from "../db/queries.js";

const addDeveloperRouter = Router();

addDeveloperRouter.get("/", (req, res) => {
  res.render("add-developer");
});

addDeveloperRouter.post("/", async (req, res) => {
  const developer = req.body;
  await insertDeveloper(developer);
  res.redirect("/");
});

export default addDeveloperRouter;
