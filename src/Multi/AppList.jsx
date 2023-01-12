import React, { useEffect } from "react";
import { useDrag } from "react-dnd";
import styled from "styled-components";
import { ItemTypes } from "./Constants";
import { useContextState } from "./Context";
import StyledAppItem from "./StyledAppItem";

const Container = styled.div`
  display: flex;
  width: 620px;
  padding: 10px;
  flex-wrap: wrap;
  gap: 5px;
  border: 2px dashed #e4e3e3;
  border-radius: 3px;
  min-height: 100vh;
  align-content: flex-start;
`;

const META_KEY = "Meta";
const SHIFT_KEY = "Shift";

function AppList() {
  const { appList, isShift, setIsShift, isMeta, setIsMeta } = useContextState();

  useEffect(() => {
    function handleKeyDown(e) {
      const { key } = e;

      if (META_KEY === key && !isMeta) {
        setIsMeta(true);
      }

      if (SHIFT_KEY === key && !isShift) {
        setIsShift(true);
      }
    }
    function handleKeyUp(e) {
      const { key } = e;

      if (META_KEY === key && isMeta) {
        setIsMeta(false);
      }

      if (SHIFT_KEY === key && isShift) {
        setIsShift(false);
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [isShift, isMeta, setIsMeta, setIsShift]);

  return (
    <div>
      <p>App List</p>

      <Container>
        {appList.map((obj) => (
          <AppItem key={obj.color} obj={obj} />
        ))}
      </Container>
    </div>
  );
}

function AppItem(props) {
  const { obj } = props;
  const {
    dropList,
    setDropList,
    isShift,
    appList,
    isMeta,
    selectedItems,
    setSelectedItems,
  } = useContextState();

  const isSelected = selectedItems.find(
    (innerObj) => innerObj.color === obj.color
  );

  const [__, drag] = useDrag({
    type: ItemTypes.APP,
    item: {
      id: obj.color,
    },
    end: (item, monitor) => {
      if (!monitor.didDrop()) {
        setDropList(dropList.filter((obj) => !obj.isPotential));
      }
    },
  });

  return (
    <StyledAppItem
      ref={drag}
      onClick={(e) => {
        if (!isShift && !isMeta) {
          setSelectedItems([obj]);
        }
        if (isShift && selectedItems.length === 0) {
          setSelectedItems([obj]);
        }
        if (isShift) {
          const initialItem = selectedItems[0];
          if (initialItem) {
            const initialIdx = appList.findIndex(
              (innerObj) => innerObj.color === initialItem.color
            );
            const currentIdx = appList.findIndex(
              (innerObj) => innerObj.color === obj.color
            );

            const newSelectedItems = appList.slice(initialIdx, currentIdx + 1);
            setSelectedItems(newSelectedItems);
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
