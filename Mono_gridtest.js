let live = true;
if (live)
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
      let isArrayOrList = false;
      if (row instanceof NodeList || row instanceof Array) {
        isArrayOrList = true;
      }

      const colsQuery = '.col:not(.cc_no-grid)';
      const cols = isArrayOrList
        ? row[0].querySelectorAll(colsQuery)
        : row.querySelectorAll(colsQuery);
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

      if (side === 'right') {
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

  const elementToSideHTML = elementToSide.outerHTML;

  const HTML = /*html*/ `
    <div class="col cc_auto-grid col-sm-${config.parentColumnSize}">${gridColumnsOuterHTML}</div>
  `;

  const styles = /*html*/ `
    <style id="custom_auto-grid">
      .cc_auto-grid {
      max-height: 100%;
      display: grid;
      grid-template-columns: repeat(${
        config.gridColumnCount ?? 'auto-fill'
      }, minmax(${config.gridColumnMinWidth}, 1fr));
      grid-template-rows: repeat(${config.gridRowCount ?? '2'}, 1fr);
      column-gap: ${config.columnGap};
      row-gap: ${config.rowGap};
      padding: ${config.parentColumnPadding};
    }

    @media screen and (max-width: 1199px) {
    }

    @media screen and (max-width: 767px) {
	  .cc_grid-to-left, .cc_grid-to-right {
	  	height: 20% !important;
		overflow: hidden !important;
	  }
	
	  .cc_grid-to-left img, .cc_grid-to-right img {
	  	object-fit: cover !important;
		width: 100% !important;
	  }
	
	  .cc_auto-grid {
	  	grid-template-columns: 1fr;
		grid-template-rows: repeat(${gridColumns.length}, 1fr);
		width: 100% !important;
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
