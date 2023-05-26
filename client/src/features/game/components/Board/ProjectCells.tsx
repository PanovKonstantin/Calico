import React from "react";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../../app/hooks";
import { projectCellSelected } from "../../reducer/actions";
import {
  selectBoard,
  selectJoinedProject,
} from "../../reducer/selectors";
import { CellPlacer } from "../../types/cell";
import Cell from "./Cell";

type Props = {
  cellPlacer: CellPlacer;
};

const ProjectCells = ({ cellPlacer }: Props) => {
  const dispatch = useAppDispatch();
  const projectKeys = useAppSelector(selectJoinedProject);
  return (
    <>
      {projectKeys
        ? projectKeys.split(".").map((key) => (
            <div
              key={key}
              onMouseOver={() =>
                dispatch(projectCellSelected(key))
              }
              onMouseLeave={() =>
                dispatch(projectCellSelected(false))
              }
            >
              <Cell
                cellKey={key}
                cellsSelector={selectBoard}
                cellPlacer={cellPlacer}
              />
            </div>
          ))
        : null}
    </>
  );
};

export default ProjectCells;
