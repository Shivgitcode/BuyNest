import { DataTypes } from "sequelize";
import { sequelize } from "../sequalize/db";

const OTP = sequelize.define("OTP", {
	id: {
		type: DataTypes.UUID,
		primaryKey: true,
		defaultValue: DataTypes.UUIDV4,
	},
	otp: {
		type: DataTypes.INTEGER,
	},
	email: {
		type: DataTypes.TEXT,
	},
	phoneNumber: {
		type: DataTypes.BIGINT,
	},
	expiresAt: {
		type: DataTypes.BIGINT,
	},
});

export default OTP;
