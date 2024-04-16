const live = state => state;

if (live(false)) {
  document.addEventListener('DOMContentLoaded', () => {
    const textModules = document.querySelectorAll('.module.text');

    const target = 'sett-inn-bilde-her';

    textModules.forEach(textModule => {
      const imgsToPutInText = textModule
        .closest('.col')
        .querySelectorAll('img');
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
} else {
  document.addEventListener('DOMContentLoaded', () => {
    console.log(document.querySelectorAll('.text.module'));
  });
}
