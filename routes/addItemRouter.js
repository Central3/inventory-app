import { Router } from "express";
import {
  itemsCreateGet,
  itemsCreatePost,
} from "../controllers/itemsController.js";

const addItemRouter = Router();

addItemRouter.get("/", itemsCreateGet);
addItemRouter.post("/", itemsCreatePost);

export default addItemRouter;
