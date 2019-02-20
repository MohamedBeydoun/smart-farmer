const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const cors = require('cors');

app.use(cors());
app.use(bodyParser.json());

let comparatorRoutes = require("./routes/comparator");

app.use("/comparator", comparatorRoutes);

app.get("/", (req, res) => {
    res.send("/ route working!");
});

app.listen(8081, () => {
    console.log("listening on port 8081 ...")
});
