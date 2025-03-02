import { DataTypes } from "sequelize";
import { sequelize } from "../sequalize/db";

const CartItem = sequelize.define("Cart", {
	id: {
		type: DataTypes.UUID,
		defaultValue: DataTypes.UUIDV4,
		primaryKey: true,
	},
	quantity: {
		type: DataTypes.INTEGER,
		allowNull: true,
	},
	productId: {
		type: DataTypes.UUID,
		allowNull: false,
		references: {
			model: "Products",
			key: "id",
		},
		field: "productId",
	},
	userId: {
		type: DataTypes.UUID,
		allowNull: false,
		references: {
			model: "Users",
			key: "id",
		},
		field: "userId",
	},
});

export default CartItem;
