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

/*************  Subir diploma a Firebase Storage   ******************/

function uploadDiploma(){
    const ref = firebase.storage().ref();
    const file = document.querySelector('#imagen_diploma').files[0];
    const name = new Date() + '-' + file.name;
    if (file == null){
        alert("Debe seleccionar el diploma del participante");
    }
    else{

        const metadata = {
            contentType: file.type
        }
        
        const task = ref.child(name).put(file,metadata);

        task.
        then(snapshot => snapshot.ref.getDownloadURL()) // snapshot.ref.getDownloadURL(): obtiene la url de la imagen
        .then (url =>{
            console.log(url); // url de forma explicita

            // Asignamos la imagen al elemento
            const imageElement = document.querySelector('#imagen_diploma');
            imageElement.src = url;
        })

    }

    console.log(ref); // Lo muestra cuando da click al boton registrar

}