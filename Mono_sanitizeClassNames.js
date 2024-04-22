/*
Siden Mono ikke fjerner custom-klasser du legger til,
og siden dette kan ha noe å si for scripting/styling noen ganger,
kan du bruke dette scriptet for å fjerne klasser som ikke skal være på siden/som ikke skal være på visse elementer.

OBS: <script></script> må omkranse koden hvis den legges inn i HTML!

P.S. ikke legg til '.' foran klassenavnene, for dette gjøres allerede i scriptet :)
*/

document.addEventListener('DOMContentLoaded', () => {
  //---------------------------------------------------------
  const listOfClassNamesToRemove = [
    'klasser',
    'du-vil-fjerne',
    'fra-alle-elementer',
    'på-siden',
  ];
  //---------------------------------------------------------

  listOfClassNamesToRemove.forEach(className => {
    const allElementsWithClass = document.querySelectorAll(`.${className}`);
    allElementsWithClass.forEach(el => el.classList.remove(className));
  });

  //---------------------------------------------------------
  const classRemoveMap = {
    etKlasseNavn: 'klasse-som-fjernes-fra-elementer-med-klassen-etKlasseNavn',
    etAnnetKlasseNavn: [
      'klasser',
      'du-vil',
      'fjerne-fra-elementer',
      'med-klassen-etAnnetKlasseNavn',
    ],
  };
  //---------------------------------------------------------

  const removalSources = Object.keys(classRemoveMap);

  removalSources.forEach(removalSource => {
    const removalTarget = classRemoveMap[removalSource];
    const removalSourceEls = document.querySelectorAll(`.${removalSource}`);

    removalSourceEls.forEach(removalSourceEl => {
      if (typeof removalTarget === 'string') {
        removalSourceEl.classList.remove(removalTarget);
      } else if (removalTarget instanceof Array) {
        removalTarget.forEach(target => {
          removalSourceEl.classList.remove(target);
        });
      }
    });
  });
});
