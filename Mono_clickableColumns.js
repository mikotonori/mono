/*
Lar deg bruke en kolonne med klassen "cc_clickable" som "knapp". Tar også hensyn til universell utforming.

(1) Hvis du klikker på kolonnen, vil den første lenken* som fungerer som en lenke, aktiveres

(2) Kolonnen får aria-label som blir forsøkt tatt fra linken i denne prioritetsordenen:
    1. title-attribute'en
    2. teksten i lenka (f.eks. "Kontakt oss")
    Hvis disse ikke eksisterer vil den bli satt til 'Åpne linken i kolonnen'.

(3) Kolonnens role-attribute blir satt til "button"

(4) Kolonnens tabindex-attribute blir satt til 0, slik at man kan nå kolonnen med tab, og lar deg klikke på kolonnen med Enter/Space når den er fokusert


* - <a> -- dvs. også knapper, hvis disse egentlig er <a>-elementer

Anbefalt CSS for kolonne for å tydelig vise at denne er klikkbar og fungerer som en link/knapp:

.cc_clickable {
  cursor: pointer;
}

Hvis man kun vil bruke kolonnen som en link, og ikke ha en synlig link, kan man bruke denne CSS-koden for å fjerne linken uten å miste link-funksjonalitet:

.cc_clickable a {
  display: none;
}


OBS: <script></script> skal omkranse koden hvis brukt i HTML
*/

document.addEventListener('DOMContentLoaded', function(e) {
  document.querySelectorAll('.cc_clickable').forEach(clickable => {
    let linkToClick;
    let linkLabel;


    //----------------------------------------------------------(1)
    const clickableLinkArray = Array.from(clickable.querySelectorAll('a'));

    clickableLinkArray.some(columnLink => {
      if (columnLink.getAttribute('onclick') !== 'return false') {
        linkToClick = columnLink;

        return true;
      }

      return false;
    });

    clickable.addEventListener('click', () => linkToClick.click());


    //----------------------------------------------------------(2)
    if (linkToClick.hasAttribute('title')) {
      linkLabel = linkToClick.getAttribute('title');
    } else if (linkToClick.textContent !== '') {
      linkLabel = linkToClick.textContent;
    } else {
      linkLabel = 'Åpne linken i kolonnen';
    }

    clickable.setAttribute('aria-label', linkLabel);


    //----------------------------------------------------------(3)
    clickable.setAttribute('role', 'button');


    //----------------------------------------------------------(4)
    clickable.setAttribute('tabindex', '0');
    
    clickable.addEventListener('keydown', function(e) {
      if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
            clickable.click();
      }
    });
  });
});
