import styled from "styled-components";

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
