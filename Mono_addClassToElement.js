/*

Legg til klasser til elementer som du spesifiserer med CSS queries!

*/

document.addEventListener('DOMContentLoaded', () => {
  const querySets = [
    ['.CSS #query ~ .går #her', 'klassenavnet-her'],
    ['.CSS #query ~ .går #her', 'klassenavnet-her'],
  ];

  querySets.forEach(qs => {
    const targets = document.querySelectorAll(qs[0]);

    targets.forEach(t => {
      t.classList.add(qs[1]);
    });
  });
});
