import { useMinesweeperState } from "./store/Store";
import sharedStyles from "./assets/styles/Shared.module.css";
import GameBoard from "./components/gameBoard/GameBoard";
import GameStatus from "./components/gameStatus/GameStatus";

export default function App() {
  const { state, dispatch } = useMinesweeperState();
  return (
    <div className={sharedStyles.outset}>
      <GameStatus state={state} dispatch={dispatch} />
      <GameBoard state={state} dispatch={dispatch} />
    </div>
  );
}
