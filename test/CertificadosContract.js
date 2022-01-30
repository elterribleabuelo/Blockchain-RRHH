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
});