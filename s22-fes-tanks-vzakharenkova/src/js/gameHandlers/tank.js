import GAME_CONFIG from '../gameConfig';
import { GameField } from '../gameField';
import { Bullet } from './bullet';
import { findBulletNextPosition } from './findBulletNextPosition';
import { removeTankTarget } from './removeTankTarget';
import { tankStep } from './tankMoveStep';

export class Tank {
  DIRECTIONS = ['right', 'left', 'up', 'down'];

  tankStep = tankStep.bind(this);

  gameField = new GameField();

  getRandomIndex(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);

    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  updateDirection(tank, type, id) {
    const that = this;

    setTimeout(function () {
      const index = that.getRandomIndex(0, 3);
      that.tankStep(that.DIRECTIONS[index], tank, type, id);
    }, 0);
  }

  changeTankAttribites(tank, nextPosition, type, degs, id = '') {
    tank.classList.remove(type);
    tank.classList.add('map-cell-0');
    nextPosition.classList.add(type);
    tank.id = '';
    nextPosition.id = id;
    nextPosition.style.transform = `rotate(${degs}deg)`;
  }

  shoot(position, direction, tank, n, targetType, props) {
    const that = this;
    const next = findBulletNextPosition(direction, position);
    const bullet = new Bullet();

    bullet.move(tank, n, tank.id);

    if (
      next &&
      (next.classList.contains('game-object__wall') ||
        next.classList.contains(`${targetType}`))
    ) {
      removeTankTarget(next);

      if (next.classList.contains(`${targetType}`)) {
        this.gameField.gameProcessUpdate(props);
        this.renew();
      }
    } else if (next) {
      setTimeout(
        () => that.shoot(next, direction, tank, n + 1, targetType, props),
        GAME_CONFIG.BULLET_SPEED_TIME
      );
    }
  }

  findRenewPoint(enemyPoints) {
    let index = this.getRandomIndex(0, 2);

    if (enemyPoints[index].classList.contains('game-object__enemy-tank')) {
      return this.findRenewPoint(enemyPoints);
    } else {
      return index;
    }
  }
}
