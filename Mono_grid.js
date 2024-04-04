document.addEventListener('DOMContentLoaded', function (e) {
  const gridConfig = {
    direction: 'right', // Need to lose this
    parentColumnSize: 6, // 1 til 12
    gridColumnCount: null,
    gridColumnMinWidth: '100px',
    gridRowCount: null,
    columnGap: 0,
    rowGap: 0,
    parentColumnPadding: 0,
  };

  createGridOnSide(gridConfig);
});

function createGridOnSide(config) {
  document
    .querySelectorAll(`.cc_grid-to-${config.direction}`)
    .forEach(elementOnSide => {
      const row = elementOnSide.closest('.row');

      const gridColumns = row.querySelectorAll(
        '.col:not(.cc_no-grid):not(.cc_grid-to-left):not(.cc_grid-to-right):not([style*="display: grid"]):not(.module)'
      );
      const gridColumnsOuterHTML = [];

      gridColumns.forEach(col => {
        const newOuter = col.outerHTML.replace(
          '<div',
          '<div style="width: 100%;"'
        );

        gridColumnsOuterHTML.push(newOuter);
        col.remove();
      });

      const gridHTML = /*html*/ `
        <div
          class="col col-sm-${config.parentColumnSize}"
          style="
            display: grid;
            grid-template-columns: repeat(${
              config.gridColumnCount ?? 'auto-fill'
            }, minmax(${config.gridColumnMinWidth}, 1fr));
            grid-template-rows: repeat(${config.gridRowCount ?? '2'}, 1fr);
            column-gap: ${config.columnGap};
            row-gap: ${config.rowGap};
            padding: ${config.parentColumnPadding};
          ">${gridColumnsOuterHTML.join('')}</div>
      `;

      if (config.direction === 'right') {
        elementOnSide.insertAdjacentHTML('afterend', gridHTML);
      }

      if (config.direction === 'left') {
        elementOnSide.insertAdjacentHTML('beforebegin', gridHTML);
      }
    });
}
