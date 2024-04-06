document.addEventListener('DOMContentLoaded', function () {
  const gridConfig = {
    parentColumnSize: 6, // 1 til 12
    gridColumnCount: 2,
    gridColumnMinWidth: '10rem',
    gridRowCount: null,
    columnGap: 0,
    rowGap: 0,
    parentColumnPadding: 0,
    gridsCreated: 0,
  };
  let elementsToSide = Array.from(this.querySelectorAll('.cc_grid-to-right'));

  const leftHeads = Array.from(this.querySelectorAll('.cc_grid-to-left'));
  if (leftHeads.length > 0) {
    elementsToSide.concat(leftHeads);
  }

  const rows = [];

  if (elementsToSide.length === 0) {
    return;
  } else if (elementsToSide.length === 1) {
    rows[0] = [elementsToSide[0].closest('.row')];
  } else {
    elementsToSide.forEach(el => {
      const row = el.closest('.row');

      if (rows.includes(row)) {
        return;
      }

      rows.push(row);
    });
  }

  rows.forEach(row => {
    const cols = row.querySelectorAll('.col:not(.cc_no-grid)');
    const gridCols = [];

    let side = '';
    let rightGridHead;
    cols.forEach(col => {
      if (col.classList.contains('cc_grid-to-right')) {
        rightGridHead = col;
        side = 'right';
        return;
      } else if (col.classList.contains('cc_grid-to-left')) {
        createGridOnSide(gridConfig, side, gridCols, col);
        return;
      } else if (col.classList.contains('cc_in-left-grid')) {
        side === 'right' &&
          createGridOnSide(gridConfig, side, gridCols, rightGridHead);
        gridCols.length = 0;

        side = 'left';
      }

      gridCols.push(col);
    });

    if (side === '') {
      createGridOnSide(gridConfig, side, gridCols, rightGridHead);
    }
  });
});

function createGridOnSide(config, sideOfGrid, gridColumns, elementToSide) {
  console.log('called');
  const HTMLPlacement = {
    right: 'afterend',
    left: 'beforebegin',
  };

  let gridColumnsOuterHTML = '';
  gridColumns.forEach(gridCol => {
    gridColumnsOuterHTML += gridCol.outerHTML.replace(
      '<div',
      /*html*/ `<div style="width: 100%;"`
    );
    gridCol.remove();
  });

  const HTML = /*html*/ `
    <div class="col cc_auto-grid">${gridColumnsOuterHTML}</div>
  `;

  const styles = /*html*/ `
    <style>
    .cc_auto-grid {
      width: 100%;
      height: 100%;
      display: grid;
      grid-template-columns: repeat(${
        config.gridColumnCount ?? 'auto-fit'
      }, minmax(${config.gridColumnMinWidth}, 1fr));
      grid-template-rows: repeat(${config.gridRowCount ?? '2'}, 1fr);
      column-gap: ${config.columnGap};
      row-gap: ${config.rowGap};
      padding: ${config.parentColumnPadding};
    }

    @media screen and (max-width: 1199px) {
      html {
        font-size: 56.5%;
      }

      body {
        padding-left: 15px;
        padding-right: 15px;
      }
    }

    @media screen and (max-width: 767px) {
      html {
        font-size: 52%;
      }
    }
    </style>
  `;

  if (config.gridsCreated === 0) {
    document.querySelector('head').insertAdjacentHTML('beforeend', styles);
  }
  elementToSide.insertAdjacentHTML(HTMLPlacement[sideOfGrid], HTML);

  config.gridsCreated++;
}
