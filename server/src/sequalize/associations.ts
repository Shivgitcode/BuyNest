import CartItem from "../models/cart.model";
import Category from "../models/categories.model";
import Product from "../models/product.model";
import User from "../models/user.model";

export const defineAssociations = () => {
	Category.hasMany(Product, {
		foreignKey: "categoryId",
		onDelete: "CASCADE",
	});

	Product.belongsTo(Category, {
		foreignKey: "categoryId",
	});

	User.hasMany(CartItem, {
		foreignKey: "userId",
	});
	CartItem.belongsTo(User, {
		foreignKey: "userId",
	});

	CartItem.belongsTo(Product, {
		foreignKey: "productId",
	});
	Product.hasMany(CartItem, {
		foreignKey: "productId",
	});
};
