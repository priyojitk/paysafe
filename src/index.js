//env credentials
require("dotenv").config();
import express from "express";
import path from "path";
import apiRoute from "./routes/api";

const app = express();
const port = process.env.PORT || 3000;
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/", express.static(path.join(__dirname, "public")));

app.use("/api", apiRoute);

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
