import {
  CellStates,
  ActionTypes,
  DEFAULT_MOUSE_STATE,
} from "../../constants/Constants";
import type {
  CellType,
  MouseEventType,
  Dispatch,
  MouseState,
} from "../../interfaces/Interfaces";
import { isClickableAndFlagable } from "../../utils/Utils";

type MouseStateSetter = (
  arg: ((arg: MouseState) => MouseState) | MouseState
) => void;

export function handleMouseDown(
  { button }: MouseEventType,
  setMouseState: MouseStateSetter,
  dispatch: Dispatch
) {
  setMouseState((state) => {
    switch (button) {
      case 0:
        dispatch({ type: ActionTypes.MOUSE_DOWN });
        return { ...state, primary: true };
      case 2:
        return { ...state, secondary: true };
      default:
        return state;
    }
  });
}

export function handleMouseUp(
  event: MouseEventType,
  setMouseState: MouseStateSetter,
  cell: CellType,
  dispatch: Dispatch
) {
  event.preventDefault();
  const { row, col } = cell;
  switch (event.button) {
    case 0:
      dispatch({ type: ActionTypes.MOUSE_UP });
      cell.state === CellStates.HIDDEN &&
        dispatch({ type: ActionTypes.REVEAL_CELL, col, row });
      break;
    case 2:
      isClickableAndFlagable(cell) &&
        dispatch({ type: ActionTypes.TOGGLE_FLAG_CELL, col, row });
      break;
    default:
      break;
  }
  setMouseState(() => DEFAULT_MOUSE_STATE);
}
