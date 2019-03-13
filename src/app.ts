import cookieParser from "cookie-parser";
import express from "express";
import mongoose, { mongo } from "mongoose";
import logger from "morgan";
import path from "path";

import notesRouter from "./routes/notes.routes";

// Setup Mongoose Connection
const dbUrl = "mongodb://localhost:27017/noter";
const mongoDB = process.env.MONGODB_URI || dbUrl;
const db = mongoose.connection;
// tslint:disable-next-line:no-console
db.on("error", console.error.bind(console, "MongoDb Error:"));

mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/notes", notesRouter);

export default app;
