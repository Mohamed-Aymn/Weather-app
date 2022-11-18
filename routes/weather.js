const express = require("express");
const router = express.Router();
const fetch = require("node-fetch");

const fetchWeather = async (searchText) => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${searchText}&units=metric&APPID=${process.env.WEATHER_API_KEY}`;
    try {
        const weatherStream = await fetch(url);
        const weatherJson = await weatherStream.json();
        return weatherJson;
    } catch (err) {
        return { Error: err.stack };
    }
};

router.get("/", async (req, res) => {
    if (req.query.city) {
        try {
            const data = await fetchWeather(req.query.city);
            res.json(data);
        } catch (err) {
            console.log(err.message);
        }
    }
});

router.post("/", async (req, res) => {
    const searchText = req.body.searchText;
    const data = await fetchWeather(searchText);
    res.json(data);
});

module.exports = router;
