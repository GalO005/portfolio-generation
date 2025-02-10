import server from "./app";
import dotenv from "dotenv";

dotenv.config();

server.listen(process.env.PORT, () => {
    console.log("Server is running on port 3000");
})