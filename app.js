var button = document.querySelector('.button')
var searchBox = document.querySelector('.search-box')
var btn = document.getElementById('btn')

btn.onclick = () => {
    document.getElementById('msg-box').classList.add('active');
    document.getElementById('app-wrap').classList.remove('active');
}

button.addEventListener('click' , function(e){
    e.preventDefault();
    getResult(searchBox.value);
})

searchBox.addEventListener('keypress' , setQuery);
function setQuery(evt) {
    if (evt.keyCode == 13) {
        getResult(searchBox.value);
    }
}

function getResult(city) {
    if(city.length == 0){
        document.getElementById('msg-box').classList.remove('active');
        document.getElementById('app-wrap').classList.add('active');
    } 
    else {
        fetch('https://api.openweathermap.org/data/2.5/weather?q='+city+
    '&appid=dc175459d9777731997433c27811ba75&units=metric')
    .then(weather => {
        return weather.json();
    }).then(displayResult);

    searchBox.value = "";
    }
}

function displayResult(weather) {
    searchBox.innerHTML="";
    if (weather.cod == 404) {
        alert("City not found");
    }
    
    document.getElementById('app-wrap').classList.remove('active');
    var location = document.querySelector('.city');
    location.innerHTML = weather.name +', '+ weather.sys.country;

    var temps = document.querySelector('.temp');
    temps.innerHTML = Math.round(weather.main.temp) + '°C';

    var hiLow = document.querySelector('.hi-low');
    hiLow.innerHTML = Math.round(weather.main.temp_min) + '°C / ' + Math.round(weather.main.temp_max) + '°C'

    var pricip = document.querySelector('.pricip');
    pricip.innerHTML = weather['weather'][0]['main'];

    var humidity = document.querySelector('.humidity');
    humidity.innerHTML = weather.main.humidity + '%';

    var pressure = document.querySelector('.pressure');
    pressure.innerHTML = weather.main.pressure;

    var wind = document.querySelector('.wind');
    wind.innerHTML = weather.wind.speed + 'km/hr';

    var iconEl = weather['weather'][0]['icon'];
    document.getElementById('icon-img').src = 'img/icon/'+iconEl+'.png'

    var condition = weather['weather'][0]['id'];
    console.log(condition);

    var main = document.querySelector('.main')

    if(condition == 800) {
        main.style.backgroundImage = "url('background/clear.jpg')";
    }
    else if (condition > 800) {
        main.style.backgroundImage = "url('background/cloud.jpg')";
    }
    else if (condition > 700 && condition < 800) {
        main.style.backgroundImage = "url('background/fod.jpg')";
    }
    else if (condition > 600 && condition < 700) {
        main.style.backgroundImage = "url('background/snow.jpg')";
    }
    else if (condition >= 500 && condition < 600) {
        main.style.backgroundImage = "url('background/rain.jpg')";
    }
    else if (condition > 300 && condition < 500) {
        main.style.backgroundImage = "url('background/drizzle.jpg')";
    }
    else {
        main.style.backgroundImage = "url('background/thunder.jpg')";
    }

    let now = new Date();
    let date = document.querySelector('.date');
    date.innerHTML = currentData(now);
}

function currentData (d) {
    let months = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"]

    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thrusday", "Friday", "Saturday"]

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();
    
    return `${day} ${date} ${month} ${year}`
}

 window.onload = () => {
    navigator.geolocation.getCurrentPosition(gotLocation, failedToGet);
}

function gotLocation(position) {
    
     fetch('https://api.openweathermap.org/data/2.5/weather?lat='+position.coords.latitude+'&lon='+position.coords.longitude+
     '&appid=dc175459d9777731997433c27811ba75&units=metric')
     .then(weather => {
         return weather.json();
     }).then(displayResult);
 }

 function failedToGet() {
    alert("Failed to get your location");
 }