import { DataTypes } from "sequelize";
import { sequelize } from "../sequalize/db";

const Order = sequelize.define("Orders", {
	id: {
		type: DataTypes.UUID,
		defaultValue: DataTypes.UUIDV4,
		primaryKey: true,
	},
	userId: {
		type: DataTypes.TEXT,
	},
	totalItems: {
		type: DataTypes.INTEGER,
	},
	orderStatus: {
		type: DataTypes.ENUM("processing", "shipped", "delivered", "cancelled"),
		defaultValue: "processing",
	},
	orderId: {
		type: DataTypes.TEXT,
	},
});

export default Order;
