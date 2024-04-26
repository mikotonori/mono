/*
Gir deg muligheten til å injisere styling direkte inn i elementer i HTML.
Dette gir høyere spesifisitet, og dermed høyere sjanse for at stylingen du legger til,
faktisk skinner gjennom til nettsiden.
*/

document.addEventListener('DOMContentLoaded', () => {
  const elMap = [
    [
      '#CSS .selector ~ .skrives + .her',
      [
        'rule: value;',
        'rule: value;',
        'rule: value;',
        'rule: value;',
        'rule: value;',
      ],
    ],
    [
      '#id',
      [
        'rule: value;',
        'rule: value;',
        'rule: value;',
        'rule: value;',
        'rule: value;',
      ],
    ],
    [
      '.class ~ siblingElement.siblingClass',
      [
        'rule: value;',
        'rule: value;',
        'rule: value;',
        'rule: value;',
        'rule: value;',
      ],
    ],
  ];

  elMap.forEach(elStyleSet => {
    const els = document.querySelectorAll(elStyleSet[0]);

    els.forEach(el => {
      const stylesForApplication = elStyleSet[1].reduce((styles, style) => {
        styles = styles.concat(' ', style);
        return styles;
      }, '');

      const originalStyle = el.getAttribute('style');

      const newStyleAttribute =
        originalStyle?.concat(' ', stylesForApplication) ??
        stylesForApplication;

      el.setAttribute('style', newStyleAttribute);
    });
  });
});
