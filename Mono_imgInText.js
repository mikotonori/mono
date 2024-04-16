const live = state => state; // OBS Skal bare være én av disse i hele global HTML

if (live(true)) { // Bytt true ut med false hvis du vil "skru av" scriptet. Lønner seg også med en refresh!
  document.addEventListener('DOMContentLoaded', () => {
    const textModules = document.querySelectorAll('.module.text');

    const target = 'sett-inn-bilde-her';

    textModules.forEach(textModule => {
      const imgsToPutInText = textModule.closest('.col').querySelectorAll('img');
      let nextImgIndex = 0;

      const paragraphs = textModule.querySelectorAll('p');

      let foundHTML = false;
      paragraphs.forEach(p => {
        if (p.textContent.startsWith('<img')) foundHTML = true;
        if (!foundHTML && p.textContent.indexOf(target) === -1) return;

        let content;

        if (foundHTML) {
          content = p.textContent;
        } else {
          content = imgsToPutInText[nextImgIndex].outerHTML;
          imgsToPutInText[nextImgIndex].remove();
          nextImgIndex++;
        }

        p.insertAdjacentHTML('afterend', content);
        p.remove();
      });
    });
  });
}
