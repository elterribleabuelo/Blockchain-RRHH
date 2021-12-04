/************ Ocultamos el boton para buscar los archivos ***************/
document.addEventListener("DOMContentLoaded", function(e) {

    (function(){
        document.getElementById("buscar").style.visibility = "hidden"; // oculto
    }());
    
    // Variables
    
    const dropArea = document.querySelector(".drop-area");
    const dragText = dropArea.querySelector("h2");
    const button = dropArea.querySelector("button");
    const input = dropArea.querySelector("#input-file");
    var btn_buscar = document.getElementsByClassName("btn btn-success");
    let files;
    var ids = [];
    
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

        // Haciendo visible el boton buscar

        document.getElementById("buscar").style.visibility = "";
        
        /*Cuando hacemos click en el boton Buscar */
        
        //btn_buscar = document.getElementsByClassName("btn btn-success");
        
        // console.log("BOTONCITO:",btn_buscar[0]);
        
        //console.log("AQUI:",$btn_buscar);
        dropArea.classList.remove('active');
        dragText.textContent = "Arrastra y suelta las imágenes";

        // console.log("TIPO:",btn_buscar[0].type);
    });

    btn_buscar[0].addEventListener('click', (e) => {
        e.preventDefault();

        /* Llamamos a los valores del Backend que vienen desde Python - Flask (/buscar_documento) */

        // Los datos que pasamos estan en forma de objeto de Javascript

        // Guardamos la variable items_json con localStorage para poder recibirla y leerla en otra vista
        localStorage.setItem('testObject', JSON.stringify(items_json));
        
        // Guardamos los id de las imágenes los cuales son los valores del hash de la blockchain con localStorage
        localStorage.setItem('testObjectID',JSON.stringify(ids));

        // Redirigiendo a la vista final 
        setTimeout(()=> location.href = "/filtrado_CV",1000);

        /*for (var i = 0; i < items_json.length; i++){
            console.log("Desde JS:",items_json[i]['nombres']);
        }*/
        // console.log("CLICK");

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
        
    }
    
    function base64ToHex(str) {
        const raw = window.atob(str);
        let result = '';
        for (let i = 0; i < raw.length; i++) {
          const hex = raw.charCodeAt(i).toString(16);
          result += (hex.length === 2 ? hex : '0' + hex);
        }
        return result.toUpperCase();
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
               
                // Base 64 a Hexadecimal
                var hexString = base64ToHex(base64result);
    
                // Hexadecimal a SHA256
                var encrypted = CryptoJS.SHA256(hexString);
                encrypted = encrypted.toString();
    
                const image = `
                    <div id = "${id}" class = "file-container">
                        <img src = "${fileUrl}" alt = "${file.name}" id = "${encrypted}" width = "50">
                        <div class = "status">
                            <span>${file.name}</span>
                            <span class = "status-text">
                                Ok
                            </span>
                        </div>
                    </div>
                    `;
                // Añadimos los id a la variable let ids 
                ids.push(encrypted);
                // Agregando los campos de la imagen en el HTML
                const html = document.querySelector("#preview").innerHTML;
                document.querySelector("#preview").innerHTML = image + html;
                //console.log("URL local de la imagen:",fileUrl.split()[0]);
                console.log("SHA 256:", encrypted);
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

});








