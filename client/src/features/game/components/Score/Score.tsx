import React from "react";
import styled from "styled-components";
import { useAppSelector } from "../../../../app/hooks";
import {
  selectRoommatesNames,
  selectScores,
} from "../../reducer/selectors";

type Props = {};
const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  min-width: min-content;
`;

const Score = (props: Props) => {
  const scores = useAppSelector(selectScores);
  const roommatesNames = useAppSelector(
    selectRoommatesNames
  );

  return scores ? (
    <Container>
      <table>
        <thead>
          <tr>
            <th>User</th>
            <th>Cats</th>
            <th>Projects</th>
            <th>Colors</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(scores).map(([user, score]) => (
            <tr key={user}>
              <td>{roommatesNames[user]}</td>
              <td>{score.cats}</td>
              <td>{score.projects}</td>
              <td>{score.colors}</td>
              <td>{score.total}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Container>
  ) : (
    <>No Score</>
  );
};

export default Score;
