# PROGETTO201-FRONTEND

Frontend del [progetto201](https://github.com/progetto201).

## Introduzione
Questo repository contiene l'interfaccia grafica del progetto201.
Si interfaccia agli altri componenti attraverso [l'api presente nel relativo repository.](https://github.com/progetto201/progetto201-api)

## Guida all'uso
Posizionare il contenuto della cartella www nella cartella servita dal server web (per apache /var/www).

## Descrizione breve
In questa sezione vengono descritti brevemente i file/cartelle contenuti in ```www/html```:

    index.html
Importa i CSS (materialize, mdbootstrap e css specifico del progetto), 
definisce nel body l'elemento controllato da Vue.js (l'elemento con id "app"),
importa gli script javascript (materialize, mdbootstrap, svg.js, axios.js, hammer, t2ts.js, interact.js, vue.js, vue-router, i 4 componenti) 
e infine definisce alcune funzioni e inizializza vue-router e vue.

    static/css
Contiene gli stili di pagina:
* ```all.css``` e' per il font Roboto
* ```bootstrap.min.css``` e' un framework css, base del framework mdboostrap che ne modifica lo stile
* ```mdb.min.css``` e' mdbootstrap che aggiunge lo stile material a boostrap
> Pagina ufficiale di mdbootstrap: https://mdbootstrap.com/
* ```materialize.min.css``` e' un altro framework css con lo stile material
> Pagina ufficiale di materialize: https://materializecss.com/

> e' necessario un altro framework perche' alcuni stili (in particolare gli stili dei timepicker, datepicker e switch)
> sono disponibili su mdbootstrap a pagamento e non sono compresi nella versione gratuita
*  ```main/style.css```: stile personalizzato per il progetto201, si occupa di gestire il typewriter nelle informazioni,
i container dell'svg con la planimetria e dei label, i quadrati con i colori selezionabili dall'utente per personalizzare
l'interfaccia,...

    static/font/roboto/*
Contiene i file del font roboto, importato dal file css ```all.css```

    static/img/info/*
Contiene le immagini utilizzate nella pagina delle informazioni del progetto

    static/img/maps/*
Contiene i documenti SVG (scalable vector graphics) delle planimetrie.
E' possibile aggiungere altre planimetrie alla pagina per poterle
utilizzare nell'interfaccia.
Per utilizzarla basta poi andare nelle impostazioni e sotto a "Tipo planimetria"
cliccare sulla planimetria desiderata.
> Tecnicamente i documenti SVG non sono immagini

    static/img/rssi/*
Contiene documenti SVG che mostrano la potenza del segnale Wi-Fi
per i nodi.
> Tecnicamente i documenti SVG non sono immagini

    static/img/favicon.png
Icona della tab del browser.

    static/js/floorplan/svg.min.js
Script svg.js, comodo per gestire gli elementi ```<svg>```.
> Link alla sua documentazione: https://svgjs.com/docs/3.0/

    static/js/main/graph.js
Contiene un oggetto, il componente Vue per visualizzare
e controllare la pagina dei grafici

    static/js/main/home.js
Contiene un oggetto, il componente Vue per visualizzare
e controllare la pagina principale con la planimetria
e i label, e i pulsanti per passare
alla pagina delle impostazioni e delle informazioni

    static/js/main/infos.js
Contiene un oggetto, il componente Vue per visualizzare
e controllare la pagina delle informazioni.
Visualizza le informazioni del progetto 100+100.

    static/js/main/options.js
Contiene un oggetto, il componente Vue per visualizzare
e controllare la pagina delle impostazioni.
La pagina delle impostazioni si occupa di gestire
la data di visualizzazione dati dei grafici,
di selezionare la planimetria della pagina principale,
creare i label per visualizzare i dati o andare nella
pagina dei grafici, visualizzare lo spazio disponibile su disco
e infine visualizzare la potenza Wi-Fi ricevuta dei nodi (RSSI).

    static/js/materialize/materialize.min.js
Script di materialize.
> Pagina ufficiale di materialize: https://materializecss.com/

    static/js/mdbootstrap/bootstrap.min.js
Script di bootstrap, necessario per mdbootstrap

    static/js/mdbootstrap/jquery-3.3.1.min.js
JQuery, necessario per mdboostrap

    static/js/mdbootstrap/mdb.min.js
Script di mdbootstrap

    static/js/mdbootstrap/popper.min.js
Script necessario per bootstrap
> Pagina ufficiale di mdbootstrap: https://mdbootstrap.com/

    static/js/options/axios.min.js
Script per eseguire HTTP request

    static/js/timestamp/t2ts.js
Script per convertire tempo (formato "hh:mm tt") in timestamp

    static/js/touch/hammer.min.js
Script per gestire eventi touch. Usato per rilevare swipe per tornare alla pagina
principale dalle pagine delle impostazioni, delle informazioni e dei grafici
> Nota: sembra possibile implementare il drag (trascinamento) dei
label con hammer.js e non utilizzare interact.js (link https://codepen.io/anzk/pen/MPaOpL)

    static/js/touch/interact.min.js
Script per gestire eventi touch. Usato per riconoscere il drag (trascinamento)
dei label della planimetria.
> Nota: sembra possibile implementare gli swipe e non utilizzare hammer.js

    static/js/vue/vue.min.js
Framework per creare interfacce.
Viene utilizzato per gestire metodi e variabili dei componenti vue.

    static/js/vue/vue-router.min.js
Vue router permette di gestire i componenti Vue come se fossero
pagine diverse, in realta' pero' la pagina e' una sola.
Una applicazione web di questo tipo viene definita "Single Page Application".

## Descrizione dettagliata
Per la documentazione dettagliata e' possibile guardare
la [vecchia documentazione del progetto 100+100 disponibile qui](https://github.com/mario33881/progetto_100/wiki/Webserver_descrizione_navigazione).
> Variano gli URL dell'api e manca la documentazione delle feature piu' recenti
> (ad esempio i label della planimetria)

## Requisiti
* server web
* api per interfacciarsi al database

# Changelog
**01_01 2020-08-09:** <br>
Primo commit

# Autore
Zenaro Stefano