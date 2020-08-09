/**
 * t2ts -> time to timestamp.
 *
 * Converti tempo (formato "hh:mm tt") in timestamp
 *
 * @author Stefano Zenaro (https://github.com/mario33881)
 * @license MIT
 * @since  01_01
*/


function timeToTimestamp(t_time){
  /**
   * Converte tempo (formato "hh:mm tt") in timestamp
   *
   * @since 01_01
   *
   * @param {string} t_time, tempo, formato "hh:mm tt" .
   * 
   * @return {int} timestamp, timestamp .
  */

  var sec_tt;    // variabile tt, AM o PM
  var sec_hh;    // variabile ore
  var sec_mm;    // variabile minuti
  var timestamp; // variabile timestamp

  v_time = t_time.split(" ");    // dividi hh:mm e tt
  v_hhmm = v_time[0].split(":"); // dividi hh e mm
  v_tt = v_time[1];              // salva tt

  if (v_tt === "AM"){
    // non e' passato mezzo giorno -> 0 ore
    sec_tt = 0;
  }
  else{
    // e' passato mezzo giorno -> 12 ore
    sec_tt = 60 * 60 * 12; // 60 sec x 60 minuti x 12 ore
  }

  sec_hh = v_hhmm[0] * 60 * 60; // 60 secondi x 60 minuti x ora
  sec_mm = v_hhmm[1] * 60;      // 60 secondi x minuto

  timestamp = sec_tt + sec_hh + sec_mm; // sommo tutti i secondi

  return timestamp;

}


/*
function testTimeToTimestamp(){
  // Funzione da test
  var s_time = "06:58 PM" // stringa di prova

  // 06 sono 6 ore            -> 21600 secondi
  // 58 minuti                ->  3480 secondi
  // PM, pomeriggio (+12 ore) -> 43200 secondi
  // totale (in console??)    -> 68280 secondi

  console.log(timeToTimestamp(s_time)); // attualmente funziona
}

*/
