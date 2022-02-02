App = { 
    contracts: {},
    init: async () => { 
        console.log('Loaded'); 
        await App.loadEthereum();
        await App.loadContracts();
        await App.loadAccount();
        // App.createCertificado();
        App.render();
        await App.renderCertificado();
    }, 

    loadEthereum: async () => {
        
        if (window.ethereum){
            App.web3Provider = window.ethereum;
            await window.ethereum.request({method: 'eth_requestAccounts'});
        } else if(window.web3){
            web3 = new Web3(window.web3.currentProvider)
        } 
        
        else {
            console.log('No ethereum browser is installed.Try it installing Metamask');
        }
    }, 

    loadAccount: async() =>{
        const accounts = await window.ethereum.request({method: 'eth_requestAccounts'});
        App.account = accounts[0];
        console.log("Cuenta conectada de la Wallet:",accounts);
    },

    // Función que sirve para que se conecte al contrato inteligente
    loadContracts: async () => {
        var certificadosContractJSON = certificadosJSONFlask;
        console.log("certificadosJSONFlask en connect_blockchain:",certificadosContractJSON);
        
        // Guardamos el smart contract recuperado desde un objeto JSON
        App.contracts.certificadosContract = TruffleContract(certificadosContractJSON); 

        // Conectamos el contrato inteligente con Metamask 
        App.contracts.certificadosContract.setProvider(App.web3Provider); 

        // Contrato finalmente configurado - desplegado
        App.certificadosContract = await App.contracts.certificadosContract.deployed();
    }, 

    // Funcion para mostrar la direccion del wallet 
    render: () => {
        document.getElementById('account').innerText = App.account;

    },

    // Funcion para mostrar certificados 
    renderCertificado: async () => {
        const certificadoCounter = await App.certificadosContract.certificadoCounter();
        const certificadoCounterNumber = certificadoCounter.toNumber();
        console.log("Counter: ",certificadoCounterNumber);

    },

    // Funcion para crear certificados 
    createCertificado: async (ap_materno,ap_paterno,dni,nombres,nomb_curso,nota,institucion,link,hash_image,condicion,fecha_inicio_fin) => {
        const result = await App.certificadosContract.createCertificado(ap_materno,ap_paterno,dni,nombres,nomb_curso,nota,institucion,link,hash_image,condicion,fecha_inicio_fin,{
            from: App.account
        });
        console.log(result.logs[0].args);
        // 2:47
    }
}

// https://es.stackoverflow.com/questions/492175/ocupar-json-desde-flask-hacia-un-html
// https://learntutorials.net/es/flask/topic/1789/trabajando-con-json
// https://es.stackoverflow.com/questions/333389/retornar-y-usar-formato-json-con-flask
// https://stackoverflow.com/questions/42499535/passing-a-json-object-from-flask-to-javascript
// https://www.clubdetecnologia.net/cursos/tips-de-python/uso-de-json-dumps/#:~:text=El%20m%C3%A9todo%20json.,diccionario%20se%20convierten%20en%20cadenas.
// https://www.clubdetecnologia.net/cursos/tips-de-python/uso-de-json-dumps/#:~:text=El%20m%C3%A9todo%20json.,diccionario%20se%20convierten%20en%20cadenas.
// https://es.stackoverflow.com/questions/321415/pasar-datos-del-backend-a-js
// https://www.it-swarm-es.com/es/javascript/como-puedo-pasar-datos-de-flask-javascript-en-una-plantilla/1068454066/