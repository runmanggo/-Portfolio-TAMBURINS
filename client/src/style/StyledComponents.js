import styled from "styled-components";

export const CtgLsitContainer = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-column-gap: 0.1875rem;
  color: var(--black);
  margin: 0 auto;
  padding: 0 2.75rem;

  @media (max-width: 1024px) {
    padding: 0;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 3px;
  }
`;

// /shop의 버튼들
export const BtnBox = styled.div`
  padding: 0 20px;
`;

export const AllBtn = styled.button`
  margin: 20px auto 150px;
  display: block;
  width: 335px;
  height: 45px;
  background-color: var(--white);
  text-align: center;
  border: 1px solid #a8a8a8;
  font-size: 12px;
  font-weight: 400;
  @media (max-width: 1024px) {
    width: 100%;
    margin: 20px auto 80px;
  }
`;

// 선택 버튼들
export const OptionBtn = styled.button`
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
