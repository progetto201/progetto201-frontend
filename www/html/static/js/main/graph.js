/** 
 * Script che definisce componente Vue con la pagina dei grafici
 * 
 * @since 01_01
 * @author Stefano Zenaro (https://github.com/mario33881)
 * @license MIT
 * @todo Aggiungere un riscontro anche in caso la GET request per le rilevazioni non abbia successo
*/

const Graph = {
    name: "graph", // nome componente
    template:`
    <div style="overflow: hidden;">
        <!-- Titolo grafico temperatura + Pulsante per tornare indietro -->
        <div class="row mb-0">
            <div class="col-sm-12 col-sm-offset-2">
                <div class="panel panel-primary">
                    <div class="panel-heading">
                        <div class="center-text-vert">
                            <button type="button" id="backbutton" class="btn btn-sm align-left mb-0 bg-color" v-bind:style="{ backgroundColor: state.usercolor}" style="color: white"> < </button>
                            <h2 class="text-container title center"> Grafici {{location}} (nodo: {{ this.$route.params.nodeid }})</h2>   
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div id="graphs" ref="graphs"> </div>

    </div>`,
    props: ["nodeid"], // proprieta', id del nodo
    methods: {
        TimestampToDate: function (timestamp) {
            /** 
            * Questa funzione converte il timestamp passato come parametro in data "umana" americana
            *
            * @param {integer} timestamp Timestamp con unita' di misura in secondi
            * @return {string} dformat Data in formato "MM/DD/YYYY hh:mm"
            * @since 01_01
            */


            Number.prototype.padLeft = function (base, chr) {
                /** 
                 * aggiunge tanti chr (o "0") a sinistra quanti indica "l'esponente" di base (default "10" -> xx)
                 * (es. 6 minuti -> 06)
                 * 
                 * @param {integer} base numero 10^(x + 1) che indica quanti chr mettere davanti al numero
                 * @param {string} chr carattere da aggiungere a sinistra del numero
                 * @return {string} padded_string Stringa contenente numero avente a sinistra x + 1 "chr" (base = 10^(x+1)) 
                 *   
                 * @example 
                 * // restituisce "01"
                 * (1).padLeft()
                 * @example
                 * //restituisce "002"
                 * (2).padLeft(100)
                 * @example
                 * //restituisce "xx3"
                 * (3).padLeft(100, "x")
                 * @since 01_01
                */
                
                var len = (String(base || 10).length - String(this).length) + 1;
                var padded_string = len > 0 ? new Array(len).join(chr || '0') + this : this;
                return padded_string;
            }


            var d = new Date(timestamp * 1000)  // conversione timestamp a data ( timestamp [s] -> [ms] )
                
            var dformat = [(d.getMonth() + 1).padLeft(),  // getMonth()    ottiene mese   ( .padLeft() due digit, mm)
                d.getDate().padLeft(),                    // getDate()     ottiene giorno ( .padLeft() due digit, dd)
                d.getFullYear()].join('/') +              // getFullYear() ottiene anno e questi vengono uniti da '/' -> mm/dd/yyyy
                    ' ' +                                 // aggiungi spazio tra data e ore
                    [d.getHours().padLeft(),              // getHours()    ottiene ore ( .padLeft() due digit, hh)
                    d.getMinutes().padLeft()].join(':');  // getMinutes()  ottiene minuti e questi vengono uniti da ':' -> hh:mm 

            return dformat; // risultato finale "MM/DD/YYYY hh:mm"
        },
        goBack: function () {
            /**
             * Questa funzione aggiunge gli eventi per tornare alla pagina principale: 
             * - clic del pulsante #backbutton 
             * - touch alla pagina (swipe verso sinistra)
             * 
             * Viene richiamata da mounted()
             * 
             * @since 01_01
            */

            if (boold) {
                console.log("aggiungo il touch");
            }

            // Evento pulsante per tornare indietro
            var backbutton = document.getElementById("backbutton");  // seleziona pulsante

            backbutton.addEventListener("click", function () {       // aggiungi evento "click"
                /* Torna alla pagina principale */
                window.location.href = "/#/";                        // che torna alla home
            })
            
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
                
                if (boold) {
                    console.log("Delta X: ", ev.deltaX);
                }

                if (ev.deltaX < -100) {
                    // se lo spostamento dal punto iniziale al punto finale e' < -100 (swipe a sinistra)...
                    window.location.href = "/#/"; // torna alla pagina precedente
                }
            });
        },
        getGraphColor: function () {
            /** 
             * Restituisce vettore con i 3 componenti (r, g e b) del colore della UI (verra' usato per colorare i grafici).
             * 
             * Viene richiamata da makeGraph() che usa i 3 componenti per colorare i grafici
             * 
             * @return {Array.<integer, integer, integer>} rgb Array con i colori della UI
             * @since 01_01
            */

            // ottieni il colore dall'oggetto store
            var usercolor = store.state.usercolor;
            
            // recupera i valori r, g e b dal formato esadecimale #RRGGBB
            var rgb_vals = hexToRgb(usercolor);
            
            // crea il vettore da restituire
            var rgb = [rgb_vals.r, rgb_vals.g, rgb_vals.b]

            if (boold) {
                console.log("Colori ottenuti dall'elemento");
                console.log(rgb);
            }

            return rgb;
        },
        makeGraph: function (tstamp, data, element){
            /**
             * Crea un grafico con asse x i valori in <tstamp>, i valori di <data> in asse y e nell'elemento <element>.
             * 
             * La funzione ottiene da getGraphColor() i colori della UI, crea un oggetto con i dati da utilizzare nel grafico
             * e i colori del grafico e poi crea un oggetto Chart, il grafico stesso, lo mantiene aggiornato e infine restituisce l'oggetto.
             * 
             * @param {Array} tstamp vettore di timestamp, asse x grafico
             * @param {Array} data vettore con dati, asse y grafico
             * @param {HTMLElement} element elemento canvas in cui creare il grafico
             * @return {Object} graph oggetto con il grafico
            */
            var rgb = this.getGraphColor(); // ottengo colore per grafici

            var chartdata = {
                labels: tstamp, // timestamp asse x
                datasets: [{
                    backgroundColor: 'rgba(' + rgb[0] + ',' + rgb[1] + ',' + rgb[2] + ', 0.75)',    // colore sfondo grafico
                    borderColor: 'rgba(' + rgb[0] + ',' + rgb[1] + ',' + rgb[2] + ', 0.75)',        // colore bordo del grafico
                    hoverBackgroundColor: 'rgba(' + rgb[0] + ',' + rgb[1] + ',' + rgb[2] + ', 1)',  // colore sfondo on hover ("passandoci sopra")
                    hoverBorderColor: 'rgba(' + rgb[0] + ',' + rgb[1] + ',' + rgb[2] + ', 1)',      // colore bordo on hover  ("passandoci sopra")
                    data: data // dati asse y
                }],
            };

            // creo oggetto grafico
            var graph = new Chart(element, { // nel canvas <element> creo grafico
                type: 'line',     // tipo "linea"
                data: chartdata,  // dati da visualizzare
                options: {
                    responsive: true,           // si adatta allo schermo
                    maintainAspectRatio: true,  // rispetta altezza del div contenente il canvas
                    legend: {
                        display: false // Toglie la legenda ( non visualizza informazioni utili... )
                    },
                    tooltips: {
                        callbacks: {
                            label: function (tooltipItem) {
                                return tooltipItem.yLabel; // toglie legenda
                            }
                        }
                    },
                    animation: {
                        duration: 0 // "disabilita" le animazioni (brutto effetto "jump" del grafico a causa update del grafico frequente)
                    }
                }
            });

            graph.update(); // Per aggiornare i dati del grafico ad ogni richiesta

            return graph;
        },
        updateGraph: function (chart, tstamps, newData){
            /**
             * Modifica e aggiorna i dati del grafico.
             * 
             * Modifica i labels (timestamp, asse x), i dati (data),
             * e infine aggiorna il grafico. 
             * @param {Object} chart oggetto del grafico da aggiornare
             * @param {Array} tstamps vettore di timestamp, asse x
             * @param {Array} newData vettore di dati, asse y 
            */
            chart.data.labels = tstamps;
            chart.data.datasets[0].data = newData;
            chart.update();
        },
        makeGraphs: function () {
            /** 
             * Questa funzione fa GET request a php per ottenere i dati da visualizzare nei grafici.
             * 
             * Viene recuperato dal parametro (prop) del componente vue l'id del nodo,
             * 
             * viene usato Axios.js per eseguire una GET request per ottenere
             * le rilevazioni, poi viene eseguito un loop che cicla le rilevazioni una ad una
             * per dividere timestamp e gli altri dati in array separati
             * > Nota: i timestamp vengono prima convertiti in data da TimestampToDate()
             * 
             * Se esistenti vengono distrutti i vecchi grafici e poi, per ogni array diverso da quello dei timestamp,
             * vengono creati i grafici con la funzione makeGraph().
             * 
             * @since 01_01
            */
            
            axios.get("/api/sensors/data.php?nodeid=" + this.$route.params.nodeid).then((resp) => {
                // ottengo la risposta

                var measures = {
                    timestamps: [] // array di timestamp   ( asse x grafici )
                }

                resp.data.data.forEach((row) => {
                    // per ogni elemento / rilevazione ricevuta dalla risposta
                        
                    // se l'id_node corrisponde alla stanza cliccata / richiesta
                    if (boold) {
                        console.log(row);
                    }
                    
                    // scorro tutte le proprieta' della rilevazione
                    for (const property in row) {
                        const prop_value = row[property]; 
                        
                        // se la proprieta' non e' l'id del nodo
                        if (property != "node_id"){
                            if (property == "tstamp"){
                                // se la proprieta' e' il timestamp, convertilo in data e aggiungilo al vettore dei timestamp
                                measures.timestamps.push(this.TimestampToDate(prop_value));
                            }
                            else{
                                // la proprieta' e' una rilevazione, se non e' ancora definito il vettore in measures crealo
                                if (! measures.hasOwnProperty(property)){
                                    measures[property] = [];
                                }

                                // aggiungi la rilevazione al vettore in measures
                                measures[property].push(prop_value);
                            }
                        }
                    }

                });

                // scorri le proprieta' delle rilevazioni
                for (const property in measures) {
                    const prop_value = measures[property];

                    // se la proprieta' non e' timestamp, occorre creare un grafico
                    if (property != "timestamps"){

                        // cerca di selezionare il grafico
                        let graph_el = document.getElementById("graph-" + property)
                        
                        // se l'elemento con il grafico non esiste...
                        if (graph_el === null){

                            // se conosco il nome della proprieta' aggiungi un titolo
                            if (this.prop_aliases.hasOwnProperty(property)){
                                // crea un h2 con il tipo di rilevazione e la location e aggiungila all'elemento #graphs
                                let h2 = document.createElement("h2");
                                h2.classList = "text-container title";
                                h2.textContent = this.prop_aliases[property] + " " + this.location;
                                this.$refs.graphs.appendChild(h2);
                            }

                            // crea l'elemento che conterra' del grafico e aggiungilo a #graphs
                            let graph_container = document.createElement("div");
                            graph_container.classList = "graph-container";
                            this.$refs.graphs.appendChild(graph_container);

                            // crea un canvas che conterra' il grafico e inseriscilo nell'elemento appena creato
                            graph_el = document.createElement("canvas");
                            graph_el.id = "graph-" + property;
                            graph_container.appendChild(graph_el);
                        }

                        // controlla se creare (elemento non definito in oldgraphs) o aggiorare il grafico
                        if (this.oldgraphs[property] === undefined){
                            // crea il grafico e memorizza l'oggetto
                            this.oldgraphs[property] = this.makeGraph(measures.timestamps, prop_value, graph_el);
                        }
                        else{
                            // aggiorna il grafico
                            this.updateGraph(this.oldgraphs[property], measures.timestamps, prop_value);
                        }
                        
                    }
                    
                }

            });
                
            if (boold) {
                console.log("Ho creato/aggiornato i grafici");
            }

        },
        getUsercolor: function(){
            /**
             * Ottiene il colore della UI e la memorizza nell'oggetto store, 
             * poi richiama makeGraphs() per creare i grafici
            */
            axios.get("/api/colors/usercolor.php").then((resp) => {
                store.setMessageAction(resp.data.data.color_hex);
                this.makeGraphs();
            });
        }
    },
    mounted: function () {
        /**
         * Quando il componente viene caricato e dopo che ci si assicura che sia presente il colore della UI nell'oggetto store,
         * viene richiamata la funzione makeGraphs() per creare i grafici,
         * vengono aggiunti gli eventi per poter tornare alla pagina principale da goBack(),
         * viene recuperata la location del nodo 
         * e viene impostato il "loop infinito" con setInverval() per mantenere i grafici aggiornati
         * ogni 10 secondi.
         * 
         * > setInterval restituisce un numero che serve a fermare il loop attraverso clearInterval
         * 
         * > makeGraphs() viene richiamato prima di setInterval perche' setInterval prima aspetta
         * > che siano passati i millisecondi, poi richiama la funzione. 
         * > Questo significa che l'utente non vedrebbe i grafici per 10 secondi
        */

        var graphfunc = this.makeGraphs; // salva la funzione per creare / aggiornare i grafici

        // se il colore della UI non e' salvato in store, ottieni il colore,
        // altrimenti crea i grafici
        if (store.state.usercolor == ""){
            // dopo aver ottenuto il colore richiamera' la funzione
            // per creare i grafici
            this.getUsercolor();
        }
        else{
            graphfunc(); // richiama la funzione per creare immediatamente i grafici
        }
        
        this.goBack();  // aggiunge gli eventi per tornare alla pagina principale
        
        // scorro i nodi e trovo il nodo con l'id passato per ottenere la location
        axios.get("http://localhost/api/sysinfos/rssi.php").then((resp) =>{

            var nodes_data = resp.data.data;
            
            // scorri i nodi
            for (let i = 0; i < nodes_data.length; i++) {
                const node_data = nodes_data[i];
                if (node_data.node_id == this.$route.params.nodeid){
                    // ho trovato la location
                    this.location = node_data.location_description;
                    break
                }
            }
        })

        // richiama la funzione per aggiornare i grafici ogni 10 secondi (aspetta 10 secondi -> richiama)
        // > memorizza in intervalsId l'id per fermare il loop a cambio pagina
        this.intervalsId.push(setInterval(graphfunc, 10000)); 
    },
    data: function () {
        /**
         * Restituisce i dati appartenenti al componente
         * @return {object} oggetto con dati componente
        */
        return {
            intervalsId: [],         // contiene id dei setInterval() per fermarli al cambio pagina
            location: "",            // location del nodo
            state: store.state,      // elemento in comune agli altri componenti Vue, contiene colore UI
            oldgraphs: {},           // contiene elementi dei grafici per poterli aggiornare
            prop_aliases: {          // alias delle proprieta' riconosciute, usato per creare i titoli (h2)
                temp: "temperatura",
                hum: "umidita'"
            }
        }
    },
    beforeRouteLeave (to, from, next) {
        /**
         * Termina i loop impostati con setInteval() quando viene cambiata la route.
        */

        // scorri tutti gli id di setInterval() e terminali uno a uno 
        for (let i = 0; i < this.intervalsId.length; i++) {
            const element = this.intervalsId[i];
            clearInterval(element);
        }

        // passa alla nuova route
        next();
    }
}
