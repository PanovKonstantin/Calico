import React from "react";
import { useAppDispatch } from "../../../../app/hooks";
import {
  projectPlaced,
  projectTileChosen,
} from "../../reducer/actions";
import { ProjectTileType } from "../../types/tile";
import CalicoDraggable from "../CalicoDraggable/CalicoDraggable";
import ProjectTile from "../Tile/ProjectTile";

type Props = {
  tile: ProjectTileType;
  i: number;
};
const ProjectTileToPlace = ({ tile, i }: Props) => {
  const dispatch = useAppDispatch();
  return (
    <CalicoDraggable
      onStart={() => {
        dispatch(projectTileChosen(i));
      }}
      onStop={() => {
        dispatch(projectPlaced()).then(() =>
          dispatch(projectTileChosen(undefined))
        );
      }}
      returning
      droppable
    >
      <ProjectTile tile={tile} />
    </CalicoDraggable>
  );
};

export default ProjectTileToPlace;
