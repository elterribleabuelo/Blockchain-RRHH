// Variables desde el HTML
let $dni = document.getElementById('dni');
let $nomb_curso = document.getElementById('nomb_curso');
let $institucion = document.getElementById('institucion'); 
let $nota = document.getElementById('nota');
let $imagen_diploma = document.getElementById('imagen_diploma');
let $link = document.getElementById('link'); 
let $hash_image = document.getElementById("hash");
const certificadoForm = document.querySelector("#certificadoForm");

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

// Objeto respuesta
var respuesta_block = {
    ap_materno : "",
    ap_paterno : "",
    dni :  "",
    nombres : "",
    nomb_curso : "",
    nota : "",
    institucion: "",
    link : "",
    hash_image : "",
    condicion: "",
    fecha_inicio_fin: ""
};

var keys_block = Object.keys(respuesta_block);
console.log("Claves del bloque:",keys_block); 

// Cargando los DNI de alumno de forma automática 

(function(){ 

    document.addEventListener("DOMContentLoaded", () => {
        App.init();
    })
    
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

    document.getElementById('subida_diploma').style.visibility = "hidden"; // oculto
    document.getElementById('imagen_diploma').style.visibility = "hidden"; // oculto

}()); 

// Funciones

function base64ToHex(str) {
    const raw = window.atob(str);
    let result = '';
    for (let i = 0; i < raw.length; i++) {
      const hex = raw.charCodeAt(i).toString(16);
      result += (hex.length === 2 ? hex : '0' + hex);
    }
    return result.toUpperCase();
}

// Cargando los cursos que llevo el alumno segun el DNI ingresado 

$dni.addEventListener('change',function(){
    var count = 0;
    // Obtenemos las variables nombre,ap.paterno,ap.materno,condición,fecha_inicio_fin apartir del DNI 
    var pathAlumnos = db.ref('proyecto/alumnos');
    var pathAlumnos = pathAlumnos.child($dni.value);

    pathAlumnos.on('value',function(alumnos){ 
        console.log("Estructura de datos:",alumnos);
        console.log("Data alumno:", Object.keys(alumnos.val()));
        alumnos.forEach((alum) =>{ 
            var llave = keys_block[count]; 
            respuesta_block[llave] = alum.val();
            count = count + 1; 
        });
    });
    // console.log("RPTA BLOCK:",respuesta_block);
    
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
            respuesta_block.nomb_curso = doc.val()['curso'];
        });
        
    }); 

});

$nomb_curso.addEventListener('change',function(){
    var pathAlumnosCursos = db.ref('proyecto/alumnos_cursos');
    var pathAlumnosCursos = pathAlumnosCursos.child($dni.value); 
    pathAlumnosCursos.on('value',function(datos){
        
        datos.forEach((doc) => {
            if ($nomb_curso.value == doc.val()['curso']){
                var fecha_inicio_fin = doc.val()['fecha_inicio_fin']; 
                respuesta_block.fecha_inicio_fin = fecha_inicio_fin;
            }
        });
    
    });

});

$nota.addEventListener('change',function(){ 

    respuesta_block.nota = $nota.value;
    
    if ($nota.value > 14){
        document.getElementById('subida_diploma').style.visibility = ""; // show
        document.getElementById('imagen_diploma').style.visibility = ""; // show 
        respuesta_block.condicion = 'Aprobado';
    }
    else{
        document.getElementById('subida_diploma').style.visibility = "hidden"; // show
        document.getElementById('imagen_diploma').style.visibility = "hidden"; // show 
        respuesta_block.condicion = 'Desprobado';
    }
});

$institucion.addEventListener('change',function(){
    respuesta_block.institucion = $institucion.value;
});  

$imagen_diploma.addEventListener('change',function(){ 

    var myModal = new bootstrap.Modal(document.getElementById('ventana_modal'), {
        keyboard: false
      }); 
    
    // Aparece la primera ventana modal
    myModal.show();

    var vtn_modal = document.getElementsByClassName("modal");
    vtn_modal[0].addEventListener('click',function(event){
        //console.log("ESTOY AQUIIIIIIII");
        if(event.target.value == "yes"){

            let html = '';
            
            const ref = firebase.storage().ref();
            //console.log(ref);
            const file = document.querySelector('#imagen_diploma').files[0];

            var fileReader = new FileReader();

            fileReader.onload = function(FileLoadEvent){
                var srcData = FileLoadEvent.target.result;
                //console.log(srcData);
                var base64result = srcData.split(',')[1];
                console.log("Base 64:",base64result); // Hasta acá son iguales

                // Base 64 a Hexadecimal
                var hexString = base64ToHex(base64result);

                // Hexadecimal a SHA256
                var encrypted = CryptoJS.SHA256(hexString);
                encrypted = encrypted.toString();  // Hash con el que se compara en la Blockchain
                
                // Añadimos el valor al value del elemento oculto del HTML
                document.getElementById("hash").value = encrypted;
                respuesta_block.hash_image = encrypted;
                console.log("SHA 256:",encrypted);
            }

            fileReader.readAsDataURL(file);

            //console.log(file);
            const name = new Date() + '-' + file.name;
            //console.log(name);
            
            if (file == null){
                alert("Debe seleccionar el diploma del participante");
            }
            else{

                const metadata = {
                    contentType: file.type
                };
                
                const task = ref.child(name).put(file,metadata);

                task.
                then(snapshot => snapshot.ref.getDownloadURL()) // snapshot.ref.getDownloadURL(): obtiene la url de la imagen
                .then (url =>{

                    console.log("URL:", url); // url de forma explicita
                    
                    const fileUrl = url; // URL del cliente - imagen local del equipo
                    console.log(fileUrl);
                    
                    
                    // Asignamos la imagen al elemento
                    const imageElement = document.querySelector('#imagen_diploma');
                    imageElement.src = url;
                    
                    // Añadimos el valor al value del elemento del HTML 
                    document.getElementById("link").value = url; 
                    respuesta_block.link = url;
                })
                //document.getElementById("link").value = url;
            }

            //console.log(ref); // Lo muestra cuando da click al boton registrar
            
            // Desaparecemos la ventana
            myModal.hide();

            // Aparece el progressbar y se llena de forma dinámica
            document.getElementById("div-mostrar").style.display = "";
            $(".progress-bar").animate({
                width: "100%",
            }, 10000,function(){
                if ($(".progress-bar")[0].style.width == "100%"){
                    $('#registrar').attr("disabled", false);	
                }
            });

        }
        else if(event.target.value == "no"){
            myModal.hide();
        }
    });
    
}); 


certificadoForm.addEventListener("submit",e =>{
    e.preventDefault();
    App.createCertificado(respuesta_block.ap_materno,respuesta_block.ap_paterno,respuesta_block.dni,
                          respuesta_block.nombres,respuesta_block.nomb_curso,respuesta_block.nota,
                          respuesta_block.institucion,respuesta_block.link,respuesta_block.hash_image,
                          respuesta_block.condicion,respuesta_block.fecha_inicio_fin);
});








