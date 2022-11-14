window.addEventListener('load', () => {
  console.log('Scripts are loaded');
  const btnStart = document.querySelector('.btn-start');
  const btnAttack = document.querySelector('.btn-attack');
  let game = '';

  btnStart.addEventListener('click', () => {
    game = new Game();
    game.newGame();
  });

  btnAttack.addEventListener('click', () => {
    game.war.attack(game);
  });
});
