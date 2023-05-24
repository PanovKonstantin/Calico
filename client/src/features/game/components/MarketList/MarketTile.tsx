import React from "react";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../../app/hooks";
import {
  marketTileChosen,
  marketTileSelected,
} from "../../reducer/actions";
import { selectGameStatus } from "../../reducer/selectors";
import TileType from "../../types/tile";
import CalicoDraggable from "../CalicoDraggable/CalicoDraggable";
import FabricTile from "../Tile/FabricTile";

type Props = {
  tile: TileType;
  i: number;
};

const MarketTile = ({ tile, i }: Props) => {
  const dispatch = useAppDispatch();
  const status = useAppSelector(selectGameStatus);
  return (
    <CalicoDraggable
      returning
      droppable
      disabled={status !== "choosing_from_market"}
      onStart={() => {
        dispatch(marketTileSelected(i));
      }}
      onStop={() => {
        dispatch(marketTileChosen());
        dispatch(marketTileSelected(undefined));
      }}
    >
      <FabricTile tile={tile} />
    </CalicoDraggable>
  );
};

export default MarketTile;
