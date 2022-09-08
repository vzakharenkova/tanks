import GAME_CONFIG from '../gameConfig';

export class Bullet {
  step = GAME_CONFIG.BULLET_STEP;
  render(shootingTank, id) {
    const bullet = document.createElement('div');

    bullet.className = 'bullet';
    bullet.id = `b_${id}`;
    shootingTank.append(bullet);

    return bullet;
  }
  move(shootingTank, n, id) {
    const bullet = this.render(shootingTank, id);

    bullet.animate(
      {
        top: [`${59 - this.step * n}px`, `${0 - this.step * n}px`],
      },
      GAME_CONFIG.BULLET_SPEED_TIME
    );
    bullet.style.top = `${0 - this.step * n}px`;
    setTimeout(() => bullet.remove(), GAME_CONFIG.BULLET_SPEED_TIME);
  }
}
