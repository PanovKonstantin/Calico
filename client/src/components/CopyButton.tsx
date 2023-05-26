import React from "react";
import styled from "styled-components";

type Props = {
  textToCopy: string;
};

const CopyButton = ({ textToCopy }: Props) => {
  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(textToCopy);
  };
  return (
    <Button onClick={handleCopyToClipboard}>Copy!</Button>
  );
};

const Button = styled.button`
  height: 100%;
  background-color: transparent;
  border-radius: 10px;
  border-color: black;
`;
export default CopyButton;
