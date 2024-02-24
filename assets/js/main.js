let output = document.querySelector(".output");
let tableInfo = document.querySelector(".tableinfo");
let checkBtn = document.querySelector("#check-weather");
let cityOutput = document.querySelector(".cityoutput");

console.log(output);
console.log(tableInfo);
console.log(checkBtn);
console.log(cityOutput);

const api_key = "47535d7b3bea3486960efb7de6cf3ff3";
/* fetch(
  `https://api.openweathermap.org/data/2.5/weather?lat=52.520008&lon=13.404954&appid=47535d7b3bea3486960efb7de6cf3ff3&units=metric&lang=de`
)
  .then((response) => response.json())
  .then((newArray) => {
    console.log(newArray);
    let date = new Date().toLocaleTimeString();
    console.log(date);

    output.innerHTML += `<h3> Weather in Berlin </h3>
        <p>${newArray.sys.country} </p> 
        <p>${newArray.weather[0].icon}<P>
        <p>${newArray.main.temp}</p>
        <p>${newArray.weather[0].description}<P>
        `;

    tableInfo.innerHTML += `<p>local Time :  ${date} </p>
        <p>WindSpeed: ${newArray.wind.speed}</p>
        <p>Cloudiness: ${newArray.weather[0].description}</p>
        <p>Pressure: ${newArray.main.pressure}  hpa </p>
        
        
        
        
        
        `;
  })
  .catch((error) => console.log("fehler im hauptfetch", error)); */

const fetchweather = (event) => {
  event.preventDefault();
  output.innerHTML = "";
  tableInfo.innerHTML = "";

  const textInput = document.querySelector("#city").value;
  console.log(textInput);
  if (textInput.length <= 0) {
    console.log("error");
    cityOutput.innerHTML = `<h3>Please give a City name!</h3>`;
    return;
  }

  fetch(
    `http://api.openweathermap.org/geo/1.0/direct?q=${textInput}&limit=50&appid=47535d7b3bea3486960efb7de6cf3ff3`
  )
    .then((response) => response.json())
    .then((newData) => {
      console.log(newData);
      console.log(newData[0]);
      let lat = newData[0].lat;
      let lon = newData[0].lon;
      console.log(lat);
      console.log(lon);

      //fetch nummer2//

      fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=47535d7b3bea3486960efb7de6cf3ff3&units=metric&lang=en`
      )
        .then((response) => response.json())
        .then((nowWeatherData) => {
          console.log(nowWeatherData);

          let sunrisemilis = nowWeatherData.sys.sunrise;
          let sunrise = new Date(
            (sunrisemilis + nowWeatherData.timezone) * 1000
          );
          console.log(sunrise);

          let sunriseHour = sunrise.getUTCHours();
          console.log(sunriseHour);
          let sunriseMin = sunrise.getUTCMinutes();
          console.log(sunriseMin);

          let sunsetemilis = nowWeatherData.sys.sunset;
          let sunset = new Date(
            (sunsetemilis + nowWeatherData.timezone) * 1000
          );

          console.log(sunset);
          let sunsetHour = sunset.getUTCHours();
          console.log(sunsetHour);

          let sunsetMin = sunset.getUTCMinutes();
          console.log(sunsetMin);

          let sunriseFinal = sunriseMin < 10 ? `0${sunriseMin}` : sunriseMin;
          console.log(sunriseFinal);

          let sunsetFinal = sunsetMin < 10 ? `0${sunsetMin}` : sunsetMin;
          console.log(sunsetFinal);

          let timezone = nowWeatherData.timezone;
          console.log(timezone);

          let iconVar = `https://openweathermap.org/img/wn/`;

          console.log(nowWeatherData.weather[0].icon);

          let temperaturefinal = Math.ceil(nowWeatherData.main.temp);
          console.log(temperaturefinal);

          /*    let date = new Date().toLocaleTimeString(); */

          let dt = new Date(
            (nowWeatherData.dt + nowWeatherData.timezone) * 1000
          );
          console.log(dt);

          /* let dt2 = dt.slice(-48, -40);
          console.log(dt2); */

          let localStd =
            dt.getUTCHours() - 1 < 10
              ? `0${dt.getUTCHours()}`
              : dt.getUTCHours();
          let localMin =
            dt.getUTCMinutes() < 10
              ? `0${dt.getUTCMinutes()}`
              : dt.getUTCMinutes();
          let localSek =
            dt.getUTCSeconds() < 10
              ? `0${dt.getUTCSeconds()}`
              : dt.getUTCSeconds();
          console.log(localStd);
          console.log(localMin);
          console.log(localSek);

          cityOutput.innerHTML = `<h3> Weather in ${textInput.toUpperCase()} (${
            nowWeatherData.sys.country
          }) </h3>`;
          cityOutput.innerHTML += `<p class="icon"><img src="${iconVar}${nowWeatherData.weather[0].icon}@2x.png"><P>`;
          cityOutput.innerHTML += `<p class="temp">${temperaturefinal}°C</p>`;
          cityOutput.innerHTML += `<p class="description">${nowWeatherData.weather[0].description}</p>`;

          output.innerHTML += `<ul class="top">
                <li class="time"> local time: ${localStd}:${localMin}:${localSek}</li>
                <li class="sunrise"> sunrise: 0${sunriseHour}:${sunriseFinal}</li>
                <li class="sunset"> sunset: ${sunsetHour}:${sunsetFinal}</li>
            </ul>`;

          tableInfo.innerHTML += `<ul class="bottom">
                <li class="wind"> windspeed: ${nowWeatherData.wind.speed} km/h </li>
                <li class="wind"> humidity: ${nowWeatherData.main.humidity}% </li>
                 <li class="pressure"> pressure: ${nowWeatherData.main.pressure} hpa</li>
            </ul>`;
        })
        .catch((error) => console.log("fehler im innenfetch", error));
    })
    .catch((error) => console.log("fehler im hauptfetch", error));
};
