const fetch = require("node-fetch");

exports.fetchWeather = async (searchText) => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${searchText}&units=metric&APPID=${process.env.WEATHER_API_KEY}`;
    try {
        const weatherStream = await fetch(url);
        const weatherJson = await weatherStream.json();
        return weatherJson;
    } catch (err) {
        return { Error: err.stack };
    }
};

exports.fetchLocationWeather = async (lon, lat) => {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&APPID=${process.env.WEATHER_API_KEY}`;
    try {
        const weatherStream = await fetch(url);
        const weatherJson = await weatherStream.json();
        return weatherJson;
    } catch (err) {
        return { Error: err.stack };
    }
};
