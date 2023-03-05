import type { GameState, Dispatch } from "../../interfaces/Interfaces";
import { ActionTypes, FaceTypes } from "../../constants/Constants";
import classNames from "classnames";
import styles from "./GameStatus.module.css";
import Counter from "../counter/Counter";
import FaceButton from "../faceButton/FaceButton";
import sharedStyles from "../../assets/styles/Shared.module.css";
import Timer from "../timer/Timer";

interface IGameStatusProps {
  state: GameState;
  dispatch: Dispatch;
}

export default function GameStatus({ state, dispatch }: IGameStatusProps) {
  const { gameOver, hasWon, mouseDown, bombsToFlag, started } = state;
  let type = FaceTypes.SMILE;
  if (gameOver) {
    if (hasWon) {
      type = FaceTypes.COOL;
    } else {
      type = FaceTypes.DEAD;
    }
  } else if (mouseDown) {
    type = FaceTypes.OHH;
  }
  return (
    <div className={classNames(styles.gameStatus, sharedStyles.inset)}>
      <Counter value={bombsToFlag} />
      <FaceButton
        type={type}
        onClick={() => dispatch({ type: ActionTypes.RESET_GAME })}
      />
      <Timer started={started} gameOver={gameOver} dispatch={dispatch} />
    </div>
  );
}
