// Variables desde el HTML
let $dni = document.getElementById('dni');
let $nomb_curso = document.getElementById('nomb_curso');
let $nota = document.getElementById('nota');
let $institucion = document.getElementById('institucion');

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

// Cargando los DNI de alumno de forma automática

(function(){
    var pathAlumnos = db.ref('proyecto/alumnos');
    pathAlumnos.on('value',function(datos){

        // Lista de cursos unicos
        this.listaDNIUnicos = [];

        // Llenando el select desde firebase
        datos.forEach((doc) => {
            //console.log(doc.val());
            // Cargamos al select solo nombre de cursos que no se repiten
            if (!listaDNIUnicos.includes(doc.val()['dni'])){
                
                // Llenando elementos a la lista
                this.listaDNIUnicos.push(doc.val()['dni']);
                
                // Llenando los elementos al select
                // Aquí se agregan los options de acuerdo a la base de datos.
                $dni.innerHTML += `<option value = "${doc.val()['dni']}"> ${doc.val()['dni']} </option>.`
            }
        });
    });

}());

// Cargando los cursos que llevo el alumno segun el DNI ingresado 

$dni.addEventListener('change',function(){
    
    // Limpiando el select  de codigo de curso 
    var length = $nomb_curso.length;
    for (i = length - 1; i >= 0; i--) {
        $nomb_curso.options[i] = null;
    }

    $nomb_curso.innerHTML += `<option value = "1234"> Seleccione el curso </option>.`

    // Obteniendo la data de firebase
    var pathAlumnosCursos = db.ref('proyecto/alumnos_cursos');
    var pathAlumnosCursos = pathAlumnosCursos.child($dni.value);
    pathAlumnosCursos.on('value',function(datos){
        

        //console.log(datos.val());
        var claves = Object.keys(datos.val());
        //console.log(claves);
        var length_claves = claves.length; 
        console.log(length_claves);

         // Lista de cursos unicos
         this.listaCursosUnicos = [];

        
        //console.log("La clave del curso es :" + codigo_curso);
        datos.forEach((doc) => {

            console.log(doc.val());

            $nomb_curso.innerHTML += `<option value = "${doc.val()['curso']}"> ${doc.val()['curso']} </option>.`

            /*doc.forEach((e) => {
                //console.log(doc.val());
                //console.log("=====");
                console.log("=====");
                console.log(e.val());
                
                $cod_curso.innerHTML += `<option value = "${e.val()['curso']}"> ${e.val()['curso']} </option>.`
                
                    
            });*/


            /*for (i = 0 ; i < length_claves; i++) {
                var codigo_curso = claves[i];
                if (!listaCursosUnicos.includes(doc.val()['curso'])){
                    // Llenando elementos a la lista
                    this.listaCursosUnicos.push(doc.val()['curso']);
                    console.log("La clave del curso es :" + codigo_curso);
                    $cod_curso.innerHTML += `<option value = "${codigo_curso}"> ${doc.val()['curso']} </option>.`
                }
            }*/
            

            //$cod_curso.innerHTML += `<option value = "${claves[i]}"> ${doc.val()['curso']} </option>.`

            /*doc.forEach((e) => {
                //console.log(doc.val());
                console.log("=====");
                console.log(e.val());
                
                $cod_curso.innerHTML += `<option value = "${e.val()['curso']}"> ${e.val()['curso']} </option>.`
                
                    
            });*/
            
            
        });
           
        

        //console.log(claves);
        
    }); 

});



