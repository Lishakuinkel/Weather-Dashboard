var apikey = "5f680b22221a07656a0b13bd681475c7";

var cityInput = document.getElementById("city-input");
var searchbtn = document.getElementById("search-btn");

var searchList = document.getElementById("history-btn");

var cityName = document.getElementById("city");
var displayDate = document.getElementById("date");

var fivedaytemp = document.getElementById("temp");
var fivedaywind = document.getElementById("windspeed");
var fivedayhumid = document.getElementById("humid");

var citySearches = [];

currentDate = new Date();
displayDate.innerHTML = currentDate.toLocaleDateString("en-US");


search_history();

searchbtn.addEventListener('click', getCoordinates);

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
            displayWeather(lat, lon);
        });
}

function displayWeather(lat,lon) {

    fetch("https://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&appid=" + apikey)
        .then(function (response) {
            console.log("success");
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            for(var i=0; i<5; i++){
                fivedaytemp.textContent = Number(data.list[i+1].main.temp).toFixed(2);
                fivedaywind.textContent = Number(data.list[i+1].wind.speed).toFixed(2);
                console.log(fivedayhumid.textContent = Number(data.list[i+1].main.humidity).toFixed(2));
            }
            
        });



}



function search_history(){
    citySearches = JSON.parse(localStorage.getItem("citysearches")) || [];
    
    citySearches.push(cityInput.value);
   

    localStorage.setItem("citysearches", JSON.stringify(citySearches)); 

    for (i=0; i<8;i++){
        
        var li = document.createElement('li');
        li.innerHTML = citySearches[i];
        console.log(li);
        
        searchList.appendChild(li);
        
        }
}









