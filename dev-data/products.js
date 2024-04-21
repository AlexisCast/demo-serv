const products = [
	{
		id: 1,
		categoryId: 1,
		name: "Laptop",
		state: true,
		price: 1200,
		description: "High-performance laptop",
		available: true,
		img: "",
	},
	{
		id: 2,
		categoryId: 1,
		name: "Smartphone",
		state: true,
		price: 800,
		description: "Latest smartphone model",
		available: true,
		img: "",
	},
	{
		id: 3,
		categoryId: 2,
		name: "T-Shirt",
		state: true,
		price: 20,
		description: "Cotton t-shirt",
		available: true,
		img: "",
	},
	{
		id: 4,
		categoryId: 2,
		name: "Jeans",
		state: true,
		price: 50,
		description: "Denim jeans",
		available: false,
		img: "",
	},
	{
		id: 5,
		categoryId: 3,
		name: "Sofa",
		state: true,
		price: 600,
		description: "Comfortable sofa",
		available: true,
		img: "",
	},
	{
		id: 6,
		categoryId: 3,
		name: "Garden Hose",
		state: true,
		price: 30,
		description: "Durable garden hose",
		available: true,
		img: "",
	},
	{
		id: 7,
		categoryId: 4,
		name: "Novel",
		state: true,
		price: 15,
		description: "Best-selling novel",
		available: true,
		img: "",
	},
	{
		id: 8,
		categoryId: 4,
		name: "Textbook",
		state: true,
		price: 100,
		description: "Educational textbook",
		available: false,
		img: "",
	},
	{
		id: 9,
		categoryId: 5,
		name: "Running Shoes",
		state: true,
		price: 80,
		description: "Comfortable running shoes",
		available: true,
		img: "",
	},
	{
		id: 10,
		categoryId: 5,
		name: "Tent",
		state: true,
		price: 200,
		description: "Camping tent",
		available: true,
		img: "",
	},
	{
		id: 11,
		categoryId: 1,
		name: "Desktop Computer",
		state: true,
		price: 1500,
		description: "Powerful desktop computer",
		available: true,
		img: "",
	},
	{
		id: 12,
		categoryId: 1,
		name: "Tablet",
		state: true,
		price: 400,
		description: "Slim and lightweight tablet",
		available: true,
		img: "",
	},
	{
		id: 13,
		categoryId: 2,
		name: "Dress Shirt",
		state: true,
		price: 30,
		description: "Formal dress shirt",
		available: true,
		img: "",
	},
	{
		id: 14,
		categoryId: 2,
		name: "Skirt",
		state: true,
		price: 25,
		description: "Casual skirt",
		available: false,
		img: "",
	},
	{
		id: 15,
		categoryId: 3,
		name: "Coffee Table",
		state: true,
		price: 200,
		description: "Modern coffee table",
		available: true,
		img: "",
	},
	{
		id: 16,
		categoryId: 3,
		name: "Lawn Mower",
		state: true,
		price: 250,
		description: "Electric lawn mower",
		available: true,
		img: "",
	},
	{
		id: 17,
		categoryId: 4,
		name: "Cookbook",
		state: true,
		price: 20,
		description: "Collection of recipes",
		available: true,
		img: "",
	},
	{
		id: 18,
		categoryId: 4,
		name: "Biography",
		state: true,
		price: 18,
		description: "Life story of a famous personality",
		available: false,
		img: "",
	},
	{
		id: 19,
		categoryId: 5,
		name: "Bicycle",
		state: true,
		price: 300,
		description: "Mountain bike",
		available: true,
		img: "",
	},
	{
		id: 20,
		categoryId: 5,
		name: "Fishing Rod",
		state: true,
		price: 50,
		description: "Quality fishing rod",
		available: true,
		img: "",
	},
	{
		id: 21,
		categoryId: 1,
		name: "Wireless Mouse",
		state: true,
		price: 40,
		description: "Ergonomic wireless mouse",
		available: true,
		img: "",
	},
	{
		id: 22,
		categoryId: 1,
		name: "Headphones",
		state: true,
		price: 100,
		description: "Noise-cancelling headphones",
		available: true,
		img: "",
	},
	{
		id: 23,
		categoryId: 2,
		name: "Sweater",
		state: true,
		price: 45,
		description: "Warm wool sweater",
		available: true,
		img: "",
	},
	{
		id: 24,
		categoryId: 2,
		name: "Shorts",
		state: true,
		price: 15,
		description: "Casual shorts",
		available: false,
		img: "",
	},
	{
		id: 25,
		categoryId: 3,
		name: "Bookshelf",
		state: true,
		price: 150,
		description: "Wooden bookshelf",
		available: true,
		img: "",
	},
	{
		id: 26,
		categoryId: 3,
		name: "Plant Pot",
		state: true,
		price: 10,
		description: "Decorative plant pot",
		available: true,
		img: "",
	},
	{
		id: 27,
		categoryId: 4,
		name: "Dictionary",
		state: true,
		price: 25,
		description: "Comprehensive dictionary",
		available: true,
		img: "",
	},
	{
		id: 28,
		categoryId: 4,
		name: "Graphic Novel",
		state: true,
		price: 22,
		description: "Illustrated story",
		available: false,
		img: "",
	},
	{
		id: 29,
		categoryId: 5,
		name: "Hiking Boots",
		state: true,
		price: 120,
		description: "Waterproof hiking boots",
		available: true,
		img: "",
	},
	{
		id: 30,
		categoryId: 5,
		name: "Camping Stove",
		state: true,
		price: 80,
		description: "Portable camping stove",
		available: true,
		img: "",
	},
	{
		id: 31,
		categoryId: 1,
		name: "Printer",
		state: true,
		price: 150,
		description: "Wireless inkjet printer",
		available: true,
		img: "",
	},
	{
		id: 32,
		categoryId: 1,
		name: "External Hard Drive",
		state: true,
		price: 100,
		description: "1TB external hard drive",
		available: true,
		img: "",
	},
	{
		id: 33,
		categoryId: 2,
		name: "Blouse",
		state: true,
		price: 35,
		description: "Silk blouse",
		available: true,
		img: "",
	},
	{
		id: 34,
		categoryId: 2,
		name: "Pants",
		state: true,
		price: 40,
		description: "Casual pants",
		available: false,
		img: "",
	},
	{
		id: 35,
		categoryId: 3,
		name: "Desk Lamp",
		state: true,
		price: 30,
		description: "Adjustable desk lamp",
		available: true,
		img: "",
	},
	{
		id: 36,
		categoryId: 3,
		name: "Grill",
		state: true,
		price: 300,
		description: "Gas grill",
		available: true,
		img: "",
	},
	{
		id: 37,
		categoryId: 4,
		name: "Magazine",
		state: true,
		price: 5,
		description: "Monthly magazine subscription",
		available: true,
		img: "",
	},
	{
		id: 38,
		categoryId: 4,
		name: "Poetry Book",
		state: true,
		price: 12,
		description: "Collection of poems",
		available: false,
		img: "",
	},
	{
		id: 39,
		categoryId: 5,
		name: "Kayak",
		state: true,
		price: 500,
		description: "Single-person kayak",
		available: true,
		img: "",
	},
	{
		id: 40,
		categoryId: 5,
		name: "Trekking Poles",
		state: true,
		price: 50,
		description: "Aluminum trekking poles",
		available: true,
		img: "",
	},
	{
		id: 41,
		categoryId: 1,
		name: "Webcam",
		state: true,
		price: 60,
		description: "HD webcam",
		available: true,
		img: "",
	},
	{
		id: 42,
		categoryId: 1,
		name: "Keyboard",
		state: true,
		price: 80,
		description: "Mechanical gaming keyboard",
		available: true,
		img: "",
	},
	{
		id: 43,
		categoryId: 2,
		name: "Sneakers",
		state: true,
		price: 70,
		description: "Casual sneakers",
		available: true,
		img: "",
	},
	{
		id: 44,
		categoryId: 2,
		name: "Jacket",
		state: true,
		price: 100,
		description: "Waterproof jacket",
		available: false,
		img: "",
	},
	{
		id: 45,
		categoryId: 3,
		name: "Dining Table",
		state: true,
		price: 400,
		description: "Wooden dining table",
		available: true,
		img: "",
	},
	{
		id: 46,
		categoryId: 3,
		name: "Gardening Gloves",
		state: true,
		price: 15,
		description: "Durable gardening gloves",
		available: true,
		img: "",
	},
	{
		id: 47,
		categoryId: 4,
		name: "Art Book",
		state: true,
		price: 30,
		description: "Collection of art pieces",
		available: true,
		img: "",
	},
	{
		id: 48,
		categoryId: 4,
		name: "Self-Help Book",
		state: true,
		price: 20,
		description: "Guide to personal development",
		available: false,
		img: "",
	},
	{
		id: 49,
		categoryId: 5,
		name: "Golf Clubs",
		state: true,
		price: 400,
		description: "Complete set of golf clubs",
		available: true,
		img: "",
	},
	{
		id: 50,
		categoryId: 5,
		name: "Camping Lantern",
		state: true,
		price: 20,
		description: "LED camping lantern",
		available: true,
		img: "",
	},
];

module.exports = products;
