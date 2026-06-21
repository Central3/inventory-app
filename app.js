import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import indexRouter from "./routes/indexRouter.js";
import addItemRouter from "./routes/addItemRouter.js";
import addGenreRouter from "./routes/addGenreRouter.js";
import addDeveloperRouter from "./routes/addDeveloperRouter.js";

const app = express();
const port = 3000;
const __dirname = path.dirname(fileURLToPath(import.meta.url));

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

app.use("/", indexRouter);
app.use("/add-item", addItemRouter);
app.use("/add-genre", addGenreRouter);
app.use("/add-developer", addDeveloperRouter);

app.use((req, res) => {
  res.status(404).send("Oops page not found");
});

app.listen(port, (error) => {
  if (error) {
    throw error;
  }
  console.log(`Example app listening on port ${port}`);
});
