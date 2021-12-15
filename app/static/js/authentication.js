window.onload = inicializar;
var formAutenticacion;

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

function autentificar(event){
    event.preventDefault();
    var usuario = event.target.email.value;
    var contrasena = event.target.password.value;

    firebase.auth().signInWithEmailAndPassword(usuario, contrasena)
        .catch(function(incorrecto) {
            console.log("Incorrecto");
            alert("Credenciales incorrectas")
            }).then(function(){
                window.location.href = "/panel_admin_centro";
                /*firebase.auth().currentUser.getIdToken()
                .then(function(idTokenResult){

                    if (!!idTokenResult.claims.admin) {
                        console.log("Admin");
                        window.location.href = "/panel_admin_centro";
                    }
                    else{
                        console.log("Usuario que no es administrador");
                    }

                }).catch(function(error){
                    console.log(error);
                })
                */
            });
};
