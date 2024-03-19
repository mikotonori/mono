/*
Kode ment for å bli brukt i Custom HTML på Personvern-siden.

Formålet med koden er å fjerne hamburgermenyikonet fra personvernsiden til énsidere, hvor dette ikke er nødvendig å ha.


OBS: <script></script> skal omkranse koden hvis brukt i HTML
*/

document.addEventListener('DOMContentLoaded', function(e) {
  document.querySelector('.module.nav').style.display = 'none';
});
