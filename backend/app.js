const express = require("express");
const bodyParser = require("body-parser");
const osrs = require("osrs-wrapper");
const app = express();

app.use(bodyParser.json());

app.get("/", (req, res) => {
	res.send("/ route working!");
});

app.get("/farming", async (req, res) => {
	const snapSeedPrice = await osrs.ge.getItem("snapdragon seed")
		.then(data => parseFloat(JSON.parse(data).item.current.price, 10))
		.catch(err => {
			console.log(err);
		});

	const snapHerbPrice = await osrs.ge.getItem("snapdragon")
		.then(data => parseFloat(JSON.parse(data).item.current.price, 10))
		.catch(err => {
			console.log(err);
		});

	const ranarrSeedPrice = await osrs.ge.getItem("ranarr seed")
		.then(data => parseFloat(JSON.parse(data).item.current.price, 10))
		.catch(err => {
			console.log(err);
		});

	const ranarrHerbPrice = await osrs.ge.getItem("ranarr weed")
		.then(data => parseFloat(JSON.parse(data).item.current.price, 10))
		.catch(err => {
			console.log(err);
		});

	const moneyPerSnapSeed = snapHerbPrice * 9;
	const moneyPerRanarrSeed = ranarrHerbPrice * 9;
	const snapProfit = parseInt((moneyPerSnapSeed - snapSeedPrice) * 1000);
	const ranarrProfit = parseInt((moneyPerRanarrSeed - ranarrSeedPrice) * 1000);

	const results = {
		snapdragon: snapProfit,
		ranarr: ranarrProfit
	}
	res.send(results);
});

app.listen(8081, () => {
	console.log("listening on port 8081 ...")
})
