
var apikey = "5f680b22221a07656a0b13bd681475c7";

var cityInput = document.getElementById("city-input");
var searchbtn = document.getElementById("search-btn");

var cityName = document.getElementById("city");
var displayDate = document.getElementById("date");

var historyContainer = document.getElementById("history-container");

var citySearches = [];

currentDate = new Date();
displayDate.innerHTML = currentDate.toLocaleDateString("en-US");

var search;

load_history();

searchbtn.addEventListener('click', function () {
    cityName.textContent = cityInput.value;
    getCoordinates(cityInput.value);
    search_history();
    load_history();
});

function getCoordinates(search) {
    //Fetch geo-coordinates api for lat and lon values according to city name 
    let lat;
    let lon;

    fetch("https://api.openweathermap.org/geo/1.0/direct?q=" + search + "&limit=1&appid=" + apikey)
        .then(function (response) {
            console.log("success");
            return response.json();

        })
        .then(function (data) {
            console.log(data);
            lat = data[0].lat;
            lon = data[0].lon;
            fetchWeather(lat, lon);
        });
}

function fetchWeather(lat, lon) {
    //fetch openweather api for weather conditions

    fetch("https://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&appid=" + apikey)
        .then(function (response) {
            console.log("success");
            return response.json();
        })
        .then(function (data) {
            console.log(data);

            renderItems(data);

        });

}

//render items from api response data 
function renderItems(data) {

    var temperature = data.list[0].main.temp;

    document.getElementById("temp").innerHTML = Number(((temperature - 273.15) * 1.8) + 32).toFixed(2);

    document.getElementById("wind").innerHTML = Number(data.list[0].wind.speed).toFixed(2);

    document.getElementById("humidity").innerHTML = Number(data.list[0].main.humidity).toFixed(2);

    document.getElementById("weather-icon").src = "https://openweathermap.org/img/wn/" + data.list[0].weather[0].icon + ".png";

    for (var i = 0; i < 5; i++) {
        var n = (i * 8) + 1; //since the api response provides data for each 3 hours, came up with this formula for retrieving data for future dates instead

        var temperature = data.list[n].main.temp;

        //dynamically updating corresponding html elements with rendered api data

        document.getElementById("temp" + (i + 1)).innerHTML = Number(((temperature - 273.15) * 1.8) + 32).toFixed(2);

        document.getElementById("windspeed" + (i + 1)).innerHTML = Number(data.list[n].wind.speed).toFixed(2);

        document.getElementById("humid" + (i + 1)).innerHTML = Number(data.list[n].main.humidity).toFixed(2);

        document.getElementById("img" + (i + 1)).src = "https://openweathermap.org/img/wn/" + data.list[n].weather[0].icon + ".png";

        document.getElementById("date" + (i + 1)).innerHTML = data.list[n].dt_txt.slice(0, 10);
    }

}

function search_history() {

    citySearches = JSON.parse(localStorage.getItem("citysearches")) || [];

    if (!citySearches.includes(cityInput.value)) {
        citySearches.push(cityInput.value);
    }

    localStorage.setItem("citysearches", JSON.stringify(citySearches)); //setting up local storage to store the history


}

// grabbing the values from local storage and dynamically creating buttons for each search results
function load_history() {
    citySearches = JSON.parse(localStorage.getItem("citysearches")) || [];

    document.getElementById('history-container').innerHTML = "";

    for (i = 0; i < citySearches.length; i++) {
        console.log(citySearches[i]);
        var historyBtn = document.createElement("button");
        historyBtn.id = 'historybtn';
        historyBtn.textContent = citySearches[i];
        historyContainer.appendChild(historyBtn);

        historyContainer.addEventListener('click', handleSearchbutton);
    }
}

//checking whether search results are being clicked instead of search button
function handleSearchbutton(e) {
    if (!e.target.matches('#historybtn')) {
        return;
    }

    var btn = e.target;
    console.log(btn.innerHTML);

    cityName.textContent = btn.innerHTML;
    getCoordinates(btn.innerHTML); //if search history button is clicked then pass it's value to the function to display weather data accordingly
}



