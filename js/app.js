const container = document.querySelector('.container')
const resultado = document.querySelector('#resultado')
const formulario = document.querySelector('#formulario')

window.addEventListener('load', () => { 
    formulario.addEventListener('submit' , buscarClima)
})

function buscarClima(e) {
    e.preventDefault();

    //Validar 
    const  ciudad = document.querySelector('#ciudad').value;
    const  pais = document.querySelector('#pais').value;

    if (ciudad === '' || pais === '' ) {
        // Hubo un error
        mostrarError('Ambos campos son obligatorios')
        return;
        
    }

    //Consultariamos la API
    consultarApi(ciudad, pais);
    
}
function mostrarError(mensaje) {
    console.log(mensaje)
    const alerta = document.querySelector('.bg-red-100'); // es la clase que se encuentra abajo
    if(!alerta){
            // Crear Alerta
    const alerta = document.createElement('div')
    alerta.classList.add('bg-red-100', 'border-red-400', 'text-red-700', 'px-4', 'py-3', 'rounded', 'max-w-md', 'mt-6', 'mx-auto', 'text-center')
    alerta.innerHTML = `
    <strong class="font-bold"> Error ! </strong>
    <span class= "block"> ${mensaje}</span>
    `;
    container.appendChild(alerta)

    // eliminar ddespues de 5 segundos
    setTimeout(() => {
        alerta.remove();
    }, 5000);
    }


    
}
function consultarApi(ciudad, pais) {
    const appId = '29b7db90284f65d2fe3778aebd3c8ad8'
    let url = `http://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appId}`;

    Spinner(); // Muestra un Spinner de carga
    fetch(url)
        .then(respuesta => respuesta.json())
        .then(datos => {
            limpiarHTML() // Limpiar el html previo
            if (datos.cod === "404" ) {
                mostrarError('Ciudad no encontrada ')
                return
            }
            mostrarClima(datos)

        })
}


function mostrarClima(datos) {
    const {name, main:{temp, temp_max, temp_min}} = datos;
    
    const centigrados = KelvinACentigrados(temp)
    const max = KelvinACentigrados(temp_max)
    const min = KelvinACentigrados(temp_min)

    const nombreCiudad = document.createElement('p');
    nombreCiudad.innerHTML = `Clima en: ${name}`;
    nombreCiudad.classList.add('font-bold', 'text-2xl')

    const actual = document.createElement('p')
    actual.innerHTML = `${centigrados} &#8451`;
    actual.classList.add('font-bold', 'text-6xl')

    const tempMaxima = document.createElement('p');
    tempMaxima.innerHTML = `Max: ${max} &#8451;`;
    tempMaxima.classList.add('text-xl')

    const tempMinima = document.createElement('p');
    tempMinima.innerHTML = `Min: ${min} &#8451;`;
    tempMinima.classList.add('text-xl')

    const resultadoDiv = document.createElement('div')
    resultadoDiv.classList.add('text-center', 'text-white')

    resultadoDiv.appendChild(nombreCiudad);
    resultadoDiv.appendChild(actual);
    resultadoDiv.appendChild(tempMaxima);
    resultadoDiv.appendChild(tempMinima);



    resultado.appendChild(resultadoDiv)
    
}
const  KelvinACentigrados = grados  => parseInt(grados - 273.15)
    
function limpiarHTML() {
    while (resultado.firstChild) {
        resultado.removeChild(resultado.firstChild)
        
    }
    
}
function Spinner() {

    limpiarHTML();
  
    const divSpinner = document.createElement('div');
    divSpinner.classList.add('sk-fading-circle');
  
    divSpinner.innerHTML = `
      <div class="sk-circle1 sk-circle"></div>
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
      <div class="sk-circle12 sk-circle"></div>
    `;
    resultado.appendChild(divSpinner);
  }