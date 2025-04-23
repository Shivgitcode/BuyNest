import { DataTypes, type Model } from "sequelize";
import { sequelize } from "../sequalize/db";
export interface CartItemAttributes {
	id: string;
	quantity: number | undefined;
	productId: string;
	userId: string;
}

export interface CartItemCreationAttributes {
	id?: string;
	quantity?: number;
	productId: string;
	userId: string;
}

const CartItem = sequelize.define<
	Model<CartItemAttributes, CartItemCreationAttributes>
>("Cart", {
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
