export const categories = [
	{ id: "777e2fc5-3e2a-4de7-99a2-55c454e1d604", category: "electronics" },
	{ id: "0342b892-aa00-43ee-81bd-5ce0a39c2747", category: "lighting" },
	{ id: "6964181e-1f77-4df5-91f9-607c8298fa82", category: "audio" },
	{ id: "6740e24f-26dd-4b37-8fb0-734673f839db", category: "home" },
];

export const products = [
	{
		product: "Minimalist Desk Lamp",
		desc: "A sleek desk lamp with adjustable brightness levels and a modern design that complements any workspace.",
		image:
			"https://images.unsplash.com/photo-1507473885765-e6ed057f782c?q=80&w=1000&auto=format&fit=crop",
		price: 89.99,
		categoryId: "0342b892-aa00-43ee-81bd-5ce0a39c2747", // lighting
	},
	{
		product: "Wireless Charging Pad",
		desc: "Effortlessly charge your devices with this minimal wireless charging pad. Compatible with all Qi-enabled devices.",
		image:
			"https://images.unsplash.com/photo-1586953208448-b95a79798f07?q=80&w=1000&auto=format&fit=crop",
		price: 49.99,
		categoryId: "777e2fc5-3e2a-4de7-99a2-55c454e1d604", // electronics
	},
	{
		product: "Portable Bluetooth Speaker",
		desc: "Immersive sound in a compact, water-resistant design. Perfect for home or on-the-go listening.",
		image:
			"https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?q=80&w=1000&auto=format&fit=crop",
		price: 129.99,
		categoryId: "6964181e-1f77-4df5-91f9-607c8298fa82", // audio
	},
	{
		product: "Smart Thermostat",
		desc: "Save energy and control your home climate from anywhere with this intuitive smart thermostat.",
		image:
			"https://images.unsplash.com/photo-1567030848239-0d7a3d4c8f7f?q=80&w=1000&auto=format&fit=crop",
		price: 199.99,
		categoryId: "6740e24f-26dd-4b37-8fb0-734673f839db", // home
	},
	{
		product: "Minimalist Wall Clock",
		desc: "A sophisticated timepiece with a clean design that adds elegance to any wall.",
		image:
			"https://images.unsplash.com/photo-1563861826100-9cb7d00e708c?q=80&w=1000&auto=format&fit=crop",
		price: 59.99,
		categoryId: "6740e24f-26dd-4b37-8fb0-734673f839db", // home
	},
	{
		product: "Wireless Earbuds",
		desc: "Crystal clear audio with active noise cancellation and a compact charging case.",
		image:
			"https://images.unsplash.com/photo-1605464315542-bda3e2f4e605?q=80&w=1000&auto=format&fit=crop",
		price: 159.99,
		categoryId: "6964181e-1f77-4df5-91f9-607c8298fa82", // audio
	},
	{
		product: "Smart Digital Frame",
		desc: "Display your favorite memories with this smart digital frame that can be updated remotely.",
		image:
			"https://images.unsplash.com/photo-1582831609158-0a522b551491?q=80&w=1000&auto=format&fit=crop",
		price: 149.99,
		categoryId: "6740e24f-26dd-4b37-8fb0-734673f839db", // home
	},
	{
		product: "Wireless Keyboard",
		desc: "Ergonomic design with responsive keys and multi-device Bluetooth connectivity.",
		image:
			"https://images.unsplash.com/photo-1587829741301-dc798b83add3?q=80&w=1000&auto=format&fit=crop",
		price: 79.99,
		categoryId: "777e2fc5-3e2a-4de7-99a2-55c454e1d604", // electronics
	},
];

export const category = new Map();
category.set("All-Products", "all-products");
category.set("electronics", "777e2fc5-3e2a-4de7-99a2-55c454e1d604");
category.set("lightining", "0342b892-aa00-43ee-81bd-5ce0a39c2747");
category.set("audio", "6964181e-1f77-4df5-91f9-607c8298fa82");
category.set("home", "6740e24f-26dd-4b37-8fb0-734673f839db");
