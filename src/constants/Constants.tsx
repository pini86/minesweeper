import type { GameState, MouseState } from "../interfaces/Interfaces";

export enum CellStates {
  HIDDEN = "hidden",
  FLAGGED = "flagged",
  FLAGGED_MAYBE = "flaggedMaybe",
  BOMB_SELECTED = "bombSelected",
  BOMB_FOUND = "bombFound",
  BOMB_REVEALED = "bombRevealed",
  FLAGGED_MAYBE_REVEALED = "bombSelected",
  REVEALED = "revealed",
}

export const CELL_SIZE = 16;

export const MAX_SECONDS = 999;

export const DEFAULT_STATE: GameState = Object.freeze({
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

export const DEFAULT_MOUSE_STATE: MouseState = {
  primary: false,
  secondary: false,
};
