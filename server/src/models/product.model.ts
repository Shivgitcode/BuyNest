import { DataTypes, type Model } from "sequelize";
import { sequelize } from "../sequalize/db";
// Define the attributes of the Product model
export interface ProductAttributes {
	id: string;
	product: string;
	desc: string;
	image?: string; // Optional field
	price: number;
	categoryId: string;
}

// Define the creation attributes (fields that can be omitted when creating a new instance)
interface ProductCreationAttributes {
	product: string;
	desc: string;
	image?: string;
	price: number;
	categoryId: string;
}

const Product = sequelize.define<
	Model<ProductAttributes | ProductCreationAttributes>
>("Product", {
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
		type: DataTypes.TEXT("long"),
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
		field: "categoryId",
	},
});
export default Product;
