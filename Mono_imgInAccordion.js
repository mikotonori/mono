const live = state => state; // OBS Skal bare være én av disse i hele global HTML

if (live(true)) { // Bytt true ut med false hvis du vil "skru av" scriptet. Lønner seg også med en refresh!
  document.addEventListener('DOMContentLoaded', () => {
    const accordions = document.querySelectorAll('.module.cc_img-in-accordion');

    const flyttTekst = 'flytt-bilde-til-';

    accordions.forEach(accordion => {
      const items = accordion.querySelectorAll('li');
      const itemsToRemove = [];

      items.forEach((item, itemIndex) => {
        if (!item.querySelector('img')) return;

        const paragraphs = item.querySelectorAll('p:not(.itemTitle)');

        Array.from(paragraphs).some(p => {
          if (p.textContent.contains(flyttTekst)) {
            const imgOuterHTML = item.querySelector('img').outerHTML;

            const startIndex = p.textContent.indexOf(flyttTekst);
            const endIndex = startIndex + flyttTekst.length;

            const paragraphNumber = p.textContent.substring(endIndex, p.textContent.length) * 1;

            items[itemIndex - 1].querySelectorAll('p:not(.itemTitle)')[paragraphNumber - 1].insertAdjacentHTML('afterend', imgOuterHTML);

            itemsToRemove.push(item);

            return true;
          }

          return false;
        });
      });

      itemsToRemove.forEach(i => i.remove());
    });
  });
}
