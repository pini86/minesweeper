import { useState, useEffect } from "react";
import Counter from "../counter/Counter";
import { ActionTypes, MAX_SECONDS } from "../../constants/Constants";
import type { Dispatch } from "../../interfaces/Interfaces";

interface ITimerProps {
  started: boolean;
  gameOver: boolean;
  dispatch: Dispatch;
}

export default function Timer({ started, gameOver, dispatch }: ITimerProps) {
  const [time, setTime] = useState(0);
  useEffect(
    () => {
      let timeoutID: NodeJS.Timeout;
      if (started && !gameOver) {
        timeoutID = setTimeout(() => {
          if (time >= MAX_SECONDS) {
            dispatch({ type: ActionTypes.SET_GAME_OVER });
          } else {
            setTime((t) => Math.min(t + 1, MAX_SECONDS));
          }
        }, 1000);
      } else if (!started) {
        setTime(0);
      }
      return () => clearTimeout(timeoutID);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [time, started, gameOver]
  );
  return <Counter value={time} digits={3} />;
}
