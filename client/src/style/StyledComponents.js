import styled from "styled-components";

export const CtgLsitContainer = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-column-gap: 0.1875rem;
  color: var(--black);
  margin: 0 auto;
  padding: 0 2.75rem;
`;

export const AllBtn = styled.button`
  margin: 20px auto 200px;
  display: block;
  width: 335px;
  height: 45px;
  background-color: var(--white);
  text-align: center;
  border: 1px solid #a8a8a8;
  font-size: 12px;
  font-weight: 500;
`;
