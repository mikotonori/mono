/*
Legg dette scriptet inn i global HTML for å få knapper til å navigere seg rundt på siden i editor.

OBS: husk å refresh'e siden for at scriptet skal kjøre etter å ha lagret.

Home: Hopp til toppen
PageUp: Hopp et hakk oppover
PageDown: Hopp et hakk nedover
End: Hopp til bunnen

*/

document.addEventListener('DOMContentLoaded', () => {
  const edDoc = window.parent.document;
  const editor = edDoc.querySelector('[class*="editor"]') !== null;

  if (!editor) {
    return;
  }

  if (edDoc.querySelector('[id^="edNav"]')) {
    const navMenu = edDoc.querySelector('#edNavMenu');
    const openNavButton = edDoc.querySelector('#edNavOpenButton');
    const upButton = edDoc.querySelector('#edNavUpButton');
    const downButton = edDoc.querySelector('#edNavDownButton');
    const toggleButton = edDoc.querySelector('#edNavToggleButton');
    const navMenuContainer = edDoc.querySelector('#edNavContainer');
    const scrollUpButton = edDoc.querySelector('#edNavScrollUpButton');
    const scrollDownButton = edDoc.querySelector('#edNavScrollDownButton');

    const closeMenu = () => {
      navMenu.classList.remove('edNavMenuOpen');
      navMenu.setAttribute('inert', '');
    };

    openNavButton.addEventListener('click', function (e) {
      navMenu.classList.toggle('edNavMenuOpen');

      if (navMenu.classList.contains('edNavMenuOpen')) {
        navMenu.removeAttribute('inert');
      } else {
        navMenu.setAttribute('inert', '');
      }
    });

    const menuLinks = edDoc.querySelectorAll('[id^="edNavListLink"]');
    menuLinks.forEach(ml => {
      ml.addEventListener('click', closeMenu);
    });

    upButton.addEventListener('click', closeMenu);
    downButton.addEventListener('click', closeMenu);

    const scrollByVh = direction => {
      const vh = document.documentElement.clientHeight;
      const scrollAmount = vh * 0.8;

      if (direction === 'up') {
        window.scrollBy({ top: -scrollAmount, behavior: 'smooth' });
      } else if (direction === 'down') {
        window.scrollBy({ top: scrollAmount, behavior: 'smooth' });
      }
    };

    let intervalId;

    const startScrolling = direction => {
      intervalId = setInterval(() => scrollByVh(direction), 500);
    };

    const stopScrolling = () => clearInterval(intervalId);

    scrollUpButton.addEventListener('mousedown', () => startScrolling('up'));
    scrollUpButton.addEventListener('mouseup', stopScrolling);
    scrollUpButton.addEventListener('mouseleave', stopScrolling);
    scrollUpButton.addEventListener('click', () => scrollByVh('up'));
    scrollUpButton.addEventListener('click', closeMenu);
    edDoc.addEventListener('keydown', function (e) {
      if (e.key !== 'PageUp') {
        return;
      }

      scrollByVh('up');
    });
    scrollDownButton.addEventListener('click', () => scrollByVh('down'));
    scrollDownButton.addEventListener('click', closeMenu);
    scrollDownButton.addEventListener('mousedown', () =>
      startScrolling('down')
    );
    scrollDownButton.addEventListener('mouseup', stopScrolling);
    scrollDownButton.addEventListener('mouseleave', stopScrolling);
    edDoc.addEventListener('keydown', function (e) {
      if (e.key !== 'PageDown') {
        return;
      }

      scrollByVh('down');
    });

    toggleButton.addEventListener('click', function (e) {
      let changedInert = false;
      navMenuContainer.childNodes.forEach(n => {
        if (n === toggleButton) return;
        n.classList.toggle('edNavHidden');

        if (n.classList.contains('edNavHidden') && !changedInert) {
          navMenuContainer.setAttribute('inert', '');
          changedInert = true;
        } else if (!changedInert) {
          navMenuContainer.removeAttribute('inert');
          changedInert = true;
        }
      });

      this.classList.toggle('edNavToggleButtonActive');
    });

    return;
  }

  const edNavStyles = edDoc.createElement('style');
  edDoc.querySelector('head').insertAdjacentElement('beforeend', edNavStyles);

  const navMenuContainer = edDoc.createElement('div');
  navMenuContainer.setAttribute('id', 'edNavContainer');
  const stylesNavMenuContainer = [
    'position: fixed;',
    'bottom: 26%;',
    'right: 45px;',
    'translate: 0 -50%;',
    'display: flex;',
    'flex-direction: column;',
    'gap: 5px;',
    'justify-content: center;',
    'align-items: center;',
    'z-index: 7;',
    'transition: gap 0.3s ease;',
  ];

  const stringStrs = (styles, s) => (styles = styles + s);

  const styleNavMenuContainer = stylesNavMenuContainer.reduce(stringStrs, '');
  navMenuContainer.setAttribute('style', styleNavMenuContainer);

  const stylesSpan = [
    'display: inline-block;',
    'position: absolute;',
    'top: 50%;',
    'left: 50%;',
    'translate: -50% -50%;',
    'color: white;',
    'font-weight: 700;',
  ];
  const styleSpan = stylesSpan.reduce(stringStrs, '');

  const stylesScrollButton = [
    'display: block;',
    'background-color: #1C7FA8;',
    'height: 40px;',
    'width: 40px;',
    'border-radius: 200px;',
    'position: relative;',
  ];
  const styleScrollButton = stylesScrollButton.reduce(stringStrs, '');

  const stylesOpenNavButton = [
    'display: block;',
    'height: 65px;',
    'width: 65px;',
    'background-color: #1C7FA8;',
    'border-radius: 200px;',
    'transition: height width 0.4s ease;',
  ];
  const styleOpenNavButton = stylesOpenNavButton.reduce(stringStrs, '');

  const stylesNavMenu = [
    'background-color: #1C7FA8;',
    'border-radius: 15px;',
    'padding: 10px 15px 10px 15px;',
    'position: absolute;',
    'left: -265px;',
    'top: 50%;',
    'translate: 0 -50%;',
    'color: white;',
    'width: 250px;',
  ];
  const styleNavMenu = stylesNavMenu.reduce(stringStrs, '');

  const stylesListLink = [
    'display: block;',
    'border-radius: 200px;',
    'text-decoration: none;',
    'font-weight: 500;',
    'color: white;',
    'padding: 5px 10px 5px 10px;',
  ];
  const styleListLink = stylesListLink.reduce(stringStrs, '');

  const menuStyles = [
    '#edNavMenu {',
    'opacity: 0;',
    'transition: opacity 0.2s ease;',
    '} ',
    '.edNavMenuOpen {',
    'opacity: 1 !important;',
    '} ',
    '#edNavContainer:has(.edNavMenuOpen) {',
    'gap: 15px !important;',
    '} ',
    '#edNavContainer:has(.edNavMenuOpen) #edNavOpenButtonSpan {',
    'display: none !important;',
    '} ',
    '#edNavMenu a:hover {',
    'background-color: #145976;',
    '} ',
    '#edNavMenu li:not(:last-child) {',
    'margin-bottom: 10px;',
    '} ',
  ];
  const menuStyle = menuStyles.reduce(stringStrs, '');

  const toggleButtonStyles = [
    '#edNavToggleButton {',
    'height: 10px;',
    'width: 10px;',
    'background-color: red;',
    'font-size: 72px;',
    'position: fixed;',
    'top: 50%;',
    'right: 25px;',
    'translate: 0 -50%;',
    'z-index: 7;',
    'border-radius: 200px;',
    '} ',
    '#edNavToggleButton.edNavToggleButtonActive {',
    'background-color: forestgreen;',
    '} ',
    '.edNavHidden {',
    'display: none !important;',
    '} ',
  ];
  const toggleButtonStyle = toggleButtonStyles.reduce(stringStrs, '');

  const iFrameDocSelector =
    'document.querySelector("iframe").contentWindow.document';

  const makeButton = config => {
    const newButton = edDoc.createElement('a');
    newButton.setAttribute('id', config.id);
    newButton.setAttribute('style', config.style);
    if (config.script) newButton.setAttribute('onclick', config.script);
    config.insertEl.insertAdjacentElement(config.insertPosition, newButton);

    const newButtonSpan = edDoc.createElement('span');
    newButtonSpan.setAttribute('id', config.id + 'Span');
    newButtonSpan.setAttribute('style', styleSpan);
    newButtonSpan.textContent = config.spanText;
    newButton.insertAdjacentElement('afterbegin', newButtonSpan);

    return newButton;
  };

  const upButtonScript = `${iFrameDocSelector}.querySelector('.scrollIcon').click();`;
  const upButtonConfig = {
    id: 'edNavUpButton',
    style: styleScrollButton,
    insertEl: navMenuContainer,
    insertPosition: 'afterbegin',
    spanText: '&uarr;',
    script: upButtonScript,
  };
  const upButton = makeButton(upButtonConfig);
  edDoc.documentElement.addEventListener('keydown', function (e) {
    if (e.key !== 'Home' || edDoc.querySelector('.fileManager') || edDoc.querySelector('.v--modal-overlay')) {
      return;
    }

    upButton.click();
  });

  const downButtonScript = `${iFrameDocSelector}.querySelector('[role="main"] .row:not(.rowGroup > .row):last-child').scrollIntoView({behavior:"smooth"});`;
  const downButtonConfig = {
    id: 'edNavDownButton',
    style: styleScrollButton,
    insertEl: navMenuContainer,
    insertPosition: 'beforeend',
    spanText: '&darr;',
    script: downButtonScript,
  };
  const downButton = makeButton(downButtonConfig);
  edDoc.documentElement.addEventListener('keydown', function (e) {
    if (e.key !== 'End' || edDoc.querySelector('.fileManager') || edDoc.querySelector('.v--modal-overlay')) {
      return;
    }

    downButton.click();
  });

  const openNavButtonConfig = {
    id: 'edNavOpenButton',
    style: styleOpenNavButton,
    insertEl: upButton,
    insertPosition: 'afterend',
    spanText: 'NAV',
  };
  const openNavButton = makeButton(openNavButtonConfig);

  const navMenu = edDoc.createElement('div');
  navMenu.setAttribute('id', 'edNavMenu');
  navMenu.setAttribute('style', styleNavMenu);
  navMenu.setAttribute('inert', '');
  //------------------------------------------//
  const navList = edDoc.createElement('ul');
  navList.setAttribute('id', 'edNavMenuList');
  navList.setAttribute('style', 'list-style: none; text-align: center;');
  navMenu.insertAdjacentElement('afterbegin', navList);
  //------------------------------------------//
  const querySiteNavLinks = 'nav a:not(.closeBtn)';
  const siteNavLinks = document.querySelectorAll(querySiteNavLinks);

  const startpakke = Array.from(siteNavLinks).some(a => {
    return a.getAttribute('href').includes('#');
  });

  if (!startpakke) {
    siteNavLinks.forEach((link, i, arr) => {
      const linkItem = edDoc.createElement('li');
      linkItem.setAttribute('id', `edNavListItem-${i + 1}`);
      const linkItemStyle = `text-transform: uppercase;`;
      linkItem.setAttribute('style', linkItemStyle);
      //------------------------------------------//
      const listLink = edDoc.createElement('a');
      listLink.setAttribute('id', `edNavListLink-${i + 1}`);
      let linkHref = link.getAttribute('href') === '/' ? '/' : '#';
      if (linkHref.indexOf('?tool')) linkHref = linkHref.slice(0, -7);
      const home = linkHref === '/';
      const listLinkScript = `(() => {
  window.parent.document.querySelectorAll('.selectorPagesList .mds-button').forEach(btn => { 
    if (btn.textContent.includes('${link.textContent}')) btn.click(); 
  });
})();`;
      listLink.setAttribute('onclick', listLinkScript);
      listLink.setAttribute('style', styleListLink);
      listLink.textContent = link.textContent;

      linkItem.insertAdjacentElement('afterbegin', listLink);
      navList.insertAdjacentElement('beforeend', linkItem);
    });
  } else {
    siteNavLinks.forEach((link, i, arr) => {
      const linkItem = edDoc.createElement('li');
      linkItem.setAttribute('id', `edNavListItem-${i + 1}`);
      const linkItemStyle = `text-transform: uppercase;`;
      linkItem.setAttribute('style', linkItemStyle);
      //------------------------------------------//
      const listLink = edDoc.createElement('a');
      listLink.setAttribute('id', `edNavListLink-${i + 1}`);
      const linkID = link.getAttribute('href').slice(1);
      const listLinkScript = `${iFrameDocSelector}.querySelector('.row .rowanchor[id="${linkID}"]').scrollIntoView({behavior:'smooth'});`;
      listLink.setAttribute('onclick', listLinkScript);
      listLink.setAttribute('style', styleListLink);
      listLink.textContent = link.textContent;
      if (!linkID.includes('?tool')) {
        linkItem.insertAdjacentElement('afterbegin', listLink);
        navList.insertAdjacentElement('beforeend', linkItem);
      } else {
        linkItem.remove();
        listLink.remove();
      }
    });
  }

  navMenuContainer.insertAdjacentElement('afterbegin', navMenu);

  const edBody = edDoc.querySelector('body');
  edBody.insertAdjacentElement('beforeend', navMenuContainer);

  const menuStyleEl = edDoc.createElement('style');
  menuStyleEl.setAttribute('id', 'custom-styles_edNavMenu');

  menuStyleEl.textContent = menuStyle;

  navMenuContainer.insertAdjacentElement('beforebegin', menuStyleEl);

  const closeMenu = () => {
    navMenu.classList.remove('edNavMenuOpen');
    navMenu.setAttribute('inert', '');
  };

  openNavButton.addEventListener('click', function (e) {
    navMenu.classList.toggle('edNavMenuOpen');

    if (navMenu.classList.contains('edNavMenuOpen')) {
      navMenu.removeAttribute('inert');
    } else {
      navMenu.setAttribute('inert', '');
    }
  });

  const menuLinks = edDoc.querySelectorAll('[id^="edNavListLink"]');
  menuLinks.forEach(ml => {
    ml.addEventListener('click', closeMenu);
  });

  upButton.addEventListener('click', closeMenu);
  downButton.addEventListener('click', closeMenu);

  const scrollUpButtonConfig = {
    id: 'edNavScrollUpButton',
    style: styleScrollButton,
    insertEl: upButton,
    insertPosition: 'afterend',
    spanText: '︽',
  };
  const scrollUpButton = makeButton(scrollUpButtonConfig);

  const scrollDownButtonConfig = {
    id: 'edNavScrollDownButton',
    style: styleScrollButton,
    insertEl: downButton,
    insertPosition: 'beforebegin',
    spanText: '︾',
  };
  const scrollDownButton = makeButton(scrollDownButtonConfig);

  const scrollByVh = direction => {
    const vh = document.documentElement.clientHeight;
    const scrollAmount = vh * 0.8;

    if (direction === 'up') {
      window.scrollBy({ top: -scrollAmount, behavior: 'smooth' });
    } else if (direction === 'down') {
      window.scrollBy({ top: scrollAmount, behavior: 'smooth' });
    }
  };

  let intervalId;

  const startScrolling = direction => {
    intervalId = setInterval(() => scrollByVh(direction), 500);
  };

  const stopScrolling = () => clearInterval(intervalId);

  scrollUpButton.addEventListener('click', () => scrollByVh('up'));
  scrollUpButton.addEventListener('mousedown', () => startScrolling('up'));
  scrollUpButton.addEventListener('mouseup', stopScrolling);
  scrollUpButton.addEventListener('mouseleave', stopScrolling);
  edDoc.addEventListener('keydown', function (e) {
    if (e.key !== 'PageUp') {
      return;
    }

    scrollByVh('up');
  });
  scrollUpButton.addEventListener('click', closeMenu);
  scrollDownButton.addEventListener('click', () => scrollByVh('down'));
  scrollDownButton.addEventListener('mousedown', () => startScrolling('down'));
  scrollDownButton.addEventListener('mouseup', stopScrolling);
  scrollDownButton.addEventListener('mouseleave', stopScrolling);
  edDoc.addEventListener('keydown', function (e) {
    if (e.key !== 'PageDown') {
      return;
    }

    scrollByVh('down');
  });
  scrollDownButton.addEventListener('click', closeMenu);

  const toggleButton = edDoc.createElement('a');
  toggleButton.setAttribute('id', 'edNavToggleButton');
  toggleButton.classList.add('edNavToggleButtonActive');
  toggleButton.textContent = '&nbsp;';
  const toggleButtonStyleEl = edDoc.createElement('style');
  toggleButtonStyleEl.setAttribute('id', 'custom-style_edNavToggle');
  toggleButtonStyleEl.textContent = toggleButtonStyle;
  navMenuContainer.insertAdjacentElement('beforebegin', toggleButtonStyleEl);
  navMenuContainer.insertAdjacentElement('beforebegin', toggleButton);
  toggleButton.addEventListener('click', function (e) {
    let changedInert = false;
    navMenuContainer.childNodes.forEach(n => {
      if (n === toggleButton) return;
      n.classList.toggle('edNavHidden');

      if (n.classList.contains('edNavHidden') && !changedInert) {
        navMenuContainer.setAttribute('inert', '');
        changedInert = true;
      } else if (!changedInert) {
        navMenuContainer.removeAttribute('inert');
        changedInert = true;
      }
    });

    this.classList.toggle('edNavToggleButtonActive');
  });
});
