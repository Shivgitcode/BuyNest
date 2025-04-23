import { Sequelize } from "sequelize";
import { logger } from "../logger/devLogger";
import env from "../utils/env";

export const sequelize = new Sequelize(env.DB_URL as string, {
	dialect: "postgres",
	logging: false,
});

export async function dbConnect() {
	try {
		await sequelize.authenticate();
		logger.info("Postgres db connected and synced");
		return true;
	} catch (error) {
		if (error instanceof Error) logger.error(`${error.message}`);
		return false;
	}
}
dbConnect();
