import type { GameState } from "../interfaces/Interfaces";

export enum CellStates {
  HIDDEN,
  FLAGGED,
  FLAGGED_MAYBE,
  BOMB_SELECTED,
  BOMB_FOUND,
  BOMB_REVEALED,
  FLAGGED_MAYBE_REVEALED,
  REVEALED,
}

export const CELL_SIZE = 16;

export const DEFAULT_STATE: GameState = Object.freeze({
  id: "",
  board: [],
  gameOver: false,
  hasWon: false,
  rows: 16,
  columns: 16,
  bombs: 40,
  bombsToFlag: 0,
  mouseDown: false,
  started: false,
});

export enum ActionTypes {
  RESET_GAME = "RESET_GAME",
  REVEAL_CELL = "REVEAL_CELL",
  SET_GAME_OVER = "SET_GAME_OVER",
  TOGGLE_FLAG_CELL = "TOGGLE_FLAG_CELL",
  MOUSE_DOWN = "MOUSE_DOWN",
  MOUSE_UP = "MOUSE_UP",
}

export enum FaceTypes {
  SMILE = "smile",
  OHH = "ohh",
  DEAD = "dead",
  COOL = "cool",
}
