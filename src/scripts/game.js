class Game {
  constructor() {
    this.armySize = 5;
    this.timeout = 1000;
    this.maxDamage = 50;
    this.minDamage = 20;
    this.war = new War();
    this.btnStart = document.querySelector('.btn-start');
    this.btnAttack = document.querySelector('.btn-attack');
    this.logSection = document.querySelector('.game-log-container');
    this.displayBoard = document.querySelector('.display-board');
    this.displayBoardContainer = document.querySelector(
      '.display-board-container'
    );
  }

  newGame() {
    this.resetGame();

    this.btnStart.style.display = 'none';
    this.btnAttack.style.display = 'block';
    this.logSection.style.display = 'block';
    this.displayBoard.innerHTML = `LET THE BATTLE BEGIN!`;

    for (let i = 0; i < this.armySize; i++) {
      let viking = new Viking(
        `Viking-${i + 1}`,
        100,
        Math.floor(
          Math.random() * (this.maxDamage - this.minDamage) + this.minDamage
        ) + 1
        //   100
      );

      this.war.addViking(viking);
      this.war.addVikingToDOM(viking, i + 1);

      let saxon = new Saxon(
        100,
        Math.floor(
          Math.random() * (this.maxDamage - this.minDamage) + this.minDamage
        ) + 1,
        //   100,
        `saxon-${i + 1}`
      );
      this.war.addSaxon(saxon);
      this.war.addSaxonToDOM(saxon, i + 1);
    }
  }

  gameOver() {
    console.log('game over');
    this.displayBoard.innerHTML = 'GAME OVER';
    this.displayBoardContainer.insertAdjacentHTML(
      'beforeend',
      `<h3>${this.war.showStatus()}</h3>`
    );
    this.btnStart.style.display = 'block';
    this.btnAttack.style.display = 'none';
    this.btnAttack.disabled = false;
    this.btnStart.innerHTML = 'NEW GAME';
    return true;
  }

  resetGame() {
    this.war.vikingArmy = [];
    this.war.saxonArmy = [];
    document.querySelector(`.viking-army`).innerHTML = '';
    document.querySelector(`.saxon-army`).innerHTML = '';
    document.querySelector(`.vikings-log`).innerHTML = '';
    document.querySelector(`.saxons-log`).innerHTML = '';

    if (this.displayBoardContainer.querySelector(`h3`)) {
      this.displayBoardContainer.querySelector('h3').remove();
    }
  }
}
