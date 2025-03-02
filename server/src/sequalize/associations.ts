import Cart from "../models/cart.model";
import Category from "../models/categories.model";
import Product from "../models/product.model";
import User from "../models/user.model";

export const defineAssociations = () => {
	Category.hasMany(Product, {
		foreignKey: "CategoryId",
		onDelete: "CASCADE",
	});

	Product.belongsTo(Category, {
		foreignKey: "CategoryId",
	});

	User.hasOne(Cart, {
		foreignKey: "userId",
	});
	Cart.belongsTo(User, {
		foreignKey: "userId",
	});

	Cart.hasMany(Product, {
		foreignKey: "productId",
	});
	Product.belongsTo(Cart, {
		foreignKey: "productId",
	});
};
