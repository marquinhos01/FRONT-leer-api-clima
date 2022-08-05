const container = document.querySelector(".container");
const resultado = document.querySelector("#resultado");
const formulario = document.querySelector("#formulario");

window.addEventListener("load", () => {
    formulario.addEventListener("submit", buscarClima);

})
function buscarClima(e) {
    e.preventDefault();


    var ciudad = document.querySelector("#ciudad").value;
    var pais = document.querySelector("#pais").value;
    // console.log(ciudad, pais);
    if (ciudad === "" || pais === "") {
        //Hubo un error
        mostrarError("Ambos campos son obligatorios");
        return;
    }
    // Consultar la api
    consultarAPI(ciudad, pais);

}
function consultarAPI(ciudad, pais) {
    const appID = "fecf2224fcbd92dcef3e233736be1290";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appID}`;
    console.log(url);

    Spinner();

    fetch(url).then(resp => resp.json()).then(data => {
        limpiarHtml(); //Limpia el html
        if (data.cod === "404") {
            mostrarError("Ciudad no encontrada")
            return;
        }
        mostrarClima(data);
    });
}
function mostrarClima(datos) {
    const { name, main: { temp, temp_max, temp_min } } = datos;
    const centigrados = kelvinACentigrados(temp);
    const max = kelvinACentigrados(temp_max);
    const min = kelvinACentigrados(temp_min);
    const nombreCiudad = document.createElement("p");
    nombreCiudad.textContent = `Clima en ${name}`
    nombreCiudad.classList.add("font-bold", "text-2xl")

    const actual = document.createElement("p");
    actual.innerHTML = `
        ${centigrados} &#8451;`;
    actual.classList.add("font-bold", "text-6xl");
    const tempMaxima = document.createElement("p");
    tempMaxima.innerHTML = `Max: ${max} &#8451;`;
    tempMaxima.classList.add("text-xl");

    const tempMin = document.createElement("p");
    tempMin.innerHTML = `Min: ${min} &#8451;`;
    tempMin.classList.add("text-xl");

    const resultadoDiv = document.createElement("div");
    resultadoDiv.classList.add("text-center", "text-white");
    resultadoDiv.appendChild(nombreCiudad);
    resultadoDiv.appendChild(actual);
    resultadoDiv.appendChild(tempMaxima);
    resultadoDiv.appendChild(tempMin);
    resultado.appendChild(resultadoDiv)
}
function mostrarError(mensaje) {
    const alerta = document.querySelector(".bg-red-100");
    if (!alerta) {
        const alerta = document.createElement("div");
        alerta.classList.add("bg-red-100", "border-red-400", "text-red-700", "px-4", "py-3", "rounder", "max-w-md", "mx-auto", "mt-6", "text-center");
        alerta.innerHTML = `
            <strong class="font-bold">Error!</strong>
            <span class="block">${mensaje}</span>
        `
        container.appendChild(alerta);
        //Se elimine la alerta
        setTimeout(() => {
            alerta.remove();
        }, 2000);
    }


}
function Spinner() {
    limpiarHtml();
    const divSpinner = document.createElement("div");
    divSpinner.classList.add("sk-fading-circle")
    divSpinner.innerHTML = ` <div class="sk-circle1 sk-circle"></div>
    <div class="sk-circle2 sk-circle"></div>
    <div class="sk-circle3 sk-circle"></div>
    <div class="sk-circle4 sk-circle"></div>
    <div class="sk-circle5 sk-circle"></div>
    <div class="sk-circle6 sk-circle"></div>
    <div class="sk-circle7 sk-circle"></div>
    <div class="sk-circle8 sk-circle"></div>
    <div class="sk-circle9 sk-circle"></div>
    <div class="sk-circle10 sk-circle"></div>
    <div class="sk-circle11 sk-circle"></div>
    <div class="sk-circle12 sk-circle"></div>`

    resultado.appendChild(divSpinner);
}
function kelvinACentigrados(grados) {
    return parseInt(grados - 273.15);
}
function limpiarHtml() {
    while (resultado.firstChild) {
        resultado.removeChild(resultado.firstChild)
    }
}