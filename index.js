let btn = document.getElementById("btn");
let ciudad = document.getElementById("ciudad");
let inp = document.getElementById("inp");
let tiempo = document.getElementById("tiempo");
let descripcion = document.getElementById("descripcion");
let temperatura = document.getElementById("temperatura");
let temperaturaMin = document.getElementById("temperaturaMin");
let sensacionTermica = document.getElementById("sensacionTermica");
let divIcono = document.getElementById("div-icono");
let alert1 = document.getElementById("alert1");
let alert2 = document.getElementById("alert2");

const urlGetWeather = "http://api.openweathermap.org/data/2.5/weather";

const api_key = "151449b891e05e554faf05b764accced";

// https://openweathermap.org/price

const mostrarWeather = async function (query) {
  try {
    let resultado = await fetch(
      `${urlGetWeather}?q=${query}&appid=${api_key}&units=metric`
    );
    if (resultado.status === 200) {
      let resultadoJs = await resultado.json();
      await agregarContenido(resultadoJs);
    } else {
      mostrarCiudadInexistente();
    }
  } catch (error) {
    // console.log(error);
  }
};

const urlIconoClima = "http://openweathermap.org/img/wn/";
//const icons = "http://openweathermap.org/img/wn/10d@2x.png";

const getIconoClimaUrl = async function (weatherId) {
  try {
    let resul = await fetch(`${urlIconoClima}${weatherId}.png`);
    //let resultadoJson = await resul.json();
    console.log(resul);
    return resul.url;
  } catch (error) {
    console.log(error);
  }
};

async function agregarContenido(resultadoJs) {
  console.log(resultadoJs);
  ciudad.innerHTML = `${resultadoJs.name}, ${resultadoJs.sys.country}`;
  tiempo.innerHTML = `${resultadoJs.weather[0].main}`;
  descripcion.innerHTML = `${resultadoJs.weather[0].description}.`;
  temperatura.innerHTML = `temp: ${resultadoJs.main.temp}°C`;
  temperaturaMin.innerHTML = `min: ${resultadoJs.main.temp_min}°C`;
  sensacionTermica.innerHTML = `sensación térmica: ${resultadoJs.main.feels_like}°C`;
  divIcono.innerHTML = ` <img 'id='' src='${await getIconoClimaUrl(resultadoJs.weather[0].icon)}'>`
  ;
}

btn.addEventListener("click", function () {
  if (inp.value != "") {
    mostrarWeather(inp.value);
  } else {
    mostrarInputVacio();
  }
  inp.value = "";
});

//Url a tostify para mostrar carteles de alert por un determinado tiempo.
//https://github.com/apvarun/toastify-js/blob/master/README.md
function mostrarInputVacio() {
  Toastify({
    text: "ingrese una ciudad",
    duration: 6000,
  }).showToast();
}

function mostrarCiudadInexistente() {
  Toastify({
    text: "ciudad no encontrada",
    duration: 6000,
  }).showToast();
}
