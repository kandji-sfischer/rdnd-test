import { createContext, useContext, useReducer } from "react";
import reducer from "./state/reducer";

// * Initial State of Context
export const initialState = {
  appList: createAppList(),
  dropList: [],
  selection: [],
  selection: [],
  snapshots: [],
  isMetaPressed: false,
  isShiftPressed: false,
  isAnimationTurnedOff: true,
};

// * Context
const State = createContext(initialState);

export function Provider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <State.Provider
      value={{
        state,
        dispatch,
      }}
    >
      {children}
    </State.Provider>
  );
}

export function useContextState() {
  return useContext(State);
}

function createAppList() {
  const LIST = [];

  var CSS_COLOR_NAMES = [
    "AliceBlue",
    "AntiqueWhite",
    "Aqua",
    "Aquamarine",
    "Azure",
    "Beige",
    "Bisque",
    "Black",
    "BlanchedAlmond",
    "Blue",
    "BlueViolet",
    "Brown",
    "BurlyWood",
    "CadetBlue",
    "Chartreuse",
    "Chocolate",
    "Coral",
    "CornflowerBlue",
    "Cornsilk",
    "Crimson",
    "Cyan",
    "DarkBlue",
    "DarkCyan",
    "DarkGoldenRod",
    "DarkGray",
    "DarkGrey",
    "DarkGreen",
    "DarkKhaki",
    "DarkMagenta",
    "DarkOliveGreen",
    "Darkorange",
    "DarkOrchid",
    "DarkRed",
    "DarkSalmon",
    "DarkSeaGreen",
    "DarkSlateBlue",
    "DarkSlateGray",
    "DarkSlateGrey",
    "DarkTurquoise",
  ];

  for (let i = 0; i < CSS_COLOR_NAMES.length; i++) {
    LIST.push({ color: CSS_COLOR_NAMES[i] });
  }

  return LIST;
}
