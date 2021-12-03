/*Recuperando las variables almacenadas en el localStorage declaradas en el archivo drag_and_drop.js */

var retrievedObject = localStorage.getItem('testObject'); // Registros de la Blockchain 
                                                          //(contiene hash + campos : nombre,apellido,curso,etc)

console.log('retrievedObject: ', JSON.parse(retrievedObject));

var retrievedObjectID = localStorage.getItem('testObjectID'); // HASH SHA-256 de las imágenes subidas (solo contiene el hash)

console.log('retrievedObjectID: ', JSON.parse(retrievedObjectID));


/*Haciendo la búsqueda de los hash correspondientes a las imágenes que se encuentran en la Blockchain con
  los hash que se generaron en la subida de archivos */



