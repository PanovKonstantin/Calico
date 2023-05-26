import React, { useState } from "react";
import Draggable, { DraggableProps } from "react-draggable";
import styled from "styled-components";

type DragProps = Partial<DraggableProps> & {
  returning?: boolean;
  droppable?: boolean;
  disabled?: boolean;
};
const CalicoDraggable = ({
  returning,
  droppable,
  disabled,
  onStop,
  onStart,
  children,
  ...other
}: DragProps) => {
  const nodeRef = React.useRef(null);
  const [defPos, setDefPos] = useState({ x: 0, y: 0 });
  const [isDrag, setIsDrag] = useState(false);

  return disabled ? (
    <>{children}</>
  ) : (
    <Draggable
      nodeRef={nodeRef}
      position={returning ? defPos : undefined}
      onStart={(e, data) => {
        if (onStart) onStart(e, data);
        if (droppable) setIsDrag(true);
      }}
      onStop={(e, data) => {
        if (onStop) onStop(e, data);
        if (returning) setDefPos({ x: 0, y: 0 });
        if (droppable) setIsDrag(false);
      }}
      {...other}
    >
      <Container isDrag={isDrag} ref={nodeRef}>
        {children}
      </Container>
    </Draggable>
  );
};
const Container = styled.div<{ isDrag: boolean }>`
  pointer-events: ${({ isDrag }) =>
    isDrag ? "none" : "auto"};
`;

export default CalicoDraggable;
