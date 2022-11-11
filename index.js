const api = {
    key: "724933b760f810a066c9e2b0a30a3306",
    base: "https://api.openweathermap.org/data/2.5/",
};

// conditional cards display (landing card, info card, error card)
let mainContainer = document.querySelector(".contentContainer");
let landingContainer = document.querySelector(".landingContainer");
let errorContainer = document.querySelector(".errorContainer");
let errorMessage = document.querySelector(".errorMessage");
let errorContainerTriggerer = (errorInput) => {
    errorContainer.classList.remove("hidden");
    mainContainer.classList.add("hidden");
    landingContainer.classList.add("hidden");
    document.body.classList.remove("darkTheme");
    if (errorInput !== "") {
        errorMessage.innerHTML = `There is <b>no</b> city or country called "<b>${errorInput}</b>".`;
    } else {
        errorMessage.innerHTML = `Please type a name of city or country before pressing <b>enter</b> key.`;
    }
};

// city name setter
let city = document.querySelector(".city");
let setCityName = (data) => {
    city.innerText = `${data.name}, ${data.sys.country}`;
};

// temp setter
let temp = document.querySelector(".temp");
let setTemp = (data) => {
    temp.innerHTML = `${Math.floor(data.main.temp)}°C`;
};

// hilow setter
let hiLow = document.querySelector(".hiLow");
let hiLowContainer = document.querySelector(".hiLowContainer");
let setHighLow = (data) => {
    if (
        Math.floor(data.main.temp_min) === Math.floor(data.main.temp_max) ||
        data.main.temp_min === 0 ||
        data.main.temp_max === 0
    ) {
        hiLowContainer.classList.add("hidden");
    } else {
        hiLowContainer.classList.remove("hidden");
        hiLow.innerHTML = `${Math.floor(data.main.temp_min)} / ${Math.floor(
            data.main.temp_max
        )}`;
    }
};

// icon setter
let setIcon = (icon) => {
    document.querySelector(
        ".icon"
    ).src = `http://openweathermap.org/img/wn/${icon}@2x.png`;
};

//  wind setter
let wind = document.querySelector(".wind");
let windContainer = document.querySelector(".windContainer");
let setWind = (data) => {
    if (data.wind.speed === 0) {
        windContainer.classList.add("hidden");
    } else {
        windContainer.classList.remove("hidden");
        wind.innerHTML = `${data.wind.speed} km/h`;
    }
};

// humidity setter
let humidity = document.querySelector(".humidity");
let setHumidity = (data) => {
    humidity.innerHTML = `${data.main.humidity}%`;
};

// time setter
let time = document.querySelector(".time");
let timeInterval;
let setTime = (data) => {
    if (timeInterval) {
        clearInterval(timeInterval);
    }
    let exactTime = () => {
        time.innerHTML = `${moment
            .utc()
            .add(data.timezone, "seconds")
            .format("h:m:ss A")}`;
    };
    exactTime();
    timeInterval = setInterval(exactTime, 1000);
};

// sunrise and sunset setter
let sunrise = document.querySelector(".sunrise");
let sunset = document.querySelector(".sunset");
let setSunriseSunset = (data) => {
    sunrise.innerHTML = `Sunrise: ${moment
        .utc(data.sys.sunrise, "X")
        .add(data.timezone, "seconds")
        .format("h:mm A")}`;
    sunset.innerHTML = `Sunset: ${moment
        .utc(data.sys.sunset, "X")
        .add(data.timezone, "seconds")
        .format("h:mm A")}`;
};

// date setter
let date = document.querySelector(".date");
let setDate = (data) => {
    date.innerHTML = `${moment.utc().add(data.timezone, "date").format("LL")}`;
};

// background setter
let setBackgroundColor = (data) => {
    let sunset = parseInt(
        moment
            .utc(data.sys.sunset, "X")
            .add(data.timezone, "seconds")
            .format("H")
    );
    let sunrise = parseInt(
        moment
            .utc(data.sys.sunrise, "X")
            .add(data.timezone, "seconds")
            .format("H")
    );
    let currentHour = parseInt(
        moment.utc().add(data.timezone, "seconds").format("H")
    );

    if (currentHour > sunrise && currentHour < sunset) {
        document.body.classList.remove("darkTheme");
    } else {
        document.body.classList.add("darkTheme");
    }
};

