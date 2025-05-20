import { DataTypes } from "sequelize";
import { sequelize } from "../sequalize/db";

export const Address = sequelize.define("Address", {
	id: {
		type: DataTypes.UUID,
		defaultValue: DataTypes.UUIDV4,
		primaryKey: true,
	},
	userId: {
		type: DataTypes.UUID,
		allowNull: false,
		references: {
			model: "Users",
			key: "id",
		},
	},
	street: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	city: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	state: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	zipCode: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	country: {
		type: DataTypes.STRING,
		allowNull: false,
	},
});

export default Address;
