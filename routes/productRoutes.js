const express = require("express");
const productController = require("../controllers/productController");

const router = express.Router();

router.param("id", (req, res, next, val) => {
	console.log(`product id is: ${val}`);
	next();
});

router.param("id",productController.checkID);

router
	.route("/")
	.get(productController.getAllProducts)
	.post(productController.createProduct);

router
	.route("/:id")
	.get(productController.getProduct)
	.patch(productController.updateProduct)
	.delete(productController.deleteProduct);

module.exports = router;
