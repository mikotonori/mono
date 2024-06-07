/*
Lar deg definere color i klassen .scrollIconHover i custom CSS slik at pilen i scrolleknappen skifter farge når du holder musen over.

Lar deg også definere utseende til scrolleknappen og -ikonet når de blir fokusert i klassen .scrollIconFocus.

CSS for å stille på scrolleknappens pilikon når musa går over den:

.scrollIconHover::before {
	color: #101010 !important;
}

CSS for å stille på scrolleknappen og dens pilikon når de fokuseres:

.scrollIconFocus {
	background-color: #fff !important;
  	border: 1px solid #101010 !important;
}

.scrollIconFocus span::before {
	color: #101010 !important;
}

OBS: <script></script> skal omkranse koden hvis brukt i HTML
*/

document.addEventListener('DOMContentLoaded', function(e) {
  const scrollIcon = document.querySelector('.scrollIcon');
  const scrollIconSpan = document.querySelector('.scrollIcon span');

  scrollIcon.addEventListener('mouseenter', function(e) {
    scrollIconSpan.classList.add('scrollIconHover');
  });

  scrollIcon.addEventListener('mouseleave', function(e) {
    scrollIconSpan.classList.remove('scrollIconHover');
  });

  scrollIcon.addEventListener('focus', function(e) {
    scrollIcon.classList.add('scrollIconFocus');
  });

  scrollIcon.addEventListener('blur', function(e) {
    scrollIcon.classList.remove('scrollIconFocus');
  });

  document.documentElement.addEventListener('click', function(e) {
    if (e.target.classList.contains('scrollIconHover') || e.target.querySelector('.scrollIconHover')) return;

    const hoverScrollIcon = document.querySelector('.scrollIconHover');
    if (hoverScrollIcon) hoverScrollIcon.classList.remove('.scrollIconHover');
  });
});
