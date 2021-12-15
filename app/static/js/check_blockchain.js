(function(){

    var retrievedObject = localStorage.getItem('testObject'); // Registros de la Blockchain(contiene hash + campos : nombre,apellido,curso,etc)
    var retrievedObjectID = localStorage.getItem('testObjectID'); // HASH SHA-256 de las imágenes subidas (solo contiene el hash)

    retrievedObject = JSON.parse(retrievedObject); // Conviertiendo a formato JSON
    //console.log('retrievedObject: ', retrievedObject);
    num_registros_block = retrievedObject.length;


    retrievedObjectID = JSON.parse(retrievedObjectID); // Conviertiendo a formato JSON
    //console.log('retrievedObjectID: ', retrievedObjectID);
    num_diplomas_consultados = retrievedObjectID.length;

    /**Recorremos la blockchain en búsqueda de los regitros que coinciden */
    for (var i = 0; i < num_registros_block; i++ ){
        for (var j = 0; j < num_diplomas_consultados; j++){
            if (retrievedObject[i]['hash_image'] == retrievedObjectID[j]){
                //console.log("COINCIDEN EN : ", retrievedObjectID[j]);
                document.getElementById("body").innerHTML += `
                                                            <tr>
                                                                <td><center>${retrievedObject[i]['nombres']}</center></td>
                                                                <td><center>${retrievedObject[i]['ap_paterno']} &nbsp ${retrievedObject[i]['ap_materno']}</center></td>
                                                                <td><center>${retrievedObject[i]['curso']}</center></td>
                                                                <td><center>${retrievedObject[i]['condicion']}</center></td>
                                                                <td><center>${retrievedObject[i]['nota']}</center></td>
                                                                <td><center>${retrievedObject[i]['institucion']}</center></td>
                                                                <td><center><a href = ${retrievedObject[i]['link']}><i class="fas fa-book"></i></a></center></td>
                                                            </tr>
                                                            `;
            }
        }
    }
}());