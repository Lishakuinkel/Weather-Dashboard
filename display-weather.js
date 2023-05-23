var apikey = "5f680b22221a07656a0b13bd681475c7";

var cityInput = document.getElementById("city-input");
var searchbtn = document.getElementById("search-btn");

var citysearches = [];



searchbtn.addEventListener('click', getCoordinates);

function getCoordinates() {
    //Fetch geo-coordinates api//   
    let lat;
    let lon;
    
    
    var history = JSON.parse(localStorage.getItem("citysearches")) || [];
    
    history.push({"citysearches":"cityInput.value"});
   

    localStorage.setItem("citysearches", JSON.stringify(cityInput.value)); 

    


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


            }
        });

}













