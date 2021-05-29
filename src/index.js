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

//Search Engine Location

function inputWeather(response) {
    celsiusTemp = response.data.main.temp;

    let city = response.data.name;
    let cityElement = document.querySelector("#city");
    let temperature = Math.round(celsiusTemp);
    let temperatureElement = document.querySelector("#current-temp");
    let country = response.data.sys.country;
    let countryElement = document.querySelector("#country");
    let humidity = response.data.main.humidity;
    let humidityElement = document.querySelector("#humidity");
    let wind = Math.round(response.data.wind.speed);
    let windElement = document.querySelector("#wind");
    let description = response.data.weather[0].description;
    let descriptionElement = document.querySelector("#weather-description");

    cityElement.innerHTML = city;
    descriptionElement.innerHTML = description;
    windElement.innerHTML = `Wind: ${wind} km/h`;
    humidityElement.innerHTML = `Humidity: ${humidity}%`;
    countryElement.innerHTML = country;
    temperatureElement.innerHTML = temperature;
}

function citySearch(city) {
    let apiKey = "dd457ecaa9a81e873abe2de88465eeac";
    let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
    axios.get(apiURL).then(inputWeather);
}

function handleSubmit(event) {
    event.preventDefault();
    let searchInput = document.querySelector("#city-input");
    citySearch(searchInput.value);
}

//Fahrenheit Conversion

function displayFahrenheitTemp(event) {
    event.preventDefault();
    let tempElement = document.querySelector("#current-temp");
    celsiusLink.classList.remove("active");
    fahrenheitLink.classList.add("active");
    let fahrenheitTemp = (celsiusTemp * 9) / 5 + 32;
    tempElement.innerHTML = Math.round(fahrenheitTemp);
}

//Celsius Conversion
function displayCelsiusTemp(event) {
    event.preventDefault();
    let tempElement = document.querySelector("#current-temp");
    celsiusLink.classList.add("active");
    fahrenheitLink.classList.remove("active");
    tempElement.innerHTML = Math.round(celsiusTemp);
}

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

//Global variable
let celsiusTemp = null;

let now = new Date();
let liDate = document.querySelector("#date");

liDate.innerHTML = formatDate(now);

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemp);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemp);

let currentLocation = document.querySelector("#current-location");
currentLocation.addEventListener("click", geolocation);

//Default city
citySearch("Munich");
