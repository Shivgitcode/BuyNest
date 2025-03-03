import { DataTypes } from "sequelize";
import { sequelize } from "../sequalize/db";

const Category = sequelize.define("Category", {
	id: {
		type: DataTypes.UUID,
		defaultValue: DataTypes.UUIDV4,
		primaryKey: true,
	},
	category: {
		type: DataTypes.STRING,
	},
});

export default Category;
