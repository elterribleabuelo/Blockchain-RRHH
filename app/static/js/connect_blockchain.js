App = {
    init: () => { 
        console.log('Loaded'); 
        App.loadEthereum();
        App.loadContracts();
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

    // Función que sirve para que se conecte al contrato inteligente
    loadContracts: function(){
        var certificadosContractJSON = certificadosJSONFlask;
        console.log("certificadosJSONFlask en connect_blockchain:",certificadosContractJSON);
    }
}

App.init();


// https://es.stackoverflow.com/questions/492175/ocupar-json-desde-flask-hacia-un-html
// https://learntutorials.net/es/flask/topic/1789/trabajando-con-json
// https://es.stackoverflow.com/questions/333389/retornar-y-usar-formato-json-con-flask
// https://stackoverflow.com/questions/42499535/passing-a-json-object-from-flask-to-javascript
// https://www.clubdetecnologia.net/cursos/tips-de-python/uso-de-json-dumps/#:~:text=El%20m%C3%A9todo%20json.,diccionario%20se%20convierten%20en%20cadenas.
// https://www.clubdetecnologia.net/cursos/tips-de-python/uso-de-json-dumps/#:~:text=El%20m%C3%A9todo%20json.,diccionario%20se%20convierten%20en%20cadenas.
// https://es.stackoverflow.com/questions/321415/pasar-datos-del-backend-a-js
// https://www.it-swarm-es.com/es/javascript/como-puedo-pasar-datos-de-flask-javascript-en-una-plantilla/1068454066/