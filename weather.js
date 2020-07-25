const weather = document.querySelector(".js-weather");

const API_KEY = "51f6fb2b7b1fb70cefaf87a8bb5a9b53";
//source : https://openweathermap.org/api

const COORDS = "coords";

function getWeather(lat, lng) {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (json) {
      //console.log(json);
      const temperature = json.main.temp;
      const place = json.name;
      weather.innerText = `${Math.ceil(temperature)}º, ${place}`;
    });
  //.then의 역할 - 데이터가 완전히 들어온 다음 호출
}

function saveCoords(coordsObj) {
  localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

function handleGeoSuccess(position) {
  const latitude = position.coords.latitude;
  //위도
  const longitude = position.coords.longitude;
  //경도
  const coordsObj = {
    latitude,
    longitude,
    //latitude: latitude,
    //longitude: longitude,
    //객체에 변수의 이름과 객체의 key의 이름을 같게 저장할 때에는 한번만 기입해도 됨.
  };
  //console.log(coordsObj);
  saveCoords(coordsObj);
  getWeather(latitude, longitude);
}

function handleGeoError() {
  console.log("Can't access your location");
}

function askForCoords() {
  navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError);
  //getCurrentPosition은 두 개의 requirement이 있음.
  //
}

function loadCoords() {
  const loadedCoords = localStorage.getItem(COORDS);
  if (loadedCoords === null) {
    askForCoords();
    //좌표를 요청.
  } else {
    const parseCoords = JSON.parse(loadedCoords);
    //console.log(parseCoords);
    getWeather(parseCoords.latitude, parseCoords.longitude);
  }
}

function init() {
  loadCoords();
}
init();
