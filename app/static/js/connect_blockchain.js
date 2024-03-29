App = { 
    contracts: {},
    init: async () => { 
        console.log('Loaded'); 
        await App.loadEthereum();
        await App.loadContracts();
        await App.loadAccount();
        // await App.createCertificado();
        App.render();
        await App.renderCertificado();
        await App.renderCertificadosDatatables();
        App.searchCertificado();
        await App.listaritemsJSON();
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

        try{
            var certificadosContractJSON = certificadosJSONFlask;
            console.log("certificadosJSONFlask en connect_blockchain:",certificadosContractJSON);
            
            // Guardamos el smart contract recuperado desde un objeto JSON
            App.contracts.certificadosContract = TruffleContract(certificadosContractJSON); 

            // Conectamos el contrato inteligente con Metamask 
            App.contracts.certificadosContract.setProvider(App.web3Provider); 

            // Contrato finalmente configurado - desplegado
            App.certificadosContract = await App.contracts.certificadosContract.deployed();
        }catch(error){
            console.log("Error:",error);
        }
    }, 

    // Funcion para mostrar la direccion del wallet 
    render: () => {
        try{
            document.getElementById('account').innerText = App.account;
        } catch(error){
            console.log("Error:",error);
        }
    },

    // Funcion para mostrar certificados 
    renderCertificado: async () => {
        try{
            const certificadoCounter = await App.certificadosContract.certificadoCounter();
            const certificadoCounterNumber = certificadoCounter.toNumber();
            // console.log("Counter: ",certificadoCounterNumber);
            let html = '';

            for (let i = certificadoCounterNumber; i >= 1; i--){
                const certificado = await App.certificadosContract.certificados(i);
                // console.log("CERTIFICADO:",certificado);
                const certificadoId = certificado[0];
                const certificado_ap_materno = certificado[1];
                const certificado_ap_paterno = certificado[2];
                const certificado_dni = certificado[3];
                const certificado_nombres = certificado[4];
                const certificado_nombre_curso = certificado[5];
                const certificado_nota = certificado[6];
                const certificado_institucion = certificado[7];
                const certificado_link = certificado[8];
                const certificado_hash = certificado[9];
                const certificado_condicion = certificado[10];
                const certificado_fecha_inicio_fin = certificado[11]; 

                let certificadoElement = ` 

                    <div class = "card text-white bg-primary mb-3" style="max-height:22rem; max-width: 30rem; width:  350px;height: 400px; float: right;right: -70%;margin-right: 600px;">
                        <div class="card-header"> Bloque:${certificadoId} <p align = "right"><i class="fas fa-check"></i></p></div>
                        <div class="card-body">
                            <p class="card-text" style = "font-size:12px; color:rgb(255, 255, 255);">Nombres:${certificado_nombres}</p>
                            <p class="card-text" style = "font-size:12px; color:rgb(255, 255, 255);">Apellidos:${certificado_ap_paterno} ${certificado_ap_materno} </p>
                            <p class="card-text" style = "font-size:12px; color:rgb(255, 255, 255);">DNI:${certificado_dni}</p>
                            <p class="card-text" style = "font-size:12px; color:rgb(255, 255, 255);">CURSO:${certificado_nombre_curso}</p>
                            <p class="card-text" style = "font-size:12px; color:rgb(255, 255, 255);">Fechas:${certificado_fecha_inicio_fin}</p>
                            <p class="card-text" style = "font-size:12px; color:rgb(255, 255, 255);">Nota:${certificado_nota}</p>
                            <p class="card-text" style = "font-size:12px; color:rgb(255, 255, 255);">Institucion:${certificado_institucion}</p>
                            <p class="card-text" style = "font-size:12px; color:rgb(255, 255, 255);">Condición:${certificado_condicion}</p>
                        </div>
                    </div>
                `;
                html += certificadoElement;
            }

            document.querySelector("#certificadosList").innerHTML = html;
        } catch(e){
            console.log("Error, vista registro de diplomas:",e);
        }
        
    },

    renderCertificadosDatatables: async () => {
        try{
            const certificadoCounter = await App.certificadosContract.certificadoCounter();
            const certificadoCounterNumber = certificadoCounter.toNumber();
            // console.log("Counter: ",certificadoCounterNumber);
            let html = '';
            var table = document.querySelector('#example');

            for (let i = certificadoCounterNumber; i >= 1; i--){
                const certificado = await App.certificadosContract.certificados(i);
                // console.log("CERTIFICADO:",certificado);
                const certificadoId = certificado[0];
                const certificado_ap_materno = certificado[1];
                const certificado_ap_paterno = certificado[2];
                const certificado_dni = certificado[3];
                const certificado_nombres = certificado[4];
                const certificado_nombre_curso = certificado[5];
                const certificado_nota = certificado[6];
                const certificado_institucion = certificado[7];
                const certificado_link = certificado[8];
                const certificado_hash = certificado[9];
                const certificado_condicion = certificado[10];
                const certificado_fecha_inicio_fin = certificado[11];
                var url = ""
                var icon = ""

                if (certificado_link != ''){
                    //var url = document.querySelector("button");
                     url = certificado_link;
                     icon = "fas fa-book";
                }else{
                     url = "#";
                     icon = "fas fa-times";
                }

                let certificadoElementRow = ` 

                    <tr>
                        <td>${certificado_nombres}</td>  
                        <td>${certificado_ap_paterno}</td>
                        <td>${certificado_ap_materno}</td>
                        <td>${certificado_dni}</td>
                        <td>${certificado_nombre_curso}</td>
                        <td>${certificado_nota}</td>
                        <td>${certificado_institucion}</td>
                        <td><center><a href = "${url}"><i class = "${icon}"></i></a></center></td> 
                    </tr>
                `;
                html += certificadoElementRow;
            }

            document.querySelector("#datatables_list").innerHTML = html;
        } catch(e){
            console.log("Error, solo disponible en la vista busqueda de dni:",e);
        }
    },

    searchCertificado:()=>{
        try{
            $(document).ready(function() {
            
                var table = $('#example').DataTable({
                    initComplete: function () {
                        // Apply the search
                        this.api().columns([4]).every( function () {
                            var that = this;
            
                            $( 'input', this.footer() ).on( 'keyup change clear', function () {
                                if ( that.search() !== this.value ) {
                                    that
                                        .search( this.value )
                                        .draw();
                                }
                            } );
                        } );
                    }
                });
            
            });
        }catch(e){
            console.log("Error - Solo disponible en la vista busqueda por DNI:",e)
        }
    },

    // Funcion que crea el items_json
    listaritemsJSON: async() =>{
        try{
            const certificadoCounter = await App.certificadosContract.certificadoCounter();
            const certificadoCounterNumber = certificadoCounter.toNumber();
            const items_json = new Array();

            for (let i = certificadoCounterNumber; i >= 1; i--){
                const certificado = await App.certificadosContract.certificados(i);
                const certificado_ap_materno = certificado[1];
                const certificado_ap_paterno = certificado[2];
                const certificado_dni = certificado[3];
                const certificado_nombres = certificado[4];
                const certificado_nombre_curso = certificado[5];
                const certificado_nota = certificado[6];
                const certificado_institucion = certificado[7];
                const certificado_link = certificado[8];
                const certificado_hash = certificado[9];
                const certificado_condicion = certificado[10];
                const certificado_fecha_inicio_fin = certificado[11];
                
                items_json.push({
                    ap_materno:certificado_ap_materno,
                    ap_paterno:certificado_ap_paterno,
                    dni:certificado_dni,
                    nombres:certificado_nombres,
                    curso:certificado_nombre_curso,
                    nota:certificado_nota,
                    institucion:certificado_institucion,
                    link:certificado_link,
                    hash_image:certificado_hash,
                    condicion:certificado_condicion,
                    fecha_inicio_fin:certificado_fecha_inicio_fin
                })
            }
            localStorage.setItem('testObject', JSON.stringify(items_json));
            // console.log("Items_json : ",items_json);
        } catch(e){
            console.log("Error, solo disponible en la vista busqueda de dni : ",e);
        } 
    },

    // Funcion para crear certificados 
    createCertificado: async (ap_materno,ap_paterno,dni,nombres,nomb_curso,nota,institucion,link,hash_image,condicion,fecha_inicio_fin) => {
        const result = await App.certificadosContract.createCertificado(ap_materno,ap_paterno,dni,nombres,nomb_curso,nota,institucion,link,hash_image,condicion,fecha_inicio_fin,{
            from: App.account
        });
        console.log(result.logs[0].args);
        // Redirigimos al home
        window.location.href = "/panel_admin_centro";

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