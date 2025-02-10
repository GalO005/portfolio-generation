import { Sequelize } from "sequelize-typescript";
import dotenv from "dotenv";
import { Country } from "../models/Country";
import { Project } from "../models/Project";

dotenv.config();

const sequelize = new Sequelize(
    process.env.DB_NAME as string,
    process.env.DB_USER as string,
    process.env.DB_PASSWORD as string,
    {
        host: process.env.DB_HOST as string,
        port: parseInt(process.env.DB_PORT as string),
        dialect: "postgres",
        models: [__dirname + '/models'],
        logging: false,
    }
);

export default sequelize;
