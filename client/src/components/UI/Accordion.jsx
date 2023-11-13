import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";

const DetailInfoBox = styled.div`
  border-top: 1px solid #d5d5d5;
`;

const DetailInfoTop = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 58px;
  cursor: pointer;
`;

const DetailInfoButton = styled.button`
  font-size: 14px;
  font-weight: 300;
  text-align: left;
  background: none;
  border: none;
  padding: 10px;
  cursor: pointer;
`;

const DetailInfoArrow = styled.div`
  width: 25px;
  height: 25px;
  position: relative;
  &:before,
  &:after {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    width: 50%;
    height: 2px;
    background-color: var(--black);
    transition: all 0.3s ease-in-out;
  }
  &:before {
    transform: translate(-50%, -50%);
  }
  &:after {
    transform-origin: center;
    transform: translateX(-50%)
      ${(props) => (props.$isOpen ? "rotate(0deg)" : "rotate(-90deg)")};
  }
`;

const DetailInfoContent = styled.div`
  max-height: ${(props) => (props.$isOpen ? props.height : 0)}px;
  transition: max-height 0.3s ease-in-out;
  overflow: hidden;
`;

const AccordianContainer = styled.div`
  padding: 16px 12px 24px;
  font-weight: 300;
  font-size: 14px;
`;

function Accordion(props) {
  const [isOpen, setIsOpen] = useState(false);
  const contentRef = useRef(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    setHeight(contentRef.current?.scrollHeight || 0);
  }, [props.children]);

  return (
    <DetailInfoBox>
      <DetailInfoTop onClick={() => setIsOpen(!isOpen)}>
        <DetailInfoButton>{props.title}</DetailInfoButton>
        <DetailInfoArrow $isOpen={isOpen} />
      </DetailInfoTop>
      <DetailInfoContent $isOpen={isOpen} ref={contentRef} height={height}>
        <AccordianContainer>{props.children}</AccordianContainer>
      </DetailInfoContent>
    </DetailInfoBox>
  );
}

export default Accordion;
