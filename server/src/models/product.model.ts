import { DataTypes } from "sequelize";
import { sequelize } from "../sequalize/db";

const Product = sequelize.define("Product", {
	id: {
		type: DataTypes.UUID,
		defaultValue: DataTypes.UUIDV4,
		primaryKey: true,
	},
	product: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	desc: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	image: {
		type: DataTypes.STRING,
	},
	price: {
		type: DataTypes.INTEGER,
	},
	categoryId: {
		type: DataTypes.UUID,
		allowNull: false,
		references: {
			model: "Categories",
			key: "id",
		},
		field: "CategoryId",
	},
});
export default Product;
