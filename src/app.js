/* CURRENT DATE*/
let now = new Date();

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];
let hours = now.getHours();
let minutes = now.getMinutes();

let currentTime = document.querySelector("#currentTime");

currentTime.innerHTML = `${day}, ${hours}:${minutes}hr.`;

/*CURRENT WEATHER*/

function searchCity(event) {
  let searchInput = document.querySelector("#looking-city");
  let searchValue = searchInput.value.toLowerCase().trim();
  {
    let apiKey = "d9fa039441ee765f866a01bc611a5d61";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchValue}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(showtemperature);

    function showtemperature(response) {
      let temperature = Math.round(response.data.main.temp);
      let currentDegree = document.querySelector("#value-degrees");
      currentDegree.innerHTML = `${temperature}°`;
      let message = document.querySelector("#message");
      if (temperature > 20) {
        message.innerHTML = `Walking day!`;
      } else if (temperature < 5) {
        message.innerHTML = `It is cold!`;
      } else {
        message.innerHTML = `Coffe Day!`;
      }
    }
  }
  {
    event.preventDefault();
    let city = document.querySelector("#city");
    if (searchValue) {
      city.innerHTML = `${searchValue}`;
    } else {
      city.innerHTML = `Don't forget to type a city! `;
    }
  }
}
function position(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(cityName);
  function cityName(response) {
    console.log(response);
    let lat = response.coords.latitude;
    let lon = response.coords.longitude;
    let apiKey = "d9fa039441ee765f866a01bc611a5d61";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(showtemperature);
    let reverseApiUrl = `http://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&appid=${apiKey}&limit=5`;
    axios.get(reverseApiUrl).then(showCityName);

    function showtemperature(response) {
      console.log(response);
      let temperature = Math.round(response.data.main.temp);
      let currentDegree = document.querySelector("#value-degrees");
      currentDegree.innerHTML = `${temperature}°`;
      let message = document.querySelector("#message");
      if (temperature > 20) {
        message.innerHTML = `Walking day!`;
      } else if (temperature < 5) {
        message.innerHTML = `It is cold!`;
      } else {
        message.innerHTML = `Coffe Day!`;
      }
    }
    function showCityName(response) {
      console.log(response);
      let name = response.data[0].name;
      console.log(name);
      let city = document.querySelector("#city");
      city.innerHTML = name;
    }
  }
}

let form = document.querySelector("#search");
form.addEventListener("submit", searchCity);
let localitation = document
  .getElementById("localitation")
  .addEventListener("click", position);

// function changeToCelsius(event) {
//   event.preventDefault();
//   let h1 = document.querySelector("#value-degrees");
//   h1.innerHTML = "21°";
// }

// function changeToFahrenheit(event) {
//   event.preventDefault();
//   let h1 = document.querySelector("#value-degrees");
//   h1.innerHTML = "69°";
// }

// let h1 = document.querySelector("#value-degrees");
// h1.innerHTML = "21°";

// let celsius = document.querySelector("#celsius");
// celsius.addEventListener("click", changeToCelsius);

// let fahrenheit = document.querySelector("#fahrenheit");
// fahrenheit.addEventListener("click", changeToFahrenheit);
