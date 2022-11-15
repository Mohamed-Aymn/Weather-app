require("dotenv").config();
const http = require("http");
const url = require("url");
const { fetchWeather, fetchLocationWeather } = require("./dataFetchers");
const fs = require("fs");

// // const serve = files(path.join(__dirname, "src"));
// // console.log(serve);

// // declare writable global variables:
// let html;
// let css;
// let js;
// // use fs.readFile to assign the global variables above:
// __dirname + "/public/" + path;
// fs.readFile(__dirname + "/public" + "/index.html", function (err, data) {
//     if (err) {
//         throw err;
//     }
//     html = data;
// });
// fs.readFile(__dirname + "/public" + "/index.css", function (err, data) {
//     if (err) {
//         throw err;
//     }
//     css = data;
// });
// fs.readFile(__dirname + "/public" + "/app.js", function (err, data) {
//     if (err) {
//         throw err;
//     }
//     js = data;
// });

const server = http.createServer((req, res) => {
    // if (req.url.indexOf(".css") != -1) {
    //     res.writeHead(200, { "Content-Type": "text/css" });
    //     res.write(css);
    //     res.end();
    //     return;
    // }
    // if (req.url.indexOf("index.js") != -1) {
    //     res.writeHead(200, { "Content-Type": "text/javascript" });
    //     res.write(js);
    //     res.end();
    //     return;
    // }
    // res.writeHeader(200, { "Content-Type": "text/html" });
    // res.write(html);
    // res.end();
    // //

    // //handle the request and send back a static file from a folder called `public`
    // let parsedURL = url.parse(req.url, true);
    // // console.log(parsedURL);
    // //remove the leading and trailing slashes
    // let path = parsedURL.path.replace(/^\/+|\/+$/g, "");
    // // console.log("this is the pathh " + path);
    // /**
    //  *  /
    //  *  /index.html
    //  *
    //  *  /main.css
    //  *  /main.js
    //  */
    // if (path == "") {
    //     path = "index.html";
    // }
    // console.log(`Requested path ${path} `);

    // // __dirname is the folder which i am in
    // let file = __dirname + "/public/" + path;
    // //async read file function uses callback
    // fs.readFile(file, function (err, content) {
    //     if (err) {
    //         console.log(`File Not Found ${file}`);
    //         res.writeHead(404);
    //         res.end();
    //     } else {
    //         //specify the content type in the response
    //         console.log(`Returning ${path}`);
    //         res.setHeader("X-Content-Type-Options", "nosniff");
    //         let mime = lookup(path);
    //         res.writeHead(200, { "Content-type": mime });
    //         // switch (path) {
    //         //     case "index.css":
    //         //         res.writeHead(200, { "Content-type": "text/css" });
    //         //         break;
    //         //     case "app.js":
    //         //         res.writeHead(200, {
    //         //             "Content-type": "application/javascript",
    //         //         });
    //         //         break;
    //         //     case "index.html":
    //         //         res.writeHead(200, { "Content-type": "text/html" });
    //         // }
    //         res.end(content);
    //     }
    // });

    //

    const headers = {
        "Content-Type": "text/json",
        // "Content-Type": "text/html",

        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, GET, PUT, PATCH, DELETE",
        "Access-Control-Allow-Headers":
            "Origin, X-Requested-With, Content-Type, Accept",
        "Transfer-Encoding": "chunked",
    };

    res.writeHead(200, headers);
    const queryObject = url.parse(req.url, true).query;
    let path1 = url.parse(req.url).pathname;
    switch (path1) {
        // case "/":
        //     fs.readFile("./public/index.html", "UTF-8", (err, html) => {
        //         try {
        //             // res.statusCode = 200;
        //             // res.setHeader("Content-Type", "text/html");
        //             res.end(html);
        //         } catch (err) {
        //             console.log(err);
        //         }
        //     });
        //     break;
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
    // res.end();
});

server.listen(process.env.PORT || 5000);
