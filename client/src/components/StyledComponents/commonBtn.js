import styled from "styled-components";

// 그 외 버튼
export const CommonBtn = styled.button`
  border: 1px solid var(--black);
  background: ${(props) => props.$background || "var(--black)"};
  color: ${(props) => props.$color || "var(--white)"};
  width: 100%;
  height: ${(props) => props.$height || "50px"};
  text-align: center;
  font-size: 14px;
  font-weight: 500;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;
