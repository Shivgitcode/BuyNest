import { logger } from "../logger/devLogger";
import { defineAssociations } from "./associations";
import { sequelize } from "./db";
const syncDb = async () => {
	try {
		defineAssociations();

		await sequelize.sync({ force: true, alter: true });
		logger.info("Database synced successfully!");
	} catch (error) {
		console.error("Error syncing database:", error);
	}
};
syncDb();
