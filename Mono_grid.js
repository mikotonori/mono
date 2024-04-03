document.addEventListener("DOMContentLoaded", function (e) {
  const gridConfig = {
    direction: "right",
    parentColumnSize: 6, // 1 til 12
    gridColumnCount: null,
    gridColumnMinWidth: "100px",
    gridRowCount: null,
    columnGap: 0,
    rowGap: 0,
  };
});

function createGridOnSide(config) {
  document
    .querySelectorAll(`.cc_grid-to-${leftOrRight}`)
    .forEach((elementOnSide) => {
      const row = elementOnSide.closest(".row");

      const gridColumns = row.querySelectorAll(
        ".col:not(.cc_no-grid):not(.cc_grid-to-left):not(.cc_grid-to-right)"
      );
      const gridColumnsOuterHTML = [];

      gridColumns.forEach((col) => {
        gridColumnsOuterHTML.push(col.outerHTML);
        col.remove();
      });

      if (leftOrRight === "right") {
        elementOnSide.insertAdjacentHTML(
          "afterend",
          /*html*/ `
            <div
              class="col col-sm-${config.parentColumnSize}"
              style="
                display: grid;
                grid-template-columns: repeat(${
                  config.gridColumnCount ?? "auto-fill"
                }, minmax(${gridConfig.gridColumnMinWidth}, 1fr));
                grid-template-rows: ${config.gridRowCount ?? "auto"};
                column-gap: ${config.columnGap};
                row-gap: ${config.rowGap};
              ">${gridColumnsOuterHTML.join("")}</div>
          `
        );
      }
    });
}
