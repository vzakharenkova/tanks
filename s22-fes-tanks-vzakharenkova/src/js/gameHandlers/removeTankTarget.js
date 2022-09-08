export function removeTankTarget(target) {
  setTimeout(() => {
    target.classList.remove('game-object__wall');
    target.classList.remove('game-object__enemy-tank');
    target.classList.remove('game-object__player-tank');
    target.classList.add('map-cell-0');
  }, 0);
}
