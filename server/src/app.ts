import express, { Application } from "express";
import initializeDB from "./config/db";

const app: Application = express();


initializeDB();

//Sample route
app.get("/", (req, res) => {
    res.send("Hello World");
});

export default app;