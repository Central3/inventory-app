import { insertDeveloper } from "../db/queries.js";

const developersCreateGet = (req, res) => {
  res.render("add-developer");
};

const developersCreatePost = async (req, res) => {
  const developer = req.body;
  await insertDeveloper(developer);
  res.redirect("/");
};

export { developersCreateGet, developersCreatePost };
