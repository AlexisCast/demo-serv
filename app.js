require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT || 300;

app.get("/", (req, res) => {
	res.status(200).json({ msg: "Hello World!" });
});

app.listen(port, () => {
	console.log(`Server running on port ${port}`);
});
