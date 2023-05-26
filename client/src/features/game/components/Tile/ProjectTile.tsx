import React from "react";
import styled from "styled-components";
import { ProjectTileType } from "../../types/tile";
import Tile from "./Tile";

type Props = {
  tile?: ProjectTileType;
  size?: number;
};
const ProjectTile = ({ size, tile }: Props) => {
  const letters = ["A", "B", "C", "D", "E", "F"];
  return (
    <Tile size={size}>
      <Project>
        {tile ? (
          <>
            <Points>
              {tile.points.map((v, i) => (
                <Point key={i} i={i}>
                  {v}
                </Point>
              ))}
            </Points>
            {tile.requirement.map((r, i) =>
              letters[i].repeat(r)
            )}
          </>
        ) : null}
      </Project>
    </Tile>
  );
};

const Project = styled.div`
  background-color: rgb(176, 176, 176);
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  font-size: 1vw;
`;
const Points = styled.div`
  display: flex;
  flex-direction: row;
`;
const Point = styled.div<{ i: number }>`
  background-color: ${({ i }) =>
    i === 0 ? "#71bdff" : "#f3ff71"};
  border-radius: 50%;
  width: 1.5vw;
  height: 1.5vw;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default ProjectTile;
