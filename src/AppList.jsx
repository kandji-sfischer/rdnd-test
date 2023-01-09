import React from "react";
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

function AppList() {
  const { appList } = useContextState();

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
  const { dropList, setDropList } = useContextState();

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
      className="app"
      style={{ background: obj.color }}
      key={obj.color}
    >
      {obj.color}
    </StyledAppItem>
  );
}

export default AppList;
