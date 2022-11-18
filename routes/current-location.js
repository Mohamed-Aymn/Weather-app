const express = require("express");
const router = express.Router();
const fetch = require("node-fetch");

const fetchLocationWeather = async (lon, lat) => {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&APPID=${process.env.WEATHER_API_KEY}`;
    try {
        const weatherStream = await fetch(url);
        const weatherJson = await weatherStream.json();
        return weatherJson;
    } catch (err) {
        return { Error: err.stack };
    }
};

router.get("/", async (req, res) => {
    if (req.query.lat && req.query.lon) {
        try {
            const data = await fetchLocationWeather(
                req.query.lon,
                req.query.lat
            );
            console.log(data);
            res.json(data);
        } catch (err) {
            console.log(err.message);
        }
    } else {
        res.json("lat and lon are requeruied as queries");
    }
});

router.get("/:lon&:lat", async (req, res) => {
    const lon = req.params.lon;
    const lat = req.params.lat;
    const data = await fetchLocationWeather(lon, lat);
    res.json(data);
});

router.post("/", async (req, res) => {
    const searchText = req.body.searchText;
    const data = await fetchWeather(searchText);
    res.json(data);
});

module.exports = router;
