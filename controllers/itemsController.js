import { getDevelopers, getGenres, insertItem } from "../db/queries.js";
import { body, matchedData, validationResult } from "express-validator";

const emptyErr = "cannot be empty";

const validateItem = [
  body("title").trim().notEmpty().withMessage(`Title ${emptyErr}`),
  body("description").trim().notEmpty().withMessage(`Description ${emptyErr}`),
  body("price")
    .notEmpty()
    .withMessage(`Price ${emptyErr}`)
    .isInt({ min: 0 })
    .withMessage("Price should be at least 0")
    .toInt(),
  body("release-year").notEmpty().withMessage(`Date ${emptyErr}`),
  body("genres").custom((value, { req }) => {
    let selected = req.body.genres;

    if (typeof selected === "string") selected = [selected];

    if (!selected || selected.length < 1)
      throw new Error("Please select at least one genre");

    return true;
  }),
  body("developer-id").optional(),
];

const itemsCreateGet = async (req, res) => {
  const genres = await getGenres();
  const developers = await getDevelopers();
  res.render("add-item", { genres, developers, data: {} });
};

const itemsCreatePost = [
  validateItem,
  async (req, res) => {
    const genres = await getGenres();
    const developers = await getDevelopers();
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render("add-item", {
        genres,
        developers,
        data: req.body,
        errors: errors.array(),
      });
    }

    const item = matchedData(req);
    await insertItem(item);
    res.redirect("/");
  },
];

export { itemsCreateGet, itemsCreatePost };
