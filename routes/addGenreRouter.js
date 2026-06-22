import { Router } from "express";
import {
  genresCreateGet,
  genresCreatePost,
} from "../controllers/genresController.js";

const addGenreRouter = Router();

addGenreRouter.get("/", genresCreateGet);
addGenreRouter.post("/", genresCreatePost);

export default addGenreRouter;
