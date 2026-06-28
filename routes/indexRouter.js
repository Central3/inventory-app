import { Router } from "express";
import {
  getItems,
  getGenres,
  getDevelopers,
  getDeveloper,
  getGameGenres,
} from "../db/queries.js";
import { types } from "pg";

const indexRouter = Router();

types.setTypeParser(1082, (val) => val);

indexRouter.get("/", async (req, res) => {
  let items = await getItems();
  items = Promise.all(
    items.map(async function (item) {
      const developer = await getDeveloper(item.developer_id);
      const genres = (await getGameGenres(item.game_id)).map(
        (genre) => genre.genre
      );
      return { ...item, developer: developer.name, genres };
    })
  );
  items.then((items) => res.render("index", { items }));
});

indexRouter.get("/genres", async (req, res) => {
  const genres = await getGenres();
  res.render("genres", { genres });
});

indexRouter.get("/developers", async (req, res) => {
  const developers = await getDevelopers();
  res.render("developers", { developers });
});

export default indexRouter;
