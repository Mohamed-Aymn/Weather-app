import {
    setCityName,
    setTemp,
    setHighLow,
    setIcon,
    setWind,
    setHumidity,
    setTime,
    setDate,
    setSunriseSunset,
    setBackgroundColor,
} from "./dataSetter.js";
import { errorContainerTriggerer } from "./index.js";

let mainContainer = document.querySelector(".contentContainer");
let landingContainer = document.querySelector(".landingContainer");
let errorContainer = document.querySelector(".errorContainer");

// get value from serach bar and send it to the api
let searchBar = document.querySelector(".searchBar");
searchBar.addEventListener("keypress", setQuery);
function setQuery(e) {
    // 13 is the keyCode of enter key
    if (e.keyCode == 13) {
        getResults(searchBar.value);
        searchBar.value = "";
    }
}

export function getResults(query) {
    // fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
    fetch(`http://localhost:5000/weather?city=${query}`)
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
            // console.log(err)
            errorContainerTriggerer(query);
        });
}

export let displayResults = (data) => {
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
};
