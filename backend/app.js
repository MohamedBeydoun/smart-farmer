const express = require("express");
const bodyParser = require("body-parser");
const osrs = require("osrs-wrapper");
const app = express();
const cors = require('cors');

app.use(cors());
app.use(bodyParser.json());

app.get("/", (req, res) => {
    res.send("/ route working!");
});

app.get("/farming/:herb1/:herb2", async (req, res) => {
    let herb1 = req.params.herb1;
    let herb2 = req.params.herb2;

    if (herb1 == "ranarr" || herb1 == "dwarf") {
        herb1 = herb1 + "_weed"
    }
    if (herb1 == "guam" || herb1 == "irit") {
        herb1 = herb1 + "_leaf"
    }
    if (herb2 == "ranarr" || herb2 == "dwarf") {
        herb2 = herb2 + "_weed"
    }
    if (herb2 == "guam" || herb2 == "irit") {
        console.log("added leaf")
        herb2 = herb2 + "_leaf"
    }

    const herb1SeedPrice = await osrs.ge.getItem(herb1.split("_")[0] + " seed")
        .then(data => String(JSON.parse(data).item.current.price))
        .then(data => {
            if (data.includes("m")) {
                return parseFloat(data) * 1000000
            }
            else if (data.includes(",") || data.includes("k")) {
                return parseFloat(data) * 1000
            }
            else {
                return parseInt(data)
            }
        })
        .catch(err => {
            console.log(err);
        });

    const herb1Price = await osrs.ge.getItem(herb1.replace(/_/g, " "))
        .then(data => String(JSON.parse(data).item.current.price))
        .then(data => {
            if (data.includes("m")) {
                return parseFloat(data) * 1000000
            }
            else if (data.includes(",") || data.includes("k")) {
                return parseFloat(data) * 1000
            }
            else {
                return parseInt(data)
            }
        })
        .catch(err => {
            console.log(err);
        });

    const herb2SeedPrice = await osrs.ge.getItem(herb2.split("_")[0] + " seed")
        .then(data => String(JSON.parse(data).item.current.price))
        .then(data => {
            if (data.includes("m")) {
                return parseFloat(data) * 1000000
            }
            else if (data.includes(",") || data.includes("k")) {
                return parseFloat(data) * 1000
            }
            else {
                return parseInt(data)
            }
        })
        .catch(err => {
            console.log(err);
        });
    const herb2Price = await osrs.ge.getItem(herb2.replace(/_/g, " "))
        .then(data => String(JSON.parse(data).item.current.price))
        .then(data => {
            if (data.includes("m")) {
                return parseFloat(data) * 1000000
            }
            else if (data.includes(",") || data.includes("k")) {
                return parseFloat(data) * 1000
            }
            else {
                return parseInt(data)
            }
        })
        .catch(err => {
            console.log(err);
        });

    // console.log(herb1SeedPrice, herb1Price, herb2SeedPrice, herb2Price);

    const moneyPerHerb1Seed = herb1Price * 9;
    const moneyPerHerb2Seed = herb2Price * 9;
    const herb1Profit = parseInt((moneyPerHerb1Seed - herb1SeedPrice));
    const herb2Profit = parseInt((moneyPerHerb2Seed - herb2SeedPrice));

    // get graph data for the items
    let herb1Labels = [];
    let herb1Values = [];
    let herb1Graph = await osrs.ge.getGraph(herb1.replace(/_/g, " "))
        .then(data => {
            return JSON.parse(data).daily;
        })
        .then(data => {
            herb1Labels = Object.keys(data);
            herb1Values = herb1Labels.map(function (k) {
                return data[k];
            });;
            for (let i = 0; i < herb1Labels.length; i++) {
                herb1Labels[i] = String(new Date(parseInt(herb1Labels[i])));
            }
        });

    console.log(herb1Labels)

    let herb2Labels = [];
    let herb2Values = [];
    let herb2Graph = await osrs.ge.getGraph(herb2.replace(/_/g, " "))
        .then(data => {
            return JSON.parse(data).daily;
        })
        .then(data => {
            herb2Labels = Object.keys(data);
            herb2Values = herb2Labels.map(function (k) {
                return data[k];
            });;
        });

    let seed1Labels = [];
    let seed1Values = [];
    let seed1Graph = await osrs.ge.getGraph(herb1.split("_")[0] + " seed")
        .then(data => {
            return JSON.parse(data).daily;
        })
        .then(data => {
            seed1Labels = Object.keys(data);
            seed1Values = seed1Labels.map(function (k) {
                return data[k];
            });;
        });

    let seed2Labels = [];
    let seed2Values = [];
    let seed2Graph = await osrs.ge.getGraph(herb2.split("_")[0] + " seed")
        .then(data => {
            return JSON.parse(data).daily;
        })
        .then(data => {
            seed2Labels = Object.keys(data);
            seed2Values = seed2Labels.map(function (k) {
                return data[k];
            });;
        });


    const results = {
        herb1: {
            price: herb1Profit,
            labels: herb1Labels,
            values: herb1Values,
            seedLabels: seed1Labels,
            seedValues: seed1Values,
        },
        herb2: {
            price: herb2Profit,
            labels: herb2Labels,
            values: herb2Values,
            seedLabels: seed2Labels,
            seedValues: seed2Values,
        },
    }

    res.send(results);
});

app.listen(8081, () => {
    console.log("listening on port 8081 ...")
})
