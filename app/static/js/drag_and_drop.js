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

}


function processFile(file){
    /*Procesar imágenes */
    const docType = file.type;
    const validExtensions = ['image/jpeg','image/jpg','image/png','image/gif'];

    if (validExtensions.includes(docType)){
        // ARCHIVO VÁLIDO

    }else{
        // NO ES UN ARCHIVO VÁLIDO
        alert("No es una rchivo válido");
    }

}


