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

        // Lista de cursos unicos
        this.listaCursoUnicos = [];

        // Llenando el select desde firebase
        datos.forEach((doc) => {
            //console.log(doc.val());
            // Cargamos al select solo nombre de cursos que no se repiten
            if (!listaCursoUnicos.includes(doc.val()['codigo'])){
                
                // Llenando elementos a la lista
                this.listaCursoUnicos.push(doc.val()['codigo']);
                
                // Llenando los elementos al select
                // Aquí se agregan los options de acuerdo a la base de datos.
                $curso.innerHTML += `<option value = "${doc.val()['codigo']}"> ${doc.val()['nombre']} </option>.`
            }
        });
    });

}());

$curso.addEventListener('change',function(){
    
    // Limpiando el select  de fecha de inicio
    var length = $fecha_inicio.length;
    for (i = length - 1; i >= 0; i--) {
        $fecha_inicio.options[i] = null;
    }

    // Obteniendo la data de firebase
    var pathCursos = db.ref('proyecto/cursos');
    pathCursos.on('value',function(datos){
        // Lista de fechas de inicio unicos
        this.listaFechaInicioUnicos = []; 
        datos.forEach((doc) => {
            console.log(doc.val());
            if (!listaFechaInicioUnicos.includes(doc.val()['fecha_inicio'])){ 

                // Llenando elementos a la lista
                this.listaFechaInicioUnicos.push(doc.val()['fecha_inicio']);

                if ($curso.value == doc.val()['codigo']){
                    $fecha_inicio.innerHTML += `<option value = "${doc.val()['fecha_inicio']}"> ${doc.val()['fecha_inicio']} </option>.`
                }
            }
            
        });
    }); 

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
