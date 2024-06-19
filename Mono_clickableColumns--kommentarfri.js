document.addEventListener('DOMContentLoaded', () => {
  const pwd = window.parent.document;
  const editor = pwd.querySelector('[class*="editor"]') !== null;

  if (editor) {
    console.log('Editor mode: custom script not executed.');
    return;
  }

  document.querySelectorAll('.cc_clickable').forEach(clickable => {
    let linkLabel;

    const linkQuery = 'a:not([onclick="return false"])';
    const linkToClick = clickable.querySelector(linkQuery);
    if (!linkToClick) return;

    clickable.addEventListener('click', () => linkToClick.click());

    if (linkToClick.hasAttribute('title')) {
      linkLabel = linkToClick.getAttribute('title');
    } else if (linkToClick.textContent !== '') {
      linkLabel = linkToClick.textContent;
    } else {
      linkLabel = 'Åpne lenken i kolonnen';
    }

    clickable.setAttribute('aria-label', linkLabel);
    clickable.setAttribute('title', linkLabel);

    clickable.setAttribute('role', 'button');

    clickable.setAttribute('tabindex', '0');

    clickable.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        clickable.click();
      }
    });

    if (window.getComputedStyle(linkToClick).display === 'none') {
      linkToClick.setAttribute('aria-hidden', 'true');
    }
  });

  const cursorStyle = document.createElement('style');
  cursorStyle.setAttribute('id', 'custom-style_clickable-columns');

  const c = '.cc_clickable';
  cursorStyle.textContent = /*html*/ `${c}, ${c} * { cursor: pointer !important; }`;

  const head = document.querySelector('head');
  head.insertAdjacentElement('beforeend', cursorStyle);
});
