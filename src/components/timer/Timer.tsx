import React, { useState, useEffect } from "react";
import LCDDisplay from "../lcdDisplay/LCDDisplay";
import { ActionTypes } from "../../constants/Constants";
import type { Dispatch } from "../../interfaces/Interfaces";

const MAX_SECONDS = 999;

interface ШTimerProps {
  started: boolean;
  gameOver: boolean;
  dispatch: Dispatch;
}

export default function Timer({ started, gameOver, dispatch }: ШTimerProps) {
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
      }
      return () => clearTimeout(timeoutID);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [time, started, gameOver]
  );
  return <LCDDisplay value={time} digits={3} />;
}
