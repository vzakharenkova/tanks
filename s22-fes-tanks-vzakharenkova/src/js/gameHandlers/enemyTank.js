import GAME_CONFIG from '../gameConfig';
import { Tank } from './tank';

export class EnemyTank extends Tank {
  constructor() {
    super();
  }

  move() {
    const that = this;

    return setInterval(function () {
      const tanks = document.querySelectorAll(
        '.map-cell.game-object__enemy-tank'
      );

      tanks.forEach((tank) => {
        const index = that.getRandomIndex(0, 3);

        that.tankStep(
          that.DIRECTIONS[index],
          tank,
          'game-object__enemy-tank',
          tank.id
        );
      });
    }, GAME_CONFIG.GAME_TIMER_INTERVAL);
  }

  renew() {
    // super.renew(props);

    if (GAME_CONFIG.PLAYER_LIFE_COUNT > 0) {
      const winnerPoint = document.querySelector('.map-cell-1');

      setTimeout(() => {
        winnerPoint.id = 0;
        winnerPoint.classList.add('game-object__player-tank');
      }, GAME_CONFIG.UPDATES_TIMER);
    }
  }
}
