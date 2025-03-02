import { Link } from "react-router";

interface CategoryCardProps {
	title: string;
	image: string;
	link: string;
}

const CategoryCard = ({ title, image, link }: CategoryCardProps) => {
	return (
		<Link
			to={link}
			className="category-card block relative rounded-lg overflow-hidden"
		>
			<div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/20 z-10" />
			<img
				src={image}
				alt={title}
				className="category-card-img w-full h-full object-cover aspect-square"
			/>
			<div className="absolute bottom-0 left-0 right-0 p-4 z-20">
				<h3 className="text-white font-medium text-lg">{title}</h3>
			</div>
		</Link>
	);
};

export default CategoryCard;
