import React from "react";
import styled from "styled-components";
import { useAppSelector } from "../../../../app/hooks";
import { selectCats } from "../../reducer/selectors";
import Cat from "./Cat";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  background-color: darkseagreen;
  border-top-right-radius: 2mm;
  border-bottom-right-radius: 2mm;
  width: 15%;
  min-width: min-content;
  height: fit-content;
`;

const CatsList = () => {
  const cats = useAppSelector(selectCats);

  return (
    <Container>
      {cats.map((cat) => (
        <Cat cat={cat} key={cat.name} />
      ))}
    </Container>
  );
};

export default CatsList;
