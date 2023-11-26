import styled from "styled-components";

// 상품 카드 레이아웃
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
