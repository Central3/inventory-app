import { getDevelopers, getGenres, insertItem } from "../db/queries.js";

const itemsCreateGet = async (req, res) => {
  const genres = await getGenres();
  const developers = await getDevelopers();
  res.render("add-item", { genres, developers });
};

const itemsCreatePost = async (req, res) => {
  const item = req.body;
  await insertItem(item);
  res.redirect("/");
};

export { itemsCreateGet, itemsCreatePost };
