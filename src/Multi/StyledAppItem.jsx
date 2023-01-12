import React from "react";
import styled from "styled-components";

const StyledAppItem = styled.div`
  box-sizing: border-box;
  width: 150px;
  height: 100px;
  border-radius: 3px;
  padding: 25px;
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
  color: goldenrod;
  font-weight: bold;
  text-overflow: ellipsis;
`;

export const StyledPotentialAppItem = styled.div`
  box-sizing: border-box;
  width: 150px;
  height: 100px;
  border-radius: 3px;
  padding: 25px;
  border: none;
  font-weight: bold;
  text-overflow: ellipsis;
  ${(props) =>
    !props.isAnimationTurnedOff &&
    `max-width: 0px;
         animation: widthEntry 0.2s ease;
         animation-fill-mode: forwards;`}
`;

export default StyledAppItem;
