import { v4 as uuidv4 } from "uuid";

export const generateId = () => {
	const id = uuidv4();
	return id;
};
