import { getResults } from "./dataGetter.js";

// current city
let city = document.querySelector(".city");
let citiesContainer = document.querySelector(".citiesContainer");
let addCityButton = document.querySelector(".addCity");

let isNumber = (str) => {
    return /^[0-9]+$/.test(str);
};

let counter = 0;

class savedCityCard {
    constructor(cityName) {
        this.htmlElement = document.createElement("li");
        this.htmlElement.classList.add("savedCityCard");

        // new city name container
        let newCity = document.createElement("span");
        newCity.innerText = `${cityName}`;
        document.body.appendChild(newCity);
        this.htmlElement.append(newCity);

        // delete icon container
        let deleteIconContainer = document.createElement("div");
        deleteIconContainer.classList.add("deleteIconContainer");
        document.body.appendChild(deleteIconContainer);
        this.htmlElement.appendChild(deleteIconContainer);

        // delete icon
        let deleteIcon = document.createElement("i");
        deleteIcon.classList.add("fa-solid", "fa-x");
        document.body.appendChild(deleteIcon);
        deleteIconContainer.append(deleteIcon);

        // new city card handler
        newCity.addEventListener("click", () => {
            getResults(newCity.innerHTML);
        });

        // delete button hanlder
        deleteIconContainer.addEventListener("click", () => {
            citiesContainer.removeChild(this.htmlElement);
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
                addCityButton.classList.remove("hidden");
            }
        });
    }

    // add all to the new city container
    addToBody() {
        citiesContainer.prepend(this.htmlElement);
    }
}

// fetch saved cities form local storge
addEventListener("load", () => {
    for (var i = 0; i <= localStorage.length - 1; i++) {
        let key = localStorage.key(i);
        let val = localStorage.getItem(key);

        if (isNumber(val)) {
            null;
        } else {
            const loadCity = new savedCityCard(val);
            loadCity.addToBody();
        }
    }
});

addCityButton.addEventListener("click", () => {
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
        const newCity = new savedCityCard(city.innerHTML.split(",")[0]);
        newCity.addToBody();
        // add new city to local storage add increment counter
        counter++;
        localStorage.setItem(
            "savedCities:" + counter,
            city.innerHTML.split(",")[0]
        );
        localStorage.setItem("counter", counter);

        // if it is the last element just hide add button
        if (citiesContainer.childElementCount === 5) {
            addCityButton.classList.add("hidden");
        }
    } else {
        console.log("no because it is already exists");
    }
});
