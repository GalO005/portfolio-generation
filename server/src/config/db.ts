import { Sequelize } from "sequelize-typescript";
import importCSV from "../utils/importData";
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
        port: Number(process.env.DB_PORT as string),
        dialect: "postgres",
        models: [Country, Project],
        logging: false,
    }
);

async function initializeDB() {
    try {
      await sequelize.authenticate();
      console.log('Database connection established ✅');
  
      await sequelize.sync({ alter: true });
      console.log('Database synchronized ✅');
  
      await importCSV();
      console.log('CSV data imported ✅');
  
      console.log('Database is ready ✅');
    } catch (error) {
      console.error('Error initializing Database ❌', error);
    }
  }

export default initializeDB;
