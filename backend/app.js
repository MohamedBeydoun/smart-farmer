const express = require("express");
const bodyParser = require("body-parser");
const osrs = require("osrs-wrapper");
const app = express();

app.use(bodyParser.json());

app.get("/", (req, res) => {
	res.send("/ route working!");
});

app.get("/farming", (req, res) => {
	let snapPrice = osrs.ge.getItem("snapdragon seed")
		.then(data => JSON.parse(data))
		.then(data => data.item.current.price)
		.catch(err => {
			console.log(err);
		});
	res.send();
});

app.listen(8081, () => {
	console.log("listening on port 8081 ...")
})
