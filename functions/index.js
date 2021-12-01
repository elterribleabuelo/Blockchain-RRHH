const admin = require('firebase-admin');
const enviroment = require('./environments/enviroment.js');
const functions = require("firebase-functions");
// Inicializamos la aplicacion del lado del servidor 
admin.initializeApp();

const {AuthorizationOnCreate} = requiere('./src');
const context = {admin, enviroment}; 

//authorization-on-create : se activa mediante la creacion de un nuevo usuario en Firebase Authentication
exports.authorizationOnCreate = functions.auth.user().onCreate(AuthorizationOnCreate(context));

// Función que garega un rol de administrador a un usurio especifico 


// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
