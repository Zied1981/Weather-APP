let output = document.querySelector(".output");
let tableInfo = document.querySelector(".tableinfo");
let checkBtn = document.querySelector("#check-weather");
console.log(output);
const API_key = "47535d7b3bea3486960efb7de6cf3ff3";
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
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=47535d7b3bea3486960efb7de6cf3ff3&units=metric&lang=de`
      )
        .then((response) => response.json())
        .then((nowWeatherData) => {
          console.log(nowWeatherData);

          let date = new Date().toLocaleTimeString();
          console.log(date);

          output.innerHTML += `<h3> Weather in : ${textInput.toUpperCase()}.</h3>
          <p>${nowWeatherData.sys.country} </p> 
          <p>${nowWeatherData.weather[0].icon}<P>
          <p>${nowWeatherData.main.temp}</p>
          <p>${nowWeatherData.weather[0].description}<P>
          `;

          tableInfo.innerHTML += `<p>local Time :  ${date} </p>
          <p>WindSpeed: ${nowWeatherData.wind.speed}</p>
          <p>Cloudiness: ${nowWeatherData.weather[0].description}</p>
          <p>Pressure: ${nowWeatherData.main.pressure}  hpa </p>
          `;
        });
    });
};
