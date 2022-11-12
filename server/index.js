require("dotenv").config();
const http = require("http");
const url = require("url");
const { fetchWeather, fetchLocationWeather } = require("./dataFetchers");

const server = http.createServer((req, res) => {
    const headers = {
        "Content-Type": "text/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, GET, PUT, PATCH, DELETE",
        "Access-Control-Allow-Headers":
            "Origin, X-Requested-With, Content-Type, Accept",
    };

    res.writeHead(200, headers);
    const queryObject = url.parse(req.url, true).query;
    let path = url.parse(req.url).pathname;
    switch (path) {
        case "/weather":
            (async function () {
                try {
                    var data = await fetchWeather(queryObject.city);
                    res.end(JSON.stringify(data));
                } catch (err) {
                    console.log(err.message);
                    res.writeHead(404);
                }
            })();
            break;
        case "/current-location":
            (async function () {
                try {
                    var data = await fetchLocationWeather(
                        queryObject.lon,
                        queryObject.lat
                    );
                    res.end(JSON.stringify(data));
                } catch (err) {
                    console.log(err.message);
                    res.writeHead(404);
                }
            })();
            break;
        default:
            res.writeHead(404);
            res.write("route not found");
            res.end();
    }
});

server.listen(process.env.PORT || 5000);
