function lanzadera(){
    stateUser();
    setTimeout(inicializar, 5000);
    registrar_datos();
}

window.onload = lanzadera;

var formAutenticacion;
var login_est = false;
var rol = null;

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
                window.location.href = "/panel_admin_rrhh";
            })
            .catch((error) =>{
                console.error("Error al guardar en Firestore: ", error);
            });

        });
};


function getDatosUser(uid){
    const path = 'Usuarios';
    const id = uid;
    var db = firebase.firestore();
    var docRef = db.collection(path).doc(id);

    docRef.get().then((doc) => {
        if (doc.exists) {
            console.log("Document data:", doc.data());
            if (doc.data()){
                rol = doc.data().perfil;
                console.log("ROL EN GET DATOS USER:", rol);
                return rol;
            }
        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");    
        }
    }).catch((error) => {
        console.log("Error getting document:", error);        
    });
}

function stateUser(){
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          var uid = user.uid;
          console.log("Esta logeado");
          login_est = true;
          rol = getDatosUser(uid);
          console.log("UID:",uid);
          return uid;

        }else{
          console.log("no esta logeado");
          login_est = false;
        }
    });
}



function autentificar(event){
    event.preventDefault();
    var usuario = event.target.email.value;
    var contrasena = event.target.password.value;

    firebase.auth().signInWithEmailAndPassword(usuario, contrasena)
        .catch(function(incorrecto) {
            console.log("Incorrecto");
            alert("Credenciales incorrectas");
            }).then(function(result){
                var uid = stateUser();
                rol = getDatosUser(uid);
                //console.log(result);
                console.log("Su rol es: ", rol);
                if(rol == 'rrhh'){
                    window.location.href = "/panel_admin_rrhh";
                }
                else{
                    window.location.href = "/panel_admin_centro";
                }
                // window.location.href = "/panel_admin_centro";
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


/*function createDoc(data,path,id){
    const collection = firebase().firestore.collection(path);
    return collection.doc(id).set(data)
}*/

// https://firebase.google.com/docs/reference/js/v8/firebase.auth.Auth
// https://firebase.google.com/docs/auth/web/start
// https://firebase.google.com/docs/firestore/quickstart?hl=es
// http://codexexempla.org/articulos/2007/lanzar_funciones.php
// https://firebase.google.com/docs/firestore/quickstart?hl=es
// https://cloud.google.com/firestore/docs/manage-data/add-data#web-version-8
// https://firebase.google.com/docs/firestore/data-model
