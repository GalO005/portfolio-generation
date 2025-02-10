import express, { Application } from "express";
import sequelize from "./config/db";

const app: Application = express();


sequelize.sync().then(() => {
    console.log("Database connected successfully ✅");
}).catch((err) => {
    console.log("Error connecting to database ❌", err);
});

//Sample route
app.get("/", (req, res) => {
    res.send("Hello World");
});

export default app;