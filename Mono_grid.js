document.addEventListener('DOMContentLoaded', function(e){
    const gridConfig = {
        direction: 'right',
        gridColumnSize: 6, // 1 til 12
        gridColumnCount: null,
        gridRowCount: null,
        columnGap: 0,
        rowGap: 0,
    };
});

function createGridOnSide(config) {
    document.querySelectorAll(`.cc_grid-to-${leftOrRight}`).forEach(elementOnSide => {
        const row = elementOnSide.closest('.row');

        const gridColumns = row.querySelectorAll('.col:not(.cc_no-grid)');
        const gridColumnsOuterHTML = [];

        gridColumns.forEach(col => {
            gridColumnsOuterHTML.push(col.outerHTML);
            col.remove();
        });

        elementOnSide.insertAdjacentHTML('afterend', html`<button>`);


        if (leftOrRight === 'right') {
            elementOnSide.insertAdjacentHTML('afterend', html`
                <div class="col col-sm-${config.gridColumnSize}" style="display: grid; grid-template-columns: ${config.gridColumnCount ?? auto}; grid-template-rows: ${config.gridRowCount ?? auto}; "
            `);
        }
    });
}