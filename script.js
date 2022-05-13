const apikey = "129a9c413df34a820810998372aa670c";

const main = document.getElementById("main");
const form = document.getElementById("form");
const search = document.getElementById("search");
const left = document.getElementById("left");
const right = document.getElementById("right");

const url = (city) =>
  `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`;

async function getWeatherByLocation(city) {
  const resp = await fetch(url(city), { origin: "cors" });
  const respData = await resp.json();

  console.log(respData);

  addWeatherToPage(respData, city);
  addtemp(respData);
  addstate(respData);
}

function addWeatherToPage(data, city) {
  const temp = KtoC(data.main.temp);

  const weather = document.createElement("div");
  weather.classList.add("weather");

  weather.innerHTML = `
        <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" /><img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" />
        <br>
        <small>${city}</small>
    `;

  // cleanup
  main.innerHTML = "";

  main.appendChild(weather);
}

function addtemp(data) {
  const temp = KtoC(data.main.temp);

  const weather = document.createElement("div");
  //   weather.classList.add("weather");

  weather.innerHTML = `
        <h1>${temp}°C </h1>
            `;

  // cleanup
  left.innerHTML = "";

  left.appendChild(weather);
}

function addstate(data) {
  const weather = document.createElement("state");
  weather.classList.add("status");

  weather.innerHTML = `
        <small id="status">${data.weather[0].description}</small>
         <form id="form">
                <input type="text" id="search" placeholder="Search by location" autocomplete="off" />
            </form>
            `;

  // cleanup
  right.innerHTML = "";

  right.appendChild(weather);
}

function KtoC(K) {
  return Math.floor(K - 273.15);
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const city = search.value;

  if (city) {
    getWeatherByLocation(city);
  }
});
