import express, { Application } from "express";

const app: Application = express();


//Sample route
app.get("/", (req, res) => {
  res.send("Hello World");
});

export default app;