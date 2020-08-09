/** 
 * Script che definisce componente Vue con la pagina delle informazioni
 * 
 * @since 01_01
 * @author Stefano Zenaro (https://github.com/mario33881)
 * @license MIT
*/

const Infos = {
    name: "infos", // nome componente
    template: `
    <div>
        <div class="text-center">
            
            <!-- Pagina con sfondo colorato, titolo centrato, testo in alto e basso a sinistra -->
            <div style="height: 100vh; margin:0px" class="d-flex align-items-center white-text" v-bind:style="{ backgroundColor: state.usercolor}">

                <!-- Container pulsante in alto a sinistra, sfondo bianco -->
                <div class="w3-display-topleft" style="background-color:white">
                    <!-- Pulsante per andare indietro con id backbutton -->
                    <router-link to="/" class="btn btn-sm align-left  bg-color" v-bind:style="{ backgroundColor: state.usercolor}" style="display: flex; justify-content: center; align-items: center; color: white;"> < </router-link>
                </div>

                <!-- Container con titolo centrato -->
                <div class="container" >

                    <!-- titolo, occupa tutto spazio possibile, effetto scrittura -->
                    <div style="display:inline-block;" class="typewriter">
                        <h1 id="title">{{ title }}</h1>
                    </div>

                    <!-- Linea bianca che divide titolo da sottotitolo -->
                    <hr class="w3-border-grey" style="width:40%">

                    <!-- Sottotitolo -->
                    <div>
                        <p id="slogan">{{ slogan }}</p>
                    </div>
                </div>

                <!-- Testo in basso a sinistra -->
                <div class="w3-display-bottomleft bg-color-infos">
                    No copyright &copy 2018-2019
                </div>

            </div>

            
            <!-- Sezione "In cosa consiste il progetto?" -->
            <div id="project">
                <div class="container">
                    
                    <!-- Linea bianca sopra titolo sezione -->
                    <hr class="w3-border-blue" style="margin:auto;width:100%">
                    
                    <!-- Titolo sezione -->
                    <div class="container white-text text-center" v-bind:style="{ backgroundColor: state.usercolor}">
                        <h1>In cosa consiste il progetto?</h1>
                    </div>
                    
                    <!-- Linea bianca sotto titolo sezione -->
                    <hr class="w3-border-blue" style="margin:auto;width:100%">

                    <!-- Contenuto sezione -->
                    <div class="row">
                        
                        <!-- Colonna vuota a sinistra -->
                        <div class="col"></div>

                        <!-- Colonna centrale con il contenuto -->
                        <div class="col-6">
                            
                            <p> Il progetto consiste nel riuscire a rilevare attraverso sensori DHT la temperatura e
                                l'umidita' di 3 stanze e dell'esterno
                            </p>

                            <!-- Immagine con planimetria -->
                            <div data-aos="fade-up">
                                <img src="/static/img/infos/pianta.png" class="img-fluid" alt="Responsive image" />
                            </div>

                            <br /> <br />
                            
                            <p>e di inviare i dati rilevati attraverso i Node MCU al Raspberry Pi</p>

                            <!-- Container delle immagini -->
                            <div style="align-items: center;" class="d-flex">
                                <div>
                                    <img src="/static/img/infos/DHT22.jpg" class="img-fluid" alt="Responsive image" data-aos="fade-up" />
                                </div>

                                <div>
                                    <img src="/static/img/infos/arrow.png" class="img-fluid" alt="Responsive image" data-aos="fade-up" data-aos-delay="100" />
                                </div>
                                    
                                <div>
                                    <img src="/static/img/infos/node.jpg" class="img-fluid" alt="Responsive image" data-aos="fade-up" data-aos-delay="200" />
                                </div>
                                
                                <div>
                                    <img src="/static/img/infos/arrow.png" class="img-fluid" alt="Responsive image" data-aos="fade-up" data-aos-delay="300" />
                                </div>
                                
                                <div>
                                    <img src="/static/img/infos/raspberry.jpg" class="img-fluid fadeInUp" alt="Responsive image" data-aos="fade-up" data-aos-delay="400" />
                                </div>
                            </div>

                        </div>

                        <!-- Colonna vuota destra" -->
                        <div class="col"></div>

                    </div>
                </div>
            </div>
            <!-- Fine sezione -->

            
            <!-- Sezione "Temperatura e umidita'" -->
            <div id="temp_umidity">
                <div class="container">
                    
                    <!-- Linea sopra al titolo sezione -->
                    <hr class="w3-border-blue" style="margin:auto;width:100%">
                    
                    <!-- Titolo sezione -->
                    <div class="container bg-color-infos white-text text-center" v-bind:style="{ backgroundColor: state.usercolor}">
                        <h1>Temperatura e umidita'</h1>
                    </div>

                    <!-- Linea sotto al titolo-->
                    <hr class="w3-border-blue" style="margin:auto;width:100%">

                    <!-- Contenuto sezione -->
                    <div class="row">
                        
                        <!-- Colonna vuota sinistra -->
                        <div class="col"></div> 

                        <!-- Colonna centrale con contenuto della sezione -->
                        <div class="col-6 container">
                                
                            <p>I Node MCU si connetteranno all'access point generato dal Raspberry pi,
                                poi ogni 10 minuti rileverranno (attraverso i sensori DHT22) la temperatura e l'umidita'
                                dell'ambiente,
                                e faranno una richiesta GET a "/static/php/sensors.php"
                                per inviare i dati al Raspberry che li inserira' in un database
                            </p>

                            <!-- Container con immagini -->
                            <div style="align-items: center;" class="d-flex">
                                <div>
                                    <img src="/static/img/infos/node.jpg" class="img-fluid" alt="Responsive image" data-aos="fade-up" />
                                </div>
                                
                                <div>
                                    <img src="/static/img/infos/arrow.png" class="img-fluid" alt="Responsive image" data-aos="fade-up" data-aos-delay="100" />
                                </div>
                                    
                                <div>
                                    <img src="/static/img/infos/get_req.jpg" class="img-fluid" alt="Responsive image" data-aos="fade-up" data-aos-delay="200" />
                                </div>
                                
                                <div>
                                    <img src="/static/img/infos/arrow.png" class="img-fluid" alt="Responsive image" data-aos="fade-up" data-aos-delay="300" />
                                </div>

                                <div>
                                    <img src="/static/img/infos/raspberry.jpg" class="img-fluid" alt="Responsive image" data-aos="fade-up" data-aos-delay="400" />
                                </div>
                                
                                <div>
                                    <img src="/static/img/infos/arrow.png" class="img-fluid" alt="Responsive image" data-aos="fade-up" data-aos-delay="500" />
                                </div>
                                    
                                <div>
                                    <img src="/static/img/infos/mysql.png" class="img-fluid" alt="Responsive image" data-aos="fade-up" data-aos-delay="600" />
                                </div>

                            </div>

                            <p>I dati che finiranno sul database saranno:</p>

                            <!-- "Tabella" contenente la lista del contenuto del database -->    
                            <ul class="list-group">
                                <li class="list-group-item px-0">
                                    <a data-toggle="tooltip" title="numero autoincrementale per garantire unicita' del record nel database">id</a>
                                </li>

                                <li class="list-group-item px-0">
                                    <a data-toggle="tooltip" title="Il timestamp di quando il record e' stato inserito nel database">measure_timestamp</a>
                                </li>

                                <li class="list-group-item px-0">
                                    <a data-toggle="tooltip" title="Id del node, dove si trova nell'appartamento">id_node</a>
                                </li>

                                <li class="list-group-item px-0">
                                    <a data-toggle="tooltip" title="Percentuale rilevata di umidita' (es. 23 = 23%)">humidity</a>
                                </li>

                                <li class="list-group-item px-0">
                                    <a data-toggle="tooltip" title="Temperatura in Celsius rilevata (es. 34.23 = 34.23 °C)">celsius_temp</a>
                                </li>

                                <li class="list-group-item px-0">
                                    <a data-toggle="tooltip" title="Indice di calore in Celsius calcolato da umidita' e temperatura (es. 34.23 = 34.23 °C)">heat_index_celsius</a>
                                </li>

                                <li class="list-group-item px-0">
                                    <a data-toggle="tooltip" title="Livello potenza ricevuto dal node">RSSI</a>
                                </li>
                            </ul>

                            <p> Questi dati verranno successivamente visualizzati in grafici cliccando sulla stanza desiderata</p>
                        </div>

                        <!-- Colonna vuota destra -->
                        <div class="col w3-container w3-white w3-cell"></div>

                    </div>

                </div>
            </div>

            <!-- Fine sezione -->
        </div>


        <!-- Schermata finale -->
        <div style="height: 100vh; margin:0px;" class="jumbotron d-flex bg-color-infos align-items-center text-center white-text" v-bind:style="{ backgroundColor: state.usercolor}">

            <!-- Container con il testo -->
            <div class="container">
                <!-- Titolo -->
                <div>
                    <h1 id="title" class="w3-jumbo w3-animate-top">Marconi</h1>
                </div>
                
                <!-- Linea bianca che separa titolo da sottotitolo -->
                <hr class="w3-border-grey" style="width:40%">
                
                <!-- Sottotitolo-->
                <div>
                    <p id="slogan">{{ persone }}</p>
                </div>
            </div>
        </div>
        <!-- Fine schermata finale -->
    </div>`,
    methods: {
        goBack: function () {
            /**
             * Questa funzione aggiunge gli eventi per tornare alla pagina principale: 
             * - touch alla pagina (swipe verso sinistra)
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
               
                if (boold) {
                    console.log("Delta X: ", ev.deltaX);
                }

                if (ev.deltaX > 100) {
                    // se lo swipe e' verso sinistra di 100 px
                    window.location.href = "/#/"; // torna pagina principale
                }
            });
        },
        getUsercolor: function(){
            /**
             * Ottiene il colore della UI e lo memorizza nell'oggetto store. 
            */
            axios.get("/api/colors/usercolor.php").then((resp) => {
                store.setMessageAction(resp.data.data.color_hex)    
            })
        }
    },
    mounted: function () {
        /**
         * Quando viene caricato il componente si assicura che il colore della UI
         * sia memorizzato in store, altrimenti richiama la funzione getUsercolor() e poi
         * viene richiamata la funzione goBack() per aggiungere 
         * gli eventi per tornare alla pagina principale,
         * poi se la larghezza della pagina e' minore di 400 pixel
         * viene modificato il valore di title e slogan
         * > title e slogan di default finirebbero fuori pagina 
        */
        
        if (store.state.usercolor == ""){
            this.getUsercolor();
        }

        this.goBack(); // imposta touch
        
        var checksize = window.matchMedia("(max-width: 400px)"); // controllo se larghezza schermo < 400px 
        if (checksize.matches) {
            // se e' minore di 400px
            this.title = "Progetto";   // cambio titolo
            this.slogan = "100 + 100"; // e slogan (andrebbero fuori pagina)
        }
    },
    data: function () {
        /**
         * Restituisce i dati appartenenti al componente
         * @return {object} oggetto con dati componente
        */
        return {
            title: "Progetto 100+100",
            slogan: "Temperatura e umidita' al 100% sotto controllo",
            persone: "Classe 5AT, anno scolastico 2019/2020",
            state: store.state,
        }
    }
}