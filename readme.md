# Weather App

> Fullstack node.js and vanilla.js weather app.

### Table of Contents

-   [Description & Main Aim](#description)
-   [Used Technologies](#used-technologies)
-   [Features](#features)

---

## Description & Main Aim

Full-stack web application that displays weather conditions and time zone information of the displayed city in a simple and creative way.

The main aim for this project it to pracitce on vanilla js skills such as DOM manipulation, the usage of Class Pattern in building it's simple GUI and the integration of third party API.

[Back To The Top](#table-of-contents)

---

## Used Technologies

-   [Vanilla.js](#vanillajs)
-   [Node.js](#nodejs)
-   Third party integrations
    -   [moment.js](#momentjs)
    -   font awesome icons
-   [Open Weather API](#open-weather-api)

### Vanilla.js

Class pattern is used in this project, as showen in this example

```js
class savedCityCard {
    constructor(cityName) {
        this.htmlElement = document.createElement("li");
        this.htmlElement.classList.add("savedCityCard");

        // new city name container
        let newCity = document.createElement("span");
        newCity.innerText = `${cityName}`;
        document.body.appendChild(newCity);
        this.htmlElement.append(newCity);

        // ....
```

### Node.js

Express.js server is created to handle serving frontend static files and api routes to fetch needed data form Open Weather API

### Moment.js

Moment.js is used to convert time zone data into local date and time, as showen in this example.

```js
sunrise.innerHTML = `Sunrise: ${moment
    .utc(data.sys.sunrise, "X")
    .add(data.timezone, "seconds")
    .format("h:mm A")}`;
```

Documentation: https://momentjs.com/docs

### Open Weather API

Documentation: https://openweathermap.org/appid

[Back To The Top](#table-of-contents)

---

## Features

-   Auto user's geolocation detection to get it's weather.
-   Date and time for the displayed city according to it's specific time zone.
-   Favourite cities to ease user accessabiltiy.

[Back To The Top](#table-of-contents)

---
