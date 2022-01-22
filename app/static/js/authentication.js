function lanzadera(){
    setTimeout(inicializar, 5000);
    registrar_datos();
}

window.onload = lanzadera;

var formAutenticacion;
var login_est = false;
var rol = null;
let isAuthReady = false



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

var x = document.getElementById("login");
var y = document.getElementById("registrar");
var z = document.getElementById("elegir");

function inicializar(){
    //console.log("Inicio sesion...")
    x.addEventListener("submit",autentificar,false);
}

function login(){
    x.style.left = "50px";
    y.style.left = "450px";
    z.style.left = "0px";
}

function registrar(){
    x.style.left = "-400px";
    y.style.left = "50px";
    z.style.left = "120px";
}


function registrar_datos(){
    //console.log("registrandooooo...");
    y.addEventListener("submit",registrar_firebase,false);
}

function registrar_firebase(event){
    event.preventDefault();
    var nombre = document.getElementById("nombUsuario").value;
    var emailRegister = document.getElementById("emailRegister").value;
    var passwordRegister = document.getElementById("passwordRegister").value;

    datos = {
        nombre: nombre,
        email: emailRegister,
        uid: null,
        password: passwordRegister,
        perfil: 'rrhh'
    };

    console.log('datos ->',datos.email, datos.password);

    firebase.auth().createUserWithEmailAndPassword(datos.email, datos.password)
        .catch(function(error){
            console.log(error);
        }).then(function(result){

            //  Vemos si el usuario se creo en el modulo de autenticacion
            console.log('exito al crear el usuario en Firebase Autehtication');

            const path = 'Usuarios';

            // Recuperamos el id unico del usuario
            const id = result.user.uid; 
            console.log("IDDD:", id);

            // Campo uid --> "id" es devolvido por el Backend del modulo de autenticacion
            this.datos.uid = id;

            // Vaciamos la password para guaradrlo en la Firestore
            this.datos.password = null;

            // Escribimos en Firestore
            var db = firebase.firestore();
            console.log("Base de datos:",db);
            
            db.collection(path).doc(id).set(this.datos)
            .then(() =>{
                console.log("Registrado con éxito en Firebase Firestore");
                //window.location.href = "/panel_admin_rrhh";
            })
            .catch((error) =>{
                console.error("Error al guardar en Firestore: ", error);
            });

        });
};


async function getDatosUser(uid){
    const path = 'Usuarios';
    const id = uid;
    var db = firebase.firestore();
    
    // Problema del asincronismo del Firebase esta aquí.
    var snapshot = await db.collection(path).doc(id).get();
    // console.log("SNAPSHOT DATA:", snapshot.data());
    // console.log("SNAPSHOT DATA PERFIL:", snapshot.data().perfil);
    return snapshot.data();
}

function stateUser(){ 

    const user = firebase.auth().currentUser;

    if(user){
        var uid = user.uid;
        console.log("Esta logeado");
        login_est = true;
        return uid;
    }else{
        console.log("no esta logeado");
        login_est = false;
    }
}



function autentificar(event){
    event.preventDefault();
    var usuario = event.target.email.value;
    var contrasena = event.target.password.value;

    firebase.auth().signInWithEmailAndPassword(usuario, contrasena)
    .then((userCredential) => {
        
        var uid = stateUser();
        console.log("Su UID es:", uid);
        
        rol = getDatosUser(uid);
        rol.then((result) =>{
            // console.log("Resultado de la promesa:", result);
            try{ 
                var rol_final = result["perfil"];
                console.log("Resultado del perfil:", result["perfil"]);
                if(rol_final == 'rrhh'){
                    console.log("Dirigiendose a la vista de rrhh");
                    window.location.href = "/panel_admin_rrhh";
                }

            }catch(error){
                // console.error(error)
                console.log("Dirigiendose a la vista de centro de estudios");
                window.location.href = "/panel_admin_centro";
            }
        });
    }).catch((error) => { 
        var errorCode = error.code;
        var errorMessage = error.message;
        alert("Credenciales incorrectas");
        console.log("Algo mal ha ocurrido, vuelva a escribir sus contraseñas");
        console.log("Codigo de error:", errorCode);
        console.log("Mensaje de error:",errorMessage);
      });
};




// Asyncrosinmo Firebase - async wait .get()
// https://stackoverflow.com/questions/49432579/await-is-only-valid-in-async-function
// https://stackoverflow.com/questions/38884522/why-is-my-asynchronous-function-returning-promise-pending-instead-of-a-val
// https://stackoverflow.com/questions/38884522/why-is-my-asynchronous-function-returning-promise-pending-instead-of-a-val
// https://stackoverflow.com/questions/38639837/firebase-uncaught-in-promise-typeerror-cannot-read-property
// https://escuelavue.es/series/curso-firebase-gratis/vue-firebase-leer-documentos/
// https://firebase.google.com/docs/auth/web/manage-users?hl=es
// https://stackoverflow.com/questions/38228376/how-does-the-firebase-authstatelistener-work
// https://stackoverflow.com/questions/46590155/firestore-permission-denied-missing-or-insufficient-permissions
