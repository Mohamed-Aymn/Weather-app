// city name setter
let city = document.querySelector(".city");
export let setCityName = (data) => {
    city.innerText = `${data.name}, ${data.sys.country}`;
};

// temp setter
let temp = document.querySelector(".temp");
export let setTemp = (data) => {
    temp.innerHTML = `${Math.floor(data.main.temp)}°C`;
};

// hilow setter
let hiLow = document.querySelector(".hiLow");
let hiLowContainer = document.querySelector(".hiLowContainer");
export let setHighLow = (data) => {
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
export let setIcon = (icon) => {
    document.querySelector(
        ".icon"
    ).src = `http://openweathermap.org/img/wn/${icon}@2x.png`;
};

//  wind setter
let wind = document.querySelector(".wind");
let windContainer = document.querySelector(".windContainer");
export let setWind = (data) => {
    if (data.wind.speed === 0) {
        windContainer.classList.add("hidden");
    } else {
        windContainer.classList.remove("hidden");
        wind.innerHTML = `${data.wind.speed} km/h`;
    }
};

// humidity setter
let humidity = document.querySelector(".humidity");
export let setHumidity = (data) => {
    humidity.innerHTML = `${data.main.humidity}%`;
};

// time setter
let time = document.querySelector(".time");
let timeInterval;
export let setTime = (data) => {
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
export let setSunriseSunset = (data) => {
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
export let setDate = (data) => {
    date.innerHTML = `${moment.utc().add(data.timezone, "date").format("LL")}`;
};

// background and website icon setter
export let setBackgroundColor = (data) => {
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
        document.querySelector("link[rel='shortcut icon']").href =
            "./assets/blue.ico";
    } else {
        document.body.classList.add("darkTheme");
        document.querySelector("link[rel='shortcut icon']").href =
            "./assets/black.ico";
    }
};
