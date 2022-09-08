export function findBulletNextPosition(direction, position, tankType) {
  const currentPosition = position;
  const currentRow = currentPosition.parentElement;
  const index = Array.from(currentRow.children).indexOf(currentPosition);

  switch (direction) {
    case 'right': {
      if (currentPosition.nextElementSibling) {
        return currentPosition.nextElementSibling;
      } else return undefined;
    }

    case 'left': {
      if (currentPosition.previousElementSibling) {
        return currentPosition.previousElementSibling;
      } else return undefined;
    }

    case 'up': {
      if (currentRow.previousElementSibling) {
        return currentRow.previousElementSibling.children[index];
      } else return undefined;
    }

    case 'down': {
      if (currentRow.nextElementSibling) {
        return currentRow.nextElementSibling.children[index];
      } else return undefined;
    }
  }
}
