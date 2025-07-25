import styled from "styled-components";

export const StyledAddButton = styled.button`
  background-color: #4caf50;
  color: white;
  border: 2px solid #388e3c;
  border-radius: 8px;
  padding: 15px 20px;
  font-weight: bold;
  cursor: pointer;
  font-size: 16px;
  transition: all 0.2s ease;
  min-width: 100px;
  pointer-events: auto;

  &:hover {
    background-color: #388e3c;
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(76, 175, 80, 0.3);
  }

  &:active {
    transform: translateY(0);
    box-shadow: 0 2px 4px rgba(76, 175, 80, 0.3);
  }
`;
