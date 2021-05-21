// Current date and time

function formatDate(today) {
    let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    let day = days[today.getDay()];

    let date = today.getDate();

    let months = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
    ];
    let month = months[today.getMonth()];

    let year = today.getFullYear();

    let hours = today.getHours();
    if (hours < 10) {
        hours = `0${hours}`;
    }

    let minutes = today.getMinutes();
    if (minutes < 10) {
        minutes = `0${minutes}`;
    }

    return `${day} ${date} ${month} ${year}, ${hours}:${minutes}`;
}

let now = new Date();
let liDate = document.querySelector("#date");

liDate.innerHTML = formatDate(now);

//Search Engine Location

function inputWeather(response) {
    console.log(response);
    let temperature = Math.round(response.data.main.temp);
    let temperatureElement = document.querySelector("#current-temp");
    let country = response.data.sys.country;
    let countryElement = document.querySelector("#country");
    let humidity = response.data.main.humidity;
    let humidityElement = document.querySelector("#humidity");
    let wind = Math.round(response.data.wind.speed);
    let windElement = document.querySelector("#wind");
    let description = response.data.weather[0].description;
    let descriptionElement = document.querySelector("#weather-description");
    descriptionElement.innerHTML = description;
    windElement.innerHTML = `Wind: ${wind} km/h`;
    humidityElement.innerHTML = `Humidity: ${humidity}%`;
    countryElement.innerHTML = country;
    temperatureElement.innerHTML = temperature;
}

function citySearch(event) {
    event.preventDefault();
    let searchInput = document.querySelector("#city-input");

    let city = document.querySelector("#city");
    if (searchInput.value) {
        city.innerHTML = `${searchInput.value}`;
    }
    let apiKey = "dd457ecaa9a81e873abe2de88465eeac";
    let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${searchInput.value}&units=metric&appid=${apiKey}`;
    console.log(apiURL);
    axios.get(apiURL).then(inputWeather);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", citySearch);

//Current Location
function locationWeather(response) {
    console.log(response);
    let temperature = Math.round(response.data.main.temp);
    let temperatureElement = document.querySelector("#current-temp");
    let country = response.data.sys.country;
    let countryElement = document.querySelector("#country");
    let humidity = response.data.main.humidity;
    let humidityElement = document.querySelector("#humidity");
    let wind = Math.round(response.data.wind.speed);
    let windElement = document.querySelector("#wind");
    let description = response.data.weather[0].description;
    let descriptionElement = document.querySelector("#weather-description");
    let city = response.data.name;
    let cityElement = document.querySelector("#city");
    cityElement.innerHTML = city;
    descriptionElement.innerHTML = description;
    windElement.innerHTML = `Wind: ${wind} km/h`;
    humidityElement.innerHTML = `Humidity: ${humidity}%`;
    countryElement.innerHTML = country;
    temperatureElement.innerHTML = temperature;
}

function showPosition(position) {
    let lat = position.coords.latitude;
    let long = position.coords.longitude;
    let apiKey = "dd457ecaa9a81e873abe2de88465eeac";

    let apiURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=metric&appid=${apiKey}`;
    console.log(apiURL);
    axios.get(apiURL).then(locationWeather);
}

function geolocation() {
    navigator.geolocation.getCurrentPosition(showPosition);
}

let currentLocation = document.querySelector("#current-location");
currentLocation.addEventListener("click", geolocation);
