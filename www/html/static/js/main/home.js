/** 
 * Script che definisce componente Vue con la pagina principale
 * 
 * @since 01_01
 * @author Stefano Zenaro (https://github.com/mario33881)
 * @license MIT
 * @todo Aggiungere un riscontro anche in caso la GET request per le rilevazioni non abbia successo
*/

const Home = {
    name: "home",
    template: `
    <div class="page">
        <div id="home-container" class="container">
            <h1 class="text-container title">Progetto 100 + 100</h1>
                                        
            <div class="floorplan-container">
                <div id="floorplan" class="floorplan" ref="floorplan">
                    <div id="hiddenlayer" ref="hiddenlayer"></div>
                </div>
            </div>

            <div class="btn-group fixed-bottom" role="group">
                <router-link tag="button" to="/infos" class="btn bg-color halfpage" v-bind:style="{ backgroundColor: state.usercolor}"> {{ infoprogetto }} </router-link>
                <router-link tag="button" to="/options" class="btn bg-color halfpage" v-bind:style="{ backgroundColor: state.usercolor}"> {{ impostazioni }} </router-link>
            </div>
        </div>
    </div>`,
    methods: {
        setLinks: function () {
            /**  
             * Imposta gli eventi click per andare nella pagina dei grafici e aggiorna i valori delle ultime rilevazioni.
             * 
             * Scorre tutti gli elementi nell'elemento #hiddenlayer e ne controlla il tipo (proprieta' <data-eltype>):
             * - se l'elemento e' un'area ('area'), imposta evento click per andare alla pagina dei grafici
             * - se l'elemento e' una rilevazione ('reading'), imposta il suo testo come il valore dell'ultima
             *   rilevazione e usa setInterval() per mantenere aggiornato il valore ogni 10 secondi
             * 
             * @since 01_01
            */

            // seleziona gli elementi di #hiddenlayer
            var hiddenlayer_els = this.$refs.hiddenlayer.children;

            if (boold){
                console.log("SETTING LINKS");
            }
            
            // scorri gli elementi di #hiddenlayer
            for (let i = 0; i < hiddenlayer_els.length; i++) {
                const el = hiddenlayer_els[i];
                
                if (boold){
                    console.log(el);
                }

                // controlla il tipo di elemento
                if (el.getAttribute("data-eltype") === "area"){
                    // l'elemento e' un'area

                    if (boold){
                        console.log("adding event to", el);
                    }
                    
                    // se non e' stato impostato l'id del nodo
                    // imposta lo sfondo dell'elemento rosso,
                    // il colore del testo bianco e inserisci un testo 
                    if (el.getAttribute("data-nodeid") == "-1"){
                        el.style.backgroundColor = "red";
                        el.style.color = "white";
                        el.textContent = "id nodo mancante";
                    }
                    else{
                        // quando l'elemento viene cliccato
                        el.addEventListener("click", () => {
                            // seleziona dall'elemento l'id del nodo
                            var nodeId = el.getAttribute("data-nodeid");

                            // e vai sulla pagina dei grafici passando l'id come parametro
                            this.$router.push({ path: `/graph/${nodeId}` });
                        });
                    }
                }
                else if (el.getAttribute("data-eltype") === "reading"){
                    // l'elemento e' una lettura di un sensore
                    
                    // se non e' stato impostato l'id del nodo o il nome del campo del dato da visualizzare
                    // specificalo all'utente
                    if (el.getAttribute("data-nodeid") == "-1"){
                        el.style.backgroundColor = "red";
                        el.style.color = "white";
                        el.textContent = "id nodo mancante";
                    }
                    else if (el.getAttribute("data-nodedata") == "-1"){
                        el.style.backgroundColor = "red";
                        el.style.color = "white";
                        el.textContent = "nome campo mancante";
                    }
                    else{
                        // definisci una funzione...
                        var updateData = function(){
                            // esegui una GET request per ottenere gli ultimi dati del nodo
                            axios.get("/api/sensors/data.php?nodeid=" + el.getAttribute("data-nodeid") + "&latest=1").then((resp) => {

                                // seleziona l'oggetto con gli ultimi dati
                                var resp_data = resp.data.data[0];
                                // e ottieni il valore da visualizzare
                                var data = resp_data[el.getAttribute("data-nodedata")];
                                // imposta il testo dell'elemento con il valore
                                el.textContent = data;
                            });
                        }

                        // chiama la funzione per impostare immediatamente il valore
                        updateData();

                        // dopo ogni 10 secondi richiama la funzione per aggiorare il valore
                        var intervalid = setInterval(updateData, 10000);
                        // e memorizza l'id del loop per poterlo fermare a cambio pagina
                        this.intervalsId.push(intervalid);
                    }
                }
            }
        },
        getUsercolor: function(){
            /**
             * Ottiene il colore della UI e lo memorizza nell'oggetto store.
             * 
             * Viene eseguita una GET request per ottenere il colore
             * in formato #RRGGBB.
            */
            axios.get("/api/colors/usercolor.php").then((resp) => {
                store.setMessageAction(resp.data.data.color_hex);
            });
        },
        makeDiv: function(type, text) {
            /** 
             * Crea un div con proprieta' di default, di tipo <type> e con testo <text>.
             * 
             * La funzione crea un div,
             * imposta l'id, la classe, la posizione, l'altezza e la lunghezza,
             * il testo e le proprieta' custom (tipo nodo, id nodo, dato del nodo, id custom dell'utente)
             * 
             * @param {string} type tipo di elemento
             * @param {string} text testo contenuto nell'elmento
             * @returns {HTMLElement} div, div dell'elemento creato
            */
            
            // crea un div e imposta l'id (counter e' un contatore)
            var div = document.createElement("div");
            div.id = "ontop-" + type + "-" + this.counter;
            
            // aggiungi la classe per mettere in primo piano l'elemento,
            // centrare il suo testo e rendere la sua posizione assoluta
            div.classList = "ontop";
            
            // imposta quanto l'elemento e' spostato dall'alto e da sinistra del parent
            div.style.top = "0%";
            div.style.left = "0%";

            // imposta lunghezza e altezza
            div.style.width = "21%";
            div.style.height = "5%";

            // imposta il testo
            div.textContent = text;

            // imposta il tipo dell'elemento (area, rilevazione, testo, ...)
            div.setAttribute("data-eltype", type);
            // imposta l'id del nodo, il dato e l'id custom di default
            div.setAttribute("data-nodeid", "-1");
            div.setAttribute("data-nodedata", "-1");
            div.setAttribute("data-id", type + "-" + this.counter);

            // incrementa il contatore
            this.counter++;

            return div;
        },
        makeText: function(){
            /** 
             * Richiama makeDiv() per creare un div di tipo testo e con testo di default.
             * @returns {HTMLElement} div, div di tipo testo, testo "<template>"
            */
            var div = this.makeDiv("text", "<template>");
            return div;
        },
        makeArea: function(){
            /** 
             * Richiama makeDiv() per creare un div di tipo area e senza testo.
             * @returns {HTMLElement} div, div di tipo area, niente testo ("")
            */
            var div = this.makeDiv("area", "");
            return div;
        },
        makeReading: function(){
            /**
             * Richiama makeDiv() per creare un div di tipo rilevazione e con testo di default. 
             * @returns {HTMLElement} div, div di tipo rilevazione, testo "<data>"
            */
            var div = this.makeDiv("reading", "<data>");
            return div;
        },
        getLabels: function(){
            /** 
             * Inserisce i label sulla planimetria.
             * 
             * Una GET request ottiene i dati relativi
             * ai label e un loop scorre i dati
             * per creare e impostare gli elementi da visualizzare
             * sulla planimetria
            */
            axios.get("/api/options/planlabels.php").then((res) => {
                var labels_data = res.data.data;

                // scorri i label
                for (let index = 0; index < labels_data.length; index++) {
                    const label_data = labels_data[index];

                    // ottieni i dati relativi al label
                    var id = label_data.id;
                    var eltype = label_data.eltype;
                    var nodeid = label_data.nodeid;
                    var nodedata = label_data.nodedata;
                    var id_user = label_data.id_user;
                    var fromtop = label_data.fromtop;
                    var fromleft = label_data.fromleft;
                    var width = label_data.width;
                    var height = label_data.height;
                    var textcontent = label_data.textcontent;

                    // crea un div di default in base al tipo di label
                    var div = null;
                    if (eltype == "text"){
                        div = this.makeText();
                    }
                    else if (eltype == "area"){
                        div = this.makeArea();
                    }
                    else if(eltype == "reading"){
                        div = this.makeReading();
                    }

                    // se il tipo e' stato riconosciuto continua a configurare le proprieta'
                    if (div !== null){
                        // imposta il tipo di elemento, l'id del nodo, il dato e l'id custom del''utente
                        div.setAttribute("data-eltype", eltype);
                        div.setAttribute("data-nodeid", nodeid);
                        div.setAttribute("data-nodedata", nodedata);
                        div.setAttribute("data-id", id_user);

                        // imposta gli stili
                        div.style.top = fromtop;    // quanto e' spostato dall'alto
                        div.style.left = fromleft;  // quanto e' spostato da sinistra
                        div.style.width = width;    // la lunghezza
                        div.style.height = height;  // l'altezza

                        // imposta il testo e l'id
                        div.textContent = textcontent;
                        div.id = "ontop-" + eltype + "-" + id;
                        
                        // aggiungi l'elemento a #hiddenlayer
                        this.$refs.hiddenlayer.appendChild(div);
                    }
                }

                // dopo aver creato gli elementi richiama setLinks()
                // per aggiungere eventi click o setInterval per aggiornare i valori delle rilevazioni
                this.setLinks();
            });
        }
    },
    mounted: function () {
        /** 
         * Quando il componente viene caricato 
         * prima viene verificato se l'oggetto store ha memorizzato il colore della UI.
         * Se non e' memorizzato, viene richiamata la funzione getUsercolor().
         * 
         * Poi viene verificata la larghezza dello schermo:
         * se e' minore di 450 pixel la variabile del componente infoprogetto viene impostata a "Info progetto".
         * > Di default e' "Informazioni progetto"
         * 
         * Viene eseguita una GET request per ottenere la planimetria selezionata dall'utente.
         * 
         * svg.js si occupera' di inserire la planimetria dentro a div#floorplan,
         * poi verra' richiamata la funzione setLinks() per aggiungere
         * gli eventi per andare nella pagina dei grafici per ogni stanza
         * e infine viene richiamata la funzione updMap()
         * che verra' richiamata ogni 10 secondi per mantenere aggiornati
         * i dati delle ultime rilevazioni sulla planimetria
         * 
        */
        
        // se non e' stato impostato il colore della UI nell'oggetto store,
        // impostalo richiamando getUsercolor()
        if (store.state.usercolor == ""){
            this.getUsercolor();
        }

        var checksize = window.matchMedia("(max-width: 450px)"); // controllo se lo schermo < 450px di larghezza
        if (checksize.matches) {
            // se e' minore di 450px
            this.infoprogetto = "Info progetto"; // cambia il nome del pulsante che va nelle info
        }

        axios.get("/api/plans/userplan.php").then((resp) => {
            // richiede informazioni sulla planimetria

            if (boold) {
                console.log(resp);
            }

            // ottieni il percorso della planimetria
            let userplan_path = resp.data.data.path;

            if (boold){
                console.log(userplan_path);
            }
            
            // crea l'elemento per l'immagine, imposta l'id e inseriscilo in #floorplan
            var img = document.createElement("img");
            img.id = "floorplan_img";
            this.$refs.floorplan.appendChild(img);
            
            // imposta il percorso dell'immagine come percorso della planimetria
            // e imposta altezza e lunghezza come 100% del parent
            img.src = userplan_path;
            img.style.width = "100%";
            img.style.height = "100%";
            
            // dopo aver inserito la planimetria, crea i label con getLabels()
            this.getLabels();
        });

    },
    data: function () {
        /** 
         * Restituisce le variabili del componente
         * @return {object} oggetto con dati componente
        */
        return {
            infoprogetto: "Informazioni progetto", // testo nel pulsante per info
            impostazioni: "Impostazioni",          // testo nel pulsante per impostazioni
            state: store.state,                    // oggetto con il colore della UI                       
            intervalsId: [],                       // contiene id dei setInterval()
            counter: 0                             // contatore per creare id dei label
        }
    },
    beforeRouteLeave (to, from, next) {
        /**
         * Viene eseguita prima del cambio di pagina.
         * 
         * Termina i loop impostati con setInteval() utilizzando clearInterval e gli id
         * memorizzati in intervalsId.
        */

        // scorri tutti gli id di setInterval() e terminali uno a uno 
        for (let i = 0; i < this.intervalsId.length; i++) {
            const element = this.intervalsId[i];
            // termina il loop
            clearInterval(element);
        }

        // passa alla nuova route
        next();
    }
}