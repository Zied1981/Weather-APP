let output = document.querySelector(".output");
let tableInfo = document.querySelector(".tableinfo");
console.log(output);
const API_key = "47535d7b3bea3486960efb7de6cf3ff3";
fetch(
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
  .catch((error) => console.log("fehler im hauptfetch", error));
/* 
const fetchweather = () => {
  const textInput = document.querySelector("#city").value;
  console.log(textInput);
}; */
