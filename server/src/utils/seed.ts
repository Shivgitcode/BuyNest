import { logger } from "../logger/devLogger";
import Category from "../models/categories.model";
import Product from "../models/product.model";
import { categories, products } from "./data";

async function insertData() {
	try {
		await Category.bulkCreate(categories);
		await Product.bulkCreate(products);
		logger.info("Categories and Products inserted successfully");
	} catch (error) {
		if (error instanceof Error) logger.error(error);
	}
}

insertData();
