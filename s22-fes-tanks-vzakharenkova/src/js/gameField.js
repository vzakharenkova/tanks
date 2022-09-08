import GAME_CONFIG from './gameConfig';
import { MAP, CLASS_MAP } from './map';

export class GameField {
  enemyLastIndex = 1;

  gameFieldCell(mapCell, row) {
    const cell = document.createElement('div');

    cell.className = `map-cell map-cell-${mapCell}`;
    if (CLASS_MAP[mapCell]) {
      cell.classList.add(`${CLASS_MAP[mapCell]}`);
    }

    if (cell.classList.contains('game-object__enemy-tank')) {
      cell.id = this.enemyLastIndex;
      this.enemyLastIndex++;
    } else if (cell.classList.contains('game-object__player-tank')) {
      cell.id = 0;
    }

    row.append(cell);
  }

  gameFieldRow(index) {
    const GAME_MAP = document.getElementById('game-map');
    const row = document.createElement('div');

    row.id = `row-${index}`;
    row.className = 'map-row';
    GAME_MAP.append(row);

    return row;
  }

  gameProcessUpdate(props) {
    let winner;
    const currentProps = GAME_CONFIG[props];
    const counter = document.querySelector(
      `.process-list .${currentProps[1]} span`
    );

    GAME_CONFIG[currentProps[0]]--;
    counter.textContent = GAME_CONFIG[currentProps[0]];

    if (GAME_CONFIG[currentProps[0]] === 0) {
      winner = `${currentProps[2]}`;
    } else return;

    setTimeout(() => {
      alert(`${winner} are winner!`);
      window.location.reload();
    }, GAME_CONFIG.UPDATES_TIMER);
  }

  render() {
    MAP.forEach((mapRow, i) => {
      const row = this.gameFieldRow(i);

      mapRow.forEach((mapCell) => {
        this.gameFieldCell(mapCell, row);
      });
    });
  }
}
