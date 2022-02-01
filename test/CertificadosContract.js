const CertificadosContract = artifacts.require("CertificadosContract");

contract("CertificadosContract",() =>{
    
    before(async() =>{ 
        // Obteniendo el contrato inteligente
        this.certificadosContract = await CertificadosContract.deployed(); 
    });

    // Describimos un testing
    it('migrate deployed successfully',async () =>{
        const address = this.certificadosContract.address;

        assert.notEqual(address,null);
        assert.notEqual(address,undefined);
        assert.notEqual(address,0x0);
        assert.notEqual(address,"");
    });

    it('get Certificados List',async () =>{ 
        const certificadosCounter = await this.certificadosContract.certificadoCounter();
        const certificado = await this.certificadosContract.certificados(certificadosCounter);

        assert.equal(certificado.id.toNumber(), certificadosCounter); 
        assert.equal(certificado.ap_materno,"Huayta");
        assert.equal(certificado.ap_paterno,"Guerrero");
        assert.equal(certificado.dni,"73176898");

    }); 

    // Comprobamos si funciona la funcion CreateCertificado 
    it('diploma create successfully',async() =>{
        const result = await this.certificadosContract.createCertificado("Rodriguez","Huayta","8563113","Monica","Excel","17","SISTEMAS UNI","https://firebasestorage.googleapis.com/v0/b/blockchain-29b1a.appspot.com/o/Fri%20Dec%2003%202021%2019%3A13%3A27%20GMT-0500%20(hora%20est%C3%A1ndar%20de%20Per%C3%BA)-background.jpg?alt=media&token=7feabd2f-e0d7-4c81-a926-3f14a278089f","36c67505d4f932178457671da0212fb615bbb4b5c588cf39788a8a815e5c2c4f","APROBADO","11/30/2021-12/11/2021");
        const certificadoEvent = result.logs[0].args;
        const certificadosCounter = await this.certificadosContract.certificadoCounter() 
        
        assert.equal(certificadosCounter,2);
        assert.equal(certificadoEvent.id.toNumber(),2);
        assert.equal(certificadoEvent.ap_materno,"Rodriguez");
        assert.equal(certificadoEvent.dni,"8563113");
        assert.equal(certificadoEvent.nomb_curso,"Excel");

    })
    
});