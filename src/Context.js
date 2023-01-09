import { createContext, useContext, useState } from "react";

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

export const LIST = [];

for (let i = 0; i < CSS_COLOR_NAMES.length; i++) {
  LIST.push({ color: CSS_COLOR_NAMES[i] });
}

const defaultState = {
  appList: LIST,
  dropList: [],
  isAnimationTurnedOff: false,
};

const State = createContext(defaultState);

export function Provider({ children }) {
  const [dropList, setDropList] = useState([]);
  const [appList, setAppList] = useState(LIST);
  const [isAnimation, setIsAnimation] = useState(false);

  return (
    <State.Provider
      value={{
        appList,
        dropList,
        setDropList,
        setAppList,
        isAnimationTurnedOff: isAnimation,
        setIsAnimation,
      }}
    >
      {children}
    </State.Provider>
  );
}

export function useContextState() {
  return useContext(State);
}
