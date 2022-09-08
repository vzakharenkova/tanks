export function tankStep(direction, tank, type, id = '') {
  let nextPosition;
  let degs;

  switch (direction) {
    case 'right': {
      nextPosition = tank.nextElementSibling;
      degs = 90;

      break;
    }

    case 'left': {
      nextPosition = tank.previousElementSibling;
      degs = 270;

      break;
    }

    case 'up': {
      try {
        const currentRow = tank.parentElement;
        const nextRow = currentRow.previousElementSibling;

        nextPosition =
          nextRow.children[Array.from(currentRow.children).indexOf(tank)];
        degs = 0;
      } catch {}

      break;
    }

    case 'down': {
      try {
        const currentRow = tank.parentElement;
        const nextRow = currentRow.nextElementSibling;

        nextPosition =
          nextRow.children[Array.from(currentRow.children).indexOf(tank)];
        degs = 180;
      } catch {}

      break;
    }
  }

  if (
    nextPosition &&
    !nextPosition.classList.contains('game-object__enemy-tank') &&
    !nextPosition.classList.contains('game-object__player-tank') &&
    nextPosition.classList.contains('map-cell-0')
  ) {
    this.changeTankAttribites(tank, nextPosition, type, degs, id);

    if (nextPosition.classList.contains('game-object__enemy-tank')) {
      this.shoot(
        nextPosition,
        direction,
        nextPosition,
        0,
        'game-object__player-tank',
        'ENEMY_PROPS'
      );
    }
  } else if (type === 'game-object__enemy-tank') {
    this.updateDirection(tank, type, id);
  } else this.changeTankAttribites(tank, tank, type, degs, id);
}
