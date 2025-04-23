import { DataTypes } from "sequelize";
import { sequelize } from "../sequalize/db";

const OrderItems = sequelize.define("OrderItems", {
	id: {
		type: DataTypes.UUID,
		defaultValue: DataTypes.UUIDV4,
		primaryKey: true,
	},
	name: {
		type: DataTypes.STRING,
	},

	quantity: {
		type: DataTypes.INTEGER,
	},
	unitprice: {
		type: DataTypes.INTEGER,
	},
	customerId: {
		type: DataTypes.STRING,
	},
	orderId: {
		type: DataTypes.STRING,
	},
});

export default OrderItems;
