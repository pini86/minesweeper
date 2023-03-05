import {
  countFlags,
  setLosingBoard,
  revealClickedCell,
  checkHasWon,
  setWinningBoard,
  getCellFromCords,
  generateBombsToBoard,
} from "../../utils/Utils";
import {
  CellStates,
  DEFAULT_STATE,
  ActionTypes,
} from "../../constants/Constants";
import type { GameState, Actions, CellType } from "../../interfaces/Interfaces";

export function InitAppState(state: GameState = DEFAULT_STATE): GameState {
  const { bombs } = state;
  const board = generateBombsToBoard();
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
      let { board, gameOver, started, bombs, bombsToFlag } = state;
      let cell = getCellFromCords(action.row, action.col, board);

      //the first click on the bomb call re-generate board
      if (!started && cell?.bomb) {
        let cellNew: CellType | undefined = undefined;
        do {
          board = generateBombsToBoard();
          cellNew = getCellFromCords(action.row, action.col, board);
        } while (cellNew!.bomb);
        cell = cellNew;
      }

      if (cell == null) return state;
      let hasWon = false;
      let bombsFlagged = bombs - bombsToFlag;
      if (cell.bomb) {
        board = setLosingBoard(cell, board);
        gameOver = true;
      } else {
        board = revealClickedCell(cell, board);
        bombsFlagged = countFlags(board);
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
        started: true,
        mouseDown: false,
        bombsToFlag: bombs - bombsFlagged,
      };
    }
    case ActionTypes.TOGGLE_FLAG_CELL: {
      const { board, bombs, started } = state;
      let bombsFlagged = countFlags(board);
      const cell = getCellFromCords(action.row, action.col, board);
      if (cell == null) return state;
      if (!started) {
        return state;
      }
      let _cell;
      if (
        cell.state === CellStates.HIDDEN &&
        bombsFlagged <= DEFAULT_STATE.bombs - 1
      ) {
        _cell = { ...cell, state: CellStates.FLAGGED };
      } else if (cell.state === CellStates.FLAGGED) {
        _cell = { ...cell, state: CellStates.FLAGGED_MAYBE };
      } else {
        _cell = { ...cell, state: CellStates.HIDDEN };
      }
      board[_cell.row][_cell.col] = _cell;
      bombsFlagged = countFlags(board);
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
