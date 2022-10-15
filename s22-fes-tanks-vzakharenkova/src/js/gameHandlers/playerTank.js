import GAME_CONFIG from '../gameConfig';
import { Tank } from './tank';

export class PlayerTank extends Tank {
  constructor() {
    super();
  }

  playerTankDirection = 'up';

  moveKeys = ['ArrowRight', 'ArrowLeft', 'ArrowUp', 'ArrowDown'];

  move(e) {
    const key = e.key;
    const tank = document.querySelector('.game-object__player-tank');

    switch (key) {
      case 'ArrowRight': {
        this.playerTankDirection = 'right';
        break;
      }
      case 'ArrowLeft': {
        this.playerTankDirection = 'left';
        break;
      }
      case 'ArrowUp': {
        this.playerTankDirection = 'up';
        break;
      }
      case 'ArrowDown': {
        this.playerTankDirection = 'down';
        break;
      }
    }
    if (this.moveKeys.includes(key)) {
      this.tankStep(
        this.playerTankDirection,
        tank,
        'game-object__player-tank',
        tank.id
      );
    }
  }

  startShooting(e) {
    if (e.key === ' ') {
      const tank = document.querySelector('.game-object__player-tank');
      if (!tank.id) {
        tank.id = 0;
      }

      e.preventDefault();

      if (!document.getElementById('b_0')) {
        this.shoot(
          tank,
          this.playerTankDirection,
          tank,
          0,
          'game-object__enemy-tank',
          'PLAYER_PROPS',
          e
        );
      }
    }
  }

  renew() {
    const that = this;

    if (GAME_CONFIG.ENEMY_TANKS_COUNT > 2) {
      const enemyPoints = document.querySelectorAll('.map-cell-2');
      const index = this.findRenewPoint(enemyPoints);
      that.changeTankAttribites(
        enemyPoints[index],
        enemyPoints[index],
        'game-object__enemy-tank',
        0,
        that.gameField.enemyLastIndex
      );
      if (document.querySelectorAll('.game-object__enemy-tank').length < 3) {
        that.renew();
      } else {
        that.gameField.enemyLastIndex++;
      }
    }
  }
}
