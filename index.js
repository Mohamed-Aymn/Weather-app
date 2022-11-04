const api = {
    key: "724933b760f810a066c9e2b0a30a3306",
    base: "https://api.openweathermap.org/data/2.5/",
};

addEventListener("load", () => {
    navigator.geolocation.getCurrentPosition((position) => {
        fetch(
            `${api.base}weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=metric&appid=${api.key}`
        )
            .then((data) => {
                return data.json();
            })
            .then(displayResults);
    });
});

let searchBar = document.querySelector(".searchBar");
searchBar.addEventListener("keypress", setQuery);

function setQuery(e) {
    // 13 is the keyCode of enter key
    if (e.keyCode == 13) {
        getResults(searchBar.value);
        searchBar.value = "";
    }
}

function getResults(query) {
    fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then((data) => {
            return data.json();
        })
        .then(displayResults);
}

function displayResults(data) {
    // city name
    let city = document.querySelector(".city");
    city.innerText = `${data.name}, ${data.sys.country}`;

    // temp
    let temp = document.querySelector(".temp");
    temp.innerHTML = `${Math.floor(data.main.temp)}°C`;

    // hiLow
    let hiLow = document.querySelector(".hiLow");
    hiLow.innerHTML = `${Math.floor(data.main.temp_min)} / ${Math.floor(
        data.main.temp_max
    )}`;

    // icon
    document.querySelector(
        ".icon"
    ).src = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

    // wind
    let wind = document.querySelector(".wind");
    wind.innerHTML = `${data.wind.speed} km/h`;

    // humidity
    let humidity = document.querySelector(".humidity");
    humidity.innerHTML = `${data.main.humidity}%`;

    // time
    let time = document.querySelector(".time");
    setInterval(
        (function exactTime() {
            time.innerHTML = `${moment
                .utc()
                .add(data.timezone, "seconds")
                .format("h:m:ss A")}`;
            return exactTime;
        })(),
        1000
    );

    // date
    let date = document.querySelector(".date");
    date.innerHTML = `${moment.utc().add(data.timezone, "date").format("LL")}`;

    // sunrise
    let sunrise = document.querySelector(".sunrise");
    let sunriseExactTime = moment
        .utc(data.sys.sunrise, "X")
        .add(data.timezone, "seconds")
        .format("h:mm A");
    sunrise.innerHTML = `Sunrise: ${sunriseExactTime}`;

    // sunset
    let sunset = document.querySelector(".sunset");
    let sunsetExactTime = moment
        .utc(data.sys.sunset, "X")
        .add(data.timezone, "seconds")
        .format("h:mm A");
    sunset.innerHTML = `Sunset: ${sunsetExactTime}`;

    // background color
    let nightTime = parseInt(
        moment
            .utc(data.sys.sunset, "X")
            .add(data.timezone, "seconds")
            .format("h")
    );
    let currentHour = parseInt(
        moment.utc().add(data.timezone, "seconds").format("h")
    );

    if (currentHour >= nightTime) {
        document.body.classList.add("darkTheme");
    } else {
        document.body.classList.remove("darkTheme");
    }
}

// function calcTime(offset) {
//     d = new Date();
//     utc = d.getTime() + d.getTimezoneOffset() * 60000;
//     nd = new Date(utc + 3600000 * offset);
//     return nd.toLocaleString();
// }

// date and time
// setInterval(
//     (function foo() {
//         console.log("hello");
//         return foo;
//     })(),
//     1000
// );

/*

// add city handler
let addCityHandler = (cityName) => {
    let citiesContainer = document.querySelector(".citiesContainer");
    let addCity = document.querySelector(".addCity");
    addCity.addEventListener("click", () => {
        let newCity = document.createElement("li");
        document.body.appendChild(newCity);
        newCity.innerHTML = document.write = `
                    <span>${cityName}</span>
                    <i class="fa-solid fa-x"></i>
                `;
        newCity.classList.add("savedCityCard");
        citiesContainer.prepend(newCity);
    });
};

// edit saved cities handler
// make it self invoked fucntion
let savedCitiesHandler = () => {
    let editIcon = document.querySelector(".editIcon");
    editIcon.addEventListener("click", () => {
        // newCity.classList.remove("");
        let allDeleteIcons = document.querySelectorAll(".hidden");
        allDeleteIcons.classList.remove("hidden");
    });
};
*/
