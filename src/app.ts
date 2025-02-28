import express from "express";
import dotenv from "dotenv";

const app = express();
dotenv.config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`app is listening on port ${port}`);
});
