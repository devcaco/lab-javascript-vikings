window.addEventListener('load', () => {
  console.log('Scripts are loaded');
  const btnStart = document.querySelector('.btn-start');
  const btnAttack = document.querySelector('.btn-attack');
  const war = new War();

  btnStart.addEventListener('click', () => {
    btnStart.style.display = 'none';
    btnAttack.style.display = 'block';
    const armySize = 5;

    for (let i = 0; i < armySize; i++) {
      let viking = war.addViking(
        new Viking(`Viking-${i + 1}`, 100, Math.floor(Math.random() * 50) + 1)
      );
      war.addVikingToDOM(viking, i + 1);

      let saxon = war.addSaxon(
        new Saxon(100, Math.floor(Math.random() * 50) + 1, `saxon-${i + 1}`)
      );
      war.addSaxonToDOM(saxon, i + 1);
    }
  });

  btnAttack.addEventListener('click', () => {
    btnAttack.disabled = true;

    let vikingAttack = war.attack('viking');

    setTimeout(() => {
      setTimeout(() => {
        let saxonAttack = war.attack('saxon');
      }, 1500);
    }, 1500);
    setTimeout(() => (btnAttack.disabled = false), 6000);
  });
});
