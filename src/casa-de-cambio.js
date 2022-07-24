// https://v6.exchangerate-api.com/v6/5a8beaf470aec3159a3eaecb/latest/USD
// /history/USD/YEAR/MONTH/DAY
// 'https://v6.exchangerate-api.com/v6/5a8beaf470aec3159a3eaecb/pair/EUR/GBP/AMOUNT' CONVERSION


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


document.querySelector('#actualizar').addEventListener('click', () => {

    let monedaSeleccionada = document.querySelector('#monedas').value
    
    mostarCartelActualizar();
    obtenerCambios(monedaSeleccionada)
    

})

function agregarFecha(fechaDia){
  document.querySelector('#ultima-actualizacion').textContent = fechaDia;

}

function mostarCartelActualizar(){
  document.querySelector('#informacion-tabla').innerHTML = 'Cargando...'
}

 
obtenerCambios();

// Para hacer conversiones de monedas

const URL_CONVERSION = 'https://v6.exchangerate-api.com/v6/5a8beaf470aec3159a3eaecb'


function obtenerConversiones(monedaBase = 'ARS', fecha='latest'){
  
  fetch(`${URL_CONVERSION}/${fecha}/${monedaBase}`)
  .then((resultado) => resultado.json())
  .then((datos) =>{
    Object.keys(datos.conversion_rates).forEach(monedaBase => {

      listadoAgregarMonedasConversores(monedaBase);

    })
   
  })
    
};

async function obtenerValoresParaConvertir(monedaInicial, monedaFinal, fecha = 'latest'){

  let valorMoneda = '';
  await fetch(`${URL_CONVERSION}/${fecha}/${monedaInicial}`)
  .then((resultado) => resultado.json())
  .then((datos) =>{
      valorMoneda = datos.conversion_rates[monedaFinal]

    })

  let cantidadAConvertir = document.querySelector('#cantidad-conversion').value

  document.querySelector('#resultado').value = (valorMoneda * cantidadAConvertir).toFixed(2);
  document.querySelector('#texto-final').textContent = monedaFinal
};

  function listadoAgregarMonedasConversores(monedaBase){
    const elgirMonedaConversorDesde = document.querySelector('#moneda-inicial')
    const elgirMonedaConversorHacia = document.querySelector('#moneda-final')

    const listadoMonedasConversorDesde = document.createElement('option');
    const listadoMonedasConversorHacia = document.createElement('option');

    listadoMonedasConversorDesde.setAttribute('value', `${monedaBase}`);
    listadoMonedasConversorHacia.setAttribute('value', `${monedaBase}`);


    listadoMonedasConversorDesde.textContent = `${monedaBase}`;
    listadoMonedasConversorHacia.textContent = `${monedaBase}`;

    elgirMonedaConversorDesde.appendChild(listadoMonedasConversorDesde);
    elgirMonedaConversorHacia.appendChild(listadoMonedasConversorHacia);


  }

 

  document.querySelector('#convertidor').addEventListener('click', () => {

    ocultarPatallaInicial();
    mostrarPantallaConversiones();
    obtenerConversiones();
    


})

function ocultarPatallaInicial(){
  document.querySelector('.contenedor-divisas-busqueda').classList.add('oculto');
  document.querySelector('.contenedor-tabla').classList.add('oculto');
  
}

function mostrarPantallaConversiones(){

  document.querySelector('.contenedor-convertir').classList.remove('oculto')
  document.querySelector('.contenedor-resultado').classList.remove('oculto')
};



document.querySelector('#convertir').addEventListener('click', () => {

 let monedaInicial = document.querySelector('#moneda-inicial').value;
 let monedaFinal = document.querySelector('#moneda-final').value;

obtenerValoresParaConvertir(monedaInicial, monedaFinal);

})

document.querySelector('#volver').addEventListener('click', () => {

  mostrarPatallaInicial();
  ocultarPantallaConversiones();
  

 
 })

function mostrarPatallaInicial(){
  document.querySelector('.contenedor-divisas-busqueda').classList.remove('oculto');
  document.querySelector('.contenedor-tabla').classList.remove('oculto');
}

function ocultarPantallaConversiones(){
  document.querySelector('.contenedor-convertir').classList.add('oculto')
  document.querySelector('.contenedor-resultado').classList.add('oculto')
}


obtenerConversiones();