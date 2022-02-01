// SPDX-License-Identifier: MIT
pragma solidity ^0.8.6;

contract CertificadosContract{ 

    uint public certificadoCounter = 0; 

    constructor(){
        createCertificado("Huayta", "Guerrero", "73176898", "Renzo", "Python", "15", "Sistemas UNI", "", "", "APROBADO", "11/30/2021-12/11/2021");
    } 

    // event especifica lo que se va devolver cuando se cree una tarea
    event CertificadoCreated(
        uint id,
        string ap_materno,
        string ap_paterno,
        string dni,
        string nombres,
        string nomb_curso,
        string nota,
        string institucion,
        string link,
        string hash_image,
        string condicion,
        string fecha_inicio_fin
    );

    // struct es crear un nuevo tipo de dato
    struct Certificado {
        uint256 id;
        string ap_materno;
        string ap_paterno;
        string dni;
        string nombres;
        string nomb_curso;
        string nota;
        string institucion;
        string link;
        string hash_image;
        string condicion;
        string fecha_inicio_fin;
    }
    
    // mapping: conjunto de datos que tienen un par clave-valor ; clave puede ser cualquier tipo de dato
    mapping (uint256 => Certificado) public certificados; 

    function createCertificado(string memory _ap_materno, string memory _ap_paterno, string memory _dni, string memory _nombres, string memory _nomb_curso,string memory _nota,string memory _institucion, string memory _link, string memory _hash_image, string memory _condicion, string memory _fecha_inicio_fin) public{
        certificadoCounter++;
        certificados[certificadoCounter] = Certificado(certificadoCounter,_ap_materno,_ap_paterno,_dni,_nombres,_nomb_curso,_nota,_institucion,_link,_hash_image,_condicion,_fecha_inicio_fin);
        emit CertificadoCreated(certificadoCounter, _ap_materno, _ap_paterno, _dni, _nombres, _nomb_curso, _nota, _institucion, _link, _hash_image, _condicion, _fecha_inicio_fin);
    }
}
