import { META_KEY, SHIFT_KEY } from "../AppList";
import {
  SET_DROP_LIST,
  SET_SELECTION,
  TOGGLE_META_KEY,
  TOGGLE_SHIFT_KEY,
} from "./actionTypes";

export function toggleKey(keyType, payload) {
  let type;
  if (META_KEY === keyType) {
    type = TOGGLE_META_KEY;
  }
  if (SHIFT_KEY === keyType) {
    type = TOGGLE_SHIFT_KEY;
  }

  return {
    type,
    payload,
  };
}

export function setSelection(newSelection) {
  return {
    type: SET_SELECTION,
    payload: newSelection,
  };
}

export function setDropList(newDropList) {
  return {
    type: SET_DROP_LIST,
    payload: newDropList,
  };
}

export function setAppList(newAppList) {
  return {
    type: SET_DROP_LIST,
    payload: newAppList,
  };
}
