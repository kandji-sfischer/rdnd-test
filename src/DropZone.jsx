import React, { useRef } from "react";
import { useDrop } from "react-dnd";
import styled from "styled-components";
import { ItemTypes } from "./Constants";
import { useContextState } from "./Context";
import StyledAppItem, { StyledPotentialAppItem } from "./StyledAppItem";

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

function removeFromAppList(appList, setAppList, item) {
  setAppList(appList.filter((obj) => obj.color !== item.id));
}

function DropZone() {
  const { dropList, setDropList, appList, setAppList, setIsAnimation } =
    useContextState();
  const [__, drop] = useDrop({
    accept: ItemTypes.APP,
    collect: (monitor) => {
      return {};
    },
    hover: (item, monitor) => {
      const hasIsPotentialEnd = dropList[dropList.length - 1]?.isPotential;
      const hasPotential = dropList.find(
        (obj, idx) => obj.isPotential && idx !== dropList.length - 1
      );
      if (hasPotential) {
        return;
      }
      if (hasIsPotentialEnd) {
        return;
      }
      setDropList([...dropList, { color: item?.id, isPotential: true }]);
    },
    drop: (item, monitor) => {
      if (monitor.didDrop()) {
        return;
      }
      removeFromAppList(appList, setAppList, item);
      const removedDropList = dropList.filter((obj) => !obj.isPotential);
      setDropList([...removedDropList, { color: item?.id }]);
    },
  });

  return (
    <>
      <div>
        <p>DropZone </p>
        <p style={{ maxWidth: 600 }}>
          Currently the animation only animates in and not out. There is also an
          edge-case where adding an element to the end doesn't work if you pass
          over individual items already added These are all fixable, but I'm
          reaching a stopping point for today and would like to share.
        </p>
        <label htmlFor="animation">
          <input
            id="animation"
            onClick={(e) => {
              setIsAnimation(e.target.checked);
            }}
            type="checkbox"
          />
          Turn Off Animation
        </label>
        <Container ref={drop}>
          {dropList.map((obj, idx) => {
            return <DropItem key={idx + obj.color} obj={obj}></DropItem>;
          })}
        </Container>
      </div>
    </>
  );
}

function DropItem(props) {
  const { obj } = props;
  const ref = useRef();

  const { dropList, setDropList, appList, setAppList, isAnimationTurnedOff } =
    useContextState();
  const [__, drop] = useDrop({
    accept: ItemTypes.APP,
    collect: (monitor) => {
      return {};
    },
    hover: (item, monitor) => {
      if (obj.isPotential) {
        return;
      }
      const removePotential = dropList.filter((obj) => !obj.isPotential);
      // calculate is right or left and that decides if you add 1 or not
      const xCoord = ref.current.getBoundingClientRect().x;
      const width = ref.current.getBoundingClientRect().width;
      const placement = monitor.getClientOffset().x - xCoord;

      const isInsertRight = placement > width / 2 ? 1 : 0;

      const insertIndex =
        removePotential.findIndex((dropItem) => dropItem.color === obj.color) +
        isInsertRight;

      const upperHalf = removePotential.slice(0, insertIndex);
      const lowerHalf = removePotential.slice(insertIndex);

      setDropList([
        ...upperHalf,
        { color: item?.id, isPotential: true },
        ...lowerHalf,
      ]);
    },
    drop: (item) => {
      if (obj.isPotential) {
        const idx = dropList.findIndex((obj) => obj.isPotential);
        const newDropList = [...dropList];
        newDropList[idx] = {
          color: item.id,
        };
        setDropList(newDropList);
      } else {
        const insertIndex =
          dropList.findIndex((dropItem) => dropItem.color === obj.color) + 1;

        const removePotential = dropList.filter((obj) => !obj.isPotential);

        const upperHalf = removePotential.slice(0, insertIndex);
        const lowerHalf = removePotential.slice(insertIndex);

        setDropList([...upperHalf, { color: item?.id }, ...lowerHalf]);
      }

      removeFromAppList(appList, setAppList, item);
    },
  });
  drop(ref);
  if (obj.isPotential) {
    return (
      <StyledPotentialAppItem
        ref={ref}
        className="app"
        style={{ background: "#fff", opacity: 0.7 }}
        isAnimationTurnedOff={isAnimationTurnedOff}
      ></StyledPotentialAppItem>
    );
  }
  return (
    <StyledAppItem ref={ref} className="app" style={{ background: obj.color }}>
      {obj.color}
    </StyledAppItem>
  );
}

export default DropZone;

// function isAlreadyPresent(dropList, innerItem) {
//   const item = dropList.find((dropListItem) => {
//     return dropListItem.color === innerItem.id;
//   });

//   return !!item;
// }
// || isAlreadyPresent(dropList, item)
