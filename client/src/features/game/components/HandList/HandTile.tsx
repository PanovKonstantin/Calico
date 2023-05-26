import React from "react";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../../app/hooks";
import { moveMade } from "../../reducer/actions";
import { handTileSelected } from "../../reducer/actions";
import { selectGameStatus } from "../../reducer/selectors";
import TileType from "../../types/tile";
import CalicoDraggable from "../CalicoDraggable/CalicoDraggable";
import FabricTile from "../Tile/FabricTile";

type Props = {
  tile: TileType;
  i: number;
};

const HandTile = ({ tile, i }: Props) => {
  const dispatch = useAppDispatch();
  const status = useAppSelector(selectGameStatus);
  return (
    <CalicoDraggable
      returning
      droppable
      disabled={status !== "placing_tile"}
      onStart={() => {
        dispatch(handTileSelected(i));
      }}
      onStop={() => {
        dispatch(moveMade());
      }}
    >
      <FabricTile tile={tile} />
    </CalicoDraggable>
  );
};

export default HandTile;
