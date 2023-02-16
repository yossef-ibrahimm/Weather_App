const container = document.querySelector(".container");
const search = document.querySelector(".search-box button");
const weatherBox = document.querySelector(".weather-box");
const weatherDetails = document.querySelector(".weather-details");
const error404 = document.querySelector(".not-found");

search.addEventListener("click", () => {
  const APIKey = "185dbcc57e27f9315a49d3f1c762ebd7";
  const city = document.querySelector(".search-box input").value;

  let lang = document.querySelector('input[name="lang"]:checked').value;
  let km = "";
  if (lang === "en") {
    let invalid_location = (document.getElementById(
      "invalid_location"
    ).innerHTML = "invalid location");
    let humiditys = (document.getElementById("humidity").innerHTML =
      "humidity");
    let wind_speed = (document.getElementById("wind_speed").innerHTML =
      "wind speed");
    km = "KM/h";
  } else {
    let invalid_location = (document.getElementById(
      "invalid_location"
    ).innerHTML = "مكان خطأ");
    let humiditys = (document.getElementById("humidity").innerHTML = "رطوبة");
    let wind_speed = (document.getElementById("wind_speed").innerHTML =
      "سرعه الرياح");
    km = "كم/الساعه";
  }

  if (city === "") return;

  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&lang=${lang}&appid=${APIKey}`
  )
    .then((response) => response.json())
    .then((json) => {
      if (json.cod === "404") {
        container.style.height = "400px";
        weatherBox.style.display = "none";
        weatherDetails.style.display = "none";
        error404.style.display = "block";
        error404.classList.add("fadeIn");

        return;
      }

      error404.style.display = "none";
      error404.classList.remove("fadeIn");

      const image = document.querySelector(".weather-box img");
      const temperature = document.querySelector(".weather-box .temperature");
      const description = document.querySelector(".weather-box .description");
      const humidity = document.querySelector(
        ".weather-details .humidity span"
      );
      const wind = document.querySelector(".weather-details .wind span");

      switch (json.weather[0].main) {
        case "Clear":
          image.src = "images/clear.png";
          break;
        case "Mist":
          image.src = "images/mist.png";
          break;
        case "Rain":
          image.src = "images/rain.png";
          break;

        case "Snow":
          image.src = "images/snow.png";
          break;

        case "Clouds":
          image.src = "images/cloud.png";
          break;

        case "Haze":
          image.src = "images/mist.png";
          break;

        default:
          image.src = "";
      }

      temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
      description.innerHTML = `${json.weather[0].description}`;
      humidity.innerHTML = `${json.main.humidity}%`;
      wind.innerHTML = `${parseInt(json.wind.speed)}${km}`;

      weatherBox.style.display = "";
      weatherDetails.style.display = "";
      weatherBox.classList.add("fadeIn");
      weatherDetails.classList.add("fadeIn");

      container.style.height = "590px";
    });
});
