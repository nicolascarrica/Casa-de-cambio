// https://v6.exchangerate-api.com/v6/5a8beaf470aec3159a3eaecb/latest/USD
// /history/USD/YEAR/MONTH/DAY

function obtenerCambios(monedaBase = 'ARS', fecha = 'latest'){

  URL_BASE = 'https://v6.exchangerate-api.com/v6/5a8beaf470aec3159a3eaecb';

  fetch(`${URL_BASE}/${fecha}/${monedaBase}`)
    .then((resultado) => resultado.json())
    .then((datos) =>{
      
      recargarPantalla();
      
      Object.keys(datos.conversion_rates).forEach(monedaBase => {
        tablaAgregarValores(monedaBase, datos.conversion_rates[monedaBase]);
        listadoAgregarValores(monedaBase);
    })
    
      agregarFecha(datos.time_last_update_utc);
    });
}


function recargarPantalla(){

  let tabla = document.querySelector('#informacion-tabla')
    limpiar(tabla)
    
    let monedas = document.querySelector('#monedas')
    limpiar(monedas)
    
    document.querySelector('#ultima-actualizacion').textContent = ''

    
};

function limpiar (padre){
  while (padre.firstChild){
      padre.removeChild(padre.firstChild)
  }
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
};

function listadoAgregarValores(monedaBase) {
  const elegirMoneda = document.querySelector('#monedas');
  const listadoDeMonedas = document.createElement('option'); 

  listadoDeMonedas.setAttribute('value', `${monedaBase}`);
  listadoDeMonedas.textContent = `${monedaBase}`;

  elegirMoneda.appendChild(listadoDeMonedas);
}

document.querySelector('#actualizar').onclick = cambiarMonedaTabla;

function cambiarMonedaTabla(){
    let monedaSeleccionada = document.querySelector('#monedas').value
    
    mostarCartelActualizar();
    obtenerCambios(monedaSeleccionada)
    

}

function agregarFecha(fechaDia){
  document.querySelector('#ultima-actualizacion').textContent = fechaDia;

}

function mostarCartelActualizar(){
  document.querySelector('#informacion-tabla').innerHTML = 'Cargando...'
}

 
obtenerCambios();
  

 













