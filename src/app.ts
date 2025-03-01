import express from "express";
import dotenv from "dotenv";
import { authRouter } from "./routes/auth";

const app = express();
dotenv.config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/auth", authRouter);

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`app is listening on port ${port}`);
});
