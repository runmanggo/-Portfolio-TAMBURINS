import React from "react";
import styled from "styled-components";

const ModalBox = styled.div`
  position: fixed;
  top: 60px;
  right: 50px;
  background: var(--white);
  width: 375px;
  box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.16);
  z-index: 110;
  opacity: 1;
  visibility: visible;
  transition: 0.6s ease;
`;

const Modal = (props) => {
  return <ModalBox>{props.children}</ModalBox>;
};

export default Modal;
