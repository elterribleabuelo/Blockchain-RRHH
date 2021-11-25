/************ Ocultamos la caja donde se sube el archivo ***************/
(function(){
    let $nota = document.getElementById('nota');
    document.getElementById('subida_diploma').style.visibility = "hidden"; // oculto
    document.getElementById('imagen_diploma').style.visibility = "hidden"; // oculto
}());

/******** Mostramos la caja de subida de archivo de acuerdo si la nota es mayor a la aprobatoria, 
 * solo en este caso se sube el diploma */

$nota.addEventListener('change',function(){
    
    if ($nota.value > 14){
        document.getElementById('subida_diploma').style.visibility = ""; // show
        document.getElementById('imagen_diploma').style.visibility = ""; // show
    }
    else{
        document.getElementById('subida_diploma').style.visibility = "hidden"; // show
        document.getElementById('imagen_diploma').style.visibility = "hidden"; // show
    }
});

/*
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

//firebase.initializeApp(firebaseConfig);

/*************  Subir diploma a Firebase Storage   ******************/
let $imagen_diploma = document.getElementById('imagen_diploma');
// let $subida_diploma = document.getElementById('subida_diploma');

$imagen_diploma.addEventListener('change',function(){ 

    var myModal = new bootstrap.Modal(document.getElementById('ventana_modal'), {
        keyboard: false
      }); 

    myModal.show();

    var vtn_modal = document.getElementsByClassName("modal");
    //console.log("HOLAAAAAAAAAAA");
    vtn_modal[0].addEventListener('click',function(event){
        //console.log("ESTOY AQUIIIIIIII");
        if(event.target.value == "yes"){
            //console.log("YESSSSSSSSSSSSSSSSSSSS");
            const ref = firebase.storage().ref();
            //console.log(ref);
            const file = document.querySelector('#imagen_diploma').files[0];
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
                    console.log(url); // url de forma explicita

                    // Asignamos la imagen al elemento
                    const imageElement = document.querySelector('#imagen_diploma');
                    imageElement.src = url;
                    // Añadimos el valor al value del elemento del HTML 
                    document.getElementById('subida_diploma').value = url;
                })
            }


            //console.log(ref); // Lo muestra cuando da click al boton registrar
            
            // Desaparecemos la ventana
            myModal.hide();
        }
        else if(event.target.value == "no"){
            myModal.hide();
        }

    });
    
});