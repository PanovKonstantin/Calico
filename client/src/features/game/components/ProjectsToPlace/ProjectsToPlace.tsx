import React from "react";
import styled from "styled-components";
import { useAppSelector } from "../../../../app/hooks";
import { selectProjectsToPlace } from "../../reducer/selectors";
import ProjectTileToPlace from "./ProjectTileToPlace";

type Props = {};
const Container = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: center;
`;

const ProjectsToPlace = (props: Props) => {
  const projects = useAppSelector(selectProjectsToPlace);
  return (
    <Container>
      {projects.map((project, i) => (
        <ProjectTileToPlace key={i} tile={project} i={i} />
      ))}
    </Container>
  );
};

export default ProjectsToPlace;
