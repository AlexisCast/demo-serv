require("dotenv").config();
const fs = require("fs");

const express = require("express");
const { time } = require("console");

const port = process.env.PORT || 3000;

const app = express();

app.use(express.json());

let products = JSON.parse(
	fs.readFileSync(`${__dirname}/dev-data/products.json`)
);

app.get("/api/v1/products", (req, res) => {
	res.status(200).json({
		results: products.length,
		data: {
			products: products,
		},
	});
});

app.get("/api/v1/products/:id", (req, res) => {
	const { id } = req.params;
	const product = products.find((item) => item.id == id);
	if (product) {
		return res.status(200).json({
			data: {
				product,
			},
		});
	}

	res.status(404).json({
		msg: `${id} invalid id`,
	});
});

app.post("/api/v1/products", (req, res) => {
	const newId = products[products.length - 1].id + 1;
	const newProduct = {
		id: newId,
		...req.body,
	};

	products = [...products, newProduct];

	fs.writeFile(
		`${__dirname}/dev-data/products.json`,
		JSON.stringify(products),
		(err) => {
			res.status(201).json({
				data: {
					product: { newProduct },
				},
			});
		}
	);
});

app.listen(port, () => {
	console.log(`Server running on port ${port}`);
});
