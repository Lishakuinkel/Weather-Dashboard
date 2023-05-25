

var apikey = "5f680b22221a07656a0b13bd681475c7";

var cityInput = document.getElementById("city-input");
var searchbtn = document.getElementById("search-btn");

var cityName = document.getElementById("city");
var displayDate = document.getElementById("date");


var citySearches = [];

currentDate = new Date();
displayDate.innerHTML = currentDate.toLocaleDateString("en-US");

search_history();

searchbtn.addEventListener('click', function () {
    getCoordinates();
    search_history();
});

function getCoordinates() {
    //Fetch geo-coordinates api//   
    let lat;
    let lon;

    cityName.textContent = cityInput.value;

    fetch("http://api.openweathermap.org/geo/1.0/direct?q=" + cityInput.value + "&limit=1&appid=" + apikey)
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

function renderItems(data) {

    var temperature = data.list[0].main.temp;

    document.getElementById("temp").innerHTML = Number(((temperature - 273.15) * 1.8) + 32).toFixed(2);

    document.getElementById("wind").innerHTML = Number(data.list[0].wind.speed).toFixed(2);

    document.getElementById("humidity").innerHTML = Number(data.list[0].main.humidity).toFixed(2);

    for (i = 1; i < 6; i++) {

        var temperature = data.list[i + 1].main.temp;

        document.getElementById("temp" + i).innerHTML = Number(((temperature - 273.15) * 1.8) + 32).toFixed(2);

        document.getElementById("windspeed" + i).innerHTML = Number(data.list[i].wind.speed).toFixed(2);

        document.getElementById("humid" + i).innerHTML = Number(data.list[i].main.humidity).toFixed(2);

        document.getElementById("img" + i).src = "https://openweathermap.org/img/wn/" + data.list[i].weather[0].icon + ".png";

    }

}

function search_history() {

    citySearches = JSON.parse(localStorage.getItem("citysearches")) || [];

    if (!citySearches.includes(cityInput.value)){
        citySearches.push(cityInput.value);
    }

    localStorage.setItem("citysearches", JSON.stringify(citySearches));

    for (i = 0; i < citySearches.length; i++) {

        var historyBtn = document.createElement("button");
        historyBtn.id = 'historybtn';
        historyBtn.textContent = citySearches[i];
        document.body.appendChild(historyBtn);
        

    }
}








