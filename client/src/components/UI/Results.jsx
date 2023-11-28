import { useState, useEffect } from "react";
import styled from "styled-components";

import { useQuery } from "@tanstack/react-query";
import { NavLink } from "react-router-dom";
import { useFetchData } from "../../services/useFetchData";
import { API } from "../../services/api.config";

import { CtgLsitContainer } from "../StyledComponents/ctgLsitContainer";
import ItemCard from "../../components/UI/ItemCard";
import Filter from "../Filter/Filter";

const Container = styled.div`
  height: 70vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const InnerContainer = styled.div`
  font-size: 1rem;
  font-weight: 300;
  color: var(--black);
`;

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

const Results = () => {
  const [randomScent, setRandomScent] = useState([]);
  const fetchScent = useFetchData(API.BEST);
  const {
    data: best,
    isLoading: isLoadingScent,
    error: scentError,
  } = useQuery({ queryKey: ["best"], queryFn: fetchScent });

  useEffect(() => {
    if (isLoadingScent) return;
    if (scentError) return;

    const random = shuffleArray(best).slice(0, 4);

    setRandomScent(random);
  }, [isLoadingScent, scentError, best]);

  return (
    <>
      <Container>
        <InnerContainer> 찾으시는 검색결과가 없네요. </InnerContainer>
      </Container>
      <Filter title="추천 상품" />
      <CtgLsitContainer>
        {randomScent.map((item) => (
          <NavLink key={item._id} to={`/shop/${item.category}/${item.itemId}`}>
            <ItemCard item={item} />
          </NavLink>
        ))}
      </CtgLsitContainer>
    </>
  );
};

export default Results;
