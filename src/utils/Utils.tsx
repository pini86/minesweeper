import type { CellType, BoardType } from "../interfaces/Interfaces";
import lodash from "lodash";
import { CellStates } from "../constants/Constants";

const SURROUNDING_CELLS = [
  [-1, -1],
  [-1, 0],
  [-1, 1],
  [0, -1],
  [0, 1],
  [1, -1],
  [1, 0],
  [1, 1],
];

function mapEachCell(
  board: BoardType,
  callback: (cell: CellType) => CellType
): BoardType {
  return board.map((row) => row.map(callback));
}

function getSurroundingBombs(
  { row, col, bomb, state }: CellType,
  board: BoardType
): number {
  if (bomb) {
    return 0;
  }

  return SURROUNDING_CELLS.reduce<number>((acc, [rowOffset, colOffset]) => {
    const _row = board[row + rowOffset];
    if (_row == null) {
      return acc;
    }
    const cell = _row[col + colOffset];
    if (cell == null) {
      return acc;
    }
    return cell.bomb ? acc + 1 : acc;
  }, 0);
}

function generateEmptyCell(row: number, col: number): CellType {
  return {
    row,
    col,
    state: CellStates.HIDDEN,
    bomb: false,
    touching: 0,
  };
}

export function getEmptyGrid(rows: number, columns: number): BoardType {
  return new Array(rows).fill([]).map((_: [], row: number) => {
    return new Array(columns)
      .fill(null)
      .map((_: null, col: number) => generateEmptyCell(row, col));
  });
}

export function precomputeSurroundingBombs(board: BoardType): BoardType {
  return mapEachCell(board, (cell) => ({
    ...cell,
    touching: getSurroundingBombs(cell, board),
  }));
}

export function revealClickedCell(cell: CellType, board: BoardType): BoardType {
  const toCheck: Set<CellType> = new Set([cell]);
  const toReveal: Set<CellType> = new Set([cell]);
  const checked: Set<CellType> = new Set();
  const checkCell = (cell: CellType) => {
    checked.add(cell);
    SURROUNDING_CELLS.forEach(([rowOffset, colOffset]) => {
      const row = board[cell.row + rowOffset];
      if (row == null) {
        return;
      }
      const newCell = row[cell.col + colOffset];
      if (newCell == null || newCell.bomb) {
        return;
      }
      if (newCell.touching === 0 && !checked.has(newCell)) {
        toCheck.add(newCell);
      }
      toReveal.add(newCell);
    });
  };

  while (toCheck.size > 0 && cell.touching === 0) {
    const cells = Array.from(toCheck);
    toCheck.clear();
    cells.forEach(checkCell);
  }

  toReveal.forEach((cell) => {
    board[cell.row][cell.col] = { ...cell, state: CellStates.REVEALED };
  });

  return board;
}

export function checkHasWon(board: BoardType): boolean {
  return !lodash(board)
    .flatten()
    .filter((cell: CellType) => cell.state !== CellStates.REVEALED)
    .some((cell: CellType) => !cell.bomb);
}

export function setLosingBoard(
  losingCell: CellType | null,
  board: BoardType
): BoardType {
  return mapEachCell(board, (cell) => {
    if (cell.bomb) {
      if (cell === losingCell) {
        return { ...cell, state: CellStates.BOMB_SELECTED };
      }
      return { ...cell, state: CellStates.BOMB_REVEALED };
    }
    return cell;
  });
}

export function setWinningBoard(board: BoardType): BoardType {
  return mapEachCell(board, (cell) => {
    if (cell.bomb) {
      return { ...cell, state: CellStates.BOMB_FOUND };
    }
    return { ...cell, state: CellStates.REVEALED };
  });
}

export function countFlags(board: BoardType): number {
  return lodash(board)
    .flatten()
    .filter((cell: CellType) => cell.state === CellStates.FLAGGED)
    .value().length;
}

export function getCellFromCords(
  row: number,
  col: number,
  board: BoardType
): CellType | undefined {
  return board[row][col];
}
