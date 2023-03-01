import classNames from "classnames";
import FaceButton from "./components/faceButton/FaceButton";
import LCDDisplay from "./components/lcdDisplay/LCDDisplay";
import Timer from "./components/timer/Timer";
import { useMinesweeperState } from "./store/Store";
import { ActionTypes, FaceTypes } from "./constants/Constants";
import type { GameState, Dispatch } from "./interfaces/Interfaces";
import sharedStyles from "./assets/styles/Shared.module.css";
import styles from "./App.module.css";
import GameBoard from "./components/gameBoard/GameBoard";

interface IGameStatusProps {
  state: GameState;
  dispatch: Dispatch;
}

function GameStatus({ state, dispatch }: IGameStatusProps) {
  const { gameOver, hasWon, mouseDown, bombsToFlag, started } = state;
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
        key={"id"}
        started={started}
        gameOver={gameOver}
        dispatch={dispatch}
      />
    </div>
  );
}

export default function App() {
  const { state, dispatch } = useMinesweeperState();
  return (
    <div className={sharedStyles.outset}>
      <GameStatus state={state} dispatch={dispatch} />
      <GameBoard state={state} dispatch={dispatch} />
    </div>
  );
}
