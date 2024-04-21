require("dotenv").config();
const fs = require("fs");
const express = require("express");
const morgan = require("morgan");
const port = process.env.PORT || 3000;

const app = express();

//	1) Middlewares
app.use(morgan("dev"));
app.use(express.json());

app.use((req, res, next) => {
	console.log("hello!");
	next();
});

app.use((req, res, next) => {
	req.requestTime = new Date().toISOString();
	next();
});

let products = JSON.parse(
	fs.readFileSync(`${__dirname}/dev-data/products.json`)
);

//	2) Routes Handlers
const getAllProducts = (req, res) => {
	res.status(200).json({
		results: products.length,
		requestedAt: req.requestTime,
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

const getAllUsers = (req, res) => {
	res.status(500).json({
		msg: "This route is not yet defined",
	});
};

const createUser = (req, res) => {
	res.status(500).json({
		msg: "This route is not yet defined",
	});
};

const getUser = (req, res) => {
	res.status(500).json({
		msg: "This route is not yet defined",
	});
};

const updateUser = (req, res) => {
	res.status(500).json({
		msg: "This route is not yet defined",
	});
};

const deleteUser = (req, res) => {
	res.status(500).json({
		msg: "This route is not yet defined",
	});
};

// app.get("/api/v1/products", getAllProducts);
// app.post("/api/v1/products", createProduct);
// app.get("/api/v1/products/:id", getProduct);
// app.patch("/api/v1/products/:id", updateProduct);
// app.delete("/api/v1/products/:id", deleteProduct);

//	3) Routes

const productRouter = express.Router();
const userRouter = express.Router();

productRouter
	.route("/")
	.get(getAllProducts)
	.post(createProduct);

productRouter
	.route("/:id")
	.get(getProduct)
	.patch(updateProduct)
	.delete(deleteProduct);

userRouter
	.route("/")
	.get(getAllUsers)
	.post(createUser);

userRouter
	.route("/:id")
	.get(getUser)
	.patch(updateUser)
	.delete(deleteUser);

app.use("/api/v1/products", productRouter);
app.use("/api/v1/user", userRouter);

//	4) Star Server
app.listen(port, () => {
	console.log(`Server running on port ${port}`);
});
