/* import "./App.css";

function App() {
  return <div className="App"></div>;
}

export default App; */
import { memo } from "react";
import classNames from "classnames";
import lodash from "lodash";
import FaceButton, { FaceTypes } from "./components/faceButton/FaceButton";
import LCDDisplay from "./components/lcdDisplay/LCDDisplay";
import Timer from "./components/timer/Timer";
import Board from "./components/board/Board";
import Cell from "./components/cell/Cell";
import Window from "./components/window/Window";
import Menu from "./components/menu/Menu";
import { useMinesweeperState } from "./store/Store";
import { ActionTypes } from "./constants/Constants";
import type { GameState, Dispatch } from "./interfaces/Interfaces";
import sharedStyles from "./assets/styles/Shared.module.css";
import styles from "./App.module.css";

const MemoizedCell = memo(Cell);

interface GameStatusProps {
  state: GameState;
  dispatch: Dispatch;
}

function GameStatus({ state, dispatch }: GameStatusProps) {
  const { gameOver, hasWon, mouseDown, bombsToFlag, started, id } = state;
  let type = FaceTypes.SMILE;
  if (gameOver) {
    if (hasWon) {
      type = FaceTypes.KOOL;
    } else {
      type = FaceTypes.DED;
    }
  } else if (mouseDown) {
    type = FaceTypes.OHH;
  }
  return (
    <div className={classNames(styles.gameStatus, sharedStyles.inset)}>
      <LCDDisplay value={bombsToFlag} />
      <FaceButton
        type={type}
        onClick={() => dispatch({ type: ActionTypes.RESET_GAME })}
      />
      <Timer
        key={id}
        started={started}
        gameOver={gameOver}
        dispatch={dispatch}
      />
    </div>
  );
}

interface GameBoardProps {
  state: GameState;
  dispatch: Dispatch;
}

function GameBoard({ state, dispatch }: GameBoardProps) {
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

export default function App() {
  const { state, dispatch } = useMinesweeperState();
  return (
    <Window
      title="Minesweeper"
      renderMenuItems={() => <Menu dispatch={dispatch} />}
    >
      <div className={sharedStyles.outset}>
        <GameStatus state={state} dispatch={dispatch} />
        <GameBoard state={state} dispatch={dispatch} />
      </div>
    </Window>
  );
}
