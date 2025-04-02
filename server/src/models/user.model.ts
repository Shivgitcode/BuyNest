import { DataTypes } from "sequelize";
import { sequelize } from "../sequalize/db";
const User = sequelize.define("User", {
	id: {
		type: DataTypes.UUID,
		allowNull: false,
		defaultValue: DataTypes.UUIDV4,
		primaryKey: true,
	},
	username: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	password: {
		type: DataTypes.STRING,
	},
	email: {
		type: DataTypes.STRING,
		unique: true,
	},
	role: {
		type: DataTypes.STRING,
		allowNull: true,
		defaultValue: "user",
	},
	phoneNumber: {
		type: DataTypes.INTEGER,
	},
	address: {
		type: DataTypes.STRING,
	},
});
export default User;
