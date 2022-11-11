import "./savedCities.js";
import { displayResults, api } from "./dataGetter.js";

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
    } else {
        errorMessage.innerHTML = `Please type a name of city or country before pressing <b>enter</b> key.`;
    }
};

// location detection
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
