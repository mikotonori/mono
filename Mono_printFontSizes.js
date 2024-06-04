/*

Bruk dette scriptet til å få en oversikt over alle tekstrørrelsene på siden.

"Arvede" størrelser vises som 'undefined'.

Hvis du vil legge til andre teksttyper enn de standarde,
så må du legge til id'en til typen i textTypes under.

En tommelfingerregel her, hvis du vil prøve deg frem i stedet for å lete gjennom HTMLen,
er 1. at det er kun små bokstaver, og 2. at det ikke er mellomrom.

Eks. "Footer text" -> "footertext"

Hvis du av en eller annen grunn måtte ønske å presentere en custom teksttype like "flott" som
de standarde, så legg til hvordan du vil at navnet skal vises i properTextTypes under som dette,
med id'n som "key" i objektet:

const properTextTypes: {
  ...,
  footertext: "Footer Text",
};

*/

document.addEventListener('DOMContentLoaded', () => {
  const textTypes = [
    'darkspottext',
    'spottext',
    'darksmallspottext',
    'smallspottext',
    'headline',
    'lightheadline',
    'subtitle',
    'lightsubtitle',
    'smallsubtitle',
    'lightsmallsubtitle',
    'preamble',
    'lightpreamble',
    'bodytext',
    'lightbodytext',
    'smalltext',
    'lightsmalltext',
  ];

  const properTextTypes = {
    darkspottext: 'Dark Spot Text',
    spottext: 'Light Spot Text',
    darksmallspottext: 'Dark Small Spot Text',
    smallspottext: 'Light Small Spot Text',
    headline: 'Dark Headline',
    lightheadline: 'Light Headline',
    subtitle: 'Dark Subtitle',
    lightsubtitle: 'Light Subtitle',
    smallsubtitle: 'Dark Small Subtitle',
    lightsmallsubtitle: 'Light Small Subtitle',
    preamble: 'Dark Preamble',
    lightpreamble: 'Light Preamble',
    bodytext: 'Dark Body Text',
    lightbodytext: 'Light Body Text',
    smalltext: 'Dark Small Text',
    lightsmalltext: 'Light Small Text',
  };

  let fontSizes = {};
  textTypes.forEach(type => {
    let query = `style[id*="${type}"]`;

    if (!type.includes('dark')) {
      query = query.concat('', ':not([id*="dark"])');
    }

    if (!type.includes('light')) {
      query = query.concat('', ':not([id*="light"])');
    }

    if (!type.includes('small')) {
      query = query.concat('', ':not([id*="small"])');
    }

    const pcQueryAddition = ':not([id*="-sm"]):not([id*="-md"])';

    const pcStyle = document.querySelector(query.concat('', pcQueryAddition));
    const tabletStyle = document.querySelector(query.concat('', '[id*="-md"]'));
    const phoneStyle = document.querySelector(query.concat('', '[id*="-sm"]'));

    const sizes = {
      pc: findFontSize(pcStyle),
      tablet: findFontSize(tabletStyle),
      phone: findFontSize(phoneStyle),
    };

    fontSizes[properTextTypes[type] ?? type] = sizes;
  });

  console.table(fontSizes);

  function findFontSize(styleEl) {
    if (!styleEl) {
      return;
    }

    const style = styleEl.textContent;

    const fontSizeRuleStartIndex = style.indexOf('font-size');

    if (fontSizeRuleStartIndex === -1) {
      return;
    }

    const fontSizeRuleLength = 'font-size: '.length;
    const startIndex = fontSizeRuleStartIndex + fontSizeRuleLength;
    const endIndex = style.indexOf('p', startIndex);

    return +style.slice(startIndex, endIndex);
  }
});
