/*
Lar deg bruke en kolonne med klassen "cc_clickable" som "knapp". Tar også hensyn til universell utforming.

(1) Hvis du klikker på kolonnen, vil den første lenken* som fungerer som en lenke, aktiveres
  * <a> -- dvs. også knapper, hvis disse egentlig er <a>-elementer

(2) Kolonnen får aria-label og title som blir forsøkt tatt fra lenken i denne prioritetsordenen:
    1. title-attribute'en
    2. teksten i lenken (f.eks. "Kontakt oss")
    Hvis disse ikke eksisterer vil den bli satt til 'Åpne lenken i kolonnen'.

(3) Kolonnens role-attribute blir satt til "button"

(4) Kolonnens tabindex-attribute blir satt til 0, slik at man kan nå kolonnen med tab. Har også lagt til funksjonalitet som lar deg klikke på kolonnen med Enter/Space når den er fokusert

(5) CSS-styling blir lagt til i HTML-dokumentets head-element, for at en skal få håndpeker når man beveger musen over kolonnen(e) med .cc_clickable

Hvis man kun vil bruke kolonnen som en lenke/knapp, og ikke ha en synlig lenke, kan man bruke denne CSS-koden for å visuelt fjerne alle (faktiske) lenker uten å miste lenke-funksjonalitet:

.cc_clickable a:not([onclick="return false"]) {
	display: none;
}
(*) Setter aria-hidden="true" på lenken hvis CSS rett over blir brukt, eller ellers når faktiske lenker i kolonner med .cc_clickable har display satt til 'none'.

OBS: <script></script> skal omkranse koden hvis brukt i HTML

P.S. Når det blir nevnt "faktiske" lenker, så er dette ment å ekskludere "wrappers", altså <a>-tags rundt bilder, f.eks. (disse kan imidlertid selvfølgelig være réelle lenker også, men da går de under "faktiske lenker").
*/

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.cc_clickable').forEach(clickable => {
    let linkLabel;

    //----------------------------------------------------------(1)
    const linkQuery = 'a:not([onclick="return false"])';
    const linkToClick = clickable.querySelector(linkQuery);

    clickable.addEventListener('click', () => linkToClick.click());

    //----------------------------------------------------------(2)
    if (linkToClick.hasAttribute('title')) {
      linkLabel = linkToClick.getAttribute('title');
    } else if (linkToClick.textContent !== '') {
      linkLabel = linkToClick.textContent;
    } else {
      linkLabel = 'Åpne lenken i kolonnen';
    }

    clickable.setAttribute('aria-label', linkLabel);
    clickable.setAttribute('title', linkLabel);

    //----------------------------------------------------------(3)
    clickable.setAttribute('role', 'button');

    //----------------------------------------------------------(4)
    clickable.setAttribute('tabindex', '0');

    clickable.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        clickable.click();
      }
    });

    //----------------------------------------------------------(*)
    if (window.getComputedStyle(linkToClick).display === 'none') {
      linkToClick.setAttribute('aria-hidden', 'true');
    }
  });

  //----------------------------------------------------------(5)
  const cursorStyle = document.createElement('style');
  cursorStyle.setAttribute('id', 'custom-style_clickable-columns');

  const c = '.cc_clickable';
  cursorStyle.textContent = /*html*/ `${c}, ${c} * { cursor: pointer !important; }`;

  const head = document.querySelector('head');
  head.insertAdjacentElement('beforeend', cursorStyle);
});