addEventListener("load", () => {
    mainContainer.classList.add("hidden");
    navigator.geolocation.getCurrentPosition(
        // allowed position
        (position) => {
            fetch(
                `${api.base}weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=metric&appid=${api.key}`
            )
                .then((data) => {
                    return data.json();
                })
                .then(displayResults)
                .then(() => {
                    landingContainer.classList.add("hidden");
                    mainContainer.classList.remove("hidden");
                });
        },
        // denied position
        () => {
            mainContainer.classList.add("hidden");
        }
    );
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
        .then((data) => {
            displayResults(data);
            errorContainer.classList.add("hidden");
            landingContainer.classList.add("hidden");
            mainContainer.classList.remove("hidden");
        })
        .catch(() => {
            errorContainerTriggerer(query);
        });
}

function displayResults(data) {
    setCityName(data);
    setTemp(data);
    setHighLow(data);
    setIcon(data.weather[0].icon);
    setWind(data);
    setHumidity(data);
    setTime(data);
    setDate(data);
    setSunriseSunset(data);
    setBackgroundColor(data);
}

// add city handler
let citiesContainer = document.querySelector(".citiesContainer");
let addCity = document.querySelector(".addCity");

let isNumber = (str) => {
    return /^[0-9]+$/.test(str);
};
let counter = localStorage.getItem("counter");

// fetch saved cities form local storge
addEventListener("load", () => {
    for (var i = 0; i <= localStorage.length - 1; i++) {
        let key = localStorage.key(i);
        let val = localStorage.getItem(key);

        if (isNumber(val)) {
            null;
        } else {
            // new city container
            let newCityContainer = document.createElement("li");
            document.body.appendChild(newCityContainer);
            newCityContainer.classList.add("savedCityCard");

            // new city name container
            let newCity = document.createElement("span");
            newCity.innerText = `${val}`;
            document.body.appendChild(newCity);
            newCityContainer.append(newCity);

            // delete icon container
            let deleteIconContainer = document.createElement("div");
            deleteIconContainer.classList.add("deleteIconContainer");
            document.body.appendChild(deleteIconContainer);
            newCityContainer.appendChild(deleteIconContainer);

            // delete icon
            let deleteIcon = document.createElement("i");
            deleteIcon.classList.add("fa-solid", "fa-x");
            document.body.appendChild(deleteIcon);
            deleteIconContainer.append(deleteIcon);

            // add all to the new city container
            citiesContainer.prepend(newCityContainer);

            // new city card handler
            newCity.addEventListener("click", () => {
                getResults(newCity.innerHTML);
            });

            // delete button hanlder
            deleteIconContainer.addEventListener("click", () => {
                citiesContainer.removeChild(newCityContainer);
                for (var i = 0; i <= localStorage.length - 1; i++) {
                    let key = localStorage.key(i);
                    let val = localStorage.getItem(key);
                    if (newCity.innerText == val) {
                        localStorage.removeItem(key);
                        console.log(citiesContainer.childElementCount);
                        citiesContainer.childElementCount == 1
                            ? localStorage.setItem("counter", 0)
                            : null;
                    }
                }
                // show add button if cities number lower than the limit
                if (citiesContainer.childElementCount < 5) {
                    addCity.classList.remove("hidden");
                }
            });
        }
    }
});

addCity.addEventListener("click", () => {
    let isExists = false;
    for (var i = 0; i <= localStorage.length - 1; i++) {
        let key = localStorage.key(i);
        let val = localStorage.getItem(key);

        if (val == city.innerHTML.split(",")[0]) {
            isExists = true;
            break;
        }
    }

    if (citiesContainer.childElementCount === 5) {
        console.log("you can save only four cities");
    } else if (isExists === false) {
        // new city container
        let newCityContainer = document.createElement("li");
        document.body.appendChild(newCityContainer);
        newCityContainer.classList.add("savedCityCard");

        // new city name container
        let newCity = document.createElement("span");
        newCity.innerText = `${city.innerHTML.split(",")[0]}`;
        document.body.appendChild(newCity);
        newCityContainer.append(newCity);

        // delete icon container
        let deleteIconContainer = document.createElement("div");
        deleteIconContainer.classList.add("deleteIconContainer");
        document.body.appendChild(deleteIconContainer);
        newCityContainer.appendChild(deleteIconContainer);

        // delete icon
        let deleteIcon = document.createElement("i");
        deleteIcon.classList.add("fa-solid", "fa-x");
        document.body.appendChild(deleteIcon);
        deleteIconContainer.append(deleteIcon);

        // add all to the new city container
        citiesContainer.prepend(newCityContainer);

        // add saved city to local storage
        counter++;
        localStorage.setItem(
            "savedCities:" + counter,
            city.innerHTML.split(",")[0]
        );
        localStorage.setItem("counter", counter);

        // new city card handler
        newCity.addEventListener("click", () => {
            getResults(newCity.innerHTML);
        });

        // delete button hanlder
        deleteIconContainer.addEventListener("click", () => {
            citiesContainer.removeChild(newCityContainer);
            for (var i = 0; i <= localStorage.length - 1; i++) {
                let key = localStorage.key(i);
                let val = localStorage.getItem(key);
                if (newCity.innerText == val) {
                    localStorage.removeItem(key);
                    citiesContainer.childElementCount == 1
                        ? localStorage.setItem("counter", 0)
                        : null;
                }
            }
            // show add button if cities number lower than the limit
            if (citiesContainer.childElementCount < 5) {
                addCity.classList.remove("hidden");
            }
        });

        // if it is the last element just hide add button
        if (citiesContainer.childElementCount === 5) {
            addCity.classList.add("hidden");
        }
    } else {
        console.log("no because it is already exists");
    }
});

/*
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
