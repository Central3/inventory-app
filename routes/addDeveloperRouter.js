import { Router } from "express";
import {
  developersCreateGet,
  developersCreatePost,
} from "../controllers/developersController.js";

const addDeveloperRouter = Router();

addDeveloperRouter.get("/", developersCreateGet);
addDeveloperRouter.post("/", developersCreatePost);

export default addDeveloperRouter;
