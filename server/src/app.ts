import express, { Application } from "express";
import initializeDB from "./config/db";
import router from "./routes";
import cors from "cors";

const app: Application = express();


initializeDB();
app.use(cors());
app.use(express.json());
app.use("/api/v1", router);

//Sample route
app.get("/", (req, res) => {
    res.send("Hello World");
});

export default app;