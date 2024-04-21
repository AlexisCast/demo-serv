require("dotenv").config();
const fs = require("fs");

const express = require("express");

const port = process.env.PORT || 3000;

const app = express();

app.use(express.json());

let products = JSON.parse(
	fs.readFileSync(`${__dirname}/dev-data/products.json`)
);

const getAllProducts = (req, res) => {
	res.status(200).json({
		results: products.length,
		data: {
			products: products,
		},
	});
};

const getProduct = (req, res) => {
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
};

const createProduct = (req, res) => {
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
};

const updateProduct = (req, res) => {
	const { id } = req.params;
	const product = products.find((item) => item.id == id);

	if (!product) {
		return res.status(404).json({
			msg: `${id} invalid id`,
		});
	}

	const updatedProduct = {
		...product,
		...req.body,
	};

	const updatedProducts = products.map((product) =>
		product.id === updatedProduct.id ? updatedProduct : product
	);

	fs.writeFile(
		`${__dirname}/dev-data/products.json`,
		JSON.stringify(updatedProducts),
		(err) => {
			res.status(200).json({
				data: {
					product: { updatedProduct },
				},
			});
		}
	);
};

const deleteProduct = (req, res) => {
	const { id } = req.params;
	const product = products.find((item) => item.id == id);

	if (!product) {
		return res.status(404).json({
			msg: `${id} invalid id`,
		});
	}

	const updatedProducts = products.filter((product) => product.id != id);

	fs.writeFile(
		`${__dirname}/dev-data/products.json`,
		JSON.stringify(updatedProducts),
		(err) => {
			res.status(200).json({
				data: {
					product: { product },
				},
			});
		}
	);
};

// app.get("/api/v1/products", getAllProducts);
// app.post("/api/v1/products", createProduct);
// app.get("/api/v1/products/:id", getProduct);
// app.patch("/api/v1/products/:id", updateProduct);
// app.delete("/api/v1/products/:id", deleteProduct);

app.route("/api/v1/products")
	.get(getAllProducts)
	.post(createProduct);

app.route("/api/v1/products/:id")
	.get(getProduct)
	.patch(updateProduct)
	.delete(deleteProduct);

app.listen(port, () => {
	console.log(`Server running on port ${port}`);
});
