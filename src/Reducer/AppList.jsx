import React, { useEffect } from "react";
import { useDrag } from "react-dnd";
import styled from "styled-components";
import { ItemTypes } from "./ItemTypes";
import { useContextState } from "./Context";
import StyledAppItem from "./StyledAppItem";
import { setDropList, setSelection, toggleKey } from "./state/actions";

const Container = styled.div`
  display: flex;
  width: 615px;
  flex-wrap: wrap;
  gap: 5px;
  min-height: 100vh;
  align-content: flex-start;
`;

export const META_KEY = "Meta";
export const SHIFT_KEY = "Shift";

function AppList() {
  const { state, dispatch } = useContextState();

  const { appList, isMetaPressed, isShiftPressed } = state;

  useEffect(() => {
    function handleKeyDown(e) {
      const { key } = e;

      if (META_KEY === key && !isMetaPressed) {
        dispatch(toggleKey(META_KEY, true));
      }

      if (SHIFT_KEY === key && !isShiftPressed) {
        dispatch(toggleKey(SHIFT_KEY, true));
      }
    }
    function handleKeyUp(e) {
      const { key } = e;

      if (META_KEY === key && isMetaPressed) {
        dispatch(toggleKey(META_KEY, false));
      }

      if (SHIFT_KEY === key && isShiftPressed) {
        dispatch(toggleKey(SHIFT_KEY, false));
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [isShiftPressed, isMetaPressed, toggleKey]);

  return (
    <div>
      <p>App List</p>
      <div
        style={{
          padding: "10px",
          border: "2px dashed #e4e3e3",
          borderRadius: "3px",
        }}
      >
        <Container>
          {appList.map((obj) => (
            <AppItem key={obj.color} obj={obj} />
          ))}
        </Container>
      </div>
    </div>
  );
}

function AppItem(props) {
  const { obj } = props;
  const { state, dispatch } = useContextState();

  const { dropList, isShiftPressed, appList, isMetaPressed, selection } = state;

  const isSelected = selection.find((innerObj) => innerObj.color === obj.color);

  const [__, drag] = useDrag({
    type: ItemTypes.APP,
    item: {
      id: obj.color,
    },
    end: (item, monitor) => {
      if (!monitor.didDrop()) {
        dispatch(setDropList(dropList.filter((obj) => !obj.isPotential)));
      }
    },
  });

  return (
    <StyledAppItem
      ref={drag}
      onClick={(e) => {
        if (!isShiftPressed && !isMetaPressed) {
          dispatch(setSelection([obj]));
        }
        if (isShiftPressed && selection.length === 0) {
          dispatch(setSelection([obj]));
        }
        if (isShiftPressed) {
          const initialItem = selection[0];
          if (initialItem) {
            const initialIdx = appList.findIndex(
              (innerObj) => innerObj.color === initialItem.color
            );
            const currentIdx = appList.findIndex(
              (innerObj) => innerObj.color === obj.color
            );

            const newSelectedItems = appList.slice(initialIdx, currentIdx + 1);
            dispatch(setSelection(newSelectedItems));
          }
        }
      }}
      className="app"
      style={{
        background: obj.color,
        border: isSelected ? "2px solid goldenrod" : "2px solid #222",
      }}
      key={obj.color}
    >
      {obj.color}
    </StyledAppItem>
  );
}

export default AppList;
