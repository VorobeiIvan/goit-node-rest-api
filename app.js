import express from "express";
import morgan from "morgan";
import cors from "cors";
import mongoose from "mongoose";
mongoose.Promise = global.Promise;
import path from "path";
import "dotenv/config";
import contactsRouter from "./routes/contactsRouter.js";
import authRouter from "./routes/authRouter.js";

const app = express();
mongoose
  .connect(process.env.DB_HOST, { dbName: "db-contacts" })
  .then(() =>
    app.listen(process.env.PORT, () => {
      console.log("Database connection successful");
    }),
  )
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });

app.use(morgan("tiny"));
app.use(cors());
app.use(express.json());
app.use("/api/contacts", contactsRouter);
app.use("/users", authRouter);
app.use("/users/avatars", express.static(path.resolve("public", "avatars")));

app.use((_, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});