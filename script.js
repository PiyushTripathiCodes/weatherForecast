const inputElement = document.querySelector(".input");
const mainIcon = document.querySelectorAll(".icon");
const temperature = document.querySelector(".degree");
const weatherDetail = document.querySelector(".Weather");
const humidPercent = document.querySelector(".humidity-percentage");
const windSpeed = document.querySelector(".wind-speed");
const cardIcon = document.querySelectorAll(".data-card-icon");
const pops = document.querySelectorAll(".pop");
const timeDateElement = document.querySelector(".time-date");
const day2 = document.querySelector(".day-2");
const day3 = document.querySelector(".day-3");
const day4 = document.querySelector(".day-4");
const searchButton = document.querySelector(".btn");
const cityName = document.querySelector(".City-display");
let flag = 0;
const months = [
  "January",
  "Febuary",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

let dayFull = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

////////////////////////////////////////////////

//this function render sec1
const renderSec1 = function (data) {
  //temperature
  const temp = (data.main.temp - 273.15).toFixed(0);
  temperature.textContent = temp;
  //weather detail
  const weatherCondition = data.weather[0].description;
  weatherDetail.textContent = weatherCondition;
  //humidity
  const humidData = data.main.humidity;
  humidPercent.textContent = humidData;
  //wind Speed
  const speedOfWind = (data.wind.speed * 3.6).toFixed(0);
  windSpeed.textContent = speedOfWind;
  //main icon
  let iconId = data.weather[0].icon;
  // let iconUrl = `https://openweathermap.org/img/wn/${iconId}@2x.png`;
  let iconUrl = `img/${iconId}.png`;
  mainIcon.forEach((icon) => (icon.src = iconUrl));
};

//----------------------------------------------------------------------
//this function render section2
const renderSec2 = function (forecast) {
  const precipitation = [];
  const sideIconId = [];
  for (let i = 0; i < forecast.length - 8; i += 8) {
    //precitation
    const pop = (forecast[i].pop * 100).toFixed(0);
    precipitation.push(pop);
    //side icon
    const sideIcon = forecast[i].weather[0].icon;
    sideIconId.push(sideIcon);
  }
  //display pop
  pops.forEach((ele, i) => (ele.textContent = precipitation[i]));
  //display card icons
  cardIcon.forEach(
    (ele, i) => (ele.src = `img/${sideIconId[i]}.png`)
    // ele.src = `https://openweathermap.org/img/wn/${sideIconId[i]}@2x.png`
  );
};

//--------------------------------------------------------------
//checkWeather function

const checkWeather = async function (city) {
  const api_key = "07f0573a7a7260e2d65fc8cf307eebe0";

  try {
    //main weather fetch
    const weatherData = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`
    );
    //handling error
    if (!weatherData.ok) throw new Error("Problem getting city");
    const data = await weatherData.json();
    //section1 render data
    renderSec1(data);
    //weather forecast fetch
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${api_key}`
    );
    //handling error
    if (!res.ok) throw new Error("Problem getting city");
    const data1 = await res.json();
    const forecast = data1.list;
    //section2 render data
    renderSec2(forecast);
    //render city
    cityName.textContent = String("💁🏻‍♂️" + city).toUpperCase();
  } catch (err) {
    alert(`Enter valid city name 🎃🎃...
Error Code: ${err}🎃🎃...`);
  }
};

//-----------------------------------------------------
//get the city from input when hit enter

const getCityWeather = function () {
  inputElement.addEventListener("keydown", function (e) {
    if (e.key == "Enter") {
      flag++;
      const city = inputElement.value;
      if (city == "") {
        alert("Enter valid city name 🎃🎃");
      } else {
        checkWeather(city);

        inputElement.blur();
      }
    }
  });
};
getCityWeather();

//get city from search btn
const getCityWeatherFrombtn = function () {
  searchButton.addEventListener("click", () => {
    const city = inputElement.value;
    if (city == "") {
      alert("Enter valid city name 🎃🎃");
    } else {
      checkWeather(city);

      inputElement.blur();
    }
  });
};
getCityWeatherFrombtn();

//---------------------------------------------------------------

//get weather from geolocation api
const geoLoc = function () {
  window.addEventListener("load", function () {
    const Browserlocation = navigator.geolocation.getCurrentPosition(
      (position) => {
        flag++;
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        whereAmI(lat, lon);
      },
      () => console.log("location not provided")
    );
  });

  const whereAmI = async function (lat, lang) {
    const res = await fetch(
      `https://geocode.maps.co/reverse?lat=${lat}&lon=${lang}`
    );
    const data = await res.json();
    const city = data.address.state_district;
    checkWeather(city);
  };
};
geoLoc();
///////////////////////////
//default//
if (flag == 0) {
  checkWeather("Delhi");
}

/////////////////////time and date////////////////////////////////

setInterval(() => {
  const time = new Date();
  const month = time.getMonth();
  const date = time.getDate();
  const day = time.getDay();
  const hour = time.getHours();
  const hourIn12Format = hour >= 13 ? hour % 12 : hour;
  const minutes = String(time.getMinutes()).padStart(2, "0");
  const ampm = hour >= 12 ? "PM" : "AM";

  timeDateElement.innerHTML = `${hourIn12Format}:${minutes} ${ampm}, ${dayFull[day]}, ${months[month]} ${date}`;

  const date2 = new Date();
  const tomorrow = new Date(date2);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const month1 = tomorrow.getMonth();
  const dateI = tomorrow.getDate();

  const dayAftertomorrow = new Date(date2);
  dayAftertomorrow.setDate(dayAftertomorrow.getDate() + 2);
  const month2 = dayAftertomorrow.getMonth();
  const dateII = dayAftertomorrow.getDate();

  const DaydayAftertomorrow = new Date(date2);
  DaydayAftertomorrow.setDate(DaydayAftertomorrow.getDate() + 3);
  const month3 = DaydayAftertomorrow.getMonth();
  const dateIII = DaydayAftertomorrow.getDate();

  day2.innerHTML = `${months[month1]} ${dateI}`;
  day3.innerHTML = `${months[month2]} ${dateII}`;
  day4.innerHTML = `${months[month3]} ${dateIII}`;
}, 1000);

///////////////////////////////////////////////////////////////////////
