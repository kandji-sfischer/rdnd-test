import {
  SET_DROP_LIST,
  SET_APP_LIST,
  SET_SELECTION,
  TAKE_SNAPSHOT,
  TOGGLE_ANIMATION,
  TOGGLE_META_KEY,
  TOGGLE_SHIFT_KEY,
} from "./actionTypes";
import { initialState } from "../Context";

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_DROP_LIST:
      return {
        ...state,
        dropList: action.payload,
      };
    case SET_APP_LIST:
      return {
        ...state,
        appList: action.payload,
      };
    case SET_SELECTION:
      return {
        ...state,
        selection: action.payload,
      };
    case TOGGLE_ANIMATION:
      return {
        ...state,
        isAnimationTurnedOff: !state.isAnimationTurnedOff,
      };
    case TOGGLE_META_KEY:
      return {
        ...state,
        isMetaPressed: action.payload,
      };
    case TOGGLE_SHIFT_KEY:
      return {
        ...state,
        isShiftPressed: action.payload,
      };

    case TAKE_SNAPSHOT:
      return {
        ...state,
        snapshots: [...state.snapshots, action.payload],
      };
    default:
      throw new Error("Action Type Not Caught!");
  }
}
