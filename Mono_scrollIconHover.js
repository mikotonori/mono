// Lar deg definere color i klassen .scrollIconHover i custom CSS slik at pilen i scrolleknappen skifter farge når du holder musen over
/*
CSS for å stille på scrolleknappens ikon:
.scrollIconHover::before {
	color: #101010 !important;
}
*/
// <script></script> skal omkranse koden hvis brukt i HTML

document.addEventListener('DOMContentLoaded', function(e) {
  const scrollIcon = document.querySelector('.scrollIcon');
  const scrollIconSpan = document.querySelector('.scrollIcon span');

  scrollIcon.addEventListener('mouseenter', function(e) {
    scrollIconSpan.classList.add('scrollIconHover');
  });

  scrollIcon.addEventListener('mouseleave', function(e) {
    scrollIconSpan.classList.remove('scrollIconHover');
  });
});
