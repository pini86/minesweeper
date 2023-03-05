import { useReducer } from "react";
import { DEFAULT_STATE } from "../constants/Constants";
import type { GameState, Actions, Dispatch } from "../interfaces/Interfaces";
import { reducer, InitAppState } from "./reducer/Reducer";

type ReducerType = (state: GameState, action: Actions) => GameState;

interface AppState {
  state: GameState;
  dispatch: Dispatch;
}

export function useAppState(initialState: GameState = DEFAULT_STATE): AppState {
  const [state, dispatch] = useReducer<ReducerType, GameState>(
    reducer,
    initialState,
    InitAppState
  );
  return { state, dispatch };
}
