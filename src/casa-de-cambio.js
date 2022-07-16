// https://v6.exchangerate-api.com/v6/5a8beaf470aec3159a3eaecb/latest/USD




URL_BASE = 'https://v6.exchangerate-api.com/v6/5a8beaf470aec3159a3eaecb/latest';



function obtenerCambios(monedaBase = 'ARS'){
  fetch(`${URL_BASE}/${monedaBase}`)
    .then((resultado) => resultado.json())
    .then((datos) =>{
      
      recargarPantalla();
      Object.keys(datos.conversion_rates).forEach(monedaBase => {
        tablaAgregarValores(monedaBase, datos.conversion_rates[monedaBase]);
        desplegableAgregarValores(monedaBase);
    })
  
    });
}

document.querySelector('#actualizar').onclick = cambiarMonedaTabla;

function cambiarMonedaTabla(){
  document.querySelector('#actualizar').addEventListener('click', () => {
    let monedaSeleccionada = document.querySelector('#monedas').value
    obtenerCambios(monedaSeleccionada)
  })

}

function tablaAgregarValores(monedaBase, valor) {

  const informacionTabla = document.querySelector('#informacion-tabla');

  const valoresTabla = document.createElement('tr');

  const informacionMoneda = document.createElement('th');
  const informacionCambio = document.createElement('th');

  informacionMoneda.textContent = `${monedaBase}`;
  informacionCambio.textContent = `${valor}`

  valoresTabla.append(informacionMoneda, informacionCambio);
  informacionTabla.appendChild(valoresTabla);
}

function desplegableAgregarValores(monedaBase) {
  const elegirMoneda = document.querySelector('#monedas');
  const optionparaMonedas = document.createElement('option'); 

  optionparaMonedas.setAttribute('value', `${monedaBase}`);
  optionparaMonedas.textContent = `${monedaBase}`;

  elegirMoneda.appendChild(optionparaMonedas);
}


function recargarPantalla(){

  let tabla = document.querySelector('#informacion-tabla')
    limpiar(tabla)
    
    let monedas = document.querySelector('#monedas')
    limpiar(monedas)
    
    document.querySelector('#ultima-actualizacion').textContent = ''
}

function limpiar (padre){
  while (padre.firstChild){
      padre.removeChild(padre.firstChild)
  }
}

obtenerCambios();





