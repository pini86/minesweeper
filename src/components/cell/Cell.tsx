import * as React from "react";
import classNames from "classnames";
import {
  CellStates,
  ActionTypes,
  DEFAULT_MOUSE_STATE,
} from "../../constants/Constants";
import styles from "./Cell.module.css";
import type {
  CellType,
  BoardType,
  Dispatch,
  MouseState,
} from "../../interfaces/Interfaces";
import { isClickableAndFlagable } from "../../utils/Utils";
import { handleMouseDown, handleMouseUp } from "../mouseHandle/mouseHandle";

interface ICellProps {
  cell: CellType;
  board: BoardType;
  dispatch: Dispatch;
}

export default function Cell({ cell, board, dispatch }: ICellProps) {
  const [mouseState, setMouseState] =
    React.useState<MouseState>(DEFAULT_MOUSE_STATE);

  const showTouchingNumber = (cell: CellType): boolean => {
    return cell.touching > 0 && cell.state === CellStates.REVEALED;
  };
  const preventDefault = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
  };
  const isMouseDown = (mouseState: MouseState) => {
    return mouseState.primary || mouseState.secondary;
  };

  return (
    <div
      className={classNames(styles.container, styles[cell.state], {
        [styles.active]: mouseState.primary && cell.state === CellStates.HIDDEN,
      })}
      onContextMenu={preventDefault}
      onClick={preventDefault}
      onMouseDown={
        isClickableAndFlagable(cell)
          ? (event) => handleMouseDown(event, setMouseState, dispatch)
          : undefined
      }
      onMouseLeave={
        isMouseDown(mouseState)
          ? () => {
              dispatch({ type: ActionTypes.MOUSE_UP });
              setMouseState(() => DEFAULT_MOUSE_STATE);
            }
          : undefined
      }
      onMouseUp={
        isMouseDown(mouseState)
          ? (event) => handleMouseUp(event, setMouseState, cell, dispatch)
          : undefined
      }
    >
      {showTouchingNumber(cell) ? (
        <span
          className={classNames(
            styles.touching,
            styles["value" + cell.touching.toString()]
          )}
        >
          {cell.touching}
        </span>
      ) : null}
    </div>
  );
}
