// Variables desde el HTML
let $curso = document.getElementById('curso');
let $fecha_inicio = document.getElementById('fecha_inicio');
let $horario = document.getElementById('horario') ;

// Conexion a firebase

/*************  Configuracion Firebase   ******************/
var firebaseConfig = {
    apiKey: "AIzaSyD4J4LpWyK7oRDw0v1QeU6nXCf1yn0FfCk",
    authDomain: "blockchain-29b1a.firebaseapp.com",
    databaseURL: "https://blockchain-29b1a-default-rtdb.firebaseio.com",
    projectId: "blockchain-29b1a",
    storageBucket: "blockchain-29b1a.appspot.com",
    messagingSenderId: "286160907597",
    appId: "1:286160907597:web:061d368e1b9288fea19b04",
    measurementId: "G-3MSV1HR02G"
  };

firebase.initializeApp(firebaseConfig);

/**********************************************  Importamos FireRealTimeDatabase   *****************************************/
var db = firebase.database();

/*********************************************  Carga de datos   **********************************************************/

/********************************************* A. Carga de cursos ********************************************/

/****** 1. Carga de cursos ******/ 
// variable que contiene la dirección del endpoint
//var pathCursos = db.ref('proyecto/cursos');

// diccionario con los cursos registrados en Firebase
//var cursos = {};

/****** 2. Consulta al endpoint y llenado de registros en la variable cursos *****/
/*pathCursos.on('value',function(datos){
        cursos = datos.val();

});*/

/*** 3. Llenando en una lista los códigos de los cursos ***/
//var nomb_curso = [];
/*for (var curso in cursos){
    //console.log(curso);
    nomb_curso.push(cursos[curso]["nombre"]);
}*/

/*** 4.Eliminando elementos duplicados ***/
/*var result_curso = nomb_curso.filter((item,index)=>{
    return nomb_curso.indexOf(item) === index;
  })*/

/** 5.Agrupando todo en una función */
path = 'proyecto/cursos';

(function(){
    var pathCursos = db.ref('proyecto/cursos');
    pathCursos.on('value',function(datos){

        datos.forEach((doc) => {
            console.log(doc.val());
            //Aquí se agregan los options de acuerdo a la base de datos.
            $curso.innerHTML += `<option value = "${doc.val()['codigo']}"> ${doc.val()['nombre']} </option>.`
        });
    });

}());

$curso.addEventListener('change',function(){
    if ($curso.value == 'MC0024'){
        $fecha_inicio.innerHTML += `<option value = "1111"> 2222 </option>.`
    } 

});

/******************************************* B. Carga de fechas de inicio *************************************/
let fechas_inicio = [] ;


let horarios = [] ;

// Mostrar en el HTML 
function mostrarDatos(arreglo,lugar){
    let elementos = '<option select disable> -- Seleccione -- </option>'

    for(let i = 0; i < arreglo.length; i++){ 
        elementos += '<option value = "' + arreglo[i] + '">' + 
        arreglo[i] + '</option>'
    }

    lugar.innerHTML = elementos 
}

$curso.addEventListener('change',function(){
    let valor = $curso.value 

})
