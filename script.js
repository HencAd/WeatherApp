const app= {
    key: "d9335534016bc75283eb3f9ddc8070a5",
    base: "https://api.openweathermap.org/data/2.5/"
}


function searchCity (searchTerm) {
    fetch (`${app.base}weather?q=${searchTerm}&units=metric&APPID=${app.key}&lang=pl`)
    .then(result => { return result.json()})
    .then(result => { init(result)})
}
document.getElementById('searchButton').addEventListener('click',() =>{
    let searchTerm = document.getElementById('searchInput').value;
    searchCity(searchTerm);
})

function init (resultFromServer) {
  switch (resultFromServer.weather[0].main) {
      case 'Clear':
          document.body.style.backgroundImage = 'url("clear.jpg")';
      break;
      case 'Rain':
      case 'Drizzle':
      case 'Mist':
        document.body.style.backgroundImage = 'url("rain.jpg")';
      break;  
      case 'Clouds':
        document.body.style.backgroundImage = 'url("cloudy.jpg")';
      break;  
      case 'Thunderstorm':
        document.body.style.backgroundImage = 'url("storm.jpg")';
      break;
      case 'Snow':
        document.body.style.backgroundImage = 'url("snow.jpg")';
      break;  
      default:
        break;
  }
  let city = document.querySelector('.city');
  city.innerHTML=`${resultFromServer.name},${resultFromServer.sys.country}`;
  
  let now=new Date();
  let date=document.querySelector('.date');
  date.innerHTML= dateBuilder(now);

  let temp = document.querySelector('.temp');
  temp.innerHTML=`${Math.round(resultFromServer.main.temp)}<span>°C</span>`

  let weatherHeader = document.querySelector('.weatherHeader');
  weatherHeader.innerHTML=resultFromServer.weather[0].description;

  let weatherIcon = document.getElementById('iconW');

  let windSpeed = document.querySelector('.windSpeed');
  windSpeed.innerHTML=`Prędkość wiatru: ${Math.floor(resultFromServer.wind.speed)} m/s`;

  let humidity = document.querySelector('.humidity');
  humidity.innerHTML=`Wilogotność: ${resultFromServer.main.humidity}%`;

  
  weatherIcon.src=' http://openweathermap.org/img/wn/'+ resultFromServer.weather[0].icon + '.png';
}

function dateBuilder (d) {
    let months = ["Styczeń", "Luty","Marzec","Kwiecień","Maj","Czerwiec", "Lipiec","Sierpień","Wrzesień","Październik","Listopad","Grudzień"];
    let days = ["Niedziela", "Poniedziałek", "Wtorek", "Środa","Czwartek","Piatek","Sobota"];

    let day=days[d.getDay()];
    let date=d.getDate();
    let month=months[d.getMonth()];
    let year=d.getFullYear();

    return `${day}, ${date} ${month} ${year}`;
}

