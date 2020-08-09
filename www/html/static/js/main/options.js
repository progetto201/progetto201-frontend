/** 
 * Script che definisce componente Vue con la pagina delle impostazioni
 * 
 * @since 01_01
 * @author Stefano Zenaro (https://github.com/mario33881)
 * @license MIT
*/

const Options = {
    name: "options", // nome componente
    template: `
    <div class="container">
        
        <!-- Container con titolo e pulsante per tornare indietro -->
        <div class="row mb-0">
            <div class="col-sm-12 col-sm-offset-2 ">
                <div class="panel panel-primary ">
                    <div class="panel-heading">
                        <div class="center-text-vert">
                            <router-link to="/" class="btn btn-sm align-left mb-0 bg-color" style="text-align: center;justify-content: center;align-items: center;display: flex;"> < </router-link>
                            <h1 class="text-container title center"> Opzioni </h1>   
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
        <hr>
        
        <!-- Sezione con opzioni timestamp grafici -->
        <h4 class="text-container"> Visualizzazione grafici</h4>
        
        <!-- container che spiega cosa si puo' fare in questa sezione -->
        <div class="container text-center">
            <!-- Qui vengono visualizzati tutti i messaggi errori/successo, ecco cosa viene creato con JS: -->
            <!-- <div id="alerts-container" class="fade show text-center" role="alert"></div> -->

            <span id="title"></span>
                                        
            <!-- testo -->
            <p>Da qui puoi selezionare quale parte di dati visualizzare nei grafici:</p>
            <ul>
                <li>Scegli se voler visualizzare tutti i dati o solo una parte</li>
                <li>se si vuole visualizzare una parte, selezionare date e tempi di limitazione</li>
            </ul>
        </div>

        <!-- container switch -->
        <div class="container text-center">
            <!-- Switch -->
            <div class="switch">
                <label>
                    Tutto
                        <input v-on:click="isswitched = !isswitched" id="mySwitch" type="checkbox">
                        <span class="lever"></span>
                    Parziale
                </label>
            </div>
        </div>

        <!-- Container con i datepicker e timepicker -->
        <div v-show="isswitched" class="container">
            <!-- Data iniziale -->
            <h3>Da:</h3>
                    
            <!-- Selezione giorno-->
            <div class="md-form">
                <input type="text" id="fromdate" class="form-control datepicker" v-on:change="fromdate=$event.target.value">
                <label for="fromdate">Seleziona giorno</label>
            </div>

            <!-- Selezione ore minuti -->
            <div class="md-form" style="touch-action: none;">
                <input type="text" id="fromtime" class="form-control timepicker" v-on:change="fromtime=$event.target.value">
                <label for="fromtime">Seleziona ore/minuti</label>
            </div>

            <!-- Data finale -->
            <h3>A:</h3>
                                        
            <!-- Selezione giorno-->
            <div class="md-form">
                <input type="text" id="todate" class="form-control datepicker" v-on:change="todate=$event.target.value">
                <label for="todate">Seleziona giorno</label>
            </div>

            <!-- Selezione ore minuti -->
            <div class="md-form" style="touch-action: none;">
                <input type="text" id="totime" class="form-control timepicker" v-on:change="totime=$event.target.value">
                <label for="totime">Seleziona ore/minuti</label>
            </div>

        </div>

        <!-- container con pulsante submit timestamp -->
        <div class="container text-center">
            <button id="submit" type="button" class="btn bg-color">Conferma modifiche</button>
        </div>

        <!-- Fine sezione timestamp -->

        <hr>

        <!-- Sezione colore UI -->

        <h4 class="text-container">Colore interfaccia</h4>
        <span id="colortitle"></span>

        <p class="text-center"> Premi sul quadrato per selezionare il colore da usare per l'interfaccia</p>
        
        <!-- Container quadrati con i colori selezionabili -->
        <div class="container">
            <div class="row">
                <div v-for="color in colors" style="" class="col-2">
                    <div v-on:click="sendColor(color.color_name)" class="square" v-bind:style="{ 'background-color': color.color_hex }">
                        <div class="content">{{ checkScreen(color.color_name) }}</div>
                    </div>
                </div>
            </div>
        </div>

        <!-- container pulsante che mostra altri colori -->
        <div class="container text-center">
            <button id="submit" type="button" v-on:click="moreColors" class="btn bg-color">Mostra altri colori</button>
        </div>
        
        <!-- Fine sezione colore UI -->

        <hr>

        <!-- Sezione selezione planimetria -->

        <h4 class="text-container">Tipo planimetria</h4>
        <p class="text-center"> Premi sulla planimetria che vorresti nella pagina principale</p>
        <div class="row">
            <div v-for="(map, index) in maps" v-bind:class="mapclass(map)">
                <div v-on:click="sendmap(map)" v-html="mapcontent(map)"></div>
            </div>
        </div>
        
        <!-- Fine sezione selezione planimetria -->
        
        <hr>

        <h4 class="text-container">Dati planimetria</h4>
        <p class="text-center">Modifica il contenuto della planimetria. Ricordati di cliccare sul pulsante "Salva" per apportare le modifiche</p>
        
        <div class="container">
            <div class="btn" @click="makeArea(true)" >Aggiungi area</div>
            <div class="btn" @click="makeReading(true)">Aggiungi lettura sensore</div>
            <div class="btn" @click="makeText(true)">Aggiungi testo</div>
        </div>

        <div class="container">

            <div id="opt-floorplan" ref="floorplan">
                <div id="hiddenlayer" ref="hiddenlayer" class="box stack-top"></div>
            </div>
            
        </div>

        <br>

        <div class="container" v-show="lastClicked!=null">

            <div id="changes-btns-div" class="container">
                <p> Hai selezionato l'elemento <span id="selected">{{lastClicked}}</span></p>
            
            
                <div class="btn" style="background-color: red;" @click="removeEl" id="remove">Rimuovi</div>
                <div class="btn" style="background-color: blue;" @click="changeEl($event)" id="change">Modifica</div>
                <div class="btn" style="background-color: orange;" @click="changeSave">Salva</div>

            </div>

            <br>

            <div id="changes-div" class="container">
              
              <div id="change-text-div" style="display:none">
                <p> Modifica testo:</p>
                <input type="text" id="change-text" @keyup="updateText"> 
              </div>
            
              <div id="change-id-div" style="display:none">
                <p>Modifica id:</p>
                <input type="text" id="change-id" @keyup="updateId">
              </div>
            
              <div id="change-width-div" style="display:none">
                <p>
                    Modifica lunghezza:
                </p>
                <div class="d-flex">
                    <input type="text" id="change-width" @input="updateWidth"> <div class="btn" @click="addWidth">+</div> <div class="btn" @click="subWidth">-</div>
                </div>
              </div>

              <div id="change-height-div" style="display:none">
                <p>Modifica altezza:</p>
                <div class="d-flex">
                    <input type="text" id="change-height" @keyup="updateHeight"> <div class="btn" @click="addHeight">+</div> <div class="btn" @click="subHeight">-</div>
                </div>
              </div>

              <div id="change-nodeid-div" style="display:none">
                <p>Modifica identificativo nodo:</p>
                <div class="d-flex">

                    <select id="change-nodeid"  @change="updateNodeid($event)" class="browser-default custom-select">
                        <option selected>Seleziona un nodo</option>
                        
                        <option v-for="data in nodes_data" v-bind:value="data.node_id">{{data.node_id}} | {{data.mac}}</option>
                    </select>
                    
                    
                </div>
              </div>

              <div id="change-nodedata-div" style="display:none">
                <p>Modifica Dato desiderato dal nodo:</p>
                <div class="d-flex">

                    <select class="browser-default custom-select" @change="updateNodedata($event)">
                        <option selected>Seleziona un dato del nodo</option>
                        
                        <option v-for="data in column_data_names" v-bind:value="data">{{data}}</option>
                    </select>
                </div>
              </div>
            </div>

        </div>

        <hr>
        
        <!-- Sezione grafico con spazio disco sistema -->
        <h4 class="text-container">Spazio disco</h4>
        
        <!-- container grafico -->
        <div class="container">
            <canvas id="diskgraph"></canvas>
        </div>
                
        <!-- Fine sezione grafico spazio disco -->

        <hr>
        
        <!-- Sezione visualizzazione RSSI -->
        <h4 class="text-container">Potenza ricevuta dai nodi</h4>
        
        <!-- tabella con RSSI-->
        <table class="table table-borderless">
            <!-- Tracciato record -->
            <thead>
                <tr>
                    <th scope="col"></th>
                    <th scope="col">Nodo</th>
                    <th scope="col">RSSI [dBm]</th>
                    <th scope="col">locazione</th>
                    <th scope="col">tipo</th>               
                </tr>
            </thead>

            <!-- Record -->
            <tbody id="rssitable">
                <tr v-for="data in nodes_data">
                    <td><span v-html="rssiimg(data.rssi)"></span></td><td>{{data.node_id}}</td><td>{{data.rssi}}</td><td>{{data.location_description}}</td><td>{{data.type_description}}</td>
                </tr>
            </tbody>
        </table>

        <!-- Fine sezione visualizzazione RSSI -->
    </div>`,
    methods: {
        addWidth: function (){
            /** 
             * Incrementa la lunghezza dell'ultimo label cliccato.
             * 
             * Ottiene la sottostringa della lunghezza dell'elemento escludendo
             * l'ultimo carattere (il simbolo percentuale "%"),
             * lo converte in numero e lo incrementa di uno, poi concatena
             * il simbolo di percentuale e lo imposta come nuova lunghezza dell'elemento
             * e come testo nell'input.
            */
            
            // seleziona la lunghezza dell'ultimo elemento cliccato 
            var oldWidth = this.lastClicked.style.width;
            // ottieni il valore escludendo "%", l'ultimo carattere della stringa
            var newWidth =  oldWidth.substring(0, oldWidth.length - 1);
            
            // converti in numero il valore, concatenalo a "%" e imposta la nuova lunghezza
            this.lastClicked.style.width = (parseInt(newWidth) + 1) + "%";
            // imposta il valore anche nell'input
            document.getElementById("change-width").value = this.lastClicked.style.width;
        },
        subWidth: function (){
            /** 
             * Decrementa la lunghezza dell'ultimo label cliccato.
             * 
             * Ottiene la sottostringa della lunghezza dell'elemento escludendo
             * l'ultimo carattere (il simbolo percentuale "%"),
             * lo converte in numero e lo decrementa di uno, poi concatena
             * il simbolo di percentuale e lo imposta come nuova lunghezza dell'elemento
             * e come testo nell'input.
            */
            var oldWidth = this.lastClicked.style.width;
            var newWidth =  oldWidth.substring(0, oldWidth.length - 1);
            
            this.lastClicked.style.width = (parseInt(newWidth) - 1) + "%";

            document.getElementById("change-width").value = this.lastClicked.style.width;
        },
        addHeight: function (){
            /** 
             * Incrementa l'altezza dell'ultimo label cliccato.
             * 
             * Ottiene la sottostringa dell'altezza dell'elemento escludendo
             * l'ultimo carattere (il simbolo percentuale "%"),
             * lo converte in numero e lo incrementa di uno, poi concatena
             * il simbolo di percentuale e lo imposta come nuova altezza dell'elemento
             * e come testo nell'input.
            */
            var oldHeight = this.lastClicked.style.height
            var newHeight =  oldHeight.substring(0, oldHeight.length - 1);
            
            this.lastClicked.style.height = (parseInt(newHeight) + 1) + "%";

            document.getElementById("change-height").value = this.lastClicked.style.height
        },
        subHeight: function (){
            /** 
             * Decrementa l'altezza dell'ultimo label cliccato.
             * 
             * Ottiene la sottostringa dell'altezza dell'elemento escludendo
             * l'ultimo carattere (il simbolo percentuale "%"),
             * lo converte in numero e lo decrementa di uno, poi concatena
             * il simbolo di percentuale e lo imposta come nuova altezza dell'elemento
             * e come testo nell'input.
            */
            var oldHeight = this.lastClicked.style.height;
            var newHeight =  oldHeight.substring(0, oldHeight.length - 1);
            
            this.lastClicked.style.height = (parseInt(newHeight) - 1) + "%";

            document.getElementById("change-height").value = this.lastClicked.style.height;
        },
        changeSave: function(){
            /**
             * Salva i label nel database.
             * 
             * Quando viene premuto il pulsante salva vengono selezionati
             * gli elementi in #hiddenlayer uno a uno.
             * 
             * Da ogni elemento vengono recuperate le proprieta',
             * viene creato l'oggetto FormData che viene utilizzato
             * per eseguire la POST request verso PHP.
            */
            var hiddenlayer_els = this.$refs.hiddenlayer.children

            // scorri gli elementi in #hiddenlayer
            for (let index = 0; index < hiddenlayer_els.length; index++) {
                const hiddenlayer_el = hiddenlayer_els[index];
                
                // seleziona le proprieta' dall'elemento
                const eltype = hiddenlayer_el.getAttribute("data-eltype");     // tipo di elemento
                const nodeid = hiddenlayer_el.getAttribute("data-nodeid");     // id del nodo
                const nodedata = hiddenlayer_el.getAttribute("data-nodedata"); // nome campo del dato da visualizzare
                const id_user = hiddenlayer_el.getAttribute("data-id");        // id personalizzato dell'utente
                const top = hiddenlayer_el.style.top;                          // posizione elemento dall'alto
                const left = hiddenlayer_el.style.left;                        // posizione elemento da sinistra
                const width = hiddenlayer_el.style.width;                      // lunghezza elemento
                const height = hiddenlayer_el.style.height;                    // altezza elemento
                const text = hiddenlayer_el.textContent;                       // testo
                
                // recupera l'id dell'elemento nel database rimuovendo parte dell'id dell'elemento
                const n_id = hiddenlayer_el.id.replace("ontop-" + eltype + "-", "");
                
                // crea un form con le proprieta'
                var bodyFormData = new FormData();
                bodyFormData.append("id", n_id);
                bodyFormData.append("eltype", eltype);
                bodyFormData.append("nodeid", nodeid);
                bodyFormData.append("nodedata", nodedata);
                bodyFormData.append("id_user", id_user);
                bodyFormData.append("top", top);
                bodyFormData.append("left", left);
                bodyFormData.append("width", width);
                bodyFormData.append("height", height);
                bodyFormData.append("text", text);
                
                // invia i dati con una POST request
                axios.post("/api/options/planlabels.php", bodyFormData);       
            }

        },
        removeEl(){
            /**
             * Rimuove l'ultimo elemento cliccato.
             * 
             * Quando viene cliccato il pulsante "Rimuovi"
             * l'ultimo elemento cliccato viene rimosso
             * dal vettore positions, dalla pagina e da lastClicked.
            */
            
            // scorre gli elementi in positions
            for (let index = 0; index < this.positions.length; index++) {
                const element = this.positions[index];
                
                // se l'elemento e' l'ultimo elemento cliccato
                if (element.element == this.lastClicked){
                    // rimuovi da positions l'elemento
                    this.positions.splice(index, 1);
                    // cancella l'elemento dalla pagina
                    this.lastClicked.remove();
                    // resetta l'ultimo elemento cliccato
                    this.lastClicked = null;
                    
                    // crea un oggetto con l'id dell'elemento da rimuovere dal database
                    // e specifica di cancellarlo impostando "remove"
                    const eltype = element.element.getAttribute("data-eltype");
                    const n_id = element.element.id.replace("ontop-" + eltype + "-", "");
                    var bodyFormData = new FormData();
                    bodyFormData.append("id", n_id);
                    bodyFormData.append("remove", 1);

                    // invia la richiesta di rimozione e poi applica le modifiche chiamando changeSave()
                    axios.post("/api/options/planlabels.php", bodyFormData).then(res => {
                        this.changeSave();
                    });

                    break;
                }
            }
        },
        isNormalInteger: function (str) {
            /**
             * Restituisci true se <str> contiene un numero positivo.
             * @param {string} str stringa da validare
             * @returns {Boolean} true se str contiene un numero
            */
            str = str.trim();
            if (!str) {
                return false;
            }
            str = str.replace(/^0+/, "") || "0";
            var n = Math.floor(Number(str));
            return n !== Infinity && String(n) === str && n >= 0;
        },
        updateText: function(){
            /**
             * Aggiorna il testo dell'ultimo elemento cliccato
             * impostandolo uguale al testo nell'input.
            */
            if (boold){
                console.log("updating text to: " +  document.getElementById("change-text").value);
            }
            
            this.lastClicked.textContent = document.getElementById("change-text").value;
        },
        updateWidth: function(){
            /**
             * Cerca di validare il valore di lunghezza.
             * 
             * Sarebbe piu' adatto utilizzare un watcher per verificare
             * quando viene modificato il valore e:
             * - se il nuovo valore e' valido, utilizzalo ( da 0% a 100% )
             * - se e' "accettabile" adattalo (esempio: e' un numero da 0 a 100 senza "%")
             * - se non e' valido, imposta il vecchio valore
             * > Documentazione dei watcher: https://vuejs.org/v2/guide/computed.html#Watchers
            */
            
            var changewidth_el = document.getElementById("change-width");
            
            var changewidth_val = changewidth_el.value;

            if (this.isNormalInteger(changewidth_val)){

                if (parseInt(changewidth_val) <= 100){
                    this.lastClicked.style.width = changewidth_val + "%";
                    changewidth_val = changewidth_el.value + "%";
                }
                else{
                    this.lastClicked.style.width = 100 + "%";
                    changewidth_el.value = 100 + "%";
                }
                   
            }
            else if (this.isNormalInteger(changewidth_val.substring(0, changewidth_val.length - 1)) && changewidth_val[changewidth_val.length - 1] == "%"){

                var no_percetage_val = changewidth_val.substring(0, changewidth_val.length - 1);
                if (parseInt(no_percetage_val) <= 100){
                    this.lastClicked.style.width = no_percetage_val + "%";
                    changewidth_val = changewidth_el.value + "%";
                }
                else{
                    this.lastClicked.style.width = 100 + "%";
                    changewidth_el.value = 100 + "%";
                }
            }
            
        },
        updateHeight: function(){
            /**
             * Cerca di validare il valore di altezza.
             * 
             * Sarebbe piu' adatto utilizzare un watcher per verificare
             * quando viene modificato il valore e:
             * - se il nuovo valore e' valido, utilizzalo ( da 0% a 100% )
             * - se e' "accettabile" adattalo (esempio: e' un numero da 0 a 100 senza "%")
             * - se non e' valido, imposta il vecchio valore
             * > Documentazione dei watcher: https://vuejs.org/v2/guide/computed.html#Watchers
            */

            var changeheight_el = document.getElementById("change-height");
            
            var changeheight_val = changeheight_el.value;

            if (this.isNormalInteger(changeheight_val)){

                if (parseInt(changeheight_val) <= 100){
                    this.lastClicked.style.height = changeheight_val + "%";
                    changeheight_val = changeheight_el.value + "%";
                }
                else{
                    this.lastClicked.style.height = 100 + "%";
                    changeheight_el.value = 100 + "%";
                }
                   
            }
            else if (this.isNormalInteger(changeheight_val.substring(0, changeheight_val.length - 1)) && changeheight_val[changeheight_val.length - 1] == "%"){

                var no_percetage_val = changeheight_val.substring(0, changeheight_val.length - 1);
                if (parseInt(no_percetage_val) <= 100){
                    this.lastClicked.style.height = no_percetage_val + "%";
                    changeheight_val = changeheight_el.value + "%";
                }
                else{
                    this.lastClicked.style.height = 100 + "%";
                    changeheight_el.value = 100 + "%";
                }
            }

        },
        makeDiv: function(type, text) {
            /**
             * Crea un div base per i label.
             * 
             * @param {string} type tipo di elemento
             * @param {string} text testo da inserire nel div
             * @returns {HTMLElement} div div creato
            */

            // crea div con id, classi, proprieta' e stili di default
            var div = document.createElement("div");
            div.id = "ontop-" + type + "-" + this.counter;
            
            div.classList.value = "ontop ontop-header draggable";
        
            div.style.top = "0%";
            div.style.left = "0%";

            div.style.width = "21%";
            div.style.height = "5%";

            div.textContent = text;
            div.setAttribute("data-eltype", type);

            div.setAttribute("data-nodeid", "-1");
            div.setAttribute("data-nodedata", "-1");
            div.setAttribute("data-id", type + "-" + this.counter);

            // aggiungi l'elemento a positions per memorizzare la posizione
            // che verra' utilizzata da interact.js per impedire agli elementi di uscire
            // dall'elemento #hiddenlayer
            this.positions.push({ element : div, x: 0, y: 0});
            this.counter++;

            // nascondi pulsanti e input per modificare i label
            document.getElementById("changes-div").style.display = "none";
            document.getElementById("changes-btns-div").style.display = "none";

            document.getElementById("change-id-div").style.display = "none";
            document.getElementById("change-text-div").style.display = "none";
            document.getElementById("change-width-div").style.display = "none";
            document.getElementById("change-height-div").style.display = "none";
            document.getElementById("change-nodeid-div").style.display = "none";
            document.getElementById("change-nodedata-div").style.display = "none";

            return div;
        },
        makeText: function(t_append){
            /**
             * Crea un label di testo.
             * t_append e' true quando viene premuto il pulsante per creare il testo.
             * > e' falso quando la funzione viene richiamata da getLabels() che crea i label gia' settati nel DB
             * 
             * @param {Boolean} t_append true aggiunge l'elemento a #hiddenlayer 
             * @returns {HTMLElement} div div con testo
            */

            // crea un label di tipo testo e con testo "<template>"
            var div = this.makeDiv("text", "<template>");

            // quando viene cliccato...
            div.addEventListener("click", (e) => {
                // imposta l'ultimo elemento cliccato come l'elemento stesso
                this.lastClicked = e.target;
                // visualizza all'utente l'ultimo elemento cliccato
                document.getElementById("selected").textContent = e.target.id;
                
                // visualizza i pulsanti per modificare e cancellare l'elemento
                document.getElementById("change").style.display = "inline-block";
                document.getElementById("remove").style.display = "inline-block";
                document.getElementById("changes-div").style.display = "unset";
                document.getElementById("changes-btns-div").style.display = "unset";
                
                // imposta l'input del testo con il testo nell'elemento
                document.getElementById("change-text").value = e.target.textContent;
                // imposta l'input dell'id custom come il data-id dell'elemento
                document.getElementById("change-id").value = e.target.getAttribute("data-id");
                // imposta l'input della lunghezza con la lunghezza dell'elemento
                document.getElementById("change-width").value = e.target.style.width;
                // imposta l'input dell'altezza con l'altezza dell'elemento
                document.getElementById("change-height").value = e.target.style.height;
            });

            if (t_append) {
                this.$refs.hiddenlayer.appendChild(div);
            }

            return div;
        },
        makeArea: function(t_append){
            /**
             * Crea un label di un'area.
             * t_append e' true quando viene premuto il pulsante per creare l'area.
             * > e' falso quando la funzione viene richiamata da getLabels() che crea i label gia' settati nel DB
             * 
             * @param {Boolean} t_append true aggiunge l'elemento a #hiddenlayer 
             * @returns {HTMLElement} div div con area
            */

            // crea un label di tipo area e senza testo
            var div = this.makeDiv("area", "");

            div.addEventListener("click", (e) => {
                // imposta l'ultimo elemento cliccato e visualizza l'id all'utente
                this.lastClicked = e.target
                document.getElementById("selected").textContent = e.target.id
                
                // visualizza i pulsanti e gli elementi per apportare modifiche
                document.getElementById("change").style.display = "unset"
                document.getElementById("remove").style.display = "unset"
                document.getElementById("changes-div").style.display = "unset";
                document.getElementById("changes-btns-div").style.display = "unset";
                
                document.getElementById("change-text-div").style.display = "none";
                document.getElementById("change-nodeid-div").style.display = "none";
                document.getElementById("change-nodedata-div").style.display = "none";

                // imposta gli input con i valori attuali
                document.getElementById("change-text").value = e.target.textContent
                document.getElementById("change-id").value = e.target.getAttribute("data-id")
                document.getElementById("change-width").value = e.target.style.width
                document.getElementById("change-height").value = e.target.style.height
            });

            if (t_append) {
                this.$refs.hiddenlayer.appendChild(div)
            }

            return div
        },
        makeReading: function(t_append){
            /**
             * Crea un label di una rilevazione.
             * t_append e' true quando viene premuto il pulsante per creare la rilevazione.
             * > e' falso quando la funzione viene richiamata da getLabels() che crea i label gia' settati nel DB
             * 
             * @param {Boolean} t_append true aggiunge l'elemento a #hiddenlayer 
             * @returns {HTMLElement} div div con rilevazione
            */
            var div = this.makeDiv("reading", "<data>");

            div.addEventListener("click", (e) => {
                // quando cliccato imposta l'ultimo elemento cliccato
                // e indica all'utente l'id dell'elemento cliccato
                this.lastClicked = e.target;
                document.getElementById("selected").textContent = e.target.id;
                
                // visualizza i pulsanti e gli elementi per apportare modifiche
                document.getElementById("change").style.display = "unset";
                document.getElementById("remove").style.display = "unset";
                document.getElementById("changes-div").style.display = "unset";
                document.getElementById("changes-btns-div").style.display = "unset";

                // imposta gli input con i valori attuali
                document.getElementById("change-text").value = e.target.textContent;
                document.getElementById("change-id").value = e.target.getAttribute("data-id");
                document.getElementById("change-width").value = e.target.style.width;
                document.getElementById("change-height").value = e.target.style.height;
            })

            if (t_append) {
                this.$refs.hiddenlayer.appendChild(div);
            }

            return div;
        },

        initDraggable: function(){
            /**
             * Inizializza draggable di interact.js per permettere all'utente di
             * cambiare la posizione dei label sulla planimetria
             * trascinandoli. 
            */

            var positions = this.positions;
            var hiddenlayer = this.$refs.hiddenlayer;

            interact('.draggable').draggable({
                modifiers: [
                    interact.modifiers.restrict({
                        restriction: hiddenlayer  // mantieni le coordinate all'interno dell'elemento
                    })
                  ],
                listeners: {
                    move (event) {
                        /**
                         * Impedisci ai label di uscire dall'elemento 
                         * @param {Object} event evento
                        */

                        // controlla la posizione di ogni label
                        for (let index = 0; index < positions.length; index++) {
                            const element = positions[index];
                            
                            // verifica la posizione dell'elemento spostato
                            if (element.element == event.target){
                                // memorizza i cambiamenti di coordinate
                                element.x += event.dx;
                                element.y += event.dy;
                                
                                // ottieni la lunghezza di hiddenlayer in pixel
                                var hiddenlayerWidth = interact.getElementRect(hiddenlayer).width;
                                // ottieni la lunghezza dell'elemento in percentuale
                                var widthValue =  element.x / hiddenlayerWidth;
                                
                                // arrotonda fino a 2 numeri decimali
                                widthValue = Math.round((widthValue + Number.EPSILON) * 100) / 100;
                                
                                // ottieni l'altezza in pixel dell'hiddenlayer
                                var hiddenlayerHeight = interact.getElementRect(hiddenlayer).height;
                                // ottieni l'altezza dell'elemento in percentuale
                                var heightValue =  element.y / hiddenlayerHeight;
                                
                                // arrotonda fino a 2 numeri decimali
                                heightValue = Math.round((heightValue + Number.EPSILON) * 100) / 100
                                
                                // impedisci all'elemento di andare sotto a 0% (troppo a sinistra) e 
                                // sopra a 96% (troppo a destra) in orizzontale
                                if (widthValue * 100 < 0){
                                    event.target.style.left = "0%";
                                }
                                else if (widthValue * 100 >= 96) {
                                    event.target.style.left = "96%";
                                }
                                else{
                                    event.target.style.left = (widthValue * 100) + "%";
                                }
                    
                                // impedisci all'elemento di andare sotto a 0% (troppo in alto) e 
                                // sopra a 96% (troppo in basso) in verticale
                                if (heightValue * 100 < 0){
                                    event.target.style.top = "0%";
                                }
                                else if (heightValue * 100 >= 96) {
                                    event.target.style.top = "96%";
                                }
                                else{
                                    event.target.style.top = (heightValue * 100) + "%";
                                }
                                
                                break;
                            }
                        }
                    },
                }
            });
        },
        changeEl: function(event){
            /**
             * Quando il pulsante "Modifica" viene premuto la funzione
             * si occupa di nascondere gli input di proprieta' non necessarie
             * per quel tipo di elemento.
             * 
             * @param {Object} event evento 
             * @todo ottimizzare questi e gli altri "style.display"
            */
            
            var lastClicked_el = this.lastClicked;
            
            // visualizza gli elementi con i pulsanti e gli input
            document.getElementById("changes-btns-div").style.display = "unset";
            document.getElementById("changes-div").style.display = "unset";

            if (lastClicked_el.getAttribute("data-eltype") == "text"){
                // se e' un testo visualizza tutti gli input tranne quello
                // che permette di selezionare il nome del campo della rilevazione
                document.getElementById("change-id-div").style.display = "unset";
                document.getElementById("change-text-div").style.display = "unset";
                document.getElementById("change-width-div").style.display = "unset";
                document.getElementById("change-height-div").style.display = "unset";
                document.getElementById("change-nodeid-div").style.display = "unset";
                document.getElementById("change-nodedata-div").style.display = "none";
            }
            else if (lastClicked_el.getAttribute("data-eltype") == "area"){
                // se e' un'area visualizza tutti gli input tranne quello
                // che permette di selezionare il nome del campo della rilevazione
                document.getElementById("change-id-div").style.display = "unset";
                document.getElementById("change-text-div").style.display = "none";
                document.getElementById("change-width-div").style.display = "unset";
                document.getElementById("change-height-div").style.display = "unset";
                document.getElementById("change-nodeid-div").style.display = "unset";
                document.getElementById("change-nodedata-div").style.display = "none";
            }
            else if (lastClicked_el.getAttribute("data-eltype") == "reading"){
                // se e' una rilevazione visualizza tutti gli input 
                document.getElementById("change-id-div").style.display = "unset";
                document.getElementById("change-text-div").style.display = "unset";
                document.getElementById("change-width-div").style.display = "unset";
                document.getElementById("change-height-div").style.display = "unset";
                document.getElementById("change-nodeid-div").style.display = "unset";
                document.getElementById("change-nodedata-div").style.display = "unset";
            }
        },
        updateNodeid: function (event){
            /**
             * Quando viene modificato #change-nodeid,
             * aggiungi l'attributo selected alla opzione selezionata
             * e cerca i nomi dei campi di quel nodo
            */

            // ottieni il valore del selector
            var nodeid = event.target.value;
            var nodes_data = this.nodes_data;

            // scorri tutte le opzioni del selector per de-selezionare la vecchia selezione
            for (let index = 0; index < event.target.children.length; index++) {
                const element = event.target.children[index];
                
                if (element.getAttribute("selected") == "selected"){
                    // se l'opzione e' selezionata de-selezionala
                    element.removeAttribute("selected")
                }
            }

            // aggiungi l'attributo selected alla nuova opzione selezionata
            event.target.selectedOptions[0].setAttribute("selected", "selected")
            
            // imposta all'ultimo elemento cliccato l'id del suo nodo
            this.lastClicked.setAttribute("data-nodeid", nodeid);

            // ottieni i nomi dei campi dei dati di quel nodo
            this.column_data_names = []
            // scorri tutte le proprieta' dei nodi un nodo alla volta
            for (let index = 0; index < nodes_data.length; index++) {
                const element = nodes_data[index];
                
                if (element.node_id == nodeid){
                    // ho trovato le proprieta' del nodo selezionato, ottieni il nome dei campi dei suoi dati
                    axios.get("/api/sensors/columnnames.php?typeid=" + element.type_id).then((resp) => {
                        
                        var columns_data = resp.data.data;
                        // scorri i nomi delle colonne e aggiungili al vettore column_data_names
                        for (let index = 0; index < columns_data.length; index++) {
                            const column_data = columns_data[index];
                            var column_name = column_data.COLUMN_NAME;
                            this.column_data_names.push(column_name);
                        }
                    })
                }
                
            }
        },
        updateId: function (){
            /** 
             * Quando viene modificato l'input #change-id
             * controlla se ci sono altri elementi con il nuovo id.
             * Se e' un id unico lo applica all'ultimo elemento cliccato,
             * altrimenti impedisce all'input di cambiare valore.
            */

            // true indica che l'id e' nuovo
            var check = true;
            
            // input con l'id impostato dall'utente
            var change_id = document.getElementById("change-id");
            // valore del nuovo id
            var newid = change_id.value;

            // seleziona i label
            var ontop_els = this.$refs.hiddenlayer.children;
            
            // scorri i label, se ci sono label con l'id impostato
            // dall'utente imposta check a false
            for (let index = 0; index < ontop_els.length; index++) {
                const element = ontop_els[index];
                if (element.getAttribute("data-id") == newid){
                    check = false
                }
            }
            
            if(check){
                // l'id e' nuovo, impostalo all'ultimo elemento cliccato
                this.lastClicked.setAttribute("data-id", newid)
            }
            else{
                // l'id e' gia' utilizzato, imposta l'input con l'id attuale del label
                change_id.value = this.lastClicked.getAttribute("data-id")
            }
        },
        updateNodedata: function (event){
            /**
             * Quando l'utente vuole cambiare nome del campo della rilevazione
             * togli l'attributo selected alla vecchia opzione e aggiungilo
             * alla opzione appena selezionata
            */

            // scorri le opzioni del selector e de-selezionali tutti
            for (let index = 0; index < event.target.children.length; index++) {
                const element = event.target.children[index];
                
                if (element.getAttribute("selected") == "selected"){
                    element.removeAttribute("selected");
                }
            }

            // aggiungi l'attributo alla opzione selezionata
            event.target.selectedOptions[0].setAttribute("selected", "selected");
            // aggiungi al label il nome del campo appena selezionato
            this.lastClicked.setAttribute("data-nodedata", event.target.value);
            
        },
        showCurrentPlan: function (){
            /** 
             * Ottieni dal database il percorso della planimetria selezionata
             * dall'utente, cancella la planimetria della pagina (se presente)
             * e crea un elemento immagine con la planimetria, poi inserisce
             * l'elemento a #floorplan, il container della planimetria
            */
            
            // ottieni da PHP le proprieta' della planimetria
            axios.get("/api/plans/userplan.php").then((resp) => {
                // richiede informazioni sulla planimetria

                if (boold) {
                    console.log(resp);
                }

                // recupera il percorso del file della planimetria
                let userplan_path = resp.data.data.path;              

                // crea un elemento immagine
                var img = document.createElement("img");
                // aggiungi un id
                img.id = "floorplan_img";

                // cerca immagini in #floorplan, se presente cancellalo
                var images = this.$refs.floorplan.getElementsByTagName("img");
                if (images.length > 0){
                    images[0].remove();
                }
                
                // aggiungi il nuovo elemento a #floorplan
                this.$refs.floorplan.appendChild(img);
                
                // aggiungi il percorso del file della planimetria all'elemento
                // e fagli occupare tutto lo spazio del parent
                img.src = userplan_path;
                img.style.width = "100%";
                img.style.height = "100%";

                // dopo aver aggiunto la planimetria aggiungi i label dal DB             
                this.getLabels();
            });
        },
        getLabels: function(){
            /**
             * Ottiene le proprieta' dei label dal DB
             * e crea gli elementi sulla planimetria.  
            */

            // recupera da PHP le proprieta' dei label
            axios.get("/api/options/planlabels.php").then((res) => {
                var labels_data = res.data.data;

                // scorri le proprieta'
                for (let index = 0; index < labels_data.length; index++) {
                    const label_data = labels_data[index];
                    
                    // salva tutte le proprieta'
                    var id = label_data.id;                  // id del label
                    var eltype = label_data.eltype           // tipo del label
                    var nodeid = label_data.nodeid           // id del nodo
                    var nodedata = label_data.nodedata       // nome campo del dato relativo al nodo
                    var id_user = label_data.id_user         // id personalizzato dell'utente
                    var fromtop = label_data.fromtop         // css, distanza percentuale dell'elemento dal lato superiore della planimetria
                    var fromleft = label_data.fromleft       // css, distanza percentuale dell'elemento dal lato a sinistra della planimetria
                    var width = label_data.width             // lunghezza dell'elemento in percentuale
                    var height = label_data.height           // altezza dell'elemento
                    var textcontent = label_data.textcontent // testo contenuto nell'elemento

                    // crea i label con valori di default
                    var div = null;

                    if (eltype == "text"){
                        div = this.makeText(false);
                    }
                    else if (eltype == "area"){
                        div = this.makeArea(false);
                    }
                    else if(eltype == "reading"){
                        div = this.makeReading(false);
                    }
                    
                    if (div !== null){
                        // imposta le varie proprieta'
                        div.setAttribute("data-eltype", eltype);
                        div.setAttribute("data-nodeid", nodeid);
                        div.setAttribute("data-nodedata", nodedata);
                        div.setAttribute("data-id", id_user);

                        div.style.top = fromtop;
                        div.style.left = fromleft;
                        div.style.width = width;
                        div.style.height = height;
                        div.textContent = textcontent;
                        div.id = "ontop-" + eltype + "-" + id;
                        
                        // aggiungi al #hiddenlayer, layer trasparente sulla planimetria, il label
                        this.$refs.hiddenlayer.appendChild(div);
                    }
                }
            });
        },
        showAlert: function (t_text, t_status) {
            /** 
             * Questa funzione visualizza l'alert/messaggio con la struttura :
             * <div id="alerts-container" class="fade show text-center alert alert-<$ t_status $>" role="alert"> <$ t_text $> </div>
             * 
             * Viene creato un div con id "alerts-container", attributo "role" = "alert", 
             * classi "fade show text-center fixed-top alert" 
             * e infine una classe "alert-" + t_status che dipende dal parametro passato alla funzione
             * 
             * @param {string} t_text Testo da visualizzare nell'alert
             * @param {string} t_status Status di un'operazione, modifica colore alert
             * @example 
             * // crea elemento <div id="alerts-container" 
             * // class="fade show text-center alert alert-success" role="alert"> 
             * // questo e' un testo di prova 
             * // </div> 
             * // prima dell'elemento #title
             * showAlert("questo e' un testo di prova", "success")
             * @since 01_01 
             * @todo sostituire JQuery con javascript vanilla
            */

            alert_div = document.createElement("div"); // creo un div contenente l'alert
            alert_div.id = 'alerts-container';         // id = "alerts-container"
            alert_div.setAttribute('role', 'alert');   // role = "alert"
            alert_div.className = "fade show text-center fixed-top alert alert-" + t_status // "success" / "warning"

            alert_div.innerText = t_text; // imposta testo alert passato come parametro

            $("#title").before(alert_div); // inserisce alert prima dell'elemento "#title"

            if (t_status != "danger"){
                // non chiudere il messaggio in caso di errore (ex. se errore di connessione al DB)
                setTimeout(() => {
                    $(".alert").alert('close'); // chiudi/rimuovi alert
                }, 3000);                       // dopo 3000 millisecondi -> 3 secondi
            }
        },
        sendTimestamp: function () {
            /**
             * Manda il timestamp nelle impostazioni sul DB
             * 
             * Se isswitched e' falso significa che
             * lo switch non e' attivo, quindi l'utente vuole
             * vedere tutti i dati delle rilevazioni
             * quindi viene fatta una GET request
             * alla pagina /static/php/sendopt.php
             * con mintime = 0 e maxtime = 0.
             * 
             * Se lo switch e' attivo
             * l'utente vuole mandare un range preciso di timestamp:
             * viene ottenuto il timestamp dai datepicker
             * > Date.parse() restituisce il timestamp in millisecondi, 
             * > il risultato viene diviso per 1000
             * 
             * e i timestamp dei timepicker vengono ottenuti usando
             * la funzione timeToTimestamp() definita nello script "/static/js/timestamp/t2ts.js"
             * 
             * Il timestamp iniziale e finale vengono calcolati sommando
             * i timestamp dei datepicker e dei timepicker.
             * 
             * Viene verificato che entrambe i valori non siano nulli:
             * se sono nulli viene creato un alert con showAlert() indicando l'errore all'utente
             * 
             * Poi viene verificato che il timestamp iniziale sia minore di quello finale:
             * se non e' così vuol dire che l'utente ha invertito le date
             * e viene creato un alert di errore con showAlert()
             * 
             * Se le due condizioni sopra non sono vere viene inviata una GET request
             * a "/static/php/sendopt.php" che ha come mintime il timestamp iniziale
             * e maxtime il timestamp finale
             * 
             * @todo Gestire errori durante request
             * @since 01_01
            */

            var data = this; // salvo this dentro a data
            if (data.isswitched) {
                // switch attivo -> dati parziali
                var fromdateVal = Date.parse(data.fromdate) / 1000; // vue data "fromdate" -> timestamp [ms] -> timestamp [s]
                var fromtimeVal = timeToTimestamp(data.fromtime); // usa funzione in "/static/js/timestamp/t2ts.js" per convertire vue data "fromtime" "hh:mm tt" -> secondi

                var todateVal = Date.parse(data.todate) / 1000; // vue data "todate" -> timestamp [ms] -> timestamp [s]
                var totimeVal = timeToTimestamp(data.totime); // usa funzione in "/static/js/timestamp/t2ts.js" per convertire vue data "totime" "hh:mm tt" -> secondi

                var fromtimestamp = fromdateVal + fromtimeVal; // timestamp iniziale
                var totimestamp = todateVal + totimeVal;       // timestamp finale

                if (isNaN(fromtimestamp) || isNaN(totimestamp)) {
                    // se sono nulli -> campi non compilati
                    if (boold) {
                        console.log("Non hai inserito tutti i dati");
                    }

                    this.showAlert("Non sono stati compilati tutti i campi", "warning");
                }
                else if (fromtimestamp >= totimestamp) {
                    // data "da" dopo data "a" (ex. dal 2 febbraio 2019 al 1 gennaio 2019)
                    if (boold) {
                        console.log("fromtimestamp > totimestamp");
                    }

                    this.showAlert("Hai inserito data iniziale maggiore data finale", "warning");
                }
                else {
                    // tutto corretto, mando la richiesta
                    var bodyFormData = new FormData();
                    bodyFormData.append('mintime', fromtimestamp)
                    bodyFormData.append('maxtime', totimestamp)
                    
                    axios.post("/api/options/date.php", bodyFormData).then((resp) => {
                        if (boold) {
                            console.log("Verranno visualizzati dati parziali");
                        }

                        this.showAlert("Verranno visualizzati i dati parziali", "success");
                    })
                }

            }
            else {
                // switch non attivo -> dati completi
                var bodyFormData = new FormData();
                bodyFormData.append('mintime', 0)
                bodyFormData.append('maxtime', 0)

                axios.post("/api/options/date.php", bodyFormData).then((resp) => {
                    if (boold) {
                        console.log("Verranno visualizzati tutti i dati");
                    }

                    this.showAlert("Verranno visualizzati tutti i dati", "success");
                })
            }
        },
        goBack: function () {
            /**
             * Questa funzione aggiunge gli eventi per tornare alla pagina principale: 
             * - touch alla pagina (swipe verso sinistra)
             * 
             * > NOTA: lo swipe funziona solo al di fuori di #hiddenlayer,
             * > l'elemento che deve permettere all'utente di trascinare i label
             * > per spostarli
             * 
             * Viene richiamata da mounted()
             * @since 01_01
            */

            if (boold) {
                console.log("aggiungo il touch");
            }

            // evento swipe per tornare indietro
            var hammertime = new Hammer(document.getElementById('app'));  // oggetto Hammer su elemento #app -> tutta la pagina

            hammertime.on('swipe', function (ev) {
                /**
                 * Viene aggiunto l'evento "swipe"
                 * all'elemento legato all'oggetto Hammer (#app)
                 * 
                 * @param {object} ev oggetto con proprieta' relative all'evento
                 * @since 01_01
                */
                
                if (ev.target.parentElement.id !== "hiddenlayer"){
                    if (ev.deltaX > 100) {
                        // se lo swipe verso sinistra di 100px
                        console.log("going back")
                        window.location.href = "/#/"; // torna pagina precedente/principale
                    }
                }
            });
        },
        makeRssiTable: function () {
            /**
             * Ottiene json RSSI e lo memorizza nella variabile nodes_data in "data" del componente 
             * (se non ci sono errori di connessione al DB) 
             * 
             * La funzione esegue una GET request alla pagina
             * "/static/php/getrssi.php" per ottenere in JSON
             * i valori RSSI per ogni nodo
             * 
             * @since 01_01
            */

            axios.get("/api/sysinfos/rssi.php").then((resp) => {
                if (boold) {
                    console.log("Ho ricevuto:");
                    console.log(resp.data);
                }
                
                if (JSON.stringify(resp.data).search("<svg") != -1){
                    this.nodes_data = [];
                }
                else{
                    this.nodes_data = resp.data.data; // salva RSSI in "data"                
                }
            })
        },
        rssiimg: function (rssi) {
            /**
             * Funzione richiamata nel v-for nella sezione
             * della visualizzazione dei RSSI 
             * per cambiare immagine in base al livello di potenza del segnale
             * 
             * La funzione restituisce una stringa contenente
             * l'elemento <img> che punta al corretto documento SVG
             * e la direttiva v-html si occupa di usarlo nell'interfaccia
             * 
             * @param {integer} rssi Valore del livello di potenza del segnale ricevuto
             * @return {string} imgtag Elemento <img> con src che varia in base a rssi
             * @since 01_01
            */

            imgtag = "<img class='img-fluid' ";
            if (rssi > -60) {
                imgtag += "src='/static/img/rssi/green.svg'>";
            }
            else if (rssi > -70) {
                imgtag += "src='/static/img/rssi/light-green.svg'>";
            }
            else if (rssi > -80) {
                imgtag += "src='/static/img/rssi/yellow.svg'>";
            }
            else if (rssi > -90) {
                imgtag += "src='/static/img/rssi/red.svg'>";
            }
            else {
                imgtag += "src='/static/img/rssi/off.svg'>";
            }
            return imgtag;
        },
        spaceOnDisk: function () {
            /** 
             * Visualizza grafico dello spazio su disco
             * 
             * La funzione esegue una GET request alla pagina
             * "/static/php/diskinfo.php" per ottenere il JSON con
             * le informazioni relative allo spazio libero/occupato,
             * seleziona l'elemento che conterra' il grafico,
             * divide le unita' di misura dai valori
             * e infine viene creato con chart.js il grafico
             * a ciambella 
             * (colore rosso/rosa per spazio libero,
             *  azzurro spazio occupato,
             *  legenda che visualizza l'unita' di misura di entrambe i valori
             *  )
             * 
             * @since 01_01
             * @todo Gestire errori durante GET request
            */

            axios.get("/api/sysinfos/diskinfo.php").then((resp) => {
                if (boold) {
                    console.log("Ho ricevuto queste informazioni disco:");
                    console.log(resp.data);
                }

                // elemento con il grafico
                var ctx = document.getElementById("diskgraph");

                // valori recuperati dalla risposta
                var freespace = resp.data.data.freespace;         // spazio libero
                var occupiedspace = resp.data.data.occupiedspace; // spazio occupato

                // unita' misura
                var freespace_meas = freespace.meas_unit;
                var occupiedspace_meas = occupiedspace.meas_unit;

                // valori misurati
                var freespace_val = freespace.bytes_value;
                var occupiedspace_val = occupiedspace.bytes_value;

                var myDoughnutChart = new Chart(ctx, {
                    type: 'doughnut',
                    data: {
                        labels: ["Spazio libero: " + freespace.value + " [" + freespace_meas + "]", "Spazio occupato " + occupiedspace.value + " [" + occupiedspace_meas + "]"],
                        datasets: [{

                            data: [
                                parseFloat(freespace_val),      // converti in float lo spazio libero
                                parseFloat(occupiedspace_val)], // converti in float spazio occupato
                            backgroundColor: ["rgb(255, 99, 132)", "rgb(54, 162, 235)"] // colori spicchi grafico
                        }]
                    },
                    options: {
                        tooltips: {
                          callbacks: {
                            label: function(tooltipItem, data) {
  
                              // data.labels = labels, tooltipItem.index is the index of the hovered data
                              return data.labels[tooltipItem.index];
                            }
                          }
                        }
                    }
                });
            })
        },
        getColors: function (num) {
            /**
             * Ottiene tanti colori quanti sono specificati dal parametro num 
             * (se non ci sono errori di connessione al DB)
             * 
             * La funzione esegue una GET request per ottenere
             * il JSON con un certo numero di colori 
             * (parametro "n" indica il numero di colori desiderato)
             * 
             * Se la risposta contiene un elemento SVG significa 
             * che c'e' stato un errore di connessione al database,
             * altrimenti il JSON viene salvato nella variabile colors.
             *  
             * @param {integer|string} num numero di colori da visualizzare
             * @since 01_01
            */

            axios.get("/api/colors/colors.php?n=" + num).then(resp => {
                if (boold) {
                    console.log("Ho ricevuto questi colori:");
                    console.log(resp.data);
                }

                this.colors = resp.data.data; // salva in "data" i colori

            })
        },
        moreColors: function () {
            /** 
             * Permette di visualizzare altri 12 colori ogni volta che il pulsante viene premuto
             * 
             * La funzione incrementa di 12 la variabile "num" in "data"
             * e poi passa la variabile alla funzione getColors()
             * per ottenere quel numero di colori da visualizzare
             * nell'interfaccia
             *  
             * @see getColors(num) Definisce in "colors" il JSON con i colori selezionabili 
             * @since 01_01
            */

            if (boold) {
                console.log("Pulsante 'altri colori' premuto");
            }

            this.num = this.num + 12; // incrementa di 12 i colori da visualizzare
            this.getColors(this.num); // richiedi i colori nuovi per visualizzarli
        },
        sendColor: function (color) {
            /**
             * Un quadrato con il colore e' stato premuto -> mandalo al DB
             * 
             * La funzione esegue una GET request alla pagina "/static/php/sendcolor.php"
             * per mandare il colore selezionato dall'utente alla backend.
             * > "color" e' il nome del parametro dello script PHP
             * 
             * @since 01_01
            */

            if (boold) {
                console.log("Hai cliccato il colore ", color);
            }

            var bodyFormData = new FormData();
            bodyFormData.append('color', color);

            axios.post("/api/colors/usercolor.php", bodyFormData).then(resp => {
                if (boold) {
                    console.log("Colore inviato!");
                }

                this.getUsercolor();
                this.showAlert("Colore " + color + " impostato con successo", "success");
            });
            
        },
        checkScreen: function (color) {
            /** 
             * Controlla se lo schermo e' troppo piccolo per 
             * aggiungere il testo dentro ai riquadri 
             * 
             * @param {string} color Nome del colore
             * @return {string} color Nome del colore o ""
             * @since 01_01
            */

            var checksize = window.matchMedia("(max-width: 800px)"); // controllo se larghezza schermo < 800px 
            if (checksize.matches) {
                // se e' minore di 800px
                color = "";
            }
            return color;
        },
        getmaps: function () {
            /** 
             * Ottiene le mappe dal file e aggiunge "" per i separatori (div col-2) 
             * 
             * Per poter aggiungere nella frontend uno spazio tra una planimetria
             * e l'altra vengono aggiunte delle stringhe vuote all'interno del JSON restituito
             * 
             * @todo Gestire errori durante la GET request
             * @since 01_04 (https://github.com/mario33881/progetto_100/commit/a473a44d6d67dc67d161879192d19a8703861b3c)
            */
            axios.get("/api/plans/plans.php").then(resp => {
                if (boold){
                    console.log("Ho ricevuto queste mappe:");
                    console.log(resp.data);
                }

                maps = resp.data.data;
                i = 0;
                col = 1;
                while (i < maps.length){
                    if (col == 2){
                        maps.splice(i, 0, "");
                    }

                    col++
                    
                    if (col > 3){
                        col = 1;
                    }
                    i++
                }
                if (boold){
                    console.log("Mappe con separatori:");
                    console.log(maps);
                }
                
                this.maps = maps;
            })
        },
        mapclass : function (map){
            /**  
             * Gestisce la classe della mappa, se map == "" (separatore),
             * la classe e' 'col-2', altrimenti 'col-5' e 'text-center'
             * 
             * La funzione getmaps() si e' occupata di aggiungere
             * stringhe vuote al JSON per creare una colonna che separa
             * due planimetrie.
             * 
             * @param {object|string} map Stringa vuota o oggetto contenente informazioni planimetria
             * @return {string} mapclass Classe del div che conterra' la planimetria e il suo nome
             * @since 01_04 (https://github.com/mario33881/progetto_100/commit/a473a44d6d67dc67d161879192d19a8703861b3c)
            */
            
            mapclass = 'col-2';  // se map e' "", serve colonna di 2/12 che separa le planimetrie
            
            if (map != ""){
                mapclass = 'col-5 text-center';  // altrimenti serve una colonna di 5/12 per contenere la planimetria
            }
            return mapclass;

        },
        mapcontent: function (map){
            /** 
             * Gestisce il contenuto del div delle mappe
             * Se map != "" il contenuto e' un div che ha un paragrafo con il nome del file
             * e img con la mappa,
             * 
             * altrimenti il div viene lasciato vuoto
             * 
             * @param {object|string} map Stringa vuota o oggetto contenente informazioni planimetria
             * @return {string} div Stringa vuota o contenente il div con il nome della planimetria e un <img> con src corretto
             * @since 01_04 (https://github.com/mario33881/progetto_100/commit/a473a44d6d67dc67d161879192d19a8703861b3c)
            */

            div = ""
            if (map != ""){
                div = '<div> <p>' + map.name + '</p> <img id="' + map.name + 'plan" class="img-fluid" src="' + map.path + '"></div>';
            }
            
            return div
        },
        sendmap: function (map){
            /**
             * Gestisce click/touch delle mappe
             * quando una mappa viene premuta viene effettuata una get request
             * per salvare nel database la scelta dell'utente
             * 
             * @param {string} map Nome planimetria
             * @todo Gestire eventuali errori da PHP
             * @since 01_04 (https://github.com/mario33881/progetto_100/commit/a473a44d6d67dc67d161879192d19a8703861b3c)
            */

           var bodyFormData = new FormData();
           bodyFormData.append('name', map.name);
            axios(
                {
                    method: 'post',
                    url: "/api/plans/userplan.php", 
                    data: bodyFormData
                }
            ).then((e) => {
                this.showCurrentPlan();
            });
            this.showAlert("Hai selezionato la mappa '" + map.name + "'", "success");
        },
        getUsercolor: function(){
            /**
             * Ottieni dal DB il colore della UI,
             * impostalo nell'oggetto store e poi richiama customCssSwitch()
            */
            axios.get("/api/colors/usercolor.php").then((resp) => {
                store.setMessageAction(resp.data.data.color_hex)
                this.customCssSwitch(resp.data.data.color_hex)
            })
        },
        customCssSwitch: function(hex){
            /** 
             * Imposta le variabili CSS con il colore della UI
            */

            // seleziona stile di <html>
            var style = document.querySelector(':root').style;
            // set variabile --uc il colore della UI
            style.setProperty('--uc', hex);
            // set variabile --ucdark10 al colore della UI scurito del 10%
            style.setProperty('--ucdark10', adjustBrightness(hex, 10, true));
            // set variabile --ucdark15 al colore della UI scurito del 15%
            style.setProperty('--ucdark15', adjustBrightness(hex, 15, true));
            // set variabile --uclight10 al colore della UI schiarito del 10%
            style.setProperty('--uclight10', adjustBrightness(hex, 10, false));
        }
    },
    mounted: function () {
        /**
         * Quando viene caricato il componente vengono definiti il colore della UI
         * e altre variabili CSS usando la funzione getUsercolor() e customCssSwitch(), poi
         * viene richiamata la funzione showCurrentPlan per visualizzare la planimetria
         * attuale e viene inizializato interact.js con la funzione initDraggable(). 
         * 
         * Poi viene chiamata la funzione getColors passandogli il parametro num (6 in origine):
         * la variabile colors contiene il JSON che verra' usato per visualizzare i colori
         * selezionabili dall'utente.
         * 
         * Poi viene richiamata la funzione goBack() per permettere all'utente
         * di tornare alla pagina principale premendo il pulsante 
         * o facendo uno swipe.
         * 
         * Vengono inizializzati i datepicker e i timepicker,
         * e gli viene aggiunto l'evento "change" per riconoscere
         * quando l'utente seleziona/modifica un input.
         * 
         * Viene aggiunto l'evento click sul pulsante per confermare
         * le modifiche del timestamp per poter richiamare sendTimestamp()
         * 
         * Viene richiamata la funzione makeRssiTable()
         * per ottenere (e mantenere aggiornato con setInterval)
         * il JSON con le informazioni dei RSSI dei nodi,
         * verra' memorizzato nella variabile nodes_data.
         * 
         * Viene richiamata la funzione spaceOnDisk() che crea
         * il grafico con lo spazio libero/occupato sul disco di sistema
         * 
         * e infine viene richiamata la funzione getmaps()
         * per ottenere il JSON relativo alle planimetrie selezionabili
         * dall'utente: verranno memorizzate nella variabile maps
         * e usate nella frontend  
         * 
        */

        // ottieni colore UI e configura le variabili CSS
        if (store.state.usercolor == ""){
            this.getUsercolor();
        }
        else {
            this.customCssSwitch(store.state.usercolor)
        }

        // visualizza la planimetria attuale per i label
        this.showCurrentPlan();
        // inizializza interact.js per permette di trascinare i label
        this.initDraggable();
        
        this.getColors(this.num); // ottieni i 6 colori iniziali
        this.goBack(); // imposto il touch

        // inizializzo i calendari
        var datepickerelems = document.querySelectorAll('.datepicker');
        var instances = M.Datepicker.init(datepickerelems);

        // inizializzo gli "orologi"
        var timepickerelems = document.querySelectorAll('.timepicker');
        var instances = M.Timepicker.init(timepickerelems);

        // salva la funzione sendTimestamp
        var sender = this.sendTimestamp;

        var sendbtn = document.getElementById("submit"); // seleziona tasto submit
        sendbtn.addEventListener("click", sender);       // esegui funzione sendTimestamp quando avviene click su tasto submit

        var rssiupd = this.makeRssiTable; // salvo la funzione per ottenere RSSI
        rssiupd();                        // imposto RSSI 
        this.intervalsId.push(setInterval(rssiupd, 10000));      // richiama la funzione per aggiornare RSSI ogni 10 secondi (aspetta 10 secondi -> richiama)

        this.spaceOnDisk(); // aggiunge grafico con spazio rimanente su disco

        this.getmaps(); // ottiene il json con le mappe

    },
    data: function () {
        /**
         * Restituisce oggetto con le variabili del componente
         * @return {object} Oggetto contenente le variabili del componente
         */
        return {
            isswitched: false, // switch attivo o no?
            fromdate: "",      // calendario da
            fromtime: "",      // orologio da
            todate: "",        // calendario a
            totime: "",        // orologio a
            nodes_data: null,  // json con RSSI e altre proprieta' dei nodi
            colors: null,      // json con colori
            maps: null,        // json con mappe
            num: 6,            // numero colori da visualizzare

            // LABEL
            lastClicked: null,     // ultimo elemento cliccato dei label
            counter: 1,            // contatore per creare nuovi label
            positions: [],         // contiene elementi e relative coordinate dei label
            column_data_names: [], // nomi dei campi del nodo selezionato

            intervalsId: [],    // contiene id dei setInterval() per poterli fermare
            state: store.state, // contiene colore della UI
        }
    },
    beforeRouteLeave (to, from, next) {
        /**
         * Termina i loop impostati con setInteval() quando viene cambiata la route.
        */

        // scorri tutti gli id di setInterval() e terminali uno a uno 
        for (let i = 0; i < this.intervalsId.length; i++) {
            const element = this.intervalsId[i];;
            clearInterval(element);
        }

        // passa alla nuova route
        next();
    }
}