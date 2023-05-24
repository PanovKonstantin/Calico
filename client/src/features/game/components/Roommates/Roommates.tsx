import React from "react";
import styled from "styled-components";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../../app/hooks";
import { viewedSocketChanged } from "../../reducer/actions";
import {
  selecetViewedSocket,
  selectRoommates,
  selectRoommatesNames,
} from "../../reducer/selectors";

const Roommates = () => {
  const roommates = useAppSelector(selectRoommates);
  const roommatesNames = useAppSelector(
    selectRoommatesNames
  );
  const viewedSocket = useAppSelector(selecetViewedSocket);
  const dispatch = useAppDispatch();
  if (roommates.length <= 1) return <></>;
  return (
    <>
      {roommates.map((roommate, index) => (
        <Roommate
          onClick={() =>
            dispatch(viewedSocketChanged(roommate))
          }
          isViewed={viewedSocket === roommate}
          key={roommate}
        >
          {roommatesNames[roommate]}
        </Roommate>
      ))}
    </>
  );
};

const Roommate = styled.div<{ isViewed: boolean }>`
  width: 100%;
  border-style: solid;
  border-color: ${({ isViewed }) =>
    isViewed ? "green" : "#4e4242"};
  border-radius: 10px;
  text-align: center;
  :hover {
    border-color: gray;
  }
`;

export default Roommates;
