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
          if (side === 'right') {
            createGridOnSide(gridConfig, side, gridCols, rightGridHead);
            gridCols.length = 0;
          }

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

/**
 *
 * @param {{}} config
 * @param {String} sideOfGrid
 * @param {Element[]} gridColumns
 * @param {Element} elementToSide
 */
function createGridOnSide(config, sideOfGrid, gridColumns, elementToSide) {
  console.log('called');
  console.log(config, sideOfGrid, gridColumns, elementToSide);
  const HTMLPlacement = {
    right: 'afterend',
    left: 'afterend',
    first: 'afterbegin',
  };

  let placement = HTMLPlacement[sideOfGrid];

  let gridColumnsOuterHTML = '';
  gridColumns.forEach(gridCol => {
    gridColumnsOuterHTML += gridCol.outerHTML.replace(
      '<div',
      /*html*/ `<div style="width: 100%;"`
    );
    gridCol.remove();
  });

  const insertionPoint =
    elementToSide.previousElementSibling ?? elementToSide.closest('.row');
  if (insertionPoint.classList.contains('row')) {
    placement = HTMLPlacement['first'];
  }
  console.log(
    'ip:',
    insertionPoint,
    'ps:',
    elementToSide.previousElementSibling
  );

  const elementToSideColSizes = determineColSizes(elementToSide.classList);
  const maxColumnSize = 12;

  const HTML = /*html*/ `
    <div class="cc_wrapper--auto-grid">
      ${elementToSide.outerHTML}
      <div class="
        col cc_auto-grid
        col-sm-${maxColumnSize - elementToSideColSizes[0]}
        col-md-${maxColumnSize - elementToSideColSizes[1]}
        col-lg-${maxColumnSize - elementToSideColSizes[2]}
      ">${gridColumnsOuterHTML}</div>
    </div>
  `;
  console.log(`*******\n${HTML}\n*******`);

  const styles = /*html*/ `
    <style id="custom_auto-grid">
    .cc_wrapper--auto-grid {
      display: flex;
      justify-content: flex-start;
      height: 40rem;
      max-width: 73.125rem;
      margin: 0 auto;
    }

    .cc_auto-grid {
      height: 100%;
      display: grid;
      grid-template-columns: repeat(${
        config.gridColumnCount ?? 'auto-fill'
      }, minmax(${config.gridColumnMinWidth}, 1fr));
      grid-template-rows: repeat(${config.gridRowCount ?? '2'}, 1fr);
      column-gap: ${config.columnGap};
      row-gap: ${config.rowGap};
      padding: ${config.parentColumnPadding};
	  
	  /*flex-grow: 1;*/
    }
	
	.cc_grid-to-right, .cc_grid-to-left {
		height: 100% !important;
		
		flex-grow: 1;
	}
	
	.cc_grid-to-right img, .cc_grid-to-left img {
		height: 100% !important;
		width: 100% !important;
		object-fit: cover !important;
	}
	
	.cc_grid-to-right a, .cc_grid-to-left a {
		height: 100% !important;
		display: block;
	}

  @media screen and (max-width: 1199px) {
  }

  @media screen and (max-width: 767px) {
    .cc_wrapper--auto-grid {
      flex-direction: column;
    height: 100%;
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
  elementToSide.remove();
  insertionPoint.insertAdjacentHTML(placement, HTML);

  config.gridsCreated++;
}

/**
 *
 * @param {DOMTokenList} classList
 */
function determineColSizes(classList) {
  const sizes = [];

  for (let sm = 1; sm < 13; sm++) {
    if (classList.contains(`col-sm-${sm}`)) {
      sizes.push(sm);
      console.log(`pushing ${sm}`);
      console.log(sizes);
      break;
    }
  }

  for (let md = 1; md < 13; md++) {
    if (classList.contains(`col-md-${md}`)) {
      sizes.push(md);
      console.log(`pushing ${md}`);
      console.log(sizes);
      break;
    }
  }

  for (let lg = 1; lg < 13; lg++) {
    if (classList.contains(`col-lg-${lg}`)) {
      sizes.push(lg);
      console.log(`pushing ${lg}`);
      console.log(sizes);
      break;
    }
  }

  return sizes;
}
