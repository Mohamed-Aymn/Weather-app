require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();

// import routes
const weather = require("./routes/weather");
const currentLocation = require("./routes/current-location");

app.use(express.json());
app.use(cors());
app.use(express.static(__dirname + "/public"));

app.get("/", (req, res) => {
    res.json({ success: "hello world" });
});

// use routes
app.use("/weather", weather);
app.use("/current-location", currentLocation);

// listen to port
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`app listening on port ${port}`));
