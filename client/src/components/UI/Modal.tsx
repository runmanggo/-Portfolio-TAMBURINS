import React, { ReactNode } from "react";
import styled from "styled-components";

interface IModalBoxProps {
  $show: boolean;
}

const ModalBox = styled.div<IModalBoxProps>`
  position: fixed;
  top: 70px;
  right: 50px;
  background: var(--white);
  width: 400px;
  box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.16);
  z-index: 110;
  opacity: 1;
  display: ${(props) => (props.$show ? "block" : "none")};
  transition: 0.6s ease;

  @media (max-width: 1023px) {
    width: 100%;
    top: 70px !important;
    right: 0;
    box-shadow: 0 6px 6px 0 rgba(0, 0, 0, 0.16);
  }
`;

interface ModalProps {
  show: boolean;
  children: ReactNode;
}

const Modal = (props: ModalProps) => {
  const handleClickInside = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    event.stopPropagation();
  };

  return (
    <ModalBox $show={props.show} onClick={handleClickInside}>
      {props.children}
    </ModalBox>
  );
};
export default Modal;
