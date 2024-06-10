/*
Legg dette scriptet inn i global HTML for å få knapper til å navigere seg rundt på siden i editor.

OBS: husk å refresh'e siden for at scriptet skal kjøre etter å ha lagret.
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
    'bottom: 50%;',
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

  const iFrameDocSelector =
    'document.querySelector("iframe").contentWindow.document';

  const upButton = edDoc.createElement('a');
  upButton.setAttribute('id', 'edNavUpButton');
  const stylesUpButton = [
    'display: block;',
    'background-color: #1C7FA8;',
    'height: 40px;',
    'width: 40px;',
    'border-radius: 200px;',
    'position: relative;',
  ];
  const styleUpButton = stylesUpButton.reduce(stringStrs, '');
  upButton.setAttribute('style', styleUpButton);
  const upButtonScript = `${iFrameDocSelector}.querySelector('.scrollIcon').click();`;
  upButton.setAttribute('onclick', upButtonScript);
  //------------------------------------------//
  const upButtonSpan = edDoc.createElement('span');
  upButtonSpan.setAttribute('id', 'edNavUpButtonSpan');
  upButtonSpan.textContent = '&uarr;';
  upButtonSpan.setAttribute('style', styleSpan);
  upButton.insertAdjacentElement('afterbegin', upButtonSpan);

  const downButton = edDoc.createElement('a');
  downButton.setAttribute('id', 'edNavDownButton');
  const stylesDownButton = [
    'display: block;',
    'background-color: #1C7FA8;',
    'height: 40px;',
    'width: 40px;',
    'border-radius: 200px;',
    'position: relative;',
  ];
  const styleDownButton = stylesDownButton.reduce(stringStrs, '');
  downButton.setAttribute('style', styleDownButton);
  const downButtonScript = `${iFrameDocSelector}.querySelector('footer').scrollIntoView({behavior:"smooth"});`;
  downButton.setAttribute('onclick', downButtonScript);
  //------------------------------------------//
  const downButtonSpan = edDoc.createElement('span');
  downButtonSpan.setAttribute('id', 'edNavDownButtonSpan');
  downButtonSpan.textContent = '&darr;';
  downButtonSpan.setAttribute('style', styleSpan);
  downButton.insertAdjacentElement('afterbegin', downButtonSpan);

  navMenuContainer.insertAdjacentElement('afterbegin', upButton);
  navMenuContainer.insertAdjacentElement('beforeend', downButton);

  const openNavButton = edDoc.createElement('a');
  openNavButton.setAttribute('id', 'edNavOpenButton');
  const stylesOpenNavButton = [
    'display: block;',
    'height: 65px;',
    'width: 65px;',
    'background-color: #1C7FA8;',
    'border-radius: 200px;',
    'transition: height width 0.4s ease;',
  ];
  const styleOpenNavButton = stylesOpenNavButton.reduce(stringStrs, '');
  openNavButton.setAttribute('style', styleOpenNavButton);
  //------------------------------------------//
  const openNavButtonSpan = edDoc.createElement('span');
  openNavButtonSpan.setAttribute('id', 'edNavOpenButtonSpan');
  openNavButtonSpan.textContent = 'NAV';
  openNavButtonSpan.setAttribute('style', styleSpan);
  openNavButton.insertAdjacentElement('afterbegin', openNavButtonSpan);

  upButton.insertAdjacentElement('afterend', openNavButton);

  const navMenu = edDoc.createElement('div');
  navMenu.setAttribute('id', 'edNavMenu');
  const stylesNavMenu = [
    'background-color: #1C7FA8;',
    'border-radius: 15px;',
    'padding: 10px 15px 10px 15px;',
    'position: absolute;',
    'left: -250px;',
    'top: 50%;',
    'translate: 0 -50%;',
    'color: white;',
  ];
  const styleNavMenu = stylesNavMenu.reduce(stringStrs, '');
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
  const stylesListLink = [
    'display: block;',
    'border-radius: 200px;',
    'text-decoration: none;',
    'font-weight: 500;',
    'color: white;',
    'padding: 5px 10px 5px 10px;',
  ];
  const styleListLink = stylesListLink.reduce(stringStrs, '');
  if (!startpakke) {
    siteNavLinks.forEach((link, i, arr) => {
      const linkItem = edDoc.createElement('li');
      linkItem.setAttribute('id', `edNavListItem-${i + 1}`);
      const linkItemStyle = `text-transform: uppercase;`;
      linkItem.setAttribute('style', linkItemStyle);
      //------------------------------------------//
      const listLink = edDoc.createElement('a');
      listLink.setAttribute('id', `edNavListLink-${i + 1}`);
      let linkHref = link.getAttribute('href');
      if (linkHref.indexOf('?tool')) linkHref = linkHref.slice(0, -7);
      const home = linkHref === '/';
      const listLinkScript = `${iFrameDocSelector}.querySelector('nav [href^="${linkHref}"]').click();`;
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

  const toggleButton = edDoc.createElement('a');
  toggleButton.setAttribute('id', 'edNavToggleButton');
  toggleButton.classList.add('edNavToggleButtonActive');
  toggleButton.textContent = '&nbsp;';
  const toggleButtonStyleEl = edDoc.createElement('style');
  toggleButtonStyleEl.setAttribute('id', 'custom-style_edNavToggle');
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
