import "./savedCities.js";
import { displayResults } from "./dataGetter.js";

// conditional cards display (landing card, info card, error card)
let mainContainer = document.querySelector(".contentContainer");
let landingContainer = document.querySelector(".landingContainer");
let errorContainer = document.querySelector(".errorContainer");
let errorMessage = document.querySelector(".errorMessage");
export let errorContainerTriggerer = (errorInput) => {
    errorContainer.classList.remove("hidden");
    mainContainer.classList.add("hidden");
    landingContainer.classList.add("hidden");
    document.body.classList.remove("darkTheme");
    if (errorInput !== "") {
        errorMessage.innerHTML = `There is <b>no</b> city or country called "<b>${errorInput}</b>".`;
        document.querySelector("link[rel='shortcut icon']").href =
            "./assets/exclamation.ico";
    } else {
        errorMessage.innerHTML = `Please type a name of city or country before pressing <b>enter</b> key.`;
        document.querySelector("link[rel='shortcut icon']").href =
            "./assets/exclamation.ico";
    }
};

// location detection
addEventListener("load", () => {
    mainContainer.classList.add("hidden");
    navigator.geolocation.getCurrentPosition(
        // allowed position
        (position) => {
            fetch(
                `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.latitude}&units=metric&APPID=724933b760f810a066c9e2b0a30a3306`
            )
                // fetch(
                //     `/current-location?lon=${position.coords.longitude}&lat=${position.coords.latitude}`
                // )
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
