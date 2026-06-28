import { insertDeveloper } from "../db/queries.js";
import { body, matchedData, validationResult } from "express-validator";

const validateDeveloper = [
  body("name").trim().notEmpty().withMessage("Developer name cannot be empty"),
];

const developersCreateGet = (req, res) => {
  res.render("add-developer");
};

const developersCreatePost = [
  validateDeveloper,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render("add-developer", {
        errors: errors.array(),
      });
    }

    const developer = matchedData(req);
    await insertDeveloper(developer);
    res.redirect("/developers");
  },
];

export { developersCreateGet, developersCreatePost };
