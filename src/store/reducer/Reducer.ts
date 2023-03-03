import lodash from "lodash";
import {
  getEmptyGrid,
  precomputeSurroundingBombs,
  countFlags,
  setLosingBoard,
  revealClickedCell,
  checkHasWon,
  setWinningBoard,
  getCellFromCords,
} from "../../utils/Utils";
import {
  CellStates,
  DEFAULT_STATE,
  ActionTypes,
} from "../../constants/Constants";
import type { GameState, Actions, CellType } from "../../interfaces/Interfaces";

export function InitAppState(state: GameState = DEFAULT_STATE): GameState {
  const { rows, columns, bombs } = state;
  let board = getEmptyGrid(rows, columns);
  lodash(board)
    .flatten()
    .filter(
      ({ col, row }: CellType) =>
        !(
          (col === 0 && row === 0) ||
          (col === 0 && row === rows - 1) ||
          (col === columns - 1 && row === rows - 1) ||
          (col === columns - 1 && row === 0)
        )
    )
    .sampleSize(bombs)
    .forEach((cell) => (cell.bomb = true));
  board = precomputeSurroundingBombs(board);
  return {
    ...state,
    board,
    bombsToFlag: bombs,
    started: false,
    hasWon: false,
    gameOver: false,
  };
}

export function reducer(state: GameState, action: Actions): GameState {
  switch (action.type) {
    case ActionTypes.RESET_GAME:
      return InitAppState(action.state || state);
    case ActionTypes.REVEAL_CELL: {
      let { board, gameOver, bombsToFlag } = state;
      const cell = getCellFromCords(action.row, action.col, board);
      if (cell == null) return state;
      let hasWon = false;
      if (cell.bomb) {
        board = setLosingBoard(cell, board);
        gameOver = true;
      } else {
        board = revealClickedCell(cell, board);
        hasWon = checkHasWon(board);
        if (hasWon) {
          gameOver = true;
          board = setWinningBoard(board);
        }
      }
      return {
        ...state,
        board,
        hasWon,
        gameOver,
        bombsToFlag,
        started: true,
        mouseDown: false,
      };
    }
    case ActionTypes.TOGGLE_FLAG_CELL: {
      const { board, bombs, started } = state;
      const cell = getCellFromCords(action.row, action.col, board);
      if (cell == null) return state;
      if (!started) {
        return state;
      }
      let _cell;
      if (cell.state === CellStates.HIDDEN) {
        _cell = { ...cell, state: CellStates.FLAGGED };
      } else if (cell.state === CellStates.FLAGGED) {
        _cell = { ...cell, state: CellStates.FLAGGED_MAYBE };
      } else {
        _cell = { ...cell, state: CellStates.HIDDEN };
      }
      board[_cell.row][_cell.col] = _cell;
      const bombsFlagged = countFlags(board);
      return { ...state, board, bombsToFlag: bombs - bombsFlagged };
    }
    case ActionTypes.SET_GAME_OVER: {
      let { board } = state;
      board = setLosingBoard(null, board);
      return { ...state, board, gameOver: true, hasWon: false };
    }
    case ActionTypes.MOUSE_DOWN: {
      return { ...state, mouseDown: true };
    }
    case ActionTypes.MOUSE_UP: {
      return { ...state, mouseDown: false };
    }
    default:
      return state;
  }
}
