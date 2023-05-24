import React from "react";
import CatList from "../components/Cats/CatsList";
import Board from "../components/Board/Board";
import styled from "styled-components";
import MoveIndicator from "../components/MoveIndicator/MoveIndicator";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../app/hooks";
import {
  selectAllStatuses,
  selectFabric,
  selectGameStatus,
  selectProjects,
} from "../reducer/selectors";
import ProjectsToPlace from "../components/ProjectsToPlace/ProjectsToPlace";
import HandList from "../components/HandList/HandList";
import MarketList from "../components/MarketList/MarketList";
import Score from "../components/Score/Score";
import {
  fabricCellSelected,
  handListEntered,
  handListLeft,
  handTileSelected,
  marketTileChosen,
  marketTileSelected,
  moveMade,
  projectCellSelected,
  projectPlaced,
  projectTileChosen,
} from "../reducer/actions";
import BoardType from "../types/board";
import Roommates from "../components/Roommates/Roommates";

type Props = {};

const GameScreen = (props: Props) => {
  const status = useAppSelector(selectGameStatus);
  const projects: BoardType =
    useAppSelector(selectProjects);
  const fabrics: BoardType = useAppSelector(selectFabric);

  const dispatch = useAppDispatch();
  const autoMove: React.KeyboardEventHandler = (e) => {
    if (e.code === "Space") {
      switch (status) {
        case "placing_tile":
          dispatch(
            fabricCellSelected(
              Object.entries(fabrics)
                .filter(([key, cell]) => cell.tile === null)
                .map(([key, cell]) => key)
                .at(0)
            )
          );
          dispatch(handTileSelected(0));
          dispatch(moveMade());
          break;

        case "choosing_from_market":
          dispatch(marketTileSelected(0));
          dispatch(handListEntered());
          dispatch(marketTileChosen());
          dispatch(handListLeft());
          dispatch(marketTileSelected(undefined));
          break;
        case "placing_projects":
          dispatch(
            projectCellSelected(
              Object.entries(projects)
                .filter(([key, cell]) => cell.tile === null)
                .map(([key, cell]) => key)
                .at(-1)
            )
          );
          dispatch(projectTileChosen(0));
          dispatch(projectPlaced()).then(() => {
            dispatch(projectTileChosen(undefined));
            dispatch(projectCellSelected(false));
          });
          break;
      }
    }
  };

  return (
    <Container onKeyDown={autoMove} tabIndex={0}>
      <Left>
        <CatList />
      </Left>
      <Center>
        <MoveIndicator />
        <Board />
        <Score />
      </Center>
      <Right>
        <Roommates />
        <RightSwitch />
      </Right>
    </Container>
  );
};

const RightSwitch = () => {
  const statuses = useAppSelector(selectAllStatuses);
  const status = useAppSelector(selectGameStatus);
  if (
    status !== "placing_projects" &&
    statuses.some((s) => s === "placing_projects")
  )
    return (
      <>Waiting for other players to place projects...</>
    );
  switch (status) {
    case "placing_projects":
      return <ProjectsToPlace />;
    case "choosing_from_market":
    case "placing_tile":
      return (
        <>
          <MarketList />
          <HandList />
        </>
      );
    case "finished":
      return <></>;
    default:
      return <>Wrong status: {status}</>;
  }
};
const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  height: 100vh;
  width: 100vw;
`;

const Left = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 25%;
`;

const Center = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 50%;
`;

const Right = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 25%;
`;

export default GameScreen;
