import './css/style.css';
import './css/normalize.css';
import { GameField } from './js/gameField';
import { EnemyTank } from './js/gameHandlers/enemyTank';
import { PlayerTank } from './js/gameHandlers/playerTank';

gameInitialization();

function gameInitialization() {
  const gameField = new GameField();
  const enemyTank = new EnemyTank();
  const playerTank = new PlayerTank();

  gameField.render();
  playerTank.gameField = gameField;

  let interval_id = (() => enemyTank.move())();

  window.addEventListener('keydown', (e) => {
    playerTank.move(e);
    playerTank.startShooting(e);
  });

  window.addEventListener(
    'focus',
    function () {
      interval_id = enemyTank.move();
    },
    true
  );

  window.addEventListener(
    'blur',
    function () {
      clearInterval(interval_id);
      interval_id = 0;
    },
    true
  );
}
