import React from "react";
import styled from "styled-components";

const OverlayBox = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
`;

const Overlay = (props) => {
  return <OverlayBox onClick={props.onClick}>{props.children}</OverlayBox>;
};

export default Overlay;
