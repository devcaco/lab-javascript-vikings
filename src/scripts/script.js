window.addEventListener('load', () => {
  console.log('Scripts are loaded');
  const btnStart = document.querySelector('.btn-start');
  const btnAttack = document.querySelector('.btn-attack');
  const logSection = document.querySelector('.game-log-container');
  const displayBoard = document.querySelector('.display-board');
  const displayBoardContainer = document.querySelector(
    '.display-board-container'
  );
  const war = new War();

  btnStart.addEventListener('click', () => {
    war.reset();
    btnStart.style.display = 'none';
    btnAttack.style.display = 'block';
    logSection.style.display = 'block';
    displayBoard.innerHTML = `LET THE BATTLE BEGIN!`;

    if (document.querySelector(`.display-board-container > h3`)) {
      document.querySelector(`.display-board-container > h3`).remove();
    }

    const armySize = 5;

    for (let i = 0; i < armySize; i++) {
      let viking = war.addViking(
        new Viking(
          `Viking-${i + 1}`,
          100,
          Math.floor(Math.random() * (50 - 20) + 20) + 1
          //   100
        )
      );
      war.addVikingToDOM(viking, i + 1);

      let saxon = war.addSaxon(
        new Saxon(
          100,
          Math.floor(Math.random() * (50 - 20) + 20) + 1,
          //   100,
          `saxon-${i + 1}`
        )
      );
      war.addSaxonToDOM(saxon, i + 1);
    }
  });

  btnAttack.addEventListener('click', () => {
    btnAttack.disabled = true;
    displayBoard.innerHTML = '';
    let finished = false;

    const vikingAttack = war.attack('viking');

    setTimeout(() => {
      if (war.getStatus()) war.attack('saxon');
      else {
        finished = true;
        gameOver();
      }
    }, 3000);

    setTimeout(() => {
      if (!finished && !war.getStatus()) return gameOver();
      btnAttack.disabled = false;
    }, 6000);
  });

  function gameOver() {
    console.log('game over');
    displayBoard.innerHTML = 'GAME OVER';
    displayBoardContainer.insertAdjacentHTML(
      'beforeend',
      `<h3>${war.showStatus()}</h3>`
    );
    btnStart.style.display = 'block';
    btnAttack.style.display = 'none';
    btnAttack.disabled = false;
    btnStart.innerHTML = 'NEW GAME';
    return false;
  }
});
