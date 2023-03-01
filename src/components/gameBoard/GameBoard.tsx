import { memo } from "react";
import Cell from "../cell/Cell";
import type { GameState, Dispatch } from "../../interfaces/Interfaces";
import Board from "../board/Board";
import lodash from "lodash";

const MemoizedCell = memo(Cell);

interface IGameBoardProps {
  state: GameState;
  dispatch: Dispatch;
}

export default function GameBoard({ state, dispatch }: IGameBoardProps) {
  const { board, rows, columns, gameOver } = state;
  return (
    <Board rows={rows} columns={columns} disable={gameOver}>
      {lodash(board)
        .flatten()
        .map((cell) => (
          <MemoizedCell
            key={`${cell.row}x${cell.col}`}
            cell={cell}
            board={board}
            dispatch={dispatch}
          />
        ))
        .value()}
    </Board>
  );
}
