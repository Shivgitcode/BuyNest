import { Sequelize } from "sequelize";
import { logger } from "../logger/devLogger";
import "../utils/config";
export const sequelize = new Sequelize("buynest", "postgres", "root", {
	host: "localhost",
	dialect: "postgres",
	logging: console.log,
});

export async function dbConnect() {
	try {
		await sequelize.authenticate();
		logger.info("Postgres db connected");
	} catch (error) {
		if (error instanceof Error) logger.error(`${error.message}`);
	}
}

dbConnect();
