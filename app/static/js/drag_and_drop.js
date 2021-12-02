/************ Ocultamos el boton para buscar los archivos ***************/
(function(){
    document.getElementById('buscar').style.visibility = "hidden"; // oculto
}());

// Variables

const dropArea = document.querySelector(".drop-area");
const dragText = dropArea.querySelector("h2");
const button = dropArea.querySelector("button");
const input = dropArea.querySelector("#input-file");
let files;

// Eventos 

button.addEventListener('click', (e) => {
    //console.log('click');

    // Mandando a llamar al input 
    input.click();
});

input.addEventListener("change",(e) => {

    files = this.files;
    dropArea.classList.add("active"); // color
    showFiles(files);
    dropArea.classList.remove("active");
});

/*Se activa mientras se arrasatra elementos*/
dropArea.addEventListener("dragover",(e) => {
    e.preventDefault();
    dropArea.classList.add("active");
    dragText.textContent = "Suelta para subir los archivos"
}); 

/*Mientras arrastramos pero no estamos dentro de la zona */
dropArea.addEventListener("dragleave",(e) => {
    e.preventDefault();
    files = e.dataTransfer.files; // Obtiene referencias de las imágenes
    showFiles(files);
    dropArea.classList.remove('active');
    dragText.textContent = "Arrastra y suelta las imágenes";
});

/*Cuando soltamos archivos dentro de la zona */
dropArea.addEventListener("drop",(e) => {
    e.preventDefault();
    files = e.dataTransfer.files;
    showFiles(files);
    dropArea.classList.remove('active');
    dragText.textContent = "Arrastra y suelta las imágenes";
});


// Funciones 

function showFiles(files){
    /* Identificar si estamos subiendo solo una imagen o varias 
    */

    if (files.length == undefined){
        processFile(files);
    }else{
        for(const file of files){
            processFile(file);
        }
    }
    // Haciendo visible el boton buscar
    document.getElementById("buscar").style.visibility = "";

}

function sign_string(key_b64, to_sign) {
    try {
        var key = CryptoJS.enc.Base64.parse(key_b64).toString(CryptoJS.enc.Utf8);
    }
    catch {
        var key = CryptoJS.enc.Hex.parse(toHex(atob(key_b64)));
    }
    var hash = CryptoJS.HmacSHA256(to_sign, key);
    var hashInBase64 = CryptoJS.enc.Base64.stringify(hash);

    return hashInBase64;
    // document.write(hashInBase64 + '<br>');
}

function toHex(str) {
    var result = '';
    for (var i=0; i<str.length; i++) {
      if (str.charCodeAt(i).toString(16).length === 1) {
        result += '0' + str.charCodeAt(i).toString(16);
      } else {
        result += str.charCodeAt(i).toString(16);
      }
    }
    return result;
}

function processFile(file){
    /*Procesar imágenes */
    const docType = file.type;
    const validExtensions = ["image/jpeg","image/jpg","image/png","image/gif"];

    if(validExtensions.includes(docType)){
        // ARCHIVO VÁLIDO
        const fileReader = new FileReader(); // permite leer propiedades del archivo 
        const id = `file-${Math.random().toString(32).substring(7)}`;

        fileReader.addEventListener("load", (e) =>{
            
            // URL del cliente - imagen local del equipo - En base 64
            var fileUrl = fileReader.result;
            var base64result = fileReader.result.split(',')[1];

            console.log("BASE64:",base64result); // Hasta acá son iguales
           
            // Encriptamos la base64 con sha256
            var encrypted = CryptoJS.SHA256(base64result);
            console.log("SHA256:",encrypted);
            // Hash con el que se compara en la Blockchain
            encrypted = encrypted.toString();
            //console.log("HASH:",encrypted);


            //console.log("HASH:",encrypted.toString());
            //const hash = CryptoJS.SHA256(fileUrl);
            //const hash_final = sign_string(hash.toString(), "my message");
            //const hash_id = hash_final.toString();
            //console.log("HASH Final:", hash_id);
            
            
            const image = `
                <div id = "${id}" class = "file-container">
                    <img src = "${fileUrl}" alt = "${file.name}" id = "${base64result}" width = "50">
                    <div class = "status">
                        <span>${file.name}</span>
                        <span class = "status-text">
                            Loading...
                        </span>
                    </div>
                </div>
                `;
            // Agregando los campos de la imagen en el HTML
            const html = document.querySelector("#preview").innerHTML;
            document.querySelector("#preview").innerHTML = image + html;
            //console.log("URL local de la imagen:",fileUrl.split()[0]);
            console.log("HASH FINAL BASE 64:", base64result);
        });

        fileReader.readAsDataURL(file);
        uploadFile(file,id);
    }else{
        // NO ES UN ARCHIVO VÁLIDO
        alert("No es una archivo válido");
    }
}


function uploadFile(file){
    /*Manda solicitud a un servidor remoto para poder subir nuestro archivo */
    const formData = new FormData();
    formData.append("file", file);

    try{
        /* Aquí se debe poder obtener el Hash de cada una de las imagenes para poder compararlos con
        los hash existentes registrados en la Blockchain */

        // 1. Obtenemos el Hash de la imagen que se está subiendo 

        // 2.


        /*const response = await fetch("http:localhost:3000/upload",{
            method : "POST",
            body : formData,
        });

        const responseText = await response.text();
        console.log(responseText);

        document.querySelector(`#${id} .status-text`).innerHTML = `<span class = "success">Archivo subido correctamente</span>`;

        */

    } catch(error){
        document.querySelector(`#${id} .status-text`).innerHTML = `<span class = "failure">El archivo no pudo subirse</span>`;
    }

}

