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
  const startBtn = document.querySelector('.control-start');
  const stopBtn = document.querySelector('.control-stop');
  let interval_id;
  const playerListner = (e) => {
    playerTank.move(e);
    playerTank.startShooting(e);
  };
  const startGameHandler = () => {
    interval_id = enemyTank.move();
    window.addEventListener('keydown', playerListner, false);
    startBtn.disabled = true;
    stopBtn.disabled = false;
  };
  const stopGameHandler = () => {
    clearInterval(interval_id);
    interval_id = 0;
    window.removeEventListener('keydown', playerListner, false);
    startBtn.disabled = false;
    stopBtn.disabled = true;
  };

  gameField.render();
  playerTank.gameField = gameField;
  startBtn.addEventListener('click', startGameHandler);
  stopBtn.addEventListener('click', stopGameHandler);

  window.addEventListener('blur', stopGameHandler, false);
}
